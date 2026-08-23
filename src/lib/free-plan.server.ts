import { supabaseAdmin } from "@/integrations/supabase/client.server";

import {
  FRAMEWORK_VERSION,
  QUESTIONS_PER_DIMENSION,
  TOTAL_DIMENSIONS,
  TOTAL_QUESTIONS,
  formatDateBR,
  maturityLevelFromScore,
  sanitizeFileNamePart,
} from "./igovia-domain";
import { buildReportData, renderReportPdf } from "./report.server";

type UserClient = any;

export function daysUntil(expiresAt: string): number {
  const diff = new Date(expiresAt).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / 86_400_000));
}

export async function isFrameworkReady(): Promise<boolean> {
  const [{ count: questionCount }, { count: optionCount }] = await Promise.all([
    supabaseAdmin.from("questions").select("id", { count: "exact", head: true }).eq("status", "ACTIVE"),
    supabaseAdmin
      .from("answer_options")
      .select("id", { count: "exact", head: true })
      .eq("status", "ACTIVE"),
  ]);
  return (questionCount ?? 0) === TOTAL_QUESTIONS && (optionCount ?? 0) === TOTAL_QUESTIONS * 9;
}

export async function loadDashboard(supabase: UserClient, userId: string) {
  const [{ data: profile }, { data: subscription }, { data: diagnostic }, frameworkReady, { data: roles }] =
    await Promise.all([
      supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
      supabase.from("subscriptions").select("*").eq("user_id", userId).maybeSingle(),
      supabase
        .from("diagnostics")
        .select("*")
        .eq("user_id", userId)
        .neq("status", "CANCELLED")
        .maybeSingle(),
      isFrameworkReady(),
      supabase.from("user_roles").select("role").eq("user_id", userId),
    ]);

  const expired = subscription ? new Date(subscription.expires_at).getTime() < Date.now() : true;

  return {
    profile: profile
      ? {
          fullName: profile.full_name as string,
          firstName: (profile.full_name as string).split(" ")[0],
          organizationName: profile.organization_name as string,
          email: profile.email as string,
          phone: profile.phone as string,
        }
      : null,
    subscription: subscription
      ? {
          expiresAt: subscription.expires_at as string,
          expiresAtLabel: formatDateBR(subscription.expires_at),
          daysLeft: daysUntil(subscription.expires_at),
          expired,
        }
      : null,
    diagnostic: diagnostic
      ? {
          id: diagnostic.id as string,
          status: diagnostic.status as "IN_PROGRESS" | "COMPLETED",
          answeredCount: diagnostic.answered_count as number,
          progress: Number(diagnostic.progress_percentage),
          globalScore: diagnostic.global_score ? Number(diagnostic.global_score) : null,
          maturityLevel: diagnostic.maturity_level as number | null,
          completedAt: diagnostic.completed_at as string | null,
        }
      : null,
    frameworkReady,
    isAdmin: (roles ?? []).some((r: any) => r.role === "ADMIN" || r.role === "SUPER_ADMIN"),
  };
}

export async function startDiagnostic(supabase: UserClient, userId: string) {
  const { data: existing } = await supabase
    .from("diagnostics")
    .select("id, status")
    .eq("user_id", userId)
    .neq("status", "CANCELLED")
    .maybeSingle();
  if (existing) return { id: existing.id as string, status: existing.status as string };

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();
  if (!subscription) throw new Error("Assinatura não encontrada.");
  if (new Date(subscription.expires_at).getTime() < Date.now()) {
    throw new Error("Seu período gratuito de 14 dias terminou.");
  }
  if (!(await isFrameworkReady())) {
    throw new Error("O conteúdo do diagnóstico ainda não foi publicado.");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("organization_id")
    .eq("id", userId)
    .maybeSingle();

  const { data, error } = await supabase
    .from("diagnostics")
    .insert({
      user_id: userId,
      organization_id: profile?.organization_id ?? null,
      subscription_id: subscription.id,
      framework_version: FRAMEWORK_VERSION,
    })
    .select("id, status")
    .single();

  if (error) {
    // Unique index guarantees a single diagnostic even under concurrent clicks/tabs.
    const { data: retry } = await supabase
      .from("diagnostics")
      .select("id, status")
      .eq("user_id", userId)
      .neq("status", "CANCELLED")
      .maybeSingle();
    if (retry) return { id: retry.id as string, status: retry.status as string };
    throw new Error(error.message);
  }
  return { id: data.id as string, status: data.status as string };
}

async function loadDiagnosticOwned(supabase: UserClient, userId: string, diagnosticId: string) {
  const { data } = await supabase
    .from("diagnostics")
    .select("*")
    .eq("id", diagnosticId)
    .eq("user_id", userId)
    .maybeSingle();
  if (!data) throw new Error("Diagnóstico não encontrado.");
  return data;
}

async function answeredByDimension(diagnosticId: string) {
  const { data } = await supabaseAdmin
    .from("diagnostic_answers")
    .select("question_id, answer_option_id, questions!inner(dimension_id, number, dimensions!inner(position))")
    .eq("diagnostic_id", diagnosticId);
  const counts = new Map<number, number>();
  const answers: Record<string, string> = {};
  for (const row of (data ?? []) as any[]) {
    const position = row.questions?.dimensions?.position as number;
    counts.set(position, (counts.get(position) ?? 0) + 1);
    answers[row.question_id] = row.answer_option_id;
  }
  return { counts, answers, total: (data ?? []).length };
}

export function firstIncompleteDimension(counts: Map<number, number>): number {
  for (let position = 1; position <= TOTAL_DIMENSIONS; position += 1) {
    if ((counts.get(position) ?? 0) < QUESTIONS_PER_DIMENSION) return position;
  }
  return TOTAL_DIMENSIONS;
}

export async function loadDimension(
  supabase: UserClient,
  userId: string,
  diagnosticId: string,
  position: number,
) {
  const diagnostic = await loadDiagnosticOwned(supabase, userId, diagnosticId);
  if (diagnostic.status === "COMPLETED") return { redirectToReport: true } as const;

  const { counts, answers, total } = await answeredByDimension(diagnosticId);
  const firstIncomplete = firstIncompleteDimension(counts);
  if (position > firstIncomplete) {
    return { redirectTo: firstIncomplete } as const;
  }

  const { data: dimension } = await supabase
    .from("dimensions")
    .select("id, position, name")
    .eq("position", position)
    .maybeSingle();
  if (!dimension) throw new Error("Dimensão não encontrada.");

  const { data: questions } = await supabase
    .from("questions")
    .select("id, number, statement, position, answer_options(id, level, answer_text)")
    .eq("dimension_id", dimension.id)
    .eq("status", "ACTIVE")
    .order("position", { ascending: true });

  return {
    diagnosticId,
    dimension: { position: dimension.position as number, name: dimension.name as string },
    questions: (questions ?? []).map((question: any) => ({
      id: question.id as string,
      number: question.number as number,
      statement: question.statement as string,
      options: (question.answer_options ?? [])
        .map((option: any) => ({
          id: option.id as string,
          level: option.level as number,
          text: option.answer_text as string,
        }))
        .sort((a: any, b: any) => a.level - b.level),
    })),
    answers,
    answeredCount: total,
    firstIncomplete,
    dimensionComplete: (counts.get(position) ?? 0) >= QUESTIONS_PER_DIMENSION,
  };
}

export async function saveAnswer(
  supabase: UserClient,
  userId: string,
  diagnosticId: string,
  questionId: string,
  answerOptionId: string,
) {
  await loadDiagnosticOwned(supabase, userId, diagnosticId);
  const { data: option } = await supabase
    .from("answer_options")
    .select("id, question_id, score, answer_text, interpretation, recommended_action")
    .eq("id", answerOptionId)
    .maybeSingle();
  if (!option || option.question_id !== questionId) {
    throw new Error("Alternativa inválida para esta pergunta.");
  }

  const { error } = await supabase.from("diagnostic_answers").upsert(
    {
      diagnostic_id: diagnosticId,
      question_id: questionId,
      answer_option_id: option.id,
      score_snapshot: option.score,
      answer_text_snapshot: option.answer_text,
      interpretation_snapshot: option.interpretation,
      recommended_action_snapshot: option.recommended_action,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "diagnostic_id,question_id" },
  );
  if (error) throw new Error(error.message);

  const { counts, total } = await answeredByDimension(diagnosticId);
  return { answeredCount: total, firstIncomplete: firstIncompleteDimension(counts) };
}

export async function completeDiagnostic(supabase: UserClient, userId: string, diagnosticId: string) {
  const diagnostic = await loadDiagnosticOwned(supabase, userId, diagnosticId);
  if (diagnostic.status === "COMPLETED") return { alreadyCompleted: true, diagnosticId };

  const { data: questions } = await supabaseAdmin
    .from("questions")
    .select("id, dimension_id, dimensions!inner(position, name)")
    .eq("status", "ACTIVE");
  if ((questions ?? []).length !== TOTAL_QUESTIONS) {
    throw new Error("O framework não possui as 50 questões ativas.");
  }

  const { data: answers } = await supabaseAdmin
    .from("diagnostic_answers")
    .select("question_id, score_snapshot")
    .eq("diagnostic_id", diagnosticId);

  const answerMap = new Map<string, number>(
    (answers ?? []).map((a: any) => [a.question_id, a.score_snapshot as number]),
  );
  const missing = (questions ?? []).filter((q: any) => !answerMap.has(q.id));
  if (missing.length > 0 || answerMap.size !== TOTAL_QUESTIONS) {
    const { counts } = await answeredByDimension(diagnosticId);
    return { incomplete: true, goToDimension: firstIncompleteDimension(counts) };
  }

  const byDimension = new Map<string, { position: number; name: string; scores: number[] }>();
  for (const question of questions as any[]) {
    const entry = byDimension.get(question.dimension_id) ?? {
      position: question.dimensions.position,
      name: question.dimensions.name,
      scores: [] as number[],
    };
    entry.scores.push(answerMap.get(question.id) as number);
    byDimension.set(question.dimension_id, entry);
  }

  const dimensionRows = [...byDimension.entries()].map(([dimensionId, entry]) => {
    const score = entry.scores.reduce((sum, value) => sum + value, 0) / entry.scores.length;
    return {
      diagnostic_id: diagnosticId,
      dimension_id: dimensionId,
      dimension_position: entry.position,
      dimension_name: entry.name,
      score: Number(score.toFixed(2)),
      maturity_level: maturityLevelFromScore(score),
    };
  });

  const globalScore =
    [...answerMap.values()].reduce((sum, value) => sum + value, 0) / TOTAL_QUESTIONS;
  const rounded = Number(globalScore.toFixed(2));
  const level = maturityLevelFromScore(rounded);
  const { data: maturity } = await supabaseAdmin
    .from("maturity_levels")
    .select("*")
    .eq("level", level)
    .maybeSingle();

  await supabaseAdmin.from("dimension_scores").upsert(dimensionRows, {
    onConflict: "diagnostic_id,dimension_id",
  });
  await supabaseAdmin.from("diagnostic_scores").upsert(
    {
      diagnostic_id: diagnosticId,
      global_score: rounded,
      percentage: Number(((rounded / 9) * 100).toFixed(2)),
      maturity_level: level,
      maturity_name: maturity?.name ?? `Nível ${level}`,
      maturity_interpretation: maturity?.interpretation ?? null,
    },
    { onConflict: "diagnostic_id" },
  );
  await supabaseAdmin
    .from("diagnostics")
    .update({
      status: "COMPLETED",
      completed_at: new Date().toISOString(),
      global_score: rounded,
      global_percentage: Number(((rounded / 9) * 100).toFixed(2)),
      maturity_level: level,
      current_dimension: TOTAL_DIMENSIONS,
    })
    .eq("id", diagnosticId)
    .eq("status", "IN_PROGRESS");

  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("organization_id")
    .eq("id", userId)
    .maybeSingle();

  await supabaseAdmin.from("reports").upsert(
    {
      diagnostic_id: diagnosticId,
      user_id: userId,
      organization_id: profile?.organization_id ?? null,
      public_report_id: buildPublicReportId(),
      framework_version: FRAMEWORK_VERSION,
      status: "PENDING",
    },
    { onConflict: "diagnostic_id" },
  );

  return { completed: true, diagnosticId };
}

function buildPublicReportId(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(3));
  const suffix = Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
  return `IGOVIA-${new Date().getFullYear()}-${suffix}`;
}

export async function assertCanReadDiagnostic(
  supabase: UserClient,
  userId: string,
  diagnosticId: string,
) {
  const { data } = await supabase
    .from("diagnostics")
    .select("id, user_id, status")
    .eq("id", diagnosticId)
    .maybeSingle();
  if (!data) throw new Error("Relatório não encontrado.");
  if (data.status !== "COMPLETED") throw new Error("Diagnóstico ainda não concluído.");
  return data;
}

export async function loadReport(supabase: UserClient, userId: string, diagnosticId: string) {
  await assertCanReadDiagnostic(supabase, userId, diagnosticId);
  return buildReportData(supabaseAdmin, diagnosticId);
}

export async function ensureReportPdf(
  supabase: UserClient,
  userId: string,
  diagnosticId: string,
): Promise<{ url: string; fileName: string }> {
  await assertCanReadDiagnostic(supabase, userId, diagnosticId);
  const data = await buildReportData(supabaseAdmin, diagnosticId);
  const { data: report } = await supabaseAdmin
    .from("reports")
    .select("*")
    .eq("diagnostic_id", diagnosticId)
    .maybeSingle();

  const fileName = `Relatorio-Maturidade-IGOVIA-${sanitizeFileNamePart(data.organization)}-${formatDateBR(
    data.completedAt,
  ).replace(/\//g, "-")}.pdf`;
  const storagePath = `reports/${report?.user_id ?? userId}/${diagnosticId}/relatorio-maturidade.pdf`;

  if (report && report.status !== "READY") {
    await supabaseAdmin.from("reports").update({ status: "GENERATING" }).eq("id", report.id);
  }

  try {
    if (!report?.storage_path || report.status !== "READY") {
      const bytes = await renderReportPdf(data);
      const upload = await supabaseAdmin.storage
        .from("reports")
        .upload(storagePath, bytes, { contentType: "application/pdf", upsert: true });
      if (upload.error) throw new Error(upload.error.message);
      await supabaseAdmin
        .from("reports")
        .update({
          status: "READY",
          storage_path: storagePath,
          file_name: fileName,
          generated_at: new Date().toISOString(),
        })
        .eq("diagnostic_id", diagnosticId);
    }
  } catch (error) {
    await supabaseAdmin.from("reports").update({ status: "FAILED" }).eq("diagnostic_id", diagnosticId);
    throw error;
  }

  const signed = await supabaseAdmin.storage
    .from("reports")
    .createSignedUrl(report?.storage_path ?? storagePath, 300, { download: fileName });
  if (signed.error || !signed.data) throw new Error("Não foi possível gerar o link do relatório.");
  return { url: signed.data.signedUrl, fileName };
}

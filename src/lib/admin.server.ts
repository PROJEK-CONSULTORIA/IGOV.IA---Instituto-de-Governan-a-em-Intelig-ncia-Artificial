import { supabaseAdmin } from "@/integrations/supabase/client.server";

import { formatDateBR } from "./igovia-domain";

export async function assertAdmin(supabase: any, userId: string) {
  const { data } = await supabase.from("user_roles").select("role").eq("user_id", userId);
  const isAdmin = (data ?? []).some((r: any) => r.role === "ADMIN" || r.role === "SUPER_ADMIN");
  if (!isAdmin) throw new Error("Acesso negado.");
  return true;
}

export async function logAudit(
  actorId: string,
  action: string,
  entity: string,
  entityId: string | null,
  previous: unknown,
  next: unknown,
) {
  await supabaseAdmin.from("audit_logs").insert({
    actor_id: actorId,
    action,
    entity,
    entity_id: entityId,
    previous_values: (previous ?? null) as any,
    new_values: (next ?? null) as any,
  });
}

export async function adminOverview() {
  const [profiles, organizations, subscriptions, diagnostics, scores] = await Promise.all([
    supabaseAdmin.from("profiles").select("id", { count: "exact", head: true }),
    supabaseAdmin.from("organizations").select("id", { count: "exact", head: true }),
    supabaseAdmin.from("subscriptions").select("expires_at"),
    supabaseAdmin.from("diagnostics").select("status"),
    supabaseAdmin.from("diagnostic_scores").select("global_score"),
  ]);

  const now = Date.now();
  const activeFree = (subscriptions.data ?? []).filter(
    (s: any) => new Date(s.expires_at).getTime() >= now,
  ).length;
  const expiredFree = (subscriptions.data ?? []).length - activeFree;
  const inProgress = (diagnostics.data ?? []).filter((d: any) => d.status === "IN_PROGRESS").length;
  const completed = (diagnostics.data ?? []).filter((d: any) => d.status === "COMPLETED").length;
  const totalUsers = profiles.count ?? 0;
  const notStarted = Math.max(0, totalUsers - inProgress - completed);
  const averageScore =
    (scores.data ?? []).length > 0
      ? (scores.data ?? []).reduce((sum: number, s: any) => sum + Number(s.global_score), 0) /
        (scores.data ?? []).length
      : null;

  return {
    totalUsers,
    totalOrganizations: organizations.count ?? 0,
    activeFree,
    expiredFree,
    notStarted,
    inProgress,
    completed,
    completionRate: totalUsers > 0 ? Math.round((completed / totalUsers) * 100) : 0,
    averageScore,
  };
}

export async function adminUsers(search: string, filter: string) {
  const { data: profiles } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);
  const [{ data: subs }, { data: diags }] = await Promise.all([
    supabaseAdmin.from("subscriptions").select("*"),
    supabaseAdmin.from("diagnostics").select("*"),
  ]);

  const subsByUser = new Map((subs ?? []).map((s: any) => [s.user_id, s]));
  const diagsByUser = new Map((diags ?? []).map((d: any) => [d.user_id, d]));
  const term = search.trim().toLowerCase();

  return (profiles ?? [])
    .map((profile: any) => {
      const subscription = subsByUser.get(profile.id);
      const diagnostic = diagsByUser.get(profile.id);
      const expired = subscription
        ? new Date(subscription.expires_at).getTime() < Date.now()
        : true;
      return {
        id: profile.id as string,
        fullName: profile.full_name as string,
        organization: profile.organization_name as string,
        phone: profile.phone as string,
        email: profile.email as string,
        plan: "FREE",
        accessStatus: expired ? "Expirado" : "Ativo",
        expiresAt: subscription ? formatDateBR(subscription.expires_at) : "—",
        diagnosticStatus: !diagnostic
          ? "Não iniciado"
          : diagnostic.status === "COMPLETED"
            ? "Concluído"
            : "Em andamento",
        diagnosticId: diagnostic?.id ?? null,
        progress: diagnostic ? Number(diagnostic.progress_percentage) : 0,
        globalScore: diagnostic?.global_score ? Number(diagnostic.global_score) : null,
        createdAt: formatDateBR(profile.created_at),
      };
    })
    .filter((row) => {
      if (term) {
        const haystack = `${row.fullName} ${row.organization} ${row.phone} ${row.email}`.toLowerCase();
        if (!haystack.includes(term)) return false;
      }
      if (filter === "active") return row.accessStatus === "Ativo";
      if (filter === "expired") return row.accessStatus === "Expirado";
      if (filter === "not_started") return row.diagnosticStatus === "Não iniciado";
      if (filter === "in_progress") return row.diagnosticStatus === "Em andamento";
      if (filter === "completed") return row.diagnosticStatus === "Concluído";
      return true;
    });
}

export async function adminUserDetail(userId: string) {
  const [{ data: profile }, { data: subscription }, { data: diagnostic }] = await Promise.all([
    supabaseAdmin.from("profiles").select("*").eq("id", userId).maybeSingle(),
    supabaseAdmin.from("subscriptions").select("*").eq("user_id", userId).maybeSingle(),
    supabaseAdmin.from("diagnostics").select("*").eq("user_id", userId).maybeSingle(),
  ]);
  if (!profile) throw new Error("Usuário não encontrado.");
  return {
    fullName: profile.full_name,
    phone: profile.phone,
    email: profile.email,
    organization: profile.organization_name,
    createdAt: formatDateBR(profile.created_at),
    plan: "FREE",
    startedAt: subscription ? formatDateBR(subscription.started_at) : "—",
    expiresAt: subscription ? formatDateBR(subscription.expires_at) : "—",
    accessStatus:
      subscription && new Date(subscription.expires_at).getTime() >= Date.now()
        ? "Ativo"
        : "Expirado",
    diagnostic: diagnostic
      ? {
          id: diagnostic.id,
          status: diagnostic.status,
          progress: Number(diagnostic.progress_percentage),
          answeredCount: diagnostic.answered_count,
          completedAt: diagnostic.completed_at ? formatDateBR(diagnostic.completed_at) : "—",
          globalScore: diagnostic.global_score ? Number(diagnostic.global_score) : null,
        }
      : null,
  };
}

export async function adminDiagnostics(filter: string) {
  const { data: diagnostics } = await supabaseAdmin
    .from("diagnostics")
    .select("*")
    .order("started_at", { ascending: false })
    .limit(500);
  const { data: profiles } = await supabaseAdmin.from("profiles").select("id, full_name, organization_name");
  const profileMap = new Map((profiles ?? []).map((p: any) => [p.id, p]));

  return (diagnostics ?? [])
    .map((diagnostic: any) => ({
      id: diagnostic.id as string,
      user: profileMap.get(diagnostic.user_id)?.full_name ?? "—",
      organization: profileMap.get(diagnostic.user_id)?.organization_name ?? "—",
      startedAt: formatDateBR(diagnostic.started_at),
      progress: Number(diagnostic.progress_percentage),
      status: diagnostic.status === "COMPLETED" ? "Concluído" : "Em andamento",
      completedAt: diagnostic.completed_at ? formatDateBR(diagnostic.completed_at) : "—",
      globalScore: diagnostic.global_score ? Number(diagnostic.global_score) : null,
    }))
    .filter((row) => {
      if (filter === "in_progress") return row.status === "Em andamento";
      if (filter === "completed") return row.status === "Concluído";
      return true;
    });
}

export async function adminDiagnosticDetail(diagnosticId: string) {
  const { data: diagnostic } = await supabaseAdmin
    .from("diagnostics")
    .select("*")
    .eq("id", diagnosticId)
    .maybeSingle();
  if (!diagnostic) throw new Error("Diagnóstico não encontrado.");

  const [{ data: profile }, { data: answers }, { data: dimensionScores }] = await Promise.all([
    supabaseAdmin.from("profiles").select("*").eq("id", diagnostic.user_id).maybeSingle(),
    supabaseAdmin
      .from("diagnostic_answers")
      .select("score_snapshot, answer_text_snapshot, question_id, questions!inner(number, statement, dimensions!inner(position, name))")
      .eq("diagnostic_id", diagnosticId),
    supabaseAdmin
      .from("dimension_scores")
      .select("*")
      .eq("diagnostic_id", diagnosticId)
      .order("dimension_position", { ascending: true }),
  ]);

  return {
    id: diagnostic.id as string,
    user: profile?.full_name ?? "—",
    organization: profile?.organization_name ?? "—",
    startedAt: formatDateBR(diagnostic.started_at),
    lastActivityAt: formatDateBR(diagnostic.last_activity_at),
    completedAt: diagnostic.completed_at ? formatDateBR(diagnostic.completed_at) : "—",
    status: diagnostic.status as string,
    progress: Number(diagnostic.progress_percentage),
    answeredCount: diagnostic.answered_count as number,
    currentDimension: diagnostic.current_dimension as number,
    globalScore: diagnostic.global_score ? Number(diagnostic.global_score) : null,
    maturityLevel: diagnostic.maturity_level as number | null,
    dimensionScores: (dimensionScores ?? []).map((row: any) => ({
      position: row.dimension_position,
      name: row.dimension_name,
      score: Number(row.score),
      level: row.maturity_level,
    })),
    answers: (answers ?? [])
      .map((row: any) => ({
        number: row.questions?.number as number,
        dimension: row.questions?.dimensions?.name as string,
        statement: row.questions?.statement as string,
        answer: row.answer_text_snapshot as string,
        score: row.score_snapshot as number,
      }))
      .sort((a: any, b: any) => a.number - b.number),
  };
}

export async function adminFramework() {
  const { data: dimensions } = await supabaseAdmin
    .from("dimensions")
    .select("id, position, name, questions(id, number, statement, position, status, answer_options(id, level, answer_text, score, interpretation, recommended_action))")
    .order("position", { ascending: true });

  return (dimensions ?? []).map((dimension: any) => ({
    id: dimension.id as string,
    position: dimension.position as number,
    name: dimension.name as string,
    questions: (dimension.questions ?? [])
      .map((question: any) => ({
        id: question.id as string,
        number: question.number as number,
        statement: question.statement as string,
        position: question.position as number,
        status: question.status as string,
        options: (question.answer_options ?? [])
          .map((option: any) => ({
            id: option.id as string,
            level: option.level as number,
            text: option.answer_text as string,
            score: option.score as number,
            interpretation: option.interpretation as string | null,
            action: option.recommended_action as string | null,
          }))
          .sort((a: any, b: any) => a.level - b.level),
      }))
      .sort((a: any, b: any) => a.position - b.position),
  }));
}

export type QuestionInput = {
  dimensionId: string;
  questionId?: string;
  number: number;
  statement: string;
  position: number;
  options: {
    level: number;
    text: string;
    interpretation: string;
    action: string;
  }[];
};

export async function saveQuestion(actorId: string, input: QuestionInput) {
  let questionId = input.questionId;
  let previous: unknown = null;

  if (questionId) {
    const { data } = await supabaseAdmin.from("questions").select("*").eq("id", questionId).maybeSingle();
    previous = data;
    const { error } = await supabaseAdmin
      .from("questions")
      .update({ number: input.number, statement: input.statement, position: input.position })
      .eq("id", questionId);
    if (error) throw new Error(error.message);
  } else {
    const { data, error } = await supabaseAdmin
      .from("questions")
      .insert({
        dimension_id: input.dimensionId,
        number: input.number,
        statement: input.statement,
        position: input.position,
      })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    questionId = data.id;
  }

  for (const option of input.options) {
    const { error } = await supabaseAdmin.from("answer_options").upsert(
      {
        question_id: questionId!,
        level: option.level,
        answer_text: option.text,
        score: option.level,
        interpretation: option.interpretation || null,
        recommended_action: option.action || null,
      },
      { onConflict: "question_id,level" },
    );
    if (error) throw new Error(error.message);
  }

  await logAudit(actorId, previous ? "UPDATE_QUESTION" : "CREATE_QUESTION", "questions", questionId!, previous, input);
  return { id: questionId! };
}

export async function adminAuditLogs() {
  const { data } = await supabaseAdmin
    .from("audit_logs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);
  const { data: profiles } = await supabaseAdmin.from("profiles").select("id, full_name");
  const nameMap = new Map((profiles ?? []).map((p: any) => [p.id, p.full_name]));
  return (data ?? []).map((row: any) => ({
    id: row.id as string,
    actor: nameMap.get(row.actor_id) ?? "—",
    action: row.action as string,
    entity: row.entity as string,
    entityId: row.entity_id as string | null,
    createdAt: formatDateBR(row.created_at),
  }));
}

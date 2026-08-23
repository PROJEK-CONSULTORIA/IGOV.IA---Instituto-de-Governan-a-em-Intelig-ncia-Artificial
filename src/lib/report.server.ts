import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";

import {
  FRAMEWORK_VERSION,
  formatDateBR,
  formatScore,
  maturityLevelFromScore,
  priorityLabel,
} from "./igovia-domain";

export type ReportDimension = {
  position: number;
  name: string;
  score: number;
  level: number;
  summary: string;
};

export type ReportOrientation = {
  dimension: string;
  questionNumber: number;
  score: number;
  priority: string;
  action: string;
};

export type ReportPriority = {
  position: number;
  name: string;
  score: number;
  actions: string[];
};

export type ReportData = {
  publicReportId: string;
  diagnosticId: string;
  organization: string;
  responsible: string;
  completedAt: string | null;
  generatedAt: string;
  frameworkVersion: string;
  globalScore: number;
  percentage: number;
  maturityLevel: number;
  maturityName: string;
  maturityInterpretation: string | null;
  dimensions: ReportDimension[];
  orientations: ReportOrientation[];
  priorities: ReportPriority[];
};

type AnyClient = {
  from: (table: string) => any;
};

function dimensionSummary(score: number): string {
  if (score <= 3)
    return "Estágio inicial: práticas ainda incipientes, com necessidade de estruturação básica nesta dimensão.";
  if (score <= 5)
    return "Em estruturação: existem iniciativas, mas com lacunas relevantes de padronização e acompanhamento.";
  if (score <= 7)
    return "Consolidando: práticas estabelecidas, com espaço para ampliar cobertura, integração e monitoramento.";
  if (score <= 8)
    return "Avançado: dimensão madura, com foco em otimização e ganhos incrementais de eficiência.";
  return "Referência: dimensão em melhoria contínua, servindo de base para as demais áreas da organização.";
}

/** Consolidates a completed diagnostic into report data using stored snapshots. */
export async function buildReportData(
  admin: AnyClient,
  diagnosticId: string,
): Promise<ReportData> {
  const { data: diagnostic } = await admin
    .from("diagnostics")
    .select("*")
    .eq("id", diagnosticId)
    .maybeSingle();
  if (!diagnostic || diagnostic.status !== "COMPLETED") {
    throw new Error("Diagnóstico não concluído.");
  }

  const [{ data: profile }, { data: scores }, { data: dimScores }, { data: report }] =
    await Promise.all([
      admin.from("profiles").select("*").eq("id", diagnostic.user_id).maybeSingle(),
      admin.from("diagnostic_scores").select("*").eq("diagnostic_id", diagnosticId).maybeSingle(),
      admin
        .from("dimension_scores")
        .select("*")
        .eq("diagnostic_id", diagnosticId)
        .order("dimension_position", { ascending: true }),
      admin.from("reports").select("*").eq("diagnostic_id", diagnosticId).maybeSingle(),
    ]);

  const { data: answers } = await admin
    .from("diagnostic_answers")
    .select("score_snapshot, recommended_action_snapshot, question_id")
    .eq("diagnostic_id", diagnosticId);

  const { data: questions } = await admin
    .from("questions")
    .select("id, number, dimension_id, dimensions(position, name)");

  const questionMap = new Map<string, { number: number; dimension: string; position: number }>();
  for (const question of questions ?? []) {
    questionMap.set(question.id, {
      number: question.number,
      dimension: question.dimensions?.name ?? "",
      position: question.dimensions?.position ?? 0,
    });
  }

  const dimensions: ReportDimension[] = (dimScores ?? []).map((row: any) => ({
    position: row.dimension_position,
    name: row.dimension_name,
    score: Number(row.score),
    level: row.maturity_level,
    summary: dimensionSummary(Number(row.score)),
  }));

  const orientations: ReportOrientation[] = (answers ?? [])
    .filter((a: any) => a.recommended_action_snapshot && a.score_snapshot <= 5)
    .map((a: any) => {
      const meta = questionMap.get(a.question_id);
      return {
        dimension: meta?.dimension ?? "",
        questionNumber: meta?.number ?? 0,
        score: a.score_snapshot,
        priority: priorityLabel(a.score_snapshot),
        action: a.recommended_action_snapshot as string,
      };
    })
    .sort(
      (a: ReportOrientation, b: ReportOrientation) =>
        a.score - b.score || a.questionNumber - b.questionNumber,
    )
    .slice(0, 12);

  const criticalByDimension = new Map<number, number>();
  for (const a of answers ?? []) {
    if (a.score_snapshot <= 5) {
      const meta = questionMap.get(a.question_id);
      if (meta) criticalByDimension.set(meta.position, (criticalByDimension.get(meta.position) ?? 0) + 1);
    }
  }

  const priorities: ReportPriority[] = [...dimensions]
    .sort(
      (a, b) =>
        a.score - b.score ||
        (criticalByDimension.get(b.position) ?? 0) - (criticalByDimension.get(a.position) ?? 0) ||
        a.position - b.position,
    )
    .slice(0, 3)
    .map((dimension) => ({
      position: dimension.position,
      name: dimension.name,
      score: dimension.score,
      actions: (answers ?? [])
        .filter((a: any) => {
          const meta = questionMap.get(a.question_id);
          return (
            meta?.position === dimension.position &&
            a.recommended_action_snapshot &&
            a.score_snapshot <= 6
          );
        })
        .sort((a: any, b: any) => a.score_snapshot - b.score_snapshot)
        .slice(0, 3)
        .map((a: any) => a.recommended_action_snapshot as string),
    }));

  const globalScore = Number(scores?.global_score ?? diagnostic.global_score ?? 0);

  return {
    publicReportId: report?.public_report_id ?? "—",
    diagnosticId,
    organization: profile?.organization_name ?? "—",
    responsible: profile?.full_name ?? "—",
    completedAt: diagnostic.completed_at,
    generatedAt: new Date().toISOString(),
    frameworkVersion: diagnostic.framework_version ?? FRAMEWORK_VERSION,
    globalScore,
    percentage: Number(scores?.percentage ?? (globalScore / 9) * 100),
    maturityLevel: Number(scores?.maturity_level ?? maturityLevelFromScore(globalScore)),
    maturityName: scores?.maturity_name ?? `Nível ${maturityLevelFromScore(globalScore)}`,
    maturityInterpretation: scores?.maturity_interpretation ?? null,
    dimensions,
    orientations,
    priorities,
  };
}

const GREEN = rgb(0.478, 0.722, 0.22);
const BLACK = rgb(0.07, 0.07, 0.07);
const GRAY = rgb(0.42, 0.42, 0.42);
const LIGHT = rgb(0.9, 0.9, 0.9);
const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN = 56;

function wrap(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/** Renders the simplified FREE maturity report as a structured, paginated PDF. */
export async function renderReportPdf(data: ReportData): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  pdf.setTitle("Relatório de Maturidade em Governança de Inteligência Artificial");
  pdf.setAuthor("IGOV.IA — Instituto de Governança em Inteligência Artificial");
  pdf.setSubject("Framework IGOV.IA");

  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const contentWidth = PAGE_W - MARGIN * 2;

  const pages: PDFPage[] = [];
  let page = pdf.addPage([PAGE_W, PAGE_H]);
  pages.push(page);
  let y = PAGE_H - MARGIN;

  const newPage = () => {
    page = pdf.addPage([PAGE_W, PAGE_H]);
    pages.push(page);
    y = PAGE_H - MARGIN;
  };
  const need = (space: number) => {
    if (y - space < MARGIN + 40) newPage();
  };
  const text = (
    value: string,
    opts: { size?: number; font?: PDFFont; color?: any; x?: number } = {},
  ) => {
    const size = opts.size ?? 10.5;
    const font = opts.font ?? regular;
    const lines = wrap(value, font, size, contentWidth - ((opts.x ?? MARGIN) - MARGIN));
    for (const line of lines) {
      need(size + 6);
      page.drawText(line, {
        x: opts.x ?? MARGIN,
        y: y - size,
        size,
        font,
        color: opts.color ?? BLACK,
      });
      y -= size + 4;
    }
  };
  const heading = (value: string) => {
    need(40);
    y -= 14;
    page.drawRectangle({ x: MARGIN, y: y - 2, width: 34, height: 3, color: GREEN });
    y -= 16;
    text(value, { size: 15, font: bold });
    y -= 6;
  };

  // ---------- Capa ----------
  page.drawRectangle({ x: 0, y: PAGE_H - 10, width: PAGE_W, height: 10, color: GREEN });
  y = PAGE_H - 200;
  page.drawText("IGOV.IA", { x: MARGIN, y, size: 34, font: bold, color: BLACK });
  y -= 18;
  page.drawText("Instituto de Governança em Inteligência Artificial", {
    x: MARGIN,
    y: y - 10,
    size: 10.5,
    font: regular,
    color: GRAY,
  });
  y -= 80;
  for (const line of wrap(
    "Relatório de Maturidade em Governança de Inteligência Artificial",
    bold,
    24,
    contentWidth,
  )) {
    page.drawText(line, { x: MARGIN, y, size: 24, font: bold, color: BLACK });
    y -= 30;
  }
  y -= 6;
  page.drawText("Framework IGOV.IA", { x: MARGIN, y, size: 13, font: regular, color: GREEN });
  y -= 60;
  page.drawRectangle({ x: MARGIN, y: y - 6, width: contentWidth, height: 1, color: LIGHT });
  y -= 40;
  const coverRows: [string, string][] = [
    ["Organização", data.organization],
    ["Responsável", data.responsible],
    ["Data do diagnóstico", formatDateBR(data.completedAt)],
    ["ID do Relatório", data.publicReportId],
  ];
  for (const [label, value] of coverRows) {
    page.drawText(label.toUpperCase(), { x: MARGIN, y, size: 8, font: bold, color: GRAY });
    page.drawText(value, { x: MARGIN, y: y - 16, size: 13, font: regular, color: BLACK });
    y -= 44;
  }
  page.drawText("Relatório Simplificado de Maturidade — Plano FREE", {
    x: MARGIN,
    y: MARGIN + 10,
    size: 9,
    font: regular,
    color: GRAY,
  });

  // ---------- Resumo executivo ----------
  newPage();
  heading("Resumo Executivo");
  need(120);
  page.drawRectangle({
    x: MARGIN,
    y: y - 104,
    width: contentWidth,
    height: 100,
    borderColor: LIGHT,
    borderWidth: 1,
  });
  page.drawText("Score Geral de Maturidade", {
    x: MARGIN + 20,
    y: y - 32,
    size: 10,
    font: regular,
    color: GRAY,
  });
  page.drawText(`${formatScore(data.globalScore)} / 9`, {
    x: MARGIN + 20,
    y: y - 70,
    size: 30,
    font: bold,
    color: BLACK,
  });
  page.drawText(data.maturityName, {
    x: MARGIN + 300,
    y: y - 45,
    size: 16,
    font: bold,
    color: GREEN,
  });
  page.drawText(`${data.percentage.toFixed(0)}%`, {
    x: MARGIN + 300,
    y: y - 70,
    size: 12,
    font: regular,
    color: GRAY,
  });
  y -= 124;
  if (data.maturityInterpretation) text(data.maturityInterpretation, { color: GRAY });
  y -= 6;
  text(
    `Diagnóstico concluído em: ${formatDateBR(data.completedAt)}   •   Relatório gerado em: ${formatDateBR(
      data.generatedAt,
    )}   •   Framework IGOV.IA: versão ${data.frameworkVersion}`,
    { size: 9, color: GRAY },
  );

  // ---------- Tabela ----------
  heading("Maturidade por Dimensão");
  need(30);
  page.drawText("DIMENSÃO", { x: MARGIN, y: y - 10, size: 8, font: bold, color: GRAY });
  page.drawText("SCORE", { x: MARGIN + 330, y: y - 10, size: 8, font: bold, color: GRAY });
  page.drawText("NÍVEL", { x: MARGIN + 410, y: y - 10, size: 8, font: bold, color: GRAY });
  y -= 20;
  for (const dimension of data.dimensions) {
    need(22);
    page.drawRectangle({ x: MARGIN, y: y + 6, width: contentWidth, height: 0.7, color: LIGHT });
    page.drawText(`${dimension.position}. ${dimension.name}`, {
      x: MARGIN,
      y: y - 8,
      size: 10,
      font: regular,
      color: BLACK,
    });
    page.drawText(`${formatScore(dimension.score)} / 9`, {
      x: MARGIN + 330,
      y: y - 8,
      size: 10,
      font: bold,
      color: BLACK,
    });
    page.drawText(`Nível ${dimension.level}`, {
      x: MARGIN + 410,
      y: y - 8,
      size: 10,
      font: regular,
      color: GRAY,
    });
    y -= 22;
  }

  // ---------- Gráfico ----------
  heading("Gráfico das Dimensões (escala 1 a 9)");
  const chartX = MARGIN + 190;
  const chartW = contentWidth - 190 - 40;
  need(data.dimensions.length * 20 + 20);
  const chartTop = y;
  for (const dimension of data.dimensions) {
    need(20);
    const label = dimension.name.length > 34 ? `${dimension.name.slice(0, 33)}…` : dimension.name;
    page.drawText(label, { x: MARGIN, y: y - 11, size: 8.5, font: regular, color: BLACK });
    page.drawRectangle({ x: chartX, y: y - 14, width: chartW, height: 10, color: rgb(0.94, 0.94, 0.94) });
    page.drawRectangle({
      x: chartX,
      y: y - 14,
      width: Math.max(2, (dimension.score / 9) * chartW),
      height: 10,
      color: GREEN,
    });
    page.drawText(formatScore(dimension.score), {
      x: chartX + chartW + 8,
      y: y - 12,
      size: 8.5,
      font: bold,
      color: BLACK,
    });
    y -= 20;
  }
  const refX = chartX + (data.globalScore / 9) * chartW;
  page.drawRectangle({
    x: refX,
    y: y + 6,
    width: 1,
    height: chartTop - y - 6,
    color: rgb(0.15, 0.15, 0.15),
  });
  y -= 4;
  text(`Linha de referência: Score Geral ${formatScore(data.globalScore)} / 9`, {
    size: 8.5,
    color: GRAY,
  });

  // ---------- Análise ----------
  heading("Análise das Dimensões");
  for (const dimension of data.dimensions) {
    need(52);
    text(`Dimensão ${dimension.position} — ${dimension.name}`, { size: 11, font: bold });
    text(`Score: ${formatScore(dimension.score)} / 9   •   Nível: ${dimension.level}`, {
      size: 9.5,
      color: GREEN,
    });
    text(dimension.summary, { size: 9.5, color: GRAY });
    y -= 8;
  }

  // ---------- Orientações ----------
  heading("Principais Orientações");
  if (data.orientations.length === 0) {
    text("Nenhuma ação prioritária identificada a partir das respostas informadas.", { color: GRAY });
  }
  for (const orientation of data.orientations) {
    need(40);
    text(`${orientation.dimension} — ${orientation.priority}`, { size: 9.5, font: bold, color: GREEN });
    text(orientation.action, { size: 10 });
    y -= 6;
  }

  // ---------- Prioridades ----------
  heading("Prioridades para Evolução");
  data.priorities.forEach((priority, index) => {
    need(60);
    text(`Prioridade ${index + 1}`, { size: 9, font: bold, color: GREEN });
    text(priority.name, { size: 12, font: bold });
    text(`Score: ${formatScore(priority.score)} / 9`, { size: 10, color: GRAY });
    for (const action of priority.actions) text(`•  ${action}`, { size: 10, x: MARGIN + 12 });
    y -= 10;
  });

  // ---------- Próximos passos ----------
  heading("Próximos passos");
  text(
    "O diagnóstico representa uma fotografia do estágio atual de maturidade da organização nas 10 dimensões do Framework IGOV.IA. Os resultados permitem identificar pontos de atenção e orientar prioridades para o desenvolvimento da Governança de Inteligência Artificial.",
  );
  y -= 6;
  text(
    "A evolução da maturidade exige acompanhamento periódico, implementação das ações recomendadas e desenvolvimento contínuo das capacidades organizacionais relacionadas à Governança de IA.",
  );
  y -= 10;
  text("Conheça os planos IGOV.IA", { size: 12, font: bold });
  text("igovia.com.br", { size: 10, color: GREEN });

  // ---------- Rodapés ----------
  const total = pages.length;
  pages.forEach((current, index) => {
    if (index === 0) return;
    current.drawRectangle({ x: MARGIN, y: MARGIN - 6, width: contentWidth, height: 0.7, color: LIGHT });
    current.drawText("IGOV.IA — Instituto de Governança em Inteligência Artificial", {
      x: MARGIN,
      y: MARGIN - 20,
      size: 7.5,
      font: regular,
      color: GRAY,
    });
    current.drawText("Relatório de Maturidade em Governança de Inteligência Artificial", {
      x: MARGIN,
      y: MARGIN - 30,
      size: 7.5,
      font: regular,
      color: GRAY,
    });
    current.drawText(`Página ${index + 1} de ${total}`, {
      x: PAGE_W - MARGIN - 70,
      y: MARGIN - 20,
      size: 7.5,
      font: regular,
      color: GRAY,
    });
    current.drawText(`ID: ${data.publicReportId}`, {
      x: PAGE_W - MARGIN - 120,
      y: MARGIN - 30,
      size: 7.5,
      font: regular,
      color: GRAY,
    });
  });

  return pdf.save();
}

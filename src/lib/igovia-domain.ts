export const TOTAL_QUESTIONS = 50;
export const QUESTIONS_PER_DIMENSION = 5;
export const TOTAL_DIMENSIONS = 10;
export const FRAMEWORK_VERSION = "1.0";

export const DIMENSION_NAMES = [
  "Estratégia e Governança",
  "Cultura, Pessoas e Comunicação",
  "Estrutura Tecnológica e Automação",
  "Investimentos, Custos e Despesas",
  "Qualidade de Dados",
  "Impacto no Usuário Final",
  "Compliance, Riscos e Ética",
  "Segurança da Informação",
  "Fornecedores e Integrações",
  "Monitoramento e Melhoria Contínua",
] as const;

export function priorityLabel(score: number): string {
  if (score <= 3) return "Prioridade Crítica";
  if (score <= 5) return "Prioridade Alta";
  if (score <= 7) return "Evolução";
  if (score <= 8) return "Otimização";
  return "Melhoria contínua";
}

export function maturityLevelFromScore(score: number): number {
  const level = Math.floor(score);
  return Math.min(9, Math.max(1, level));
}

export function formatScore(score: number): string {
  return score.toFixed(1).replace(".", ",");
}

export function formatDateBR(value: string | Date | null | undefined): string {
  if (!value) return "—";
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("pt-BR", { timeZone: "America/Sao_Paulo" }).format(date);
}

export function sanitizeFileNamePart(value: string): string {
  return (
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "Organizacao"
  );
}

export function maskPhoneBR(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.replace(/^(\d{0,2})/, "($1");
  if (digits.length <= 6) return digits.replace(/^(\d{2})(\d{0,4})/, "($1) $2");
  if (digits.length <= 10) return digits.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  return digits.replace(/^(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
}

export type DiagnosticState = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

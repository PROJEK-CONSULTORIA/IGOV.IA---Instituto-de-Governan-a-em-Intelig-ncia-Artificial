import { useCallback, useEffect, useState } from "react";
import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import { PageShell } from "@/components/PageShell";
import { QUESTIONS_PER_DIMENSION, TOTAL_DIMENSIONS, TOTAL_QUESTIONS } from "@/lib/igovia-domain";
import {
  finishDiagnostic,
  getDiagnosticDimension,
  saveDiagnosticAnswer,
} from "@/lib/free-plan.functions";

export const Route = createFileRoute("/_authenticated/diagnostico/$diagnosticId/dimensao/$position")({
  head: () => ({
    meta: [
      { title: "Diagnóstico IGOV.IA | Questionário" },
      { name: "description", content: "Responda o Diagnóstico IGOV.IA de Maturidade em IA." },
      { property: "og:title", content: "Diagnóstico IGOV.IA | Questionário" },
      { property: "og:description", content: "Responda o Diagnóstico IGOV.IA de Maturidade em IA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DiagnosticoPage,
});

type DimensionOption = { id: string; level: number; text: string };
type DimensionQuestion = {
  id: string;
  number: number;
  statement: string;
  options: DimensionOption[];
};
type DimensionPayload = {
  diagnosticId: string;
  dimension: { position: number; name: string };
  questions: DimensionQuestion[];
  answers: Record<string, string>;
  answeredCount: number;
  firstIncomplete: number;
  dimensionComplete: boolean;
};

function DiagnosticoPage() {
  const { diagnosticId, position } = useParams({
    from: "/_authenticated/diagnostico/$diagnosticId/dimensao/$position",
  });
  const navigate = useNavigate();
  const loadDimension = useServerFn(getDiagnosticDimension);
  const saveAnswer = useServerFn(saveDiagnosticAnswer);
  const finish = useServerFn(finishDiagnostic);

  const current = Number(position);
  const [payload, setPayload] = useState<DimensionPayload | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [answeredCount, setAnsweredCount] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const result = await loadDimension({ data: { diagnosticId, position: current } });
      if ("redirectToReport" in result) {
        navigate({ to: "/relatorio/$diagnosticId", params: { diagnosticId }, replace: true });
        return;
      }
      if ("redirectTo" in result) {
        navigate({
          to: "/diagnostico/$diagnosticId/dimensao/$position",
          params: { diagnosticId, position: String(result.redirectTo) },
          replace: true,
        });
        return;
      }
      setPayload(result);
      setAnswers(result.answers);
      setAnsweredCount(result.answeredCount);
    } catch {
      setError("Não foi possível carregar esta dimensão.");
    }
  }, [current, diagnosticId, loadDimension, navigate]);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleSelect(questionId: string, optionId: string) {
    const previous = answers[questionId];
    setAnswers((state) => ({ ...state, [questionId]: optionId }));
    setSaving(true);
    try {
      const result = await saveAnswer({
        data: { diagnosticId, questionId, answerOptionId: optionId },
      });
      setAnsweredCount(result.answeredCount);
    } catch {
      setAnswers((state) => {
        const next = { ...state };
        if (previous) next[questionId] = previous;
        else delete next[questionId];
        return next;
      });
      setError("Não foi possível salvar sua resposta. Verifique sua conexão.");
    } finally {
      setSaving(false);
    }
  }

  async function handleNext() {
    if (current < TOTAL_DIMENSIONS) {
      navigate({
        to: "/diagnostico/$diagnosticId/dimensao/$position",
        params: { diagnosticId, position: String(current + 1) },
      });
      return;
    }
    setSaving(true);
    try {
      const result = await finish({ data: { diagnosticId } });
      if ("incomplete" in result && result.incomplete) {
        navigate({
          to: "/diagnostico/$diagnosticId/dimensao/$position",
          params: { diagnosticId, position: String(result.goToDimension) },
        });
        setError("Ainda há perguntas não respondidas.");
        return;
      }
      navigate({ to: "/relatorio/$diagnosticId", params: { diagnosticId } });
    } catch {
      setError("Não foi possível finalizar o diagnóstico.");
    } finally {
      setSaving(false);
    }
  }

  if (!payload) {
    return (
      <PageShell>
        <div className="mx-auto max-w-3xl px-4 py-24 text-sm text-muted-foreground sm:px-6">
          {error ?? "Carregando dimensão..."}
        </div>
      </PageShell>
    );
  }

  const dimensionAnswered = payload.questions.filter((q) => answers[q.id]).length;
  const complete = dimensionAnswered === QUESTIONS_PER_DIMENSION;
  const isLast = current === TOTAL_DIMENSIONS;

  return (
    <PageShell>
      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <div className="flex items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            Dimensão {payload.dimension.position} de {TOTAL_DIMENSIONS}
          </p>
          <p>
            {answeredCount} / {TOTAL_QUESTIONS} respostas
          </p>
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${Math.round((answeredCount / TOTAL_QUESTIONS) * 100)}%` }}
          />
        </div>

        <h1 className="mt-8 text-3xl font-bold">{payload.dimension.name}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Selecione a alternativa que melhor descreve a realidade atual da sua organização.
        </p>

        {error && (
          <p role="alert" className="mt-6 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        )}

        <div className="mt-8 space-y-8">
          {payload.questions.map((question) => (
            <fieldset key={question.id} className="rounded-2xl border border-border bg-card p-5 sm:p-6">
              <legend className="px-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Pergunta {question.number}
              </legend>
              <p className="text-base font-semibold">{question.statement}</p>
              <div className="mt-4 space-y-2">
                {question.options.map((option) => {
                  const selected = answers[question.id] === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleSelect(question.id, option.id)}
                      className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                        selected
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border bg-background hover:border-foreground/30"
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[0.65rem] font-semibold ${
                          selected ? "border-primary bg-primary text-primary-foreground" : "border-border"
                        }`}
                      >
                        {selected ? <Check aria-hidden className="h-3 w-3" /> : option.level}
                      </span>
                      <span>{option.text}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            disabled={current === 1}
            onClick={() =>
              navigate({
                to: "/diagnostico/$diagnosticId/dimensao/$position",
                params: { diagnosticId, position: String(current - 1) },
              })
            }
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold transition-colors hover:bg-muted disabled:opacity-40"
          >
            <ArrowLeft aria-hidden className="h-4 w-4" />
            Anterior
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={!complete || saving}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            {isLast ? "Finalizar diagnóstico" : "Próxima dimensão"}
            <ArrowRight aria-hidden className="h-4 w-4" />
          </button>
        </div>

        {!complete && (
          <p className="mt-4 text-right text-xs text-muted-foreground">
            Responda as {QUESTIONS_PER_DIMENSION} perguntas desta dimensão para avançar.
          </p>
        )}
        {isLast && complete && (
          <p className="mt-4 text-right text-xs text-muted-foreground">
            Após finalizar, as respostas não poderão ser alteradas.
          </p>
        )}
      </section>
    </PageShell>
  );
}

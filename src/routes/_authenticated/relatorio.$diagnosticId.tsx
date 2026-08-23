import { useCallback, useEffect, useState } from "react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Download } from "lucide-react";

import { PageShell } from "@/components/PageShell";
import { formatScore } from "@/lib/igovia-domain";
import { getDiagnosticReport, getReportDownloadUrl } from "@/lib/free-plan.functions";
import type { ReportData } from "@/lib/report.server";

export const Route = createFileRoute("/_authenticated/relatorio/$diagnosticId")({
  head: () => ({
    meta: [
      { title: "Relatório de Maturidade | IGOV.IA" },
      { name: "description", content: "Relatório simplificado de maturidade em Governança de IA." },
      { property: "og:title", content: "Relatório de Maturidade | IGOV.IA" },
      { property: "og:description", content: "Relatório simplificado de maturidade em Governança de IA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: RelatorioPage,
});

function RelatorioPage() {
  const { diagnosticId } = useParams({ from: "/_authenticated/relatorio/$diagnosticId" });
  const loadReport = useServerFn(getDiagnosticReport);
  const getDownload = useServerFn(getReportDownloadUrl);

  const [data, setData] = useState<ReportData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  const load = useCallback(async () => {
    try {
      setData((await loadReport({ data: { diagnosticId } })) as ReportData);
    } catch {
      setError("Não foi possível carregar o relatório.");
    }
  }, [diagnosticId, loadReport]);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleDownload() {
    setDownloading(true);
    setError(null);
    try {
      const result = await getDownload({ data: { diagnosticId } });
      window.location.href = result.url;
    } catch {
      setError("Não foi possível gerar o PDF agora. Tente novamente.");
    } finally {
      setDownloading(false);
    }
  }

  if (!data) {
    return (
      <PageShell>
        <div className="mx-auto max-w-4xl px-4 py-24 text-sm text-muted-foreground sm:px-6">
          {error ?? "Carregando relatório..."}
        </div>
      </PageShell>
    );
  }

  const maxScore = 9;

  return (
    <PageShell>
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Relatório simplificado de maturidade
        </p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{data.organization}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Responsável: {data.responsible} · Identificador {data.publicReportId} · Framework v
          {data.frameworkVersion}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Card label="Score geral" value={`${formatScore(data.globalScore)} / 9`} />
          <Card label="Percentual" value={`${data.percentage.toFixed(0)}%`} />
          <Card label="Nível de maturidade" value={`${data.maturityLevel} — ${data.maturityName}`} />
        </div>

        {data.maturityInterpretation && (
          <p className="mt-6 rounded-2xl border border-border bg-card p-5 text-sm leading-relaxed text-muted-foreground">
            {data.maturityInterpretation}
          </p>
        )}

        <button
          onClick={handleDownload}
          disabled={downloading}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
        >
          <Download aria-hidden className="h-4 w-4" />
          {downloading ? "Gerando PDF..." : "Baixar relatório em PDF"}
        </button>

        {error && (
          <p role="alert" className="mt-4 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        )}

        <h2 className="mt-14 text-2xl font-bold">Scores por dimensão</h2>
        <div className="mt-6 space-y-4">
          {data.dimensions.map((dimension) => (
            <div key={dimension.position} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold">
                  {dimension.position}. {dimension.name}
                </p>
                <p className="text-sm font-semibold text-primary">
                  {formatScore(dimension.score)} / 9 · Nível {dimension.level}
                </p>
              </div>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${(dimension.score / maxScore) * 100}%` }}
                />
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{dimension.summary}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-14 text-2xl font-bold">Prioridades recomendadas</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {data.priorities.map((priority, index) => (
            <div key={priority.position} className="rounded-2xl border border-border bg-card p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Prioridade {index + 1}
              </p>
              <p className="mt-2 font-semibold">{priority.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Score {formatScore(priority.score)} / 9
              </p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {priority.actions.slice(0, 3).map((action) => (
                  <li key={action}>• {action}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <h2 className="mt-14 text-2xl font-bold">Orientações por resposta</h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <caption className="sr-only">Orientações associadas às respostas do diagnóstico</caption>
            <thead>
              <tr className="bg-secondary">
                <th scope="col" className="px-4 py-3 font-semibold">Dimensão</th>
                <th scope="col" className="px-4 py-3 font-semibold">Pergunta</th>
                <th scope="col" className="px-4 py-3 font-semibold">Score</th>
                <th scope="col" className="px-4 py-3 font-semibold">Prioridade</th>
                <th scope="col" className="px-4 py-3 font-semibold">Orientação</th>
              </tr>
            </thead>
            <tbody>
              {data.orientations.map((row) => (
                <tr key={`${row.dimension}-${row.questionNumber}`} className="border-t border-border">
                  <td className="px-4 py-3">{row.dimension}</td>
                  <td className="px-4 py-3">{row.questionNumber}</td>
                  <td className="px-4 py-3">{row.score}</td>
                  <td className="px-4 py-3">{row.priority}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            to="/dashboard"
            className="rounded-full border border-border px-6 py-3 text-sm font-semibold hover:bg-muted"
          >
            Voltar ao painel
          </Link>
          <Link
            to="/precos"
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Conheça os planos completos
          </Link>
        </div>
      </section>
    </PageShell>
  );
}

function Card({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      <p className="mt-2 text-lg font-semibold">{value}</p>
    </div>
  );
}

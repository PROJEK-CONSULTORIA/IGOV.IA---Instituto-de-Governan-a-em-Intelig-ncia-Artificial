import { useCallback, useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, ShieldCheck } from "lucide-react";

import { PageShell } from "@/components/PageShell";
import { supabase } from "@/integrations/supabase/client";
import { formatScore } from "@/lib/igovia-domain";
import { getDashboard, startDiagnostic } from "@/lib/free-plan.functions";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Meu painel | IGOV.IA" },
      { name: "description", content: "Acompanhe seu Diagnóstico IGOV.IA de Maturidade em IA." },
      { property: "og:title", content: "Meu painel | IGOV.IA" },
      { property: "og:description", content: "Acompanhe seu Diagnóstico IGOV.IA de Maturidade em IA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardPage,
});

type DashboardData = Awaited<ReturnType<typeof getDashboard>>;

function DashboardPage() {
  const navigate = useNavigate();
  const load = useServerFn(getDashboard);
  const start = useServerFn(startDiagnostic);
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(async () => {
    try {
      setData(await load({}));
    } catch {
      setError("Não foi possível carregar seu painel.");
    }
  }, [load]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  async function handleStart() {
    setBusy(true);
    setError(null);
    try {
      const result = await start({});
      navigate({
        to: "/diagnostico/$diagnosticId/dimensao/$position",
        params: { diagnosticId: result.id, position: "1" },
      });
    } catch (err) {
      setBusy(false);
      setError(err instanceof Error ? err.message : "Não foi possível iniciar o diagnóstico.");
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/login", replace: true });
  }

  if (!data) {
    return (
      <PageShell>
        <div className="mx-auto max-w-5xl px-4 py-24 text-sm text-muted-foreground sm:px-6">
          {error ?? "Carregando seu painel..."}
        </div>
      </PageShell>
    );
  }

  const diagnostic = data.diagnostic;
  const expired = data.subscription?.expired ?? true;

  return (
    <PageShell>
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Plano Free</p>
            <h1 className="mt-2 text-3xl font-bold">
              Olá, {data.profile?.firstName ?? "bem-vindo"}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">{data.profile?.organizationName}</p>
          </div>
          <div className="flex items-center gap-3">
            {data.isAdmin && (
              <Link
                to="/admin"
                className="rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-muted"
              >
                Administração
              </Link>
            )}
            <button
              onClick={handleSignOut}
              className="rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-muted"
            >
              Sair
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Stat label="Plano" value="FREE" />
          <Stat
            label="Acesso válido até"
            value={data.subscription?.expiresAtLabel ?? "—"}
            hint={expired ? "Acesso expirado" : `${data.subscription?.daysLeft} dia(s) restante(s)`}
          />
          <Stat
            label="Diagnósticos"
            value={diagnostic ? "1 de 1 utilizado" : "0 de 1 utilizado"}
          />
        </div>

        {error && (
          <p role="alert" className="mt-6 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        )}

        <div className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
          <h2 className="text-xl font-bold">Diagnóstico IGOV.IA de Maturidade em IA</h2>

          {!diagnostic && (
            <>
              <p className="mt-3 text-sm text-muted-foreground">
                10 dimensões · 50 perguntas · aproximadamente 20 minutos. Você tem direito a 1
                diagnóstico no plano Free.
              </p>
              {!data.frameworkReady && (
                <p className="mt-4 rounded-xl border border-border bg-background px-4 py-3 text-sm text-muted-foreground">
                  O conteúdo do diagnóstico está sendo finalizado e ficará disponível em breve.
                </p>
              )}
              <button
                onClick={handleStart}
                disabled={busy || expired || !data.frameworkReady}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
              >
                Iniciar Diagnóstico
                <ArrowRight aria-hidden className="h-4 w-4" />
              </button>
              {expired && (
                <p className="mt-3 text-sm text-muted-foreground">
                  Seu período gratuito terminou.{" "}
                  <Link to="/precos" className="font-semibold text-primary hover:underline">
                    Conheça os planos
                  </Link>
                  .
                </p>
              )}
            </>
          )}

          {diagnostic?.status === "IN_PROGRESS" && (
            <>
              <p className="mt-3 text-sm text-muted-foreground">
                {diagnostic.answeredCount} de 50 perguntas respondidas.
              </p>
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${diagnostic.progress}%` }}
                />
              </div>
              <button
                onClick={handleStart}
                disabled={busy || expired}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
              >
                Continuar Diagnóstico
                <ArrowRight aria-hidden className="h-4 w-4" />
              </button>
            </>
          )}

          {diagnostic?.status === "COMPLETED" && (
            <>
              <p className="mt-3 flex items-center gap-2 text-sm text-primary">
                <ShieldCheck aria-hidden className="h-4 w-4" /> Diagnóstico concluído
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                Score geral:{" "}
                <span className="font-semibold text-foreground">
                  {diagnostic.globalScore != null ? `${formatScore(diagnostic.globalScore)} / 9` : "—"}
                </span>{" "}
                · Nível {diagnostic.maturityLevel}
              </p>
              <Link
                to="/relatorio/$diagnosticId"
                params={{ diagnosticId: diagnostic.id }}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Ver relatório
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
              <p className="mt-3 text-sm text-muted-foreground">
                O plano Free permite apenas 1 diagnóstico.
              </p>
            </>
          )}
        </div>
      </section>
    </PageShell>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      <p className="mt-2 text-lg font-semibold">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

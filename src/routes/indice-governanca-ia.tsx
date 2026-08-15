import { createFileRoute, Link } from "@tanstack/react-router";
import { Compass, Users, Server, Wallet, Database, UserCheck, ScaleIcon, Lock, Network, Activity, ArrowRight } from "lucide-react";
import { PageShell, PageHero } from "@/components/PageShell";

export const Route = createFileRoute("/indice-governanca-ia")({
  head: () => ({
    meta: [
      { title: "Índice de Governança em IA — IGOV.IA" },
      { name: "description", content: "As 10 dimensões da governança em IA: estratégia, dados, riscos, segurança, ética e mais." },
      { property: "og:title", content: "Índice de Governança em IA — IGOV.IA" },
      { property: "og:description", content: "Framework do IGOV.IA para avaliar e evoluir a maturidade institucional em IA." },
    ],
  }),
  component: IndicePage,
});

const dimensoes = [
  { icon: Compass, t: "Estratégia e Governança", d: "Alinhamento estratégico e políticas corporativas claras." },
  { icon: Users, t: "Cultura, Pessoas e Comunicação", d: "Capacitação de times e gestão de mudanças organizacionais." },
  { icon: Server, t: "Estrutura Tecnológica", d: "Infraestrutura robusta para suportar modelos de IA." },
  { icon: Wallet, t: "Investimentos, Custos e Despesas", d: "Gestão financeira eficiente de projetos de IA." },
  { icon: Database, t: "Qualidade de Dados", d: "Governança de dados para garantir inputs confiáveis." },
  { icon: UserCheck, t: "Impacto no Usuário Final", d: "Experiência do usuário e transparência nas interações." },
  { icon: ScaleIcon, t: "Compliance, Riscos e Ética", d: "Conformidade legal e princípios éticos aplicados." },
  { icon: Lock, t: "Segurança da Informação", d: "Proteção contra vulnerabilidades e ataques adversariais." },
  { icon: Network, t: "Fornecedores e Integrações", d: "Gestão de riscos em ecossistemas de terceiros." },
  { icon: Activity, t: "Monitoramento e Melhoria Contínua", d: "Métricas de performance e reavaliação constante." },
];

function IndicePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Índice de Governança em IA"
        title="As 10 dimensões que sustentam a maturidade institucional em IA."
        description="Nossa metodologia avalia e orienta a adoção da IA a partir de dimensões estratégicas, técnicas, jurídicas e operacionais."
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {dimensoes.map(({ icon: Icon, t, d }, i) => (
            <article key={t} className="group rounded-2xl border border-border bg-card/60 p-6 transition-colors hover:border-primary/50 hover:bg-card">
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-5 text-base font-semibold text-foreground">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border/60 bg-card/30">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Como funciona</p>
          <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">Um diagnóstico estruturado, evolutivo e mensurável.</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { n: "01", t: "Avaliação", d: "Mapeamento institucional das 10 dimensões com instrumentos próprios." },
              { n: "02", t: "Pontuação", d: "Classificação de maturidade por dimensão e visão consolidada." },
              { n: "03", t: "Plano", d: "Recomendações priorizadas e jornada de evolução personalizada." },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-border bg-background p-6">
                <span className="font-mono text-sm text-primary">{s.n}</span>
                <h3 className="mt-3 text-lg font-semibold text-foreground">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-primary/30 bg-gradient-to-br from-card via-card to-primary/10 p-10">
          <div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Solicite um diagnóstico para sua organização</h2>
            <p className="mt-2 text-muted-foreground">Aplique o Índice e descubra os próximos passos da sua jornada em IA.</p>
          </div>
          <Link to="/contato" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            Solicitar diagnóstico <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
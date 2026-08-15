import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, Compass, LineChart, Layers, Bot, GraduationCap, ArrowRight } from "lucide-react";
import { PageShell, PageHero } from "@/components/PageShell";

export const Route = createFileRoute("/o-que-fazemos")({
  head: () => ({
    meta: [
      { title: "O que fazemos — IGOV.IA" },
      { name: "description", content: "Diagnóstico, governança, gestão de projetos, agentes inteligentes e capacitação em Inteligência Artificial." },
      { property: "og:title", content: "O que fazemos — IGOV.IA" },
      { property: "og:description", content: "Serviços do IGOV.IA: diagnóstico, governança, projetos, agentes e capacitação em IA." },
    ],
  }),
  component: ServicosPage,
});

const servicos = [
  { icon: Activity, t: "Diagnóstico de maturidade em IA", d: "Avaliação institucional do estágio atual da organização em relação às dimensões da governança em IA." },
  { icon: Compass, t: "Estratégia e governança", d: "Estruturação de políticas, modelos de decisão e jornadas para evolução sustentável da IA." },
  { icon: LineChart, t: "Análise de mercado e inteligência estratégica", d: "Insights de mercado, benchmarks e cenários para sustentar decisões orientadas a dados." },
  { icon: Layers, t: "Gestão de projetos de IA", d: "Metodologia própria para organizar, acompanhar e entregar projetos de Inteligência Artificial." },
  { icon: Bot, t: "Agentes inteligentes", d: "Desenvolvimento de agentes para automação, produtividade e suporte à tomada de decisão." },
  { icon: GraduationCap, t: "Capacitação e gestão de mudança", d: "Formação de lideranças e times, com foco em cultura, ética e adoção responsável." },
];

const jornada = [
  "Diagnosticar", "Planejar", "Estruturar", "Capacitar",
  "Implementar", "Monitorar", "Reavaliar", "Evoluir",
];

function ServicosPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="O que fazemos"
        title="Um portfólio integrado para adoção responsável da IA."
        description="Combinamos governança, diagnóstico, gestão de projetos e desenvolvimento técnico em uma abordagem contínua e mensurável."
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {servicos.map(({ icon: Icon, t, d }) => (
            <article key={t} className="group rounded-2xl border border-border bg-card/60 p-6 transition-colors hover:border-primary/50 hover:bg-card">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border/60 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Jornada de Evolução</p>
            <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
              Um ciclo estruturado para evoluir a maturidade institucional.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Ciclos conectam diagnóstico, estratégia, governança, execução e evolução contínua das soluções implementadas.
            </p>
          </div>
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {jornada.map((step, i) => (
              <li key={step} className="rounded-2xl border border-border bg-background p-5">
                <span className="text-xs font-semibold text-primary">Etapa {i + 1}</span>
                <h3 className="mt-2 text-xl font-semibold text-foreground">{step}</h3>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-primary/30 bg-gradient-to-br from-card via-card to-primary/10 p-10">
          <div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Quer aplicar essa metodologia na sua organização?</h2>
            <p className="mt-2 text-muted-foreground">Conheça o Índice de Governança em IA ou fale com nossa equipe.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/indice-governanca-ia" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground hover:bg-card">Ver o Índice</Link>
            <Link to="/contato" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Fale conosco <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
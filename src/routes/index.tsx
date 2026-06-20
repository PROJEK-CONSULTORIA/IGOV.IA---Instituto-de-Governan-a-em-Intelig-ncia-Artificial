import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Compass, Shield, BarChart3, Cog, Bot, Sparkles } from "lucide-react";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IGOV.IA — Governança em Inteligência Artificial" },
      { name: "description", content: "Instituto que apoia organizações na adoção ética, segura e estratégica da Inteligência Artificial." },
      { property: "og:title", content: "IGOV.IA — Governança em Inteligência Artificial" },
      { property: "og:description", content: "Diagnóstico de maturidade, governança, capacitação e implementação responsável de IA." },
    ],
  }),
  component: Index,
});

function Index() {
  const pillars = [
    { icon: Compass, title: "Estratégia", text: "Alinhamento de IA à estratégia institucional." },
    { icon: Shield, title: "Governança", text: "Riscos, ética, compliance e segurança jurídica." },
    { icon: BarChart3, title: "Maturidade", text: "Diagnóstico, métricas e evolução contínua." },
    { icon: Cog, title: "Projetos", text: "Metodologia própria para projetos de IA." },
    { icon: Bot, title: "Agentes", text: "Desenvolvimento de agentes inteligentes." },
    { icon: Sparkles, title: "Capacitação", text: "Formação de lideranças e times técnicos." },
  ];
  const audiences = [
    { title: "Setor Público", text: "Adoção responsável de IA, governança institucional e melhoria de serviços públicos." },
    { title: "Indústria", text: "Estruturação de projetos, automações e inteligência aplicada à eficiência operacional." },
    { title: "Comércio", text: "Análise de mercado, produtividade e uso estratégico da IA em processos comerciais." },
    { title: "Serviços", text: "Soluções inteligentes para atendimento, gestão e tomada de decisão." },
  ];
  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 60% at 20% 10%, oklch(0.74 0.18 134 / 0.22), transparent 70%), radial-gradient(50% 50% at 90% 30%, oklch(0.74 0.18 134 / 0.12), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-36">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            IGOVIA — Instituto de Governança em Inteligência Artificial
          </p>
          <h1 className="max-w-4xl text-4xl font-bold leading-[1.05] text-foreground sm:text-6xl lg:text-7xl">
            Sua Jornada Segura na Era da Inteligência Artificial.
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
            Apoiamos organizações públicas e privadas na adoção, estruturação e evolução da
            Inteligência Artificial — com estratégia, governança e aplicação prática.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/o-que-fazemos"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Conheça nossas soluções <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/indice-governanca-ia"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-card"
            >
              Índice de Governança em IA
            </Link>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">O que oferecemos</p>
          <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
            Um ecossistema estruturado para adoção, gestão e evolução da IA.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Mais do que implementar ferramentas, o IGOV.IA orienta a construção de uma base
            estratégica para que a IA seja aplicada com segurança, eficiência e impacto real.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map(({ icon: Icon, title, text }) => (
            <div key={title} className="group rounded-2xl border border-border bg-card/60 p-6 transition-colors hover:border-primary/50 hover:bg-card">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Audiences */}
      <section className="border-y border-border/60 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Para quem é o IGOV.IA</p>
              <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
                Soluções adaptáveis ao contexto de cada organização.
              </h2>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {audiences.map((a) => (
              <div key={a.title} className="rounded-2xl border border-border bg-background p-6">
                <h3 className="text-lg font-semibold text-foreground">{a.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-card via-card to-primary/10 p-10 sm:p-14">
          <h2 className="max-w-3xl text-3xl font-bold text-foreground sm:text-4xl">
            Construir um futuro em que a IA seja governada com responsabilidade.
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Conheça nossa proposta institucional, metodologia e como podemos apoiar sua organização.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/sobre" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              Conheça o Instituto <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contato" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-card">
              Falar com a equipe
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

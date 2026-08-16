import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass, Shield, BarChart3, Cog, Bot, Sparkles, BookOpen, Calendar, Gauge } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { HeroStatsPanel } from "@/components/HeroStatsPanel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IGOV.IA — Governando o futuro da Inteligência Artificial" },
      { name: "description", content: "O IGOV.IA ajuda organizações públicas e privadas a implementar Inteligência Artificial com estratégia, confiança e responsabilidade." },
      { property: "og:title", content: "IGOV.IA — Governando o futuro da Inteligência Artificial" },
      { property: "og:description", content: "Diagnóstico de maturidade, framework de governança e implementação responsável de IA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const pillars = [
  { icon: Compass, title: "Estratégia", text: "Alinhamento da IA à estratégia institucional." },
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

const dimensions = [
  "Estratégia e Governança",
  "Cultura, Pessoas e Comunicação",
  "Estrutura Tecnológica",
  "Investimentos, Custos e Despesas",
  "Qualidade de Dados",
  "Impacto no Usuário Final",
  "Compliance, Riscos e Ética",
  "Segurança da Informação",
  "Fornecedores e Integrações",
  "Monitoramento e Melhoria Contínua",
];

const explore = [
  { icon: Gauge, t: "Framework", d: "As 10 dimensões que estruturam a governança de IA.", to: "/framework" as const },
  { icon: Cog, t: "Soluções", d: "Diagnóstico, consultoria, educação e agentes inteligentes.", to: "/solucoes" as const },
  { icon: BookOpen, t: "Publicações", d: "Artigos, pesquisas e análises sobre IA responsável.", to: "/knowledge-hub" as const },
  { icon: Calendar, t: "AI Governance Forum", d: "Encontros e debates sobre o futuro da governança.", to: "/forum" as const },
];

const cardClass =
  "group rounded-2xl border border-border bg-card/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-card hover:shadow-[0_20px_50px_-30px_var(--color-primary)]";

function Index() {
  return (
    <PageShell transparentHeader>
      {/* Hero */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <Parallax speed={0.05} className="pointer-events-none absolute inset-0">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(55% 55% at 18% 20%, oklch(0.74 0.18 134 / 0.20), transparent 70%), radial-gradient(45% 45% at 88% 30%, oklch(0.74 0.18 134 / 0.10), transparent 70%)",
            }}
          />
        </Parallax>

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-4 pb-24 pt-36 sm:px-6 lg:grid-cols-[1.4fr_0.6fr] lg:px-8 lg:pb-32 lg:pt-40">
          <div>
            <Reveal>
              <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary">
                IGOV.IA — INSTITUTO DE GOVERNANÇA EM INTELIGÊNCIA ARTIFICIAL
              </p>
            </Reveal>
            <Reveal delay={90}>
              <h1 className="max-w-3xl text-4xl font-bold leading-[1.05] text-foreground sm:text-6xl lg:text-7xl">
                Governando o futuro da Inteligência Artificial.
              </h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                O IGOV.IA ajuda organizações públicas e privadas a implementar Inteligência
                Artificial com estratégia, confiança e responsabilidade.
              </p>
            </Reveal>
            <Reveal delay={270}>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  to="/contato"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-[0_16px_40px_-16px_var(--color-primary)]"
                >
                  Solicitar Diagnóstico
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/framework"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-7 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-card"
                >
                  Conhecer o Framework
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={320} y={32}>
            <Parallax speed={0.08}>
              <HeroStatsPanel />
            </Parallax>
          </Reveal>
        </div>
      </section>

      {/* Pilares */}
      <section className="flex min-h-screen items-center border-t border-border/60">
        <div className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-14 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">O que oferecemos</p>
              <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-5xl">
                Um ecossistema estruturado para adoção, gestão e evolução da IA.
              </h2>
              <p className="mt-5 text-muted-foreground">
                Mais do que implementar ferramentas, o IGOV.IA orienta a construção de uma base
                estratégica para que a IA seja aplicada com segurança, eficiência e impacto real.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 70}>
                <div className={cardClass}>
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/15 text-primary transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Framework em destaque */}
      <section className="relative flex min-h-screen items-center overflow-hidden border-t border-border/60 bg-card/20">
        <Parallax speed={0.04} className="pointer-events-none absolute inset-0">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: "radial-gradient(45% 45% at 80% 50%, oklch(0.74 0.18 134 / 0.12), transparent 70%)",
            }}
          />
        </Parallax>
        <div className="relative mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-14 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Framework</p>
              <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-5xl">
                10 dimensões para medir e evoluir a maturidade em IA.
              </h2>
              <p className="mt-5 text-muted-foreground">
                Mais de 100 questões e 9 níveis de maturidade que revelam onde sua organização está
                e o caminho para onde precisa chegar.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {dimensions.map((d, i) => (
              <Reveal key={d} delay={i * 45}>
                <div className="group flex h-full flex-col gap-3 rounded-xl border border-border bg-background/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50">
                  <span className="text-xs font-semibold text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-sm font-medium text-foreground">{d}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <Link
              to="/framework"
              className="group mt-12 inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              Explorar o framework completo
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Públicos */}
      <section className="flex min-h-screen items-center border-t border-border/60">
        <div className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-14 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Para quem é o IGOV.IA</p>
              <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-5xl">
                Soluções adaptáveis ao contexto de cada organização.
              </h2>
            </div>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {audiences.map((a, i) => (
              <Reveal key={a.title} delay={i * 80}>
                <div className={cardClass}>
                  <h3 className="text-lg font-semibold text-foreground">{a.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{a.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Explore + CTA */}
      <section className="flex min-h-screen items-center border-t border-border/60">
        <div className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-14 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Explore o IGOV.IA</p>
              <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-5xl">
                Conteúdo, metodologia e comunidade em um só lugar.
              </h2>
            </div>
          </Reveal>
          <div className="mb-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {explore.map(({ icon: Icon, t, d, to }, i) => (
              <Reveal key={t} delay={i * 80}>
                <Link to={to} className={`flex h-full flex-col ${cardClass}`}>
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/15 text-primary transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">{t}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{d}</p>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Saiba mais
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={100}>
            <div className="overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-card via-card to-primary/10 p-10 transition-colors duration-500 hover:border-primary/60 sm:p-14">
              <h2 className="max-w-3xl text-3xl font-bold text-foreground sm:text-4xl">
                Construir um futuro em que a IA seja governada com responsabilidade.
              </h2>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                Conheça nossa proposta institucional, metodologia e como podemos apoiar sua organização.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/contato"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
                >
                  Solicitar Diagnóstico
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/instituto"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-card"
                >
                  Conhecer o Instituto
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import {
  dimensions,
  solutions,
  journey,
  ecosystem,
  knowledge,
  media,
  cases,
  testimonials,
  trustedBy,
} from "@/content/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IGOV.IA — Governança em Inteligência Artificial" },
      {
        name: "description",
        content:
          "Instituto de Governança em Inteligência Artificial. Diagnóstico de maturidade, framework de 10 dimensões e jornada segura de adoção de IA.",
      },
      { property: "og:title", content: "IGOV.IA — Governança em Inteligência Artificial" },
      {
        property: "og:description",
        content: "Sua jornada segura na era da Inteligência Artificial.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <PageShell overlayHeader>
      <Hero />
      <TrustedBy />
      <Challenge />
      <Ecosystem />
      <Framework />
      <HowItWorks />
      <Solutions />
      <Results />
      <Cases />
      <Testimonials />
      <Media />
      <KnowledgeHub />
      <Forum />
      <FinalCTA />
    </PageShell>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 60% at 15% 20%, oklch(0.68 0.16 133 / 0.14), transparent 70%), radial-gradient(45% 50% at 85% 10%, oklch(0.68 0.16 133 / 0.07), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, oklch(0.9 0 0) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.9 0 0) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(70% 60% at 50% 40%, black, transparent)",
        }}
      />
      <div className="relative mx-auto w-full max-w-7xl px-6 pb-24 pt-40 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-[11px] font-medium uppercase tracking-[0.24em] text-primary"
        >
          IGOV.IA — INSTITUTO DE GOVERNANÇA EM INTELIGÊNCIA ARTIFICIAL
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-4xl text-5xl font-semibold leading-[1.02] text-foreground sm:text-6xl lg:text-7xl"
        >
          Sua jornada segura na era da Inteligência Artificial.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground"
        >
          Apoiamos organizações públicas e privadas na adoção ética, segura e estratégica da IA —
          com framework próprio, diagnóstico de maturidade e execução governada.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-wrap gap-3"
        >
          <Link
            to="/contato"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            Solicitar Diagnóstico <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/framework"
            className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            Conhecer o Framework
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function TrustedBy() {
  const items = [...trustedBy, ...trustedBy];
  return (
    <section className="border-y border-border bg-secondary/40 py-10">
      <p className="mb-8 text-center text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
        Organizações que confiam no IGOV.IA
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="marquee-track flex w-max gap-16 px-8">
          {items.map((t, i) => (
            <span key={`${t}-${i}`} className="whitespace-nowrap text-sm font-medium text-muted-foreground">
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Challenge() {
  const stats = [
    { value: 78, suffix: "%", label: "das organizações usam IA sem política formal de governança" },
    { value: 3, suffix: "x", label: "mais riscos regulatórios em adoções não estruturadas" },
    { value: 10, suffix: "", label: "dimensões críticas que precisam ser avaliadas" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
      <div className="grid gap-16 lg:grid-cols-2">
        <Reveal>
          <h2 className="max-w-xl text-4xl font-semibold leading-[1.08] text-foreground sm:text-5xl">
            Adotar IA é fácil. Governar IA é o desafio real.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg leading-relaxed text-muted-foreground">
            A maioria das organizações inicia projetos de Inteligência Artificial sem estratégia,
            sem controles e sem clareza sobre riscos. O resultado é desperdício de investimento,
            exposição regulatória e perda de confiança. O IGOV.IA existe para transformar esse
            movimento disperso em uma jornada estruturada.
          </p>
        </Reveal>
      </div>
      <div className="mt-20 grid gap-10 border-t border-border pt-14 md:grid-cols-3">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <p className="text-5xl font-semibold tabular-nums text-foreground">
              <Counter to={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Ecosystem() {
  return (
    <section className="border-y border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.24em] text-primary">Ecossistema</p>
          <h2 className="mt-4 max-w-2xl text-4xl font-semibold leading-[1.08] text-foreground sm:text-5xl">
            Um ecossistema completo de governança em IA.
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {ecosystem.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.04}>
              <div className="group h-full bg-background p-8 transition-colors duration-500 hover:bg-card">
                <span className="text-xs tabular-nums text-primary">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{e.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Framework() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
      <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div className="lg:sticky lg:top-32">
            <p className="text-[11px] uppercase tracking-[0.24em] text-primary">Framework IGOV.IA</p>
            <h2 className="mt-4 text-4xl font-semibold leading-[1.08] text-foreground sm:text-5xl">
              10 dimensões. 100+ questões. 9 níveis de maturidade.
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
              Um instrumento estruturado para medir onde sua organização está e definir com precisão
              o caminho de evolução em governança de Inteligência Artificial.
            </p>
            <Link
              to="/framework"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              Explorar o framework <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {dimensions.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.03}>
              <div className="border-t border-border pt-5">
                <div className="flex items-baseline gap-3">
                  <span className="text-xs tabular-nums text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-base font-semibold text-foreground">{d.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="bg-ink">
      <div className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.24em] text-primary">Como funciona</p>
          <h2 className="mt-4 max-w-2xl text-4xl font-semibold leading-[1.08] text-ink-foreground sm:text-5xl">
            Uma jornada em cinco etapas.
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-10 md:grid-cols-5">
          {journey.map((j, i) => (
            <Reveal key={j.title} delay={i * 0.07}>
              <div className="border-t-2 border-primary/50 pt-5">
                <span className="text-xs tabular-nums text-primary">0{i + 1}</span>
                <h3 className="mt-2 text-base font-semibold text-ink-foreground">{j.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-foreground/60">{j.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Solutions() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
      <Reveal>
        <p className="text-[11px] uppercase tracking-[0.24em] text-primary">Soluções</p>
        <h2 className="mt-4 max-w-2xl text-4xl font-semibold leading-[1.08] text-foreground sm:text-5xl">
          Do diagnóstico à operação responsável.
        </h2>
      </Reveal>
      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {solutions.map((s, i) => (
          <Reveal key={s.slug} delay={i * 0.05} className="h-full">
            <Link
              to="/solucoes"
              className="flex h-full flex-col rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_60px_-36px_rgba(0,0,0,0.35)]"
            >
              <h3 className="text-xl font-semibold text-foreground">{s.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              <span className="mt-8 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Saiba mais <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Results() {
  const items = [
    { value: 120, suffix: "+", label: "Lideranças capacitadas" },
    { value: 10, suffix: "", label: "Dimensões avaliadas por diagnóstico" },
    { value: 100, suffix: "+", label: "Questões estruturadas" },
    { value: 9, suffix: "", label: "Níveis de maturidade mapeados" },
  ];
  return (
    <section className="border-y border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {items.map((it, i) => (
          <Reveal key={it.label} delay={i * 0.06}>
            <p className="text-5xl font-semibold tabular-nums text-foreground">
              <Counter to={it.value} suffix={it.suffix} />
            </p>
            <p className="mt-3 text-sm text-muted-foreground">{it.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Cases() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
      <Reveal>
        <p className="text-[11px] uppercase tracking-[0.24em] text-primary">Casos</p>
        <h2 className="mt-4 max-w-2xl text-4xl font-semibold leading-[1.08] text-foreground sm:text-5xl">
          Resultados em organizações reais.
        </h2>
      </Reveal>
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {cases.map((c, i) => (
          <Reveal key={c.org} delay={i * 0.06} className="h-full">
            <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-8">
              <h3 className="text-lg font-semibold text-foreground">{c.org}</h3>
              <dl className="mt-6 space-y-5 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Problema</dt>
                  <dd className="mt-1 leading-relaxed text-foreground">{c.problem}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Solução</dt>
                  <dd className="mt-1 leading-relaxed text-foreground">{c.solution}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-primary">Resultado</dt>
                  <dd className="mt-1 font-medium leading-relaxed text-foreground">{c.result}</dd>
                </div>
              </dl>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="border-y border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
        <Reveal>
          <h2 className="max-w-2xl text-4xl font-semibold leading-[1.08] text-foreground sm:text-5xl">
            O que dizem as lideranças.
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.quote} delay={i * 0.06} className="h-full">
              <figure className="flex h-full flex-col rounded-2xl border border-border bg-background p-8">
                <blockquote className="flex-1 text-lg leading-relaxed text-foreground">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-8 text-sm">
                  <span className="font-semibold text-foreground">{t.name}</span>
                  <span className="block text-muted-foreground">
                    {t.role} · {t.company}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Media() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <Reveal>
        <p className="text-[11px] uppercase tracking-[0.24em] text-primary">Na mídia</p>
      </Reveal>
      <div className="mt-10 divide-y divide-border border-y border-border">
        {media.map((m, i) => (
          <Reveal key={m.title} delay={i * 0.05}>
            <div className="flex flex-wrap items-center justify-between gap-4 py-6">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{m.outlet}</p>
                <p className="mt-2 text-base text-foreground">{m.title}</p>
              </div>
              <span className="text-sm text-muted-foreground">{m.date}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function KnowledgeHub() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-primary">Knowledge Hub</p>
            <h2 className="mt-4 max-w-2xl text-4xl font-semibold leading-[1.08] text-foreground sm:text-5xl">
              Pesquisa e análise sobre IA responsável.
            </h2>
          </div>
          <Link to="/knowledge-hub" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
            Ver tudo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {knowledge.map((k, i) => {
          const inner = (
            <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">{k.category}</span>
                <span>{k.readingTime}</span>
              </div>
              <h3 className="mt-6 flex-1 text-lg font-semibold leading-snug text-foreground">{k.title}</h3>
              <span className="mt-8 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                {k.href ? "Ler artigo" : "Em breve"} <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          );
          return (
            <Reveal key={k.title} delay={i * 0.06} className="h-full">
              {k.href ? (
                <a href={k.href} target="_blank" rel="noopener noreferrer" className="block h-full">
                  {inner}
                </a>
              ) : (
                inner
              )}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function Forum() {
  return (
    <section className="border-y border-border bg-secondary/40">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-10 px-6 py-24 lg:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.24em] text-primary">AI Governance Forum</p>
            <h2 className="mt-4 text-4xl font-semibold leading-[1.08] text-foreground sm:text-5xl">
              O encontro das lideranças que decidem o futuro da IA.
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <Link
            to="/forum"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-card"
          >
            Conhecer o Forum <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="bg-ink">
      <div className="mx-auto max-w-4xl px-6 py-32 text-center lg:px-8">
        <Reveal>
          <h2 className="text-4xl font-semibold leading-[1.06] text-ink-foreground sm:text-5xl">
            Comece pela pergunta mais importante: qual é a sua maturidade em IA?
          </h2>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-ink-foreground/60">
            Solicite o diagnóstico do IGOV.IA e receba um retrato preciso do estágio atual da sua
            organização, com o caminho de evolução recomendado.
          </p>
          <Link
            to="/contato"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            Solicitar Diagnóstico <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
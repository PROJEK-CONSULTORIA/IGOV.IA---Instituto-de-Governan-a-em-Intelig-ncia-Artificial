import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageShell, PageHero } from "@/components/PageShell";
import { Reveal } from "@/components/motion/Reveal";
import { EnrollButton } from "@/components/EnrollButton";
import { cursos } from "@/content/cursos";

export const Route = createFileRoute("/cursos/")({
  head: () => ({
    meta: [
      { title: "Cursos em Governança de Inteligência Artificial | IGOV.IA" },
      {
        name: "description",
        content:
          "Formação executiva em Governança de Inteligência Artificial. Conheça os cursos do IGOV.IA para executivos, gestores e líderes.",
      },
      { property: "og:title", content: "Cursos em Governança de Inteligência Artificial | IGOV.IA" },
      {
        property: "og:description",
        content:
          "Formação executiva em Governança de Inteligência Artificial. Conheça os cursos do IGOV.IA para executivos, gestores e líderes.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://igovia.com.br/cursos" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://igovia.com.br/cursos" }],
  }),
  component: CursosPage,
});

function CursosPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="IGOV.IA Education — Formação Executiva"
        title="Formação para quem precisa liderar a IA."
        description="Conhecimento aplicado para executivos, gestores e profissionais responsáveis pelas decisões estratégicas relacionadas à Inteligência Artificial."
      />

      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <Reveal>
          <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
            Os programas educacionais do IGOV.IA conectam estratégia, tecnologia, riscos, ética,
            governança e aplicação prática para preparar líderes para os desafios da nova economia
            orientada por Inteligência Artificial.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-10 max-w-2xl">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Cursos</h2>
            <p className="mt-3 text-muted-foreground">
              Formação executiva em Governança de Inteligência Artificial.
            </p>
          </div>
        </Reveal>

        <div className="flex flex-col gap-8">
          {cursos.map((c, i) => (
            <Reveal key={c.slug} delay={i * 90}>
              <article className="relative overflow-hidden rounded-3xl border border-border bg-card/50 p-8 transition-colors duration-500 hover:border-primary/50 sm:p-12">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-70"
                  style={{
                    background:
                      "radial-gradient(45% 60% at 85% 10%, oklch(0.74 0.18 134 / 0.10), transparent 70%)",
                  }}
                />
                <div className="relative">
                  <span className="inline-flex rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary">
                    {c.badge}
                  </span>

                  <h3 className="mt-6 max-w-3xl text-2xl font-bold leading-tight text-foreground sm:text-4xl">
                    {c.titulo}
                    {c.complemento && (
                      <span className="block text-lg font-medium text-muted-foreground sm:text-2xl">
                        {c.complemento}
                      </span>
                    )}
                  </h3>

                  <p className="mt-4 max-w-2xl text-base text-muted-foreground">{c.frase}</p>

                  {/* Informações rápidas */}
                  <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
                    {c.quickFacts.map((f) => (
                      <div key={f.label} className="bg-background/70 px-5 py-4">
                        <dt className="text-sm font-semibold uppercase tracking-wide text-primary">{f.value}</dt>
                        <dd className="mt-1 text-xs text-muted-foreground">{f.label}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-8 max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground">
                    {c.descricao.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>

                  <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <EnrollButton className="w-full sm:w-auto" />
                    <Link
                      to={c.to}
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card/40 px-7 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-card sm:w-auto"
                    >
                      Veja mais
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { Reveal } from "@/components/motion/Reveal";
import { dimensions } from "@/content/site";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/framework")({
  head: () => ({
    meta: [
      { title: "Framework de Governança em IA | IGOV.IA" },
      { name: "description", content: "As 10 dimensões, 100+ questões e 9 níveis de maturidade do Framework IGOV.IA de Governança em Inteligência Artificial." },
      { property: "og:title", content: "Framework de Governança em IA | IGOV.IA" },
      { property: "og:description", content: "10 dimensões, 100+ questões e 9 níveis de maturidade para governar IA com responsabilidade." },
    ],
  }),
  component: FrameworkPage,
});

function FrameworkPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Framework"
        title="O Framework de Governança em IA."
        description="Um instrumento estruturado para medir, planejar e evoluir a maturidade em Inteligência Artificial: 10 dimensões, mais de 100 questões e 9 níveis de evolução."
      />
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-x-16 gap-y-14 md:grid-cols-2">
          {dimensions.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.03}>
              <div className="border-t border-border pt-6">
                <div className="flex items-baseline gap-4">
                  <span className="text-sm font-medium tabular-nums text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-xl font-semibold text-foreground">{d.title}</h2>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="bg-ink">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center lg:px-8">
          <h2 className="text-3xl font-semibold text-ink-foreground sm:text-4xl">
            Descubra em qual dos 9 níveis sua organização está.
          </h2>
          <Link
            to="/contato"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            Solicitar Diagnóstico <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
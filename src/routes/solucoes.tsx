import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { Reveal } from "@/components/motion/Reveal";
import { solutions, journey } from "@/content/site";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/solucoes")({
  head: () => ({
    meta: [
      { title: "Soluções em Governança de IA | IGOV.IA" },
      { name: "description", content: "Diagnóstico, consultoria, educação executiva e agentes de IA para organizações públicas e privadas." },
      { property: "og:title", content: "Soluções em Governança de IA | IGOV.IA" },
      { property: "og:description", content: "Quatro frentes integradas para estruturar e evoluir a governança em Inteligência Artificial." },
    ],
  }),
  component: SolucoesPage,
});

function SolucoesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Soluções"
        title="Do diagnóstico à operação responsável de IA."
        description="Quatro frentes integradas que levam a organização do entendimento do próprio estágio até a execução governada de projetos de Inteligência Artificial."
      />
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {solutions.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.05}>
              <div className="group h-full rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)]">
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-4 text-2xl font-semibold text-foreground">{s.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <Reveal>
            <h2 className="max-w-2xl text-3xl font-semibold text-foreground sm:text-4xl">
              Como trabalhamos
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-8 md:grid-cols-5">
            {journey.map((j, i) => (
              <Reveal key={j.title} delay={i * 0.06}>
                <div className="border-t-2 border-primary/30 pt-5">
                  <span className="text-xs font-medium tabular-nums text-primary">0{i + 1}</span>
                  <h3 className="mt-2 text-base font-semibold text-foreground">{j.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{j.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Link
            to="/contato"
            className="mt-14 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            Falar com um especialista <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
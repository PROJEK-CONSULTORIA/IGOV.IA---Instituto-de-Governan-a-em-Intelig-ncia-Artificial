import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { Reveal } from "@/components/motion/Reveal";
import { knowledge, media } from "@/content/site";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/knowledge-hub")({
  head: () => ({
    meta: [
      { title: "Knowledge Hub | IGOV.IA" },
      { name: "description", content: "Pesquisas, artigos e análises do IGOV.IA sobre governança, regulação e uso responsável da Inteligência Artificial." },
      { property: "og:title", content: "Knowledge Hub | IGOV.IA" },
      { property: "og:description", content: "Conhecimento aplicado sobre governança em Inteligência Artificial." },
    ],
  }),
  component: KnowledgePage,
});

function KnowledgePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Knowledge Hub"
        title="Conhecimento aplicado sobre IA responsável."
        description="Pesquisas, artigos e análises produzidos e curados pelo IGOV.IA para apoiar decisões de governança."
      />
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {knowledge.map((k, i) => {
            const Inner = (
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">{k.category}</span>
                  <span>{k.readingTime} de leitura</span>
                </div>
                <h2 className="mt-6 flex-1 text-lg font-semibold leading-snug text-foreground">{k.title}</h2>
                <span className="mt-8 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  {k.href ? "Ler artigo" : "Em breve"} <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            );
            return (
              <Reveal key={k.title} delay={i * 0.05} className="h-full">
                {k.href ? (
                  <a href={k.href} target="_blank" rel="noopener noreferrer" className="block h-full">
                    {Inner}
                  </a>
                ) : (
                  Inner
                )}
              </Reveal>
            );
          })}
        </div>
      </section>
      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <Reveal>
            <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">Na mídia</h2>
          </Reveal>
          <div className="mt-12 divide-y divide-border border-y border-border">
            {media.map((m, i) => (
              <Reveal key={m.title} delay={i * 0.05}>
                <div className="flex flex-wrap items-center justify-between gap-4 py-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-primary">{m.outlet}</p>
                    <p className="mt-2 text-base font-medium text-foreground">{m.title}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{m.date}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
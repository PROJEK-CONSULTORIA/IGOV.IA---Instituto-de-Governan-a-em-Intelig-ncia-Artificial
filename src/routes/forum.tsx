import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, MapPin } from "lucide-react";
import { PageShell, PageHero } from "@/components/PageShell";

export const Route = createFileRoute("/forum")({
  head: () => ({
    meta: [
      { title: "Eventos — IGOV.IA" },
      { name: "description", content: "Encontros, painéis e capacitações do Instituto de Governança em Inteligência Artificial." },
      { property: "og:title", content: "Eventos — IGOV.IA" },
      { property: "og:description", content: "Agenda de eventos, workshops e capacitações do IGOV.IA." },
    ],
  }),
  component: EventosPage,
});

const proximos = [
  { data: "12/11/2026", local: "Quality Hotel · Salvador - BA", titulo: "AI Governance Forum Salvador 2026", desc: "Rua Dr. José Peroba, 244 — Stiep, Salvador - BA." },
];


function EventosPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Eventos"
        title="Encontros que conectam pessoas, instituições e conhecimento."
        description="Fóruns, workshops e capacitações para acelerar a maturidade em governança de IA."
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Próximos eventos</h2>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {proximos.map((e) => (
            <article key={e.titulo} className="flex h-full flex-col rounded-2xl border border-border bg-card/60 p-6">
              <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-primary" /> {e.data}</span>
                <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-primary" /> {e.local}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{e.titulo}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{e.desc}</p>
              <Link to="/contato" className="mt-6 text-sm font-semibold text-primary">Tenho interesse →</Link>
            </article>
          ))}
        </div>
      </section>

    </PageShell>
  );
}
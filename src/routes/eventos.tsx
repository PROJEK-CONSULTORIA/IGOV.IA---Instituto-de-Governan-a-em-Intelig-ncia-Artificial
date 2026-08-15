import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, MapPin } from "lucide-react";
import { PageShell, PageHero } from "@/components/PageShell";

export const Route = createFileRoute("/eventos")({
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
  { data: "Em breve", local: "São Paulo · Híbrido", titulo: "Fórum IGOV.IA de Governança em Inteligência Artificial", desc: "Encontro de lideranças públicas e privadas para debater maturidade, riscos e oportunidades da IA." },
  { data: "Em breve", local: "Online", titulo: "Workshop: Diagnóstico de Maturidade em IA", desc: "Aplicação prática do framework das 10 dimensões da governança em IA." },
  { data: "Em breve", local: "Brasília", titulo: "Painel: Regulamentação e Setor Público", desc: "Cenário regulatório, LGPD e adoção responsável de IA em órgãos públicos." },
];

const anteriores = [
  { data: "2025", titulo: "Lançamento do Framework IGOV.IA", desc: "Apresentação pública das 10 dimensões da governança em IA." },
  { data: "2025", titulo: "Mesa-redonda: Ética algorítmica", desc: "Discussão sobre transparência e auditabilidade em sistemas de IA." },
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

      <section className="border-t border-border/60 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Eventos anteriores</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {anteriores.map((e) => (
              <article key={e.titulo} className="rounded-2xl border border-border bg-background p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">{e.data}</span>
                <h3 className="mt-2 text-lg font-semibold text-foreground">{e.titulo}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{e.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowRight, CalendarDays, MapPin, Users } from "lucide-react";

export const Route = createFileRoute("/forum")({
  head: () => ({
    meta: [
      { title: "AI Governance Forum | IGOV.IA" },
      { name: "description", content: "O encontro brasileiro de lideranças dedicado ao futuro da governança em Inteligência Artificial." },
      { property: "og:title", content: "AI Governance Forum | IGOV.IA" },
      { property: "og:description", content: "Lideranças públicas e privadas debatendo o futuro da governança em IA." },
    ],
  }),
  component: ForumPage,
});

const agenda = [
  { time: "09h00", title: "Abertura — O estado da governança de IA no Brasil" },
  { time: "10h00", title: "Painel: Regulação, risco e responsabilidade" },
  { time: "11h30", title: "Apresentação do Índice de Maturidade em IA" },
  { time: "14h00", title: "Casos reais: do diagnóstico à operação governada" },
  { time: "16h00", title: "Mesa de encerramento: a agenda dos próximos 12 meses" },
];

function ForumPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="AI Governance Forum"
        title="O encontro das lideranças que decidem o futuro da IA."
        description="Um dia de debates entre governo, indústria, academia e mercado sobre como governar Inteligência Artificial com responsabilidade."
      />
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { icon: CalendarDays, label: "Edição 2026", text: "Data em breve" },
            { icon: MapPin, label: "Local", text: "Brasília — DF" },
            { icon: Users, label: "Público", text: "Lideranças e especialistas" },
          ].map(({ icon: Icon, label, text }, i) => (
            <Reveal key={label} delay={i * 0.05}>
              <div className="rounded-2xl border border-border bg-card p-8">
                <Icon className="h-5 w-5 text-primary" />
                <p className="mt-5 text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
                <p className="mt-1 text-lg font-semibold text-foreground">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20">
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">Programação</h2>
        </Reveal>
        <div className="mt-10 divide-y divide-border border-y border-border">
          {agenda.map((a, i) => (
            <Reveal key={a.time} delay={i * 0.04}>
              <div className="flex flex-wrap items-baseline gap-6 py-6">
                <span className="w-16 text-sm font-medium tabular-nums text-primary">{a.time}</span>
                <p className="text-base text-foreground">{a.title}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="bg-ink">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center lg:px-8">
          <h2 className="text-3xl font-semibold text-ink-foreground sm:text-4xl">
            Receba o convite da próxima edição.
          </h2>
          <Link
            to="/contato"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            Quero participar <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap, Compass, Layers, Bot, ArrowRight, BadgeCheck, Check } from "lucide-react";
import { PageShell, PageHero } from "@/components/PageShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/solucoes")({
  head: () => ({
    meta: [
      { title: "O que fazemos — IGOV.IA" },
      { name: "description", content: "Diagnóstico, governança, gestão de projetos, agentes inteligentes e capacitação em Inteligência Artificial." },
      { property: "og:title", content: "O que fazemos — IGOV.IA" },
      { property: "og:description", content: "Serviços do IGOV.IA: diagnóstico, governança, projetos, agentes e capacitação em IA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ServicosPage,
});

const servicos = [
  { icon: GraduationCap, t: "Workshops de Governança em Inteligência Artificial", d: "Capacitamos líderes e equipes para implementar a IA de forma estratégica, ética, segura e alinhada às melhores práticas de governança." },
  { icon: Compass, t: "Jornada de Governança em Inteligência Artificial", d: "Conduzimos organizações em uma jornada estruturada de diagnóstico, planejamento, implementação e evolução da maturidade em Governança de IA." },
  { icon: Layers, t: "Gestão de Projetos de Inteligência Artificial", d: "Planejamos e gerenciamos projetos de IA com foco em geração de valor, mitigação de riscos, conformidade regulatória e resultados mensuráveis." },
  { icon: Bot, t: "Agentes de IA com Governança Regulatória", d: "Desenvolvemos agentes inteligentes corporativos com governança, segurança e conformidade, utilizando a Semantix AI Enterprise Suite para garantir escalabilidade, controle e aderência aos requisitos regulatórios." },
];

const jornada = [
  "Diagnosticar", "Planejar", "Estruturar", "Capacitar",
  "Implementar", "Monitorar", "Reavaliar", "Evoluir",
];

const entregasIso = [
  "Diagnóstico de maturidade e análise de lacunas.",
  "Estruturação de políticas, processos e controles de governança de IA.",
  "Gestão de riscos e avaliação de impactos.",
  "Implementação assistida e capacitação das equipes.",
  "Auditoria interna e preparação para a avaliação externa.",
];

const beneficiosIso = [
  "Maior maturidade na governança de inteligência artificial.",
  "Gestão estruturada de riscos e responsabilidades.",
  "Processos e evidências organizados para avaliação.",
  "Preparação para a certificação e melhoria contínua.",
];

function ServicosPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="O que fazemos"
        title="Um portfólio integrado para adoção responsável da IA."
        description="Combinamos governança, diagnóstico, gestão de projetos e desenvolvimento técnico em uma abordagem contínua e mensurável."
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2">
          {servicos.map(({ icon: Icon, t, d }) => (
            <article key={t} className="group rounded-2xl border border-border bg-card/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-card hover:shadow-[0_20px_50px_-30px_var(--color-primary)]">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/15 text-primary transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border/60 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <article className="overflow-hidden rounded-2xl border border-primary/30 bg-background">
            <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
              <div className="border-b border-border/60 p-7 sm:p-10 lg:border-b-0 lg:border-r">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <BadgeCheck className="h-6 w-6" />
                </div>
                <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Nova solução</p>
                <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
                  Preparação para Certificação ISO/IEC 42001
                </h2>
                <p className="mt-5 text-muted-foreground">
                  O IGOV.IA apoia organizações públicas e privadas na preparação para a certificação ISO/IEC 42001,
                  por meio de uma jornada estruturada de diagnóstico, governança, gestão de riscos, implementação de
                  controles e preparação para auditoria.
                </p>
                <p className="mt-4 text-muted-foreground">
                  Nossa metodologia integra os requisitos da norma ao framework proprietário IGOV.IA, auxiliando as
                  organizações a estruturar seus sistemas de gestão de inteligência artificial, desenvolver evidências
                  de conformidade e promover a melhoria contínua.
                </p>
                <Button asChild size="lg" className="mt-8 rounded-full px-6">
                  <Link to="/contato">
                    Solicitar Diagnóstico <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="p-7 sm:p-10">
                <div className="grid gap-10 sm:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Principais entregas</h3>
                    <ul className="mt-5 space-y-4">
                      {entregasIso.map((item) => (
                        <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Benefícios</h3>
                    <ul className="mt-5 space-y-4">
                      {beneficiosIso.map((item) => (
                        <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p className="mt-10 border-t border-border/60 pt-6 text-xs leading-relaxed text-muted-foreground">
                  O IGOV.IA realiza a preparação e o apoio à implementação. A certificação depende da avaliação e da
                  decisão de um organismo certificador independente.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="border-y border-border/60 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Jornada de Evolução</p>
            <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
              Um ciclo estruturado para evoluir a maturidade institucional.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Ciclos conectam diagnóstico, estratégia, governança, execução e evolução contínua das soluções implementadas.
            </p>
          </div>
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {jornada.map((step, i) => (
              <li key={step} className="rounded-2xl border border-border bg-background p-5">
                <span className="text-xs font-semibold text-primary">Etapa {i + 1}</span>
                <h3 className="mt-2 text-xl font-semibold text-foreground">{step}</h3>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-primary/30 bg-gradient-to-br from-card via-card to-primary/10 p-10">
          <div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Quer aplicar essa metodologia na sua organização?</h2>
            <p className="mt-2 text-muted-foreground">Conheça o Índice de Governança em IA ou fale com nossa equipe.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/framework" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground hover:bg-card">Ver o Índice</Link>
            <Link to="/contato" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Fale conosco <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
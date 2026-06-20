import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre — IGOV.IA" },
      { name: "description", content: "Conheça o propósito, atuação e compromisso do Instituto de Governança em Inteligência Artificial." },
      { property: "og:title", content: "Sobre — IGOV.IA" },
      { property: "og:description", content: "Propósito, atuação e princípios do Instituto de Governança em IA." },
    ],
  }),
  component: SobrePage,
});

function SobrePage() {
  const principios = [
    { t: "Evolução progressiva e mensurável", d: "A maturidade em IA evolui por estágios definidos, com métricas e evidências objetivas." },
    { t: "Governança orientada a riscos", d: "Identificação, avaliação e mitigação contínua de riscos jurídicos, técnicos, éticos e operacionais." },
    { t: "Centralidade na segurança jurídica", d: "Respeito ao devido processo legal e proteção de direitos fundamentais." },
    { t: "Transparência algorítmica", d: "Sistemas documentados, auditáveis, rastreáveis e supervisionáveis." },
    { t: "Conformidade regulatória", d: "Alinhamento à LGPD, normativas setoriais e boas práticas nacionais e internacionais." },
    { t: "Sustentabilidade institucional", d: "Viabilidade financeira, robustez técnica e continuidade organizacional." },
    { t: "Aprendizado contínuo", d: "Capacitação permanente e atualização tecnológica." },
    { t: "Adaptação ao contexto", d: "Flexibilidade metodológica conforme maturidade e realidade institucional." },
  ];
  return (
    <PageShell>
      <PageHero
        eyebrow="Sobre o Instituto"
        title="Governança que transforma a IA em valor para a sociedade."
        description="O IGOV.IA promove a adoção ética, segura, responsável e estratégica da Inteligência Artificial em organizações públicas e privadas."
      />

      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            O <strong className="text-foreground">IGOV.IA — Instituto de Governança em Inteligência Artificial</strong> tem
            como propósito promover a adoção ética, segura, responsável e estratégica da Inteligência
            Artificial nas organizações públicas e privadas, contribuindo para que a tecnologia seja
            utilizada como instrumento de desenvolvimento humano, inovação, eficiência e geração de
            valor para a sociedade.
          </p>
          <p>
            O Instituto atua como agente de transformação e disseminação de conhecimento, apoiando
            instituições na construção de modelos de governança capazes de equilibrar inovação,
            gestão de riscos, conformidade regulatória, transparência, segurança da informação e
            respeito aos direitos fundamentais.
          </p>
          <p>
            Por meio de pesquisa, educação, desenvolvimento de metodologias, diagnósticos de
            maturidade, capacitação de lideranças e apoio à implementação de boas práticas, o
            IGOV.IA busca fortalecer a confiança nas soluções de Inteligência Artificial e contribuir
            para a formação de organizações mais preparadas para os desafios da economia digital.
          </p>
          <p>
            Nosso compromisso é ajudar empresas, governos e instituições a transformarem a
            Inteligência Artificial em uma ferramenta de impacto positivo, garantindo que sua
            utilização esteja alinhada aos princípios da ética, da responsabilidade, da governança e
            da sustentabilidade, promovendo uma relação equilibrada entre tecnologia, pessoas e
            sociedade.
          </p>
        </div>

        <div className="mt-16 rounded-3xl border border-primary/30 bg-primary/5 p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Nossa razão de existir</p>
          <p className="mt-4 text-2xl font-semibold text-foreground sm:text-3xl">
            Construir um futuro em que a Inteligência Artificial seja governada com responsabilidade,
            utilizada com propósito e aplicada para gerar benefícios sustentáveis para organizações e
            para a sociedade.
          </p>
        </div>
      </section>

      <section className="border-t border-border/60 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Princípios</p>
            <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
              O que fundamenta a atuação do IGOV.IA.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {principios.map((p, i) => (
              <div key={p.t} className="rounded-2xl border border-border bg-background p-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-sm font-semibold text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-lg font-semibold text-foreground">{p.t}</h3>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
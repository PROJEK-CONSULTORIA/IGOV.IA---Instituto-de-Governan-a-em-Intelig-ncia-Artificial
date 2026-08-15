import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/instituto")({
  head: () => ({
    meta: [
      { title: "O Instituto | IGOV.IA" },
      { name: "description", content: "Missão, visão e valores do IGOV.IA — Instituto de Governança em Inteligência Artificial." },
      { property: "og:title", content: "O Instituto | IGOV.IA" },
      { property: "og:description", content: "Promovemos a adoção ética, segura, responsável e estratégica da Inteligência Artificial." },
    ],
  }),
  component: InstitutoPage,
});

const values = [
  { title: "Transparência", text: "Métodos, critérios e resultados abertos e auditáveis." },
  { title: "Ética", text: "Respeito aos direitos fundamentais em todas as decisões sobre IA." },
  { title: "Rigor técnico", text: "Metodologia estruturada, baseada em evidências e referências internacionais." },
  { title: "Independência", text: "Posicionamento livre de vínculos com fornecedores de tecnologia." },
  { title: "Inclusão", text: "IA que amplia acesso, e não desigualdade." },
  { title: "Responsabilidade", text: "Compromisso com impacto positivo e sustentável para a sociedade." },
];

function InstitutoPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="O Instituto"
        title="IGOV.IA — Instituto de Governança em Inteligência Artificial."
        description="Promovemos a adoção ética, segura, responsável e estratégica da Inteligência Artificial em organizações públicas e privadas."
      />
      <section className="mx-auto max-w-4xl px-6 py-24 lg:px-8">
        <Reveal>
          <p className="text-xl leading-relaxed text-foreground">
            O IGOV.IA atua como agente de transformação e disseminação de conhecimento, apoiando
            instituições na construção de modelos de governança capazes de equilibrar inovação,
            gestão de riscos, conformidade regulatória, transparência, segurança da informação e
            respeito aos direitos fundamentais.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            Por meio de pesquisa, educação, desenvolvimento de metodologias, diagnósticos de
            maturidade, capacitação de lideranças e apoio à implementação de boas práticas, o
            Instituto busca fortalecer a confiança nas soluções de Inteligência Artificial e
            contribuir para a formação de organizações mais preparadas para os desafios da economia
            digital.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mt-12 border-l-2 border-primary pl-6">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Nossa razão de existir</p>
            <p className="mt-3 text-2xl font-semibold leading-snug text-foreground">
              Construir um futuro em que a Inteligência Artificial seja governada com
              responsabilidade, utilizada com propósito e aplicada para gerar benefícios
              sustentáveis para organizações e para a sociedade.
            </p>
          </div>
        </Reveal>
      </section>
      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <Reveal>
            <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">Valores</h2>
          </Reveal>
          <div className="mt-14 grid gap-x-14 gap-y-10 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.04}>
                <div className="border-t border-border pt-5">
                  <h3 className="text-lg font-semibold text-foreground">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Link
            to="/contato"
            className="mt-16 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            Fale com o Instituto <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
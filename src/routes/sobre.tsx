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
  const valores = [
    { t: "Transparência", d: "Acreditamos que a transparência é a base da confiança e da governança eficaz da Inteligência Artificial." },
    { t: "Ética", d: "A ética deve orientar todas as decisões no desenvolvimento e na aplicação de sistemas de IA." },
    { t: "Inclusão", d: "A governança de IA deve considerar e proteger os interesses de todos os segmentos da sociedade." },
    { t: "Rigor Técnico", d: "Nossas análises e recomendações são fundamentadas em evidências científicas e melhores práticas." },
    { t: "Independência", d: "Mantemos independência institucional para garantir imparcialidade em avaliações e posicionamentos." },
    { t: "Responsabilidade", d: "Atuamos com responsabilidade social, ambiental e institucional em todas as nossas iniciativas." },
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

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-primary/30 bg-primary/5 p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Nossa missão</p>
            <p className="mt-4 text-lg font-semibold text-foreground">
              Promover a governança responsável da Inteligência Artificial por meio de pesquisa,
              educação, metodologias e advocacy, contribuindo para que a IA seja desenvolvida e
              utilizada de forma ética, transparente e benéfica para toda a sociedade.
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-card/60 p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Nossa visão</p>
            <p className="mt-4 text-lg font-semibold text-foreground">
              Ser referência em governança da Inteligência Artificial no Brasil e na América Latina,
              reconhecida pela qualidade de seus padrões, relevância no debate regulatório e
              excelência de seus programas educacionais.
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-primary/30 bg-primary/5 p-10">
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
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Nossos valores</p>
            <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
              Os princípios que orientam todas as nossas ações e decisões.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {valores.map((p, i) => (
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

      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Por que o IGOV.IA existe</p>
        <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
          Uma resposta brasileira aos desafios da governança em IA.
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>
            A Inteligência Artificial está transformando rapidamente todos os setores da sociedade.
            No Brasil, essa transformação ocorre em um contexto de desigualdade social, diversidade
            cultural e desafios regulatórios únicos, que exigem abordagens específicas de governança.
          </p>
          <p>
            Enquanto países da Europa e da América do Norte avançam na criação de marcos
            regulatórios e padrões de governança, o ecossistema brasileiro ainda demanda instituições
            especializadas capazes de orientar governos, empresas e a sociedade civil sobre as
            melhores práticas no desenvolvimento e uso de sistemas de IA.
          </p>
          <p>
            O IGOV.IA foi criado para ajudar a preencher essa lacuna — construindo pontes entre
            diferentes setores, promovendo diálogo, educação e a adoção de padrões que assegurem
            que a IA sirva ao interesse público.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
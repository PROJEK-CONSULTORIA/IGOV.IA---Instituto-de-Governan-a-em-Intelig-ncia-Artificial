import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { PageShell, PageHero } from "@/components/PageShell";

export const Route = createFileRoute("/knowledge-hub")({
  head: () => ({
    meta: [
      { title: "Publicações — IGOV.IA" },
      { name: "description", content: "Artigos, whitepapers e estudos do Instituto de Governança em IA." },
      { property: "og:title", content: "Publicações — IGOV.IA" },
      { property: "og:description", content: "Conteúdos sobre governança, ética, regulamentação e práticas em Inteligência Artificial." },
    ],
  }),
  component: PublicacoesPage,
});

const publicacoes = [
  {
    categoria: "Relatório",
    titulo: "AI Index Report 2026 — Stanford HAI",
    resumo:
      "Relatório anual do Stanford Institute for Human-Centered Artificial Intelligence com dados, tendências e análises sobre o estado da Inteligência Artificial no mundo.",
    data: "Abr 2026",
    url: "https://hai.stanford.edu/ai-index/2026-ai-index-report",
    autor: "Stanford HAI",
  },
  {
    categoria: "Relatório",
    titulo: "AI Index Report 2025 — Stanford HAI",
    resumo:
      "Edição 2025 do AI Index Report, reunindo indicadores de investimento, pesquisa, desenvolvimento técnico e adoção de IA em escala global.",
    data: "Abr 2025",
    url: "https://hai.stanford.edu/ai-index/2025-ai-index-report",
    autor: "Stanford HAI",
  },
  {
    categoria: "Relatório",
    titulo: "AI Index Report 2024 — Stanford HAI",
    resumo:
      "Edição 2024 do AI Index Report, com métricas detalhadas sobre avanços em IA, regulamentação e impactos econômicos e sociais.",
    data: "Abr 2024",
    url: "https://hai.stanford.edu/ai-index/2024-ai-index-report",
    autor: "Stanford HAI",
  },
  {
    categoria: "Artigo",
    titulo: "A IA Generativa substituirá os aplicativos atuais?",
    resumo:
      "Reflexão sobre o futuro dos aplicativos tradicionais diante do avanço acelerado da IA Generativa e como essa transformação impacta usuários, empresas e desenvolvedores.",
    data: "27 Jul 2024",
    url: "https://www.linkedin.com/pulse/ia-generativa-substituir%C3%A1-os-aplicativos-atuais-f%C3%A1bio-martins-ahsuf/?trackingId=YZYtu%2FhRQbqQU4dvI5wycQ%3D%3D",
    autor: "Fábio Martins",
  },
  {
    categoria: "Artigo",
    titulo: "A IA Generativa está sedenta por água e energia.",
    resumo:
      "Análise sobre o consumo de recursos naturais pela Inteligência Artificial generativa e os desafios de sustentabilidade envolvidos em sua operação em larga escala.",
    data: "26 Jul 2024",
    url: "https://www.linkedin.com/pulse/ia-generativa-est%C3%A1-sedenta-por-%C3%A1gua-e-energia-f%C3%A1bio-martins-j486f/?trackingId=j4mDdYgfQR6WvbSqjINNdg%3D%3D",
    autor: "Fábio Martins",
  },
  {
    categoria: "Artigo",
    titulo: 'A "garantia" da ética por trás da Inteligência Artificial.',
    resumo:
      "Uma discussão sobre como garantir que a ética seja efetivamente incorporada ao desenvolvimento e uso da Inteligência Artificial, indo além de princípios declarados.",
    data: "03 Jul 2024",
    url: "https://www.linkedin.com/pulse/garantia-da-%C3%A9tica-por-tr%C3%A1s-intelig%C3%AAncia-artificial-f%C3%A1bio-martins-vezjf/?trackingId=ovPsJ6GXQiGo5QDoUR60Pg%3D%3D",
    autor: "Fábio Martins",
  },
  {
    categoria: "Artigo",
    titulo: "A Inteligência Artificial como força de transformação da geopolítica mundial.",
    resumo:
      "Análise sobre como a IA está redefinindo o equilíbrio de poder entre nações, moldando alianças estratégicas e disputas por soberania tecnológica.",
    data: "10 Jun 2024",
    url: "https://www.linkedin.com/pulse/intelig%C3%AAncia-artificial-como-for%C3%A7a-de-transforma%C3%A7%C3%A3o-f%C3%A1bio-martins-sfq2f/?trackingId=ID%2F6SieWTXyKNOa90kSJLA%3D%3D",
    autor: "Fábio Martins",
  },
  {
    categoria: "Artigo",
    titulo: "A inteligência artificial no Poder Judiciário brasileiro.",
    resumo:
      "Panorama sobre a adoção da IA no Judiciário brasileiro, seus impactos na eficiência processual e os desafios éticos e regulatórios envolvidos.",
    data: "02 Jun 2024",
    url: "https://www.linkedin.com/pulse/intelig%C3%AAncia-artificial-poder-judici%C3%A1rio-brasileiro-f%C3%A1bio-martins-xhvzf/?trackingId=EihYvpvOQOiitnJspn92Qg%3D%3D",
    autor: "Fábio Martins",
  },
  {
    categoria: "Artigo",
    titulo: "Relatório preliminar sobre a regulamentação da IA no Brasil.",
    resumo:
      "Análise do panorama regulatório brasileiro para Inteligência Artificial, com base em marcos legais, propostas legislativas e tendências internacionais.",
    data: "31 Mai 2024",
    url: "https://www.linkedin.com/pulse/relat%C3%B3rio-preliminar-sobre-regulamenta%C3%A7%C3%A3o-da-ia-f%C3%A1bio-martins-p1u6e/?trackingId=2JQzP6wIQRSX25QhiEA3JA%3D%3D",
    autor: "Fábio Martins",
  },
  {
    categoria: "Artigo",
    titulo: "Os Princípios da OCDE sobre a Inteligência Artificial.",
    resumo:
      "Apresentação e análise dos princípios da OCDE para IA, sua relevância para a governança e como orientam a adoção responsável da tecnologia em escala global.",
    data: "29 Mai 2024",
    url: "https://www.linkedin.com/pulse/os-princ%C3%ADpios-da-ocde-sobre-intelig%C3%AAncia-artificial-f%C3%A1bio-martins-2hp1f/?trackingId=Z9V0C9%2BaT4iX1Mx8OQC3Lg%3D%3D",
    autor: "Fábio Martins",
  },
  {
    categoria: "Artigo",
    titulo: "O impacto da IA conversacional nas instituições de ensino.",
    resumo:
      "Reflexão sobre as transformações no ensino provocadas pela IA conversacional, entre oportunidades pedagógicas e riscos de dependência e desigualdade.",
    data: "23 Mai 2024",
    url: "https://www.linkedin.com/pulse/o-impacto-da-ia-conversacional-nas-institui%C3%A7%C3%B5es-de-f%C3%A1bio-martins-qhjce/?trackingId=S80vhpNXTUKFfsUiRb6u%2Fg%3D%3D",
    autor: "Fábio Martins",
  },
  {
    categoria: "Artigo",
    titulo: "Você sabe quando NÃO usar a IA Generativa?",
    resumo:
      "Reflexão sobre os limites da adoção de IA Generativa e os cenários em que seu uso pode ser inadequado ou contraproducente na governança de TIC.",
    data: "08 Mai 2024",
    url: "https://www.linkedin.com/pulse/voc%C3%AA-sabe-quando-n%C3%A3o-usar-ia-generativa-governan%C3%A7a-de-tic-tjba-299ef/?trackingId=EC8S0fEzRhiI5Qq7gKFZtQ%3D%3D",
    autor: "Fábio Martins",
  },
  {
    categoria: "Artigo",
    titulo: "A internet ficou pequena para as empresas de IA",
    resumo:
      "Análise sobre o impacto econômico da IA generativa e os desafios de escala enfrentados pelas empresas que disputam o mercado global de Inteligência Artificial.",
    data: "22 Abr 2024",
    url: "https://www.linkedin.com/pulse/internet-ficou-pequena-para-empresas-de-ia-f%C3%A1bio-martins-6q2if/?trackingId=VqOEBcjuQgWHuPNqOeIH9w%3D%3D",
    autor: "Fábio Martins",
  },
  {
    categoria: "Artigo",
    titulo: "Qual o impacto da computação quântica na inteligência artificial?",
    resumo:
      "Uma análise sobre como a computação quântica pode transformar o desenvolvimento e a aplicação da Inteligência Artificial, abrindo novas fronteiras de processamento e capacidade.",
    data: "17 Abr 2024",
    url: "https://www.linkedin.com/pulse/qual-o-impacto-da-computa%C3%A7%C3%A3o-qu%C3%A2ntica-na-intelig%C3%AAncia-f%C3%A1bio-martins-cyfkf/?trackingId=xLgI5trKTQaBKXTSWz4lVw%3D%3D",
    autor: "Fábio Martins",
  },
  {
    categoria: "Artigo",
    titulo: "O real impacto da IA Generativa no futuro do trabalho",
    resumo:
      "Fábio Martins analisa como a Inteligência Artificial Generativa está redesenhando funções, competências e modelos de trabalho nas organizações.",
    data: "09 Abr 2024",
    url: "https://www.linkedin.com/pulse/o-real-impacto-da-ia-generativa-futuro-do-trabalho-i-f%C3%A1bio-martins-onnef/",
    autor: "Fábio Martins",
  },
  {
    categoria: "Artigo",
    titulo: "A fusão entre a inteligência humana e a artificial",
    resumo:
      "Reflexão sobre a integração entre capacidade humana e sistemas inteligentes na governança de TIC, com base na experiência do TJBA.",
    data: "25 Mar 2024",
    url: "https://www.linkedin.com/pulse/fus%C3%A3o-da-intelig%C3%AAncia-humana-e-artificial-governan%C3%A7a-de-tic-tjba-klunf/",
    autor: "Fábio Martins",
  },
  {
    categoria: "Artigo",
    titulo: "Quais os riscos das “memórias” usadas pelas inteligências artificiais?",
    resumo:
      "Uma análise sobre privacidade, segurança e governança dos mecanismos de memória persistente em sistemas de Inteligência Artificial.",
    data: "29 Dez 2024",
    url: "https://www.linkedin.com/pulse/quais-os-riscos-das-mem%C3%B3rias-usadas-pelas-artificiais-",
    autor: "Fábio Martins",
  },
  {
    categoria: "Artigo",
    titulo: 'O "viés" pode atrasar o desenvolvimento das inteligências artificiais?',
    resumo:
      "Como o viés algorítmico afeta a confiança, a adoção e o avanço responsável das soluções de Inteligência Artificial.",
    data: "13 Mar 2024",
    url: "https://www.linkedin.com/pulse/o-vi%C3%A9s-pode-atrasar-desenvolvimento-das-intelig%C3%AAncias-f%C3%A1bio-martins-fthlf/",
    autor: "Fábio Martins",
  },
  {
    categoria: "Artigo",
    titulo: "Quem está liderando a corrida global da IA?",
    resumo:
      "Análise de Fábio Martins sobre o cenário competitivo internacional da Inteligência Artificial e os países que vêm definindo o ritmo da inovação, regulação e investimento em IA.",
    data: "08 Jun 2026",
    url: "https://www.linkedin.com/pulse/quem-est%C3%A1-liderando-corrida-global-da-ia-f%C3%A1bio-martins-uzk8e/",
    autor: "Fábio Martins",
  },
];

function PublicacoesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Publicações"
        title="Conhecimento aplicado para a governança da IA."
        description="Pesquisas, artigos e materiais técnicos produzidos pelo Instituto e seus parceiros."
      />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {publicacoes.map((p) => (
            <article key={p.titulo} className="group flex h-full flex-col rounded-2xl border border-border bg-card/60 p-6 transition-colors hover:border-primary/50 hover:bg-card">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  <FileText className="h-3.5 w-3.5" /> {p.categoria}
                </span>
                <span className="text-xs text-muted-foreground">{p.data}</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{p.titulo}</h3>
              {"autor" in p && p.autor && (
                <p className="mt-1 text-xs text-muted-foreground">Por {p.autor}</p>
              )}
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.resumo}</p>
              {"url" in p && p.url ? (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 text-sm font-semibold text-primary hover:underline"
                >
                  Ler publicação →
                </a>
              ) : (
                <span className="mt-6 text-sm font-semibold text-primary">Em breve →</span>
              )}
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-border bg-card/40 p-10 text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Receba novas publicações</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Cadastre-se para acompanhar os próximos lançamentos do Instituto.
          </p>
          <form className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="seu@email.com"
              className="flex-1 rounded-full border border-border bg-background px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
            <button type="submit" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              Cadastrar
            </button>
          </form>
        </div>
      </section>
    </PageShell>
  );
}
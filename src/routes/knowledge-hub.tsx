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
    categoria: "Artigo",
    titulo: "Você sabe quando NÃO usar a IA Generativa?",
    resumo:
      "Reflexão sobre os limites da adoção de IA Generativa e os cenários em que seu uso pode ser inadequado ou contraproducente na governança de TIC.",
    data: "Publicado no LinkedIn",
    url: "https://www.linkedin.com/pulse/voc%C3%AA-sabe-quando-n%C3%A3o-usar-ia-generativa-governan%C3%A7a-de-tic-tjba-299ef/?trackingId=EC8S0fEzRhiI5Qq7gKFZtQ%3D%3D",
    autor: "Fábio Martins",
  },
  {
    categoria: "Artigo",
    titulo: "A internet ficou pequena para as empresas de IA",
    resumo:
      "Análise sobre o impacto econômico da IA generativa e os desafios de escala enfrentados pelas empresas que disputam o mercado global de Inteligência Artificial.",
    data: "Publicado no LinkedIn",
    url: "https://www.linkedin.com/pulse/internet-ficou-pequena-para-empresas-de-ia-f%C3%A1bio-martins-6q2if/?trackingId=VqOEBcjuQgWHuPNqOeIH9w%3D%3D",
    autor: "Fábio Martins",
  },
  {
    categoria: "Artigo",
    titulo: "Qual o impacto da computação quântica na inteligência artificial?",
    resumo:
      "Uma análise sobre como a computação quântica pode transformar o desenvolvimento e a aplicação da Inteligência Artificial, abrindo novas fronteiras de processamento e capacidade.",
    data: "Publicado no LinkedIn",
    url: "https://www.linkedin.com/pulse/qual-o-impacto-da-computa%C3%A7%C3%A3o-qu%C3%A2ntica-na-intelig%C3%AAncia-f%C3%A1bio-martins-cyfkf/?trackingId=xLgI5trKTQaBKXTSWz4lVw%3D%3D",
    autor: "Fábio Martins",
  },
  {
    categoria: "Artigo",
    titulo: "O real impacto da IA Generativa no futuro do trabalho",
    resumo:
      "Fábio Martins analisa como a Inteligência Artificial Generativa está redesenhando funções, competências e modelos de trabalho nas organizações.",
    data: "Publicado no LinkedIn",
    url: "https://www.linkedin.com/pulse/o-real-impacto-da-ia-generativa-futuro-do-trabalho-i-f%C3%A1bio-martins-onnef/",
    autor: "Fábio Martins",
  },
  {
    categoria: "Artigo",
    titulo: "A fusão entre a inteligência humana e a artificial",
    resumo:
      "Reflexão sobre a integração entre capacidade humana e sistemas inteligentes na governança de TIC, com base na experiência do TJBA.",
    data: "Publicado no LinkedIn",
    url: "https://www.linkedin.com/pulse/fus%C3%A3o-da-intelig%C3%AAncia-humana-e-artificial-governan%C3%A7a-de-tic-tjba-klunf/",
    autor: "Fábio Martins",
  },
  {
    categoria: "Artigo",
    titulo: "Quais os riscos das “memórias” usadas pelas inteligências artificiais?",
    resumo:
      "Uma análise sobre privacidade, segurança e governança dos mecanismos de memória persistente em sistemas de Inteligência Artificial.",
    data: "Publicado no LinkedIn",
    url: "https://www.linkedin.com/pulse/quais-os-riscos-das-mem%C3%B3rias-usadas-pelas-artificiais-",
    autor: "Fábio Martins",
  },
  {
    categoria: "Artigo",
    titulo: 'O "viés" pode atrasar o desenvolvimento das inteligências artificiais?',
    resumo:
      "Como o viés algorítmico afeta a confiança, a adoção e o avanço responsável das soluções de Inteligência Artificial.",
    data: "Publicado no LinkedIn",
    url: "https://www.linkedin.com/pulse/o-vi%C3%A9s-pode-atrasar-desenvolvimento-das-intelig%C3%AAncias-f%C3%A1bio-martins-fthlf/",
    autor: "Fábio Martins",
  },
  {
    categoria: "Artigo",
    titulo: "Quem está liderando a corrida global da IA?",
    resumo:
      "Análise de Fábio Martins sobre o cenário competitivo internacional da Inteligência Artificial e os países que vêm definindo o ritmo da inovação, regulação e investimento em IA.",
    data: "Publicado no LinkedIn",
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
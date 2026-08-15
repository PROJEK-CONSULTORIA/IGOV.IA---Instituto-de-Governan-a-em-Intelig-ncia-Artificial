import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { PageShell, PageHero } from "@/components/PageShell";

export const Route = createFileRoute("/publicacoes")({
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
    titulo: "Quem está liderando a corrida global da IA?",
    resumo:
      "Análise de Fábio Martins sobre o cenário competitivo internacional da Inteligência Artificial e os países que vêm definindo o ritmo da inovação, regulação e investimento em IA.",
    data: "Publicado no LinkedIn",
    url: "https://www.linkedin.com/pulse/quem-est%C3%A1-liderando-corrida-global-da-ia-f%C3%A1bio-martins-uzk8e/",
    autor: "Fábio Martins",
  },
  { categoria: "Governança", titulo: "As 10 Dimensões da Governança em IA", resumo: "Visão geral do framework do IGOV.IA para avaliar a maturidade institucional na adoção de Inteligência Artificial.", data: "Em breve" },
  { categoria: "Ética & Compliance", titulo: "Conformidade regulatória em IA: LGPD e além", resumo: "Como alinhar projetos de IA à LGPD, normativas setoriais e boas práticas internacionais.", data: "Em breve" },
  { categoria: "Casos Práticos", titulo: "Diagnóstico de maturidade no setor público", resumo: "Aprendizados de aplicação do framework em órgãos públicos brasileiros.", data: "Em breve" },
  { categoria: "Regulamentação", titulo: "Cenário regulatório global de IA", resumo: "Panorama comparado das principais iniciativas regulatórias e impactos para organizações no Brasil.", data: "Em breve" },
  { categoria: "Governança", titulo: "Riscos algorítmicos e mitigação institucional", resumo: "Modelos de identificação, classificação e tratamento de riscos em sistemas de IA.", data: "Em breve" },
  { categoria: "Casos Práticos", titulo: "Agentes inteligentes em operações comerciais", resumo: "Como agentes podem ampliar produtividade preservando supervisão humana." , data: "Em breve" },
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
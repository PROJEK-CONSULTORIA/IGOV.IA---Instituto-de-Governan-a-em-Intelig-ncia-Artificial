import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowRight, ArrowDown } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/motion/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { planos, jornada, comparativo, faq, pagamento, type Plano } from "@/content/precos";

const TITLE = "Planos e Preços | IGOV.IA";
const DESCRIPTION =
  "Conheça os planos IGOV.IA para diagnóstico, evolução e transformação da Governança de Inteligência Artificial na sua organização.";

export const Route = createFileRoute("/precos")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://igovia.com.br/precos" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://igovia.com.br/precos" }],
  }),
  component: PrecosPage,
});

function PlanCard({ plano }: { plano: Plano }) {
  const dark = plano.dark;
  const cardBase = dark
    ? "flex h-full flex-col rounded-2xl border border-neutral-800 bg-neutral-950 p-7 text-neutral-100 shadow-[0_2px_16px_-8px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_-24px_rgba(0,0,0,0.55)]"
    : plano.destaque
      ? "flex h-full flex-col rounded-2xl border-2 border-primary bg-card p-7 shadow-[0_10px_40px_-24px_var(--color-primary)] transition-all duration-300 hover:-translate-y-1 lg:scale-[1.03]"
      : "flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-[0_2px_14px_-10px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1 hover:border-foreground/25";

  const btn = dark
    ? "mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors duration-300 hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    : plano.destaque
      ? "mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors duration-300 hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      : plano.id === "free"
        ? "mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full border border-foreground bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors duration-300 hover:bg-foreground hover:text-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        : "mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-colors duration-300 hover:bg-foreground/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground";

  const mutedText = dark ? "text-neutral-400" : "text-muted-foreground";

  return (
    <article className={cardBase}>
      {plano.selo ? (
        <p className="mb-4 inline-flex w-fit rounded-full bg-primary/12 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-primary">
          {plano.selo}
        </p>
      ) : (
        <span aria-hidden className="mb-4 hidden h-[26px] lg:block" />
      )}

      <h3 className={`text-xs font-semibold uppercase tracking-[0.2em] ${dark ? "text-primary" : "text-primary"}`}>
        {plano.nome}
      </h3>
      <p className="mt-2 text-2xl font-bold">{plano.headline}</p>

      <div className="mt-6">
        <p className="text-4xl font-bold tracking-tight">{plano.preco}</p>
        {plano.precoComplemento && (
          <p className={`mt-1 text-sm ${mutedText}`}>{plano.precoComplemento}</p>
        )}
        {plano.precoNota && <p className={`mt-1 text-sm ${mutedText}`}>{plano.precoNota}</p>}
        {plano.parcelado && (
          <div className="mt-3">
            <p className="text-sm font-semibold text-primary">{plano.parcelado.destaque}</p>
            <p className="mt-1 text-sm font-medium">{plano.parcelado.parcela}</p>
            <p className={`mt-0.5 text-xs ${mutedText}`}>{plano.parcelado.total}</p>
          </div>
        )}
      </div>

      <p className={`mt-6 text-sm leading-relaxed ${mutedText}`}>{plano.descricao}</p>

      <ul className="mt-6 space-y-2.5 text-sm">
        {plano.beneficios.map((b) => (
          <li key={b} className="flex gap-2.5">
            <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span className={dark ? "text-neutral-300" : "text-foreground/85"}>{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <Link to={plano.id === "free" ? "/cadastro" : "/contato"} className={btn}>
          {plano.cta}
        </Link>
      </div>
    </article>
  );
}

function PrecosPage() {
  return (
    <PageShell>
      <div className="surface-light">
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Planos IGOV.IA
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold sm:text-5xl lg:text-6xl">
              Governança de IA para cada estágio da sua organização.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Comece gratuitamente, conheça sua maturidade e evolua para uma jornada estruturada de
              Governança e Adoção de Inteligência Artificial.
            </p>
            <p className="mt-4 text-sm font-medium text-foreground/70">
              Escolha o plano que melhor corresponde ao momento da sua organização.
            </p>
          </Reveal>
        </section>

        {/* Planos */}
        <section aria-labelledby="planos-heading" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
          <h2 id="planos-heading" className="sr-only">
            Planos disponíveis
          </h2>
          <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {planos.map((p, i) => (
              <Reveal key={p.id} delay={i * 70} className="h-full">
                <PlanCard plano={p} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* Jornada */}
        <section aria-labelledby="jornada-heading" className="border-t border-border bg-secondary/60">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <Reveal>
              <h2 id="jornada-heading" className="max-w-3xl text-3xl font-bold sm:text-4xl">
                Evolua conforme a maturidade da sua organização
              </h2>
            </Reveal>
            <ol className="mt-12 grid gap-6 lg:grid-cols-4">
              {jornada.map((etapa, i) => (
                <Reveal key={etapa.nome} delay={i * 70}>
                  <li className="relative h-full list-none rounded-2xl border border-border bg-card p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                      {etapa.nome}
                    </p>
                    <h3 className="mt-2 text-xl font-bold">{etapa.headline}</h3>
                    <p className="mt-3 text-sm text-muted-foreground">{etapa.frase}</p>
                    {i < jornada.length - 1 && (
                      <>
                        <ArrowDown
                          aria-hidden
                          className="mx-auto mt-5 h-5 w-5 text-primary lg:hidden"
                        />
                        <ArrowRight
                          aria-hidden
                          className="absolute -right-4 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-primary lg:block"
                        />
                      </>
                    )}
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* Comparativo */}
        <section aria-labelledby="comparativo-heading" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <h2 id="comparativo-heading" className="text-3xl font-bold sm:text-4xl">
              Comparação entre os planos
            </h2>
          </Reveal>
          <div className="mt-10 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <caption className="sr-only">Comparação de recursos entre os planos IGOV.IA</caption>
              <thead>
                <tr className="bg-secondary">
                  <th scope="col" className="px-5 py-4 font-semibold">
                    Recursos
                  </th>
                  {["Free", "Essential", "Professional", "Enterprise"].map((p) => (
                    <th key={p} scope="col" className="px-5 py-4 font-semibold">
                      {p}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparativo.map((linha) => (
                  <tr key={linha.recurso} className="border-t border-border">
                    <th scope="row" className="px-5 py-4 font-medium">
                      {linha.recurso}
                    </th>
                    {linha.valores.map((v, i) => (
                      <td
                        key={i}
                        className={`px-5 py-4 ${v === "Não" ? "text-muted-foreground" : "text-foreground"}`}
                      >
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Pagamento */}
        <section aria-labelledby="pagamento-heading" className="border-t border-border bg-secondary/60">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <Reveal>
              <h2 id="pagamento-heading" className="text-2xl font-bold sm:text-3xl">
                Condições de pagamento
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                Os planos Essential e Professional podem ser pagos à vista pelo valor original ou
                parcelados em até 12 vezes no cartão de crédito.
              </p>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                No parcelamento em 12 vezes é aplicado acréscimo de 12% sobre o valor à vista.
              </p>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:max-w-3xl">
              {pagamento.map((p) => (
                <div key={p.nome} className="rounded-xl border border-border bg-card p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    {p.nome}
                  </p>
                  <p className="mt-2 text-lg font-semibold">{p.aVista}</p>
                  <p className="mt-1 text-sm text-foreground/80">{p.parcela}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{p.total}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq-heading" className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <h2 id="faq-heading" className="text-3xl font-bold sm:text-4xl">
              Perguntas frequentes
            </h2>
          </Reveal>
          <Accordion type="single" collapsible className="mt-8 w-full">
            {faq.map((item, i) => (
              <AccordionItem key={item.q} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-base font-semibold">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>

      {/* CTA final */}
      <section className="border-t border-border/60 bg-background">
        <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="mx-auto max-w-3xl text-3xl font-bold text-foreground sm:text-4xl">
              Comece conhecendo a maturidade da sua organização.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Faça seu primeiro Diagnóstico IGOV.IA gratuitamente.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/contato"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
              >
                Experimentar grátis
                <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contato"
                className="inline-flex items-center justify-center rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-foreground transition-colors duration-300 hover:bg-muted"
              >
                Falar com um especialista
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}

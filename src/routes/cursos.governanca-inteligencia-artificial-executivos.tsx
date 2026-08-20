import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  FileText,
  Gauge,
  Globe,
  Layers,
  Linkedin,
  Mail,
  Monitor,
  PlayCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/motion/Reveal";
import { EnrollButton } from "@/components/EnrollButton";
import { modulos } from "@/content/cursos";

const CANONICAL = "https://igovia.com.br/cursos/governanca-inteligencia-artificial-executivos";

export const Route = createFileRoute("/cursos/governanca-inteligencia-artificial-executivos")({
  head: () => ({
    meta: [
      { title: "Curso de Governança em Inteligência Artificial para Executivos | IGOV.IA" },
      {
        name: "description",
        content:
          "Curso de Governança em Inteligência Artificial para Executivos e Gestores. Formação EAD de 20 horas com certificação emitida pela Universidade Anhanguera.",
      },
      {
        property: "og:title",
        content: "Curso de Governança em Inteligência Artificial para Executivos | IGOV.IA",
      },
      {
        property: "og:description",
        content:
          "Formação executiva EAD de 20 horas em Governança de IA, com certificação da Universidade Anhanguera.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: CANONICAL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Course",
          name: "Governança em Inteligência Artificial para Executivos e Gestores",
          description:
            "Curso de extensão EAD de 20 horas em Governança de Inteligência Artificial para executivos e gestores.",
          provider: { "@type": "Organization", name: "IGOV.IA", url: "https://igovia.com.br" },
        }),
      },
    ],
  }),
  component: CursoPage,
});

const anchors = [
  { id: "apresentacao", label: "Apresentação" },
  { id: "programa", label: "Programa" },
  { id: "metodologia", label: "Metodologia" },
  { id: "publico-alvo", label: "Público-alvo" },
  { id: "investimento", label: "Investimento" },
  { id: "certificado", label: "Certificado" },
  { id: "contato", label: "Contato" },
];

const barra = ["20 horas", "100% EAD", "Universidade Anhanguera", "Certificado de Conclusão", "Reconhecido pelo MEC"];

const resultados = [
  { n: "01", t: "Compreender", d: "Os fundamentos, conceitos e impactos da Inteligência Artificial nas organizações." },
  { n: "02", t: "Governar", d: "Conhecer modelos, estruturas e boas práticas de Governança de Inteligência Artificial." },
  { n: "03", t: "Avaliar", d: "Aplicar o Framework IGOV.IA como instrumento de diagnóstico e avaliação da maturidade organizacional." },
  { n: "04", t: "Priorizar", d: "Identificar oportunidades, riscos, desafios e prioridades estratégicas relacionadas à IA." },
  { n: "05", t: "Evoluir", d: "Construir planos de ação e roadmaps executivos para implementação e evolução da Governança de IA." },
];

const jornada = ["Fundamentos", "10 Dimensões", "Assessment", "Maturidade", "Roadmap"];

const metodologia = [
  { icon: PlayCircle, t: "Videoaulas", d: "Conteúdo organizado em 12 módulos." },
  { icon: BookOpen, t: "Apostila digital", d: "Material exclusivo para aprofundamento conceitual." },
  { icon: FileText, t: "E-books e artigos", d: "Conteúdos complementares nacionais e internacionais." },
  { icon: Layers, t: "Estudos de caso", d: "Aplicação dos conceitos em situações organizacionais." },
  { icon: Gauge, t: "Framework IGOV.IA", d: "Instrumento para autoavaliação da maturidade organizacional." },
  { icon: ClipboardCheck, t: "Templates", d: "Modelos de políticas e instrumentos de Governança de IA." },
  { icon: CheckCircle2, t: "Checklists", d: "Instrumentos de avaliação e apoio à implementação." },
  { icon: Award, t: "Avaliações", d: "Atividades de aprendizagem e fixação por módulo." },
];

const cargaHoraria = [
  { h: "2h", d: "Videoaulas gravadas" },
  { h: "12h", d: "Apostila digital e estudos" },
  { h: "4h", d: "Leituras complementares" },
  { h: "2h", d: "Avaliações e atividades" },
];

const publico = [
  "Executivos",
  "Gestores",
  "Diretores",
  "Empresários",
  "Líderes de Inovação",
  "Gestores de Tecnologia",
  "Gestores de Riscos",
  "Profissionais de Compliance",
  "Líderes de Transformação Digital",
  "Product Owners",
  "Profissionais responsáveis por decisões estratégicas",
];

const diferenciais = [
  { t: "Governança + Estratégia", d: "A IA analisada a partir da perspectiva da liderança e da organização." },
  { t: "Framework IGOV.IA", d: "Metodologia aplicada para avaliação da maturidade organizacional." },
  { t: "10 Dimensões", d: "Visão integrada dos principais componentes da Governança de IA." },
  { t: "Orientação Executiva", d: "Conteúdo estruturado para quem toma decisões." },
  { t: "Aplicação Prática", d: "Frameworks, templates, checklists e estudos de caso." },
  { t: "Roadmap", d: "Conhecimento orientado à evolução da maturidade organizacional." },
];

const transformacao = [
  "Compreender IA",
  "Identificar riscos",
  "Avaliar maturidade",
  "Definir prioridades",
  "Estruturar governança",
  "Construir roadmaps",
];

const pilares = ["Estratégia", "Governança", "Tecnologia", "Dados", "Riscos", "Ética", "Pessoas"];

function SectionTitle({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <div className="max-w-3xl">
      {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>}
      <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-muted-foreground">{description}</p>}
    </div>
  );
}

function Flow({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {items.map((s, i) => (
        <div key={s} className="flex items-center gap-3">
          <span className="rounded-full border border-border bg-background/70 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-foreground">
            {s}
          </span>
          {i < items.length - 1 && <ArrowRight className="h-4 w-4 text-primary" aria-hidden />}
        </div>
      ))}
    </div>
  );
}

function CursoPage() {
  const [open, setOpen] = useState<string | null>("01");
  const [showBar, setShowBar] = useState(true);

  const [active, setActive] = useState(anchors[0]!.id);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    anchors.forEach((a) => {
      const el = document.getElementById(a.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(60% 50% at 15% 10%, oklch(0.74 0.18 134 / 0.15), transparent 70%), radial-gradient(40% 40% at 85% 0%, oklch(0.74 0.18 134 / 0.08), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link to="/" className="hover:text-foreground">Home</Link></li>
              <li aria-hidden>/</li>
              <li><Link to="/cursos" className="hover:text-foreground">Cursos</Link></li>
              <li aria-hidden>/</li>
              <li className="text-foreground">Governança em Inteligência Artificial</li>
            </ol>
          </nav>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Curso de Extensão <span className="text-muted-foreground">|</span> Formação Executiva
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            Governança em Inteligência Artificial para Executivos e Gestores
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Prepare-se para liderar a adoção segura, ética e estratégica da Inteligência Artificial.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Uma formação executiva desenvolvida para profissionais responsáveis por decisões
            estratégicas, transformação digital, tecnologia, riscos, inovação e Governança de
            Inteligência Artificial.
          </p>

          <ul className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3 text-xs font-medium text-foreground">
            {barra.map((b, i) => (
              <li key={b} className="flex items-center gap-4">
                <span className="uppercase tracking-wide">{b}</span>
                {i < barra.length - 1 && <span aria-hidden className="hidden h-4 w-px bg-border sm:block" />}
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <EnrollButton />
          </div>
        </div>
      </section>

      {/* Âncoras */}
      <nav
        aria-label="Seções do curso"
        className="sticky top-20 z-30 border-b border-border/60 bg-background/90 backdrop-blur-xl"
      >
        <div className="mx-auto max-w-7xl overflow-x-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex min-w-max items-center gap-6 py-3 text-xs font-medium">
            {anchors.map((a) => (
              <li key={a.id}>
                <a
                  href={`#${a.id}`}
                  className={`whitespace-nowrap transition-colors ${
                    active === a.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {a.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Apresentação */}
      <section id="apresentacao" className="scroll-mt-40 border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <SectionTitle title="Apresentação" />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>
                A crescente adoção da Inteligência Artificial está transformando modelos de negócio,
                processos organizacionais e a tomada de decisões estratégicas. Ao mesmo tempo em que
                amplia oportunidades de inovação, eficiência e geração de valor, a IA também introduz
                novos desafios relacionados à governança, ética, transparência, segurança da
                informação, proteção de dados, conformidade e gestão de riscos.
              </p>
              <p>
                O curso de Governança em Inteligência Artificial para Executivos e Gestores foi
                desenvolvido para preparar líderes capazes de compreender, implementar e supervisionar
                mecanismos de Governança de IA alinhados aos objetivos estratégicos das organizações,
                às exigências regulatórias e às melhores práticas de mercado.
              </p>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <blockquote className="mt-12 max-w-3xl border-l-2 border-primary pl-6">
              <p className="text-2xl font-bold text-foreground sm:text-3xl">
                Governar IA não significa reduzir inovação.
              </p>
              <p className="mt-3 text-muted-foreground">
                Significa criar as condições para utilizá-la com estratégia, segurança, confiança e
                responsabilidade.
              </p>
            </blockquote>
          </Reveal>

          {/* Objetivo */}
          <Reveal delay={180}>
            <div className="mt-20 max-w-3xl">
              <h3 className="text-2xl font-bold text-foreground">O que você estará preparado para fazer</h3>
              <p className="mt-4 text-muted-foreground">
                O curso tem como objetivo capacitar executivos e gestores para liderar a adoção segura,
                ética e estratégica da Inteligência Artificial, utilizando modelos de governança,
                gestão de riscos e avaliação da maturidade organizacional.
              </p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {resultados.map((r, i) => (
              <Reveal key={r.n} delay={i * 70}>
                <div className="h-full rounded-2xl border border-border bg-card/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50">
                  <span className="text-xs font-semibold text-primary">{r.n}</span>
                  <h4 className="mt-3 text-lg font-semibold text-foreground">{r.t}</h4>
                  <p className="mt-2 text-sm text-muted-foreground">{r.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Programa */}
      <section id="programa" className="scroll-mt-40 border-b border-border/60 bg-card/20">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <SectionTitle
              eyebrow="12 módulos"
              title="Programa"
              description="Da compreensão da Inteligência Artificial à construção do Roadmap de Governança."
            />
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-10 rounded-2xl border border-border bg-background/60 p-6 sm:p-8">
              <Flow items={jornada} />
              <p className="mt-5 text-sm text-muted-foreground">
                Uma jornada estruturada para compreender, avaliar e evoluir a Governança de
                Inteligência Artificial.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-background/60">
            {modulos.map((m) => {
              const isOpen = open === m.n;
              return (
                <div key={m.n}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : m.n)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-4 px-6 py-5 text-left transition-colors hover:bg-card/60"
                  >
                    <span className="text-xs font-semibold text-primary">Módulo {m.n}</span>
                    <span className="flex-1 text-sm font-semibold text-foreground sm:text-base">{m.titulo}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-[max-height,opacity] duration-400 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <ul className="space-y-2 px-6 pb-6 pl-6 text-sm text-muted-foreground sm:pl-28">
                      {m.topicos.map((t) => (
                        <li key={t} className="flex items-start gap-2">
                          <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-primary" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Metodologia */}
      <section id="metodologia" className="scroll-mt-40 border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <SectionTitle
              eyebrow="Metodologia"
              title="Aprenda no seu ritmo. Aplique na sua organização."
              description="O curso será realizado na modalidade EAD por meio de Ambiente Virtual de Aprendizagem, permitindo acesso aos conteúdos por computador, tablet ou smartphone."
            />
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metodologia.map(({ icon: Icon, t, d }, i) => (
              <Reveal key={t} delay={i * 60}>
                <div className="group h-full rounded-2xl border border-border bg-card/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-sm font-semibold uppercase tracking-wide text-foreground">{t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Carga horária + modalidade */}
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl border border-border bg-card/50 p-8">
                <p className="text-5xl font-bold text-primary">20h</p>
                <p className="mt-1 text-sm text-muted-foreground">Carga horária total</p>
                <ul className="mt-8 divide-y divide-border">
                  {cargaHoraria.map((c) => (
                    <li key={c.d} className="flex items-baseline justify-between gap-4 py-3">
                      <span className="text-sm text-muted-foreground">{c.d}</span>
                      <span className="text-sm font-semibold text-foreground">{c.h}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
                  <span className="text-sm font-semibold text-foreground">Total</span>
                  <span className="text-sm font-semibold text-primary">20 horas</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={90}>
              <div className="h-full rounded-2xl border border-border bg-card/50 p-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <Monitor className="h-5 w-5" />
                </div>
                <p className="mt-5 text-3xl font-bold text-foreground">100% EAD</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  O curso será disponibilizado em Ambiente Virtual de Aprendizagem, oferecendo
                  flexibilidade para que o participante organize sua jornada de estudos.
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {["Acesso online", "Computador", "Tablet", "Smartphone", "24 horas por dia", "7 dias por semana"].map((d) => (
                    <li
                      key={d}
                      className="rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs text-muted-foreground"
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Público-alvo */}
      <section id="publico-alvo" className="scroll-mt-40 border-b border-border/60 bg-card/20">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <SectionTitle
              title="Para quem é este curso?"
              description="O curso é direcionado a profissionais responsáveis por liderar decisões estratégicas relacionadas à Inteligência Artificial, inovação, tecnologia, transformação digital, riscos e governança."
            />
          </Reveal>
          <div className="mt-10 flex flex-wrap gap-3">
            {publico.map((p, i) => (
              <Reveal key={p} delay={i * 40}>
                <span className="inline-flex rounded-full border border-border bg-background/70 px-4 py-2 text-sm text-foreground transition-colors duration-300 hover:border-primary/50">
                  {p}
                </span>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <div className="mt-12 max-w-2xl rounded-2xl border border-border bg-background/60 p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">Pré-requisitos</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Não existem pré-requisitos técnicos obrigatórios. Conhecimentos básicos de gestão,
                tecnologia ou transformação digital são desejáveis, mas não obrigatórios.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <SectionTitle title="Por que este curso?" />
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {diferenciais.map((d, i) => (
              <Reveal key={d.t} delay={i * 70}>
                <div className="h-full rounded-2xl border border-border bg-card/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">{d.t}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{d.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Investimento */}
      <section id="investimento" className="scroll-mt-40 border-b border-border/60 bg-card/20">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-card via-card to-primary/10 p-10 sm:p-14">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Investimento</p>
              <p className="mt-6 text-5xl font-bold text-foreground sm:text-6xl">R$ 970,00</p>
              <p className="mt-3 text-muted-foreground">Pagamento em até 12 vezes</p>
              <div className="mt-10">
                <EnrollButton className="w-full px-10 py-4 text-base sm:w-auto" />
                <p className="mt-4 text-sm text-muted-foreground">
                  Comece sua jornada em Governança de Inteligência Artificial.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Certificação */}
      <section id="certificado" className="scroll-mt-40 border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <SectionTitle eyebrow="Universidade Anhanguera" title="Certificação" />
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Ao atender aos critérios acadêmicos estabelecidos para conclusão do curso, o
              participante receberá Certificado de Conclusão do Curso de Extensão em Governança em
              Inteligência Artificial para Executivos e Gestores, emitido pela Universidade
              Anhanguera.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
            {["Curso de Extensão", "20 horas", "Certificado de Conclusão", "Universidade Anhanguera", "Reconhecido pelo MEC"].map(
              (item) => (
                <div key={item} className="flex items-center gap-3 bg-background/70 px-5 py-6">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <span className="text-xs font-semibold uppercase tracking-wide text-foreground">{item}</span>
                </div>
              ),
            )}
          </div>
          <Reveal delay={120}>
            <p className="mt-6 max-w-3xl text-xs text-muted-foreground">
              Para certificação, o participante deverá cumprir os critérios acadêmicos definidos pela
              instituição, incluindo no mínimo 75% da carga horária.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Transformação esperada */}
      <section className="border-b border-border/60 bg-card/20">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="max-w-3xl text-2xl font-bold text-foreground sm:text-3xl">
              Ao final da formação, você deverá ampliar sua capacidade de:
            </h2>
          </Reveal>
          <Reveal delay={90}>
            <div className="mt-10">
              <Flow items={transformacao} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sobre o IGOV.IA */}
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">IGOV.IA</p>
              <h2 className="mt-4 text-2xl font-bold text-foreground sm:text-3xl">
                Instituto de Governança em Inteligência Artificial
              </h2>
              <p className="mt-5 text-muted-foreground">
                O IGOV.IA desenvolve metodologias, soluções e programas educacionais destinados a
                apoiar organizações e seus líderes na construção de capacidades para Governança de
                Inteligência Artificial.
              </p>
            </div>
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-2">
            {pilares.map((p) => (
              <span
                key={p}
                className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="scroll-mt-40 border-b border-border/60 bg-card/20">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <SectionTitle title="Tem alguma dúvida sobre o curso?" description="Fale com nossa equipe." />
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <a
              href="mailto:fabio.martins@igovia.com.br"
              className="group rounded-2xl border border-border bg-background/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50"
            >
              <Mail className="h-5 w-5 text-primary" />
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">E-mail</p>
              <p className="mt-1 break-all text-sm text-foreground">fabio.martins@igovia.com.br</p>
            </a>
            <a
              href="https://wa.me/5571988419093"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-border bg-background/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50"
            >
              <Phone className="h-5 w-5 text-primary" />
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">WhatsApp</p>
              <p className="mt-1 text-sm text-foreground">71 98841-9093</p>
            </a>
            <a
              href="https://www.igovia.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-border bg-background/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50"
            >
              <Globe className="h-5 w-5 text-primary" />
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Website</p>
              <p className="mt-1 text-sm text-foreground">igovia.com.br</p>
            </a>
            <a
              href="https://www.linkedin.com/company/igovia"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-border bg-background/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50"
            >
              <Linkedin className="h-5 w-5 text-primary" />
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">LinkedIn</p>
              <p className="mt-1 text-sm text-foreground">IGOV.IA</p>
            </a>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(50% 60% at 50% 20%, oklch(0.74 0.18 134 / 0.12), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-28 text-center sm:px-6 lg:px-8">
          <Reveal>
            <Sparkles className="mx-auto h-6 w-6 text-primary" aria-hidden />
            <h2 className="mx-auto mt-8 max-w-3xl text-3xl font-bold leading-tight text-foreground sm:text-5xl">
              A Inteligência Artificial já está transformando as organizações.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">Prepare-se para governá-la.</p>
            <p className="mt-10 text-sm font-semibold text-foreground">
              Governança em Inteligência Artificial para Executivos e Gestores
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              20h | EAD | Universidade Anhanguera
            </p>
            <div className="mt-10 flex justify-center pb-16 sm:pb-0">
              <EnrollButton className="px-10 py-4 text-base" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA fixo mobile */}
      {showBar && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/95 backdrop-blur-xl lg:hidden">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">R$ 970,00</p>
              <p className="text-[0.65rem] text-muted-foreground">em até 12x</p>
            </div>
            <EnrollButton className="px-5 py-2.5" showArrow={false} />
            <button
              type="button"
              onClick={() => setShowBar(false)}
              aria-label="Ocultar barra de inscrição"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </PageShell>
  );
}

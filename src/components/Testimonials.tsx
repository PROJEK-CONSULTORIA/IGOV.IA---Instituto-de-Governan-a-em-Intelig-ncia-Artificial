import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { testimonials, type Testimonial } from "@/content/testimonials";
import { cn } from "@/lib/utils";

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="group flex h-full flex-col rounded-2xl border border-border bg-card/50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-card hover:shadow-[0_20px_50px_-30px_var(--color-primary)]">
      <div className="flex min-w-0 items-center gap-4">
        <img
          src={t.photo}
          alt={`Foto de ${t.name}, ${t.role} na ${t.company}`}
          loading="lazy"
          width={64}
          height={64}
          className="h-16 w-16 shrink-0 rounded-full border border-primary/25 object-cover object-top"
        />
        <figcaption className="min-w-0">
          <p className="truncate text-base font-semibold text-foreground">{t.name}</p>
          <p className="mt-1 text-sm leading-snug text-muted-foreground">
            {t.role} — {t.company}
          </p>
        </figcaption>
      </div>
      <Quote aria-hidden className="mt-6 h-6 w-6 text-primary/30" />
      <blockquote className="mt-3 text-sm leading-relaxed text-foreground/90">
        “{t.testimonial}”
      </blockquote>
    </figure>
  );
}

export function Testimonials() {
  const isCarousel = testimonials.length > 3;
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const scrollTo = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const child = track.children[i] as HTMLElement | undefined;
    if (child) track.scrollTo({ left: child.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const items = Array.from(track.children) as HTMLElement[];
      const center = track.scrollLeft + track.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      items.forEach((el, i) => {
        const d = Math.abs(el.offsetLeft - track.offsetLeft + el.clientWidth / 2 - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setIndex(best);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="border-t border-border/60">
      <div className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-14 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Depoimentos</p>
            <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-5xl">
              O que os clientes falam sobre nós
            </h2>
            <p className="mt-5 text-muted-foreground">
              Experiências de líderes e organizações que estão construindo uma Inteligência
              Artificial mais estratégica, segura e responsável.
            </p>
          </div>
        </Reveal>

        {isCarousel ? (
          <div>
            <div
              ref={trackRef}
              tabIndex={0}
              role="group"
              aria-label="Depoimentos de clientes"
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="w-[85%] shrink-0 snap-start sm:w-[48%] lg:w-[32%]"
                >
                  <TestimonialCard t={t} />
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-4">
              <button
                type="button"
                aria-label="Depoimento anterior"
                onClick={() => scrollTo(Math.max(0, index - 1))}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary/50 hover:bg-card"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Próximo depoimento"
                onClick={() => scrollTo(Math.min(testimonials.length - 1, index + 1))}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary/50 hover:bg-card"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-2">
                {testimonials.map((t, i) => (
                  <button
                    key={t.name}
                    type="button"
                    aria-label={`Ir para o depoimento de ${t.name}`}
                    aria-current={i === index}
                    onClick={() => scrollTo(i)}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      i === index ? "w-6 bg-primary" : "w-1.5 bg-border hover:bg-primary/50",
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 80}>
                <TestimonialCard t={t} />
              </Reveal>
            ))}
          </div>
        )}

        <Reveal>
          <div className="mt-14 flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-border bg-card/30 p-8 sm:p-10">
            <p className="max-w-xl text-xl font-semibold text-foreground sm:text-2xl">
              Sua organização está preparada para governar a Inteligência Artificial?
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/framework"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-[0_16px_40px_-16px_var(--color-primary)]"
              >
                Conheça o Framework IGOV.IA
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contato"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-7 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-card"
              >
                Fale com nossos especialistas
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

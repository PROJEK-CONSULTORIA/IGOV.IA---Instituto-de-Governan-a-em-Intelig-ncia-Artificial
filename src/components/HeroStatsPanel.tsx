import { Counter } from "./motion/Counter";

const stats = [
  { value: 100, suffix: "+", label: "Questões" },
  { value: 10, suffix: "", label: "Dimensões" },
  { value: 9, suffix: "", label: "Níveis" },
  { value: null, suffix: "∞", label: "Evolução" },
] as const;

export function HeroStatsPanel() {
  return (
    <div className="rounded-3xl border border-primary/25 bg-card/50 p-6 backdrop-blur-xl transition-colors duration-500 hover:border-primary/50 sm:p-8">
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-primary">
        Índice de Governança em IA
      </p>
      <div className="mt-6 grid grid-cols-2 gap-6 lg:grid-cols-1 lg:gap-7">
        {stats.map((s, i) => (
          <div key={s.label} className="group">
            <div className="text-4xl font-bold leading-none text-foreground transition-colors duration-300 group-hover:text-primary sm:text-5xl">
              {s.value === null ? s.suffix : <Counter value={s.value} suffix={s.suffix} delay={200 + i * 120} />}
            </div>
            <div className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

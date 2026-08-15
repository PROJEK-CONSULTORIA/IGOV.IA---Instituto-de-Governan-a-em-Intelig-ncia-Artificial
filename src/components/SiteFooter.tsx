import { Link } from "@tanstack/react-router";
import logo from "@/assets/igovia-logo.png.asset.json";

const columns = [
  {
    title: "Instituto",
    links: [
      { to: "/instituto", label: "Sobre o IGOV.IA" },
      { to: "/framework", label: "Framework" },
      { to: "/contato", label: "Contato" },
    ],
  },
  {
    title: "Soluções",
    links: [
      { to: "/solucoes", label: "Diagnóstico" },
      { to: "/solucoes", label: "Consultoria" },
      { to: "/solucoes", label: "Educação Executiva" },
    ],
  },
  {
    title: "Conteúdo",
    links: [
      { to: "/knowledge-hub", label: "Knowledge Hub" },
      { to: "/forum", label: "AI Governance Forum" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-ink">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <img src={logo.url} alt="IGOV.IA" className="h-12 w-auto brightness-0 invert" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-foreground/60">
              Instituto de Governança em Inteligência Artificial. Sua jornada segura na era da IA.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-xs uppercase tracking-[0.2em] text-primary">{col.title}</p>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-ink-foreground/70 transition-colors hover:text-ink-foreground">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-ink-foreground/10 pt-8">
          <p className="text-xs text-ink-foreground/50">
            © {new Date().getFullYear()} IGOV.IA — INSTITUTO DE GOVERNANÇA EM INTELIGÊNCIA ARTIFICIAL
          </p>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-ink-foreground/60 transition-colors hover:text-ink-foreground"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
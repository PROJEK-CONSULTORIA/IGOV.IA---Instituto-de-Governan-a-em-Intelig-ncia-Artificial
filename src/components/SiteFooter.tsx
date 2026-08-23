import { Link } from "@tanstack/react-router";
import logo from "@/assets/igovia-logo.png.asset.json";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <img src={logo.url} alt="IGOV.IA" className="h-10 w-auto" />
          <p className="mt-4 max-w-md text-sm text-muted-foreground">
            Instituto de Governança em Inteligência Artificial. Promovemos a adoção ética,
            segura e estratégica da IA em organizações públicas e privadas.
          </p>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">Instituto</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/instituto" className="hover:text-foreground">Instituto</Link></li>
            <li><Link to="/solucoes" className="hover:text-foreground">Soluções</Link></li>
            <li><Link to="/framework" className="hover:text-foreground">Framework</Link></li>
            <li><Link to="/cursos" className="hover:text-foreground">Cursos</Link></li>
            <li><Link to="/precos" className="hover:text-foreground">Preços</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">Conteúdo</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/knowledge-hub" className="hover:text-foreground">Publicações</Link></li>
            <li><Link to="/forum" className="hover:text-foreground">AI Governance Forum</Link></li>
            <li><Link to="/contato" className="hover:text-foreground">Contato</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} IGOV.IA — Instituto de Governança em Inteligência Artificial.</p>
          <p>Governança · Ética · Inovação</p>
        </div>
      </div>
    </footer>
  );
}
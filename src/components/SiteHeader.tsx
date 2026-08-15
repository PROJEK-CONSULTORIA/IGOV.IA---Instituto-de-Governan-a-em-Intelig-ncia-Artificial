import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/igovia-logo.png.asset.json";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home" },
  { to: "/framework", label: "Framework" },
  { to: "/solucoes", label: "Soluções" },
  { to: "/knowledge-hub", label: "Knowledge Hub" },
  { to: "/forum", label: "AI Governance Forum" },
  { to: "/instituto", label: "Instituto" },
  { to: "/contato", label: "Contato" },
] as const;

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = !overlay || scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        solid
          ? "border-b border-border bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center">
          <img src={logo.url} alt="IGOV.IA" className="h-12 w-auto" />
        </Link>
        <nav className="hidden items-center gap-8 xl:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-[13px] font-medium tracking-tight text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/contato"
            className="hidden rounded-full bg-primary px-5 py-2.5 text-[13px] font-semibold text-primary-foreground shadow-sm transition-all hover:scale-[1.03] hover:bg-primary/90 lg:inline-flex"
          >
            Solicitar Diagnóstico
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground xl:hidden"
            aria-label="Abrir menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <div className="h-px w-full bg-transparent">
        <div className="h-px bg-primary transition-[width] duration-150" style={{ width: `${progress}%` }} />
      </div>
      {open && (
        <div className="border-t border-border bg-background xl:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                activeProps={{ className: "text-foreground bg-muted" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contato"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground"
            >
              Solicitar Diagnóstico
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
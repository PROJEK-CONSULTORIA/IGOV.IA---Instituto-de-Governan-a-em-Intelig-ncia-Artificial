import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageShell, PageHero } from "@/components/PageShell";
import { Reveal } from "@/components/motion/Reveal";
import { Mail, Linkedin, MapPin } from "lucide-react";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato | IGOV.IA" },
      { name: "description", content: "Fale com o IGOV.IA e solicite o diagnóstico de maturidade em governança de Inteligência Artificial." },
      { property: "og:title", content: "Contato | IGOV.IA" },
      { property: "og:description", content: "Solicite o diagnóstico de maturidade em IA da sua organização." },
    ],
  }),
  component: ContatoPage,
});

function ContatoPage() {
  const [sending, setSending] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Mensagem enviada. Entraremos em contato em breve.");
      (e.target as HTMLFormElement).reset();
    }, 600);
  }

  const field =
    "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";

  return (
    <PageShell>
      <PageHero
        eyebrow="Contato"
        title="Vamos conversar sobre a sua jornada de IA."
        description="Solicite um diagnóstico ou fale com nossa equipe sobre governança, capacitação e projetos de Inteligência Artificial."
      />
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <input required name="nome" placeholder="Nome" className={field} />
                <input required name="organizacao" placeholder="Organização" className={field} />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <input required type="email" name="email" placeholder="E-mail" className={field} />
                <input name="telefone" placeholder="Telefone (opcional)" className={field} />
              </div>
              <input required name="assunto" placeholder="Assunto" className={field} />
              <textarea required name="mensagem" rows={6} placeholder="Mensagem" className={field} />
              <button
                type="submit"
                disabled={sending}
                className="inline-flex rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] disabled:opacity-60"
              >
                {sending ? "Enviando..." : "Enviar mensagem"}
              </button>
            </form>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-8 rounded-2xl border border-border bg-card p-8">
              {[
                { icon: Mail, label: "E-mail", value: "contato@igovia.com.br" },
                { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/company/igovia" },
                { icon: MapPin, label: "Localização", value: "Brasil" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex gap-4">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
                    <p className="mt-1 text-sm text-foreground">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
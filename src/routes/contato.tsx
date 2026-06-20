import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Linkedin, MapPin, Send } from "lucide-react";
import { PageShell, PageHero } from "@/components/PageShell";
import { toast } from "sonner";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — IGOV.IA" },
      { name: "description", content: "Fale com o Instituto de Governança em Inteligência Artificial." },
      { property: "og:title", content: "Contato — IGOV.IA" },
      { property: "og:description", content: "Entre em contato com o IGOV.IA para projetos, parcerias ou diagnósticos." },
    ],
  }),
  component: ContatoPage,
});

function ContatoPage() {
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEnviando(true);
    await new Promise((r) => setTimeout(r, 600));
    setEnviando(false);
    (e.currentTarget as HTMLFormElement).reset();
    toast.success("Mensagem registrada", {
      description: "Em breve entraremos em contato.",
    });
  };

  return (
    <PageShell>
      <PageHero
        eyebrow="Contato"
        title="Vamos conversar sobre governança em IA."
        description="Conte-nos sobre o desafio da sua organização. Nossa equipe retorna em breve."
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-card/60 p-8 sm:p-10">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Nome" name="nome" required />
              <Field label="Organização" name="organizacao" />
              <Field label="E-mail" name="email" type="email" required />
              <Field label="Assunto" name="assunto" required />
            </div>
            <label className="mt-5 block">
              <span className="text-sm font-medium text-foreground">Mensagem</span>
              <textarea
                name="mensagem"
                required
                rows={6}
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                placeholder="Descreva brevemente o contexto e o que precisa..."
              />
            </label>
            <button
              type="submit"
              disabled={enviando}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
            >
              {enviando ? "Enviando..." : (<>Enviar mensagem <Send className="h-4 w-4" /></>)}
            </button>
          </form>

          <aside className="space-y-4">
            <InfoCard icon={Mail} title="E-mail" value="contato@igovia.com.br" />
            <InfoCard icon={Linkedin} title="LinkedIn" value="IGOV.IA" />
            <InfoCard icon={MapPin} title="Atuação" value="Brasil · Atendimento nacional e remoto" />
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
              <h3 className="text-sm font-semibold text-foreground">Parcerias institucionais</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                O IGOV.IA mantém parcerias com universidades, órgãos públicos e empresas. Entre em
                contato para conhecer possibilidades de colaboração.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground">{label}{required && <span className="text-primary"> *</span>}</span>
      <input
        type={type}
        name={name}
        required={required}
        className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
      />
    </label>
  );
}

function InfoCard({ icon: Icon, title, value }: { icon: React.ComponentType<{ className?: string }>; title: string; value: string }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-border bg-card/60 p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</p>
        <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  );
}
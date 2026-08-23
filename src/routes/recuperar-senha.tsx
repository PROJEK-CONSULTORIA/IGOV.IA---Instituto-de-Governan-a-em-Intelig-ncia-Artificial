import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { PageShell } from "@/components/PageShell";
import { supabase } from "@/integrations/supabase/client";

const TITLE = "Recuperar senha | IGOV.IA";
const DESCRIPTION = "Recupere o acesso à sua conta da plataforma IGOV.IA.";

export const Route = createFileRoute("/recuperar-senha")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: RecuperarSenhaPage,
});

function RecuperarSenhaPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
      redirectTo: `${window.location.origin}/login`,
    });
    setLoading(false);
    setSent(true);
  }

  return (
    <PageShell>
      <section className="mx-auto max-w-md px-4 py-20 sm:px-6">
        <h1 className="text-3xl font-bold">Recuperar senha</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Informe seu e-mail e enviaremos um link para redefinir sua senha.
        </p>

        {sent ? (
          <p className="mt-8 rounded-xl border border-primary/40 bg-primary/10 px-4 py-3 text-sm">
            Se existir uma conta com este e-mail, você receberá as instruções em instantes.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-foreground/80">E-mail</span>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </label>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
            >
              {loading ? "Enviando..." : "Enviar link de recuperação"}
            </button>
          </form>
        )}

        <p className="mt-6 text-sm text-muted-foreground">
          <Link to="/login" className="hover:text-foreground">
            Voltar para o login
          </Link>
        </p>
      </section>
    </PageShell>
  );
}

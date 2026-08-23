import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Check } from "lucide-react";

import { PageShell } from "@/components/PageShell";
import { supabase } from "@/integrations/supabase/client";
import { maskPhoneBR } from "@/lib/igovia-domain";
import { registerFreeUser } from "@/lib/free-plan.functions";

const TITLE = "Criar conta gratuita | IGOV.IA";
const DESCRIPTION =
  "Crie sua conta gratuita e realize o Diagnóstico IGOV.IA de Maturidade em Inteligência Artificial com 14 dias de acesso.";

export const Route = createFileRoute("/cadastro")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CadastroPage,
});

const BENEFITS = [
  "14 dias de acesso à plataforma",
  "1 Diagnóstico IGOV.IA completo",
  "10 dimensões e 50 perguntas",
  "Dashboard básico e relatório simplificado",
  "Relatório em PDF para download",
];

function CadastroPage() {
  const navigate = useNavigate();
  const register = useServerFn(registerFreeUser);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    organization: "",
    password: "",
    confirm: "",
  });
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function update(key: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    if (form.password !== form.confirm) {
      setError("As senhas não coincidem.");
      return;
    }
    if (form.password.length < 8 || !/[A-Za-z]/.test(form.password) || !/\d/.test(form.password)) {
      setError("A senha deve ter no mínimo 8 caracteres, com letras e números.");
      return;
    }
    if (!terms || !privacy) {
      setError("É necessário aceitar os Termos de Uso e a Política de Privacidade.");
      return;
    }

    setLoading(true);
    try {
      const result = await register({
        data: {
          fullName: form.fullName,
          phone: form.phone,
          email: form.email,
          organization: form.organization,
          password: form.password,
          acceptedTerms: true,
          acceptedPrivacy: true,
        },
      });
      if (!result.ok) {
        setError(result.message);
        setLoading(false);
        return;
      }
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });
      setLoading(false);
      if (signInError) {
        navigate({ to: "/login" });
        return;
      }
      navigate({ to: "/dashboard" });
    } catch {
      setLoading(false);
      setError("Não foi possível concluir o cadastro. Tente novamente.");
    }
  }

  return (
    <PageShell>
      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Plano Free</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            Crie sua conta e faça o Diagnóstico gratuito
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Conheça o nível de maturidade da sua organização em Governança de Inteligência Artificial.
            Sem cartão de crédito.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            {BENEFITS.map((benefit) => (
              <li key={benefit} className="flex gap-2.5">
                <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-foreground/85">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-border bg-card p-6 sm:p-8"
        >
          <div className="space-y-4">
            <Field label="Nome completo">
              <input
                required
                minLength={3}
                maxLength={120}
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Telefone">
              <input
                required
                inputMode="tel"
                value={form.phone}
                onChange={(e) => update("phone", maskPhoneBR(e.target.value))}
                placeholder="(11) 90000-0000"
                className={inputClass}
              />
            </Field>
            <Field label="E-mail corporativo">
              <input
                required
                type="email"
                maxLength={255}
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Organização">
              <input
                required
                minLength={2}
                maxLength={160}
                value={form.organization}
                onChange={(e) => update("organization", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Senha">
              <input
                required
                type="password"
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                className={inputClass}
              />
              <span className="mt-1 block text-xs text-muted-foreground">
                Mínimo de 8 caracteres, com letras e números.
              </span>
            </Field>
            <Field label="Confirmar senha">
              <input
                required
                type="password"
                value={form.confirm}
                onChange={(e) => update("confirm", e.target.value)}
                className={inputClass}
              />
            </Field>

            <label className="flex gap-2.5 text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                className="mt-1 h-4 w-4 accent-[var(--color-primary)]"
              />
              <span>Li e aceito os Termos de Uso.</span>
            </label>
            <label className="flex gap-2.5 text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={privacy}
                onChange={(e) => setPrivacy(e.target.checked)}
                className="mt-1 h-4 w-4 accent-[var(--color-primary)]"
              />
              <span>Li e aceito a Política de Privacidade.</span>
            </label>

            {error && (
              <p role="alert" className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
            >
              {loading ? "Criando conta..." : "Criar conta gratuita"}
            </button>

            <p className="text-center text-sm text-muted-foreground">
              Já tem conta?{" "}
              <Link to="/login" className="font-semibold text-primary hover:underline">
                Entrar
              </Link>
            </p>
          </div>
        </form>
      </section>
    </PageShell>
  );
}

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground/80">{label}</span>
      {children}
    </label>
  );
}

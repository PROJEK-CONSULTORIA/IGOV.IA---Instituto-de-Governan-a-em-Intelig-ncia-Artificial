import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const registerSchema = z.object({
  fullName: z.string().trim().min(3, "Informe seu nome completo.").max(120),
  phone: z
    .string()
    .trim()
    .refine((value) => value.replace(/\D/g, "").length >= 10, "Telefone inválido."),
  email: z.string().trim().email("E-mail inválido.").max(255),
  organization: z.string().trim().min(2, "Informe sua organização.").max(160),
  password: z
    .string()
    .min(8, "A senha deve ter ao menos 8 caracteres.")
    .refine((value) => /[A-Za-z]/.test(value) && /\d/.test(value), "A senha deve conter letras e números."),
  acceptedTerms: z.literal(true),
  acceptedPrivacy: z.literal(true),
});

export const registerFreeUser = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => registerSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const email = data.email.toLowerCase();

    const { data: created, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password: data.password,
      email_confirm: true,
      user_metadata: {
        full_name: data.fullName,
        phone: data.phone,
        organization_name: data.organization,
        accepted_terms: "true",
        accepted_privacy: "true",
      },
    });

    if (error) {
      const message = /already|registered|exists/i.test(error.message)
        ? "Já existe uma conta cadastrada com este e-mail."
        : "Não foi possível concluir o cadastro. Tente novamente.";
      return { ok: false as const, message };
    }
    return { ok: true as const, userId: created.user?.id ?? null };
  });

export const getDashboard = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { loadDashboard } = await import("./free-plan.server");
    return loadDashboard(context.supabase, context.userId);
  });

export const startDiagnostic = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { startDiagnostic: start } = await import("./free-plan.server");
    return start(context.supabase, context.userId);
  });

export const getDiagnosticDimension = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ diagnosticId: z.string().uuid(), position: z.number().int().min(1).max(10) }).parse(input),
  )
  .handler(async ({ context, data }) => {
    const { loadDimension } = await import("./free-plan.server");
    return loadDimension(context.supabase, context.userId, data.diagnosticId, data.position);
  });

export const saveDiagnosticAnswer = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        diagnosticId: z.string().uuid(),
        questionId: z.string().uuid(),
        answerOptionId: z.string().uuid(),
      })
      .parse(input),
  )
  .handler(async ({ context, data }) => {
    const { saveAnswer } = await import("./free-plan.server");
    return saveAnswer(
      context.supabase,
      context.userId,
      data.diagnosticId,
      data.questionId,
      data.answerOptionId,
    );
  });

export const finishDiagnostic = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ diagnosticId: z.string().uuid() }).parse(input))
  .handler(async ({ context, data }) => {
    const { completeDiagnostic } = await import("./free-plan.server");
    return completeDiagnostic(context.supabase, context.userId, data.diagnosticId);
  });

export const getDiagnosticReport = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ diagnosticId: z.string().uuid() }).parse(input))
  .handler(async ({ context, data }) => {
    const { loadReport } = await import("./free-plan.server");
    return loadReport(context.supabase, context.userId, data.diagnosticId);
  });

export const getReportDownloadUrl = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ diagnosticId: z.string().uuid() }).parse(input))
  .handler(async ({ context, data }) => {
    const { ensureReportPdf } = await import("./free-plan.server");
    return ensureReportPdf(context.supabase, context.userId, data.diagnosticId);
  });

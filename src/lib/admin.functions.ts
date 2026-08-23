import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const adminGetOverview = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { assertAdmin, adminOverview } = await import("./admin.server");
    await assertAdmin(context.supabase, context.userId);
    return adminOverview();
  });

export const adminListUsers = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ search: z.string().max(120).default(""), filter: z.string().max(30).default("all") }).parse(input),
  )
  .handler(async ({ context, data }) => {
    const { assertAdmin, adminUsers } = await import("./admin.server");
    await assertAdmin(context.supabase, context.userId);
    return adminUsers(data.search, data.filter);
  });

export const adminGetUser = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ userId: z.string().uuid() }).parse(input))
  .handler(async ({ context, data }) => {
    const { assertAdmin, adminUserDetail } = await import("./admin.server");
    await assertAdmin(context.supabase, context.userId);
    return adminUserDetail(data.userId);
  });

export const adminListDiagnostics = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ filter: z.string().max(30).default("all") }).parse(input))
  .handler(async ({ context, data }) => {
    const { assertAdmin, adminDiagnostics } = await import("./admin.server");
    await assertAdmin(context.supabase, context.userId);
    return adminDiagnostics(data.filter);
  });

export const adminGetDiagnostic = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ diagnosticId: z.string().uuid() }).parse(input))
  .handler(async ({ context, data }) => {
    const { assertAdmin, adminDiagnosticDetail } = await import("./admin.server");
    await assertAdmin(context.supabase, context.userId);
    return adminDiagnosticDetail(data.diagnosticId);
  });

export const adminGetFramework = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { assertAdmin, adminFramework } = await import("./admin.server");
    await assertAdmin(context.supabase, context.userId);
    return adminFramework();
  });

export const adminSaveQuestion = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        dimensionId: z.string().uuid(),
        questionId: z.string().uuid().optional(),
        number: z.number().int().min(1).max(50),
        statement: z.string().trim().min(5).max(1000),
        position: z.number().int().min(1).max(5),
        options: z
          .array(
            z.object({
              level: z.number().int().min(1).max(9),
              text: z.string().trim().min(1).max(600),
              interpretation: z.string().max(600).default(""),
              action: z.string().max(600).default(""),
            }),
          )
          .length(9),
      })
      .parse(input),
  )
  .handler(async ({ context, data }) => {
    const { assertAdmin, saveQuestion } = await import("./admin.server");
    await assertAdmin(context.supabase, context.userId);
    return saveQuestion(context.userId, data);
  });

export const adminListAuditLogs = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { assertAdmin, adminAuditLogs } = await import("./admin.server");
    await assertAdmin(context.supabase, context.userId);
    return adminAuditLogs();
  });

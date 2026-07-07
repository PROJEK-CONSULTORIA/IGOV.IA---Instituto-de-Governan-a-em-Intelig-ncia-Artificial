// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Prerender + static Nitro preset only run on external CI (e.g. Vercel).
// Inside the Lovable sandbox the Cloudflare preset is pinned and the preview
// server used by prerender cannot resolve the bundled server entry, so we
// disable both there.
const isVercel = !!process.env.VERCEL;

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    server: { entry: "server" },
  },
  // On Vercel, build with the Vercel Nitro preset (serverless). In the
  // Lovable sandbox, the Cloudflare preset from the base config stays active.
  ...(isVercel ? { nitro: { preset: "vercel" } } : {}),
});

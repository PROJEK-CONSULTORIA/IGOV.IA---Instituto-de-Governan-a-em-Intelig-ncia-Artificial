// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // Prerender every route to static HTML so the site can be hosted as
    // static files (e.g. on Vercel static).
    prerender: {
      enabled: true,
      crawlLinks: true,
      routes: [
        "/",
        "/sobre",
        "/o-que-fazemos",
        "/publicacoes",
        "/indice-governanca-ia",
        "/eventos",
        "/contato",
      ],
    },
    pages: [
      { path: "/", prerender: { enabled: true } },
      { path: "/sobre", prerender: { enabled: true } },
      { path: "/o-que-fazemos", prerender: { enabled: true } },
      { path: "/publicacoes", prerender: { enabled: true } },
      { path: "/indice-governanca-ia", prerender: { enabled: true } },
      { path: "/eventos", prerender: { enabled: true } },
      { path: "/contato", prerender: { enabled: true } },
    ],
  },
  // Force a fully static Nitro build (writes to `.output/public`).
  // Ignored inside the Lovable sandbox (which pins Cloudflare), applied on
  // external CI like Vercel.
  nitro: {
    preset: "static",
  },
});

# Deploy estático no Vercel

Este projeto está configurado para gerar um site 100% estático via
prerender do TanStack Start (Nitro preset `static`).

## Passos

1. Faça push do repositório no GitHub/GitLab/Bitbucket.
2. No Vercel: **Add New Project → Import** o repositório.
3. Em **Framework Preset** escolha **Other** (o `vercel.json` já define
   `buildCommand` e `outputDirectory`).
4. Deploy. O Vercel executa `npm run build` e publica `.output/public`.

## Build local (opcional)

```bash
npm install
npm run build
npx serve .output/public
```

## Notas

- Todas as rotas listadas em `vite.config.ts` (`tanstackStart.prerender.routes`)
  são geradas como HTML estático.
- Ao adicionar uma nova rota em `src/routes/`, inclua o caminho na lista de
  `routes` do prerender para que ela seja gerada no build.
- Como o site é estático, **server functions** (`createServerFn`) e rotas
  em `src/routes/api/` **não funcionarão** em produção — use apenas
  chamadas client-side (fetch para APIs externas) neste modo.
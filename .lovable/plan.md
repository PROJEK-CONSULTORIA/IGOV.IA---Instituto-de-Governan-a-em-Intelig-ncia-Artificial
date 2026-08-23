# Nova página "Preços" (/precos)

Página institucional de planos com estética premium minimalista, fundo branco, preto e verde IGOV.IA, seguindo o padrão tipográfico e de espaçamento já usado nas páginas de Cursos.

## Estrutura da página

1. **Hero** (fundo branco, único H1)
   - H1: "Governança de IA para cada estágio da sua organização."
   - Subtítulo e frase de apoio conforme especificado.
2. **Cards dos planos** — Free, Essential, Professional, Enterprise
   - Desktop 4 colunas, tablet 2x2, mobile 1 coluna.
   - Mesma estrutura visual: nome, headline, preço, descrição, lista de benefícios com checkmarks discretos, botão alinhado na base (altura igualada via flex).
   - Free: botão outline preto. Essential: botão preto sólido.
   - Professional: selo "MAIS RECOMENDADO", borda verde, leve escala, botão verde.
   - Enterprise: card preto, texto branco, detalhes e CTA em verde.
   - Preços, parcelamentos e benefícios exatamente como fornecidos, sem acréscimos.
3. **Jornada de maturidade** — "Evolua conforme a maturidade da sua organização": 4 etapas (Experimente / Diagnostique / Evolua / Transforme) horizontais no desktop com setas, verticais no mobile, cada uma com sua frase.
4. **Tabela comparativa** — 11 linhas de recursos x 4 planos, HTML semântico (`table`, `thead`, `th scope`), com rolagem horizontal no mobile.
5. **Condições de pagamento** — bloco discreto com o texto de acréscimo de 12% e os dois quadros Essential e Professional.
6. **FAQ** — accordion com as 7 perguntas (componente Accordion do shadcn já disponível no projeto).
7. **CTA final** — faixa preta com título, subtítulo, botão verde "Experimentar grátis" e botão secundário "Falar com um especialista".
8. Header e footer existentes via PageShell, sem alterações de conteúdo.

## Menu

Adicionar "Preços" ao menu principal (desktop e mobile) em `SiteHeader`, entre "Cursos" e "Publicações", e um link no rodapé na coluna Instituto. Nenhuma outra página é alterada.

## Destinos dos botões

Como não há plataforma de checkout informada, todos os CTAs de plano ("Experimentar grátis", "Contratar Essential", "Contratar Professional", "Falar com um especialista") apontam para `/contato`. Basta informar as URLs reais depois para eu trocar em um único ponto.

## Detalhes técnicos

- Novo arquivo `src/routes/precos.tsx` com `createFileRoute("/precos")` e `head()` com title "Planos e Preços | IGOV.IA", meta description especificada, og:title/og:description, og:type e twitter:card.
- Conteúdo dos planos, tabela e FAQ em um módulo de dados `src/content/precos.ts` para manter o componente enxuto.
- O site usa tema escuro global; a página branca será construída com uma seção de superfície clara explícita usando tokens de cor definidos localmente na página (sem hardcode de hex fora do padrão), preservando contraste AA.
- Reuso de `PageShell` e do componente `Reveal` para os fade-ins suaves já usados no site.
- Hovers discretos nos cards e botões; foco visível para acessibilidade; hierarquia H1 > H2 > H3 correta.

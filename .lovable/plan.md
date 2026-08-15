## IGOV.IA — Experiência premium, novo menu e nova Home

Mantém o tema escuro atual e a logomarca. Adiciona camada de movimento (motion, já instalado), novo menu e Home em seções de tela cheia.

### Menu

Itens: Home, Framework, Soluções, Knowledge Hub, AI Governance Forum, Instituto, Contato.
À direita: botão verde "Solicitar Diagnóstico" (leva a /contato).
Comportamento: transparente sobre o Hero, vira preto sólido (com blur e borda sutil) ao rolar. Mobile: menu em painel deslizante.

Mapeamento de rotas (conteúdo existente é reaproveitado, sem perder páginas):

```text
Framework            -> /framework            (conteúdo atual de /indice-governanca-ia)
Soluções             -> /solucoes             (conteúdo atual de /o-que-fazemos)
Knowledge Hub        -> /knowledge-hub        (conteúdo atual de /publicacoes)
AI Governance Forum  -> /forum                (conteúdo atual de /eventos)
Instituto            -> /instituto            (conteúdo atual de /sobre)
Contato              -> /contato
```

As rotas antigas continuam existindo como redirecionamento para as novas, para não quebrar links.

### Home

Seções de altura ~100vh, muito preto, respiro generoso:

1. Hero centralizado
   - Título: "Governando o futuro da Inteligência Artificial."
   - Subtítulo: "O IGOV.IA ajuda organizações públicas e privadas a implementar Inteligência Artificial com estratégia, confiança e responsabilidade."
   - Botão principal verde: Solicitar Diagnóstico
   - Botão secundário contornado: Conhecer o Framework
   - Painel flutuante à direita (vidro fosco, borda verde sutil) com contadores animados no load: 100+ Questões, 10 Dimensões, 9 Níveis, ∞ Evolução. Em telas pequenas, o painel vira uma faixa horizontal abaixo dos botões.
2. Pilares (estratégia, governança, maturidade, projetos, agentes, capacitação)
3. Para quem é o IGOV.IA (setores)
4. Framework em destaque (10 dimensões, atalho para /framework)
5. Explore o IGOV.IA (atalhos para as seções)
6. CTA final

### Experiência e movimento

- Scroll suave nativo com respeito a `prefers-reduced-motion`
- Fade/slide de entrada por seção (aparecem conforme o usuário desce, uma vez só)
- Transição de fade entre páginas
- Parallax leve (8-20px) em fundos e no painel do Hero
- Hover sofisticado: elevação sutil, brilho verde na borda, deslocamento de seta, sublinhado animado nos links
- Animações curtas (150-500ms), easing suave, sem exageros
- Performance: apenas transform/opacity, IntersectionObserver, sem animação em listas longas

### Detalhes técnicos

- Novos componentes: `Reveal.tsx` (scroll reveal), `Counter.tsx` (contador animado), `Parallax.tsx`, `HeroStatsPanel.tsx`
- `SiteHeader.tsx` reescrito (estado de scroll, novos itens, botão verde)
- `PageShell.tsx` ganha wrapper de transição de página
- Conteúdo permanece dentro de cada arquivo de rota, como hoje
- SEO: `head()` próprio com title/description/OG para cada nova rota

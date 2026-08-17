## Seção "O que os clientes falam sobre nós"

Nova seção de depoimentos na Home, no mesmo tema escuro premium do site (sem mudar o conceito visual atual).

### Onde entra

Depois da seção "Para quem é o IGOV.IA / audiências" e antes de "Parceiros Estratégicos", mantendo a narrativa: soluções → resultados/depoimentos → autoridade → CTA.

### Conteúdo

Título: "O que os clientes falam sobre nós"
Apoio: "Experiências de líderes e organizações que estão construindo uma Inteligência Artificial mais estratégica, segura e responsável."

Depoimentos reais (com as fotos anexadas):

- Carlos Nestor — Líder de Desenvolvimento e Inovação, Obras Sociais Irmã Dulce
- Danilo Andrade — CEO, Horus CDA

### Cards

- Foto circular 1:1, rosto centralizado, borda verde bem discreta
- Nome em semibold; cargo e empresa abaixo, menores e em cor secundária
- Ícone de aspas verde com baixa opacidade acima do texto
- Depoimento entre aspas, boa altura de linha
- Hover: elevação leve + sombra sutil, transição ~250ms
- Grid: 3 colunas em desktop, 2 em tablet, 1 em mobile

### Carrossel

Enquanto houver até 3 depoimentos, exibe grid estático. Com 4 ou mais, vira carrossel horizontal com scroll-snap: setas discretas, indicadores minimalistas, swipe no mobile, navegação por teclado, sem autoplay.

### CTA no fim da seção

"Sua organização está preparada para governar a Inteligência Artificial?"
Botão primário verde: Conheça o Framework IGOV.IA (/framework)
Botão secundário contornado: Fale com nossos especialistas (/contato)
Mesmo padrão de botões já usado no Hero.

### Acessibilidade

Alt descritivo nas fotos ("Foto de Carlos Nestor, Líder de Desenvolvimento e Inovação na Obras Sociais Irmã Dulce"), foco visível, aria-label nas setas, respeito a prefers-reduced-motion.

### Detalhes técnicos

- `src/content/testimonials.ts` com array tipado de campos `name`, `role`, `company`, `photo`, `testimonial` — fácil incluir novos clientes
- Fotos enviadas para o CDN de assets (`src/assets/*.asset.json`), referenciadas pelo campo `photo`
- Novo componente `src/components/Testimonials.tsx` usando `Reveal` já existente
- Home (`src/routes/index.tsx`) apenas renderiza o componente na posição indicada; nenhuma outra seção é alterada

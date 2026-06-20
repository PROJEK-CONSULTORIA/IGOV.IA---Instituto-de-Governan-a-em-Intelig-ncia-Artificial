## Site Institucional IGOV.IA

Site multi-página em português, identidade visual baseada no logo enviado (preto + verde IGOV.IA), conteúdo institucional extraído de igovia.com.br adaptado para a estrutura solicitada.

### Estrutura de rotas

```
/                          Home (hero + destaques + CTA)
/sobre                     Sobre o Instituto
/o-que-fazemos             Serviços / atuação
/publicacoes               Publicações
/eventos                   Eventos
/indice-governanca-ia      Índice de Governança em IA
/contato                   Contato
```

Header fixo com navegação para as 6 seções + logo. Footer com identidade, links rápidos e contato.

### Conteúdo por página

**Home (`/`)**
- Hero: "Inteligência Artificial com estratégia, governança e aplicação prática"
- Subhero institucional do IGOV.IA
- Cards com pilares (Setor Público, Indústria, Comércio, Serviços)
- CTA para "O que fazemos" e "Índice de Governança em IA"

**Sobre (`/sobre`)** — usa o texto institucional fornecido pelo usuário:
- Propósito do Instituto
- Atuação como agente de transformação
- Compromisso ético
- Bloco "Nossa razão de existir" (visão)
- Princípios (Evolução mensurável, Governança a riscos, Segurança jurídica, Transparência algorítmica, Conformidade regulatória, Sustentabilidade, Aprendizado contínuo, Adaptação ao contexto)

**O que fazemos (`/o-que-fazemos`)** — eixos de serviço extraídos do site:
- Diagnóstico de maturidade em IA
- Estruturação de estratégia e governança
- Análise de mercado e inteligência estratégica
- Gestão de projetos de IA (metodologia própria)
- Desenvolvimento de agentes inteligentes
- Capacitação e gestão de mudança
- Cada serviço: ícone, título, descrição curta

Seção "Jornada de Evolução" com 8 etapas: Diagnosticar → Planejar → Estruturar → Capacitar → Implementar → Monitorar → Reavaliar → Evoluir.

**Publicações (`/publicacoes`)**
- Grid de cards de artigos/whitepapers (placeholders editáveis: título, resumo, data, categoria, link "Em breve")
- Categorias: Governança, Ética & Compliance, Casos Práticos, Regulamentação
- Banner para inscrição em newsletter (apenas visual nesta fase)

**Eventos (`/eventos`)**
- Lista de eventos próximos (cards placeholder: data, local, título, descrição)
- Seção "Eventos anteriores" (placeholder)
- CTA "Receber convites" leva para Contato

**Índice de Governança em IA (`/indice-governanca-ia`)** — usa as 10 dimensões do site:
1. Estratégia e Governança
2. Cultura, Pessoas e Comunicação
3. Estrutura Tecnológica
4. Investimentos, Custos e Despesas
5. Qualidade de Dados
6. Impacto no Usuário Final
7. Compliance, Riscos e Ética
8. Segurança da Informação
9. Fornecedores e Integrações
10. Monitoramento e Melhoria Contínua

Cada dimensão como card com ícone, descrição e nível de maturidade ilustrativo. Bloco explicativo da metodologia e CTA "Solicitar diagnóstico" → Contato.

**Contato (`/contato`)**
- Formulário (nome, organização, e-mail, assunto, mensagem) — nesta fase, apenas frontend com validação e toast de confirmação (sem backend). Posso plugar Lovable Cloud depois para armazenar mensagens, se desejar.
- Bloco lateral com e-mail institucional, LinkedIn e localização (placeholders editáveis)

### Design

- **Paleta**: preto profundo (#0A0A0A), verde IGOV.IA (~#7AB838), branco, cinzas neutros
- **Tipografia**: sans-serif geométrica forte para títulos (estilo do logo) + sans-serif neutra para corpo
- **Estilo**: institucional moderno, tech-sério, espaçamento generoso, detalhes em verde, cards com bordas sutis, hover suave
- Tokens semânticos em `src/styles.css` (sem cores hardcoded nos componentes)
- SEO: title/description únicos por rota, Open Graph básico

### Detalhes técnicos

- TanStack Start file-based routing em `src/routes/`
- Componentes compartilhados: `SiteHeader`, `SiteFooter`, `SectionHeader`, `Card`, `CTASection`
- Logo enviado salvo como asset Lovable e usado no header/footer
- Conteúdo em arquivos `.ts` de dados por página, fácil de editar depois
- Formulário de contato sem backend nesta primeira versão

### Fora do escopo (posso adicionar depois mediante pedido)

- Backend para formulário (Lovable Cloud)
- CMS para publicações/eventos
- Versões em inglês/espanhol
- Diagnóstico interativo de maturidade (questionário com pontuação)

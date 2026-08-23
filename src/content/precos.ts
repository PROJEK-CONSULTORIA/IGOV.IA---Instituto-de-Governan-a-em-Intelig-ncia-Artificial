export type Plano = {
  id: "free" | "essential" | "professional" | "enterprise";
  nome: string;
  headline: string;
  preco: string;
  precoComplemento?: string;
  parcelado?: { destaque: string; parcela: string; total: string };
  precoNota?: string;
  descricao: string;
  beneficios: string[];
  cta: string;
  destaque?: boolean;
  selo?: string;
  dark?: boolean;
};

export const planos: Plano[] = [
  {
    id: "free",
    nome: "FREE",
    headline: "Experimente",
    preco: "R$ 0",
    precoNota: "Gratuito por 14 dias",
    descricao:
      "Conheça a metodologia IGOV.IA e descubra o nível inicial de maturidade da sua organização em Governança de Inteligência Artificial.",
    beneficios: [
      "14 dias de acesso à plataforma",
      "1 Diagnóstico IGOV.IA",
      "Avaliação das 10 dimensões do Framework IGOV.IA",
      "Dashboard básico",
      "Relatório simplificado de maturidade",
    ],
    cta: "Experimentar grátis",
  },
  {
    id: "essential",
    nome: "ESSENTIAL",
    headline: "Diagnostique",
    preco: "R$ 970",
    precoComplemento: "à vista",
    parcelado: {
      destaque: "ou em até 12x no cartão",
      parcela: "12x de R$ 90,53",
      total: "Total parcelado: R$ 1.086,40",
    },
    descricao:
      "Meça sua maturidade, identifique gaps e acompanhe os primeiros avanços da Governança de IA na organização.",
    beneficios: [
      "6 meses de acesso à plataforma",
      "2 Diagnósticos IGOV.IA",
      "Avaliação completa das 10 dimensões",
      "Relatórios completos de maturidade",
      "Dashboard comparativo",
      "Histórico de evolução",
      "Materiais exclusivos",
      "Templates essenciais de Governança de IA",
      "1 aluno no Curso de Governança em Inteligência Artificial",
      "Certificado emitido pela Universidade Anhanguera",
    ],
    cta: "Contratar Essential",
  },
  {
    id: "professional",
    nome: "PROFESSIONAL",
    headline: "Evolua",
    preco: "R$ 3.990",
    precoComplemento: "à vista",
    parcelado: {
      destaque: "ou em até 12x no cartão",
      parcela: "12x de R$ 372,40",
      total: "Total parcelado: R$ 4.468,80",
    },
    descricao:
      "Transforme a Governança de IA em um processo contínuo de evolução, capacitação e acompanhamento da maturidade.",
    beneficios: [
      "1 ano de acesso à plataforma",
      "4 Diagnósticos IGOV.IA",
      "Diagnósticos evolutivos ao longo do ano",
      "Dashboard evolutivo",
      "Comparação entre os quatro ciclos de diagnóstico",
      "Histórico da maturidade",
      "Relatórios executivos",
      "Plano de ação",
      "Biblioteca completa de materiais exclusivos",
      "Templates completos de Governança de IA",
      "Jornada Digital de Adoção de IA",
      "5 alunos no Curso de Governança em Inteligência Artificial",
      "Curso reconhecido pelo MEC",
      "Certificados emitidos pela Universidade Anhanguera",
    ],
    cta: "Contratar Professional",
    destaque: true,
    selo: "Mais recomendado",
  },
  {
    id: "enterprise",
    nome: "ENTERPRISE",
    headline: "Transforme",
    preco: "Sob consulta",
    descricao:
      "Uma jornada personalizada de Governança e Adoção de Inteligência Artificial construída de acordo com os desafios, estrutura e objetivos da sua organização.",
    beneficios: [
      "Acesso à plataforma sob medida",
      "Diagnósticos IGOV.IA personalizados",
      "Avaliação de múltiplas áreas, unidades ou empresas",
      "Quantidade de usuários personalizada",
      "Quantidade de alunos personalizada",
      "Jornada Assistida de Adoção de IA",
      "Consultoria especializada",
      "Workshops",
      "Desenvolvimento de políticas de Governança de IA",
      "Roadmap de Governança e Adoção de IA",
      "Treinamento presencial",
      "Programa para executivos e alta liderança",
    ],
    cta: "Falar com um especialista",
    dark: true,
  },
];

export const jornada = [
  { nome: "FREE", headline: "Experimente", frase: "Conheça sua maturidade." },
  {
    nome: "ESSENTIAL",
    headline: "Diagnostique",
    frase: "Identifique gaps e acompanhe os primeiros avanços.",
  },
  {
    nome: "PROFESSIONAL",
    headline: "Evolua",
    frase: "Estabeleça um ciclo contínuo de evolução.",
  },
  {
    nome: "ENTERPRISE",
    headline: "Transforme",
    frase: "Implemente uma jornada personalizada de Governança de IA.",
  },
];

export const comparativo: { recurso: string; valores: [string, string, string, string] }[] = [
  { recurso: "Acesso à plataforma", valores: ["14 dias", "6 meses", "1 ano", "Sob medida"] },
  { recurso: "Diagnósticos IGOV.IA", valores: ["1", "2", "4", "Sob medida"] },
  {
    recurso: "Relatório",
    valores: ["Simplificado", "Completo", "Completo + Evolutivo", "Personalizado"],
  },
  { recurso: "Dashboard", valores: ["Básico", "Completo", "Evolutivo", "Personalizado"] },
  { recurso: "Histórico de evolução", valores: ["Não", "Sim", "Sim", "Sim"] },
  { recurso: "Materiais exclusivos", valores: ["Não", "Sim", "Sim", "Sim"] },
  { recurso: "Templates", valores: ["Não", "Essenciais", "Completos", "Personalizados"] },
  { recurso: "Curso de Governança em IA", valores: ["Não", "1 aluno", "5 alunos", "Sob medida"] },
  { recurso: "Jornada de Adoção de IA", valores: ["Não", "Não", "Digital", "Assistida"] },
  { recurso: "Consultoria especializada", valores: ["Não", "Não", "Não", "Sob medida"] },
  {
    recurso: "Treinamento presencial executivo",
    valores: ["Não", "Não", "Não", "Disponível"],
  },
];

export const faq = [
  {
    q: "O que é o Diagnóstico IGOV.IA?",
    a: "O Diagnóstico IGOV.IA avalia a maturidade da organização nas 10 dimensões do Framework IGOV.IA, permitindo identificar pontos fortes, gaps e prioridades para evolução da Governança de Inteligência Artificial.",
  },
  {
    q: "Qual a diferença entre o Essential e o Professional?",
    a: "O Essential oferece um ciclo de seis meses com dois diagnósticos. O Professional oferece um ciclo anual com quatro diagnósticos, permitindo acompanhar de forma mais contínua a evolução da maturidade da organização.",
  },
  {
    q: "Quantas pessoas têm acesso aos cursos?",
    a: "O Essential inclui acesso para 1 aluno. O Professional inclui acesso para 5 alunos. No Enterprise, a quantidade é definida de acordo com a necessidade da organização.",
  },
  {
    q: "Quem emite o certificado do curso?",
    a: "Nos planos que incluem a formação, os certificados são emitidos pela Universidade Anhanguera.",
  },
  {
    q: "O Professional inclui consultoria?",
    a: "Não. O Professional inclui a Jornada Digital de Adoção de IA. O acompanhamento por consultores especializados está disponível por meio do plano Enterprise.",
  },
  {
    q: "Como funciona o Enterprise?",
    a: "O Enterprise é uma solução personalizada. Quantidade de diagnósticos, usuários, alunos, consultoria, treinamentos e demais componentes são definidos a partir das necessidades da organização.",
  },
  {
    q: "Posso começar no Free e depois mudar de plano?",
    a: "Sim. O Free foi criado exatamente para permitir que o usuário conheça a plataforma e a metodologia antes de avançar para um plano pago.",
  },
];

export const pagamento = [
  {
    nome: "ESSENTIAL",
    aVista: "R$ 970 à vista",
    parcela: "12x de R$ 90,53",
    total: "Total parcelado: R$ 1.086,40",
  },
  {
    nome: "PROFESSIONAL",
    aVista: "R$ 3.990 à vista",
    parcela: "12x de R$ 372,40",
    total: "Total parcelado: R$ 4.468,80",
  },
];

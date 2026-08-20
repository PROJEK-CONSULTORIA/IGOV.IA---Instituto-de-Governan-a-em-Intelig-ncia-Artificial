/**
 * Link oficial da plataforma de inscrição.
 * Assim que o endereço for informado, altere APENAS esta constante
 * para atualizar todos os botões "Inscreva-se" do site.
 */
export const COURSE_ENROLLMENT_URL = "";

export type Curso = {
  slug: string;
  badge: string;
  titulo: string;
  complemento?: string;
  frase: string;
  quickFacts: { value: string; label: string }[];
  descricao: string[];
  to: "/cursos/governanca-inteligencia-artificial-executivos";
};

export const cursos: Curso[] = [
  {
    slug: "governanca-inteligencia-artificial-executivos",
    badge: "Curso de Extensão",
    titulo: "Governança em Inteligência Artificial para Executivos",
    complemento: "e Gestores",
    frase:
      "Prepare-se para liderar a adoção segura, ética e estratégica da Inteligência Artificial.",
    quickFacts: [
      { value: "20h", label: "Carga horária" },
      { value: "EAD", label: "Modalidade" },
      { value: "Universidade Anhanguera", label: "Certificação" },
      { value: "MEC", label: "Reconhecido pelo MEC" },
    ],
    descricao: [
      "Formação executiva voltada à compreensão e aplicação dos fundamentos da Governança de Inteligência Artificial, contemplando estratégia, gestão de riscos, compliance, ética, segurança da informação, dados e avaliação da maturidade organizacional.",
      "O curso apresenta o Framework IGOV.IA como instrumento para diagnóstico, avaliação da maturidade e construção de roadmaps para evolução da Governança de IA.",
    ],
    to: "/cursos/governanca-inteligencia-artificial-executivos",
  },
];

export const modulos = [
  {
    n: "01",
    titulo: "Fundamentos da Inteligência Artificial",
    topicos: [
      "A Evolução da Inteligência Artificial",
      "Inteligência Artificial nas Organizações",
      "Os Riscos da Adoção sem Governança",
      "Introdução ao Framework IGOV.IA",
    ],
  },
  {
    n: "02",
    titulo: "Dimensão 1 — Estratégia e Governança",
    topicos: [
      "Estratégia Corporativa para IA",
      "Planejamento Estratégico e IA",
      "Comitês e Estruturas de Governança",
      "Políticas e Diretrizes Organizacionais",
    ],
  },
  {
    n: "03",
    titulo: "Dimensão 2 — Cultura, Pessoas e Comunicação",
    topicos: ["AI Literacy", "Gestão da Mudança", "Capacitação e Desenvolvimento", "Comunicação e Engajamento"],
  },
  {
    n: "04",
    titulo: "Dimensão 3 — Estrutura Tecnológica e Automação",
    topicos: ["Arquitetura Tecnológica", "Infraestrutura para IA", "Automação Inteligente", "Integração de Sistemas"],
  },
  {
    n: "05",
    titulo: "Dimensão 4 — Investimentos, Custos e Despesas",
    topicos: ["Business Case para IA", "ROI e Indicadores Financeiros", "Custos de Implantação", "Sustentabilidade Econômica"],
  },
  {
    n: "06",
    titulo: "Dimensão 5 — Qualidade de Dados",
    topicos: ["Governança de Dados", "Qualidade e Integridade", "Dados para IA", "Monitoramento e Gestão de Dados"],
  },
  {
    n: "07",
    titulo: "Dimensão 6 — Impacto no Usuário Final",
    topicos: ["IA Centrada no Ser Humano", "Experiência do Usuário", "Transparência e Confiança", "Valor Gerado ao Cliente"],
  },
  {
    n: "08",
    titulo: "Dimensão 7 — Compliance, Riscos e Ética",
    topicos: ["Ética em Inteligência Artificial", "Gestão de Riscos", "Compliance Algorítmico", "Regulação e IA Responsável"],
  },
  {
    n: "09",
    titulo: "Dimensão 8 — Segurança da Informação",
    topicos: [
      "Fundamentos da Segurança da Informação",
      "Cibersegurança e IA",
      "Privacidade e Proteção de Dados",
      "Gestão de Incidentes",
    ],
  },
  {
    n: "10",
    titulo: "Dimensão 9 — Fornecedores e Integrações",
    topicos: [
      "Due Diligence de Fornecedores",
      "Contratação de Soluções de IA",
      "Gestão de Contratos e SLA",
      "Integração Tecnológica",
    ],
  },
  {
    n: "11",
    titulo: "Dimensão 10 — Monitoramento e Melhoria Contínua",
    topicos: ["Indicadores de Governança", "KPIs de IA", "Auditoria e Monitoramento", "Melhoria Contínua"],
  },
  {
    n: "12",
    titulo: "Roadmap de Evolução da Governança de IA",
    topicos: [
      "Avaliação da Maturidade Organizacional",
      "Priorização Estratégica",
      "Construção do Roadmap",
      "O Futuro da Governança de IA",
    ],
  },
];

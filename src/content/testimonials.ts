export type Testimonial = {
  name: string;
  role: string;
  company: string;
  photo: string;
  testimonial: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Carlos Nestor",
    role: "Líder de Desenvolvimento e Inovação",
    company: "Obras Sociais Irmã Dulce",
    photo: "/depoimentos/carlos-nestor.jpg",
    testimonial:
      "O Instituto apoia a jornada de adoção de IA garantindo segurança jurídica, alinhamento ético e conformidade regulatória para acelerar a inovação com responsabilidade.",
  },
  {
    name: "Danilo Andrade",
    role: "CEO",
    company: "Horus CDA",
    photo: "/depoimentos/danilo-andrade.jpg",
    testimonial:
      "Uma abordagem embasada na literatura especializada, em linguagem acessível e conduzida por profissionais experientes apoia a Organização no aumento gradativo e consistente na maturidade em IA, tão necessária nos tempos atuais.",
  },
  {
    name: "Jaime Gama",
    role: "Conselheiro",
    company: "Instituto Brasileiro de Governança Corporativa (IBGC)",
    photo: "/depoimentos/jaime-gama.jpg",
    testimonial:
      "O Instituto de Governança de Inteligência Artificial pode apoiar as organizações a transformar a adoção de IA em uma jornada estruturada, segura e efetivamente conectada à estratégia de negócio. Sua contribuição está em oferecer um olhar integrado sobre maturidade, dados, pessoas, cultura, riscos, ética, compliance e segurança.",
  },
];

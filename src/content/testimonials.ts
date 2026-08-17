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
];

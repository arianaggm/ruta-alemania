export type Scholarship = {
  title: string;
  organization: string;
  degreeLevel: string;
  field: string;
  language: string;
  funding: string;
  deadline: string;
  eligibility: string;
  officialLink: string;
};

export const scholarships: Scholarship[] = [
  {
    title: "DAAD EPOS Scholarship",
    organization: "DAAD",
    degreeLevel: "Maestría",
    field: "Áreas relacionadas con desarrollo",
    language: "Inglés",
    funding: "Financiamiento completo",
    deadline: "Varía por programa",
    eligibility: "Estudiantes internacionales, incluyendo postulantes de México",
    officialLink: "#",
  },
  {
    title: "DAAD Study Scholarships",
    organization: "DAAD",
    degreeLevel: "Maestría",
    field: "Todas las áreas",
    language: "Inglés / Alemán",
    funding: "Apoyo mensual",
    deadline: "Convocatoria anual",
    eligibility: "Personas graduadas de México y otros países",
    officialLink: "#",
  },
  {
    title: "Heinrich Boll Foundation Scholarship",
    organization: "Heinrich Böll Stiftung",
    degreeLevel: "Maestría / Doctorado",
    field: "Todas las áreas",
    language: "Normalmente se requiere Alemán",
    funding: "Apoyo de beca",
    deadline: "Marzo / septiembre",
    eligibility: "Estudiantes internacionales",
    officialLink: "#",
  },
  {
    title: "Deutschlandstipendium",
    organization: "Universidades alemanas",
    degreeLevel: "Licenciatura / Maestría",
    field: "Todas las áreas",
    language: "Depende del programa",
    funding: "Apoyo parcial",
    deadline: "Depende de la universidad",
    eligibility: "Estudiantes inscritos en Alemania",
    officialLink: "#",
  },
  {
    title: "Friedrich Ebert Stiftung Scholarship",
    organization: "Friedrich Ebert Stiftung",
    degreeLevel: "Licenciatura / Maestría / Doctorado",
    field: "Todas las áreas",
    language: "Normalmente se requiere Alemán",
    funding: "Apoyo de beca",
    deadline: "Varía",
    eligibility: "Estudiantes internacionales con compromiso social",
    officialLink: "#",
  },
  {
    title: "Erasmus+ Mobility",
    organization: "Unión Europea",
    degreeLevel: "Licenciatura / Maestría",
    field: "Depende del convenio universitario",
    language: "Depende del programa",
    funding: "Apoyo de movilidad",
    deadline: "Depende de la universidad de origen",
    eligibility: "Estudiantes inscritos en universidades asociadas",
    officialLink: "#",
  },
];

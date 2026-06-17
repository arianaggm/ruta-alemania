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
    degreeLevel: "Maestria",
    field: "Areas relacionadas con desarrollo",
    language: "Ingles",
    funding: "Financiamiento completo",
    deadline: "Varia por programa",
    eligibility: "Estudiantes internacionales, incluyendo postulantes de Mexico",
    officialLink: "#",
  },
  {
    title: "DAAD Study Scholarships",
    organization: "DAAD",
    degreeLevel: "Maestria",
    field: "Todas las areas",
    language: "Ingles / Aleman",
    funding: "Apoyo mensual",
    deadline: "Convocatoria anual",
    eligibility: "Personas graduadas de Mexico y otros paises",
    officialLink: "#",
  },
  {
    title: "Heinrich Boll Foundation Scholarship",
    organization: "Heinrich Boll Stiftung",
    degreeLevel: "Maestria / Doctorado",
    field: "Todas las areas",
    language: "Normalmente se requiere aleman",
    funding: "Apoyo de beca",
    deadline: "Marzo / septiembre",
    eligibility: "Estudiantes internacionales",
    officialLink: "#",
  },
  {
    title: "Deutschlandstipendium",
    organization: "Universidades alemanas",
    degreeLevel: "Licenciatura / Maestria",
    field: "Todas las areas",
    language: "Depende del programa",
    funding: "Apoyo parcial",
    deadline: "Depende de la universidad",
    eligibility: "Estudiantes inscritos en Alemania",
    officialLink: "#",
  },
  {
    title: "Friedrich Ebert Stiftung Scholarship",
    organization: "Friedrich Ebert Stiftung",
    degreeLevel: "Licenciatura / Maestria / Doctorado",
    field: "Todas las areas",
    language: "Normalmente se requiere aleman",
    funding: "Apoyo de beca",
    deadline: "Varia",
    eligibility: "Estudiantes internacionales con compromiso social",
    officialLink: "#",
  },
  {
    title: "Erasmus+ Mobility",
    organization: "Union Europea",
    degreeLevel: "Licenciatura / Maestria",
    field: "Depende del convenio universitario",
    language: "Depende del programa",
    funding: "Apoyo de movilidad",
    deadline: "Depende de la universidad de origen",
    eligibility: "Estudiantes inscritos en universidades asociadas",
    officialLink: "#",
  },
];

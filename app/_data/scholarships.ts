export type Scholarship = {
  title: string;
  organization: string;
  degreeLevel: string;
  fields: string;
  language: string;
  fundingType: string;
  eligibleForMexicans: boolean;
  germanUsuallyRequired: boolean;
  admissionRequired: boolean;
  deadline: string;
  officialUrl: string;
  notes: string;
  lastChecked: string;
};

export const scholarships: Scholarship[] = [
  {
    title: "DAAD EPOS Scholarship",
    organization: "DAAD",
    degreeLevel: "Maestría",
    fields: "Áreas relacionadas con desarrollo",
    language: "Inglés",
    fundingType: "Financiamiento completo",
    eligibleForMexicans: true,
    germanUsuallyRequired: false,
    admissionRequired: true,
    deadline: "Varía por programa",
    officialUrl:
      "https://www2.daad.de/deutschland/stipendium/datenbank/en/21148-scholarship-database/",
    notes:
      "Conviene revisar cada maestría EPOS por separado porque requisitos, fechas y documentos cambian según el programa.",
    lastChecked: "2026-06-17",
  },
  {
    title: "DAAD Study Scholarships",
    organization: "DAAD",
    degreeLevel: "Maestría",
    fields: "Todas las áreas",
    language: "Inglés / Alemán",
    fundingType: "Apoyo mensual",
    eligibleForMexicans: true,
    germanUsuallyRequired: false,
    admissionRequired: true,
    deadline: "Convocatoria anual",
    officialUrl: "https://www.daad.de/en/studying-in-germany/scholarships/daad-scholarships/",
    notes:
      "La elegibilidad exacta depende de la convocatoria vigente y del tipo de programa al que quieras aplicar.",
    lastChecked: "2026-06-17",
  },
  {
    title: "Heinrich Böll Foundation Scholarship",
    organization: "Heinrich Böll Stiftung",
    degreeLevel: "Maestría / Doctorado",
    fields: "Todas las áreas",
    language: "Alemán",
    fundingType: "Apoyo de beca",
    eligibleForMexicans: true,
    germanUsuallyRequired: true,
    admissionRequired: true,
    deadline: "Marzo / septiembre",
    officialUrl: "https://www.boell.de/en/scholarships",
    notes:
      "Suele valorar compromiso social y, en muchas convocatorias, es importante revisar el nivel de alemán solicitado.",
    lastChecked: "2026-06-17",
  },
  {
    title: "Deutschlandstipendium",
    organization: "Universidades alemanas",
    degreeLevel: "Licenciatura / Maestría",
    fields: "Todas las áreas",
    language: "Depende del programa",
    fundingType: "Apoyo parcial",
    eligibleForMexicans: true,
    germanUsuallyRequired: false,
    admissionRequired: true,
    deadline: "Depende de la universidad",
    officialUrl:
      "https://www.deutschlandstipendium.de/deutschlandstipendium/de/services/english/english.html",
    notes:
      "Normalmente se solicita cuando ya estás inscrita o inscrito, o en proceso de inscripción, en una universidad participante en Alemania.",
    lastChecked: "2026-06-17",
  },
  {
    title: "Friedrich Ebert Stiftung Scholarship",
    organization: "Friedrich-Ebert-Stiftung",
    degreeLevel: "Licenciatura / Maestría / Doctorado",
    fields: "Todas las áreas",
    language: "Alemán",
    fundingType: "Apoyo de beca",
    eligibleForMexicans: true,
    germanUsuallyRequired: true,
    admissionRequired: true,
    deadline: "Varía",
    officialUrl: "https://www.fes.de/studienfoerderung",
    notes:
      "Además del perfil académico, suele importar el compromiso social y la afinidad con los valores de la fundación.",
    lastChecked: "2026-06-17",
  },
  {
    title: "Erasmus+ Mobility",
    organization: "Unión Europea",
    degreeLevel: "Licenciatura / Maestría",
    fields: "Depende del convenio universitario",
    language: "Depende del programa",
    fundingType: "Apoyo de movilidad",
    eligibleForMexicans: false,
    germanUsuallyRequired: false,
    admissionRequired: true,
    deadline: "Depende de la universidad de origen",
    officialUrl:
      "https://erasmus-plus.ec.europa.eu/opportunities/individuals/students/studying-abroad",
    notes:
      "Suele depender de estar ya inscrita o inscrito en una universidad con convenio Erasmus+ activo.",
    lastChecked: "2026-06-17",
  },
];

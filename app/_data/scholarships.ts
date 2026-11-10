type Verification =
  | { verificationStatus: "pending"; lastChecked: null }
  | { verificationStatus: "verified"; lastChecked: string };

export type Scholarship = {
  title: string;
  organization: string;
  degreeLevel: string;
  fields: string;
  language: string;
  fundingType: string;
  eligibleForMexicans: boolean | null;
  germanUsuallyRequired: boolean | null;
  admissionRequired: boolean | null;
  deadline: string;
  officialUrl: string;
  sourceUrl: string;
  notes: string;
} & Verification;

export const scholarships: Scholarship[] = [
  {
    title: "DAAD EPOS Scholarship",
    organization: "DAAD",
    degreeLevel: "Maestría",
    fields: "Áreas relacionadas con desarrollo",
    language: "Inglés",
    fundingType: "Apoyo económico (ver convocatoria)",
    eligibleForMexicans: null,
    germanUsuallyRequired: null,
    admissionRequired: null,
    deadline: "Varía por programa",
    officialUrl:
      "https://www2.daad.de/deutschland/stipendium/datenbank/en/21148-scholarship-database/?detail=50076777",
    sourceUrl:
      "https://www2.daad.de/deutschland/stipendium/datenbank/en/21148-scholarship-database/?detail=50076777",
    verificationStatus: "pending",
    notes:
      "Conviene revisar cada maestría EPOS por separado porque requisitos, fechas y documentos cambian según el programa.",
    lastChecked: null,
  },
  {
    title: "DAAD Study Scholarships",
    organization: "DAAD",
    degreeLevel: "Maestría",
    fields: "Varias áreas (según convocatoria)",
    language: "Inglés / Alemán",
    fundingType: "Apoyo mensual",
    eligibleForMexicans: null,
    germanUsuallyRequired: null,
    admissionRequired: null,
    deadline: "Consulta la convocatoria vigente",
    officialUrl:
      "https://www2.daad.de/deutschland/stipendium/datenbank/en/21148-scholarship-database/?detail=50026200",
    sourceUrl:
      "https://www2.daad.de/deutschland/stipendium/datenbank/en/21148-scholarship-database/?detail=50026200",
    verificationStatus: "pending",
    notes:
      "La elegibilidad exacta depende de la convocatoria vigente y del tipo de programa al que quieras aplicar.",
    lastChecked: null,
  },
  {
    title: "Heinrich Böll Foundation Scholarship",
    organization: "Heinrich Böll Stiftung",
    degreeLevel: "Maestría / Doctorado",
    fields: "Todas las áreas",
    language: "Alemán",
    fundingType: "Apoyo de beca",
    eligibleForMexicans: null,
    germanUsuallyRequired: null,
    admissionRequired: null,
    deadline: "Consulta la convocatoria vigente",
    officialUrl: "https://www.boell.de/en/applying-scholarship",
    sourceUrl: "https://www.boell.de/en/applying-scholarship",
    verificationStatus: "pending",
    notes:
      "Revisa la convocatoria vigente: la fundación anuncia cambios en los requisitos para maestrías a partir de 2027.",
    lastChecked: null,
  },
  {
    title: "Deutschlandstipendium",
    organization: "Universidades alemanas",
    degreeLevel: "Licenciatura / Maestría",
    fields: "Todas las áreas",
    language: "Depende del programa",
    fundingType: "Apoyo parcial",
    eligibleForMexicans: null,
    germanUsuallyRequired: null,
    admissionRequired: null,
    deadline: "Depende de la universidad",
    officialUrl:
      "https://www2.daad.de/deutschland/stipendium/datenbank/en/21148-scholarship-database/?detail=10000207",
    sourceUrl:
      "https://www2.daad.de/deutschland/stipendium/datenbank/en/21148-scholarship-database/?detail=10000207",
    verificationStatus: "pending",
    notes:
      "Normalmente se solicita cuando ya estás inscrita o inscrito, o en proceso de inscripción, en una universidad participante en Alemania.",
    lastChecked: null,
  },
  {
    title: "Friedrich Ebert Stiftung Scholarship",
    organization: "Friedrich-Ebert-Stiftung",
    degreeLevel: "Licenciatura / Maestría / Doctorado",
    fields: "Todas las áreas",
    language: "Alemán",
    fundingType: "Apoyo de beca",
    eligibleForMexicans: null,
    germanUsuallyRequired: null,
    admissionRequired: null,
    deadline: "Varía",
    officialUrl: "https://www.fes.de/studienfoerderung/information-in-english",
    sourceUrl: "https://www.fes.de/studienfoerderung/information-in-english",
    verificationStatus: "pending",
    notes:
      "Consulta las condiciones de residencia, inscripción y alemán antes de preparar la solicitud.",
    lastChecked: null,
  },
  {
    title: "Erasmus+ Mobility",
    organization: "Unión Europea",
    degreeLevel: "Licenciatura / Maestría",
    fields: "Depende del convenio universitario",
    language: "Depende del programa",
    fundingType: "Apoyo de movilidad",
    eligibleForMexicans: null,
    germanUsuallyRequired: null,
    admissionRequired: null,
    deadline: "Depende de la universidad de origen",
    officialUrl:
      "https://erasmus-plus.ec.europa.eu/opportunities/individuals/students/studying-abroad",
    sourceUrl:
      "https://erasmus-plus.ec.europa.eu/opportunities/individuals/students/studying-abroad",
    verificationStatus: "pending",
    notes:
      "Suele depender de estar ya inscrita o inscrito en una universidad con convenio Erasmus+ activo.",
    lastChecked: null,
  },
];

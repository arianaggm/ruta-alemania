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
  {
    title: "Erasmus Mundus Joint Masters",
    organization: "Unión Europea (Erasmus+)",
    degreeLevel: "Maestría",
    fields: "Depende del programa",
    language: "Depende del programa",
    fundingType: "Beca completa disponible según el programa",
    eligibleForMexicans: null,
    germanUsuallyRequired: null,
    admissionRequired: null,
    deadline: "Depende de cada maestría",
    officialUrl: "https://erasmus-plus.ec.europa.eu/opportunities/individuals/students/erasmus-mundus-joint-masters",
    sourceUrl: "https://erasmus-plus.ec.europa.eu/opportunities/individuals/students/erasmus-mundus-joint-masters",
    verificationStatus: "pending",
    notes: "Es distinto de Erasmus+ Mobility: solicitas la maestría directamente al consorcio que la imparte. Revisa allí si ofrece beca, sus requisitos y si la convocatoria está abierta.",
    lastChecked: null,
  },
  {
    title: "Konrad-Adenauer-Stiftung International Talent Development",
    organization: "Konrad-Adenauer-Stiftung",
    degreeLevel: "Licenciatura / Maestría / Doctorado",
    fields: "Varias áreas; consulta las excepciones",
    language: "Alemán B2 mínimo",
    fundingType: "Apoyo económico y acompañamiento",
    eligibleForMexicans: null,
    germanUsuallyRequired: true,
    admissionRequired: null,
    deadline: "Consulta la convocatoria y la ruta de solicitud",
    officialUrl: "https://www.kas.de/en/web/begabtenfoerderung-und-kultur/international-talent-development",
    sourceUrl: "https://www.kas.de/en/web/begabtenfoerderung-und-kultur/international-talent-development",
    verificationStatus: "pending",
    notes: "Pide alemán B2 incluso si el programa se imparte en inglés. Para licenciatura exige haber cursado al menos dos semestres en una universidad alemana; para maestría, un programa de cuatro semestres. La solicitud desde el extranjero depende de las oficinas participantes; no se confirma una convocatoria abierta para México.",
    lastChecked: null,
  },
  {
    title: "Friedrich-Naumann-Stiftung — Becas para estudiantes de países fuera de la UE",
    organization: "Friedrich-Naumann-Stiftung",
    degreeLevel: "Maestría",
    fields: "Depende del programa",
    language: "Consulta los requisitos de idioma",
    fundingType: "Beca de estudios",
    eligibleForMexicans: null,
    germanUsuallyRequired: null,
    admissionRequired: null,
    deadline: "Consulta la convocatoria vigente",
    officialUrl: "https://www.freiheit.org/scholarships-foreign-students-non-eu-countries-1",
    sourceUrl: "https://www.freiheit.org/scholarships-foreign-students-non-eu-countries-1",
    verificationStatus: "pending",
    notes: "Esta modalidad se dirige a estudios completos de maestría en una universidad alemana y exige que queden al menos dos semestres por cursar. No financia licenciaturas. La página general no confirma una convocatoria abierta ni requisitos específicos para México.",
    lastChecked: null,
  },
  {
    title: "Rosa-Luxemburg-Stiftung — Beca internacional de estudios",
    organization: "Rosa-Luxemburg-Stiftung",
    degreeLevel: "Estudios posteriores a licenciatura; confirmar modalidad",
    fields: "Varias áreas",
    language: "Alemán B2",
    fundingType: "Beca de estudios",
    eligibleForMexicans: null,
    germanUsuallyRequired: true,
    admissionRequired: null,
    deadline: "Consulta la convocatoria vigente",
    officialUrl: "https://www.rosalux.de/en/foundation/studienwerk/scholarships/study-scholarship",
    sourceUrl: "https://www.rosalux.de/en/foundation/studienwerk/scholarships/study-scholarship",
    verificationStatus: "pending",
    notes: "La modalidad internacional pide un título de licenciatura, alemán B2 y estar inscrita o inscrito, o contar con admisión, en una universidad alemana. Su página presenta condiciones por modalidad que requieren revisión editorial antes de afirmar qué maestrías admite; no confirma una convocatoria abierta.",
    lastChecked: null,
  },
  {
    title: "Hanns-Seidel-Stiftung — Becas para estudiantes internacionales",
    organization: "Hanns-Seidel-Stiftung",
    degreeLevel: "Licenciatura / Maestría / Doctorado",
    fields: "Depende de la modalidad",
    language: "Alemán B2 para estudios; revisar doctorado",
    fundingType: "Beca de estudios o doctorado",
    eligibleForMexicans: null,
    germanUsuallyRequired: true,
    admissionRequired: null,
    deadline: "Depende de la modalidad y convocatoria",
    officialUrl: "https://www.hss.de/stipendium/bewerbung/",
    sourceUrl: "https://www.hss.de/stipendium/bewerbung/",
    verificationStatus: "pending",
    notes: "Para la modalidad internacional de estudios se pide alemán B2 y cursar estudios de tiempo completo en una universidad alemana reconocida. Doctorado tiene requisitos distintos. Revisa la convocatoria concreta: la página reúne varias modalidades y fechas, no una única apertura general.",
    lastChecked: null,
  },
  {
    title: "KAAD — Programas de becas",
    organization: "KAAD",
    degreeLevel: "Maestría / Doctorado",
    fields: "Depende del programa",
    language: "Alemán según el programa",
    fundingType: "Beca de estudios o investigación",
    eligibleForMexicans: null,
    germanUsuallyRequired: true,
    admissionRequired: null,
    deadline: "Consulta cada programa y su convocatoria",
    officialUrl: "https://www.kaad.de/en/stipendien/",
    sourceUrl: "https://www.kaad.de/en/stipendien/",
    verificationStatus: "pending",
    notes: "Programa 1: para personas que residen fuera de Alemania, con título y experiencia profesional; pide alemán previo y trabaja con países socios. Programa 2: para quienes ya estudian en Alemania; se solicita mediante la comunidad universitaria católica, no directamente a KAAD. Ambos tienen condiciones de idioma y vinculación religiosa o diálogo interreligioso. La página general no confirma una convocatoria abierta para México.",
    lastChecked: null,
  },
];

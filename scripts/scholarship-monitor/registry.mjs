// Editorial monitoring targets. Public scholarship claims remain in app/_data/scholarships.ts.
const targets = [
  {
    id: "daad-epos",
    title: "DAAD EPOS Scholarship",
    sourceUrl: "https://www2.daad.de/deutschland/stipendium/datenbank/en/21148-scholarship-database/?detail=50076777",
    expectedText: "Development-Related Postgraduate Courses",
    scope: "Convocatoria general; fechas por programa fuera de esta página.",
  },
  {
    id: "daad-study-scholarships",
    title: "DAAD Study Scholarships",
    sourceUrl: "https://www2.daad.de/deutschland/stipendium/datenbank/en/21148-scholarship-database/?detail=50026200",
    expectedText: "Study Scholarships",
    scope: "Convocatoria general; confirmar condiciones aplicables al país y programa.",
  },
  {
    id: "heinrich-boell",
    title: "Heinrich Böll Foundation Scholarship",
    sourceUrl: "https://www.boell.de/en/applying-scholarship",
    expectedText: "Applying for a scholarship",
    scope: "Página general; confirmar ruta, nivel y convocatoria individual.",
  },
  {
    id: "deutschlandstipendium",
    title: "Deutschlandstipendium",
    sourceUrl: "https://www2.daad.de/deutschland/stipendium/datenbank/en/21148-scholarship-database/?detail=10000207",
    expectedText: "Deutschlandstipendium",
    scope: "Página general; plazos y solicitud dependen de cada universidad.",
  },
  {
    id: "friedrich-ebert",
    title: "Friedrich Ebert Stiftung Scholarship",
    sourceUrl: "https://www.fes.de/studienfoerderung/information-in-english",
    expectedText: "Scholarship",
    scope: "Información general; confirmar requisitos y plazos de la convocatoria vigente.",
  },
  {
    id: "erasmus-mobility",
    title: "Erasmus+ Mobility",
    sourceUrl: "https://erasmus-plus.ec.europa.eu/opportunities/individuals/students/studying-abroad",
    expectedText: "Studying abroad",
    scope: "Página general; convenios, importes y plazos dependen de las instituciones.",
  },
  {
    id: "erasmus-mundus-joint-masters",
    title: "Erasmus Mundus Joint Masters",
    sourceUrl: "https://erasmus-plus.ec.europa.eu/opportunities/individuals/students/erasmus-mundus-joint-masters",
    expectedText: "Erasmus Mundus Joint Masters",
    scope: "Página general; cada consorcio confirma becas, requisitos, fechas y apertura de su maestría.",
  },
  {
    id: "konrad-adenauer-international",
    title: "Konrad-Adenauer-Stiftung International Talent Development",
    sourceUrl: "https://www.kas.de/en/web/begabtenfoerderung-und-kultur/international-talent-development",
    expectedText: "International Talent Development",
    scope: "Página general; la ruta desde el extranjero y las oficinas participantes pueden variar.",
  },
  {
    id: "friedrich-naumann-non-eu",
    title: "Friedrich-Naumann-Stiftung — Becas para estudiantes de países fuera de la UE",
    sourceUrl: "https://www.freiheit.org/scholarships-foreign-students-non-eu-countries-1",
    expectedText: "Scholarships for foreign students from non-EU countries",
    scope: "Página general de becas para estudiantes fuera de la UE; no confirma apertura ni fechas de solicitud.",
  },
  {
    id: "rosa-luxemburg-international",
    title: "Rosa-Luxemburg-Stiftung — Beca internacional de estudios",
    sourceUrl: "https://www.rosalux.de/en/foundation/studienwerk/scholarships/study-scholarship",
    expectedText: "Study scholarship",
    scope: "Página con varias modalidades y condiciones; revisar manualmente la modalidad internacional.",
  },
  {
    id: "hanns-seidel-international",
    title: "Hanns-Seidel-Stiftung — Becas para estudiantes internacionales",
    sourceUrl: "https://www.hss.de/stipendium/bewerbung/",
    expectedText: "Bewerbung",
    scope: "Página de solicitudes de varias modalidades; una fecha publicada no aplica necesariamente a todas.",
  },
  {
    id: "kaad-programmes",
    title: "KAAD — Programas de becas",
    sourceUrl: "https://www.kaad.de/en/stipendien/",
    expectedText: "Information on Scholarship Programmes",
    scope: "Resumen de programas 1 y 2; sus requisitos y plazos se consultan por separado.",
  },
];

// These fields describe the public catalog; successful fetching does not change them.
export const registry = targets.map((target) => ({
  ...target,
  catalogVerificationStatus: "pending",
  catalogLastChecked: null,
  monitoredFields: ["deadline", "eligibility", "amounts", "requirements", "applicationLink", "applicationLinks"],
}));

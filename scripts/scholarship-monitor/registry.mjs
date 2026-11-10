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
];

// These fields describe the public catalog; successful fetching does not change them.
export const registry = targets.map((target) => ({
  ...target,
  catalogVerificationStatus: "pending",
  catalogLastChecked: null,
  monitoredFields: ["deadline", "eligibility", "amounts", "requirements", "applicationLink", "applicationLinks"],
}));

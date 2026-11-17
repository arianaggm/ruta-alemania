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
    degreeLevel: "Maestría / Doctorado excepcional (según el curso)",
    fields: "Áreas relacionadas con desarrollo",
    language: "Inglés / Alemán (según el curso)",
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
      "Cada curso define el nivel, idioma y plazo. Los cursos en alemán piden al menos B1 al solicitar la beca; EPOS también exige experiencia profesional relevante. Confirma el curso y la lista de países elegibles en DAAD.",
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
      "El portal de DAAD solo permite solicitar durante el periodo correspondiente. Consulta el plazo y los requisitos aplicables a tu país; la admisión a la universidad se tramita por separado.",
    lastChecked: null,
  },
  {
    title: "Heinrich Böll Foundation Scholarship",
    organization: "Heinrich Böll Stiftung",
    degreeLevel: "Maestría / Doctorado",
    fields: "Todas las áreas",
    language: "Alemán B2 o DSH 1 (maestría)",
    fundingType: "Apoyo de beca",
    eligibleForMexicans: null,
    germanUsuallyRequired: null,
    admissionRequired: null,
    deadline: "Consulta la convocatoria vigente",
    officialUrl: "https://www.boell.de/en/applying-scholarship",
    sourceUrl: "https://www.boell.de/en/applying-scholarship",
    verificationStatus: "pending",
    notes:
      "Para la modalidad internacional de maestría se pide alemán B2 o DSH 1. La fundación anuncia un cambio desde marzo de 2027, pero sus páginas no aclaran de forma consistente qué maestrías afectará; confirma tu modalidad antes de postularte.",
    lastChecked: null,
  },
  {
    title: "Deutschlandstipendium",
    organization: "Gobierno federal y donantes privados",
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
      "Las universidades participantes gestionan la selección y fijan sus propias convocatorias. El apoyo se financia por mitad con fondos federales y por mitad con donaciones privadas; puedes solicitarlo si cumples los requisitos de admisión y ya estudias o estás por iniciar allí.",
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
    germanUsuallyRequired: true,
    admissionRequired: null,
    deadline: "Varía",
    officialUrl: "https://www.fes.de/studienfoerderung/information-in-english",
    sourceUrl: "https://www.fes.de/studienfoerderung/information-in-english",
    verificationStatus: "pending",
    notes:
      "Para solicitantes extranjeros de esta modalidad, la fundación exige vivir y estudiar ya en Alemania, acreditar buen nivel de alemán y presentar la solicitud en alemán. Revisa los plazos de tu programa.",
    lastChecked: null,
  },
  {
    title: "Erasmus+ Mobility",
    organization: "Unión Europea",
    degreeLevel: "Ciclo corto / Licenciatura / Maestría / Doctorado",
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
      "Financia movilidad temporal durante tus estudios, no una carrera completa. Debes estudiar en una institución participante; consulta convenios, selección y plazos con la oficina internacional de tu universidad.",
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
    notes: "A diferencia de Erasmus+ Mobility, aquí solicitas una maestría conjunta al consorcio. No todos los programas incluyen Alemania ni ofrecen beca en cada edición; confirma sedes, apoyo y plazos con el consorcio.",
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
    notes: "Pide alemán B2 incluso para estudios en inglés. Desde Alemania se solicita por la selección nacional; desde el extranjero, solo mediante oficinas participantes. Para licenciatura pide dos semestres cursados en una universidad alemana y para maestría, un programa de cuatro semestres. No hay ruta para México confirmada.",
    lastChecked: null,
  },
  {
    title: "Friedrich-Naumann-Stiftung — Becas para estudiantes de países fuera de la UE",
    organization: "Friedrich-Naumann-Stiftung",
    degreeLevel: "Maestría / etapa principal de examen estatal",
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
    notes: "Apoya estudios completos de maestría o la etapa principal de un examen estatal en Alemania, con al menos dos semestres por cursar. No financia licenciaturas. La página no confirma una convocatoria abierta ni los requisitos específicos para México.",
    lastChecked: null,
  },
  {
    title: "Rosa-Luxemburg-Stiftung — Beca internacional de estudios",
    organization: "Rosa-Luxemburg-Stiftung",
    degreeLevel: "Maestría (modalidad por confirmar)",
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
    notes: "La modalidad internacional pide licenciatura terminada, alemán B2 y admisión o inscripción en una universidad alemana. Las páginas oficiales en alemán e inglés discrepan sobre una exclusión; no concluyas que todas las maestrías quedan fuera sin confirmar tu caso con la fundación.",
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
    notes: "Para estudios internacionales se pide alemán B2 y estudiar de tiempo completo en una universidad reconocida; doctorado tiene otras condiciones. La fundación publica ventanas por modalidad: comprueba en el portal si la tuya acepta solicitudes antes de aplicar.",
    lastChecked: null,
  },
  {
    title: "KAAD — Programas de becas",
    organization: "KAAD",
    degreeLevel: "Maestría / Doctorado",
    fields: "Depende del programa",
    language: "Alemán B1 o A2 (programa 1); conversacional (programa 2)",
    fundingType: "Beca de estudios o investigación",
    eligibleForMexicans: null,
    germanUsuallyRequired: true,
    admissionRequired: null,
    deadline: "Consulta cada programa y su convocatoria",
    officialUrl: "https://www.kaad.de/en/stipendien/",
    sourceUrl: "https://www.kaad.de/en/stipendien/",
    verificationStatus: "pending",
    notes: "Programa 1: para quienes viven en su país, con título y experiencia; pide alemán B1, o A2 para estudios en inglés, y se tramita con socios regionales. Programa 2: para quienes ya estudian en Alemania; pide alemán conversacional y se solicita por la comunidad católica universitaria (KHG/KSG), no directamente a KAAD. Revisa las condiciones religiosas y si existe una ruta para México.",
    lastChecked: null,
  },
];

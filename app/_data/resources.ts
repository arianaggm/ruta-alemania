export type Resource = {
  title: string;
  category: "Programas" | "Aplicaciones" | "Becas" | "Información oficial";
  description: string;
  whenToUseIt: string;
  url: string;
};

export const resources: Resource[] = [
  {
    title: "DAAD International Programmes",
    category: "Programas",
    description:
      "Buscador de programas internacionales en Alemania, especialmente útil para maestrías y opciones impartidas en inglés.",
    whenToUseIt:
      "Úsalo cuando quieras comparar programas según área, idioma y nivel de estudios.",
    url: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/",
  },
  {
    title: "Hochschulkompass",
    category: "Programas",
    description:
      "Directorio oficial de programas universitarios en Alemania con filtros por tipo de carrera, grado y universidad.",
    whenToUseIt:
      "Úsalo cuando quieras revisar una base amplia de programas universitarios por nivel e institución.",
    url: "https://www.hochschulkompass.de/en/degree-programmes.html",
  },
  {
    title: "DAAD Degree Programmes in Germany",
    category: "Programas",
    description:
      "Base de datos del DAAD para explorar carreras y programas ofrecidos por universidades alemanas.",
    whenToUseIt:
      "Úsalo cuando quieras una segunda referencia oficial para confirmar opciones académicas.",
    url: "https://www.daad.de/en/studying-in-germany/universities/all-degree-programmes/",
  },
  {
    title: "Study in Germany",
    category: "Programas",
    description:
      "Portal general para conocer el sistema universitario alemán, requisitos básicos y opciones de estudio.",
    whenToUseIt:
      "Úsalo cuando todavía estés entendiendo cómo funciona estudiar en Alemania y por dónde empezar.",
    url: "https://www.study-in-germany.com/en/",
  },
  {
    title: "Uni-Assist",
    category: "Aplicaciones",
    description:
      "Servicio que gestiona solicitudes de admisión para muchas universidades alemanas y revisa documentos académicos.",
    whenToUseIt:
      "Úsalo cuando una universidad indique que debes presentar tu solicitud a través de Uni-Assist.",
    url: "https://www.uni-assist.de/en/",
  },
  {
    title: "My Assist",
    category: "Aplicaciones",
    description:
      "Portal para crear una cuenta, subir documentos y dar seguimiento a solicitudes en Uni-Assist.",
    whenToUseIt:
      "Úsalo cuando ya estés lista o listo para iniciar o revisar una solicitud en Uni-Assist.",
    url: "https://my.uni-assist.de/",
  },
  {
    title: "DAAD Scholarship Database",
    category: "Becas",
    description:
      "Buscador oficial del DAAD para explorar becas según perfil, área, nivel y país de origen.",
    whenToUseIt:
      "Úsalo cuando quieras encontrar convocatorias y revisar sus requisitos en la fuente oficial.",
    url: "https://www.daad.de/stipdb-redirect/",
  },
  {
    title: "Embajada de Alemania en México",
    category: "Información oficial",
    description:
      "Sitio oficial con información consular, visas, citas y avisos relevantes para personas en México.",
    whenToUseIt:
      "Úsalo cuando necesites confirmar requisitos de visa, procesos consulares o trámites oficiales.",
    url: "https://mexiko.diplo.de/mx-es",
  },
  {
    title: "Federal Foreign Office",
    category: "Información oficial",
    description:
      "Fuente oficial del gobierno alemán para política exterior, visas y lineamientos generales.",
    whenToUseIt:
      "Úsalo cuando quieras contrastar información oficial sobre entrada, residencia o trámites internacionales.",
    url: "https://www.auswaertiges-amt.de/en",
  },
  {
    title: "Make it in Germany",
    category: "Información oficial",
    description:
      "Portal oficial con orientación sobre vida en Alemania, trabajo, mudanza, visas y adaptación inicial.",
    whenToUseIt:
      "Úsalo cuando estés planeando tu llegada y quieras entender mejor cómo instalarte en Alemania.",
    url: "https://www.make-it-in-germany.com/en/",
  },
];

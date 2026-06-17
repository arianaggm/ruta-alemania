export type Resource = {
  title: string;
  category: "Programas" | "Aplicaciones" | "Becas" | "Informacion oficial";
  description: string;
  whenToUseIt: string;
  url: string;
};

export const resources: Resource[] = [
  {
    title: "DAAD International Programmes",
    category: "Programas",
    description:
      "Buscador de programas internacionales en Alemania, especialmente util para maestrias y opciones impartidas en ingles.",
    whenToUseIt:
      "Usalo cuando quieras comparar programas segun area, idioma y nivel de estudios.",
    url: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/",
  },
  {
    title: "Hochschulkompass",
    category: "Programas",
    description:
      "Directorio oficial de programas universitarios en Alemania con filtros por tipo de carrera, grado y universidad.",
    whenToUseIt:
      "Usalo cuando quieras revisar una base amplia de licenciaturas, maestrias y doctorados.",
    url: "https://www.hochschulkompass.de/en/degree-programmes.html",
  },
  {
    title: "DAAD Degree Programmes in Germany",
    category: "Programas",
    description:
      "Base de datos del DAAD para explorar carreras y programas ofrecidos por universidades alemanas.",
    whenToUseIt:
      "Usalo cuando quieras una segunda referencia oficial para confirmar opciones academicas.",
    url: "https://www.daad.de/en/studying-in-germany/universities/all-degree-programmes/",
  },
  {
    title: "Study in Germany",
    category: "Programas",
    description:
      "Portal general para conocer el sistema universitario aleman, requisitos basicos y panorama de estudios.",
    whenToUseIt:
      "Usalo cuando todavia estes entendiendo como funciona estudiar en Alemania y por donde empezar.",
    url: "https://www.study-in-germany.com/en/",
  },
  {
    title: "Uni-Assist",
    category: "Aplicaciones",
    description:
      "Servicio que procesa aplicaciones para muchas universidades alemanas y verifica documentos academicos.",
    whenToUseIt:
      "Usalo cuando una universidad indique que debes aplicar a traves de Uni-Assist.",
    url: "https://www.uni-assist.de/en/",
  },
  {
    title: "My Assist",
    category: "Aplicaciones",
    description:
      "Portal de acceso para crear cuenta, subir documentos y dar seguimiento a aplicaciones en Uni-Assist.",
    whenToUseIt:
      "Usalo cuando ya estes lista o listo para iniciar o revisar una aplicacion en Uni-Assist.",
    url: "https://my.uni-assist.de/",
  },
  {
    title: "DAAD Scholarship Database",
    category: "Becas",
    description:
      "Buscador oficial del DAAD para explorar becas segun perfil, area, nivel y pais de origen.",
    whenToUseIt:
      "Usalo cuando quieras detectar becas activas y revisar elegibilidad de manera centralizada.",
    url: "https://www.daad.de/stipdb-redirect/",
  },
  {
    title: "Embajada de Alemania en México",
    category: "Informacion oficial",
    description:
      "Sitio oficial con informacion consular, visas, citas y avisos relevantes para personas en Mexico.",
    whenToUseIt:
      "Usalo cuando necesites confirmar requisitos de visa, procesos consulares o tramites oficiales.",
    url: "https://mexiko.diplo.de/mx-es",
  },
  {
    title: "Federal Foreign Office",
    category: "Informacion oficial",
    description:
      "Fuente oficial del gobierno aleman para politica exterior, visas y lineamientos generales.",
    whenToUseIt:
      "Usalo cuando quieras contrastar informacion oficial sobre entrada, residencia o tramites internacionales.",
    url: "https://www.auswaertiges-amt.de/en",
  },
  {
    title: "Make it in Germany",
    category: "Informacion oficial",
    description:
      "Portal oficial con orientacion sobre vida en Alemania, trabajo, mudanza, visas y adaptacion inicial.",
    whenToUseIt:
      "Usalo cuando estes planeando tu llegada y quieras entender mejor la instalacion en Alemania.",
    url: "https://www.make-it-in-germany.com/en/",
  },
];

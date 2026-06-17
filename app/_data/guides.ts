export type GuideSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Guide = {
  slug: string;
  title: string;
  category: string;
  readingTime: string;
  excerpt: string;
  tags: string[];
  intro: string;
  keyTakeaways: string[];
  checklistItems?: string[];
  sections: GuideSection[];
};

export const guides: Guide[] = [
  {
    slug: "como-buscar-maestrias-en-alemania",
    title: "Como buscar maestrias en Alemania",
    category: "Aplicacion",
    readingTime: "8 min",
    excerpt:
      "Aprende donde buscar programas, como filtrar por idioma, costos, ciudad y requisitos academicos.",
    tags: ["maestria", "busqueda", "programas"],
    intro:
      "Buscar una maestria en Alemania puede sentirse abrumador al principio, sobre todo si estas comparando programas desde Mexico. La clave es tener un metodo simple para revisar idioma, plan de estudios, requisitos y costos sin perderte entre decenas de portales.",
    keyTakeaways: [
      "Empieza por definir el tipo de programa y el idioma que realmente puedes cursar.",
      "Compara requisitos academicos, fechas y ciudad antes de enamorarte de una opcion.",
      "Lleva una tabla o documento para guardar enlaces y notas importantes.",
    ],
    checklistItems: [
      "Definir area y tipo de maestria",
      "Filtrar por idioma de instruccion",
      "Comparar requisitos y fechas limite",
      "Guardar enlaces y notas en un solo documento",
    ],
    sections: [
      {
        title: "Empieza con filtros claros",
        paragraphs: [
          "Antes de abrir portales, define si buscas programas en ingles, en aleman o ambos. Tambien conviene decidir si tu prioridad es el area academica, la ciudad, el costo de vida o la posibilidad de conseguir beca.",
          "Tener estos criterios desde el inicio te ayuda a descartar opciones que no encajan contigo y evita que gastes tiempo revisando programas imposibles por idioma o presupuesto.",
        ],
      },
      {
        title: "Donde buscar programas",
        paragraphs: [
          "Puedes empezar con el buscador del DAAD, las paginas oficiales de universidades y agregadores academicos de posgrados. Lo importante es confirmar siempre la informacion en la web oficial del programa.",
        ],
        bullets: [
          "Revisa la duracion total del programa",
          "Confirma si cobra colegiatura o solo cuota semestral",
          "Verifica si el programa acepta estudiantes internacionales",
          "Anota la fecha exacta de cierre",
        ],
      },
      {
        title: "Que comparar antes de aplicar",
        paragraphs: [
          "No basta con que un programa suene interesante. Revisa si pide promedio minimo, experiencia profesional, certificados de idioma, portafolio o cartas de recomendacion.",
          "Tambien conviene comparar la ciudad y el costo de vida. Una opcion academica excelente puede requerir un presupuesto mensual mucho mas alto que otra similar.",
        ],
      },
    ],
  },
  {
    slug: "documentos-que-necesitas-desde-mexico",
    title: "Documentos que necesitas desde Mexico",
    category: "Documentos",
    readingTime: "7 min",
    excerpt:
      "Lista inicial de documentos que suelen pedir universidades alemanas, incluyendo certificados, traducciones y apostillas.",
    tags: ["documentos", "apostilla", "traduccion"],
    intro:
      "Una parte importante del proceso consiste en reunir documentos con tiempo. Muchas personas se atrasan porque subestiman lo que toma pedir certificados, traducir papeles o resolver apostillas.",
    keyTakeaways: [
      "Haz una lista maestra de documentos base y otra por universidad.",
      "No todos los papeles requieren traduccion o apostilla, pero debes verificarlo.",
      "Empieza por los documentos que dependen de terceros, como escuelas o traductores.",
    ],
    checklistItems: [
      "Pedir certificados y kardex",
      "Confirmar si necesitas apostilla",
      "Revisar si la universidad pide traduccion oficial",
      "Guardar versiones digitales ordenadas",
    ],
    sections: [
      {
        title: "Documentos base que suelen repetirse",
        paragraphs: [
          "Entre los documentos mas comunes estan pasaporte, certificado de estudios, kardex o historial academico, titulo o constancia de terminacion, CV y carta de motivacion. Algunas universidades tambien piden cartas de recomendacion o prueba de idioma.",
        ],
      },
      {
        title: "Traducciones y apostillas",
        paragraphs: [
          "No todas las universidades piden exactamente lo mismo. Algunas aceptan documentos en espanol e ingles, mientras otras exigen traduccion oficial al ingles o al aleman.",
          "La apostilla tampoco aplica siempre. Por eso conviene revisar cada convocatoria y, si hay duda, escribir directamente a admisiones.",
        ],
        bullets: [
          "Confirma el idioma aceptado para cada documento",
          "Revisa si aceptan copias simples o certificadas",
          "Pregunta si la apostilla es obligatoria o recomendada",
        ],
      },
      {
        title: "Como organizar tu carpeta",
        paragraphs: [
          "Crea una carpeta digital con nombres claros para cada archivo y guarda versiones finales en PDF. Tambien ayuda llevar una hoja de control con fecha de emision, traduccion y si el documento ya fue subido a cada portal.",
        ],
      },
    ],
  },
  {
    slug: "cuanto-cuesta-estudiar-en-alemania",
    title: "Cuanto cuesta estudiar en Alemania",
    category: "Finanzas",
    readingTime: "10 min",
    excerpt:
      "Una guia practica para entender matricula, costo de vida, cuenta bloqueada, seguro medico y gastos de llegada.",
    tags: ["costos", "presupuesto", "cuenta bloqueada"],
    intro:
      "Estudiar en Alemania puede ser mas accesible que en otros destinos, pero no significa que sea barato. Entre gastos previos, prueba financiera y costo de vida, vale la pena armar un presupuesto realista desde temprano.",
    keyTakeaways: [
      "Separar costos de aplicacion, visa y llegada te da una vision mas clara.",
      "La cuota semestral y el costo de vida varian mucho segun la ciudad.",
      "La prueba de financiamiento es un paso critico que no debes dejar al final.",
    ],
    checklistItems: [
      "Investigar costo de vida por ciudad",
      "Estimar cuota semestral o colegiatura",
      "Calcular seguro medico y llegada",
      "Revisar monto actualizado de prueba financiera",
    ],
    sections: [
      {
        title: "Costos universitarios y administrativos",
        paragraphs: [
          "Muchos programas publicos no cobran colegiatura completa, pero si una cuota semestral que cubre administracion y, a veces, transporte. Tambien puede haber costos por aplicacion, traducciones, examenes de idioma y envio de documentos.",
        ],
      },
      {
        title: "Costo de vida y cuenta bloqueada",
        paragraphs: [
          "El costo mensual depende mucho de la ciudad. Renta, transporte, comida y seguro medico pueden cambiar bastante entre Berlin, Munich, Leipzig o ciudades universitarias mas pequenas.",
          "Ademas, para la visa normalmente necesitas demostrar financiamiento suficiente. Conviene revisar el monto actualizado y planearlo con tiempo.",
        ],
        bullets: [
          "Renta o alojamiento temporal",
          "Seguro medico",
          "Comida y transporte",
          "Depositos iniciales y gastos de instalacion",
        ],
      },
      {
        title: "Arma un presupuesto de llegada",
        paragraphs: [
          "No pienses solo en el mes a mes. Tambien considera vuelo, deposito de vivienda, compra de articulos basicos, tramites iniciales y un colchoncito para imprevistos.",
        ],
      },
    ],
  },
  {
    slug: "como-prepararte-para-la-visa-de-estudiante",
    title: "Como prepararte para la visa de estudiante",
    category: "Visa",
    readingTime: "9 min",
    excerpt:
      "Puntos clave para empezar a preparar tu proceso de visa desde Mexico y evitar errores comunes.",
    tags: ["visa", "consulado", "checklist"],
    intro:
      "La visa suele generar muchas dudas porque combina tiempos, citas, documentos y prueba financiera. Una buena preparacion reduce el riesgo de errores y te ayuda a llegar a la cita con mas seguridad.",
    keyTakeaways: [
      "Revisa siempre la informacion vigente del consulado aleman en Mexico.",
      "No dejes la prueba financiera ni el seguro medico para el ultimo minuto.",
      "Lleva una carpeta ordenada con originales y copias cuando corresponda.",
    ],
    checklistItems: [
      "Revisar lista oficial de requisitos",
      "Preparar prueba de financiamiento",
      "Confirmar seguro medico aceptado",
      "Organizar documentos para la cita",
    ],
    sections: [
      {
        title: "Empieza por la fuente oficial",
        paragraphs: [
          "Antes de seguir consejos sueltos, entra al sitio oficial del consulado o embajada correspondiente y revisa la lista mas reciente de requisitos, formatos y pasos.",
          "Los procesos pueden cambiar, asi que conviene verificar fechas, tiempos de espera y documentos exactos.",
        ],
      },
      {
        title: "Documentos y prueba financiera",
        paragraphs: [
          "Normalmente necesitaras carta de admision o evidencia del proceso, pasaporte, formularios, fotos, seguro medico y prueba de financiamiento. Esta ultima suele ser una de las partes mas sensibles del proceso.",
        ],
        bullets: [
          "Confirma cuantas copias te piden",
          "Revisa si la prueba financiera ya debe estar activa",
          "Verifica si el seguro es temporal o definitivo",
        ],
      },
      {
        title: "Evita errores comunes",
        paragraphs: [
          "Uno de los errores mas frecuentes es asumir que todos los casos son iguales. Otro es llegar con documentos incompletos o no revisar que los nombres y fechas coincidan entre papeles.",
        ],
      },
    ],
  },
  {
    slug: "becas-para-mexicanos-por-donde-empezar",
    title: "Becas para mexicanos: por donde empezar",
    category: "Becas",
    readingTime: "6 min",
    excerpt:
      "Como identificar becas reales, revisar elegibilidad y organizar fechas limite sin perderte.",
    tags: ["becas", "financiamiento", "fechas limite"],
    intro:
      "El mundo de las becas puede verse enorme al principio. La mejor forma de empezar es separar oportunidades por nivel, perfil y tipo de financiamiento para no dispersarte.",
    keyTakeaways: [
      "No todas las becas aplican para todas las personas ni para todas las etapas.",
      "La elegibilidad y la fecha limite importan tanto como el monto.",
      "Organizar un calendario de convocatorias te ahorra mucho estres.",
    ],
    checklistItems: [
      "Definir a que becas realmente puedes aplicar",
      "Anotar fechas de apertura y cierre",
      "Separar documentos comunes y especificos",
      "Revisar elegibilidad antes de preparar todo",
    ],
    sections: [
      {
        title: "Empieza por becas relevantes",
        paragraphs: [
          "Antes de abrir veinte convocatorias, revisa tu nivel de estudios, area academica, idioma y si ya tienes admision o apenas estas buscando programas. Eso te ayudara a priorizar becas realistas para tu caso.",
        ],
      },
      {
        title: "Que revisar en cada convocatoria",
        paragraphs: [
          "Lee con cuidado la elegibilidad, el tipo de apoyo, la duracion y si la beca cubre colegiatura, manutencion, seguro o solo una parte del proceso.",
        ],
        bullets: [
          "Fecha limite",
          "Documentos especificos",
          "Requisitos de idioma",
          "Restricciones por nacionalidad, area o experiencia",
        ],
      },
      {
        title: "Organiza tu calendario",
        paragraphs: [
          "Una hoja con nombre de la beca, enlace oficial, cierre y estado de tus documentos puede hacer una gran diferencia. Lo importante es que veas rapido que oportunidades siguen abiertas y cuales necesitan accion inmediata.",
        ],
      },
    ],
  },
  {
    slug: "primeros-pasos-al-llegar-a-alemania",
    title: "Primeros pasos al llegar a Alemania",
    category: "Llegada",
    readingTime: "8 min",
    excerpt:
      "Que hacer en tus primeras semanas: Anmeldung, seguro, banco, SIM, transporte y universidad.",
    tags: ["llegada", "tramites", "Alemania"],
    intro:
      "Llegar a Alemania implica una pequena ola de tramites durante las primeras semanas. Tener un orden base te ayuda a enfocarte en lo urgente sin sentir que todo pasa al mismo tiempo.",
    keyTakeaways: [
      "Prioriza registro de domicilio, seguro y universidad.",
      "Ten copias digitales y fisicas de tus documentos importantes.",
      "Resuelve transporte, SIM y banco temprano para moverte con menos friccion.",
    ],
    checklistItems: [
      "Agendar o completar Anmeldung",
      "Activar seguro medico",
      "Resolver movilidad y conectividad",
      "Completar registro universitario",
    ],
    sections: [
      {
        title: "Los tramites mas urgentes",
        paragraphs: [
          "En muchas ciudades, el registro de domicilio es uno de los primeros pasos importantes. Tambien conviene activar cuanto antes tu seguro medico y revisar el proceso de inscripcion final en la universidad.",
        ],
      },
      {
        title: "Banco, SIM y transporte",
        paragraphs: [
          "Aunque no todo se resuelve el mismo dia, te conviene avanzar rapido con la conectividad y el transporte para que el resto de tus tramites sea mas sencillo.",
        ],
        bullets: [
          "Comparar opciones de SIM o plan movil",
          "Revisar si necesitas cuenta bancaria de inmediato",
          "Comprar abono local o Deutschlandticket si aplica",
        ],
      },
      {
        title: "Crea una semana de aterrizaje",
        paragraphs: [
          "Haz una lista breve para tus primeros siete a diez dias y prioriza lo que desbloquea otros pasos. Eso te ayuda a no saturarte y a avanzar con mas claridad.",
        ],
      },
    ],
  },
];

export function getGuideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}

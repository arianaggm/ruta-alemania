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
    title: "Cómo buscar maestrías en Alemania",
    category: "Aplicación",
    readingTime: "8 min",
    excerpt:
      "Aprende dónde buscar programas, cómo filtrar por idioma, costos, ciudad y requisitos académicos.",
    tags: ["maestría", "búsqueda", "programas"],
    intro:
      "Buscar una maestría en Alemania puede sentirse abrumador al principio, sobre todo si estás comparando programas desde México. La clave es tener un método simple para revisar idioma, plan de estudios, requisitos y costos sin perderte entre decenas de portales.",
    keyTakeaways: [
      "Empieza por definir el tipo de programa y el idioma que realmente puedes cursar.",
      "Compara requisitos académicos, fechas y ciudad antes de enamorarte de una opción.",
      "Lleva una tabla o documento para guardar enlaces y notas importantes.",
    ],
    checklistItems: [
      "Definir área y tipo de maestría",
      "Filtrar por idioma de instrucción",
      "Comparar requisitos y fechas límite",
      "Guardar enlaces y notas en un solo documento",
    ],
    sections: [
      {
        title: "Empieza con filtros claros",
        paragraphs: [
          "Antes de abrir portales, define si buscas programas en Inglés, en Alemán o ambos. También conviene decidir si tu prioridad es el área académica, la ciudad, el costo de vida o la posibilidad de conseguir beca.",
          "Tener estos criterios desde el inicio te ayuda a descartar opciones que no encajan contigo y evita que gastes tiempo revisando programas imposibles por idioma o presupuesto.",
        ],
      },
      {
        title: "Dónde buscar programas",
        paragraphs: [
          "Puedes empezar con el buscador del DAAD, las páginas oficiales de universidades y agregadores académicos de posgrados. Lo importante es confirmar siempre la información en la web oficial del programa.",
        ],
        bullets: [
          "Revisa la duración total del programa",
          "Confirma si cobra colegiatura o solo cuota semestral",
          "Verifica si el programa acepta estudiantes internacionales",
          "Anota la fecha exacta de cierre",
        ],
      },
      {
        title: "Qué comparar antes de aplicar",
        paragraphs: [
          "No basta con que un programa suene interesante. Revisa si pide promedio mínimo, experiencia profesional, certificados de idioma, portafolio o cartas de recomendación.",
          "También conviene comparar la ciudad y el costo de vida. Una opción académica excelente puede requerir un presupuesto mensual mucho más alto que otra similar.",
        ],
      },
    ],
  },
  {
    slug: "documentos-que-necesitas-desde-mexico",
    title: "Documentos que necesitas desde México",
    category: "Documentos",
    readingTime: "7 min",
    excerpt:
      "Lista inicial de documentos que suelen pedir universidades alemanas, incluyendo certificados, traducciones y apostillas.",
    tags: ["documentos", "apostilla", "traducción"],
    intro:
      "Una parte importante del proceso consiste en reunir documentos con tiempo. Muchas personas se atrasan porque subestiman lo que toma pedir certificados, traducir papeles o resolver apostillas.",
    keyTakeaways: [
      "Haz una lista maestra de documentos base y otra por universidad.",
      "No todos los papeles requieren traducción o apostilla, pero debes verificarlo.",
      "Empieza por los documentos que dependen de terceros, como escuelas o traductores.",
    ],
    checklistItems: [
      "Pedir certificados y kardex",
      "Confirmar si necesitas apostilla",
      "Revisar si la universidad pide traducción oficial",
      "Guardar versiones digitales ordenadas",
    ],
    sections: [
      {
        title: "Documentos base que suelen repetirse",
        paragraphs: [
          "Entre los documentos más comunes están pasaporte, certificado de estudios, kardex o historial académico, título o constancia de terminación, CV y carta de motivación. Algunas universidades también piden cartas de recomendación o prueba de idioma.",
        ],
      },
      {
        title: "Traducciones y apostillas",
        paragraphs: [
          "No todas las universidades piden exactamente lo mismo. Algunas aceptan documentos en español e Inglés, mientras otras exigen traducción oficial al Inglés o al Alemán.",
          "La apostilla tampoco aplica siempre. Por eso conviene revisar cada convocatoria y, si hay duda, escribir directamente a admisiones.",
        ],
        bullets: [
          "Confirma el idioma aceptado para cada documento",
          "Revisa si aceptan copias simples o certificadas",
          "Pregunta si la apostilla es obligatoria o recomendada",
        ],
      },
      {
        title: "Cómo organizar tu carpeta",
        paragraphs: [
          "Crea una carpeta digital con nombres claros para cada archivo y guarda versiones finales en PDF. También ayuda llevar una hoja de control con fecha de emisión, traducción y si el documento ya fue subido a cada portal.",
        ],
      },
    ],
  },
  {
    slug: "cuanto-cuesta-estudiar-en-alemania",
    title: "Cuánto cuesta estudiar en Alemania",
    category: "Finanzas",
    readingTime: "10 min",
    excerpt:
      "Una guía práctica para entender matrícula, costo de vida, cuenta bloqueada, seguro médico y gastos de llegada.",
    tags: ["costos", "presupuesto", "cuenta bloqueada"],
    intro:
      "Estudiar en Alemania puede ser más accesible que en otros destinos, pero no significa que sea barato. Entre gastos previos, prueba financiera y costo de vida, vale la pena armar un presupuesto realista desde temprano.",
    keyTakeaways: [
      "Separar costos de aplicación, visa y llegada te da una visión más clara.",
      "La cuota semestral y el costo de vida varían mucho según la ciudad.",
      "La prueba de financiamiento es un paso crítico que no debes dejar al final.",
    ],
    checklistItems: [
      "Investigar costo de vida por ciudad",
      "Estimar cuota semestral o colegiatura",
      "Calcular seguro médico y llegada",
      "Revisar monto actualizado de prueba financiera",
    ],
    sections: [
      {
        title: "Costos universitarios y administrativos",
        paragraphs: [
          "Muchos programas públicos no cobran colegiatura completa, pero sí una cuota semestral que cubre administración y, a veces, transporte. También puede haber costos por aplicación, traducciones, exámenes de idioma y envío de documentos.",
        ],
      },
      {
        title: "Costo de vida y cuenta bloqueada",
        paragraphs: [
          "El costo mensual depende mucho de la ciudad. Renta, transporte, comida y seguro médico pueden cambiar bastante entre Berlin, Munich, Leipzig o ciudades universitarias más pequeñas.",
          "Además, para la visa normalmente necesitas demostrar financiamiento suficiente. Conviene revisar el monto actualizado y planearlo con tiempo.",
        ],
        bullets: [
          "Renta o alojamiento temporal",
          "Seguro médico",
          "Comida y transporte",
          "Depósitos iniciales y gastos de instalación",
        ],
      },
      {
        title: "Arma un presupuesto de llegada",
        paragraphs: [
          "No pienses solo en el mes a mes. También considera vuelo, depósito de vivienda, compra de artículos básicos, trámites iniciales y un colchoncito para imprevistos.",
        ],
      },
    ],
  },
  {
    slug: "como-prepararte-para-la-visa-de-estudiante",
    title: "Cómo prepararte para la visa de estudiante",
    category: "Visa",
    readingTime: "9 min",
    excerpt:
      "Puntos clave para empezar a preparar tu proceso de visa desde México y evitar errores comunes.",
    tags: ["visa", "consulado", "checklist"],
    intro:
      "La visa suele generar muchas dudas porque combina tiempos, citas, documentos y prueba financiera. Una buena preparación reduce el riesgo de errores y te ayuda a llegar a la cita con más seguridad.",
    keyTakeaways: [
      "Revisa siempre la información vigente del consulado alemán en México.",
      "No dejes la prueba financiera ni el seguro médico para el último minuto.",
      "Lleva una carpeta ordenada con originales y copias cuando corresponda.",
    ],
    checklistItems: [
      "Revisar lista oficial de requisitos",
      "Preparar prueba de financiamiento",
      "Confirmar seguro médico aceptado",
      "Organizar documentos para la cita",
    ],
    sections: [
      {
        title: "Empieza por la fuente oficial",
        paragraphs: [
          "Antes de seguir consejos sueltos, entra al sitio oficial del consulado o embajada correspondiente y revisa la lista más reciente de requisitos, formatos y pasos.",
          "Los procesos pueden cambiar, así que conviene verificar fechas, tiempos de espera y documentos exactos.",
        ],
      },
      {
        title: "Documentos y prueba financiera",
        paragraphs: [
          "Normalmente necesitarás carta de admisión o evidencia del proceso, pasaporte, formularios, fotos, seguro médico y prueba de financiamiento. Esta última suele ser una de las partes más sensibles del proceso.",
        ],
        bullets: [
          "Confirma cuántas copias te piden",
          "Revisa si la prueba financiera ya debe estar activa",
          "Verifica si el seguro es temporal o definitivo",
        ],
      },
      {
        title: "Evita errores comunes",
        paragraphs: [
          "Uno de los errores más frecuentes es asumir que todos los casos son iguales. Otro es llegar con documentos incompletos o no revisar que los nombres y fechas coincidan entre papeles.",
        ],
      },
    ],
  },
  {
    slug: "becas-para-mexicanos-por-donde-empezar",
    title: "Becas para mexicanos: por dónde empezar",
    category: "Becas",
    readingTime: "6 min",
    excerpt:
      "Cómo identificar becas reales, revisar elegibilidad y organizar fechas límite sin perderte.",
    tags: ["becas", "financiamiento", "fechas límite"],
    intro:
      "El mundo de las becas puede verse enorme al principio. La mejor forma de empezar es separar oportunidades por nivel, perfil y tipo de financiamiento para no dispersarte.",
    keyTakeaways: [
      "No todas las becas aplican para todas las personas ni para todas las etapas.",
      "La elegibilidad y la fecha límite importan tanto como el monto.",
      "Organizar un calendario de convocatorias te ahorra mucho estrés.",
    ],
    checklistItems: [
      "Definir a qué becas realmente puedes aplicar",
      "Anotar fechas de apertura y cierre",
      "Separar documentos comunes y específicos",
      "Revisar elegibilidad antes de preparar todo",
    ],
    sections: [
      {
        title: "Empieza por becas relevantes",
        paragraphs: [
          "Antes de abrir veinte convocatorias, revisa tu nivel de estudios, área académica, idioma y si ya tienes admisión o apenas estás buscando programas. Eso te ayudará a priorizar becas realistas para tu caso.",
        ],
      },
      {
        title: "Qué revisar en cada convocatoria",
        paragraphs: [
          "Lee con cuidado la elegibilidad, el tipo de apoyo, la duración y si la beca cubre colegiatura, manutención, seguro o solo una parte del proceso.",
        ],
        bullets: [
          "Fecha límite",
          "Documentos específicos",
          "Requisitos de idioma",
          "Restricciones por nacionalidad, área o experiencia",
        ],
      },
      {
        title: "Organiza tu calendario",
        paragraphs: [
          "Una hoja con nombre de la beca, enlace oficial, cierre y estado de tus documentos puede hacer una gran diferencia. Lo importante es que veas rápido qué oportunidades siguen abiertas y cuáles necesitan acción inmediata.",
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
      "Qué hacer en tus primeras semanas: Anmeldung, seguro, banco, SIM, transporte y universidad.",
    tags: ["llegada", "trámites", "Alemania"],
    intro:
      "Llegar a Alemania implica una pequeña ola de trámites durante las primeras semanas. Tener un orden base te ayuda a enfocarte en lo urgente sin sentir que todo pasa al mismo tiempo.",
    keyTakeaways: [
      "Prioriza registro de domicilio, seguro y universidad.",
      "Ten copias digitales y físicas de tus documentos importantes.",
      "Resuelve transporte, SIM y banco temprano para moverte con menos fricción.",
    ],
    checklistItems: [
      "Agendar o completar Anmeldung",
      "Activar seguro médico",
      "Resolver movilidad y conectividad",
      "Completar registro universitario",
    ],
    sections: [
      {
        title: "Los trámites más urgentes",
        paragraphs: [
          "En muchas ciudades, el registro de domicilio es uno de los primeros pasos importantes. También conviene activar cuanto antes tu seguro médico y revisar el proceso de inscripción final en la universidad.",
        ],
      },
      {
        title: "Banco, SIM y transporte",
        paragraphs: [
          "Aunque no todo se resuelve el mismo día, te conviene avanzar rápido con la conectividad y el transporte para que el resto de tus trámites sea más sencillo.",
        ],
        bullets: [
          "Comparar opciones de SIM o plan móvil",
          "Revisar si necesitas cuenta bancaria de inmediato",
          "Comprar abono local o Deutschlandticket si aplica",
        ],
      },
      {
        title: "Crea una semana de aterrizaje",
        paragraphs: [
          "Haz una lista breve para tus primeros siete a diez días y prioriza lo que desbloquea otros pasos. Eso te ayuda a no saturarte y a avanzar con más claridad.",
        ],
      },
    ],
  },
];

export function getGuideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}

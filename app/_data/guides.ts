export type GuideSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  table?: {
    columns: string[];
    rows: string[][];
  };
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
    slug: "ausbildung-duales-studium-hochschule-universitat-tu-diferencias",
    title:
      "Ausbildung, Duales Studium, Hochschule, Universität y TU: ¿cuál es la diferencia?",
    category: "Sistema educativo",
    readingTime: "8 min",
    excerpt:
      "Entiende las diferencias entre formación técnica, Duales Studium, universidades aplicadas, universidades tradicionales y universidades técnicas en Alemania.",
    tags: [
      "sistema educativo",
      "universidad",
      "Ausbildung",
      "Duales Studium",
      "Hochschule",
      "TU",
    ],
    intro:
      "En Alemania no existe un solo camino educativo. Elegir entre una formación técnica, un Duales Studium, una Hochschule, una Universität o una Technische Universität depende de tus metas: inserción laboral práctica, estudios aplicados, investigación académica, ingeniería o especialización profesional.",
    keyTakeaways: [
      "Ausbildung no es una carrera universitaria, sino una formación vocacional con enfoque práctico.",
      "Duales Studium combina estudios universitarios con experiencia en empresa y suele llevar a un título oficial.",
      "Hochschule suele referirse a instituciones de educación superior con orientación aplicada y cercana a la industria.",
      "Universität y TU son rutas más académicas y de investigación, especialmente si piensas en un doctorado o en áreas técnicas avanzadas.",
    ],
    checklistItems: [
      "Definir si buscas formación práctica o un título universitario",
      "Distinguir entre formación dual, estudios aplicados y ruta universitaria clásica",
      "Revisar idioma de enseñanza y requisitos de admisión",
      "Comparar enfoque aplicado, teórico o de investigación",
      "Confirmar reconocimiento oficial y salidas profesionales",
    ],
    sections: [
      {
        title: "Introducción",
        paragraphs: [
          "Alemania tiene varios tipos de instituciones y trayectorias educativas, y eso puede confundir al principio. La mejor opción no depende de cuál suena más prestigiosa, sino de qué tipo de aprendizaje quieres, cuánto peso le das a la práctica o a la investigación, y qué tipo de carrera imaginas después.",
          "Antes de aplicar, conviene entender si tu objetivo es una formación técnica con inserción laboral rápida, un modelo dual entre universidad y empresa, estudios superiores aplicados, una carrera universitaria tradicional o una ruta técnica con mucha base científica.",
        ],
      },
      {
        title: "Ausbildung",
        paragraphs: [
          "Una Ausbildung es formación vocacional, no un título universitario. Suele combinar clases en una escuela profesional con trabajo práctico dentro de una empresa, por lo que aprendes mientras participas en tareas reales.",
          "Muchas Ausbildungen son remuneradas, pero normalmente requieren alemán porque el entorno de trabajo, la enseñanza y la interacción diaria se desarrollan en ese idioma. Es una buena ruta si te interesa una carrera práctica y profesionalizante, distinta a una licenciatura o maestría.",
        ],
        bullets: [
          "No equivale a bachelor o master",
          "Combina estudio y práctica en empresa",
          "A menudo incluye pago o apoyo económico",
          "Suele requerir alemán",
          "Funciona bien para perfiles que buscan una salida laboral práctica",
        ],
      },
      {
        title: "Duales Studium",
        paragraphs: [
          "Un Duales Studium combina estudios universitarios con experiencia práctica en una empresa. A diferencia de una Ausbildung, normalmente sí conduce a un título oficial de educación superior, por ejemplo una licenciatura.",
          "Tiene un enfoque muy práctico porque alterna fases académicas con trabajo o formación dentro de una empresa. En muchos casos, el estudiantado recibe apoyo financiero o incluso salario, pero también suele ser un modelo competitivo y con requisitos claros tanto de admisión como de idioma.",
          "Es frecuente en áreas como ingeniería, informática, negocios y otros campos aplicados. Además, el alemán suele ser importante porque la parte empresarial y buena parte de la comunicación profesional se desarrollan en ese idioma.",
        ],
        bullets: [
          "Combina universidad y experiencia en empresa",
          "Suele llevar a un título oficial",
          "Tiene orientación altamente práctica",
          "A menudo ofrece apoyo financiero o salario",
          "Suele ser competitivo",
          "Con frecuencia requiere alemán",
          "Es común en ingeniería, informática, negocios y áreas aplicadas",
        ],
      },
      {
        title: "Hochschule / University of Applied Sciences",
        paragraphs: [
          "Una Hochschule, especialmente cuando se refiere a una University of Applied Sciences, es una institución de educación superior con orientación más práctica. Ofrece títulos de licenciatura y maestría, pero suele poner mucho énfasis en proyectos aplicados, relación con industria, prácticas y desarrollo de habilidades profesionales.",
          "Es una opción muy interesante para áreas como ingeniería, negocios, diseño, ciencias sociales aplicadas, informática aplicada y campos donde importa mucho conectar lo académico con problemas reales del mercado laboral.",
        ],
      },
      {
        title: "Universität",
        paragraphs: [
          "Una Universität tiene un perfil más académico y orientado a la investigación. Puede ofrecer licenciatura, maestría y doctorado, y suele ser una mejor opción si te interesa profundizar en teoría, dedicarte a la academia, trabajar en investigación o mantener abierta la puerta a un PhD más adelante.",
          "En comparación con una Hochschule, muchas universidades tradicionales tienen un enfoque más teórico. Eso no las hace mejores o peores: simplemente responden a objetivos distintos.",
        ],
      },
      {
        title: "Technische Universität / TU",
        paragraphs: [
          "Una Technische Universität sigue siendo una Universität, pero con un perfil muy fuerte en ingeniería, tecnología, ciencias naturales y trabajo de investigación. Suele atraer a estudiantes que quieren una base científica sólida y programas exigentes en áreas técnicas.",
          "Puede ser una gran elección para ingeniería, informática, física, matemáticas, modelado computacional y campos técnicos donde la investigación tiene un peso importante.",
        ],
      },
      {
        title: "Comparación rápida",
        paragraphs: [
          "Esta tabla sirve como referencia inicial para distinguir el tipo de institución o ruta educativa. Siempre revisa cada programa concreto, porque puede haber variaciones entre instituciones y áreas.",
        ],
        table: {
          columns: [
            "Ruta",
            "Tipo",
            "¿Da título?",
            "Enfoque práctico o de investigación",
            "¿Suele pedir alemán?",
            "Mejor para",
          ],
          rows: [
            [
              "Ausbildung",
              "Formación vocacional",
              "No título universitario",
              "Muy práctico",
              "Sí, normalmente",
              "Inserción laboral práctica y oficios/profesiones técnicas",
            ],
            [
              "Duales Studium",
              "Estudios superiores duales",
              "Sí, normalmente",
              "Muy práctico",
              "Sí, con frecuencia",
              "Quienes buscan título universitario con experiencia laboral integrada",
            ],
            [
              "Hochschule",
              "Educación superior aplicada",
              "Sí, licenciatura y maestría",
              "Práctico y aplicado",
              "Depende del programa",
              "Carreras aplicadas, industria, proyectos e inserción profesional",
            ],
            [
              "Universität",
              "Universidad tradicional",
              "Sí, licenciatura, maestría y doctorado",
              "Más académico y de investigación",
              "Depende del programa",
              "Teoría, investigación, academia y futuros estudios doctorales",
            ],
            [
              "Technische Universität",
              "Universidad con perfil técnico-científico",
              "Sí, licenciatura, maestría y doctorado",
              "Investigación y base científica fuerte",
              "Depende del programa",
              "Ingeniería, informática, ciencias y áreas técnicas de alta especialización",
            ],
          ],
        },
      },
      {
        title: "¿Cuál debería elegir?",
        paragraphs: [
          "Elige Ausbildung si quieres formación vocacional práctica y estás lista o listo para estudiar y trabajar principalmente en alemán.",
          "Elige Duales Studium si quieres un título universitario con experiencia práctica integrada y te atrae un modelo muy conectado con empresa.",
          "Elige Hochschule si buscas estudios aplicados, cercanía con la práctica profesional y preparación concreta para el mercado laboral.",
          "Elige Universität si te interesa más profundidad académica, teoría, investigación o una posible ruta hacia doctorado.",
          "Elige TU si quieres una universidad con orientación técnica o científica fuerte, especialmente en ingeniería o áreas intensivas en investigación.",
        ],
      },
      {
        title: "Confusiones comunes",
        paragraphs: [
          "Hochschule no significa high school. En Alemania, se refiere a educación superior, no a preparatoria.",
          "Ausbildung tampoco es lo mismo que universidad. Aunque puede ser una excelente opción, responde a una lógica distinta de formación.",
          "Duales Studium no es lo mismo que Ausbildung. Aunque ambos tienen componentes prácticos, el Duales Studium normalmente pertenece al nivel universitario y conduce a un título oficial de educación superior.",
          "Una TU como TU Dresden es una Technische Universität, no simplemente una escuela técnica. También otorga títulos universitarios completos y tiene peso académico.",
          "Un título de Hochschule puede ser plenamente oficial y valioso. Lo importante es que la institución esté reconocida y que el programa sí encaje con tus metas personales y profesionales.",
        ],
      },
      {
        title: "Nota final",
        paragraphs: [
          "Esta guía es una explicación general. Siempre revisa el tipo de institución, requisitos de idioma, reconocimiento del programa y salidas profesionales directamente en la página oficial.",
        ],
      },
    ],
  },
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

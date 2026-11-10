import type { GuideArticle } from "../types";

const article = {
  "intro": "Buscar una maestría en Alemania puede sentirse abrumador al principio, sobre todo si estás comparando programas desde México. La clave es tener un método simple para revisar idioma, plan de estudios, requisitos y costos sin perderte entre decenas de portales.",
  "keyTakeaways": [
    "Empieza por definir el tipo de programa y el idioma que realmente puedes cursar.",
    "Compara requisitos académicos, fechas y ciudad antes de enamorarte de una opción.",
    "Lleva una tabla o documento para guardar enlaces y notas importantes."
  ],
  "checklistItems": [
    "Definir área y tipo de maestría",
    "Filtrar por idioma de instrucción",
    "Comparar requisitos y fechas límite",
    "Guardar enlaces y notas en un solo documento"
  ],
  "sections": [
    {
      "title": "Empieza con filtros claros",
      "paragraphs": [
        "Antes de abrir portales, define si buscas programas en inglés, en alemán o en ambos idiomas. También conviene decidir si tu prioridad es el área académica, la ciudad, el costo de vida o la posibilidad de conseguir una beca.",
        "Tener estos criterios desde el inicio te ayuda a descartar opciones que no encajan contigo y evita que gastes tiempo revisando programas que no se ajustan a tu idioma o presupuesto."
      ]
    },
    {
      "title": "Dónde buscar programas",
      "paragraphs": [
        "Puedes empezar con el buscador del DAAD, las páginas oficiales de las universidades y otros buscadores de posgrados. Confirma siempre la información en la página oficial de cada programa."
      ],
      "bullets": [
        "Revisa la duración total del programa",
        "Confirma si cobra colegiatura o solo cuota semestral",
        "Verifica si el programa acepta estudiantes internacionales",
        "Anota la fecha exacta de cierre"
      ]
    },
    {
      "title": "Cómo busqué mi maestría en Alemania utilizando DAAD",
      "paragraphs": [
        "Yo empecé en el buscador oficial International Programmes del DAAD. Cuando hice mi búsqueda, aparecían 2,506 programas. Estas cifras son una fotografía de ese momento, no los resultados actuales del buscador: pueden cambiar cuando tú lo consultes.",
        "Apliqué los filtros uno por uno para reducir la lista sin perder de vista lo que me interesaba. Así quedó mi búsqueda:"
      ],
      "table": {
        "columns": ["Paso", "Filtros que utilicé", "Programas"],
        "rows": [
          ["Inicio", "Sin filtros", "2,506"],
          ["1", "Master's degree; English only; Subject groups: Engineering and Mathematics; Natural Sciences", "1,007"],
          ["2", "Mode of study: Fully onsite", "940"],
          ["3", "Subject areas: Bioengineering; Chemical Engineering, Process Technology; Technical Health Systems; Optical Technologies; Computer Science; Nanosciences; Neurosciences", "386"],
          ["4", { "before": "Tuition fees: ", "strong": "“No fees”", "after": "" }, "245"],
          ["5A", "Winter semester", "238"],
          ["5B", "Summer semester", "133"]
        ]
      },
    },
    {
      "title": "Semestres de inicio",
      "paragraphs": [
        "Probé el filtro Winter semester y, por separado, Summer semester. Obtuve 238 y 133 resultados, respectivamente. Estos resultados corresponden a búsquedas alternativas después de aplicar los filtros anteriores; no deben sumarse."
      ]
    },
    {
      "title": "Colegiaturas",
      "paragraphs": [
        {
          "before": "Seleccioné el filtro ",
          "strong": "“No fees”",
          "after": " para buscar programas sin colegiatura. Sin embargo, esto no significa que estén exentos de la contribución semestral (Semesterbeitrag). Por eso, es importante consultar los costos directamente con cada universidad."
        }
      ]
    },
    {
      "title": "Programas que descarté",
      "paragraphs": [
        "Descarté manualmente programas que no coincidían con mis intereses, entre ellos:"
      ],
      "bullets": [
        "Agrobioinformatics",
        "Air Transport and Logistics",
        "Applied Geosciences"
      ]
    },
    {
      "title": "Comparación de ciudades",
      "paragraphs": [
        "Comparé ciudades alemanas según la renta, la calidad de vida, el transporte y el estilo de vida. Organicé en una hoja de Excel las universidades y los programas que me interesaban, y anoté si la solicitud se hacía directamente ante la universidad o a través de uni-assist."
      ]
    },
    {
      "title": "Mi decisión final",
      "paragraphs": [
        "Después de reducir mis opciones, elegí Computational Modeling and Simulation (CMS) en TU Dresden. Esa fue mi decisión personal. Revisa siempre los detalles, requisitos, costos y fechas directamente con la universidad. Si quieres llevar el control de tus solicitudes, puedes usar Mis Aplicaciones."
      ]
    },
    {
      "title": "Qué comparar antes de aplicar",
      "paragraphs": [
        "No basta con que un programa suene interesante. Revisa si pide promedio mínimo, experiencia profesional, certificados de idioma, portafolio o cartas de recomendación.",
        "También conviene comparar la ciudad y el costo de vida. Una opción académica excelente puede requerir un presupuesto mensual mucho más alto que otra similar."
      ]
    }
  ],
  "relatedLinks": [
    { "title": "Abrir el buscador oficial International Programmes del DAAD", "href": "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/" },
    { "title": "Organizar mis solicitudes en Mis Aplicaciones", "href": "/mi-ruta/aplicaciones" }
  ]
} satisfies GuideArticle;

export default article;

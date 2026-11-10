import type { GuideArticle } from "../types";

const article = {
  "intro": "Llegar a Alemania implica una pequeña ola de trámites durante las primeras semanas. Tener un orden base te ayuda a enfocarte en lo urgente sin sentir que todo pasa al mismo tiempo.",
  "keyTakeaways": [
    "Prioriza registro de domicilio, seguro y universidad.",
    "Ten copias digitales y físicas de tus documentos importantes.",
    "Resuelve transporte, SIM y banco temprano para moverte con menos fricción."
  ],
  "checklistItems": [
    "Agendar o completar Anmeldung",
    "Activar seguro médico",
    "Resolver movilidad y conectividad",
    "Completar registro universitario"
  ],
  "sections": [
    {
      "title": "Los trámites más urgentes",
      "paragraphs": [
        "En muchas ciudades, el registro de domicilio es uno de los primeros pasos importantes. También conviene activar cuanto antes tu seguro médico y revisar el proceso de inscripción final en la universidad."
      ]
    },
    {
      "title": "Banco, SIM y transporte",
      "paragraphs": [
        "Aunque no todo se resuelve el mismo día, te conviene avanzar rápido con la conectividad y el transporte para que el resto de tus trámites sea más sencillo."
      ],
      "bullets": [
        "Comparar opciones de SIM o plan móvil",
        "Revisar si necesitas cuenta bancaria de inmediato",
        "Comprar abono local o Deutschlandticket si aplica"
      ]
    },
    {
      "title": "Crea una semana de aterrizaje",
      "paragraphs": [
        "Haz una lista breve para tus primeros siete a diez días y prioriza lo que desbloquea otros pasos. Eso te ayuda a no saturarte y a avanzar con más claridad."
      ]
    }
  ]
} satisfies GuideArticle;

export default article;

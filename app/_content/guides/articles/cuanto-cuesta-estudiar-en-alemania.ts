import type { GuideArticle } from "../types";

const article = {
  "intro": "Estudiar en Alemania puede ser más accesible que en otros destinos, pero no significa que sea barato. Entre gastos previos, prueba financiera y costo de vida, vale la pena armar un presupuesto realista desde temprano.",
  "keyTakeaways": [
    "Separar costos de aplicación, visa y llegada te da una visión más clara.",
    "La cuota semestral y el costo de vida varían mucho según la ciudad.",
    "La prueba de financiamiento es un paso crítico que no debes dejar al final."
  ],
  "checklistItems": [
    "Investigar costo de vida por ciudad",
    "Estimar cuota semestral o colegiatura",
    "Calcular seguro médico y llegada",
    "Revisar monto actualizado de prueba financiera"
  ],
  "sections": [
    {
      "title": "Costos universitarios y administrativos",
      "paragraphs": [
        "Muchos programas públicos no cobran colegiatura completa, pero sí una cuota semestral que cubre administración y, a veces, transporte. También puede haber costos por aplicación, traducciones, exámenes de idioma y envío de documentos."
      ]
    },
    {
      "title": "Costo de vida y cuenta bloqueada",
      "paragraphs": [
        "El costo mensual depende mucho de la ciudad. Renta, transporte, comida y seguro médico pueden cambiar bastante entre Berlin, Munich, Leipzig o ciudades universitarias más pequeñas.",
        "Además, para la visa normalmente necesitas demostrar financiamiento suficiente. Conviene revisar el monto actualizado y planearlo con tiempo."
      ],
      "bullets": [
        "Renta o alojamiento temporal",
        "Seguro médico",
        "Comida y transporte",
        "Depósitos iniciales y gastos de instalación"
      ]
    },
    {
      "title": "Mi presupuesto como estudiante en Dresden",
      "paragraphs": [
        "Una de las cosas que más me preocupaban antes de mudarme a Alemania era cuánto me iba a costar vivir aquí, porque aunque muchas universidades públicas no cobran colegiatura, eso no significa que estudiar en Alemania sea gratis.",
        {
          "parts": [
            "En mi caso, vivo en Dresden, una ciudad donde el costo de vida puede ser bastante más accesible que en otras ciudades alemanas. Actualmente pago ",
            { "strong": "450 € por una habitación en una WG" },
            ", con calefacción, agua y electricidad incluidas (",
            { "em": "Warmmiete" },
            "), así que no tengo que preocuparme por pagar esos servicios por separado."
          ]
        },
        {
          "parts": [
            "En cuanto al supermercado, gasto alrededor de ",
            { "strong": "200 € al mes" },
            " y suelo comprar en REWE porque literalmente es el que tengo más cerca. Eso sí, si hiciera mis compras en Netto, probablemente podría ahorrar un poco más, pero por comodidad termino yendo a REWE. En Alemania también encontrarás supermercados como Aldi, Lidl, Penny, Edeka y Kaufland, así que vale la pena comparar precios, ofertas y marcas propias antes de decidir dónde hacer tus compras."
          ]
        },
        {
          "parts": [
            "Mi seguro médico cuesta ",
            { "strong": "148,50 € mensuales" },
            " y por mi plan de celular de Lidl Connect pago ",
            { "strong": "15 €" },
            ". En cuanto al transporte, mi ",
            { "em": "Deutschlandsemesterticket" },
            " está incluido en la cuota semestral de la universidad, que en mi caso fue de ",
            { "strong": "361 €" },
            ", por lo que no tengo que comprar un abono mensual adicional."
          ]
        },
        {
          "parts": [
            "Para salidas, restaurantes o actividades suelo gastar menos de ",
            { "strong": "150 € al mes" },
            ", aunque esa ha sido la cantidad máxima que he llegado a gastar en mis meses más caros."
          ]
        },
        {
          "parts": [
            "Si sumo todos estos gastos y divido mi cuota semestral entre seis meses, mi presupuesto puede llegar a aproximadamente ",
            { "strong": "1.024 € mensuales" },
            " en un mes con bastante ocio."
          ]
        },
        "Claro que esto depende muchísimo de la ciudad en la que vivas, el tipo de alojamiento que consigas y tus hábitos de consumo. Por eso, antes de elegir una universidad, también te recomendaría investigar cuánto cuesta vivir en esa ciudad, no solamente cuánto cuesta estudiar ahí."
      ],
      "table": {
        "columns": ["Gasto", "Importe", "Qué incluye"],
        "rows": [
          ["Renta en WG", "450 € al mes", "Warmmiete: calefacción, agua y electricidad incluidas"],
          ["Supermercado", "Aproximadamente 200 € al mes", "Principalmente en REWE"],
          ["Seguro médico", "148,50 € al mes", ""],
          ["Teléfono", "15 € al mes", "Lidl Connect"],
          ["Transporte", "Sin gasto regular adicional reportado", "Deutschlandsemesterticket incluido en la contribución semestral"],
          ["Contribución semestral", "361 € por semestre", "Equivalente a aproximadamente 60,17 € al mes"],
          ["Ocio", "Hasta 150 € al mes", "Solo en mis meses de mayor gasto; no es mi promedio"],
          ["Total sin ocio", "Aproximadamente 873,67 € al mes", "Incluye la parte mensual de la contribución semestral"],
          ["Total con el máximo de ocio reportado", "Aproximadamente 1.023,67 € al mes", "No representa mi gasto mensual promedio"]
        ]
      }
    },
    {
      "title": "Arma un presupuesto de llegada",
      "paragraphs": [
        "No pienses solo en el mes a mes. También considera vuelo, depósito de vivienda, compra de artículos básicos, trámites iniciales y un colchoncito para imprevistos."
      ]
    }
  ],
  "relatedLinks": [
    { "title": "Guía de supermercados en Alemania (HousingAnywhere)", "href": "https://housinganywhere.com/blog/living/guide-to-german-supermarkets" },
    { "title": "Cuenta bloqueada y prueba de financiamiento (Ministerio Federal de Relaciones Exteriores)", "href": "https://www.auswaertiges-amt.de/en/visa-service/visabestimmungen-node/sperrkonto-seite" }
  ]
} satisfies GuideArticle;

export default article;

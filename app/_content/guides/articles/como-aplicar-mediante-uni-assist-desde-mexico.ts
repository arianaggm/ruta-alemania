import type { GuideArticle } from "../types";

const article = {
  intro: "Algunas universidades alemanas encargan a uni-assist la revisión de solicitudes y documentos académicos. Antes de crear una cuenta en My assist, revisa en la página de tu programa si debes solicitar directamente a la universidad, usar uni-assist o pedir una VPD. La decisión de admisión siempre corresponde a la universidad.",
  keyTakeaways: [
    "Aunque una universidad trabaje con uni-assist, no todos sus programas tienen el mismo proceso de solicitud.",
    "Con el procedimiento estándar, uni-assist revisa y envía tu solicitud a la universidad; con una VPD, tú debes solicitar después a la universidad.",
    "Revisa tanto las indicaciones de uni-assist para México como los requisitos particulares del programa.",
  ],
  checklistItems: [
    "Guardar el enlace oficial del programa y confirmar quién recibe la solicitud",
    "Comprobar si debo solicitar directamente, mediante uni-assist o con una VPD",
    "Revisar las indicaciones para México según mis estudios y modalidad",
    "Pedir certificados, historiales, plan de estudios y escala de calificaciones aplicables",
    "Confirmar idiomas, traducciones y materiales adicionales del programa",
    "Preparar archivos PDF completos y legibles para el portal indicado",
    "Verificar en la fuente oficial la cuota, la fecha límite y los pasos de envío",
    "Si corresponde VPD, confirmar también cómo entregarla a la universidad",
  ],
  sections: [
    {
      title: "Qué hace uni-assist y cuándo usarlo",
      paragraphs: [
        "uni-assist revisa certificados y otros requisitos por encargo de las universidades que trabajan con ese servicio. No garantiza una plaza ni decide quién entra. Consulta la página de tu programa: la misma universidad puede usar uni-assist para algunos estudiantes o programas y recibir otras solicitudes directamente.",
      ],
    },
    {
      title: "Solicitud directa, procedimiento estándar y VPD",
      paragraphs: [
        "Si la universidad recibe solicitudes directamente, sigue las instrucciones de su propio portal. Si tu programa usa el procedimiento estándar de uni-assist, presenta la solicitud en My assist. Cuando la evaluación es positiva, uni-assist envía tus documentos a la universidad; ella decide si te admite.",
        "Si te piden una VPD (Vorprüfungsdokumentation), primero solicítala en My assist para la universidad elegida. uni-assist revisa tus certificados y emite el documento. Después debes presentar la solicitud a la universidad por separado, con la VPD y los demás materiales que te pida. Solicitar la VPD no completa la solicitud de admisión.",
      ],
      table: {
        columns: ["Cómo solicitas", "Primer paso", "Después de la revisión"],
        rows: [
          ["Directamente", "Seguir el portal de la universidad", "Atender los mensajes de esa universidad"],
          ["Mediante uni-assist", "Presentar la solicitud en My assist", "uni-assist envía la solicitud evaluada a la universidad"],
          ["Con VPD", "Solicitar la VPD en My assist", "Presentar después la solicitud a la universidad y entregar la VPD"],
        ],
      },
    },
    {
      title: "Si solicitas una licenciatura: Bachillerato mexicano",
      paragraphs: [
        "Si cursaste el Bachillerato General en México, uni-assist indica presentar el certificado, una constancia de que completaste todos los créditos y la relación de materias y calificaciones de los últimos tres años con el promedio general. Revisa sus indicaciones para México y los requisitos de tu programa antes de enviar documentos.",
        "La evaluación del acceso a una licenciatura depende de tu trayectoria y del programa. Presentar los documentos indicados no prueba por sí solo admisión ni acceso directo; consulta las herramientas de orientación y la universidad.",
      ],
    },
    {
      title: "Equivalencia, Revalidación, CENEVAL, distancia e IB",
      paragraphs: [
        "Si te reconocieron materias cursadas en otra escuela mexicana (Equivalencia), uni-assist pide el historial de esas materias en su idioma original. Si cursaste materias en una escuela extranjera y se reconocieron en tu bachillerato (Revalidación), pide el historial original y una traducción jurada. Revisa qué situación corresponde a tus estudios.",
        "Si terminaste el bachillerato mediante CENEVAL, en línea o a distancia en lugar de cursar tres años regulares presenciales, uni-assist indica presentar también el certificado de secundaria. Hay instrucciones adicionales si cursaste años que no aparecen en tu certificado o tienes un diploma IB. Consulta el apartado México: estos casos no aplican a todas las personas.",
      ],
    },
    {
      title: "Si solicitas una maestría: estudios universitarios",
      paragraphs: [
        "Para una maestría, uni-assist pide los certificados universitarios completos y el historial de todas tus materias y calificaciones. Si ese historial no incluye la escala oficial que tu universidad utilizó para otorgar el grado, consulta cómo enviar un enlace institucional o un PDF oficial con esa información.",
        "Para estudios universitarios realizados en México, uni-assist indica además el Plan de estudios oficial con asignaturas, créditos y duración estándar. Su página para México señala que ese plan no requiere traducción para uni-assist. Confirma por separado cualquier requisito de la universidad o de otro portal.",
      ],
    },
    {
      title: "Título expedido o grado pendiente",
      paragraphs: [
        "uni-assist distingue tres situaciones: ya tienes el título que acredita tu grado; la universidad ya te otorgó el grado, pero todavía no expide el título; o terminaste las materias y el grado sigue pendiente. Para las dos últimas situaciones, consulta qué constancia oficial corresponde. Una constancia de terminación no equivale automáticamente a un grado otorgado.",
        "Que una maestría permita solicitar con documentación provisional depende de sus reglas. Comprueba esta posibilidad con admisiones antes de pagar o enviar la solicitud.",
      ],
    },
    {
      title: "Traducciones juradas y otros trámites",
      paragraphs: [
        "Para certificados académicos, uni-assist explica cuándo debes presentar el documento en su idioma original junto con una traducción certificada al alemán o inglés. Revisa también las excepciones para México y quién puede traducirlo. La Embajada alemana en México publica una lista orientativa de traductores, pero no es exclusiva. Lo que acepta la Embajada para una visa no determina lo que aceptan uni-assist o tu universidad.",
        "Una traducción certificada no es una apostilla ni una copia certificada. La apostilla autentica la firma, el sello y la calidad de quien firmó un documento público, pero no verifica por sí sola todos los datos que contiene. Un certificado académico oficial, firmado o verificable digitalmente, tampoco está apostillado automáticamente. Comprueba qué te pide cada institución; si necesitas una apostilla, no la omitas.",
        "En mi caso, apostillé mis documentos académicos, incluido mi título universitario. También obtuve traducciones certificadas de mi título, mi cédula profesional, mi certificado de Bachillerato y otros documentos académicos. Revisé que los documentos contaran con firmas, sellos o validación oficial de la universidad, la SEP u otra autoridad emisora, según correspondía. Esto describe mi experiencia, no una exigencia general de uni-assist.",
      ],
    },
    {
      title: "Idioma y materiales definidos por el programa",
      paragraphs: [
        "La universidad determina los certificados de idioma aceptados y sus niveles. CV, carta de motivación, recomendaciones, experiencia, portafolio u otras pruebas pueden variar entre programas. La lista de My assist no reemplaza las instrucciones particulares de la universidad.",
      ],
    },
    {
      title: "My assist y preparación de archivos",
      paragraphs: [
        "Si tu universidad utiliza uni-assist para ese programa, crea tu solicitud en My assist y sube archivos PDF completos y legibles. Revisa cómo se presenta la solicitud: guardar documentos en el portal no significa que ya la enviaste. Si la universidad recibe solicitudes directamente, usa su portal y sigue sus instrucciones.",
        "Antes de enviar, comprueba la cuota, la fecha límite y los tiempos de revisión en las páginas oficiales. Cada programa puede tener fechas distintas. Si necesitas una VPD, deja tiempo para recibirla y después presentar tu solicitud a la universidad.",
      ],
    },
    {
      title: "¿Qué pasa después de enviar tus documentos a uni-assist?",
      paragraphs: [
        "Cuando presentas tu solicitud en My assist, el proceso ya comenzó; no tienes que esperar al informe para iniciarlo. uni-assist revisa los documentos y te comunica el resultado de su evaluación. Si recibes un Prüfbericht (informe de evaluación), revísalo cuanto antes: comprueba tus datos académicos y la calificación calculada, y consulta con uni-assist si encuentras algún error.",
        "Yo recibí un Prüfbericht fechado el 17 de junio de 2024, después de aproximadamente seis semanas de revisión. En mi caso, uni-assist evaluó mi título mexicano de Ingeniería Biomédica y convirtió mi promedio a 1.8 en la escala alemana. Ese tiempo y esa calificación corresponden solo a mi experiencia: la revisión puede tardar más o menos y el resultado depende de cada expediente.",
        "El Prüfbericht no es una carta de admisión. La universidad toma la decisión sobre tu ingreso. Tampoco es lo mismo que una VPD (Vorprüfungsdokumentation): la VPD se usa cuando una universidad te pide esa evaluación previa para que después presentes tu solicitud directamente ante ella. Sigue siempre las indicaciones de tu programa para saber cuál es el siguiente paso.",
      ],
    },
    {
      title: "Lo que yo envié en mi solicitud de maestría",
      paragraphs: [
        "Yo preparé y envié a uni-assist mi certificado de Bachillerato y su traducción; mi certificado universitario y su traducción; mis materias y calificaciones universitarias con traducción; el Plan de estudios oficial, firmado y sellado; la escala oficial de calificaciones de mi universidad; mi certificado TOEFL; un certificado de inglés de la Universidad Anáhuac Mayab; mi certificado EF SET; mi CV; mi carta de motivación; dos cartas de recomendación académica; y mi pasaporte.",
        "También apostillé documentos académicos, incluido mi título, y obtuve traducciones certificadas de documentos como mi título y mi cédula profesional. Haber traducido la cédula no significa que la haya enviado a uni-assist. Mi envío real es un ejemplo personal, no una lista de requisitos para todas las maestrías.",
      ],
    },
    {
      title: "Errores frecuentes y cómo evitarlos",
      paragraphs: [
        "Los errores más fáciles de prevenir son elegir el portal equivocado, omitir páginas del historial, usar una escala de calificaciones no oficial, olvidar la documentación específica para México, encargar una traducción sin comprobar su aceptación o creer que la VPD es la solicitud final.",
        "Guarda el enlace del programa y sus indicaciones, registra tus documentos por solicitud y revisa el estado en cada portal. Mi Ruta ayuda a ordenar pasos generales; Mis Aplicaciones permite llevar una lista editable para cada programa, sin convertirla en una lista oficial de requisitos.",
      ],
    },
  ],
  relatedLinks: [
    { title: "Documentos que necesitas desde México", href: "/guias/documentos-que-necesitas-desde-mexico" },
    { title: "Organizar mi ruta", href: "/mi-ruta" },
    { title: "Registrar mis aplicaciones", href: "/mi-ruta/aplicaciones" },
  ],
} satisfies GuideArticle;

export default article;

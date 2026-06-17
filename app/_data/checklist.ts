export type ChecklistItem = {
  id: string;
  label: string;
};

export type ChecklistSection = {
  id: string;
  title: string;
  items: ChecklistItem[];
};

export const checklistSections: ChecklistSection[] = [
  {
    id: "elegir-programa",
    title: "Elegir programa",
    items: [
      { id: "definir-area", label: "Definir área de estudio" },
      {
        id: "buscar-programas",
        label: "Buscar programas en Inglés o Alemán",
      },
      {
        id: "revisar-requisitos-academicos",
        label: "Revisar requisitos académicos",
      },
      {
        id: "revisar-ciudad-costos-fechas",
        label: "Revisar ciudad, costos y fechas límite",
      },
    ],
  },
  {
    id: "preparar-documentos",
    title: "Preparar documentos",
    items: [
      { id: "pasaporte-vigente", label: "Pasaporte vigente" },
      { id: "certificado-estudios", label: "Certificado de estudios" },
      { id: "kardex-transcript", label: "Kardex o historial académico" },
      {
        id: "titulo-constancia",
        label: "Título o constancia de terminación",
      },
      { id: "cv-actualizado", label: "CV actualizado" },
      { id: "carta-motivacion", label: "Carta de motivación" },
      {
        id: "cartas-recomendacion",
        label: "Cartas de recomendación",
      },
      {
        id: "traducciones-oficiales",
        label: "Traducciones oficiales si aplican",
      },
      { id: "apostilla", label: "Apostilla si aplica" },
    ],
  },
  {
    id: "buscar-becas",
    title: "Buscar becas",
    items: [
      { id: "revisar-daad", label: "Revisar DAAD" },
      {
        id: "revisar-fundaciones",
        label: "Revisar fundaciones alemanas",
      },
      {
        id: "revisar-becas-universidades",
        label: "Revisar becas de universidades",
      },
      {
        id: "anotar-deadlines",
        label: "Anotar fechas límite en calendario",
      },
      {
        id: "preparar-documentos-beca",
        label: "Preparar documentos específicos para beca",
      },
    ],
  },
  {
    id: "aplicar-universidad",
    title: "Aplicar a universidad",
    items: [
      {
        id: "crear-cuenta-portal",
        label: "Crear cuenta en portal de aplicación",
      },
      {
        id: "revisar-uni-assist",
        label: "Revisar si se usa Uni-Assist",
      },
      { id: "subir-documentos", label: "Subir documentos" },
      { id: "pagar-fee", label: "Pagar cuota si aplica" },
      { id: "guardar-comprobantes", label: "Guardar comprobantes" },
      {
        id: "revisar-correo",
        label: "Revisar correo constantemente",
      },
    ],
  },
  {
    id: "visa-mudanza",
    title: "Preparar visa y mudanza",
    items: [
      {
        id: "requisitos-consulado",
        label: "Revisar requisitos del consulado alemán en México",
      },
      {
        id: "prueba-financiamiento",
        label: "Preparar prueba de financiamiento",
      },
      { id: "seguro-medico", label: "Contratar seguro médico" },
      { id: "buscar-alojamiento", label: "Buscar alojamiento" },
      {
        id: "presupuesto-llegada",
        label: "Preparar presupuesto de llegada",
      },
      {
        id: "comprar-vuelo",
        label: "Comprar vuelo cuando sea seguro hacerlo",
      },
    ],
  },
  {
    id: "primeras-semanas",
    title: "Primeras semanas en Alemania",
    items: [
      { id: "anmeldung", label: "Hacer Anmeldung" },
      {
        id: "activar-seguro",
        label: "Activar seguro médico",
      },
      {
        id: "cuenta-bancaria",
        label: "Abrir cuenta bancaria si aplica",
      },
      {
        id: "sim-plan-movil",
        label: "Comprar SIM o plan móvil",
      },
      {
        id: "registro-universidad",
        label: "Registrarse en la universidad",
      },
      {
        id: "deutschlandticket",
        label: "Comprar Deutschlandticket o transporte local",
      },
    ],
  },
];

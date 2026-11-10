import { checklistSections } from "../../_data/checklist";
import { getGuideBySlug } from "../../_content/guides/catalog";
import { scholarships } from "../../_data/scholarships";

export type StudyLevel = "bachelor" | "master" | "phd";
export type StudyLanguage = "english" | "german" | "either" | "undecided";
export type StudentStage = "exploring" | "applying" | "accepted" | "inGermany";
export type StartSemester = "winter" | "summer" | "undecided";
export type Priority = "program" | "funding" | "applications" | "relocation" | "settling";

export type StudentPreferences = {
  studyLevel: StudyLevel;
  studyLanguage: StudyLanguage;
  stage: StudentStage;
  startSemester: StartSemester;
  startYear: number | null;
  priority: Priority;
};

export type RoadmapTask = {
  id: string;
  title: string;
  stageId: string;
  href: string;
};

export type RoadmapStage = {
  id: string;
  title: string;
  tasks: RoadmapTask[];
};

export type RecommendedResource = {
  title: string;
  description: string;
  href: string;
};

export const levelLabels: Record<StudyLevel, string> = {
  bachelor: "Licenciatura",
  master: "Maestría",
  phd: "Doctorado",
};

export const languageLabels: Record<StudyLanguage, string> = {
  english: "Inglés",
  german: "Alemán",
  either: "Inglés o alemán",
  undecided: "Por decidir",
};

export const stageLabels: Record<StudentStage, string> = {
  exploring: "Explorando opciones",
  applying: "Preparando solicitudes",
  accepted: "Con admisión",
  inGermany: "Ya en Alemania",
};

export const priorityLabels: Record<Priority, string> = {
  program: "Encontrar un programa",
  funding: "Financiamiento",
  applications: "Solicitudes",
  relocation: "Mudanza",
  settling: "Primeras semanas en Alemania",
};

const phaseIds: Record<string, string[]> = {
  "elegir-programa": ["definir-area", "buscar-programas", "revisar-requisitos-academicos", "revisar-ciudad-costos-fechas"],
  "preparar-documentos": ["pasaporte-vigente", "certificado-estudios", "kardex-transcript", "titulo-constancia", "cv-actualizado", "carta-motivacion", "traducciones-oficiales"],
  "buscar-becas": ["revisar-daad", "revisar-fundaciones", "revisar-becas-universidades", "anotar-deadlines"],
  "aplicar-universidad": ["crear-cuenta-portal", "revisar-uni-assist", "subir-documentos", "guardar-comprobantes", "revisar-correo"],
  "visa-mudanza": ["requisitos-consulado", "prueba-financiamiento", "seguro-medico", "buscar-alojamiento", "presupuesto-llegada"],
  "primeras-semanas": ["anmeldung", "activar-seguro", "cuenta-bancaria", "sim-plan-movil", "registro-universidad", "deutschlandticket"],
};

const phaseLinks: Record<string, string> = {
  "elegir-programa": "/buscadores",
  "preparar-documentos": "/guias",
  "buscar-becas": "/becas",
  "aplicar-universidad": "/buscadores",
  "visa-mudanza": "/buscadores",
  "primeras-semanas": "/guias/primeros-pasos-al-llegar-a-alemania",
};

const firstPhaseByStage: Record<StudentStage, number> = {
  exploring: 0,
  applying: 1,
  accepted: 4,
  inGermany: 5,
};

function taskTitle(id: string, fallback: string, language: StudyLanguage): string {
  const contextualTitles: Record<string, string> = {
    "requisitos-consulado": "Revisar requisitos consulares según tu país",
    "traducciones-oficiales": "Confirmar si necesitas traducciones oficiales",
    "revisar-uni-assist": "Comprobar si tu programa usa Uni-Assist",
    "cuenta-bancaria": "Revisar si necesitas abrir una cuenta bancaria",
  };
  if (id === "buscar-programas" && language === "english") return "Buscar programas en inglés";
  if (id === "buscar-programas" && language === "german") return "Buscar programas en alemán";
  return contextualTitles[id] ?? fallback;
}

export function buildRoadmap(preferences: StudentPreferences): RoadmapStage[] {
  return checklistSections.slice(firstPhaseByStage[preferences.stage]).map((section) => {
    const ids = phaseIds[section.id] ?? [];
    const tasks = section.items
      .filter((item) => ids.includes(item.id))
      .filter((item) => preferences.studyLevel !== "bachelor" || item.id !== "titulo-constancia")
      .map((item): RoadmapTask => ({
        id: item.id,
        title: taskTitle(item.id, item.label, preferences.studyLanguage),
        stageId: section.id,
        href: phaseLinks[section.id],
      }));

    if (section.id === "elegir-programa" && preferences.studyLanguage === "undecided") {
      tasks.unshift({ id: "mi-ruta-definir-idioma", title: "Definir el idioma de estudio que prefieres", stageId: section.id, href: "/buscadores" });
    }
    if (section.id === "elegir-programa" && preferences.studyLevel === "phd") {
      tasks.push({ id: "mi-ruta-investigar-supervision", title: "Investigar líneas de investigación y posibles opciones de supervisión", stageId: section.id, href: "/buscadores" });
    }

    return { id: section.id, title: section.title, tasks };
  });
}

export function getNextSteps(stages: RoadmapStage[], completedTaskIds: string[], priority: Priority): RoadmapTask[] {
  const incomplete = stages.flatMap((stage) => stage.tasks).filter((task) => !completedTaskIds.includes(task.id));
  const priorityPhase: Record<Priority, string> = {
    program: "elegir-programa",
    funding: "buscar-becas",
    applications: "aplicar-universidad",
    relocation: "visa-mudanza",
    settling: "primeras-semanas",
  };
  const priorityTask = incomplete.find((task) => task.stageId === priorityPhase[priority]);
  return [priorityTask, ...incomplete.filter((task) => task.id !== priorityTask?.id)]
    .filter((task): task is RoadmapTask => Boolean(task))
    .slice(0, 3);
}

export function getRecommendedGuides(preferences: StudentPreferences) {
  const slugs = preferences.stage === "inGermany"
    ? ["primeros-pasos-al-llegar-a-alemania", "cuanto-cuesta-estudiar-en-alemania"]
    : preferences.stage === "accepted"
      ? ["cuanto-cuesta-estudiar-en-alemania", "primeros-pasos-al-llegar-a-alemania"]
      : [
          "ausbildung-duales-studium-hochschule-universitat-tu-diferencias",
          ...(preferences.studyLevel === "master" ? ["como-buscar-maestrias-en-alemania"] : []),
          "cuanto-cuesta-estudiar-en-alemania",
        ];
  return slugs.map(getGuideBySlug).filter((guide) => guide !== undefined).slice(0, 3);
}

export function getRecommendedResources(preferences: StudentPreferences): RecommendedResource[] {
  const base: RecommendedResource[] = [
    { title: "Buscadores y fuentes oficiales", description: "Consulta portales de programas, solicitudes y trámites según tu situación.", href: "/buscadores" },
    { title: "Checklist general", description: "Una lista aparte para revisar todas las fases del proceso.", href: "/checklist" },
  ];
  if (preferences.priority === "funding" || preferences.stage === "exploring" || preferences.stage === "applying") {
    base.unshift({
      title: "Explorar becas",
      description: `${scholarships.length} fichas orientativas pendientes de verificación. Confirma elegibilidad y fechas en cada fuente oficial.`,
      href: "/becas",
    });
  }
  return base;
}

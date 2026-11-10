export const applicationStatuses = [
  "saved", "preparing", "ready", "submitted", "review", "accepted", "rejected", "waitlisted",
] as const;

export type ApplicationStatus = (typeof applicationStatuses)[number];
export type ApplicationFilter = "all" | ApplicationStatus;
export const applicationLevels = ["bachelor", "master", "phd", "undecided"] as const;
export type ApplicationLevel = (typeof applicationLevels)[number];
export type IntakeSemester = "winter" | "summer" | "";

export type ApplicationDocument = {
  id: string;
  name: string;
  completed: boolean;
};

export type ApplicationDraft = {
  universityName: string;
  programName: string;
  studyLevel: ApplicationLevel;
  city: string;
  officialProgramUrl: string;
  applicationPortalUrl: string;
  intakeSemester: IntakeSemester;
  intakeYear: number | null;
  deadline: string;
  notes: string;
};

export type UniversityApplication = ApplicationDraft & {
  id: string;
  status: ApplicationStatus;
  documents: ApplicationDocument[];
  createdAt: string;
  updatedAt: string;
};

export const statusLabels: Record<ApplicationStatus, string> = {
  saved: "Guardada",
  preparing: "Preparando documentos",
  ready: "Lista para enviar",
  submitted: "Enviada",
  review: "En revisión",
  accepted: "Aceptada",
  rejected: "Rechazada",
  waitlisted: "Lista de espera",
};

export const levelLabels: Record<ApplicationLevel, string> = {
  bachelor: "Licenciatura",
  master: "Maestría",
  phd: "Doctorado",
  undecided: "Por decidir",
};

export const suggestedDocuments = [
  "CV",
  "Carta de motivación",
  "Título o constancia de estudios",
  "Historial académico",
  "Certificado de idioma",
  "Copia de pasaporte",
] as const;

export const emptyDraft: ApplicationDraft = {
  universityName: "",
  programName: "",
  studyLevel: "undecided",
  city: "",
  officialProgramUrl: "",
  applicationPortalUrl: "",
  intakeSemester: "",
  intakeYear: null,
  deadline: "",
  notes: "",
};

export function isSafeExternalUrl(value: string): boolean {
  if (value.trim() === "") return true;
  if (/[\s\u0000-\u001f]/.test(value.trim())) return false;
  try {
    const url = new URL(value.trim());
    return (url.protocol === "https:" || url.protocol === "http:")
      && Boolean(url.hostname)
      && !url.username
      && !url.password;
  } catch {
    return false;
  }
}

export function isValidDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function validateDraft(draft: ApplicationDraft): string | null {
  if (!draft.universityName.trim()) return "Escribe el nombre de la universidad.";
  if (!draft.programName.trim()) return "Escribe el nombre del programa.";
  if (!applicationLevels.includes(draft.studyLevel)) return "Selecciona un nivel de estudios válido.";
  if (!isSafeExternalUrl(draft.officialProgramUrl) || !isSafeExternalUrl(draft.applicationPortalUrl)) {
    return "Los enlaces deben comenzar con http:// o https:// y no incluir credenciales.";
  }
  if (draft.intakeSemester !== "" && draft.intakeSemester !== "winter" && draft.intakeSemester !== "summer") {
    return "Selecciona un semestre válido.";
  }
  if (draft.intakeSemester === "" ? draft.intakeYear !== null : !Number.isInteger(draft.intakeYear) || (draft.intakeYear as number) < 2020 || (draft.intakeYear as number) > 2100) {
    return "Indica un año entre 2020 y 2100 para el semestre elegido, o deja ambos campos vacíos.";
  }
  if (draft.deadline && !isValidDate(draft.deadline)) return "Indica una fecha límite válida.";
  return null;
}

function cleanDraft(draft: ApplicationDraft): ApplicationDraft {
  return {
    ...draft,
    universityName: draft.universityName.trim(),
    programName: draft.programName.trim(),
    city: draft.city.trim(),
    officialProgramUrl: draft.officialProgramUrl.trim(),
    applicationPortalUrl: draft.applicationPortalUrl.trim(),
    notes: draft.notes.trim(),
  };
}

export function createApplication(draft: ApplicationDraft, id: string, now: string): UniversityApplication {
  const error = validateDraft(draft);
  if (error) throw new Error(error);
  return {
    ...cleanDraft(draft),
    id,
    status: "saved",
    documents: suggestedDocuments.map((name, index) => ({ id: `${id}:document:${index}`, name, completed: false })),
    createdAt: now,
    updatedAt: now,
  };
}

export function editApplication(application: UniversityApplication, draft: ApplicationDraft, now: string): UniversityApplication {
  const error = validateDraft(draft);
  if (error) throw new Error(error);
  return { ...application, ...cleanDraft(draft), updatedAt: now };
}

export function deleteApplication(applications: UniversityApplication[], id: string): UniversityApplication[] {
  return applications.filter((application) => application.id !== id);
}

export function runConfirmedDeletion(confirmed: boolean, remove: () => boolean): boolean {
  return confirmed ? remove() : true;
}

export function filterApplications(applications: UniversityApplication[], filter: ApplicationFilter): UniversityApplication[] {
  return applications.filter((application) => filter === "all" || application.status === filter);
}

export function changeStatus(application: UniversityApplication, status: ApplicationStatus, now: string): UniversityApplication {
  return { ...application, status, updatedAt: now };
}

export function addDocument(application: UniversityApplication, name: string, id: string, now: string): UniversityApplication {
  const trimmed = name.trim();
  if (!trimmed || application.documents.some((document) => document.name.toLocaleLowerCase("es") === trimmed.toLocaleLowerCase("es"))) {
    throw new Error("Escribe un nombre de documento nuevo.");
  }
  return { ...application, documents: [...application.documents, { id, name: trimmed, completed: false }], updatedAt: now };
}

export function editDocument(application: UniversityApplication, id: string, name: string, now: string): UniversityApplication {
  const trimmed = name.trim();
  if (!trimmed) throw new Error("El nombre del documento no puede quedar vacío.");
  if (application.documents.some((document) => document.id !== id && document.name.toLocaleLowerCase("es") === trimmed.toLocaleLowerCase("es"))) {
    throw new Error("Ya existe un documento con ese nombre.");
  }
  return { ...application, documents: application.documents.map((document) => document.id === id ? { ...document, name: trimmed } : document), updatedAt: now };
}

export function toggleDocument(application: UniversityApplication, id: string, now: string): UniversityApplication {
  return { ...application, documents: application.documents.map((document) => document.id === id ? { ...document, completed: !document.completed } : document), updatedAt: now };
}

export function removeDocument(application: UniversityApplication, id: string, now: string): UniversityApplication {
  return { ...application, documents: application.documents.filter((document) => document.id !== id), updatedAt: now };
}

export function sortByDeadline(applications: UniversityApplication[]): UniversityApplication[] {
  return [...applications].sort((a, b) => {
    if (!a.deadline) return b.deadline ? 1 : a.createdAt.localeCompare(b.createdAt);
    if (!b.deadline) return -1;
    return a.deadline.localeCompare(b.deadline) || a.createdAt.localeCompare(b.createdAt);
  });
}

export function upcomingDeadlines(applications: UniversityApplication[], today: string): UniversityApplication[] {
  return sortByDeadline(applications.filter((application) =>
    application.deadline >= today && ["saved", "preparing", "ready"].includes(application.status)
  ));
}

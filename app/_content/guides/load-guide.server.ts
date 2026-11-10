import { getGuideBySlug } from "./catalog";
import type { Guide, GuideArticle } from "./types";

type ArticleModule = { default: GuideArticle };

const articleLoaders: Record<string, () => Promise<ArticleModule>> = {
  "ausbildung-duales-studium-hochschule-universitat-tu-diferencias": () => import("./articles/ausbildung-duales-studium-hochschule-universitat-tu-diferencias"),
  "como-buscar-maestrias-en-alemania": () => import("./articles/como-buscar-maestrias-en-alemania"),
  "documentos-que-necesitas-desde-mexico": () => import("./articles/documentos-que-necesitas-desde-mexico"),
  "como-aplicar-mediante-uni-assist-desde-mexico": () => import("./articles/como-aplicar-mediante-uni-assist-desde-mexico"),
  "cuanto-cuesta-estudiar-en-alemania": () => import("./articles/cuanto-cuesta-estudiar-en-alemania"),
  "como-prepararte-para-la-visa-de-estudiante": () => import("./articles/como-prepararte-para-la-visa-de-estudiante"),
  "becas-para-mexicanos-por-donde-empezar": () => import("./articles/becas-para-mexicanos-por-donde-empezar"),
  "primeros-pasos-al-llegar-a-alemania": () => import("./articles/primeros-pasos-al-llegar-a-alemania"),
};

export async function loadPublishedGuide(slug: string): Promise<Guide | null> {
  const summary = getGuideBySlug(slug);
  if (!summary) return null;

  const load = articleLoaders[slug];
  if (!load) throw new Error(`Published guide has no article module: ${slug}`);
  const { default: article } = await load();
  return { ...summary, ...article };
}

export type UpdateCategory = "feature" | "improvement" | "fix" | "content";
export type IsoDate = `${number}-${number}-${number}`;

export type UpdateEntry = {
  id: string;
  publishedAt: IsoDate; // Check calendar validity before publishing.
  title: string;
  summary: string;
  category: UpdateCategory;
  status: "draft" | "published";
  relatedLink?: { label: string; href: `/${string}` | `https://${string}` };
};

// Publish only confirmed, dated changes. Do not infer releases from commits or monitoring reports.
export const updates: UpdateEntry[] = [];

export function getPublishedUpdates(entries: UpdateEntry[]): UpdateEntry[] {
  return entries
    .filter((entry) => entry.status === "published")
    .toSorted((first, second) => second.publishedAt.localeCompare(first.publishedAt));
}

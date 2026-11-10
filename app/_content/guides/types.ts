export type GuideText = string | { before: string; strong: string; after: string } | {
  parts: (string | { strong: string } | { em: string })[];
};

export type GuideSection = {
  title: string;
  paragraphs: GuideText[];
  bullets?: string[];
  table?: {
    columns: string[];
    rows: GuideText[][];
  };
};

export type GuideArticle = {
  intro: string;
  keyTakeaways: string[];
  checklistItems?: string[];
  sections: GuideSection[];
  relatedLinks?: { title: string; href: string }[];
};

export type GuideSource = {
  title: string;
  url: string;
  checkedAt: string | null;
};

export type GuideSummary = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  readingTime: string;
  tags: string[];
  author: string | null;
  kind: "informational" | "personal";
  status: "draft" | "published";
  publishedAt: string | null;
  updatedAt: string | null;
  reviewedAt: string | null;
  sources: GuideSource[];
};

export type Guide = GuideSummary & GuideArticle;

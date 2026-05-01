export type WPServiceView = {
  slug: string;
  tag: string;
  title: string;
  titleNote?: string;
  homeParagraph: string;
  detailParagraph: string;
  duration: string;
  imageSrc: string;
  badges: string[];
  categories: string[];
};

const DEFAULT_SERVICE_IMAGE = "/home/service1.svg";

type LooseRecord = Record<string, unknown>;

type WPService = {
  slug?: string;
  title?: { rendered?: string };
  content?: { rendered?: string };
  excerpt?: { rendered?: string };
  acf?: unknown;
  meta?: unknown;
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url?: string }>;
    "acf:term"?: Array<{ name?: string; slug?: string }>;
  };
};

function decodeHtmlEntities(input: string) {
  const named: Record<string, string> = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"',
    apos: "'",
    nbsp: " ",
  };

  return input.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (full, entity) => {
    if (entity.startsWith("#x") || entity.startsWith("#X")) {
      const code = Number.parseInt(entity.slice(2), 16);
      return Number.isFinite(code) ? String.fromCodePoint(code) : full;
    }
    if (entity.startsWith("#")) {
      const code = Number.parseInt(entity.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : full;
    }
    return named[entity] ?? full;
  });
}

function stripHtml(html: string) {
  const withoutTags = html.replace(/<[^>]*>/g, " ");
  return decodeHtmlEntities(withoutTags).replace(/\s+/g, " ").trim();
}

function extractParagraphs(html: string) {
  return html
    .split(/<\/p>/i)
    .map((chunk) => stripHtml(chunk))
    .filter(Boolean);
}

function toRecord(value: unknown): LooseRecord {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return value as LooseRecord;
}

function firstStringFromKeys(record: LooseRecord, keys: string[]) {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
}

function firstStringFromSources(sources: LooseRecord[], keys: string[]) {
  for (const source of sources) {
    const value = firstStringFromKeys(source, keys);
    if (value) return value;
  }
  return "";
}

function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === "string") return item.trim();
        if (typeof item === "number") return String(item);
        return "";
      })
      .filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

function inferAudienceFromTitle(title: string) {
  const t = title.toLowerCase();
  if (t.includes("kid") || t.includes("infant") || t.includes("child")) {
    return ["Kids", "Infants"];
  }
  return ["Women", "Men", "Seniors"];
}

export async function fetchWPServicesList({
  baseUrl,
  perPage,
}: {
  baseUrl: string;
  perPage: number;
}): Promise<WPServiceView[]> {
  const res = await fetch(
    `${baseUrl}/wp-json/wp/v2/services?status=publish&per_page=${perPage}&_embed`,
    { next: { revalidate: 300 } },
  );
  if (!res.ok) throw new Error("Failed to fetch WP services");

  const raw = (await res.json()) as unknown;
  if (!Array.isArray(raw)) throw new Error("Unexpected WP services response");

  return raw.map((service) => mapWPServiceToView(service as WPService));
}

function mapWPServiceToView(service: WPService): WPServiceView {
  const acf = toRecord(service.acf);
  const meta = toRecord(service.meta);
  const merged = { ...meta, ...acf };
  const serviceGroup = toRecord(merged.service_group ?? merged.serviceGroup);
  const sources = [serviceGroup, merged];

  const title = stripHtml(service.title?.rendered || "") || "Service";
  const contentHtml = service.content?.rendered || "";
  const excerptHtml = service.excerpt?.rendered || "";

  const topTag = firstStringFromSources(sources, [
      "top_tag",
      "topTag",
      "top-tag",
      "tag",
      "badge",
    ]);

  const titleNote = firstStringFromSources(sources, [
    "title_note",
    "titleNote",
    "title-note",
    "subheading",
    "subtitle",
  ]);

  const duration =
    firstStringFromSources(sources, [
      "time",
      "duration",
      "service_time",
      "service-time",
    ]) || "";

  const badges = toStringArray(
    serviceGroup.bottom_tags ??
      serviceGroup.bottomTags ??
      serviceGroup["bottom-tag"] ??
      serviceGroup.badges ??
      merged.bottom_tags ??
      merged.bottomTags ??
      merged["bottom-tag"] ??
      merged.badges ??
      merged.service_badges ??
      "",
  );

  const categoryFieldValues = toStringArray(
    serviceGroup.categories ??
      serviceGroup.category ??
      serviceGroup.service_categories ??
      merged.categories ??
      merged.category ??
      merged.service_categories ??
      "",
  );
  const embeddedCategoryNames =
    service._embedded?.["acf:term"]
      ?.map((term) => (term?.name || term?.slug || "").trim())
      .filter(Boolean) ?? [];
  const categories = embeddedCategoryNames.length
    ? embeddedCategoryNames
    : categoryFieldValues;

  const shortParagraphFromFields = firstStringFromSources(sources, [
    "paragraph",
    "short_paragraph",
    "card_paragraph",
    "summary",
    "summary_paragraph",
  ]);

  const longParagraphFromFields = firstStringFromSources(sources, [
    "top_big_paragraph",
    "topBigParagraph",
    "long_paragraph",
    "big_paragraph",
    "description",
    "detailed_paragraph",
  ]);

  const contentParagraphs = extractParagraphs(contentHtml);
  const contentFirst = contentParagraphs[0] || "";
  const contentCombined = contentParagraphs.join("\n\n");

  const homeParagraph =
    shortParagraphFromFields ||
    stripHtml(excerptHtml) ||
    contentFirst ||
    "Personalized homeopathic care tailored to your needs.";

  const detailParagraph =
    longParagraphFromFields ||
    contentCombined ||
    homeParagraph;

  const imageSrc =
    service._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    DEFAULT_SERVICE_IMAGE;

  const resolvedCategories = categories.length
    ? categories
    : inferAudienceFromTitle(title);
  const resolvedTag = topTag;
  const resolvedBadges = badges;

  return {
    slug: service.slug || "",
    tag: resolvedTag,
    title,
    titleNote: titleNote || undefined,
    homeParagraph,
    detailParagraph,
    duration,
    imageSrc,
    badges: resolvedBadges,
    categories: resolvedCategories,
  };
}

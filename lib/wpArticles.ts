export type WPArticleView = {
  slug: string;
  tag: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  author: string;
  imageSrc: string;
  contentHtml: string;
};

const DEFAULT_IMAGE = "/home/wellness1.svg";

type WPPost = {
  slug?: string;
  date?: string;
  title?: { rendered?: string };
  excerpt?: { rendered?: string };
  content?: { rendered?: string };
  _embedded?: {
    author?: Array<{ name?: string }>;
    "wp:featuredmedia"?: Array<{ source_url?: string }>;
    "wp:term"?: unknown;
  };
};

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function formatMonthYear(dateIso: string) {
  const d = new Date(dateIso);
  if (Number.isNaN(d.getTime())) return dateIso;
  return d.toLocaleString("en-US", { month: "long", year: "numeric" });
}

function estimateReadTime(words: number) {
  const wpm = 200;
  const minutes = Math.max(1, Math.ceil(words / wpm));
  return `${minutes} min read`;
}

function pickFirstTagFromEmbedded(post: WPPost): string {
  const embeddedTerms = post._embedded?.["wp:term"];
  if (!Array.isArray(embeddedTerms)) return "Article";

  // embeddedTerms is often an array-of-arrays; flatten it safely.
  const flattened: unknown[] = embeddedTerms.flatMap((x) => (Array.isArray(x) ? x : []));

  const categoryTerm = flattened.find((t) => {
    const record = t as Record<string, unknown>;
    return (
      record?.taxonomy === "category" && typeof record?.name === "string"
    );
  }) as { name?: string } | undefined;

  if (categoryTerm?.name) return categoryTerm.name;

  const anyNamedTerm = flattened.find((t) => typeof (t as Record<string, unknown>)?.name === "string") as
    | { name?: string }
    | undefined;
  return anyNamedTerm?.name || "Article";
}

export async function fetchWPArticlesList({
  baseUrl,
  perPage,
}: {
  baseUrl: string;
  perPage: number;
}): Promise<WPArticleView[]> {
  const res = await fetch(
    `${baseUrl}/wp-json/wp/v2/posts?status=publish&per_page=${perPage}&_embed`,
    { next: { revalidate: 300 } },
  );
  if (!res.ok) throw new Error("Failed to fetch WP articles");
  const rawPosts = (await res.json()) as unknown;
  if (!Array.isArray(rawPosts)) throw new Error("Unexpected WP posts response");

  return rawPosts
    .map((post) => mapWPPostToView(post as WPPost))
    .filter((article) => article.slug);
}

export async function fetchWPArticleBySlug({
  baseUrl,
  slug,
}: {
  baseUrl: string;
  slug: string;
}): Promise<WPArticleView | null> {
  const res = await fetch(
    `${baseUrl}/wp-json/wp/v2/posts?status=publish&slug=${encodeURIComponent(
      slug,
    )}&per_page=1&_embed`,
    { next: { revalidate: 300 } },
  );
  if (!res.ok) throw new Error("Failed to fetch WP article");
  const rawPosts = (await res.json()) as unknown;
  if (!Array.isArray(rawPosts) || rawPosts.length === 0) return null;
  return mapWPPostToView(rawPosts[0] as WPPost);
}

function mapWPPostToView(post: WPPost): WPArticleView {
  const title = stripHtml(post?.title?.rendered || "");
  const excerptHtml = post?.excerpt?.rendered || "";
  const description =
    stripHtml(excerptHtml) || stripHtml(post?.content?.rendered || "");

  const contentHtml = post?.content?.rendered || "";

  const authorName =
    post._embedded?.author?.[0]?.name || "Bless Homeopathy Team";

  const imageSrc =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || DEFAULT_IMAGE;

  const tag = pickFirstTagFromEmbedded(post);
  const date = formatMonthYear(post?.date || "");
  const words = stripHtml(post?.content?.rendered || "")
    .split(" ")
    .filter(Boolean).length;
  const readTime = estimateReadTime(words);

  return {
    slug:
      typeof post?.slug === "string" && post.slug.trim().length > 0
        ? post.slug
        : "",
    tag,
    title,
    description: description || "Health article from our clinic.",
    date,
    readTime,
    author: authorName,
    imageSrc,
    contentHtml,
  };
}


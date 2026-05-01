import { NextResponse } from "next/server";
import { fetchWPArticlesList, WPArticleView } from "@/lib/wpArticles";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const perPageRaw = url.searchParams.get("perPage");
  const perPage = perPageRaw ? Math.max(1, Number(perPageRaw)) : 3;
  const baseUrl = process.env.WP_API_BASE_URL;
  if (!baseUrl) {
    return NextResponse.json(
      { error: "Server misconfiguration: WP_API_BASE_URL is missing." },
      { status: 500 },
    );
  }

  try {
    const articles: WPArticleView[] = await fetchWPArticlesList({
      baseUrl,
      perPage,
    });

    return NextResponse.json(articles);
  } catch {
    return NextResponse.json(
      { error: "Failed to load articles." },
      { status: 500 },
    );
  }
}


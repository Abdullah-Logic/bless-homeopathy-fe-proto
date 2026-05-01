import { NextResponse } from "next/server";
import { fetchWPServicesList, WPServiceView } from "@/lib/wpServices";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const perPageRaw = url.searchParams.get("perPage");
  const perPage = perPageRaw ? Math.max(1, Number(perPageRaw)) : 50;
  const baseUrl = process.env.WP_API_BASE_URL;
  if (!baseUrl) {
    return NextResponse.json(
      { error: "Server misconfiguration: WP_API_BASE_URL is missing." },
      { status: 500 },
    );
  }

  try {
    const services: WPServiceView[] = await fetchWPServicesList({
      baseUrl,
      perPage,
    });
    return NextResponse.json(services);
  } catch {
    return NextResponse.json(
      { error: "Failed to load services." },
      { status: 500 },
    );
  }
}

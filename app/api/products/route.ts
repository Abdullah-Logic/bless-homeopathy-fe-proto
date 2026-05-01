import { NextResponse } from "next/server";

type WooTerm = {
  name: string;
  slug: string;
};

type WooImage = {
  src: string;
};

type WooProduct = {
  id: number;
  name: string;
  short_description: string;
  description: string;
  regular_price: string;
  sale_price: string;
  price: string;
  stock_status: "instock" | "outofstock" | "onbackorder";
  average_rating: string;
  rating_count: number;
  images: WooImage[];
  categories: WooTerm[];
  tags: WooTerm[];
};

type ProductCardData = {
  id: number;
  badge?: string;
  badgeClass?: string;
  stockLabel: string;
  title: string;
  description: string;
  price: string;
  oldPrice: string;
  off: string;
  rating: string;
  imageSrc: string;
  categories: string[];
};

const BADGE_STYLES: Record<string, string> = {
  bestseller: "bg-[#E12454] text-white",
  popular: "bg-[#E12454] text-white",
  new: "bg-[#E12454] text-white",
};

function stripHtml(input: string) {
  return input.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function formatPrice(value: number) {
  if (!Number.isFinite(value) || value <= 0) {
    return "";
  }
  return `$${Math.round(value)}`;
}

function getOffLabel(regular: number, sale: number) {
  if (!regular || !sale || sale >= regular) {
    return "";
  }
  const off = Math.round(((regular - sale) / regular) * 100);
  return `${off}% OFF`;
}

function mapProduct(product: WooProduct): ProductCardData {
  const regular = Number(product.regular_price || 0);
  const sale = Number(product.sale_price || 0);
  const current = sale > 0 ? sale : Number(product.price || regular || 0);
  const badgeTerm = product.tags.find((tag) =>
    ["bestseller", "popular", "new"].includes(tag.slug.toLowerCase()),
  );
  const rawDescription = stripHtml(
    product.short_description || product.description || "",
  );

  return {
    id: product.id,
    badge: badgeTerm?.name,
    badgeClass: badgeTerm ? BADGE_STYLES[badgeTerm.slug.toLowerCase()] : undefined,
    stockLabel: product.stock_status === "instock" ? "In Stock" : "Out of Stock",
    title: product.name,
    description: rawDescription || "Homeopathic product from our catalog.",
    price: formatPrice(current),
    oldPrice: sale > 0 ? formatPrice(regular) : "",
    off: getOffLabel(regular, sale),
    rating:
      product.rating_count > 0
        ? `${product.average_rating} (${product.rating_count})`
        : "New",
    imageSrc:
      product.images?.[0]?.src?.trim() || "/ecommerce/product-placeholder.jpg",
    categories: product.categories.map((category) => category.name),
  };
}

export async function GET() {
  const apiBase = process.env.NEXT_PUBLIC_WC_API_BASE;
  const consumerKey = process.env.WC_CONSUMER_KEY;
  const consumerSecret = process.env.WC_CONSUMER_SECRET;

  if (!apiBase || !consumerKey || !consumerSecret) {
    return NextResponse.json(
      { error: "Missing WooCommerce environment variables." },
      { status: 500 },
    );
  }

  const url = new URL(`${apiBase}/products`);
  url.searchParams.set("consumer_key", consumerKey);
  url.searchParams.set("consumer_secret", consumerSecret);
  url.searchParams.set("status", "publish");
  url.searchParams.set("per_page", "100");
  url.searchParams.set("orderby", "date");
  url.searchParams.set("order", "desc");

  try {
    const response = await fetch(url.toString(), {
      // Keep data fresh while avoiding per-request origin hits.
      next: { revalidate: 120 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch WooCommerce products." },
        { status: response.status },
      );
    }

    const products = (await response.json()) as WooProduct[];
    return NextResponse.json(products.map(mapProduct));
  } catch {
    return NextResponse.json(
      { error: "Unexpected error while loading products." },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";

type CartItem = {
  id: number; // Woo product id
  quantity: number;
  unitPrice: number;
  title: string;
  imageSrc: string;
};

type CheckoutBilling = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address_1: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
};

export async function POST(req: Request) {
  const apiBase = process.env.NEXT_PUBLIC_WC_API_BASE;
  const consumerKey = process.env.WC_CONSUMER_KEY;
  const consumerSecret = process.env.WC_CONSUMER_SECRET;

  if (!apiBase || !consumerKey || !consumerSecret) {
    return NextResponse.json(
      { error: "Missing WooCommerce environment variables." },
      { status: 500 },
    );
  }

  const body = (await req.json()) as {
    items?: CartItem[];
    billing?: Partial<CheckoutBilling>;
    customer_note?: string;
  };

  const items = Array.isArray(body.items) ? body.items : [];
  if (items.length === 0) {
    return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
  }

  // Woo expects line items as: { product_id, quantity }.
  const line_items = items.map((item) => ({
    product_id: item.id,
    quantity: Math.max(1, Math.floor(item.quantity || 1)),
  }));

  const billing: CheckoutBilling = {
    first_name: body.billing?.first_name || "",
    last_name: body.billing?.last_name || "",
    email: body.billing?.email || "",
    phone: body.billing?.phone || "",
    address_1: body.billing?.address_1 || "",
    city: body.billing?.city || "",
    state: body.billing?.state || "",
    postcode: body.billing?.postcode || "",
    country: body.billing?.country || "CA",
  };

  // Minimal order payload based on common WooCommerce REST requirements.
  const payload = {
    payment_method: "cod",
    payment_method_title: "Cash on delivery",
    set_paid: false,
    billing,
    shipping: {
      ...billing,
    },
    line_items,
    customer_note: body.customer_note || "",
  };

  const url = new URL(`${apiBase}/orders`);
  url.searchParams.set("consumer_key", consumerKey);
  url.searchParams.set("consumer_secret", consumerSecret);

  const response = await fetch(url.toString(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to create WooCommerce order.", details: data },
      { status: response.status },
    );
  }

  return NextResponse.json({ order: data });
}


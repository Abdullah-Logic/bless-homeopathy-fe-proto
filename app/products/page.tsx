"use client";

import {
  ShoppingCart,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  Package,
  Leaf,
  Award,
  Filter,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type ProductCardData = {
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
};

const productFilters = [
  "All Products",
  "Acute Care",
  "Chronic Care",
  "Immunity Boosters",
  "Wellness",
];

const products: ProductCardData[] = [
  {
    badge: "Bestseller",
    badgeClass: "bg-[#E12454] text-white",
    stockLabel: "In Stock",
    title: "Arnica Montana 200CH",
    description:
      "Effective for trauma, bruises, muscle soreness, and post-surgical recovery.",
    price: "$299",
    oldPrice: "$399",
    off: "25% OFF",
    rating: "4.8 (245)",
    imageSrc: "/ecommerce/product-01.jpg",
  },
  {
    stockLabel: "In Stock",
    title: "Immune Boost Formula",
    description:
      "Natural immunity enhancer with Echinacea and Thuja complex for strong defense.",
    price: "$549",
    oldPrice: "$699",
    off: "21% OFF",
    rating: "4.9 (389)",
    imageSrc: "/ecommerce/product-02.jpg",
  },
  {
    badge: "Popular",
    badgeClass: "bg-[#E12454] text-white",
    stockLabel: "In Stock",
    title: "Stress Relief Complex",
    description:
      "Gentle homeopathic blend for anxiety, stress, and emotional balance.",
    price: "$449",
    oldPrice: "$549",
    off: "18% OFF",
    rating: "4.7 (178)",
    imageSrc: "/ecommerce/product-03.jpg",
  },
  {
    badge: "New",
    badgeClass: "bg-[#E12454] text-white",
    stockLabel: "In Stock",
    title: "Rhus Tox 30CH",
    description:
      "Relief for joint pain, arthritis, and rheumatic conditions naturally.",
    price: "$249",
    oldPrice: "$329",
    off: "24% OFF",
    rating: "4.6 (156)",
    imageSrc: "/ecommerce/product-04.jpg",
  },
  {
    badge: "Bestseller",
    badgeClass: "bg-[#E12454] text-white",
    stockLabel: "In Stock",
    title: "Digestive Wellness Kit",
    description:
      "Complete digestive support with Nux Vomica, Lycopodium, and Carbo Veg.",
    price: "$799",
    oldPrice: "$999",
    off: "20% OFF",
    rating: "4.9 (412)",
    imageSrc: "/ecommerce/product-05.jpg",
  },
  {
    stockLabel: "In Stock",
    title: "Pulsatilla 200CH",
    description:
      "Women's health remedy for hormonal balance and menstrual wellness.",
    price: "$349",
    oldPrice: "$449",
    off: "22% OFF",
    rating: "4.8 (267)",
    imageSrc: "/ecommerce/product-06.jpg",
  },
  {
    badge: "Popular",
    badgeClass: "bg-[#E12454] text-white",
    stockLabel: "In Stock",
    title: "Children's Health Kit",
    description:
      "Safe and gentle remedies for common childhood ailments and immunity.",
    price: "$649",
    oldPrice: "$799",
    off: "19% OFF",
    rating: "4.9 (523)",
    imageSrc: "/ecommerce/product-07.jpg",
  },
  {
    stockLabel: "In Stock",
    title: "Sleep Support Formula",
    description:
      "Natural sleep aid with Coffea Cruda and Passiflora for restful nights.",
    price: "$399",
    oldPrice: "$499",
    off: "20% OFF",
    rating: "4.7 (198)",
    imageSrc: "/ecommerce/product-08.jpg",
  },
];

const whyShopBullets = [
  {
    icon: Leaf,
    title: "Clinically informed selection",
    text: "Each product line is curated around common wellness goals, with clear usage notes and transparent labeling to help you choose confidently.",
  },
  {
    icon: Award,
    title: "Quality-first sourcing",
    text: "We work with trusted manufacturers that follow consistent preparation standards and documented quality controls for every batch.",
  },
  {
    icon: ShieldCheck,
    title: "Guidance you can use",
    text: "Product pages and packaging include straightforward dosage guidance, care notes, and practical tips for first-time buyers.",
  },
];

const shopperAssurances = [
  {
    icon: Truck,
    title: "Fast dispatch",
    detail: "Orders typically ship within 24-48 hours with tracking updates.",
  },
  {
    icon: RotateCcw,
    title: "Simple returns",
    detail: "30-day return support for eligible unopened products.",
  },
  {
    icon: Package,
    title: "Secure packaging",
    detail: "Protective packing keeps remedies safe during transit.",
  },
  {
    icon: ShieldCheck,
    title: "Protected checkout",
    detail: "Encrypted payments and trusted payment gateways.",
  },
];

export default function EcommercePage() {
  const [activeProductFilter, setActiveProductFilter] =
    useState("All Products");
  return (
    <main className="min-h-screen bg-white">
      <section className="relative text-white">
        <div className="relative min-h-[min(320px,46vh)] w-full overflow-hidden bg-[#7BB153]">
          <div className="relative z-10 mx-auto flex min-h-[min(320px,46vh)] max-w-325 items-center justify-center px-4 py-10 text-center sm:px-6 lg:px-8">
            <div className="flex max-w-170 flex-col items-center text-white">
              <p className="text-sm font-medium text-white">Home {">"} Products</p>
              <h1 className="mt-4 text-[32px] font-black uppercase leading-[1.05] tracking-[-0.03em] sm:text-[42px] lg:text-[50px]">
                Our Products
              </h1>
              <p className="mx-auto mt-5 max-w-120 text-[18px] font-semibold leading-snug">
                Explore our curated range of homeopathic remedies and wellness
                essentials selected for everyday care.
              </p>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center px-4">
          <div className="pointer-events-auto flex w-full max-w-325 translate-y-1/2 justify-center sm:px-6 lg:px-8">
            <div className="grid w-full max-w-md grid-cols-3 gap-3 rounded-2xl border border-[#e6edf2] bg-white p-4 shadow-[0_16px_44px_rgba(15,35,68,0.16)] md:max-w-sm">
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-wide text-[#7b8a98]">
                  SKU
                </p>
                <p className="mt-1 text-lg font-bold tabular-nums text-[#1e3d52]">
                  120+
                </p>
              </div>
              <div className="border-x border-[#e6edf2] text-center">
                <p className="text-[10px] uppercase tracking-wide text-[#7b8a98]">
                  Rating
                </p>
                <p className="mt-1 flex items-center justify-center gap-1 text-lg font-bold tabular-nums text-[#1e3d52]">
                  4.8 <Star className="size-4 fill-amber-400 text-amber-400" />
                </p>
              </div>
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-wide text-[#7b8a98]">
                  Ships
                </p>
                <p className="mt-1 text-lg font-bold text-[#1e3d52]">48h</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="scroll-mt-20 bg-white">
        <div className="mx-auto max-w-295 px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FDF2F8] px-4 py-1.75 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#EC4899]">
              <Package size={15} /> Our Products
            </div>
            <h2 className="mt-5 text-[32px] font-bold leading-tight tracking-[-0.04em] sm:text-[44px] text-[#1E4A8A]">
              Premium homeopathic remedies
            </h2>
            <p className="mx-auto mt-3 max-w-160 text-[15px] leading-[1.7] text-[#1E4A8A]">
              Carefully curated natural medicines prepared to high quality
              standards.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 text-[12px]">
            <div className="mr-1 inline-flex items-center gap-2 font-medium text-[#6b7783]">
              <Filter className="h-3.5 w-3.5" />
              Filter:
            </div>
            {productFilters.map((filter) => {
              const active = activeProductFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveProductFilter(filter)}
                  className={`rounded-lg px-4 py-2 font-semibold transition ${
                    active
                      ? "bg-[#6ba86a] text-white shadow-[0_10px_20px_rgba(107,168,106,0.3)]"
                      : "bg-white text-[#54606e] shadow-[0_4px_10px_rgba(0,0,0,0.05)] ring-1 ring-[#edf0f2]"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5">
            {products.map((product) => (
              <article
                key={product.title}
                className="flex flex-col overflow-hidden rounded-[0.8rem] bg-white shadow-[0_8px_18px_rgba(32,49,77,0.1)] ring-1 ring-[#ebeff3]"
              >
                <div className="relative h-34 bg-[#f6f9fc]">
                  <Image
                    src={product.imageSrc}
                    alt=""
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 100vw, 280px"
                  />
                  {product.badge ? (
                    <span
                      className={`absolute left-2.5 top-2.5 rounded-full px-2 py-1 text-xs font-semibold leading-none ${product.badgeClass}`}
                    >
                      {product.badge}
                    </span>
                  ) : null}
                  <span className="absolute right-2.5 top-2.5 rounded-full bg-[#26B56A] px-2 py-1 text-xs font-semibold leading-none text-white">
                    {product.stockLabel}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-3.5">
                  <h3 className="font-semibold leading-snug text-[#25486A]">
                    {product.title}
                  </h3>
                  <p className="mt-1.5 flex-1 text-sm leading-[1.45] text-[#8a98a7]">
                    {product.description}
                  </p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <div className="flex items-center gap-0.5 text-[#f3ba2f]">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className="h-4 w-4 fill-current"
                          strokeWidth={0}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-[#95a1ad]">
                      {product.rating}
                    </span>
                  </div>
                  <div className="mt-2.5 flex items-center gap-1.5">
                    <span className="text-xl font-bold leading-none tracking-[-0.02em] text-[#1d3e5b]">
                      {product.price}
                    </span>
                    <span className="text-[#c3cad1] line-through">
                      {product.oldPrice}
                    </span>
                    <span className="ml-auto rounded-full bg-[#E8F8E2] px-2 py-1 text-xs font-bold tracking-wide text-[#4EA63F]">
                      {product.off}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-[#E12454] px-3 py-2 text-xs font-semibold tracking-[0.02em] text-white transition hover:bg-[#E12454]/90"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#E12454] px-6 py-3 text-[13px] font-semibold text-white shadow-[0_12px_28px_rgba(225,36,84,0.28)] transition hover:bg-[#E12454]/90"
            >
              View all products
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <section id="why-us" className="scroll-mt-20 bg-[#F9F9F9]">
        <div className="mx-auto max-w-295 px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FDF2F8] px-4 py-1.75 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#EC4899]">
              <ShieldCheck size={15} /> Why Choose Us
            </div>
            <h2 className="mt-5 text-[32px] font-bold leading-tight tracking-[-0.04em] text-[#1E4A8A] sm:text-[44px]">
              Built for confident shopping
            </h2>
            <p className="mx-auto mt-3 max-w-170 text-[15px] leading-[1.7] text-[#1E4A8A]">
              From product quality to delivery support, every step is designed
              to make remedy shopping simpler, safer, and more reliable.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {shopperAssurances.map(({ icon: Icon, title, detail }) => (
              <div
                key={title}
                className="rounded-2xl bg-white p-5 shadow-[0_10px_24px_rgba(29,47,77,0.06)] ring-1 ring-[#edf0f3]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef6ff] text-[#5a8fc4]">
                  <Icon className="h-4.5 w-4.5" strokeWidth={1.9} />
                </div>
                <h3 className="mt-3 text-[16px] font-bold text-[#1e3d52]">
                  {title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-[1.55] text-[#6b7783]">
                  {detail}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {whyShopBullets.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl bg-white p-6 text-center shadow-[0_12px_24px_rgba(29,47,77,0.06)] ring-1 ring-[#edf0f3] md:text-left"
              >
                <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#FDF2F8] text-[#EC4899] md:mx-0">
                  <Icon className="size-5" strokeWidth={1.8} />
                </div>
                <h3 className="text-lg font-semibold text-[#1e3d52]">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6b7783]">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

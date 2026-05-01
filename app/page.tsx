"use client";

import Image from "next/image";
import Link from "next/link";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useRef, useState } from "react";
import { parseMoneyLabel, useCart } from "@/components/cart/CartProvider";
import {
  ArrowRight,
  Baby,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Filter,
  Mail,
  MapPin,
  Minus,
  Phone,
  Plus,
  ShoppingCart,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  Truck,
  Users,
  PhoneCall,
  Shield,
  Quote,
  UserCheck,
  HeartPulse,
  ClipboardList,
  Leaf,
  HandHeart,
  Calendar,
  Package,
  Tag,
  Briefcase,
  CalendarPlus,
} from "lucide-react";
import { clinicInfo } from "@/lib/shopData";
import type { WPArticleView } from "@/lib/wpArticles";
import type { WPServiceView } from "@/lib/wpServices";

const HERO_IMAGES = [
  "/home/header-bg-1.svg",
  "/home/header-bg-2.svg",
  "/home/header-bg-3.svg",
];

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

const serviceFilters = [
  "All Services",
  "Infants",
  "Kids",
  "Women",
  "Men",
  "Seniors",
];

const productFilters = [
  "All Products",
  "Acute Care",
  "Chronic Care",
  "Immunity Boosters",
  "Wellness",
];

const testimonials = [
  {
    name: "Jessica L.",
    highlight: "Immune Support",
    text: "My son was always getting sick, and I wanted a natural solution. Bless Homeopathy was the answer. The remedies have strengthened his immune system, and he's been healthier than ever. Dr. Nasreen is amazing with kids!",
  },
  {
    name: "Sarah M.",
    highlight: "Anxiety Treatment",
    text: "After struggling with anxiety for years, I was skeptical about trying homeopathy. But Dr. Nasreen's personalized approach and care made a huge difference. The remedies have been life-changing, giving me peace of mind without any side effects.",
  },
  {
    name: "Melissa T.",
    highlight: "Childhood Allergies",
    text: "My 7-year-old was constantly suffering from allergies, and nothing seemed to help. After our first consultation at Bless Homeopathy, we saw a noticeable improvement. The natural remedies are gentle yet effective, and I feel confident knowing they're safe for my child.",
  },
];

const successStories = [
  {
    patient: "Sushmanth T.",
    focus: "Hair loss",
    plan: "8 sessions",
    quote:
      "I'm really happy with the treatment-it made a meaningful difference in my confidence alongside supportive homeopathic care.",
  },
  {
    patient: "Martha P.",
    focus: "Seasonal allergies",
    plan: "6 sessions",
    quote:
      "Symptoms that used to disrupt my day now stay controlled, and I feel more energetic and comfortable throughout the season.",
  },
  {
    patient: "Liam R.",
    focus: "Digestive discomfort",
    plan: "10 sessions",
    quote:
      "The personalized plan was easy to follow and gave me steady improvement without harsh side effects.",
  },
];

const whyChooseItems = [
  {
    title: "Expertise You Can Trust",
    text: "Dr. Nasreen brings years of experience and a deep understanding of homeopathy, ensuring you receive the highest standard of care.",
    icon: UserCheck,
  },
  {
    title: "Holistic Approach",
    text: "We believe in treating the whole person, not just the symptoms. Our holistic approach considers your physical, emotional, and mental well-being.",
    icon: HeartPulse,
  },
  {
    title: "Personalized Treatment Plans",
    text: "Every individual is unique. We tailor our treatment plans to meet your specific needs and health goals, ensuring a customized approach to your care.",
    icon: ClipboardList,
  },
  {
    title: "Safe and Natural Remedies",
    text: "Our remedies are safe, gentle, and derived from natural sources, promoting healing without harmful side effects.",
    icon: Leaf,
  },
  {
    title: "Supportive Environment",
    text: "We provide a welcoming and supportive atmosphere where you can feel comfortable discussing your health concerns and receiving compassionate care.",
    icon: HandHeart,
  },
];

const faqs = [
  {
    question: "01. What is homeopathy, and how does it work?",
    answer:
      "Homeopathy is a holistic healing system that uses highly diluted substances to stimulate the body's natural healing processes. It works by addressing the underlying causes of illness rather than just the symptoms, promoting balance and well-being.",
  },
  {
    question:
      "02. How long does it take to see results from homeopathic treatment?",
    answer:
      "Results vary depending on the condition and your individual response. Acute concerns may improve quickly, while chronic patterns often need a longer, more steady course of treatment.",
  },
  {
    question: "03. Is homeopathy safe for everyone?",
    answer:
      "Homeopathic remedies are generally gentle and commonly used across age groups when selected carefully as part of an appropriate treatment plan.",
  },
  {
    question: "04. What conditions can homeopathy support?",
    answer:
      "Homeopathy is often used to support a wide range of concerns, including allergies, digestive discomfort, stress-related symptoms, skin issues, and recurring seasonal problems. Your practitioner will assess your case individually before recommending a plan.",
  },
  {
    question: "05. How often are follow-up visits needed?",
    answer:
      "Follow-up frequency depends on your condition, response to treatment, and goals. Some patients need closer short-term reviews, while others move to wider check-ins once progress becomes stable.",
  },
  {
    question: "06. Do you offer consultations for children and seniors?",
    answer:
      "Yes. Care is available for different age groups, including children and seniors, with treatment plans adapted to age, health history, and individual sensitivity.",
  },
];

const FALLBACK_PRODUCTS: ProductCardData[] = [];

const getServiceAudience = (serviceTitle: string) => {
  const normalized = serviceTitle.toLowerCase();
  if (normalized.includes("kids") || normalized.includes("child"))
    return "Kids";
  return "Adults";
};

const pickServiceIcon = (service: WPServiceView) => {
  const categories = service.categories.map((category) => category.toLowerCase());
  if (categories.includes("infants") || categories.includes("kids")) return Baby;
  if (categories.includes("women")) return HeartPulse;
  if (categories.includes("men")) return UserCheck;
  if (categories.includes("seniors")) return Users;
  return Stethoscope;
};

export default function HomePage() {
  const [activeServiceFilter, setActiveServiceFilter] =
    useState("All Services");
  const [activeProductFilter, setActiveProductFilter] =
    useState("All Products");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [heroIndex, setHeroIndex] = useState(0);
  const [successStoryIndex, setSuccessStoryIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const { addItem, lastAddedItemId } = useCart();
  const [services, setServices] = useState<WPServiceView[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [servicesError, setServicesError] = useState("");
  const [products, setProducts] =
    useState<ProductCardData[]>(FALLBACK_PRODUCTS);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState("");
  const blogCarouselRef = useRef<HTMLDivElement | null>(null);
  const [canScrollBlogsLeft, setCanScrollBlogsLeft] = useState(false);
  const [canScrollBlogsRight, setCanScrollBlogsRight] = useState(false);

  const [wpArticles, setWpArticles] = useState<WPArticleView[]>([]);
  const [isLoadingWpArticles, setIsLoadingWpArticles] = useState(true);
  const [wpArticlesError, setWpArticlesError] = useState<string | null>(null);
  const visibleServices = services.filter((service) => {
    if (activeServiceFilter === "All Services") return true;
    const normalizedCategories = service.categories.map((category) =>
      category.toLowerCase(),
    );
    const audience = getServiceAudience(service.title);
    if (activeServiceFilter === "Kids" || activeServiceFilter === "Infants") {
      return (
        normalizedCategories.includes("kids") ||
        normalizedCategories.includes("infants") ||
        audience === "Kids"
      );
    }
    if (
      activeServiceFilter === "Women" ||
      activeServiceFilter === "Men" ||
      activeServiceFilter === "Seniors"
    ) {
      return (
        normalizedCategories.includes(activeServiceFilter.toLowerCase()) ||
        normalizedCategories.includes("adults") ||
        audience === "Adults"
      );
    }
    return true;
  });
  const visibleProducts = products
    .filter((product) => {
      if (activeProductFilter === "All Products") return true;
      return product.categories.some(
        (category) =>
          category.toLowerCase() === activeProductFilter.toLowerCase(),
      );
    })
    .slice(0, 4);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  const scrollBlogs = (direction: "left" | "right") => {
    const container = blogCarouselRef.current;
    if (!container) return;
    const amount = container.clientWidth * 0.92;
    container.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const updateBlogScrollButtons = () => {
    const container = blogCarouselRef.current;
    if (!container) return;
    const maxLeft = container.scrollWidth - container.clientWidth;
    setCanScrollBlogsLeft(container.scrollLeft > 4);
    setCanScrollBlogsRight(container.scrollLeft < maxLeft - 4);
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: { "cal-brand": "#5E7348" },
          dark: { "cal-brand": "#5E7348" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadServices() {
      try {
        setIsLoadingServices(true);
        setServicesError("");
        const response = await fetch("/api/services?perPage=50", {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error("Could not load services");
        }
        const data = (await response.json()) as WPServiceView[];
        setServices(data);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setServicesError(
            "We are unable to load services right now.",
          );
          setServices([]);
        }
      } finally {
        setIsLoadingServices(false);
      }
    }

    loadServices();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        setIsLoadingProducts(true);
        setProductsError("");
        const response = await fetch("/api/products", {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error("Could not load homepage products");
        }
        const data = (await response.json()) as ProductCardData[];
        setProducts(data);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setProductsError(
            "We are unable to load products right now. Please try again shortly.",
          );
          setProducts(FALLBACK_PRODUCTS);
        }
      } finally {
        setIsLoadingProducts(false);
      }
    }

    loadProducts();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadArticles() {
      try {
        setIsLoadingWpArticles(true);
        setWpArticlesError(null);
        const res = await fetch("/api/wp-articles?perPage=50", {
          signal: controller.signal,
        });
        if (!res.ok) {
          throw new Error("Could not load articles");
        }
        const data = (await res.json()) as WPArticleView[];
        setWpArticles(data);
      } catch (e) {
        if ((e as Error).name !== "AbortError") {
          setWpArticlesError(
            (e as Error).message || "We are unable to load articles right now.",
          );
          setWpArticles([]);
        }
      } finally {
        setIsLoadingWpArticles(false);
      }
    }

    loadArticles();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    updateBlogScrollButtons();
    window.addEventListener("resize", updateBlogScrollButtons);
    return () => window.removeEventListener("resize", updateBlogScrollButtons);
  }, [wpArticles.length, isLoadingWpArticles]);

  useEffect(() => {
    const container = blogCarouselRef.current;
    if (!container || wpArticles.length === 0) return;
    container.scrollLeft = container.scrollWidth / 3;
  }, [wpArticles.length]);

  return (
    <main className="min-h-screen bg-white text-[#2a3f52]">
      <section className="relative">
        <div className="relative min-h-[min(520px,78vh)] w-full overflow-hidden">
          {HERO_IMAGES.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt=""
              fill
              priority={index === 0}
              className={`pointer-events-none object-cover object-center transition-opacity duration-500 ${
                heroIndex === index ? "opacity-100" : "opacity-0"
              }`}
              sizes="100vw"
            />
          ))}
          <div className="relative z-10 mx-auto flex min-h-[min(520px,78vh)] max-w-325 items-center px-4 pb-32 pt-16 sm:px-6 lg:px-8 lg:pb-36 lg:pt-20">
            <div className="max-w-140 text-white">
              <p className="text-sm font-medium text-white">
                Welcome to Bless Homeopathy
              </p>
              <h1 className="mt-4 text-[32px] font-black uppercase leading-[1.05] tracking-[-0.03em] sm:text-[42px] lg:text-[50px]">
                Don&apos;t let your life pause, treat the root cause
              </h1>
              <p className="mt-5 max-w-120 text-[18px] font-semibold leading-snug">
                We&apos;ve 25 Years of experience in Homeopathic Services.
              </p>
              <Link
                href="/contact-us#appointment"
                className="btn-gradient-pink mt-8 inline-flex items-center gap-3 rounded-xl px-7 py-3.5 text-[14px] font-semibold text-white transition"
              >
                Contact Us
                <span className="text-white/90">|</span>
                <span className="text-[18px] leading-none">+</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center px-4">
          <div className="pointer-events-auto grid w-full max-w-290 grid-cols-1 gap-3 translate-y-[38%] sm:translate-y-1/2 lg:grid-cols-2 lg:gap-6">
            {[
              {
                title: "Get Appointment",
                subtitle: "Get a free first consultation.",
                action: "Learn More",
                icon: CalendarPlus,
                href: "/contact-us#appointment",
              },
              {
                title: "Our Services",
                subtitle: "Explore the solutions we offer",
                action: "Learn More",
                icon: Briefcase,
                href: "/our-services",
              },
            ].map(({ title, subtitle, action, icon: Icon, href }) => (
              <div
                key={title}
                className="flex flex-row items-center justify-between gap-3 overflow-hidden rounded-xl bg-white px-4 py-3.5 shadow-[0_10px_28px_rgba(15,35,68,0.15)] sm:rounded-2xl sm:px-6 sm:py-5 sm:shadow-[0_16px_44px_rgba(15,35,68,0.16)]"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="text-(--brand-green)">
                    <Icon
                      size={36}
                      strokeWidth={1.6}
                      className="sm:h-12 sm:w-12"
                    />
                  </div>
                  <div className="min-w-0 text-(--brand-green)">
                    <h3 className="text-[18px] leading-tight sm:text-2xl">
                      {title}
                    </h3>
                    <p className="mt-0.5 text-[12px] sm:mt-1 sm:text-sm">
                      {subtitle}
                    </p>
                  </div>
                </div>
                <div className="flex h-10 w-[0.5px] items-center justify-center bg-[#063E60]/70" />
                <div className="flex shrink-0 items-center">
                  <Link
                    href={href}
                    className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#063E60] sm:text-[13px]"
                  >
                    {action}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 pb-20 pt-50 sm:px-6 lg:px-8 lg:pt-32">
        <div className="mx-auto grid max-w-295 gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="relative mx-auto w-full max-w-140 lg:mx-0">
            <div className="relative aspect-5/4 w-full overflow-hidden">
              <Image
                src="/home/about-collage.svg"
                alt="About our homeopathy clinic and community"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 560px"
              />
            </div>
          </div>

          <div className="max-w-140 lg:justify-self-end relative isolate">
            <p className="pointer-events-none -z-10 select-none text-[11rem] font-bold tracking-widest text-transparent bg-clip-text bg-linear-to-b from-[#F1F2F3] via-[#F1F2F3]/45 to-transparent absolute left-1/2 -translate-x-1/2 -top-25">
              About
            </p>
            <h2 className="mt-3 text-[28px] font-bold leading-tight tracking-[-0.03em] sm:text-[36px] text-[#E12454]">
              About Bless Homeopathy
            </h2>
            <p className="mt-6 text-[15px] leading-[1.75] text-[#5a6772]">
              Homeopathy is a gentle, holistic system of medicine that treats
              the symptoms of the mind and the body as a totality. It is an
              effective system of medicine that addresses the disease within the
              body. Homeopathy stimulates the body to heal without any side
              effects.It is safe for everyone, the young, the elderly, pregnant
              women and even animals, it is a powerful method of healing.
            </p>
            <p className="mt-5 text-[15px] leading-[1.75] text-[#5a6772]">
              Homeopathic remedies are prepared from natural substances such as
              plants, minerals etc. They come in the form of small pills that
              dissolve under the tongue.
            </p>
            <p className="mt-5 text-[15px] leading-[1.75] text-[#5a6772]">
              Homeopathy is used in over 80 countries around the world, mainly
              Europe, South America and India. The British Royal Family have
              endorsed and used homeopathy since the early 1800&apos;s. The
              Queen Mother was treated with homeopathic medicine all her life
              and lived to the age of 101!
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link
                href="/contact-us#appointment"
                className="btn-gradient-pink inline-flex items-center gap-3 rounded-xl px-6 py-3 text-[14px] font-semibold text-white transition"
              >
                Get Appointment
                <span className="text-white/90">|</span>
                <span className="text-[18px] leading-none">+</span>
              </Link>
              <div className="inline-flex items-center gap-2 text-lg font-bold text-[#2a4a66]">
                <span className="text-[#E12454]">
                  <PhoneCall size={30} />
                </span>
                <a href={clinicInfo.phoneHref}>{clinicInfo.phoneDisplay}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[radial-gradient(circle_at_15%_15%,#ffffff_0%,#f2f8ff_24%,transparent_45%),linear-gradient(120deg,#dcecff_0%,#eff7ff_45%,#e7f8dc_100%)] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-295">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FDF2F8] px-4 py-1.75 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#EC4899] ring-1 ring-[#f8d8e8] shadow-[0_8px_18px_rgba(236,72,153,0.16)]">
              <Star className="h-3 w-3 text-[#EC4899]" />
              Our Services
            </div>
            <h2 className="mt-5 text-[32px] font-bold leading-tight tracking-[-0.04em] text-[#1E4A8A] sm:text-[44px]">
              Service We Provide
            </h2>
            <p className="mx-auto mt-3 max-w-160 text-[15px] leading-[1.7] text-[#1E4A8A]">
              Comprehensive homeopathic healthcare services tailored to your
              unique needs, from acute care to specialized treatments for all
              ages.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            {serviceFilters.map((filter) => {
              const active = activeServiceFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveServiceFilter(filter)}
                  className={`rounded-2xl px-6 py-2 text-[12px] font-semibold transition ${
                    active
                      ? "bg-(--brand-green) text-white shadow-[0_10px_22px_rgba(94,115,72,0.35)]"
                      : "bg-white text-[#54606e] shadow-[0_4px_10px_rgba(0,0,0,0.05)] ring-1 ring-[#edf0f2]"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {servicesError ? (
              <p className="md:col-span-2 xl:col-span-3 text-center text-[14px] text-[#d93025]">
                {servicesError}
              </p>
            ) : null}
            {isLoadingServices ? (
              <p className="md:col-span-2 xl:col-span-3 text-center text-[14px] text-[#5a6876]">
                Loading services...
              </p>
            ) : null}
            {visibleServices.map((service, index) => {
              const Icon = pickServiceIcon(service);
              return (
                <article
                  key={service.title}
                  className="flex flex-col overflow-hidden rounded-[1.125rem] border border-white/70 bg-[linear-gradient(180deg,#ffffff_0%,#f9fcff_100%)] backdrop-blur-[2px] shadow-[0_20px_44px_rgba(19,40,70,0.14)]"
                >
                  <div className="relative h-50 bg-[#f0f4f6]">
                    <Image
                      src={service.imageSrc}
                      alt=""
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 380px"
                    />
                    {service.tag ? (
                      <div className="absolute right-3 top-3">
                        <span className="inline-flex rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-semibold text-[#EC4899] shadow-sm">
                          {service.tag}
                        </span>
                      </div>
                    ) : null}
                    <div className="absolute -bottom-5 left-4 flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(145deg,#ffffff_0%,#eef5ff_100%)] text-[#2f5fa3] shadow-[0_10px_24px_rgba(27,50,81,0.2)] ring-2 ring-[#a8c8e8]">
                      <Icon className="h-6 w-6" strokeWidth={1.8} />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5 pt-8">
                    <h3 className="text-[21px] font-bold leading-[1.15] tracking-[-0.03em] text-[#1e3d52]">
                      {service.title}
                    </h3>
                    {service.titleNote ? (
                      <p className="mt-1 text-[13px] font-medium text-[#EC4899]">
                        {service.titleNote}
                      </p>
                    ) : null}
                    <p className="mt-2 text-[13px] font-medium text-[#EC4899]">
                      Bless Homeopathy
                    </p>
                    <p className="mt-3 flex-1 text-[14px] leading-[1.65] text-[#596775]">
                      {service.homeParagraph}
                    </p>
                    {service.badges.length > 0 ? (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {service.badges.map((badge) => (
                          <span
                            key={badge}
                            className="rounded-md bg-[#e8f2fb] px-2.5 py-1.5 text-[11px] font-semibold text-[#1e3d52]"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    <div className="mt-6 flex items-center justify-between border-t border-[#eef2f5] pt-4">
                      <div className="flex items-center gap-2 text-[12px] text-[#7b8793]">
                        {service.duration ? (
                          <>
                            <Clock3 className="h-3.5 w-3.5" />
                            {service.duration}
                          </>
                        ) : null}
                      </div>
                      <Link
                        href="/our-services"
                        className="inline-flex items-center gap-2 text-[13px] font-semibold text-(--brand-green)"
                      >
                        Learn More
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mx-auto mt-10 flex w-fit flex-col items-stretch gap-4 rounded-2xl border border-white/70 bg-[linear-gradient(100deg,#e7f2ff_0%,#f3f8ff_45%,#fff0f6_100%)] px-6 py-5 shadow-[0_16px_34px_rgba(24,45,75,0.1)] sm:flex-row sm:items-center sm:justify-between sm:gap-8">
            <div className="flex flex-1 items-center gap-4 border-[#e5e9ed] sm:border-r sm:pr-8">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full shadow-md bg-white text-[#1E4A8A]">
                <Shield className="h-5 w-5" strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-[14px] font-bold text-[#1E4A8A]">
                  100% Natural &amp; Safe
                </p>
                <p className="mt-1 text-[12px] text-[#7a8592]">
                  All treatments are FDA approved
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 text-[13px] sm:justify-end">
              <span className="text-[#7a8592]">Need help choosing?</span>
              <Link
                href="/contact-us#appointment"
                className="inline-flex items-center gap-2 text-[14px] font-bold text-[#EC4899]"
              >
                Consult Our Experts
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[radial-gradient(circle_at_5%_10%,#fff3f8_0%,transparent_35%),#ffffff] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-295">
          <div className="text-center">
            <h2 className="text-[32px] font-bold leading-tight tracking-[-0.04em] text-[#1E4A8A] sm:text-[44px]">
              Stories of Hope: Real People, Real Results, Real Joy
            </h2>
            <p className="mx-auto mt-4 max-w-230 text-[14px] leading-[1.7]">
              Every photograph tells a story of courage. These images are
              glimpses into journeys of rediscovered confidence and renewed
              hope. These images are some of the featured cases from our pool of
              20,000+ cured cases, that are medically documented, clinically
              photographed and progress-tracked using standardised assessment
              protocols. Each patient at our clinic is monitored and tracked
              with the same approach.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-200 gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <div className="relative overflow-hidden">
                <div className="relative aspect-4/3 w-full max-h-70">
                  <Image
                    src="/home/before-after.svg"
                    alt=""
                    fill
                    className="object-contain object-center p-2"
                    sizes="(max-width: 1024px) 100vw, 400px"
                  />
                </div>
              </div>
              <p className="mt-2 text-center text-[11px] text-[#6f7a84]">
                *Real Patient Images
              </p>
            </div>

            <div className="rounded-[1.125rem] border border-[#efe7d8] bg-[#fefaf3] px-7 py-6 shadow-[0_14px_28px_rgba(34,50,77,0.07)]">
              <p>
                <Quote
                  className="text-[#eadfce] fill-[#eadfce] rotate-180"
                  size={35}
                />
              </p>
              <div className="mb-2 space-y-1 text-[13px] leading-6 text-[#2a2d31]">
                <p>
                  Patient —{" "}
                  <span className="font-semibold">
                    {successStories[successStoryIndex].patient}
                  </span>
                </p>
                <p>
                  Focus —{" "}
                  <span className="font-semibold">
                    {successStories[successStoryIndex].focus}
                  </span>
                </p>
                <p>
                  Plan —{" "}
                  <span className="font-semibold">
                    {successStories[successStoryIndex].plan}
                  </span>
                </p>
              </div>
              <p className="text-[14px] leading-[1.7] text-[#4b535b]">
                {successStories[successStoryIndex].quote}
              </p>
              <div className="mt-7 flex justify-end gap-2">
                {[ChevronLeft, ChevronRight].map((Icon, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() =>
                      setSuccessStoryIndex((prev) =>
                        index === 0
                          ? (prev - 1 + successStories.length) %
                            successStories.length
                          : (prev + 1) % successStories.length,
                      )
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#0273AE] text-[#0273AE]"
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/about-us"
              className="btn-gradient-pink inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-[13px] font-semibold text-white transition"
            >
              View all success stories
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-3">
              Explore all our patients transformation journeys and get inspired
            </p>
          </div>
        </div>
      </section>

      <section className="relative isolate bg-[radial-gradient(circle_at_85%_10%,#fff3f7_0%,transparent_38%),#ffffff] px-4 py-15 sm:px-6 lg:px-8">
        <p className="pointer-events-none -z-10 select-none text-[11rem] font-bold tracking-wide text-transparent bg-clip-text bg-linear-to-b from-[#F1F2F3] via-[#F1F2F3]/45 to-transparent absolute left-1/2 -translate-x-1/2 -top-25">
          Feedback
        </p>
        <div className="relative mx-auto grid max-w-295 gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div>
            <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#E12454]">
              Our Testimonials
            </p>
            <h2 className="mt-3 text-[28px] font-bold leading-[1.15] tracking-[-0.03em] text-[#1e3d52] sm:text-[36px]">
              What Our Clients Say About Their Healing Journey
            </h2>
            <p className="mt-5 text-[14px] leading-[1.75] text-[#5a6772]">
              At Bless Homeopathy, we pride ourselves on delivering natural,
              personalized care that brings relief and balance to our
              clients&apos; lives. Here&apos;s what some of our satisfied
              customers have to say about their experience with our services:
            </p>
            <div className="relative mt-8 aspect-5/3 w-full max-w-120 overflow-hidden rounded-xl shadow-[0_14px_32px_rgba(28,48,79,0.1)] ring-1 ring-[#eef1f3]">
              <Image
                src="/home/feedback.svg"
                alt="Members of our care team"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 480px"
              />
            </div>
          </div>
          <div className="space-y-5 lg:self-center">
            <div
              key={testimonialIndex}
              className="testimonial-slide-in rounded-[1.25rem] border border-[#e2eaf3] bg-[linear-gradient(180deg,#ffffff_0%,#fbfdff_100%)] p-7 shadow-[0_16px_36px_rgba(28,48,79,0.12)]"
            >
              <div className="mb-4 flex gap-1 text-[#F9C747]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-4 w-4 fill-current"
                    strokeWidth={0}
                  />
                ))}
              </div>
              <p className="text-[17px] leading-[1.8] text-[#5c6770] italic">
                {testimonials[testimonialIndex].text}
              </p>
              <div className="mt-7 flex items-center gap-3">
                <span className="inline-flex h-13 w-13 items-center justify-center rounded-full bg-linear-to-br from-[#5c1f48] to-[#e12454] text-[20px] font-bold text-white">
                  {testimonials[testimonialIndex].name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>
                <div>
                  <p className="text-[30px] leading-none font-gamaamli text-[#1e3d52]">
                    {testimonials[testimonialIndex].name}
                  </p>
                  <p className="mt-1 text-[15px] font-semibold text-(--brand-pink)">
                    {testimonials[testimonialIndex].highlight}
                  </p>
                </div>
              </div>
            </div>

            <div className="carousel-controls flex items-center justify-center gap-5">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() =>
                  setTestimonialIndex(
                    (prev) =>
                      (prev - 1 + testimonials.length) % testimonials.length,
                  )
                }
                className="flex h-12 w-12 items-center justify-center rounded-full bg-(--brand-pink) text-white shadow-[0_10px_24px_rgba(225,36,84,0.3)] hover:bg-[#c81f4b]"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setTestimonialIndex(index)}
                    aria-label={`Go to testimonial ${index + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      testimonialIndex === index
                        ? "w-7 bg-(--brand-pink)"
                        : "w-2.5 bg-[#d3d9df]"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() =>
                  setTestimonialIndex(
                    (prev) => (prev + 1) % testimonials.length,
                  )
                }
                className="flex h-12 w-12 items-center justify-center rounded-full bg-(--brand-pink) text-white shadow-[0_10px_24px_rgba(225,36,84,0.3)] hover:bg-[#c81f4b]"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative min-h-80 overflow-hidden py-24 sm:py-28">
        <Image
          src="/home/choosing-bg.jpg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="relative z-10 mx-auto max-w-230 px-4 text-center sm:px-6">
          <p
            className="text-[20px] font-medium leading-normal text-white sm:text-[26px] lg:text-[30px]"
            style={{
              textShadow:
                "0 2px 16px rgba(0,0,0,0.65), 0 1px 4px rgba(0,0,0,0.9)",
            }}
          >
            Choosing Bless Homeopathic means choosing a path to better health
            guided by expertise, compassion, and a commitment to your
            well-being. Let us help you on your journey to holistic healing!
          </p>
          <p
            className="mx-auto mt-6 max-w-xl text-[13px] font-medium text-white sm:text-[15px]"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.7)" }}
          >
            We&apos;ve 25 Years of experience in Medical Services.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/contact-us#appointment"
              className="btn-gradient-pink inline-flex items-center gap-3 rounded-xl px-8 py-3.5 text-[14px] font-semibold text-white transition"
            >
              Contact Us
              <span className="text-white/90">|</span>
              <span className="text-[18px] leading-none">+</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-295 gap-12 xl:grid-cols-[0.98fr_1.02fr]">
          <div className="relative isolate">
            <p className="pointer-events-none -z-10 select-none text-[11rem] font-bold tracking-widest text-transparent bg-clip-text bg-linear-to-b from-[#F1F2F3] via-[#F1F2F3]/45 to-transparent absolute left-1/2 -translate-x-1/2 -top-30">
              Faqs
            </p>
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#E12454]">
              Why choose us
            </p>
            <h2 className="mt-3 max-w-130 text-[32px] font-bold leading-[1.08] tracking-[-0.04em] sm:text-[44px]">
              Why choose Bless Homeopathy?
            </h2>
            <p className="mt-5 max-w-130 text-[14px] leading-[1.7] text-[#63707c]">
              At Bless Homeopathic, we recognize that your health is your most
              valuable asset. Under the expert guidance of Dr. Nasreen, a highly
              qualified and experienced homeopathic physician, we are committed
              to providing personalized care that addresses the root causes of
              your health concerns. Here are some compelling reasons to choose
              us:
            </p>
            <div className="mt-8 space-y-5">
              {whyChooseItems.map(({ title, text, icon: Icon }) => (
                <div key={title} className="flex gap-4">
                  <div>
                    <Icon className="mt-1 text-[#E12454]" size={25} />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-semibold text-[#1e3d52]">
                      {title}
                    </h3>
                    <p className="mt-1 text-[13px] leading-[1.7] text-[#6b7783]">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3 lg:pt-10">
            {faqs.map((faq, index) => {
              const open = openFaq === index;
              return (
                <div
                  key={faq.question}
                  className={`overflow-hidden rounded-xl border ${
                    open ? "border-[#e4e8ec]" : "border-[#edf1f4]"
                  } bg-white shadow-[0_8px_22px_rgba(31,48,75,0.04)]`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                  >
                    <span className="text-[16px] font-semibold leading-snug text-[#2b3e5f] sm:text-[17px]">
                      {faq.question}
                    </span>
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center text-[#2b3e5f]">
                      {open ? (
                        <Minus className="h-4 w-4" strokeWidth={2} />
                      ) : (
                        <Plus className="h-4 w-4" strokeWidth={2} />
                      )}
                    </span>
                  </button>
                  {open ? (
                    <div className="faq-answer-open border-t border-[#edf1f4] px-5 py-5 text-[14px] leading-[1.7] text-[#6b7783]">
                      {faq.answer}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-4 pt-20 pb-10 sm:px-6 lg:px-8 bg-[radial-gradient(circle_at_10%_10%,#ffffff_0%,#ebf4ff_25%,transparent_45%),linear-gradient(120deg,#d6e9ff_0%,#e6f3ff_46%,#dcf5ce_100%)]">
        <div className="relative z-10 mx-auto max-w-295">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-(--surface-mint) px-4 py-1.75 text-[10px] font-semibold uppercase tracking-[0.18em] text-(--brand-green) ring-1 ring-[#cde8d7] shadow-[0_8px_18px_rgba(94,115,72,0.2)]">
              <Calendar size={15} /> Book appointment
            </div>
            <h2 className="mt-5 text-[32px] font-bold leading-tight tracking-[-0.04em] text-[#1E4A8A] sm:text-[44px]">
              Schedule your consultation
            </h2>
            <p className="mx-auto mt-3 max-w-155 text-[15px] leading-[1.7] text-[#1E4A8A]">
              Take the first step toward natural healing—share your details and
              we&apos;ll follow up with availability.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-250 gap-8 xl:grid-cols-[1.12fr_0.88fr] xl:items-start">
            <div className="h-215 overflow-hidden rounded-[0.625rem] md:h-235 xl:h-255 [&_iframe]:h-full! [&_iframe]:min-h-0!">
              <Cal
                namespace="30min"
                calLink="muhammad-abdullah-2bixqw/30min"
                style={{ width: "100%", height: "100%", overflow: "hidden" }}
                config={{
                  layout: "month_view",
                  useSlotsViewOnSmallScreen: "true",
                  theme: "light",
                }}
              />
            </div>

            <div className="flex flex-col gap-6">
              <div className="rounded-[20px] bg-[linear-gradient(145deg,#4f6840_0%,#6f8757_55%,#4f6840_100%)] p-7 text-white shadow-[0_24px_52px_rgba(94,115,72,0.48)]">
                <h3 className="text-[26px] font-bold tracking-[-0.03em]">
                  Our contact info
                </h3>
                <div className="mt-8 space-y-6">
                  {[
                    {
                      icon: Phone,
                      title: "Phone",
                      lines: ["+1 604-613-8111"],
                    },
                    {
                      icon: Mail,
                      title: "Email",
                      lines: ["info@blesshomeopathy.com"],
                    },
                    {
                      icon: MapPin,
                      title: "Location",
                      lines: ["32860 Capilano Pl, Abbotsford, BC V2S 7B4"],
                    },
                    {
                      icon: Clock3,
                      title: "Working Hours",
                      lines: ["Monday–Saturday", "9:00 AM – 7:00 PM"],
                    },
                  ].map(({ icon: Icon, title, lines }) => (
                    <div key={title} className="flex gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/20">
                        <Icon className="h-4.5 w-4.5" strokeWidth={2} />
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold opacity-95">
                          {title}
                        </p>
                        {lines.map((line) => (
                          <p
                            key={line}
                            className="mt-1 text-[13px] text-white/92"
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-[linear-gradient(180deg,#ffffff_0%,#f3f9ff_100%)] p-6 shadow-[0_20px_40px_rgba(31,46,74,0.14)] ring-1 ring-[#dbe8f6]">
                <h3 className="text-[18px] font-bold text-[#1E4A8A]">
                  Why Choose us
                </h3>
                <div className="mt-5 space-y-3">
                  {[
                    "Personalized intake",
                    "Experienced practitioners",
                    "Natural, gentle remedies",
                    "Clear follow-up plan",
                    "Family-friendly consultations",
                    "Evidence-informed case review",
                    "Customized care for all ages",
                    "Transparent treatment guidance",
                    "Convenient appointment scheduling",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full border border-(--brand-green) text-(--brand-green)">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </div>
                      <p className="text-[13px] text-[#5a6876]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-295">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-(--surface-mist) px-4 py-1.75 text-[10px] font-semibold uppercase tracking-[0.18em] text-(--brand-blue) ring-1 ring-[#d8e8fb] shadow-[0_8px_18px_rgba(30,74,138,0.16)]">
              <Package size={15} /> Our Products
            </div>
            <h2 className="mt-5 text-[32px] font-bold leading-tight tracking-[-0.04em] text-[#1E4A8A] sm:text-[44px]">
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
                      ? "bg-(--brand-green) text-white shadow-[0_10px_20px_rgba(94,115,72,0.3)]"
                      : "bg-white text-[#54606e] shadow-[0_4px_10px_rgba(0,0,0,0.05)] ring-1 ring-[#edf0f2]"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          {productsError ? (
            <p className="mt-10 text-center text-[14px] text-[#d93025]">
              {productsError}
            </p>
          ) : null}

          {isLoadingProducts ? (
            <p className="mt-10 text-center text-[14px] text-[#5a6876]">
              Loading products...
            </p>
          ) : null}

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {visibleProducts.map((product) => (
              <article
                key={product.id}
                className="flex flex-col overflow-hidden rounded-[0.8rem] bg-[linear-gradient(180deg,#ffffff_0%,#fafdff_100%)] shadow-[0_12px_24px_rgba(32,49,77,0.12)] ring-1 ring-[#e6edf5]"
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
                      className={`absolute left-2.5 top-2.5 rounded-full px-2 py-1 text-xs font-semibold leading-none ${
                        product.badgeClass ?? "bg-[#E12454] text-white"
                      }`}
                    >
                      {product.badge}
                    </span>
                  ) : null}
                  <span className="absolute right-2.5 top-2.5 rounded-full bg-(--brand-green) px-2 py-1 text-xs font-semibold leading-none text-white">
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
                    {product.off ? (
                      <span className="ml-auto rounded-full bg-(--surface-mint) px-2 py-1 text-xs font-bold tracking-wide text-(--brand-green)">
                        {product.off}
                      </span>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    disabled={!product.price || product.id === lastAddedItemId}
                    onClick={() =>
                      addItem({
                        id: product.id,
                        title: product.title,
                        imageSrc: product.imageSrc,
                        unitPrice: parseMoneyLabel(product.price),
                      })
                    }
                    className={`mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-md px-3 py-2 text-xs font-semibold tracking-[0.02em] text-white transition disabled:opacity-60 ${
                      product.id === lastAddedItemId
                        ? "bg-(--brand-green) hover:bg-(--brand-green)/90"
                        : "btn-gradient-pink"
                    }`}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    {product.id === lastAddedItemId ? "Added!" : "Add to Cart"}
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: "Safe payment",
                text: "Secure checkout and trusted payment partners.",
                boxClass:
                  "bg-[linear-gradient(180deg,#f6fbff_0%,#fafdff_100%)]",
                iconClass: "bg-[#eef6ff] text-[#5a8fc4]",
              },
              {
                icon: Truck,
                title: "Fast delivery",
                text: "Reliable shipping on remedy orders.",
                boxClass:
                  "bg-[linear-gradient(180deg,var(--surface-mint)_0%,#fbfffc_100%)]",
                iconClass: "bg-(--surface-mint) text-(--brand-green)",
              },
              {
                icon: Sparkles,
                title: "24/7 support",
                text: "Questions answered by our care team.",
                boxClass:
                  "bg-[linear-gradient(180deg,#fdf8ff_0%,#fffafd_100%)]",
                iconClass: "bg-[#f6eefc] text-[#9b6bb8]",
              },
            ].map(({ icon: Icon, title, text, boxClass, iconClass }) => (
              <div
                key={title}
                className={`rounded-2xl px-6 py-7 text-center shadow-[0_12px_24px_rgba(29,47,77,0.05)] ring-1 ring-[#edf0f3] ${boxClass}`}
              >
                <div
                  className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${iconClass}`}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.9} />
                </div>
                <h3 className="mt-4 text-[18px] font-bold text-[#1e3d52]">
                  {title}
                </h3>
                <p className="mt-2 text-[13px] leading-[1.55] text-[#6b7783]">
                  {text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/products"
              className="btn-gradient-pink inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-[13px] font-semibold text-white transition"
            >
              View all products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[radial-gradient(circle_at_100%_0%,#ebf4ff_0%,transparent_35%),#f5f9fd] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-295">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-(--surface-link-hover) px-4 py-1.75 text-[10px] font-semibold uppercase tracking-[0.18em] text-(--brand-pink) ring-1 ring-[#f6dce7] shadow-[0_8px_18px_rgba(225,36,84,0.14)]">
              <Tag size={15} /> Latest insights
            </div>
            <h2 className="mt-5 text-[32px] font-bold leading-tight tracking-[-0.04em] text-[#1E4A8A] sm:text-[44px]">
              Health &amp; wellness blog
            </h2>
            <p className="mx-auto mt-3 max-w-155 text-[15px] leading-[1.7] text-[#1E4A8A]">
              Practical tips and updates from our clinical team.
            </p>
          </div>

          <div
            ref={blogCarouselRef}
            onScroll={updateBlogScrollButtons}
            className="mt-8 flex snap-x snap-mandatory gap-8 overflow-x-hidden bg-transparent pb-2 scroll-smooth"
          >
            {wpArticlesError ? (
              <p className="w-full text-center text-[14px] text-[#d93025]">
                {wpArticlesError}
              </p>
            ) : null}

            {isLoadingWpArticles
              ? null
              : wpArticles.map((post) => (
                  <article
                    key={post.title}
                    className="flex w-full shrink-0 snap-start flex-col overflow-hidden rounded-2xl bg-[linear-gradient(180deg,#ffffff_0%,#fafdff_100%)] shadow-[0_14px_30px_rgba(31,48,75,0.1)] ring-1 ring-[#e7edf4] md:w-[calc((100%-2rem)/2)] xl:w-[calc((100%-4rem)/3)]"
                  >
                    <div className="relative h-44 bg-[#eef2f6]">
                      <Image
                        src={post.imageSrc}
                        alt=""
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 1024px) 100vw, 380px"
                      />
                      <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-semibold text-[#5a6eb0] shadow-sm">
                        {post.tag}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#8994a1]">
                        <span>{post.date}</span>
                        <span className="h-1 w-1 rounded-full bg-[#b9c1ca]" />
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="mt-3 flex-1 text-[22px] font-bold leading-tight tracking-[-0.03em] text-[#1e3d52]">
                        {post.title}
                      </h3>
                      <p
                        className="mt-3 text-[14px] leading-[1.7] text-[#6b7783]"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {post.description}
                      </p>
                      <div className="mt-6 flex items-center justify-between border-t border-[#edf1f4] pt-4">
                        <div className="flex items-center gap-2 text-[12px] font-medium text-[#35507a]">
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e8f2fb] text-[#5b86b4]">
                            <Stethoscope
                              className="h-3.5 w-3.5"
                              strokeWidth={2}
                            />
                          </span>
                          {post.author}
                        </div>
                        <Link
                          href={`/articles/${post.slug}`}
                          className="inline-flex items-center gap-2 text-[13px] font-semibold text-(--brand-green)"
                        >
                          Read article
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
          </div>

          <div className="mt-8 flex justify-center gap-2">
            <button
              type="button"
              aria-label="Previous articles"
              onClick={() => scrollBlogs("left")}
              disabled={!canScrollBlogsLeft}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-(--brand-pink) text-white shadow-[0_10px_24px_rgba(225,36,84,0.3)] hover:bg-[#c81f4b] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-(--brand-pink)"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next articles"
              onClick={() => scrollBlogs("right")}
              disabled={!canScrollBlogsRight}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-(--brand-pink) text-white shadow-[0_10px_24px_rgba(225,36,84,0.3)] hover:bg-[#c81f4b] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-(--brand-pink)"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

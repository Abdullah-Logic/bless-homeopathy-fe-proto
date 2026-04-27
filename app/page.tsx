"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Baby,
  CalendarDays,
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
  UserPlus,
  Users,
  Atom,
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
} from "lucide-react";
import { clinicInfo } from "@/lib/shopData";
import { articles } from "@/lib/articlesData";

const HERO_IMAGES = [
  "/home/header-bg-1.svg",
  "/home/header-bg-2.svg",
  "/home/header-bg-3.svg",
];

type ServiceCardData = {
  tag: string;
  title: string;
  provider: string;
  description: string;
  badges: string[];
  duration: string;
  imageSrc: string;
  titleNote?: string;
};

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

const services: ServiceCardData[] = [
  {
    tag: "Popular",
    title: "Acute Consultation and Medication",
    provider: "Bless Homeopathy",
    description:
      "Immediate relief for acute conditions with personalized homeopathic remedies tailored to your symptoms.",
    badges: ["Quick Relief", "Natural Solutions", "No Side Effects"],
    duration: "30-45 mins",
    imageSrc: "/home/service1.svg",
  },
  {
    tag: "Recommended",
    title: "Adult First Consultation and Medication",
    provider: "Bless Homeopathy",
    description:
      "Comprehensive initial assessment and customized treatment plan for adult patients with chronic or acute conditions.",
    badges: ["Complete Assessment", "Custom Treatment", "Follow-up Care"],
    duration: "60-90 mins",
    imageSrc: "/home/service2.svg",
  },
  {
    tag: "Family Care",
    title: "Kids 10 and Under",
    titleNote: "(First consultation and medication)",
    provider: "Bless Homeopathy",
    description:
      "Gentle, safe homeopathic care designed specifically for children, addressing common childhood ailments naturally.",
    badges: ["Child-Friendly", "Safe & Gentle", "Parent Guidance"],
    duration: "45-60 mins",
    imageSrc: "/home/service3.svg",
  },
];

const SERVICE_ICONS = [Stethoscope, Users, Baby] as const;

const testimonials = [
  {
    name: "Jessica L.",
    text: "My son was always getting sick, and I wanted a natural solution. Bless Homeopathy was the answer. The remedies have strengthened his immune system, and he's been healthier than ever. Dr. Nasreen is amazing with kids!",
  },
  {
    name: "Sarah M.",
    text: "After struggling with anxiety for years, I was skeptical about trying homeopathy. But Dr. Nasreen's personalized approach and care made a huge difference. The remedies have been life-changing, giving me peace of mind without any side effects.",
  },
  {
    name: "Melissa T.",
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

export default function HomePage() {
  const [activeServiceFilter, setActiveServiceFilter] =
    useState("All Services");
  const [activeProductFilter, setActiveProductFilter] =
    useState("All Products");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [heroIndex, setHeroIndex] = useState(0);
  const [successStoryIndex, setSuccessStoryIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

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
                href="/our-services"
                className="mt-8 inline-flex items-center gap-3 rounded-xl bg-[#E12454] px-7 py-3.5 text-[14px] font-semibold text-white shadow-[0_12px_28px_rgba(225,36,84,0.35)] transition hover:bg-[#E12454]/90"
              >
                Our Services
                <span className="text-white/90">|</span>
                <span className="text-[18px] leading-none">+</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center px-4">
          <div className="pointer-events-auto grid w-full max-w-290 grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6 translate-y-[42%] sm:translate-y-1/2">
            {[
              {
                title: "Memberships",
                subtitle: "See our membership options",
                action: "Learn More",
                icon: UserPlus,
              },
              {
                title: "Join Our Mission",
                subtitle: "Donate to educate",
                action: "Donate Now",
                icon: Atom,
              },
            ].map(({ title, subtitle, action, icon: Icon }) => (
              <div
                key={title}
                className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_16px_44px_rgba(15,35,68,0.16)] sm:flex-row justify-between px-6 py-5"
              >
                <div className="flex items-center gap-4">
                  <div className="text-[#8FB569]">
                    <Icon size={50} strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0 text-[#8FB569]">
                    <h3 className="text-2xl">{title}</h3>
                    <p className="mt-1 text-sm">{subtitle}</p>
                  </div>
                </div>
                <div className="h-[0.5px] w-full sm:h-full sm:w-[0.5px] bg-[#063E60] flex items-center justify-center" />
                <div className="flex shrink-0 items-center">
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#063E60]"
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

      <section className="bg-white px-4 pb-20 pt-52 sm:px-6 lg:px-8 lg:pt-32">
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

          <div className="max-w-140 lg:justify-self-end relative">
            <p className="text-[11rem] font-bold tracking-widest text-transparent bg-clip-text bg-linear-to-b from-[#F1F2F3] via-[#F1F2F3]/30 to-transparent absolute left-1/2 -translate-x-1/2 -top-25">
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
                href="/contact-us"
                className="inline-flex items-center gap-3 rounded-xl bg-[#E12454] px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-[#E12454]/90"
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

      <section className="bg-linear-to-r from-[#DBEAFE] to-[#E9FED3] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-295">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FDF2F8] px-4 py-1.75 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#EC4899]">
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
                      ? "bg-[#6ba86a] text-white shadow-[0_10px_22px_rgba(107,168,106,0.35)]"
                      : "bg-white text-[#54606e] shadow-[0_4px_10px_rgba(0,0,0,0.05)] ring-1 ring-[#edf0f2]"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => {
              const Icon = SERVICE_ICONS[index];
              return (
                <article
                  key={service.title}
                  className="flex flex-col overflow-hidden rounded-[1.125rem] bg-white shadow-[0_16px_36px_rgba(19,40,70,0.08)]"
                >
                  <div className="relative h-50 bg-[#f0f4f6]">
                    <Image
                      src={service.imageSrc}
                      alt=""
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 380px"
                    />
                    <div className="absolute right-3 top-3">
                      <span className="inline-flex rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-semibold text-[#EC4899] shadow-sm">
                        {service.tag}
                      </span>
                    </div>
                    <div className="absolute -bottom-5 left-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#4a7eb8] shadow-[0_8px_20px_rgba(27,50,81,0.14)] ring-2 ring-[#a8c8e8]">
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
                      {service.provider}
                    </p>
                    <p className="mt-3 flex-1 text-[14px] leading-[1.65] text-[#596775]">
                      {service.description}
                    </p>
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
                    <div className="mt-6 flex items-center justify-between border-t border-[#eef2f5] pt-4">
                      <div className="flex items-center gap-2 text-[12px] text-[#7b8793]">
                        <Clock3 className="h-3.5 w-3.5" />
                        {service.duration}
                      </div>
                      <Link
                        href="/our-services"
                        className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#6ba86a]"
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

          <div className="mx-auto mt-10 flex w-fit flex-col items-stretch gap-4 rounded-2xl bg-linear-to-r from-[#EFF6FF] to-[#FDF2F8] px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
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
                href="/contact-us"
                className="inline-flex items-center gap-1 font-bold text-[#EC4899]"
              >
                Consult Our Experts
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-295">
          <div className="text-center">
            <h2 className="text-[32px] font-bold leading-tight tracking-[-0.04em] sm:text-[44px] text-[#1E4A8A]">
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
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#0273AE] bg-white px-6 py-3 text-[13px] font-semibold text-[#0273AE] transition hover:border-[#0273AE]/70"
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

      <section className="relative bg-white px-4 py-15 sm:px-6 lg:px-8">
        <p className="text-[11rem] font-bold tracking-wide text-transparent bg-clip-text bg-linear-to-b from-[#F1F2F3] via-[#F1F2F3]/30 to-transparent absolute left-1/2 -translate-x-1/2 -top-25">
          Feedback
        </p>
        <div className="relative mx-auto grid max-w-295 gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-start">
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
          <div className="flex flex-col gap-5">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-[0.875rem] border-x border-t border-[#eef1f4] border-b-4 border-b-[#8FB569] bg-white p-6 pb-7 shadow-[0_10px_28px_rgba(28,48,79,0.06)]"
              >
                <p className="text-[13px] leading-[1.7] text-[#5c6770]">
                  {t.text}
                </p>
                <div className="mt-5 flex items-center gap-2">
                  <span>
                    <Quote className="text-[#E12454] rotate-180" size={25} />
                  </span>
                  <span className="text-[15px] font-bold text-[#1e3d52]">
                    {t.name}
                  </span>
                </div>
              </div>
            ))}
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
              href="/contact-us"
              className="inline-flex items-center gap-3 rounded-xl bg-[#E12454] px-8 py-3.5 text-[14px] font-semibold text-white shadow-[0_12px_28px_rgba(225,36,84,0.35)] transition hover:bg-[#E12454]/90"
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
          <div className="relative">
            <p className="text-[11rem] font-bold tracking-widest text-transparent bg-clip-text bg-linear-to-b from-[#F1F2F3] via-[#F1F2F3]/30 to-transparent absolute left-1/2 -translate-x-1/2 -top-30">
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
                    <div className="border-t border-[#edf1f4] px-5 py-5 text-[14px] leading-[1.7] text-[#6b7783]">
                      {faq.answer}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 bg-linear-to-r from-[#DBEAFE] to-[#E9FED3]">
        <div className="relative z-10 mx-auto max-w-295">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FDF2F8] px-4 py-1.75 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#EC4899]">
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

          <div className="mx-auto mt-12 grid max-w-250 gap-8 xl:grid-cols-[1.12fr_0.88fr]">
            <div className="rounded-[20px] bg-white p-6 shadow-[0_24px_48px_rgba(30,55,75,0.1)] ring-1 ring-[#e8eef2] sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  "Full name *",
                  "Email *",
                  "Phone *",
                  "Service type *",
                  "Preferred date *",
                  "Preferred time *",
                ].map((label, index) => (
                  <div
                    key={label}
                    className={
                      index === 0 || index === 3 ? "sm:col-span-2" : ""
                    }
                  >
                    <label className="mb-2 block text-[12px] font-semibold text-[#485767]">
                      {label}
                    </label>
                    <input
                      type="text"
                      placeholder={
                        index === 0
                          ? "Your name"
                          : index === 1
                            ? "you@email.com"
                            : index === 2
                              ? "604 613 8111"
                              : index === 3
                                ? "Select service"
                                : index === 4
                                  ? "Pick a date"
                                  : "Pick a time"
                      }
                      className="h-11.5 w-full rounded-[0.625rem] border border-[#e4eaee] bg-white px-4 text-[13px] text-[#243a5f] outline-none placeholder:text-[#aeb8c2] focus:border-[#8fb47e] focus:ring-2 focus:ring-[#8fb47e]/25"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4 sm:col-span-2">
                <label className="mb-2 block text-[12px] font-semibold text-[#485767]">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us briefly what you'd like help with"
                  className="w-full rounded-[0.625rem] border border-[#e4eaee] bg-white px-4 py-3 text-[13px] text-[#243a5f] outline-none placeholder:text-[#aeb8c2] focus:border-[#8fb47e] focus:ring-2 focus:ring-[#8fb47e]/25"
                />
              </div>
              <a
                href={clinicInfo.phoneHref}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-[0.625rem] bg-[#E12454] px-6 py-3.5 text-[14px] font-semibold text-white shadow-[0_12px_28px_rgba(225,36,84,0.28)] transition hover:bg-[#E12454]/90"
              >
                <CalendarDays className="h-4 w-4" />
                Get appointment
              </a>
            </div>

            <div className="flex flex-col gap-6">
              <div className="rounded-[20px] p-7 text-white shadow-[0_22px_44px_rgba(120,160,110,0.35)] bg-[#8FB569]">
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

              <div className="rounded-2xl bg-white p-6 shadow-[0_18px_36px_rgba(31,46,74,0.08)] ring-1 ring-[#edf1f3]">
                <h3 className="text-[18px] font-bold text-[#1E4A8A]">
                  Why Choose us
                </h3>
                <div className="mt-5 space-y-3">
                  {[
                    "Personalized intake",
                    "Experienced practitioners",
                    "Natural, gentle remedies",
                    "Clear follow-up plan",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full border border-[#8fb47e] text-[#8FB569]">
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
                  "bg-[linear-gradient(180deg,#f4fff7_0%,#fbfffc_100%)]",
                iconClass: "bg-[#eaf7ee] text-[#6ba86a]",
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
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#E12454] px-6 py-3 text-[13px] font-semibold text-white shadow-[0_12px_28px_rgba(225,36,84,0.28)] transition hover:bg-[#E12454]/90"
            >
              View all products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#F9F9F9] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-295">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FDF2F8] px-4 py-1.75 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#EC4899]">
              <Tag size={15} /> Latest insights
            </div>
            <h2 className="mt-5 text-[32px] font-bold leading-tight tracking-[-0.04em] sm:text-[44px] text-[#1E4A8A]">
              Health &amp; wellness blog
            </h2>
            <p className="mx-auto mt-3 max-w-155 text-[15px] leading-[1.7] text-[#1E4A8A]">
              Practical tips and updates from our clinical team.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {articles.map((post) => (
              <article
                key={post.title}
                className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_14px_28px_rgba(32,49,77,0.08)] ring-1 ring-[#edf0f3]"
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
                  <p className="mt-3 text-[14px] leading-[1.7] text-[#6b7783]">
                    {post.description}
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-[#edf1f4] pt-4">
                    <div className="flex items-center gap-2 text-[12px] font-medium text-[#35507a]">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e8f2fb] text-[#5b86b4]">
                        <Stethoscope className="h-3.5 w-3.5" strokeWidth={2} />
                      </span>
                      {post.author}
                    </div>
                    <Link
                      href={`/articles/${post.slug}`}
                      className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#6ba86a]"
                    >
                      Read more
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/articles"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#E12454] px-6 py-3 text-[13px] font-semibold text-white shadow-[0_12px_28px_rgba(225,36,84,0.28)] transition hover:bg-[#E12454]/90"
            >
              View all articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

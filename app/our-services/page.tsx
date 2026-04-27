"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Activity,
  Brain,
  CircleAlert,
  Frown,
  PhoneCall,
  Puzzle,
  Star,
} from "lucide-react";

const serviceHighlights = [
  { title: "Stress", icon: Brain },
  { title: "Fitness", icon: Puzzle },
  { title: "Depression", icon: Frown },
  { title: "Anxiety", icon: CircleAlert },
  { title: "Generalized Services", icon: Activity, wide: true },
];

const serviceFilters = [
  "All Services",
  "Infants",
  "Kids",
  "Women",
  "Men",
  "Seniors",
];

const serviceDetails = [
  {
    title: "Acute Consultation and Medication",
    background: "bg-[#F9F9F9]",
    reverse: false,
    cta: true,
    imageSrc: "/home/service1.svg",
    imageAlt: "Acute consultation and medication service",
  },
  {
    title: "Adult First Consultation and Medication",
    background: "bg-linear-to-r from-[#DBEAFE] to-[#E9FED3]",
    reverse: true,
    cta: true,
    imageSrc: "/home/service2.svg",
    imageAlt: "Adult consultation and medication service",
  },
  {
    title: "Kids 10 and under( first consultation and medication)",
    background: "bg-white",
    reverse: false,
    cta: true,
    imageSrc: "/home/service3.svg",
    imageAlt: "Kids consultation and medication service",
  },
];

const Services = () => {
  const [activeServiceFilter, setActiveServiceFilter] = useState("All Services");

  return (
    <main className="min-h-screen bg-white text-[#2a3f52]">
      <section className="relative">
        <div className="relative min-h-[min(320px,46vh)] w-full overflow-hidden bg-[#7BB153]">
          <div className="relative z-10 mx-auto flex min-h-[min(320px,46vh)] max-w-325 items-center justify-center px-4 py-10 text-center sm:px-6 lg:px-8">
            <div className="flex max-w-170 flex-col items-center text-white">
              <p className="text-sm font-medium text-white">
                Home {">"} Our-services
              </p>
              <h1 className="mt-4 text-[32px] font-black uppercase leading-[1.05] tracking-[-0.03em] sm:text-[42px] lg:text-[50px]">
                Comprehensive <br /> Homeopathic Care
              </h1>
              <p className="mx-auto mt-5 max-w-120 text-[18px] font-semibold leading-snug">
                Natural, holistic treatments tailored to your individual health
                needs, promoting lasting wellness and vitality.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-295 gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-start">
          <div className="max-w-145">
            <h2 className="text-[30px] font-bold leading-tight tracking-[-0.04em] text-[#1E4A8A] sm:text-[38px] lg:text-[44px]">
              We Provide The Best
              <br />
              Health Services.
            </h2>
            <div className="mt-5 h-1.5 w-18 bg-[#8FB569]" />
            <p className="mt-5 text-[14px] leading-[1.7] text-[#5a6772]">
              At Bless Homeopathy, we offer a wide range of specialized and
              general homeopathic services designed to promote mental and
              physical well-being. Our focus areas include stress, anxiety, and
              depression, as well as various health concerns across all
              demographics. Our dedicated team provides personalized treatment
              plans, holistic assessments, and supportive workshops, ensuring
              that each client receives care tailored to their unique needs.
              Whether through counseling, management programs, or educational
              seminars, we aim to empower individuals on their journey to better
              health and overall wellness.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6">
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-3 rounded-xl bg-[#E12454] px-7 py-3.5 text-[14px] font-semibold text-white shadow-[0_12px_28px_rgba(225,36,84,0.28)] transition hover:bg-[#E12454]/90"
              >
                Get Appointment
                <span className="text-white/90">|</span>
                <span className="text-[18px] leading-none">+</span>
              </Link>
              <div className="inline-flex items-center gap-2 text-lg font-bold text-[#2a4a66]">
                <span className="text-[#E12454]">
                  <PhoneCall size={30} />
                </span>
                604 (613) 8111
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:pt-2">
            {serviceHighlights.map(({ title, icon: Icon, wide }) => (
              <article
                key={title}
                className={`rounded-[1.125rem] border border-[#edf1f4] bg-white px-6 py-6 shadow-[0_10px_28px_rgba(28,48,79,0.06)] ${
                  wide ? "sm:col-span-2" : ""
                }`}
              >
                <Icon className="h-8 w-8 text-[#8FB569]" strokeWidth={1.8} />
                <p className="mt-5 text-[21px] font-bold leading-[1.15] tracking-[-0.03em] text-[#1e3d52]">
                  {title}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 pb-8 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-295 text-center">
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

          <div className="mt-7 flex flex-wrap justify-center gap-2.5">
            {serviceFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveServiceFilter(filter)}
                className={`rounded-2xl px-6 py-2 text-[12px] font-semibold transition ${
                  activeServiceFilter === filter
                    ? "bg-[#6ba86a] text-white shadow-[0_10px_22px_rgba(107,168,106,0.35)]"
                    : "bg-white text-[#54606e] shadow-[0_4px_10px_rgba(0,0,0,0.05)] ring-1 ring-[#edf0f2]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {serviceDetails.map(
        ({ title, background, reverse, cta, imageSrc, imageAlt }) => (
          <section
            key={title}
            className={`${background} px-4 py-16 sm:px-6 lg:px-8`}
          >
            <div
              className={`mx-auto grid max-w-295 gap-8 lg:items-stretch ${
                reverse
                  ? "lg:grid-cols-[1fr_1.05fr]"
                  : "lg:grid-cols-[1.05fr_1fr]"
              }`}
            >
              <div className={`${reverse ? "lg:order-2" : ""}`}>
                <div className="relative h-65 overflow-hidden rounded-[10px] bg-[#f0f4f6] sm:h-85 lg:h-full lg:min-h-105">
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 640px"
                  />
                </div>
              </div>
              <div className={`${reverse ? "lg:order-1" : ""}`}>
                <h3 className="text-[30px] font-bold leading-tight tracking-[-0.04em] text-[#E12454] sm:text-[38px] lg:text-[44px]">
                  {title}
                </h3>
                <div className="mt-5 space-y-4 text-[14px] leading-[1.7] text-[#5a6772] sm:text-[15px]">
                  <p>
                    Homeopathy is a gentle, holistic system of medicine that
                    treats the symptoms of the mind and the body as a totality.
                    It is an effective system of medicine that addresses the
                    disease within the body. Homeopathy stimulates the body to
                    heal without any side effects.It is safe for everyone, the
                    young, the elderly, pregnant women and even animals, it is a
                    powerful method of healing.
                  </p>
                  <p>
                    Homeopathic remedies are prepared from natural substances
                    such as plants, minerals etc. They come in the form of small
                    pills that dissolve under the tongue.
                  </p>
                  <p>
                    Homeopathy is used in over 80 countries around the world,
                    mainly Europe, South America and India. The British Royal
                    Family have endorsed and used homeopathy since the early
                    1800&apos;s. The Queen Mother was treated with homeopathic
                    medicine all her life and lived to the age of 101!
                  </p>
                  <p>
                    Homeopathy is used in over 80 countries around the world,
                    mainly Europe, South America and India. The British Royal
                    Family have endorsed and used homeopathy since the early
                    1800&apos;s. The Queen Mother was treated with homeopathic
                    medicine all her life and lived to the age of 101!
                  </p>
                </div>

                {cta ? (
                  <Link
                    href="/contact-us"
                    className="mt-7 inline-flex items-center gap-3 rounded-xl bg-[#E12454] px-8 py-3.5 text-[14px] font-semibold text-white shadow-[0_12px_28px_rgba(225,36,84,0.28)] transition hover:bg-[#E12454]/90"
                  >
                    Get Appointment
                    <span className="text-white/90">|</span>
                    <span className="text-[18px] leading-none">+</span>
                  </Link>
                ) : null}
              </div>
            </div>
          </section>
        ),
      )}

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
    </main>
  );
};

export default Services;

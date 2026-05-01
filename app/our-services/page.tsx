"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import PageHero from "@/components/PageHero";
import HealingCtaSection from "@/components/HealingCtaSection";
import {
  Activity,
  Brain,
  CircleAlert,
  Frown,
  PhoneCall,
  Puzzle,
  Star,
} from "lucide-react";
import type { WPServiceView } from "@/lib/wpServices";

const serviceHighlights = [
  { title: "Stress", icon: Brain },
  { title: "Fitness", icon: Puzzle },
  { title: "Depression", icon: Frown },
  { title: "Anxiety", icon: CircleAlert },
  { title: "Generalized Services", icon: Activity, wide: true },
];

const Services = () => {
  const [serviceDetails, setServiceDetails] = useState<WPServiceView[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [servicesError, setServicesError] = useState("");

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
        setServiceDetails(data);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setServicesError(
            "We are unable to load services right now.",
          );
          setServiceDetails([]);
        }
      } finally {
        setIsLoadingServices(false);
      }
    }

    loadServices();
    return () => controller.abort();
  }, []);

  return (
    <main className="min-h-screen bg-white text-[#2a3f52]">
      <PageHero
        breadcrumb="Home > Our-services"
        title="Comprehensive Homeopathic Care"
        description="Natural, holistic treatments tailored to your individual health needs, promoting lasting wellness and vitality."
      />

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-295 gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-start">
          <div className="max-w-145">
            <h2 className="text-[30px] font-bold leading-tight tracking-[-0.04em] text-[#1E4A8A] sm:text-[38px] lg:text-[44px]">
              We Provide The Best
              <br />
              Health Services.
            </h2>
            <div className="mt-5 h-1.5 w-18 bg-(--brand-green)" />
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
                href="/contact-us#appointment"
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
                <Icon className="h-8 w-8 text-(--brand-green)" strokeWidth={1.8} />
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

        </div>
      </section>

      {servicesError ? (
        <section className="bg-white px-4 pb-2 pt-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-295 text-center text-[14px] text-[#d93025]">
            {servicesError}
          </div>
        </section>
      ) : null}

      {isLoadingServices ? (
        <section className="bg-white px-4 pb-2 pt-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-295 text-center text-[14px] text-[#5a6876]">
            Loading services...
          </div>
        </section>
      ) : null}

      {serviceDetails.map((service, index) => {
        const reverse = index % 2 === 1;
        const background =
          index % 3 === 1
            ? "bg-linear-to-r from-[#DBEAFE] to-[#E9FED3]"
            : index % 3 === 0
              ? "bg-[#F9F9F9]"
              : "bg-white";
        return (
          <section
            key={service.slug || service.title}
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
                <div className="relative h-65 overflow-hidden rounded-[1.2rem] p-2 sm:h-85 lg:h-full lg:min-h-105">
                  <div className="relative h-full overflow-hidden rounded-[40%_60%_52%_48%/34%_38%_62%_66%]">
                    <Image
                      src={service.imageSrc}
                      alt={service.title}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 640px"
                    />
                  </div>
                </div>
              </div>
              <div className={`${reverse ? "lg:order-1" : ""}`}>
                <h3 className="text-[30px] font-bold leading-tight tracking-[-0.04em] text-[#E12454] sm:text-[38px] lg:text-[44px]">
                  {service.title}
                </h3>
                <div className="mt-5 space-y-4 text-[14px] leading-[1.7] text-[#5a6772] sm:text-[15px]">
                  <p className="whitespace-pre-line">{service.detailParagraph}</p>
                </div>

                <Link
                  href="/contact-us#appointment"
                  className="mt-7 inline-flex items-center gap-3 rounded-xl bg-[#E12454] px-8 py-3.5 text-[14px] font-semibold text-white shadow-[0_12px_28px_rgba(225,36,84,0.28)] transition hover:bg-[#E12454]/90"
                >
                  Get Appointment
                  <span className="text-white/90">|</span>
                  <span className="text-[18px] leading-none">+</span>
                </Link>
              </div>
            </div>
          </section>
        );
      })}

      <HealingCtaSection />
    </main>
  );
};

export default Services;

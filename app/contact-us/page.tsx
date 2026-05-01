"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import Link from "next/link";
import { useEffect } from "react";
import {
  Calendar,
  Check,
  Clock3,
  Mail,
  MapPin,
  Phone,
  Star,
  Stethoscope,
  HeartPulse,
  Users,
} from "lucide-react";
import PageHero from "@/components/PageHero";

const contactCards = [
  {
    title: "Phone",
    value: "+1 604-613-8111",
    icon: Phone,
    href: "tel:+16046138111",
  },
  {
    title: "Email",
    value: "info@blesshomeopathy.com",
    icon: Mail,
    href: "mailto:info@blesshomeopathy.com",
  },
  {
    title: "Location",
    value: "32860 Capilano Pl, Abbotsford, BC V2S 7B4",
    icon: MapPin,
    href: "#find-us",
  },
  {
    title: "Working Hours",
    value: "Monday-Saturday, 9:00 AM - 7:00 PM",
    icon: Clock3,
    href: "#appointment",
  },
];

export default function ContactUsPage() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: { "cal-brand": "var(--brand-green)" },
          dark: { "cal-brand": "var(--brand-green)" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <main className="min-h-screen bg-white text-(--text-body)">
      <PageHero
        breadcrumb="Home > Contact-Us"
        title="Contact Bless Homeopathy"
        description="Reach out for appointments, treatment guidance, and personalized homeopathic care."
      />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-295 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {contactCards.map(({ title, value, icon: Icon, href }) => (
            <Link
              key={title}
              href={href}
              className="block rounded-[1.125rem] border border-(--border-soft-2) bg-white px-5 py-5 shadow-[0_10px_28px_rgba(28,48,79,0.06)] transition hover:border-(--brand-green) hover:shadow-[0_14px_32px_rgba(28,48,79,0.1)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8f2fb] text-(--brand-blue)">
                <Icon className="h-4.5 w-4.5" strokeWidth={2} />
              </div>
              <h3 className="mt-4 text-[18px] font-bold text-[#1e3d52]">
                {title}
              </h3>
              <p className="mt-2 text-[13px] leading-[1.65] text-[#5a6772]">
                {value}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-295">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FDF2F8] px-4 py-1.75 text-[10px] font-semibold uppercase tracking-[0.18em] text-(--accent-pink)">
              <Star className="h-3 w-3 text-(--accent-pink)" />
              Why Connect With Us
            </div>
            <h2 className="mt-5 text-[32px] font-bold leading-tight tracking-[-0.04em] text-(--brand-blue) sm:text-[44px]">
              Personalized guidance at every step
            </h2>
            <p className="mx-auto mt-3 max-w-170 text-[15px] leading-[1.7] text-(--brand-blue)">
              From first consultation to follow-up care, we support your health
              journey with thoughtful, individualized homeopathic treatment.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: Stethoscope,
                title: "Expert Clinical Assessment",
                text: "Detailed case taking and root-cause focused planning for acute and chronic concerns.",
                iconClass: "bg-[#eef6ff] text-[#5a8fc4]",
              },
              {
                icon: HeartPulse,
                title: "Holistic Treatment Plans",
                text: "Natural, gentle remedies tailored to your symptoms, lifestyle, and long-term wellness goals.",
                iconClass: "bg-(--surface-mint) text-(--brand-green)",
              },
              {
                icon: Users,
                title: "Supportive Follow-ups",
                text: "Clear guidance and ongoing care for families, children, adults, and senior patients.",
                iconClass: "bg-[#f6eefc] text-[#9b6bb8]",
              },
            ].map(({ icon: Icon, title, text, iconClass }) => (
              <article
                key={title}
                className="rounded-2xl bg-white px-6 py-7 shadow-[0_12px_24px_rgba(29,47,77,0.05)] ring-1 ring-(--border-soft)"
              >
                <div
                  className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${iconClass}`}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.9} />
                </div>
                <h3 className="mt-4 text-center text-[18px] font-bold text-[#1e3d52]">
                  {title}
                </h3>
                <p className="mt-2 text-center text-[13px] leading-[1.6] text-[#6b7783]">
                  {text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="appointment"
        className="relative overflow-hidden bg-linear-to-r from-[#DBEAFE] to-[#E9FED3] px-4 pb-10 pt-20 sm:px-6 lg:px-8"
      >
        <div className="relative z-10 mx-auto max-w-295">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FDF2F8] px-4 py-1.75 text-[10px] font-semibold uppercase tracking-[0.18em] text-(--accent-pink)">
              <Calendar size={15} /> Book appointment
            </div>
            <h2 className="mt-5 text-[32px] font-bold leading-tight tracking-[-0.04em] text-(--brand-blue) sm:text-[44px]">
              Schedule your consultation
            </h2>
            <p className="mx-auto mt-3 max-w-155 text-[15px] leading-[1.7] text-(--brand-blue)">
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
              <div className="rounded-[20px] bg-(--brand-green) p-7 text-white shadow-[0_22px_44px_rgba(94,115,72,0.35)]">
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

              <div className="rounded-2xl bg-white p-6 shadow-[0_18px_36px_rgba(31,46,74,0.08)] ring-1 ring-(--border-soft-2)">
                <h3 className="text-[18px] font-bold text-(--brand-blue)">
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

      <section
        id="find-us"
        className="bg-white px-4 pb-16 pt-12 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-295 overflow-hidden rounded-[1.4rem] border border-(--border-soft) bg-white shadow-[0_20px_44px_rgba(28,48,79,0.1)]">
          <div className="grid gap-0 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="border-b border-(--border-soft) bg-linear-to-br from-[#f8fcff] via-white to-[#eff8ff] px-6 py-8 sm:px-8 lg:border-b-0 lg:border-r lg:py-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#eaf3ff] px-4 py-1.75 text-[10px] font-semibold uppercase tracking-[0.18em] text-(--brand-blue)">
                <MapPin className="h-3.5 w-3.5" />
                Find Us
              </div>
              <h2 className="mt-5 text-[30px] font-bold leading-tight tracking-[-0.03em] text-(--brand-blue) sm:text-[38px]">
                Visit Bless Homeopathy in Abbotsford
              </h2>
              <p className="mt-3 text-[14px] leading-[1.75] text-[#5a6772]">
                Our clinic offers a calm, welcoming setting for personalized
                consultations, follow-ups, and family care.
              </p>

              <div className="mt-7 rounded-2xl bg-white p-5 shadow-[0_12px_24px_rgba(29,47,77,0.06)] ring-1 ring-(--border-soft)">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6f7f8f]">
                  Address
                </p>
                <p className="mt-2 text-[15px] font-semibold leading-[1.65] text-(--brand-blue)">
                  32860 Capilano Pl, Abbotsford, BC V2S 7B4
                </p>
                <p className="mt-3 text-[13px] leading-[1.7] text-[#5f6c77]">
                  Monday to Saturday, 9:00 AM to 7:00 PM. Please book in advance
                  for the best availability.
                </p>
                <a
                  href="https://maps.google.com/?q=32860%20Capilano%20Pl%2C%20Abbotsford%2C%20BC%20V2S%207B4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-center rounded-full bg-(--brand-green) px-5 py-2.5 text-[12px] font-semibold text-white transition hover:opacity-90"
                >
                  Get Directions
                </a>
              </div>
            </div>

            <div className="p-3 sm:p-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2614.363189968685!2d-122.31710212288596!3d49.06073067136019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5484356bae5eb547%3A0xdecbb60e977f1684!2s32860%20Capilano%20Pl%2C%20Abbotsford%2C%20BC%20V2S%207B4%2C%20Canada!5e0!3m2!1sen!2s!4v1777534462708!5m2!1sen!2s"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[360px] w-full rounded-2xl md:h-[500px]"
                title="Bless Homeopathy clinic location map"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

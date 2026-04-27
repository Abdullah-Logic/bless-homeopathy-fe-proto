"use client";

import Image from "next/image";
import {
  Calendar,
  CalendarDays,
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

const contactCards = [
  {
    title: "Phone",
    value: "+1 604-613-8111",
    icon: Phone,
  },
  {
    title: "Email",
    value: "info@blesshomeopathy.com",
    icon: Mail,
  },
  {
    title: "Location",
    value: "32860 Capilano Pl, Abbotsford, BC V2S 7B4",
    icon: MapPin,
  },
  {
    title: "Working Hours",
    value: "Monday-Saturday, 9:00 AM - 7:00 PM",
    icon: Clock3,
  },
];

export default function ContactUsPage() {
  return (
    <main className="min-h-screen bg-white text-[#2a3f52]">
      <section className="relative overflow-hidden">
        <div className="relative min-h-[min(320px,46vh)] w-full overflow-hidden bg-[#7BB153]">
          <div className="relative z-10 mx-auto flex min-h-[min(320px,46vh)] max-w-325 items-center justify-center px-4 py-10 text-center sm:px-6 lg:px-8">
            <div className="flex max-w-170 flex-col items-center text-white">
              <p className="text-sm font-medium text-white">Home {">"} Contact-Us</p>
              <h1 className="mt-4 text-[32px] font-black uppercase leading-[1.05] tracking-[-0.03em] sm:text-[42px] lg:text-[50px]">
                Contact Bless Homeopathy
              </h1>
              <p className="mx-auto mt-5 max-w-120 text-[18px] font-semibold leading-snug">
                Reach out for appointments, treatment guidance, and personalized
                homeopathic care.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-295 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {contactCards.map(({ title, value, icon: Icon }) => (
            <article
              key={title}
              className="rounded-[1.125rem] border border-[#edf1f4] bg-white px-5 py-5 shadow-[0_10px_28px_rgba(28,48,79,0.06)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8f2fb] text-[#1E4A8A]">
                <Icon className="h-4.5 w-4.5" strokeWidth={2} />
              </div>
              <h3 className="mt-4 text-[18px] font-bold text-[#1e3d52]">{title}</h3>
              <p className="mt-2 text-[13px] leading-[1.65] text-[#5a6772]">{value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-295">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FDF2F8] px-4 py-1.75 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#EC4899]">
              <Star className="h-3 w-3 text-[#EC4899]" />
              Why Connect With Us
            </div>
            <h2 className="mt-5 text-[32px] font-bold leading-tight tracking-[-0.04em] text-[#1E4A8A] sm:text-[44px]">
              Personalized guidance at every step
            </h2>
            <p className="mx-auto mt-3 max-w-170 text-[15px] leading-[1.7] text-[#1E4A8A]">
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
                iconClass: "bg-[#eaf7ee] text-[#6ba86a]",
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
                className="rounded-2xl bg-white px-6 py-7 shadow-[0_12px_24px_rgba(29,47,77,0.05)] ring-1 ring-[#edf0f3]"
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
                    className={index === 0 || index === 3 ? "sm:col-span-2" : ""}
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
              <button
                type="button"
                data-under-development="true"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-[0.625rem] bg-[#E12454] px-6 py-3.5 text-[14px] font-semibold text-white shadow-[0_12px_28px_rgba(225,36,84,0.28)] transition hover:bg-[#E12454]/90"
              >
                <CalendarDays className="h-4 w-4" />
                Get appointment
              </button>
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
                        <p className="text-[13px] font-semibold opacity-95">{title}</p>
                        {lines.map((line) => (
                          <p key={line} className="mt-1 text-[13px] text-white/92">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-[0_18px_36px_rgba(31,46,74,0.08)] ring-1 ring-[#edf1f3]">
                <h3 className="text-[18px] font-bold text-[#1E4A8A]">Why Choose us</h3>
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
    </main>
  );
}

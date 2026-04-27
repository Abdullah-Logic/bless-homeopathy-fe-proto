"use client";

import Image from "next/image";
import { useState } from "react";
import {
  PhoneCall,
  UserCheck,
  HeartPulse,
  ClipboardList,
  Leaf,
  HandHeart,
  Minus,
  Plus,
  GraduationCap,
  BookOpen,
  MapPin,
  Earth,
  Users,
  Award,
  CircleCheck,
} from "lucide-react";

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

const credentials = [
  {
    title: "D.H.M.S",
    description: "Diploma in Homeopathic Medicine & Surgery",
    icon: Award,
    iconClass: "bg-[#FFEDEE] text-[#EF4444]",
  },
  {
    title: "M.D.H (LONDON)",
    description: "Doctor of Homeopathic Medicine from London",
    icon: GraduationCap,
    iconClass: "bg-[#ECFDF3] text-[#22C55E]",
  },
  {
    title: "M.H.M.S",
    description: "Master of Homeopathic Medicine & Surgery",
    icon: BookOpen,
    iconClass: "bg-[#EFF6FF] text-[#3B82F6]",
  },
  {
    title: "Academy World",
    description: "Member of Academy World",
    icon: Earth,
    iconClass: "bg-[#F5F3FF] text-[#A855F7]",
  },
];

const journeyItems = [
  {
    title: "Pakistan - Early Practice",
    description:
      "Began my journey in homeopathy with a deep passion for understanding the human body's natural healing ability. Served at British Human Laboratories, conducting extensive research and building foundational expertise.",
    icon: MapPin,
    iconClass: "text-[#EF4444]",
  },
  {
    title: "Barcelona & London - Advanced Studies",
    description:
      "Expanded knowledge through advanced training in Barcelona and London. Pursued specialized studies and earned M.D.H (London), while simultaneously practicing multiple specialties and refining clinical skills.",
    icon: Earth,
    iconClass: "text-[#3B82F6]",
  },
  {
    title: "Canada - Current Practice",
    description:
      "Established practice in Canada, serving the West Coast community. Active member of the Canadian Society of Homeopathy and West Coast Homeopathic Society, bringing international expertise to local patients.",
    icon: Users,
    iconClass: "text-[#16A34A]",
  },
];

const affiliations = [
  {
    title: "Canadian Society of Homeopathy",
    description:
      "Active member contributing to homeopathic standards and practices in Canada",
    iconClass: "bg-[#00C950]",
    borderClass: "border-[#B7E5C2] bg-[#EFF6FF80]",
  },
  {
    title: "West Coast Homeopathic Society",
    description:
      "Regional member promoting holistic health in the West Coast community",
    iconClass: "bg-[#2B7FFF]",
    borderClass: "border-[#BFDBFE] bg-[#F0FDF480]",
  },
];

const About = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-white text-[#2a3f52]">
      <section className="relative">
        <div className="relative min-h-[min(320px,46vh)] w-full overflow-hidden bg-[#7BB153]">
          <div className="relative z-10 mx-auto flex min-h-[min(320px,46vh)] max-w-325 items-center justify-center px-4 py-10 text-center sm:px-6 lg:px-8">
            <div className="flex max-w-170 flex-col items-center text-white">
              <p className="text-sm font-medium text-white">
                Home {">"} About-Us
              </p>
              <h1 className="mt-4 text-[32px] font-black uppercase leading-[1.05] tracking-[-0.03em] sm:text-[42px] lg:text-[50px]">
                Dedicated to Your Holistic Health Journey
              </h1>
              <p className="mx-auto mt-5 max-w-120 text-[18px] font-semibold leading-snug">
                Providing compassionate, professional homeopathic care rooted in
                natural healing principles and backed by decades of
                international experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 pb-20 pt-52 sm:px-6 lg:px-8 lg:pt-32 overflow-x-clip">
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
            <p className="pointer-events-none -z-10 select-none text-[5.5rem] sm:text-[8rem] lg:text-[11rem] font-bold tracking-widest text-transparent bg-clip-text bg-linear-to-b from-[#F1F2F3] via-[#F1F2F3]/30 to-transparent absolute left-1/2 -translate-x-1/2 -top-25">
              About
            </p>
            <h2 className="mt-3 text-[28px] font-bold leading-tight tracking-[-0.03em] sm:text-[36px] text-[#E12454]">
              Dr. Nasreen Kausar
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
              <button
                type="button"
                data-under-development="true"
                className="inline-flex items-center gap-3 rounded-xl bg-[#E12454] px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-[#E12454]/90"
              >
                Get Appointment
                <span className="text-white/90">|</span>
                <span className="text-[18px] leading-none">+</span>
              </button>
              <div className="inline-flex items-center gap-2 text-lg font-bold text-[#2a4a66]">
                <span className="text-[#E12454]">
                  <PhoneCall size={30} />
                </span>
                604 (613) 8111
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F9F9F9] px-4 py-16 sm:px-6 lg:px-8 ">
        <div className="mx-auto max-w-295">
          <div className="text-center">
            <h2 className="text-[32px] font-bold leading-tight tracking-[-0.04em] text-[#1E4A8A] sm:text-[44px]">
              Professional Credentials
            </h2>
            <p className="mx-auto mt-3 max-w-160 text-[15px] leading-[1.7] text-[#1E4A8A]">
              Extensive training and recognized qualifications in homeopathic
              medicine
            </p>
          </div>

          <div className="mx-auto mt-9 grid max-w-245 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {credentials.map(
              ({ title, description, icon: Icon, iconClass }) => (
                <article
                  key={title}
                  className={`flex flex-col items-center justify-center text-center rounded-xl border-b-4 border-[#7BB153] bg-white px-4 py-5 shadow-xl`}
                >
                  <div
                    className={`flex h-15 w-15 items-center justify-center rounded-full ${iconClass}`}
                  >
                    <Icon size={30} />
                  </div>
                  <h3 className="my-5 font-extrabold uppercase tracking-[0.02em] text-[#0f1f3d]">
                    {title}
                  </h3>
                  <p className="mt-auto text-xs leading-normal text-[#6b7785]">
                    {description}
                  </p>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="bg-linear-to-r from-[#DBEAFE] to-[#E9FED3] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-200">
          <div className="text-center">
            <h2 className="text-[32px] font-bold leading-tight tracking-[-0.04em] text-[#1E4A8A] sm:text-[44px]">
              My Journey
            </h2>
            <p className="mx-auto mt-3 max-w-160 text-[15px] leading-[1.7] text-[#1E4A8A]">
              A commitment to continuous learning and excellence
            </p>
          </div>

          <div className="mt-8 space-y-7">
            {journeyItems.map(
              ({ title, description, icon: Icon, iconClass }) => (
                <div key={title} className="flex gap-4 sm:gap-5">
                  <div
                    className={`mt-1 flex h-18 w-18 shrink-0 items-center justify-center rounded-full bg-white ${iconClass} shadow-sm`}
                  >
                    <Icon size={40} />
                  </div>
                  <div>
                    <h3 className="text-[24px] font-extrabold leading-[1.15] tracking-[-0.02em] text-[#0f1f3d]">
                      {title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-[1.7] text-[#435465]">
                      {description}
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-245">
          <div className="text-center">
            <h2 className="text-[32px] font-bold leading-tight tracking-[-0.04em] text-[#1E4A8A] sm:text-[44px]">
              Professional Affiliations
            </h2>
            <p className="mx-auto mt-3 max-w-160 text-[15px] leading-[1.7] text-[#1E4A8A]">
              Actively engaged in the homeopathic community
            </p>
          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-2">
            {affiliations.map(
              ({ title, description, iconClass, borderClass }, index) => (
                <article
                  key={index}
                  className={`rounded-xl border ${borderClass} px-5 py-5 shadow-[0_8px_20px_rgba(18,41,72,0.07)]`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${iconClass} text-white`}
                    >
                      <CircleCheck size={30} />
                    </div>
                    <div>
                      <h3 className="text-[22px] font-extrabold leading-[1.15] tracking-[-0.02em] text-[#0f1f3d]">
                        {title}
                      </h3>
                      <p className="mt-2 text-[14px] leading-[1.65] text-[#5f6b79]">
                        {description}
                      </p>
                    </div>
                  </div>
                </article>
              ),
            )}
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
            <button
              type="button"
              data-under-development="true"
              className="inline-flex items-center gap-3 rounded-xl bg-[#E12454] px-8 py-3.5 text-[14px] font-semibold text-white shadow-[0_12px_28px_rgba(225,36,84,0.35)] transition hover:bg-[#E12454]/90"
            >
              Contact Us
              <span className="text-white/90">|</span>
              <span className="text-[18px] leading-none">+</span>
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 overflow-x-clip">
        <div className="mx-auto grid max-w-295 gap-12 xl:grid-cols-[0.98fr_1.02fr]">
          <div className="relative isolate">
            <p className="pointer-events-none -z-10 select-none text-[5.5rem] sm:text-[8rem] lg:text-[11rem] font-bold tracking-widest text-transparent bg-clip-text bg-linear-to-b from-[#F1F2F3] via-[#F1F2F3]/30 to-transparent absolute left-1/2 -translate-x-1/2 -top-30">
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
    </main>
  );
};

export default About;

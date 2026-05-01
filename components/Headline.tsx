"use client";

import { Mail, MapPin, Clock } from "lucide-react";
import { FiFacebook, FiInstagram } from "react-icons/fi";
import { FaXTwitter, FaYoutube } from "react-icons/fa6";
import { useState } from "react";
import { clinicInfo } from "@/lib/shopData";

const info = [
  { icon: Mail, text: clinicInfo.email },
  { icon: MapPin, text: clinicInfo.address },
  { icon: Clock, text: `Office Hours: ${clinicInfo.officeHours}` },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/Blesshomeo?mibextid=ZbWKwL",
    icon: FiFacebook,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/homeopathic.doctor?igsh=MWRibWVvdjhpZXcwYQ%3D%3D",
    icon: FiInstagram,
  },
  {
    label: "X",
    href: "https://x.com/BHomeopathy?t=1Z-wBNMcLIhMaic3DesQHw&s=08",
    icon: FaXTwitter,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@blesshomeopathyclinic9181",
    icon: FaYoutube,
  },
];

const Headline = () => {
  const [activeInfoIndex, setActiveInfoIndex] = useState<number | null>(null);

  return (
    <section className="bg-[linear-gradient(92deg,#5e7348_0%,#6b8453_45%,#5e7348_100%)] px-4 py-2 text-sm text-white md:px-6">
      <div className="mx-auto flex w-full max-w-330 items-center justify-between gap-3 overflow-hidden">
        <div className="hidden min-w-0 items-center gap-x-4 whitespace-nowrap sm:flex">
          {info.map(({ icon: Icon, text }, index) => (
            <div
              key={text}
              className={`flex items-center gap-1.5 text-white/85 ${
                index > 0 ? "hidden sm:flex" : "flex"
              }`}
            >
              <Icon size={14} />
              <span className="truncate">{text}</span>
            </div>
          ))}
        </div>
        <div className="flex min-w-0 items-center gap-2 sm:hidden">
          {info.map(({ icon: Icon, text }, index) => (
            <button
              key={text}
              type="button"
              onClick={() =>
                setActiveInfoIndex((prev) => (prev === index ? null : index))
              }
              className={`inline-flex transition ${
                activeInfoIndex === index ? "text-white/50" : "text-white/85"
              }`}
              aria-label={text}
              aria-expanded={activeInfoIndex === index}
            >
              <Icon size={14} />
            </button>
          ))}
          <div className="min-w-0 overflow-hidden text-white/90">
            <p
              key={activeInfoIndex ?? "none"}
              className={`truncate ${
                activeInfoIndex !== null ? "headline-slide-in" : ""
              }`}
            >
              {activeInfoIndex !== null ? info[activeInfoIndex].text : ""}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2.5 text-white/85">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/8 hover:bg-white/15 hover:text-white"
            >
              <Icon size={14} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Headline;

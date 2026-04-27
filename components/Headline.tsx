"use client";

import { Mail, MapPin, Clock } from "lucide-react";
import { FiFacebook, FiLinkedin } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { useState } from "react";

const info = [
  { icon: Mail, text: "info@blesshomeopathy.com" },
  { icon: MapPin, text: "14D Street Brooklyn, New York" },
  { icon: Clock, text: "Office Hours: 10:00am - 07:00pm" },
];

const socials = [FiFacebook, FaXTwitter, FiLinkedin];

const Headline = () => {
  const [activeInfoIndex, setActiveInfoIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#7BB153] px-4 py-2 text-sm text-white md:px-6">
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
                activeInfoIndex === index ? "text-white/50" : "text-white/"
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
        <div className="flex shrink-0 items-center gap-3 text-white/85">
          {socials.map((Icon, index) => (
            <Icon key={index} size={14} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Headline;

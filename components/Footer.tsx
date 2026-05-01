import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { FiFacebook, FiInstagram } from "react-icons/fi";
import { FaXTwitter, FaYoutube } from "react-icons/fa6";
import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Our Services", href: "/our-services" },
  { label: "Products", href: "/products" },
  { label: "Contact Us", href: "/contact-us" },
];

const legalLinks = [
  { label: "Privacy Statement", href: "/privacy-statement" },
  { label: "Mission Statement", href: "/mission-statement" },
  { label: "Code of Conduct", href: "/code-of-conduct" },
  { label: "Equity Statement", href: "/equity-statement" },
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

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center overflow-hidden border-t border-(--border-nav) bg-white px-5 py-14 text-[#364153] shadow-[0_-8px_26px_rgba(21,41,70,0.05)] md:py-16">
      <div className="mx-auto grid w-full max-w-330 gap-10 lg:grid-cols-[1.35fr_0.85fr_1.1fr]">
        <div>
          <Image
            src="/company/logo.svg"
            alt="HomeoHealth"
            width={208}
            height={40}
            className="h-auto w-44 sm:w-48"
          />
          <div className="relative mt-7 space-y-3.5 text-[12px] md:text-[13px]">
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <a
                href="https://maps.google.com/?q=32860+Capilano+Pl,+Abbotsford,+BC+V2S+7B4"
                target="_blank"
                rel="noreferrer"
                className="hover:text-(--brand-pink)"
              >
                32860 Capilano Pl, Abbotsford, BC V2S 7B4
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" />
              <a href="tel:+16046138111" className="hover:text-(--brand-pink)">
                +1 (604) 613-8111
              </a>
            </p>
            <p className="flex items-center gap-2 break-all">
              <Mail className="h-4 w-4 shrink-0" />
              <a
                href="mailto:info@blesshomeopathy.com"
                className="hover:text-(--brand-pink)"
              >
                info@blesshomeopathy.com
              </a>
            </p>
          </div>
        </div>

        <div className="relative space-y-3.5 pt-1 text-[12px] md:text-[13px]">
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-(--text-strong)">
            Quick Links
          </p>
          {quickLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block rounded-md px-1.5 py-1 transition hover:bg-(--surface-link-hover) hover:text-(--brand-pink)"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="relative space-y-6">
          <div className="flex flex-wrap gap-3">
            <div className="space-y-3.5 pt-1 text-[12px] md:text-[13px]">
              <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-(--text-strong)">
                Legal Links
              </p>
              {legalLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block rounded-md px-1.5 py-1 transition hover:bg-(--surface-link-hover) hover:text-(--brand-pink)"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="brand-pill inline-flex h-8 w-8 items-center justify-center rounded-full hover:text-(--brand-pink)"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <p className="pt-4 text-[11px] text-(--text-muted)">
        © Dr Nasreen 2024 | All Right Reserved
      </p>
    </footer>
  );
};

export default Footer;

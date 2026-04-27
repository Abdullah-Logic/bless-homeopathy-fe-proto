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

const footerBadges = [
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
    <footer className="bg-[#231F20] px-5 py-14 text-white md:py-16">
      <div className="mx-auto grid w-full max-w-330 gap-10 lg:grid-cols-[1.35fr_0.85fr_1.1fr]">
        <div>
          <Image
            src="/company/logo.svg"
            alt="HomeoHealth"
            width={208}
            height={40}
            className="h-auto w-44 sm:w-48"
          />
          <div className="mt-7 space-y-3.5 text-[12px] text-white/80 md:text-[13px]">
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <a
                href="https://maps.google.com/?q=32860+Capilano+Pl,+Abbotsford,+BC+V2S+7B4"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                32860 Capilano Pl, Abbotsford, BC V2S 7B4
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" />
              <a href="tel:+16046138111" className="hover:text-white">
                +1 (604) 613-8111
              </a>
            </p>
            <p className="flex items-center gap-2 break-all">
              <Mail className="h-4 w-4 shrink-0" />
              <a
                href="mailto:info@blesshomeopathy.com"
                className="hover:text-white"
              >
                info@blesshomeopathy.com
              </a>
            </p>
          </div>
        </div>

        <div className="space-y-3.5 pt-1 text-[12px] text-white/80 md:text-[13px]">
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-white">
            Quick Links
          </p>
          {quickLinks.map((item) => (
            <Link key={item.label} href={item.href} className="block hover:text-white">
              {item.label}
            </Link>
          ))}
          <p className="pt-4 text-[11px] text-white/55">
            © Dr Nasreen 2024 | All Right Reserved
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex flex-wrap gap-3">
            {footerBadges.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex h-14 min-w-24 flex-1 items-center justify-center bg-[#8FB569] px-2 text-center text-[10px] font-semibold uppercase leading-3 sm:flex-none hover:bg-[#7ea257]"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex h-14 min-w-24 flex-1 items-center justify-center bg-[#BFD3DC] p-1 text-[#243646] sm:w-25 sm:flex-none">
              <div className="border bg-white border-[#BFD3DC] px-3 py-1 text-center text-[8px] font-bold leading-tight">
                TRUSTMARK
                <br />
                PRIVACY
                <br />
                CAND.
              </div>
            </div>
          </div>

          <div className="flex gap-5 text-white">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="hover:text-[#8FB569]"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

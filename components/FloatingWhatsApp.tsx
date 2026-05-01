"use client";

import { FaWhatsapp } from "react-icons/fa";

const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/+16046138111"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-[max(1.5rem,calc((100vw-120rem)/2+1.5rem))] z-80 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_30px_rgba(37,211,102,0.35)] transition hover:scale-105 hover:bg-[#20ba59]"
    >
      <FaWhatsapp className="h-7 w-7" />
    </a>
  );
};

export default FloatingWhatsApp;

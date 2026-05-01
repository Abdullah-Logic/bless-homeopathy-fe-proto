"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CalendarDays, Check, HeartHandshake, X } from "lucide-react";

const FreeConsultationPopup = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsOpen(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [isOpen]);

  if (!isMounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-90 flex items-center justify-center bg-[#0f172a]/50 px-4 py-8 backdrop-blur-[2px]">
      <div className="relative w-full max-w-2xl rounded-[2rem] border border-(--border-soft) bg-linear-to-br from-white via-white to-[#f9fcff] p-7 shadow-[0_28px_64px_rgba(28,48,79,0.25)] sm:p-9">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Close free consultation popup"
          className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#f5f7fb] text-[#536575] hover:bg-[#e8eef6]"
        >
          <X className="h-4 w-4" strokeWidth={2.4} />
        </button>

        <div className="grid items-center gap-7 md:grid-cols-[1.15fr_0.85fr] md:gap-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FDF2F8] px-3.5 py-1.75 text-[10px] font-semibold uppercase tracking-[0.16em] text-(--accent-pink)">
              <CalendarDays className="h-3.5 w-3.5" />
              New visitors offer
            </div>

            <h2 className="mt-5 text-[34px] font-black leading-[1.08] tracking-[-0.03em] text-(--brand-blue) sm:text-[40px]">
              Start With a Free Consultation
            </h2>
            <p className="mt-4 max-w-130 text-[15px] leading-[1.8] text-(--text-body)">
              Welcome to Bless Homeopathy. Speak with our care team, share your
              health concerns, and receive personalized first-step guidance at no
              cost.
            </p>

            <div className="mt-5 space-y-2.5">
              {[
                "One-on-one personalized discussion",
                "Gentle, holistic treatment direction",
                "Quick and easy appointment booking",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-(--state-success-bg) text-(--state-success-text)">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.6} />
                  </span>
                  <p className="text-[13px] text-(--text-muted-2)">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-(--border-soft) bg-(--surface-panel) p-5">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-(--surface-mint) text-(--brand-green)">
              <HeartHandshake className="h-6 w-6" strokeWidth={2.1} />
            </div>
            <p className="mt-4 text-center text-[13px] leading-[1.65] text-(--text-muted-2)">
              Most new patients begin here. Reserve your free consultation and
              take the first step toward feeling better naturally.
            </p>

            <div className="mt-5 grid gap-2.5">
              <Link
                href="/contact-us#appointment"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center justify-center rounded-xl bg-(--brand-green) px-4 py-3 text-[13px] font-semibold text-white shadow-[0_14px_30px_rgba(94,115,72,0.28)] hover:bg-(--brand-green-dark)"
              >
                Book Free Call
              </Link>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center justify-center rounded-xl border border-(--border-soft-2) bg-white px-4 py-3 text-[13px] font-semibold text-(--brand-blue) hover:bg-(--surface-hover)"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeConsultationPopup;

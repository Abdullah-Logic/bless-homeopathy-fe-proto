import Image from "next/image";
import Link from "next/link";

export default function HealingCtaSection() {
  return (
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
            textShadow: "0 2px 16px rgba(0,0,0,0.65), 0 1px 4px rgba(0,0,0,0.9)",
          }}
        >
          Choosing Bless Homeopathic means choosing a path to better health guided
          by expertise, compassion, and a commitment to your well-being. Let us help
          you on your journey to holistic healing!
        </p>
        <p
          className="mx-auto mt-6 max-w-xl text-[13px] font-medium text-white sm:text-[15px]"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.7)" }}
        >
          We&apos;ve 25 Years of experience in Medical Services.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            href="/contact-us#appointment"
            className="inline-flex items-center gap-3 rounded-xl bg-(--brand-pink) px-8 py-3.5 text-[14px] font-semibold text-white shadow-[0_12px_28px_rgba(225,36,84,0.35)] transition hover:bg-(--brand-pink)/90"
          >
            Contact Us
            <span className="text-white/90">|</span>
            <span className="text-[18px] leading-none">+</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

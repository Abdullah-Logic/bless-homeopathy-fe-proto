"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingBasket, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us" },
  { name: "Our Services", href: "/our-services" },
  { name: "Products", href: "/products" },
  { name: "Contact Us", href: "/contact-us" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isActivePath = (href: string) =>
    href === "/" ? pathname === href : pathname.startsWith(href);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <section className="border-b border-[#efe7ea] bg-white px-4 py-3.5 text-[#364153] md:px-6">
      <div className="mx-auto w-full max-w-350">
        <div className="flex items-center justify-between gap-4">
          <Link href={"/"}>
            <Image
              src="/company/logo.svg"
              alt="company logo"
              width={208}
              height={40}
              className="h-auto w-40 sm:w-44 lg:w-48"
            />
          </Link>

          <nav className="hidden lg:block">
            <div className="flex items-center gap-5">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`whitespace-nowrap transition hover:text-[#E12454] ${
                    isActivePath(item.href) ? "text-[#E12454]" : ""
                  }`}
                  aria-current={isActivePath(item.href) ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/products"
              aria-label="Browse products"
              className="text-[#4b5563]"
            >
              <Search size={17} />
            </Link>
            <Link
              href="/products"
              aria-label="Open cart"
              className="relative text-[#4b5563]"
            >
              <ShoppingBasket size={18} />
              <span className="absolute -right-1.5 -top-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[#E12454] px-1 text-[10px] font-bold text-white">
                2
              </span>
            </Link>
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setIsOpen((prev) => !prev)}
              className="text-[#4b5563] lg:hidden"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link
              href="/contact-us"
              className="hidden items-center gap-3 rounded-xl bg-[#E12454] px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-[#E12454]/90 lg:inline-flex"
            >
              Get Appointment
              <span className="text-white/90">|</span>
              <span className="text-[18px] leading-none">+</span>
            </Link>
          </div>
        </div>

        {isOpen ? (
          <nav className="mt-4 border-t border-[#f1e6ea] pt-3 lg:hidden">
            <div className="flex flex-col gap-2 text-[13px]">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`rounded-md px-2 py-2 transition hover:bg-[#fff4f7] hover:text-[#E12454] ${
                    isActivePath(item.href) ? "text-[#E12454]" : ""
                  }`}
                  aria-current={isActivePath(item.href) ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/contact-us"
                className="mt-1 inline-flex w-fit items-center gap-2 rounded-lg bg-[#E12454] px-4 py-2 text-[12px] font-semibold text-white transition hover:bg-[#E12454]/90"
              >
                Get Appointment
                <span className="text-white/90">|</span>
                <span className="text-[16px] leading-none">+</span>
              </Link>
            </div>
          </nav>
        ) : null}
      </div>
    </section>
  );
};

export default Navbar;

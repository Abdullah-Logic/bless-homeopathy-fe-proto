"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Menu, X, Trash2 } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/cart/CartProvider";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us" },
  { name: "Our Services", href: "/our-services" },
  { name: "Products", href: "/products" },
  { name: "Contact Us", href: "/contact-us" },
];

function formatMoney(value: number) {
  if (!Number.isFinite(value)) return "$0";
  return `$${Math.round(value)}`;
}

function NavbarContent({ pathname }: { pathname: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState<string | null>(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const [billing, setBilling] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address_1: "",
    city: "",
    state: "",
    postcode: "",
    country: "CA",
  });
  const {
    items,
    itemCount,
    subtotal,
    increment,
    decrement,
    removeItem,
    clear,
  } = useCart();

  const isActivePath = (href: string) =>
    href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <section className="border-b border-(--border-nav) bg-white px-4 py-3.5 text-[#364153] shadow-[0_8px_24px_rgba(21,41,70,0.06)] md:px-6">
      <div className="mx-auto w-full max-w-350">
        <div className="flex items-center justify-between gap-4">
          <Link href={"/"}>
            <Image
              src="/company/logo.svg"
              alt="company logo"
              width={208}
              height={40}
              className="h-auto w-30 sm:w-40 lg:w-48"
            />
          </Link>

          <nav className="hidden lg:block">
            <div className="flex items-center gap-5">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`whitespace-nowrap border-b-2 border-transparent px-1 py-1.5 font-medium transition hover:border-(--brand-pink) hover:text-(--brand-pink) ${
                    isActivePath(item.href)
                      ? "border-(--brand-pink) font-semibold text-(--brand-pink)"
                      : ""
                  }`}
                  aria-current={isActivePath(item.href) ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/contact-us#appointment"
              className="btn-gradient-pink inline-flex items-center gap-1 rounded-lg px-2 py-2 text-[10px] font-semibold text-white transition sm:px-3 sm:text-[12px] lg:hidden"
            >
              Get Appointment
              <span className="text-white/90">+</span>
            </Link>
            <button
              type="button"
              aria-label="Open cart"
              onClick={() => setIsCartOpen(true)}
              className="brand-pill relative inline-flex h-10 w-10 items-center justify-center rounded-full text-[#4b5563] outline-none transition hover:bg-[#e5e7eb]"
            >
              <ShoppingCart size={22} />
              {itemCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-(--brand-pink) px-1 text-[10px] font-bold text-white">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </button>
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setIsOpen((prev) => !prev)}
              className="brand-pill rounded-lg p-2 text-[#4b5563] lg:hidden"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link
              href="/contact-us#appointment"
              className="btn-gradient-pink hidden items-center gap-3 rounded-xl px-6 py-3 text-[14px] font-semibold text-white transition lg:inline-flex"
            >
              Get Appointment
              <span className="text-white/90">|</span>
              <span className="text-[18px] leading-none">+</span>
            </Link>
          </div>
        </div>

        {isOpen ? (
          <nav className="mt-4 border-t border-(--border-nav) pt-3 lg:hidden">
            <div className="flex flex-col gap-2 text-[13px]">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`rounded-md border-b-2 border-transparent px-2 py-2 font-medium transition hover:border-(--brand-pink) hover:text-(--brand-pink) ${
                    isActivePath(item.href)
                      ? "border-(--brand-pink) font-semibold text-(--brand-pink)"
                      : ""
                  }`}
                  aria-current={isActivePath(item.href) ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        ) : null}
      </div>

      {isCartOpen ? (
        <div
          className="fixed inset-0 z-70 bg-black/30"
          onClick={() => setIsCartOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <aside
            className="fixed inset-0 h-screen w-screen max-w-none overflow-y-auto bg-white shadow-none lg:absolute lg:bottom-0 lg:left-auto lg:right-0 lg:top-0 lg:h-full lg:w-90 lg:max-w-[92vw] lg:shadow-[0_24px_60px_rgba(0,0,0,0.25)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-1 flex items-center justify-between border-b border-(--border-soft) bg-[linear-gradient(180deg,#ffffff_0%,#f9fcff_100%)] px-5 py-4">
              <div>
                <p className="text-[14px] font-bold text-(--text-strong)">Cart</p>
                <p className="text-[12px] text-(--text-muted)">
                  {itemCount} item{itemCount === 1 ? "" : "s"}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close cart"
                onClick={() => setIsCartOpen(false)}
                className="rounded-lg p-2 hover:bg-(--surface-hover)"
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-5 py-4">
              {items.length === 0 ? (
                <div className="rounded-xl border border-(--border-soft) bg-(--surface-panel) px-4 py-8 text-center">
                  <p className="text-[14px] font-bold text-(--text-strong)">
                    Your cart is empty
                  </p>
                  <p className="mt-2 text-[13px] leading-[1.6] text-(--text-muted)">
                    Browse products and hit “Add to Cart”.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 rounded-xl border border-(--border-soft) bg-white p-3"
                    >
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-(--surface-hover)">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.imageSrc}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px] font-bold text-(--text-strong)">
                          {item.title}
                        </p>
                        <p className="mt-1 text-[12px] text-(--text-muted)">
                          {formatMoney(item.unitPrice)} each
                        </p>

                        <div className="mt-3 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 rounded-lg border border-(--border-soft) px-2 py-1">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              onClick={() => decrement(item.id)}
                              className="text-(--text-strong) hover:opacity-80"
                            >
                              -
                            </button>
                            <span className="w-6 text-center text-[13px] font-bold text-(--text-strong)">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              onClick={() => increment(item.id)}
                              className="text-(--text-strong) hover:opacity-80"
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            aria-label="Remove item"
                            onClick={() => removeItem(item.id)}
                            className="rounded-lg p-2 text-(--text-danger) hover:bg-[#fff4f4]"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {!isCheckoutOpen ? (
              <div className="border-t border-(--border-soft) px-5 py-4">
                <div className="flex items-center justify-between">
                  <p className="text-[13px] font-bold text-(--text-strong)">
                    Subtotal
                  </p>
                  <p className="text-[14px] font-bold text-(--text-strong)">
                    {formatMoney(subtotal)}
                  </p>
                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setCheckoutError(null);
                      setCheckoutSuccess(null);
                      setIsCheckoutOpen(false);
                      clear();
                    }}
                    disabled={items.length === 0}
                    className="w-1/2 rounded-xl bg-white px-4 py-2 text-[13px] font-bold text-(--text-danger) ring-1 ring-(--border-soft) disabled:opacity-50"
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    disabled={items.length === 0}
                    onClick={() => {
                      setCheckoutError(null);
                      setCheckoutSuccess(null);
                      setIsCheckoutOpen(true);
                    }}
                    className="w-1/2 rounded-xl bg-(--brand-pink) px-4 py-2 text-[13px] font-bold text-white shadow-[0_12px_28px_rgba(225,36,84,0.28)] disabled:opacity-50"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            ) : (
              <div className="border-t border-(--border-soft) px-5 py-4">
                <p className="text-[14px] font-bold text-(--text-strong)">Checkout</p>
                <p className="mt-1 text-[12px] leading-[1.6] text-(--text-muted)">
                  Enter your details to place an order.
                </p>

                {checkoutSuccess ? (
                  <div className="mt-4 rounded-xl border border-(--state-success-border) bg-(--state-success-bg) px-4 py-3 text-(--state-success-text)">
                    {checkoutSuccess}
                  </div>
                ) : null}

                {checkoutError ? (
                  <div className="mt-4 rounded-xl border border-(--state-error-border) bg-(--state-error-bg) px-4 py-3 text-(--state-error-text)">
                    {checkoutError}
                  </div>
                ) : null}

                <div className="mt-4 grid gap-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      value={billing.first_name}
                      onChange={(e) =>
                        setBilling((prev) => ({
                          ...prev,
                          first_name: e.target.value,
                        }))
                      }
                      placeholder="First name"
                      className="h-10 w-full rounded-lg border border-(--border-soft) bg-white px-3 text-[13px] outline-none focus:border-(--brand-green)"
                    />
                    <input
                      value={billing.last_name}
                      onChange={(e) =>
                        setBilling((prev) => ({
                          ...prev,
                          last_name: e.target.value,
                        }))
                      }
                      placeholder="Last name"
                      className="h-10 w-full rounded-lg border border-(--border-soft) bg-white px-3 text-[13px] outline-none focus:border-(--brand-green)"
                    />
                  </div>

                  <input
                    value={billing.email}
                    onChange={(e) =>
                      setBilling((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    placeholder="Email"
                    className="h-10 w-full rounded-lg border border-(--border-soft) bg-white px-3 text-[13px] outline-none focus:border-(--brand-green)"
                  />
                  <input
                    value={billing.phone}
                    onChange={(e) =>
                      setBilling((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    placeholder="Phone"
                    className="h-10 w-full rounded-lg border border-(--border-soft) bg-white px-3 text-[13px] outline-none focus:border-(--brand-green)"
                  />
                  <input
                    value={billing.address_1}
                    onChange={(e) =>
                      setBilling((prev) => ({
                        ...prev,
                        address_1: e.target.value,
                      }))
                    }
                    placeholder="Address"
                    className="h-10 w-full rounded-lg border border-(--border-soft) bg-white px-3 text-[13px] outline-none focus:border-(--brand-green)"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      value={billing.city}
                      onChange={(e) =>
                        setBilling((prev) => ({
                          ...prev,
                          city: e.target.value,
                        }))
                      }
                      placeholder="City"
                      className="h-10 w-full rounded-lg border border-(--border-soft) bg-white px-3 text-[13px] outline-none focus:border-(--brand-green)"
                    />
                    <input
                      value={billing.postcode}
                      onChange={(e) =>
                        setBilling((prev) => ({
                          ...prev,
                          postcode: e.target.value,
                        }))
                      }
                      placeholder="Postal code"
                      className="h-10 w-full rounded-lg border border-(--border-soft) bg-white px-3 text-[13px] outline-none focus:border-(--brand-green)"
                    />
                  </div>

                  <input
                    value={billing.state}
                    onChange={(e) =>
                      setBilling((prev) => ({
                        ...prev,
                        state: e.target.value,
                      }))
                    }
                    placeholder="State / Province"
                    className="h-10 w-full rounded-lg border border-(--border-soft) bg-white px-3 text-[13px] outline-none focus:border-(--brand-green)"
                  />

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setCheckoutError(null);
                        setCheckoutSuccess(null);
                        setIsCheckoutOpen(false);
                      }}
                      disabled={isPlacingOrder}
                      className="w-1/3 rounded-xl bg-white px-4 py-2 text-[13px] font-bold text-(--text-strong) ring-1 ring-(--border-soft) disabled:opacity-50"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      disabled={items.length === 0 || isPlacingOrder}
                      onClick={async () => {
                        setCheckoutError(null);
                        setCheckoutSuccess(null);
                        setIsPlacingOrder(true);

                        try {
                          const res = await fetch("/api/checkout", {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              items,
                              billing,
                              customer_note:
                                "Order placed via website product cart",
                            }),
                          });

                          const data = await res.json().catch(() => ({}));
                          if (!res.ok) {
                            throw new Error(
                              data?.error ||
                                "Could not place order. Please check your details and try again.",
                            );
                          }

                          clear();
                          setCheckoutSuccess(
                            `Order placed successfully! (Order id: ${
                              data?.order?.id ?? "unknown"
                            })`,
                          );

                          setIsCheckoutOpen(false);
                          setIsCartOpen(false);
                        } catch (e) {
                          setCheckoutError(
                            (e as Error).message ||
                              "Could not place order. Please try again.",
                          );
                        } finally {
                          setIsPlacingOrder(false);
                        }
                      }}
                      className="w-2/3 rounded-xl bg-(--brand-pink) px-4 py-2 text-[13px] font-bold text-white shadow-[0_12px_28px_rgba(225,36,84,0.28)] disabled:opacity-50"
                    >
                      {isPlacingOrder ? "Placing..." : "Place order"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </aside>
        </div>
      ) : null}
    </section>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  // Key forces a remount on route change, resetting the mobile menu without setState-in-effect.
  return <NavbarContent key={pathname} pathname={pathname} />;
}

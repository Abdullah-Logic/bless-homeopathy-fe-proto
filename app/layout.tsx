import type { Metadata } from "next";
import "./globals.css";
import Headline from "@/components/Headline";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UnderDevelopmentGuard from "@/components/UnderDevelopmentGuard";
import { CartProvider } from "@/components/cart/CartProvider";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import FreeConsultationPopup from "@/components/FreeConsultationPopup";

export const metadata: Metadata = {
  title: "Homeo Health - Your Health Management Platform",
  description: "Professional health management and wellness platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <CartProvider>
          <UnderDevelopmentGuard />
          <FreeConsultationPopup />
          <FloatingWhatsApp />
          <div className="mx-auto w-full max-w-480 overflow-x-hidden">
            <div className="relative z-50 isolate">
              <Headline />
              <Navbar />
            </div>
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}

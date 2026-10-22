import type { Metadata, Viewport } from "next";
import { Inter, Rajdhani } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { DemoBar } from "@/components/layout/DemoBar";
import { Header } from "@/components/layout/Header";
import { Providers } from "@/components/layout/Providers";
import { getCartCatalogue } from "@/lib/products";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const rajdhani = Rajdhani({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-rajdhani", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: { default: "GearForce — Motorcycle Riding Gear & Accessories, Hyderabad", template: "%s | GearForce" },
  description:
    "GearForce, Hyderabad: riding jackets, gloves, boots, luggage, accessories and action cameras for riders across India. Gear for Every Journey.",
  openGraph: {
    type: "website",
    siteName: "GearForce",
    locale: "en_IN",
    title: "GearForce — Gear for Every Journey",
    description: "Premium riding gear and motorcycle accessories from Hyderabad.",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#0B0B0D" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${rajdhani.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Providers catalogue={getCartCatalogue()}>
          <DemoBar />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

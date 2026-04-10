import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PawCursor } from "@/components/animations/PawCursor";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["WONK", "opsz"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Guardians of Goodness",
    default: "Guardians of Goodness — For Animal Welfare",
  },
  description:
    "Guardians of Goodness is a nonprofit organization based in Amman, Jordan, dedicated to animal welfare through TNR programs, humane behavior support, education, and community outreach.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${fraunces.variable}`}>
      <body className="min-h-screen flex flex-col bg-cream">
        <PawCursor />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

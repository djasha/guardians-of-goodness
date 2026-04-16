import type { Metadata } from "next";
import Script from "next/script";
import { DM_Sans, Fraunces } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PawCursor } from "@/components/animations/PawCursor";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
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
  metadataBase: new URL("https://guardiansofgoodness.org"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Guardians of Goodness",
  },
  twitter: {
    card: "summary_large_image",
  },
};

// Blocking inline script — applies saved theme BEFORE React hydrates so the
// first paint matches the user's saved theme (no cream-→-dark flash on phones).
const themeInitScript = `(function(){try{var t=localStorage.getItem('gog-theme');if(t==='mystical')document.documentElement.classList.add('theme-mystical');}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-cream">
        <Script
          id="gog-theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:font-semibold focus:text-sm focus:neo-border-sm"
          >
            Skip to content
          </a>
          <PawCursor />
          <Header />
          <main id="main" className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

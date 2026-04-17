import type { Metadata } from "next";
import Script from "next/script";
import { DM_Sans, Fraunces } from "next/font/google";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { SanityLive } from "@/sanity/lib/live";
import { DisableDraftMode } from "@/components/sanity/DisableDraftMode";
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

const themeInitScript = `(function(){try{var t=localStorage.getItem('gog-theme');if(t==='mystical')document.documentElement.classList.add('theme-mystical');}catch(e){}})();`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDraftMode = (await draftMode()).isEnabled;

  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-cream" suppressHydrationWarning>
        <Script
          id="gog-theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        {children}
        <SanityLive />
        {isDraftMode && (
          <>
            <VisualEditing />
            <DisableDraftMode />
          </>
        )}
      </body>
    </html>
  );
}

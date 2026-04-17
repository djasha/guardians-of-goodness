import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PawCursor } from "@/components/animations/PawCursor";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
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
    </div>
  );
}

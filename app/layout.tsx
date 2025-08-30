import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteNavbar from "@/components/ui/SiteNavbar";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import SiteFooter from "@/components/ui/SiteFooter";
import LenisProvider from "@/components/providers/LenisProvider";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "4FLIS",
  description: "Skreddersydd flislegging for hjem og næring – detaljene som gjør forskjellen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LenisProvider>
            <SiteNavbar />
            {/* <div className="fixed inset-0 z-0 pointer-events-none">
          <FlickeringGrid
            className="w-full h-full"
            squareSize={4}
            gridGap={6}
            color="#6B7280"
            maxOpacity={0.5}
            flickerChance={0.1}
          />
        </div> */}
            <div className="relative z-10 pt-16">{children}</div>
            <SiteFooter />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

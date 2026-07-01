import type { Metadata, Viewport } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingBookButton } from "@/components/layout/FloatingBookButton";
import { COMPANY, ASSETS } from "@/lib/constants";
import { SITE_URL, absoluteUrl } from "@/lib/site";
import "./globals.css";

const displayFont = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const bodyFont = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#5e3b28",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${COMPANY.name} | Christmas Light Installation Utah`,
    template: `%s | ${COMPANY.name}`,
  },
  description:
    "Professional Christmas light installation in Utah County & Salt Lake County. Temporary & permanent holiday lighting for homes and businesses. Free quotes — licensed S330 contractor.",
  openGraph: {
    title: `${COMPANY.name} | Christmas Light Installation Utah`,
    description:
      `${COMPANY.tagline} Custom-fit Christmas lights for roofs, trees, and bushes. Serving Utah County & Salt Lake County.`,
    type: "website",
    locale: "en_US",
    siteName: COMPANY.name,
    url: SITE_URL,
    images: [
      {
        url: absoluteUrl(ASSETS.photos.hero),
        width: 1600,
        height: 1200,
        alt: "Home with professional Christmas light installation in Utah",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY.name} | Christmas Light Installation Utah`,
    description: COMPANY.tagline,
    images: [absoluteUrl(ASSETS.photos.hero)],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans pb-[calc(4.5rem+env(safe-area-inset-bottom))] lg:pb-0">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingBookButton />
      </body>
    </html>
  );
}

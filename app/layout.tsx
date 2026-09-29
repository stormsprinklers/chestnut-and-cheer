import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { SiteFooterChrome, SiteHeaderChrome } from "@/components/layout/SiteChrome";
import { ScrollAnimations } from "@/components/motion/ScrollAnimations";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { COMPANY, ASSETS } from "@/lib/constants";
import { SITE_URL, absoluteUrl } from "@/lib/site";
import "./globals.css";

const GOOGLE_ADS_TAG_ID = "AW-18477697547";

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
    `Professional Christmas light installation across ${COMPANY.serviceAreaSummary}. Temporary and permanent holiday lighting for homes and businesses.`,
  openGraph: {
    title: `${COMPANY.name} | Christmas Light Installation Utah`,
    description:
      `${COMPANY.tagline} Custom-fit Christmas lights for roofs, trees, and bushes across northern Utah and the Wasatch Back.`,
    type: "website",
    locale: "en_US",
    siteName: COMPANY.name,
    url: SITE_URL,
    images: [
      {
        url: absoluteUrl(ASSETS.photos.hero),
        width: 1600,
        height: 1067,
        alt: "Chestnut & Cheer Christmas light technician carrying a ladder in Utah",
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
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+3:wght@400;600&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans pb-[calc(4.75rem+env(safe-area-inset-bottom))] lg:pb-0">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_TAG_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ADS_TAG_ID}');
          `}
        </Script>
        <SiteHeaderChrome />
        <main className="flex-1">{children}</main>
        <SiteFooterChrome />
        <ScrollAnimations />
        <AnalyticsTracker />
      </body>
    </html>
  );
}

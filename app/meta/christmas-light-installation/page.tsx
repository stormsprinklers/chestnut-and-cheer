import type { Metadata } from "next";
import Script from "next/script";
import { PpcLandingPage } from "@/components/ppc/PpcLandingPage";

export const metadata: Metadata = {
  title: "Christmas Light Installation | Get a Free Quote",
  description: "Professional Christmas light installation in Utah starting at $499.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function MetaChristmasLightInstallationPage() {
  return (
    <>
      <Script id="meta-pixel-holiday-lights" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1129105246339804');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=1129105246339804&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
      <PpcLandingPage service="temporary" channel="meta" />
    </>
  );
}

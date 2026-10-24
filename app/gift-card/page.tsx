import type { Metadata } from "next";
import Image from "next/image";
import { Check, Gift, Sparkles } from "lucide-react";
import { GiftCardQuoteForm } from "@/components/gift-card/GiftCardQuoteForm";
import { ASSETS, COMPANY } from "@/lib/constants";
import { absoluteUrl } from "@/lib/site";

const description =
  "Request a Christmas lighting quote and redeem your $100 Chestnut & Cheer promotional gift card toward new seasonal or permanent holiday lights.";

export const metadata: Metadata = {
  title: "Redeem Your $100 Christmas Lights Gift Card",
  description,
  alternates: { canonical: "/gift-card" },
  robots: { index: false, follow: true },
  openGraph: {
    title: `$100 Christmas Lights Gift Card | ${COMPANY.name}`,
    description,
    url: absoluteUrl("/gift-card"),
    images: [{ url: absoluteUrl(ASSETS.photos.hero), alt: "Professionally installed Christmas lights on a Utah home" }],
  },
};

export default function GiftCardPage() {
  return (
    <div className="overflow-hidden bg-cream">
      <section className="relative isolate bg-chestnut text-warm-white">
        <Image src={ASSETS.photos.hero} alt="A Chestnut & Cheer Christmas lighting professional" fill priority sizes="100vw" className="-z-20 object-cover object-center" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-chestnut via-chestnut/95 to-chestnut/55" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(230,194,122,.24),transparent_32%)]" />

        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1fr_.92fr] lg:items-center lg:gap-14 lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent-gold/40 bg-accent-gold/15 px-4 py-2 text-sm font-semibold text-accent-gold backdrop-blur-sm">
              <Gift className="size-4" aria-hidden />
              You&apos;ve been given a little extra cheer
            </div>

            <h1 className="mt-6 max-w-2xl font-display text-5xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
              Put your <span className="text-accent-gold">$100 gift card</span> toward a home that shines.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-warm-white/85 sm:text-xl">
              Share a few details and our Christmas lighting team will reach out with a personalized quote for your home.
            </p>

            <ul className="mt-8 grid max-w-xl gap-3 text-sm sm:grid-cols-2 sm:text-base">
              {["Seasonal holiday lights", "Permanent holiday lights", "Custom-fit for your home", "Professional installation"].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-gold text-chestnut">
                    <Check className="size-4" strokeWidth={3} aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex items-end gap-4">
              <Image src={ASSETS.mascots.gift} alt="Chestnut & Cheer mascot holding a Christmas gift" width={132} height={153} className="h-auto w-24 drop-shadow-xl sm:w-32" />
              <div className="mb-2 rounded-2xl rounded-bl-sm bg-warm-white px-4 py-3 text-sm font-semibold leading-snug text-chestnut shadow-lg">
                <Sparkles className="mb-1 size-4 text-primary-red" aria-hidden />
                Let&apos;s make your home merry &amp; bright!
              </div>
            </div>
          </div>

          <GiftCardQuoteForm />
        </div>
      </section>
    </div>
  );
}

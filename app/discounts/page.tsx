import type { Metadata } from "next";
import Link from "next/link";
import { Camera, Gift, Share2, Signpost, Sparkles, Video } from "lucide-react";
import { Breadcrumbs, PageHero } from "@/components/pages/PageChrome";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { ASSETS, COMPANY, LINKS } from "@/lib/constants";
import { absoluteUrl } from "@/lib/site";
import { getBreadcrumbSchema, getOrganizationSchema } from "@/lib/structured-data";

const description = "Save on professional holiday lighting with yard signs, customer photos, video testimonials, social posts, and Chestnut & Cheer's referral rewards.";

export const metadata: Metadata = {
  title: "Holiday Lighting Discounts & Referral Rewards",
  description,
  alternates: { canonical: "/discounts" },
  openGraph: {
    title: `Holiday Lighting Discounts | ${COMPANY.name}`,
    description,
    url: absoluteUrl("/discounts"),
    images: [{ url: absoluteUrl(ASSETS.beforeAfter.after), alt: "A Utah home glowing with professionally installed Christmas lights" }],
  },
  twitter: { card: "summary_large_image", title: `Holiday Lighting Discounts | ${COMPANY.name}`, description, images: [absoluteUrl(ASSETS.beforeAfter.after)] },
};

const discounts = [
  {
    amount: "$25",
    title: "Yard Sign Discount",
    icon: Signpost,
    description: "Leave a Chestnut & Cheer yard sign displayed at your home for at least two weeks during November or December, and we will take $25 off your total.",
    tag: "One per installation",
  },
  {
    amount: "$25",
    title: "Video Testimonial Discount",
    icon: Video,
    description: "Record a short 10–15 second video in front of your home while the lights are on. Tell us what you love about the finished display, then send the video to us with permission to share it on our social media.",
    tag: "Quick and easy",
  },
  {
    amount: "$25",
    title: "Photo & Feedback Discount",
    icon: Camera,
    description: "Send us a nighttime photo of your installed holiday lights along with a short, honest testimonial we may use in our marketing. Each adult household member who genuinely experienced the service may submit their own original photo and feedback for review.",
    tag: "Stackable",
  },
  {
    amount: "$25",
    title: "Social Post Discount",
    icon: Share2,
    description: "Post a photo of your holiday lights or your testimonial video on your personal social media, tag Chestnut & Cheer, and clearly disclose that you received a $25 discount for sharing the post. Each eligible household member may participate using their own account.",
    tag: "Stackable",
  },
  {
    amount: "$100 + $100",
    title: "Referral Program",
    icon: Gift,
    description: "Refer a friend who purchases a Christmas lighting package from us. You will receive a $100 Visa gift card, and your friend will receive $100 off their package. Refer as many qualifying friends as you would like—and you could eventually get paid to have Christmas lights.",
    tag: "Unlimited qualifying referrals",
  },
] as const;

export default function DiscountsPage() {
  return <>
    <JsonLd data={[
      getOrganizationSchema(),
      getBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Discounts", path: "/discounts" }]),
      { "@context": "https://schema.org", "@type": "WebPage", name: "Holiday Lighting Discounts Available", description, url: absoluteUrl("/discounts"), about: { "@id": `${absoluteUrl("/")}#organization` } },
    ]} />
    <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Discounts" }]} />
    <PageHero
      eyebrow="More ways to save"
      title="Holiday Lighting Discounts Available"
      description="Share the cheer, tell your friends, or help others see what your home looks like after dark. Every qualifying action can make your full-service holiday lighting more affordable."
      ctaHref={LINKS.estimate}
      ctaLabel="Get My Estimate"
      image={ASSETS.beforeAfter.after}
      imageAlt="A Utah home illuminated with professional Christmas lights"
    />

    <section className="section-pad bg-cream">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-red">Choose one or stack several</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-chestnut sm:text-4xl">Five cheerful ways to save</h2>
          <p className="mt-4 leading-relaxed text-chestnut/70">Complete the applicable requirement, send us the proof, and our team will confirm your discount or referral reward.</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {discounts.map(({ amount, title, icon: Icon, description: offer, tag }, index) => <article key={title} className={`${index === discounts.length - 1 ? "md:col-span-2 lg:col-span-1" : ""} flex h-full flex-col rounded-3xl border border-chestnut/10 bg-white p-6 shadow-[0_10px_30px_rgba(94,59,40,0.06)] sm:p-7`}>
            <div className="flex items-start justify-between gap-4">
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-accent-gold/25 text-primary-red"><Icon className="size-6" aria-hidden /></span>
              <span className="rounded-full bg-chestnut px-4 py-2 text-lg font-bold text-warm-white">{amount}</span>
            </div>
            <h3 className="mt-6 font-display text-2xl font-bold text-chestnut">{title}</h3>
            <p className="mt-3 flex-1 leading-relaxed text-chestnut/72">{offer}</p>
            <p className="mt-6 border-t border-chestnut/10 pt-4 text-xs font-bold uppercase tracking-[0.16em] text-primary-red">{tag}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section className="section-pad bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-red">How to claim a discount</p><h2 className="mt-3 font-display text-3xl font-bold text-chestnut sm:text-4xl">Send it our way before your final balance is settled.</h2><p className="mt-4 leading-relaxed text-chestnut/70">Call, text, or email the team with your photo, video, post link, yard-sign dates, or referral details. We will verify eligibility and apply the approved amount.</p></div>
        <ol className="grid gap-4 sm:grid-cols-3">{[
          ["01", "Complete it", "Follow the requirement for the discount you chose."],
          ["02", "Send proof", `Text ${COMPANY.phone} or email ${COMPANY.email}.`],
          ["03", "Get credit", "We will confirm the offer and apply the approved discount or reward."],
        ].map(([number, title, text]) => <li key={number} className="rounded-2xl border border-chestnut/10 bg-cream p-5"><span className="text-sm font-bold text-primary-red">{number}</span><h3 className="mt-3 font-display text-xl font-bold text-chestnut">{title}</h3><p className="mt-2 text-sm leading-relaxed text-chestnut/70">{text}</p></li>)}</ol>
      </div>
    </section>

    <section className="section-pad bg-chestnut text-warm-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Sparkles className="size-8 text-accent-gold" aria-hidden />
        <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">A few important details</h2>
        <ul className="mt-6 grid gap-4 leading-relaxed text-warm-white/78 sm:grid-cols-2">
          <li>Discounts and rewards require verification by Chestnut &amp; Cheer and apply only to qualifying completed actions or purchases.</li>
          <li>Stackable offers must come from different eligible people using their own original content and personal accounts.</li>
          <li>Testimonials must reflect an honest experience. When we publish compensated testimonials, we will clearly disclose the discount.</li>
          <li>Social posts must include a clear disclosure such as “I received a $25 discount for sharing this post.” A tag alone is not enough.</li>
          <li>Google reviews are always voluntary and are never required or compensated. The Photo &amp; Feedback Discount is submitted directly to us.</li>
          <li>Referral rewards are issued after the referred customer signs, purchases, and pays for a qualifying Christmas lighting package.</li>
        </ul>
        <p className="mt-7 text-sm leading-relaxed text-warm-white/60">Offers cannot be redeemed for cash or applied after the account is closed. Visa is a registered trademark of Visa U.S.A. Inc.; Visa does not sponsor or endorse this promotion. Contact us before participating if you have questions about eligibility.</p>
      </div>
    </section>

    <section className="section-pad bg-accent-gold/25">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6"><h2 className="font-display text-3xl font-bold text-chestnut sm:text-4xl">Ready to light up your home and start saving?</h2><p className="mx-auto mt-4 max-w-2xl leading-relaxed text-chestnut/72">Start with an instant estimate, or contact our team if you already have a discount in mind.</p><div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><Button href={LINKS.estimate}>Get Instant Estimate</Button><Button href={LINKS.contact} variant="outline">Ask About Discounts</Button></div><p className="mt-6 text-sm text-chestnut/65">You can also call <a href={LINKS.tel} className="font-semibold underline underline-offset-2">{COMPANY.phone}</a> or email <a href={LINKS.mailto} className="font-semibold underline underline-offset-2">{COMPANY.email}</a>.</p><p className="mt-3 text-xs text-chestnut/55">See our <Link href={LINKS.terms} className="underline underline-offset-2">Terms of Service</Link> for general service terms.</p></div>
    </section>
  </>;
}

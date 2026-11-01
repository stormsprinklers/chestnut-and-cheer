import type { Metadata } from "next";
import Image from "next/image";
import { Gift, Heart, Lightbulb, Mail, Phone, Sparkles, TreePine } from "lucide-react";
import { CheerForm } from "@/components/share-the-cheer/CheerForm";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { ParallaxHeroImage } from "@/components/motion/ParallaxHeroImage";
import { ASSETS, COMPANY, LINKS } from "@/lib/constants";
import { SHARE_THE_CHEER, nominationsOpen } from "@/lib/share-the-cheer";
import { absoluteUrl } from "@/lib/site";
import { getBreadcrumbSchema, getOrganizationSchema } from "@/lib/structured-data";

const description = "Nominate a Utah family for a free and magical Christmas or support Share the Cheer with funds, gifts, or services.";
export const metadata: Metadata = {
  title: { absolute: "Share the Cheer | Supporting Utah Families at Christmas" },
  description,
  alternates: { canonical: "/share-the-cheer" },
  openGraph: {
    title: "Share the Cheer | Supporting Utah Families at Christmas",
    description,
    url: absoluteUrl("/share-the-cheer"),
    type: "website",
    images: [{ url: absoluteUrl(ASSETS.photos.hero), alt: "Chestnut & Cheer holiday lighting at a Utah home" }],
  },
  twitter: { card: "summary_large_image", title: "Share the Cheer | Supporting Utah Families at Christmas", description, images: [absoluteUrl(ASSETS.photos.hero)] },
};

const selectionDate = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", timeZone: "UTC" }).format(new Date(`${SHARE_THE_CHEER.selectionContactBy}T12:00:00Z`));

const sponsors = [
  { name: "Standard Plumbing Supply", href: "https://standardvmi.com/", logo: "/images/sponsors/standard-plumbing.png", width: 600, height: 240 },
  { name: "Village Lighting Company", href: "https://villagelighting.com/", logo: "/images/sponsors/village-lighting.jpg", width: 600, height: 360 },
] as const;

const faq = [
  ["Who can nominate a family?", "Anyone who knows a local family facing a difficult season may nominate them. A family may also nominate itself."],
  ["What areas are eligible?", `Families should live within our current service area: ${COMPANY.serviceAreaSummary}. Any work at a home also depends on safe access and owner permission.`],
  ["How many families will be supported?", `Chestnut & Cheer is committing to fully support ${SHARE_THE_CHEER.familiesSupported} families this year with help from our sponsors. Additional support makes it possible for us to do even more.`],
  ["Does a nominated family have to pay?", "No. Selected families receive their support free. If a nominator chooses to sponsor a family, the nominator covers actual costs; the family still pays nothing."],
  ["Do campaign partners make money from this?", "No. Chestnut & Cheer and our partners do not add markup or make a profit on items or services provided through this giving campaign."],
  ["What kinds of support can I offer?", "Funds, gifts, professional services, meals, experiences, volunteer help, and other useful contributions are welcome."],
  ["Will family names or photos be published?", "Only with clear permission. Families can remain entirely private and are never required to participate in publicity."],
] as const;

function SectionHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return <div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-primary-red">{eyebrow}</p><h2 className="mt-3 font-display text-3xl font-semibold text-chestnut sm:text-4xl">{title}</h2>{children && <p className="mt-4 leading-relaxed text-chestnut/80">{children}</p>}</div>;
}

export default function ShareTheCheerPage() {
  return <>
    <JsonLd data={[getOrganizationSchema(), getBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Share the Cheer", path: "/share-the-cheer" }]), { "@context": "https://schema.org", "@type": "WebPage", name: "Share the Cheer", description, url: absoluteUrl("/share-the-cheer"), about: { "@id": `${absoluteUrl("/")}#organization` } }]} />

    <section className="relative overflow-hidden bg-chestnut text-warm-white">
      <ParallaxHeroImage src={ASSETS.photos.hero} alt="A festive Utah Christmas light installation" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
        <p className="text-xs font-bold uppercase tracking-[.25em] text-accent-gold">A Christmas tradition, shared together</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl font-semibold leading-tight sm:text-6xl">Share the Cheer</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-warm-white/90 sm:text-xl">This year, Chestnut &amp; Cheer is fully supporting five local families out of our own pocket, with help from generous sponsors. Together, we can create a free and magical Christmas for families carrying a lot this season.</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Button href="#nominate" variant="gold">Nominate a family</Button><Button href="#support" variant="primary">Support the cause</Button></div>
      </div>
    </section>

    <section className="section-pad bg-cream"><div className="mx-auto max-w-6xl px-4 sm:px-6">
      <SectionHeading eyebrow="Five families, fully supported" title="A little more magic at home">Every selected family receives support at no cost to them. Chestnut &amp; Cheer is funding the campaign alongside sponsors who share the same commitment to giving without profit.</SectionHeading>
      <div className="mt-9 grid gap-4 md:grid-cols-3">{[
        { icon: Lightbulb, title: "A brighter home", text: "Chestnut & Cheer brings the care, coordination, and holiday lighting experience behind the campaign." },
        { icon: TreePine, title: "A fuller Christmas", text: "Sponsor support can help add trees, meals, gifts, services, and meaningful experiences for each household." },
        { icon: Heart, title: "Given freely", text: "The family pays nothing. No campaign partner marks up their contribution or earns a profit from it." },
      ].map(({ icon: Icon, title, text }) => <article key={title} className="rounded-3xl border border-chestnut/10 bg-white p-6 shadow-sm"><span className="inline-flex size-12 items-center justify-center rounded-full bg-accent-gold/25 text-primary-red"><Icon aria-hidden className="size-6" /></span><h3 className="mt-5 font-display text-xl font-semibold text-chestnut">{title}</h3><p className="mt-2 leading-relaxed text-chestnut/75">{text}</p></article>)}</div>
    </div></section>

    <section className="section-pad bg-white"><div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="text-center"><div className="mx-auto max-w-2xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-primary-red">Campaign sponsors</p><h2 className="mt-3 font-display text-3xl font-semibold text-chestnut sm:text-4xl">Helping us share the cheer</h2><p className="mt-4 leading-relaxed text-chestnut/80">We are grateful to the local businesses helping us serve families with care.</p></div></div>
      <div className="mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-2">{sponsors.map((sponsor) => <a key={sponsor.name} href={sponsor.href} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${sponsor.name}'s website`} className="group flex min-h-48 items-center justify-center overflow-hidden rounded-3xl border border-chestnut/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-red"><Image src={sponsor.logo} alt={`${sponsor.name} logo`} width={sponsor.width} height={sponsor.height} className="max-h-32 w-auto max-w-full object-contain transition group-hover:scale-[1.02]" /></a>)}</div>
    </div></section>

    <section className="section-pad bg-cream"><div className="mx-auto max-w-6xl px-4 sm:px-6">
      <SectionHeading eyebrow="How it works" title="A thoughtful, private process">We keep the nomination simple and coordinate the details directly with selected families.</SectionHeading>
      <ol className="mt-9 grid gap-4 md:grid-cols-4">{["Someone nominates a family and tells us how to reach everyone involved.", "We review the story privately and contact selected families by " + selectionDate + ".", "Our team coordinates confirmed gifts and services with the family and sponsors.", "The family receives their Christmas support completely free."].map((step, index) => <li key={step} className="rounded-2xl bg-white p-5"><span className="text-sm font-bold text-primary-red">0{index + 1}</span><p className="mt-3 font-semibold leading-snug text-chestnut">{step}</p></li>)}</ol>
    </div></section>

    <section className="section-pad bg-chestnut text-warm-white"><div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-12">
      <div className="rounded-full bg-accent-gold/15 p-5 text-accent-gold"><Gift aria-hidden className="size-12" /></div>
      <div><p className="text-xs font-bold uppercase tracking-[.2em] text-accent-gold">Sponsor a nominated family at cost</p><h2 className="mt-3 font-display text-3xl font-semibold">One yes can help us reach another family</h2><p className="mt-4 max-w-3xl leading-relaxed text-warm-white/85">The nomination form asks whether the person submitting it would be willing to sponsor that family. If they say yes, they can cover the actual cost of the gifts or services while the family receives everything free. No partner adds markup or makes a profit. This is always optional, but it gives us more room to help.</p></div>
    </div></section>

    <section className="section-pad scroll-mt-28 bg-cream" id="nominate"><div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[.8fr_1.2fr] lg:gap-14">
      <div className="lg:sticky lg:top-28 lg:self-start"><SectionHeading eyebrow="Start with their story" title="Nominate a family">Tell us who you are, who you are nominating, how many people are in their household, and why they deserve a free and magical Christmas.</SectionHeading><p className="mt-5 text-sm leading-relaxed text-chestnut/75">Your contact information and the family&apos;s contact information are labeled separately. Please share only what we need for an initial review.</p></div>
      {nominationsOpen() ? <CheerForm kind="nomination" /> : <p className="rounded-3xl bg-white p-8 text-chestnut">Nominations are not open right now. Please contact our office if you have a question.</p>}
    </div></section>

    <section className="section-pad scroll-mt-28 bg-white" id="support"><div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[.8fr_1.2fr] lg:gap-14">
      <div className="lg:sticky lg:top-28 lg:self-start"><SectionHeading eyebrow="Give what you can" title="Support the cause">Support can be given through funds, gifts, professional services, meals, experiences, or other useful contributions for the families we serve.</SectionHeading><p className="mt-5 leading-relaxed text-chestnut/80">Just leave your contact information and a note about what you may be able to contribute. Our team will follow up to coordinate the details.</p></div>
      <CheerForm kind="support" />
    </div></section>

    <section className="section-pad bg-chestnut text-warm-white"><div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-12"><div className="rounded-full bg-accent-gold/15 p-5 text-accent-gold"><Heart aria-hidden className="size-12" /></div><div><p className="text-xs font-bold uppercase tracking-[.2em] text-accent-gold">Privacy and dignity</p><h2 className="mt-3 font-display text-3xl font-semibold">Every family deserves room to choose</h2><div className="mt-5 grid gap-3 text-warm-white/85 sm:grid-cols-2"><p>Families may remain completely private and are never required to participate in publicity.</p><p>Personal information is used only to review nominations and coordinate the campaign.</p><p>Photos and stories are shared only with clear permission from the family.</p><p>Sponsors do not receive sensitive nomination details. Selection decisions stay private.</p></div></div></div></section>

    <section className="section-pad bg-white"><div className="mx-auto max-w-4xl px-4 sm:px-6"><SectionHeading eyebrow="Good to know" title="Questions about Share the Cheer" /><div className="mt-8 divide-y divide-chestnut/10 rounded-3xl border border-chestnut/10">{faq.map(([question, answer]) => <details key={question} className="group px-5 py-4 sm:px-6"><summary className="cursor-pointer list-none font-semibold text-chestnut marker:hidden">{question}<span aria-hidden className="float-right ml-4 text-primary-red">+</span></summary><p className="mt-3 max-w-3xl leading-relaxed text-chestnut/80">{answer}</p></details>)}</div></div></section>

    <section className="section-pad bg-accent-gold/25"><div className="mx-auto max-w-6xl px-4 text-center sm:px-6"><Sparkles aria-hidden className="mx-auto size-9 text-primary-red" /><h2 className="mt-4 font-display text-3xl font-semibold text-chestnut sm:text-4xl">Help make Christmas feel magical</h2><p className="mx-auto mt-4 max-w-2xl leading-relaxed text-chestnut/80">Share a family&apos;s story or tell us how you would like to contribute.</p><div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><Button href="#nominate">Nominate a family</Button><Button href="#support" variant="outline">Support the cause</Button></div><div className="mt-8 flex flex-col items-center justify-center gap-2 text-sm text-chestnut sm:flex-row sm:gap-6"><span>Questions? Contact our office:</span><a href={LINKS.tel} className="inline-flex items-center gap-2 underline underline-offset-2"><Phone aria-hidden className="size-4" />{COMPANY.phone}</a><a href={LINKS.mailto} className="inline-flex items-center gap-2 underline underline-offset-2"><Mail aria-hidden className="size-4" />{COMPANY.email}</a></div></div></section>
  </>;
}

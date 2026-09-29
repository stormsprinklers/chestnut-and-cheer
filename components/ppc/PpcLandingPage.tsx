import Image from "next/image";
import { Check, Phone } from "lucide-react";
import { PpcLeadForm } from "@/components/ppc/PpcLeadForm";
import { ASSETS, COMPANY, LINKS } from "@/lib/constants";

type Service = "temporary" | "permanent";

const COPY = {
  temporary: {
    title: "Professional Christmas Light Installation",
    price: "$499",
    description: "Custom-fit holiday lights installed, maintained, removed, and stored by a licensed local team.",
    photo: ASSETS.photos.temporaryInstall,
    alt: "Professional Christmas light installer working on a Utah roofline",
    benefits: ["Custom-fit commercial-grade lights", "In-season maintenance", "Takedown and storage included"],
  },
  permanent: {
    title: "Permanent Christmas Light Installation",
    price: "$2,999",
    description: "Clean, app-controlled roofline lighting for Christmas, game days, and year-round curb appeal.",
    photo: ASSETS.photos.permanentLighting,
    alt: "Utah home illuminated with permanent roofline lights",
    benefits: ["Discreet daytime appearance", "App-controlled colors and schedules", "Professional installation and warranty"],
  },
} as const;

export function PpcLandingPage({ service }: { service: Service }) {
  const content = COPY[service];
  return (
    <article className="ppc-page min-h-screen bg-cream text-chestnut">
      <header className="border-b border-chestnut/10 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Image src={ASSETS.brand.logoPrimary} alt={COMPANY.name} width={180} height={120} className="h-12 w-auto object-contain" priority />
          <a href={LINKS.tel} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-chestnut/15 px-4 text-sm font-semibold text-chestnut"><Phone className="h-4 w-4 text-primary-red" aria-hidden="true" /><span className="hidden sm:inline">{COMPANY.phone}</span><span className="sm:hidden">Call Now</span></a>
        </div>
      </header>
      <main className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:gap-14 lg:py-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[.16em] text-primary-red">Northern Utah &amp; the Wasatch Back</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">{content.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-chestnut/70">{content.description}</p>
          <p className="mt-6 font-display text-3xl font-semibold text-primary-red">Starting at {content.price}</p>
          <ul className="mt-5 space-y-3">
            {content.benefits.map((benefit) => <li key={benefit} className="flex items-center gap-3 text-chestnut/80"><span className="grid h-6 w-6 place-items-center rounded-full bg-accent-gold/30"><Check className="h-4 w-4 text-primary-red" aria-hidden="true" /></span>{benefit}</li>)}
          </ul>
          <div className="relative mt-7 aspect-[16/10] overflow-hidden rounded-3xl shadow-lg">
            <Image src={content.photo} alt={content.alt} fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
          </div>
        </div>
        <PpcLeadForm service={service} />
      </main>
      <footer className="border-t border-chestnut/10 px-4 py-5 text-center text-xs text-chestnut/55">© {new Date().getFullYear()} {COMPANY.name} · Licensed &amp; Insured · S330 #14211467-5501</footer>
    </article>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { ASSETS, COMPANY, LINKS } from "@/lib/constants";

export function OfferHeader({ label }: { label: string }) {
  return (
    <header className="border-b border-chestnut/10 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
        <Link href="/" aria-label={`${COMPANY.name} home`}>
          <Image
            src={ASSETS.brand.logoPrimary}
            alt={COMPANY.name}
            width={180}
            height={120}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>
        <p className="hidden text-xs font-semibold uppercase tracking-[.18em] text-chestnut/60 md:block">
          {label}
        </p>
        <a
          href={LINKS.tel}
          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-chestnut/15 px-4 text-sm font-semibold text-chestnut transition hover:border-primary-red hover:text-primary-red"
        >
          <Phone className="h-4 w-4 text-primary-red" aria-hidden />
          <span className="hidden sm:inline">{COMPANY.phone}</span>
          <span className="sm:hidden">Call</span>
        </a>
      </div>
    </header>
  );
}

export function OfferFooter() {
  return (
    <footer className="border-t border-chestnut/10 bg-white px-4 py-6 text-center text-xs leading-relaxed text-chestnut/55">
      <p>
        © {new Date().getFullYear()} {COMPANY.name} · Licensed &amp; Insured · S330 {COMPANY.license}
      </p>
      <p className="mt-2">
        <Link className="underline underline-offset-2" href={LINKS.privacy}>Privacy Policy</Link>
        {" · "}
        <Link className="underline underline-offset-2" href={LINKS.terms}>Terms of Service</Link>
      </p>
    </footer>
  );
}

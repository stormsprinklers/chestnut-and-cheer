import Image from "next/image";
import Link from "next/link";
import { Phone, Sparkles } from "lucide-react";
import { ASSETS, COMPANY, LINKS, NAV_LINKS } from "@/lib/constants";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-chestnut/10 bg-cream/95 backdrop-blur-md supports-[padding:max(0px)]:pt-[env(safe-area-inset-top)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-2 sm:gap-4 sm:px-6 sm:py-2.5">
        <Link href="/" className="flex shrink-0 items-center" aria-label={COMPANY.name}>
          <Image
            src={ASSETS.brand.logoPrimary}
            alt={COMPANY.name}
            width={200}
            height={133}
            className="h-11 w-auto object-contain sm:h-14"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-5 xl:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="text-sm font-medium text-chestnut/80 transition-colors hover:text-primary-red"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={LINKS.estimate}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent-gold px-4 text-sm font-semibold text-chestnut transition-colors hover:bg-accent-gold/90 active:scale-95 lg:hidden touch-manipulation"
          >
            Estimate
          </Link>

          <a
            href={LINKS.tel}
            className="hidden items-center gap-2 rounded-full bg-primary-red px-4 py-2 text-sm font-semibold text-warm-white transition-colors hover:bg-primary-red/90 lg:inline-flex"
          >
            <Phone className="h-4 w-4" />
            {COMPANY.phone}
          </a>
          <Link
            href={LINKS.estimate}
            className="hidden items-center gap-2 rounded-full bg-accent-gold px-4 py-2 text-sm font-semibold text-chestnut transition-colors hover:bg-accent-gold/90 lg:inline-flex"
          >
            <Sparkles className="h-4 w-4" />
            Get Instant Estimate
          </Link>
        </div>
      </div>
      <nav className="overflow-x-auto border-t border-chestnut/10 px-4 xl:hidden" aria-label="Mobile navigation">
        <div className="mx-auto flex min-w-max max-w-6xl gap-5 py-2.5">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-chestnut/80 hover:text-primary-red">
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

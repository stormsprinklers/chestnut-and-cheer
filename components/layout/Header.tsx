import Image from "next/image";
import Link from "next/link";
import { Phone, MessageSquare, Calendar } from "lucide-react";
import { ASSETS, COMPANY, LINKS, NAV_LINKS } from "@/lib/constants";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-chestnut/10 bg-cream/95 backdrop-blur-md supports-[padding:max(0px)]:pt-[env(safe-area-inset-top)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-2.5 sm:gap-4 sm:px-6 sm:py-3">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src={ASSETS.brand.head}
            alt={COMPANY.name}
            width={44}
            height={44}
            className="h-10 w-10 object-contain sm:h-11 sm:w-11"
            priority
          />
          <div className="hidden sm:block">
            <div className="font-display text-lg font-bold leading-tight text-chestnut">
              {COMPANY.name}
            </div>
            <div className="text-xs text-chestnut/60">{COMPANY.tagline}</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-chestnut/80 transition-colors hover:text-primary-red"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={LINKS.tel}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-red text-warm-white transition-colors hover:bg-primary-red/90 active:scale-95 lg:hidden touch-manipulation"
            aria-label={`Call ${COMPANY.phone}`}
          >
            <Phone className="h-4 w-4" />
          </a>
          <a
            href={LINKS.sms}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-chestnut/20 bg-white text-chestnut transition-colors hover:bg-chestnut/5 active:scale-95 lg:hidden touch-manipulation"
            aria-label={`Text ${COMPANY.phone}`}
          >
            <MessageSquare className="h-4 w-4" />
          </a>
          <Link
            href={LINKS.booking}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-gold text-chestnut transition-colors hover:bg-accent-gold/90 active:scale-95 lg:hidden touch-manipulation"
            aria-label="Book online"
          >
            <Calendar className="h-4 w-4" />
          </Link>

          <a
            href={LINKS.tel}
            className="hidden items-center gap-2 rounded-full bg-primary-red px-4 py-2 text-sm font-semibold text-warm-white transition-colors hover:bg-primary-red/90 lg:inline-flex"
          >
            <Phone className="h-4 w-4" />
            {COMPANY.phone}
          </a>
          <a
            href={LINKS.sms}
            className="hidden items-center gap-2 rounded-full border border-chestnut/20 bg-white px-4 py-2 text-sm font-semibold text-chestnut transition-colors hover:bg-chestnut/5 lg:inline-flex"
          >
            <MessageSquare className="h-4 w-4" />
            Text Us
          </a>
          <Link
            href={LINKS.booking}
            className="hidden items-center gap-2 rounded-full bg-accent-gold px-4 py-2 text-sm font-semibold text-chestnut transition-colors hover:bg-accent-gold/90 lg:inline-flex"
          >
            <Calendar className="h-4 w-4" />
            Book Online
          </Link>
        </div>
      </div>
    </header>
  );
}

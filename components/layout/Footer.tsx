import Image from "next/image";
import Link from "next/link";
import { ASSETS, COMPANY, LINKS, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-chestnut/10 bg-chestnut text-warm-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <Image
            src={ASSETS.brand.logoPrimary}
            alt={COMPANY.name}
            width={220}
            height={80}
            className="h-16 w-auto object-contain object-left"
            loading="lazy"
          />
          <p className="mt-4 text-sm text-warm-white/70 leading-relaxed">
            Premium holiday lighting for residential and commercial properties
            across Utah County and Salt Lake County.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold">Quick Links</h3>
          <ul className="mt-3 space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-warm-white/70 transition-colors hover:text-accent-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={LINKS.booking}
                className="text-sm text-warm-white/70 transition-colors hover:text-accent-gold"
              >
                Book Online
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold">Contact</h3>
          <ul className="mt-3 space-y-2 text-sm text-warm-white/70">
            <li>
              <a href={LINKS.tel} className="transition-colors hover:text-accent-gold">
                {COMPANY.phone}
              </a>
            </li>
            <li>
              <a href={LINKS.mailto} className="transition-colors hover:text-accent-gold">
                {COMPANY.email}
              </a>
            </li>
            <li>{COMPANY.address.full}</li>
            <li className="pt-2 text-warm-white/50">
              Licensed & Insured · {COMPANY.license}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-warm-white/10 py-4 text-center text-sm text-warm-white/50">
        &copy; {year} {COMPANY.name}. All rights reserved.
      </div>
    </footer>
  );
}

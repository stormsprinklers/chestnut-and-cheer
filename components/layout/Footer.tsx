import Image from "next/image";
import Link from "next/link";
import { ASSETS, COMPANY, LINKS, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-chestnut/10 bg-chestnut text-warm-white">
      <div className="mx-auto max-w-4xl px-4 pt-8 sm:px-6">
        <Image
          src={ASSETS.brand.stringLights}
          alt=""
          width={1000}
          height={224}
          className="mx-auto h-auto w-full max-w-2xl object-contain opacity-80"
          aria-hidden
          loading="lazy"
        />
      </div>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <Image
            src={ASSETS.brand.logoPrimary}
            alt={COMPANY.name}
            width={220}
            height={147}
            className="h-16 w-auto object-contain object-left sm:h-[4.5rem]"
            loading="lazy"
          />
          <Image
            src={ASSETS.brand.tagline}
            alt={COMPANY.tagline}
            width={220}
            height={75}
            className="mt-3 h-auto w-44 object-contain object-left opacity-90"
            loading="lazy"
          />
          <p className="mt-3 text-sm text-warm-white/70 leading-relaxed">
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
                href={LINKS.estimate}
                className="text-sm text-warm-white/70 transition-colors hover:text-accent-gold"
              >
                Get Instant Estimate
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

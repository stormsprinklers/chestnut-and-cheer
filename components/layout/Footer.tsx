import Image from "next/image";
import Link from "next/link";
import { ASSETS, COMPANY, FOOTER_COLUMNS, LINKS } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-chestnut/10 bg-chestnut text-warm-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src={ASSETS.brand.logoPrimary}
            alt={COMPANY.name}
            width={220}
            height={147}
            className="h-16 w-auto object-contain object-left sm:h-[4.5rem]"
            loading="lazy"
          />
          <p className="mt-4 text-sm leading-relaxed text-warm-white/70">
            Premium holiday lighting for homes and businesses across Utah County
            and Salt Lake County.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-warm-white/70">
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
            <li className="pt-1 text-warm-white/50">
              Licensed &amp; Insured · License {COMPANY.license}
            </li>
          </ul>
        </div>

        {FOOTER_COLUMNS.map((column) => (
          <div key={column.title}>
            <h3 className="font-display text-lg font-semibold">{column.title}</h3>
            <ul className="mt-3 space-y-2">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-warm-white/70 transition-colors hover:text-accent-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-warm-white/10 px-4 py-4 text-center text-sm text-warm-white/50">
        &copy; {year} {COMPANY.name}. All rights reserved. Serving{" "}
        {COMPANY.serviceAreas.join(" & ")}.
      </div>
    </footer>
  );
}

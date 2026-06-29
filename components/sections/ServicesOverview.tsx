import Image from "next/image";
import { Check } from "lucide-react";
import { SERVICES } from "@/lib/constants";

export function ServicesOverview() {
  return (
    <section id="services" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-chestnut sm:text-4xl">
            Our Services
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-chestnut/70">
            From one-season sparkle to year-round brilliance — we handle
            residential and commercial holiday lighting across Utah and Salt Lake
            County.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {SERVICES.map((service) => (
            <article
              key={service.id}
              className="overflow-hidden rounded-2xl border border-chestnut/10 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[16/10] bg-cream">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-chestnut">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-chestnut/70">
                  {service.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-chestnut/80"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-red" aria-hidden />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

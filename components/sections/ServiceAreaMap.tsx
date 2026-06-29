import { COMPANY, MAP_EMBED_URL } from "@/lib/constants";

export function ServiceAreaMap() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-chestnut sm:text-4xl">
            Service Area
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-chestnut/70">
            Proudly serving {COMPANY.serviceAreas.join(" and ")} — including
            Orem, Provo, Lehi, Sandy, Draper, and surrounding communities.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-chestnut/10 shadow-sm">
          <iframe
            title="Chestnut & Cheer service area map"
            src={MAP_EMBED_URL}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}

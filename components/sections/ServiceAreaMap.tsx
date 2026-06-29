import { COMPANY, MAP_EMBED_URL } from "@/lib/constants";
import { LazyMap } from "@/components/ui/LazyMap";

export function ServiceAreaMap() {
  return (
    <section className="section-pad below-fold">
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

        <div className="mt-8 overflow-hidden rounded-2xl border border-chestnut/10 shadow-sm sm:mt-10">
          <LazyMap
            src={MAP_EMBED_URL}
            title="Chestnut & Cheer service area map"
          />
        </div>
      </div>
    </section>
  );
}

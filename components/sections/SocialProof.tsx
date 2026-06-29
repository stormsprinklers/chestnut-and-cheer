import { Shield, Award, Lightbulb, MapPin } from "lucide-react";
import { TRUST_BADGES } from "@/lib/constants";

const ICONS = [Shield, Award, Lightbulb, MapPin];

export function SocialProof() {
  return (
    <section className="border-b border-chestnut/10 bg-white py-6 sm:py-10">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 sm:gap-6 sm:px-6 md:grid-cols-4">
        {TRUST_BADGES.map((badge, index) => {
          const Icon = ICONS[index];
          return (
            <div key={badge.label} className="flex flex-col items-center text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary-red/10 text-primary-red">
                <Icon className="h-6 w-6" aria-hidden />
              </div>
              <div className="font-semibold text-sm text-chestnut sm:text-base">{badge.label}</div>
              <div className="mt-0.5 text-xs text-chestnut/60 sm:mt-1 sm:text-sm">{badge.detail}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

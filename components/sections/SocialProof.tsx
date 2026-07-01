import { Shield, Award, Lightbulb, MapPin, Star } from "lucide-react";
import { TRUST_BADGES } from "@/lib/constants";
import {
  getGoogleReviewStats,
  getGoogleReviewsUrl,
} from "@/lib/structured-data";

const ICONS = [Shield, Award, Lightbulb, MapPin];

export function SocialProof() {
  const googleStats = getGoogleReviewStats();
  const googleUrl = getGoogleReviewsUrl();

  return (
    <section className="border-b border-chestnut/10 bg-white py-6 sm:py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <a
          href={googleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-6 flex flex-col items-center justify-center gap-2 rounded-xl border border-chestnut/10 bg-cream px-4 py-4 text-center transition-colors hover:border-primary-red/30 hover:bg-cream/80 sm:mb-8 sm:flex-row sm:gap-3 sm:py-3 touch-manipulation"
        >
          <div className="flex items-center gap-1 text-accent-gold">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current sm:h-5 sm:w-5" aria-hidden />
            ))}
          </div>
          {googleStats ? (
            <span className="text-sm font-semibold text-chestnut sm:text-base">
              {googleStats.rating.toFixed(1)} stars from {googleStats.count} Google reviews
            </span>
          ) : (
            <span className="text-sm font-semibold text-chestnut sm:text-base">
              Read our reviews on Google
            </span>
          )}
          <span className="text-xs text-chestnut/60 sm:text-sm">→</span>
        </a>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {TRUST_BADGES.map((badge, index) => {
            const Icon = ICONS[index];
            return (
              <div key={badge.label} className="flex flex-col items-center text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary-red/10 text-primary-red">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <div className="font-semibold text-sm text-chestnut sm:text-base">
                  {badge.label}
                </div>
                <div className="mt-0.5 text-xs text-chestnut/60 sm:mt-1 sm:text-sm">
                  {badge.detail}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

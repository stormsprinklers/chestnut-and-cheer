import { Sparkles } from "lucide-react";
import { LazyYouTubeVideo } from "@/components/video/LazyYouTubeVideo";
import { CHESTNUT_PROMO_YOUTUBE } from "@/lib/constants";

export function CompanyVideo() {
  return (
    <section className="section-pad below-fold bg-white">
      <div className="mx-auto grid max-w-6xl items-center gap-9 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary-red">
            <Sparkles className="h-4 w-4" aria-hidden />
            Meet Chestnut &amp; Cheer
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-chestnut sm:text-4xl">
            See what we&apos;re nuts about.
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-chestnut/70">
            Get to know the people and purpose behind our Christmas lighting service—and why we care about making the whole experience feel as cheerful as the finished display.
          </p>
          <p className="mt-4 text-sm font-semibold text-chestnut/55">
            The full video player loads only when you press play.
          </p>
        </div>
        <LazyYouTubeVideo
          videoId={CHESTNUT_PROMO_YOUTUBE.videoId}
          title={CHESTNUT_PROMO_YOUTUBE.title}
        />
      </div>
    </section>
  );
}

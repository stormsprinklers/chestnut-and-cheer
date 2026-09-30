"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type ParallaxHeroImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  objectPosition?: string;
};

/**
 * Full-bleed hero image with the same restrained scroll drift used on the
 * Storm site. The direct style update avoids rerendering the page on scroll.
 */
export function ParallaxHeroImage({
  src,
  alt,
  priority = true,
  objectPosition = "center",
}: ParallaxHeroImageProps) {
  const imageLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const imageLayer = imageLayerRef.current;
    if (!imageLayer) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (reducedMotion.matches) {
        imageLayer.style.transform = "none";
        return;
      }

      const progress = Math.min(Math.max(window.scrollY, 0), 500);
      const offset = progress * 0.12;
      const scale = 1 + progress * 0.00008;
      imageLayer.style.transform = `translate3d(0, ${offset}px, 0) scale(${scale})`;
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    reducedMotion.addEventListener("change", update);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      reducedMotion.removeEventListener("change", update);
    };
  }, []);

  return (
    <>
      <div
        ref={imageLayerRef}
        className="absolute -inset-[8%] transform-gpu will-change-transform"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          fetchPriority={priority ? "high" : "auto"}
          className="object-cover"
          style={{ objectPosition }}
          sizes="100vw"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(105deg,rgba(43,23,16,0.95)_0%,rgba(72,38,27,0.86)_48%,rgba(103,25,56,0.72)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(35,19,14,0.38),transparent_45%)]"
      />
    </>
  );
}

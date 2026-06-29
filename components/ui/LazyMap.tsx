"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";

type LazyMapProps = {
  src: string;
  title: string;
};

export function LazyMap({ src, title }: LazyMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || shouldLoad) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div
      ref={containerRef}
      className="relative h-[min(50vh,280px)] w-full sm:h-[400px]"
    >
      {shouldLoad ? (
        <iframe
          title={title}
          src={src}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setShouldLoad(true)}
          className="flex h-full w-full flex-col items-center justify-center gap-3 bg-cream px-6 text-chestnut transition-colors hover:bg-cream/80"
        >
          <MapPin className="h-8 w-8 text-primary-red" aria-hidden />
          <span className="font-semibold">Tap to load service area map</span>
          <span className="text-sm text-chestnut/60">Saves data until you need it</span>
        </button>
      )}
    </div>
  );
}

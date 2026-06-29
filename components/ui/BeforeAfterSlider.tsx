"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";

type BeforeAfterSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
};

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.min(100, Math.max(0, (x / rect.width) * 100));
    setPosition(percent);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = () => setIsDragging(false);

  return (
    <div className="space-y-4">
      <div
        ref={containerRef}
        className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-chestnut/10 shadow-lg select-none touch-none"
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <Image
          src={afterSrc}
          alt={afterAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
        />

        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={beforeSrc}
            alt={beforeAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>

        <div
          className="absolute inset-y-0 z-10 w-1 bg-warm-white shadow-md"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        >
          <button
            type="button"
            aria-label="Drag to compare before and after"
            className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border-2 border-warm-white bg-primary-red text-warm-white shadow-lg touch-manipulation"
            onPointerDown={handlePointerDown}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
              <path d="M7 4L3 10l4 6M13 4l4 6-4 6" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </button>
        </div>

        <span className="absolute top-4 left-4 rounded-full bg-chestnut/80 px-3 py-1 text-xs font-semibold text-warm-white">
          Before
        </span>
        <span className="absolute top-4 right-4 rounded-full bg-primary-red/90 px-3 py-1 text-xs font-semibold text-warm-white">
          After
        </span>
      </div>

      <label className="sr-only" htmlFor="before-after-range">
        Compare before and after lighting
      </label>
      <input
        id="before-after-range"
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        className="w-full accent-primary-red"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={position}
      />
    </div>
  );
}

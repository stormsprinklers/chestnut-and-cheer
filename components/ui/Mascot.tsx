"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ASSETS } from "@/lib/constants";

export type MascotVariant =
  | "worker"
  | "gift"
  | "cheer"
  | "jump"
  | "fullBody"
  | "phone"
  | "csr"
  | "pointing"
  | "holdingLights";

export type MascotSide = "left" | "right";

const MASCOT_ALTS: Record<MascotVariant, string> = {
  worker: "Chestnut & Cheer mascot carrying a ladder",
  gift: "Chestnut & Cheer mascot opening a Christmas present",
  cheer: "Chestnut & Cheer mascot celebrating",
  jump: "Chestnut & Cheer mascot jumping with excitement",
  fullBody: "Chestnut & Cheer mascot holding a Christmas light bulb",
  phone: "Chestnut & Cheer mascot smiling on a phone",
  csr: "Chestnut & Cheer mascot with a headset ready to help",
  pointing: "Chestnut & Cheer mascot pointing toward an offer",
  holdingLights: "Chestnut & Cheer mascot holding a bundle of Christmas lights",
};

// The same clip is shared wherever the pose has the same meaning.
const ANIMATIONS: Record<MascotVariant, { name: string; loop: boolean }> = {
  worker: { name: "worker", loop: true },
  gift: { name: "gift", loop: false },
  cheer: { name: "cheer", loop: false },
  jump: { name: "cheer", loop: false },
  fullBody: { name: "idle", loop: true },
  phone: { name: "phone", loop: true },
  csr: { name: "csr", loop: true },
  pointing: { name: "pointing", loop: false },
  holdingLights: { name: "lights", loop: true },
};

// The single-play WebPs end on their final frame after 6.6 seconds.
const SINGLE_PLAY_DURATION_MS = 6600;

type MascotProps = {
  variant: MascotVariant;
  /** Layout side relative to content. For pointing, right-side placement flips so he points left. */
  side?: MascotSide;
  flip?: boolean;
  size?: number;
  className?: string;
  priority?: boolean;
};

export function Mascot({
  variant,
  side = "left",
  flip,
  size = 200,
  className = "",
  priority = false,
}: MascotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [ready, setReady] = useState(false);
  const [ended, setEnded] = useState(false);
  const { name, loop } = ANIMATIONS[variant];
  const assetBase = `/animations/mascots/${name}`;
  const shouldFlip = flip ?? (variant === "pointing" && side === "right");
  const active = inView && pageVisible && !reducedMotion && !ended;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const update = () => {
      setPageVisible(!document.hidden);
      if (document.hidden && !ended) setReady(false);
    };
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, [ended]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (!entry.isIntersecting && !ended) setReady(false);
      },
      { threshold: 0.25 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ended]);

  useEffect(() => {
    if (loop || !active || !ready) return;
    const timer = window.setTimeout(() => setEnded(true), SINGLE_PLAY_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [loop, active, ready]);

  return (
    <div
      ref={containerRef}
      className={`relative shrink-0 ${className}`}
      style={{ width: size, maxWidth: "100%", aspectRatio: "1 / 1" }}
      role="img"
      aria-label={MASCOT_ALTS[variant]}
    >
      <div className={`absolute inset-0 ${shouldFlip ? "-scale-x-100" : ""}`}>
        {(!ready || !active) && (
          <Image
            src={ended && !loop ? `${assetBase}-final.png` : ASSETS.mascots[variant]}
            alt=""
            fill
            className="object-contain object-bottom"
            sizes={`(max-width: 1024px) ${Math.min(size, 140)}px, ${size}px`}
            {...(priority ? { priority: true } : { loading: "lazy" as const })}
          />
        )}
        {active && (
          // Native img preserves animated WebP frames; Next/Image's decode gate can hide playback.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`${assetBase}.webp?v=3`}
            alt=""
            width={size}
            height={size}
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover ${ready ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setReady(true)}
            onError={() => setReady(false)}
          />
        )}
      </div>
    </div>
  );
}

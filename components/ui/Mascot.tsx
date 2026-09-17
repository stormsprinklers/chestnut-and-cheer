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

const WEBP_DURATION_MS = 7000;

function needsWebpFallback() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  // WebKit can decode VP9 WebM while ignoring its alpha channel.
  return /iP(ad|hone|od)/.test(ua) || (/Safari/.test(ua) && !/Chrome|Chromium|CriOS|FxiOS|Edg|OPR/.test(ua));
}

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [useWebp] = useState(needsWebpFallback);
  const [ready, setReady] = useState(false);
  const [ended, setEnded] = useState(false);
  const { name, loop } = ANIMATIONS[variant];
  const assetBase = `/animations/mascots/${name}`;
  const shouldFlip = flip ?? (variant === "pointing" && side === "right");

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setHasEntered(true);
        if (!entry.isIntersecting && useWebp && !ended) setReady(false);
      },
      { threshold: 0.25 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [useWebp, ended]);

  useEffect(() => {
    if (!useWebp || loop || !inView || !ready || ended || reducedMotion) return;
    const timer = window.setTimeout(() => setEnded(true), WEBP_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [useWebp, loop, inView, ready, ended, reducedMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const syncPlayback = () => {
      if (inView && !reducedMotion && !document.hidden && !ended) {
        void video.play().catch(() => { /* The still image remains visible. */ });
      } else {
        video.pause();
      }
    };
    syncPlayback();
    document.addEventListener("visibilitychange", syncPlayback);
    return () => document.removeEventListener("visibilitychange", syncPlayback);
  }, [inView, reducedMotion, hasEntered, ended, useWebp]);

  return (
    <div
      ref={containerRef}
      className={`relative shrink-0 ${className}`}
      style={{ width: size, maxWidth: "100%", aspectRatio: "1 / 1" }}
      role="img"
      aria-label={MASCOT_ALTS[variant]}
    >
      <div className={`absolute inset-0 ${shouldFlip ? "-scale-x-100" : ""}`}>
        {(!ready || reducedMotion || (useWebp && (!inView || ended))) && (
          <Image
            src={useWebp && ended && !loop ? `${assetBase}-final.png` : ASSETS.mascots[variant]}
            alt=""
            fill
            className="object-contain object-bottom"
            sizes={`(max-width: 1024px) ${Math.min(size, 140)}px, ${size}px`}
            {...(priority ? { priority: true } : { loading: "lazy" as const })}
          />
        )}
        {useWebp && inView && !reducedMotion && !ended && (
          <Image
            src={`${assetBase}.webp?v=2`}
            alt=""
            fill
            unoptimized
            className={`object-cover ${ready ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setReady(true)}
            onError={() => setReady(false)}
          />
        )}
        {!useWebp && hasEntered && !reducedMotion && (
          <video
            ref={videoRef}
            src={`${assetBase}.webm`}
            muted
            playsInline
            loop={loop}
            preload="none"
            aria-hidden="true"
            onLoadedData={() => setReady(true)}
            onError={() => setReady(false)}
            onEnded={() => setEnded(true)}
            className={`absolute inset-0 h-full w-full object-cover ${ready ? "opacity-100" : "opacity-0"}`}
          />
        )}
      </div>
    </div>
  );
}

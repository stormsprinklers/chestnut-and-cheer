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
const ANIMATIONS: Record<MascotVariant, { src: string; loop: boolean }> = {
  worker: { src: "/animations/mascots/worker.webm", loop: true },
  gift: { src: "/animations/mascots/gift.webm", loop: false },
  cheer: { src: "/animations/mascots/cheer.webm", loop: false },
  jump: { src: "/animations/mascots/cheer.webm", loop: false },
  fullBody: { src: "/animations/mascots/idle.webm", loop: true },
  phone: { src: "/animations/mascots/phone.webm", loop: true },
  csr: { src: "/animations/mascots/csr.webm", loop: true },
  pointing: { src: "/animations/mascots/pointing.webm", loop: false },
  holdingLights: { src: "/animations/mascots/lights.webm", loop: true },
};

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
  const [ready, setReady] = useState(false);
  const [ended, setEnded] = useState(false);
  const { src, loop } = ANIMATIONS[variant];
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
      },
      { threshold: 0.25 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

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
  }, [inView, reducedMotion, hasEntered, ended]);

  return (
    <div
      ref={containerRef}
      className={`relative shrink-0 ${className}`}
      style={{ width: size, maxWidth: "100%", aspectRatio: "1 / 1" }}
      role="img"
      aria-label={MASCOT_ALTS[variant]}
    >
      <div className={`absolute inset-0 ${shouldFlip ? "-scale-x-100" : ""}`}>
        {(!ready || reducedMotion) && (
          <Image
            src={ASSETS.mascots[variant]}
            alt=""
            fill
            className="object-contain object-bottom"
            sizes={`(max-width: 1024px) ${Math.min(size, 140)}px, ${size}px`}
            {...(priority ? { priority: true } : { loading: "lazy" as const })}
          />
        )}
        {hasEntered && !reducedMotion && (
          <video
            ref={videoRef}
            src={src}
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

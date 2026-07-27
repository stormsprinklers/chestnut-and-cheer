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
  gift: "Chestnut & Cheer mascot holding a Christmas present",
  cheer: "Chestnut & Cheer mascot jumping and cheering",
  jump: "Chestnut & Cheer mascot jumping with excitement",
  fullBody: "Chestnut & Cheer mascot holding a Christmas light bulb",
  phone: "Chestnut & Cheer mascot smiling on a phone",
  csr: "Chestnut & Cheer mascot with a headset ready to help",
  pointing: "Chestnut & Cheer mascot pointing toward an offer",
  holdingLights: "Chestnut & Cheer mascot holding a bundle of Christmas lights",
};

type MascotProps = {
  variant: MascotVariant;
  /** Layout side relative to content. For pointing, right-side placement flips so he points left. */
  side?: MascotSide;
  /** Force horizontal flip. Defaults to flipping pointing mascot when side is "right". */
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
  const shouldFlip =
    flip ?? (variant === "pointing" ? side === "right" : false);

  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={ASSETS.mascots[variant]}
        alt={MASCOT_ALTS[variant]}
        fill
        className={`object-contain object-bottom ${shouldFlip ? "-scale-x-100" : ""}`}
        sizes={`(max-width: 1024px) ${Math.min(size, 140)}px, ${size}px`}
        {...(priority ? { priority: true } : { loading: "lazy" as const })}
      />
    </div>
  );
}

import Image from "next/image";
import { ASSETS } from "@/lib/constants";

export type MascotVariant = "light" | "gift" | "cheer";
export type MascotSide = "left" | "right";

const MASCOT_ALTS: Record<MascotVariant, string> = {
  light: "Chestnut & Cheer mascot holding a holiday light",
  gift: "Chestnut & Cheer mascot holding a present",
  cheer: "Chestnut & Cheer mascot cheering",
};

type MascotProps = {
  variant: MascotVariant;
  side?: MascotSide;
  size?: number;
  className?: string;
  priority?: boolean;
};

export function Mascot({
  variant,
  side = "left",
  size = 200,
  className = "",
  priority = false,
}: MascotProps) {
  const flipped = side === "right";

  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={ASSETS.mascots[variant]}
        alt={MASCOT_ALTS[variant]}
        fill
        className={`object-contain object-bottom ${flipped ? "-scale-x-100" : ""}`}
        sizes={`(max-width: 1024px) ${Math.min(size, 140)}px, ${size}px`}
        {...(priority ? { priority: true } : { loading: "lazy" as const })}
      />
    </div>
  );
}

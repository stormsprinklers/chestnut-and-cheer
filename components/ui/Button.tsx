import Link from "next/link";
import { type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "gold";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-red text-warm-white hover:bg-primary-red/90 border border-primary-red",
  secondary:
    "bg-chestnut text-warm-white hover:bg-chestnut/90 border border-chestnut",
  outline:
    "bg-transparent text-chestnut border border-chestnut hover:bg-chestnut/5",
  gold: "bg-accent-gold text-chestnut hover:bg-accent-gold/90 border border-accent-gold",
};

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  external?: boolean;
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors";

  if (external) {
    return (
      <a
        href={href}
        className={`${base} ${variantStyles[variant]} ${className}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={`${base} ${variantStyles[variant]} ${className}`}>
      {children}
    </Link>
  );
}

"use client";

import { usePathname } from "next/navigation";
import { COMPANY, LINKS } from "@/lib/constants";
import styles from "./TextUsBubble.module.css";

function MessageIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export function TextUsBubble() {
  const pathname = usePathname();

  if (pathname?.startsWith("/visualize")) {
    return null;
  }

  return (
    <a
      href={LINKS.sms}
      className={styles.bubble}
      aria-label={`Text us at ${COMPANY.phone}`}
    >
      <MessageIcon />
      <span className={styles.label}>Text us</span>
    </a>
  );
}

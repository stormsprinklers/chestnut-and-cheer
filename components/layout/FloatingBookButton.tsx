import Link from "next/link";
import { Calendar } from "lucide-react";
import { LINKS } from "@/lib/constants";

export function FloatingBookButton() {
  return (
    <Link
      href={LINKS.booking}
      className="fixed bottom-6 right-4 z-40 flex items-center gap-2 rounded-full bg-primary-red px-5 py-3 text-sm font-semibold text-warm-white shadow-lg transition-transform hover:scale-105 hover:bg-primary-red/90 lg:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <Calendar className="h-4 w-4" />
      Book Online
    </Link>
  );
}

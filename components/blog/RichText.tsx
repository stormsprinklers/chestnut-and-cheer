import Link from "next/link";

const INTERNAL_LINK = /\[([^\]]+)]\((\/[^)]+)\)/g;

export function RichText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let cursor = 0;

  for (const match of text.matchAll(INTERNAL_LINK)) {
    const index = match.index ?? 0;
    if (index > cursor) parts.push(text.slice(cursor, index));
    parts.push(
      <Link
        key={`${match[2]}-${index}`}
        href={match[2]}
        className="font-semibold text-primary-red underline decoration-primary-red/30 underline-offset-4 transition-colors hover:decoration-primary-red"
      >
        {match[1]}
      </Link>,
    );
    cursor = index + match[0].length;
  }

  if (cursor < text.length) parts.push(text.slice(cursor));
  return <>{parts}</>;
}

"use client";

import Image from "next/image";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LINKS } from "@/lib/constants";

type ResultViewProps = {
  beforeUrl: string;
  afterUrl: string;
  onStartOver: () => void;
};

export function ResultView({ beforeUrl, afterUrl, onStartOver }: ResultViewProps) {
  const download = () => {
    const a = document.createElement("a");
    a.href = afterUrl;
    a.download = "chestnut-cheer-lights-preview.png";
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold text-chestnut sm:text-3xl">
          Your lights preview
        </h2>
        <p className="mt-2 text-sm text-chestnut/70">
          Preview for inspiration — final design is custom-quoted for your
          property.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <figure className="overflow-hidden rounded-2xl border border-chestnut/10 bg-white shadow-sm">
          <div className="relative aspect-[4/3]">
            <Image
              src={beforeUrl}
              alt="Your house before lights"
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
          <figcaption className="px-3 py-2 text-center text-xs font-semibold uppercase tracking-wide text-chestnut/60">
            Before
          </figcaption>
        </figure>
        <figure className="overflow-hidden rounded-2xl border border-primary-red/20 bg-white shadow-sm">
          <div className="relative aspect-[4/3]">
            <Image
              src={afterUrl}
              alt="AI preview of your house with Christmas lights"
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
          <figcaption className="px-3 py-2 text-center text-xs font-semibold uppercase tracking-wide text-primary-red">
            After
          </figcaption>
        </figure>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
        <Button href={LINKS.contact} variant="gold" className="w-full sm:w-auto">
          Get a Free Quote
        </Button>
        <Button href={LINKS.booking} variant="primary" className="w-full sm:w-auto">
          Book Online
        </Button>
        <button
          type="button"
          onClick={download}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-chestnut/20 bg-white px-5 text-sm font-semibold text-chestnut touch-manipulation sm:w-auto"
        >
          <Download className="h-4 w-4" aria-hidden />
          Download preview
        </button>
        <button
          type="button"
          onClick={onStartOver}
          className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-chestnut/20 px-5 text-sm font-semibold text-chestnut/70 touch-manipulation sm:w-auto"
        >
          Try another photo
        </button>
      </div>
    </div>
  );
}

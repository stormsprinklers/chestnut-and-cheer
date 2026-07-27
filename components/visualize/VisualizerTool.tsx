"use client";

import { useCallback, useRef, useState } from "react";
import { Camera, ImagePlus, Loader2, Sparkles } from "lucide-react";
import {
  PaintCanvas,
  type PaintCanvasHandle,
} from "@/components/visualize/PaintCanvas";
import { ResultView } from "@/components/visualize/ResultView";
import TurnstileWidget from "@/components/TurnstileWidget";

type Step = "upload" | "paint" | "result";

export function VisualizerTool() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const paintRef = useRef<PaintCanvasHandle | null>(null);

  const [step, setStep] = useState<Step>("upload");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [canvasReady, setCanvasReady] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileReset, setTurnstileReset] = useState(0);

  const revokeUrl = (url: string | null) => {
    if (url?.startsWith("blob:")) URL.revokeObjectURL(url);
  };

  const loadFile = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose a photo (JPG, PNG, or HEIC converted to JPG).");
      return;
    }
    if (file.size > 12 * 1024 * 1024) {
      setError("Photo is too large. Please use an image under 12MB.");
      return;
    }

    setError(null);
    revokeUrl(imageUrl);
    revokeUrl(resultUrl);
    setResultUrl(null);
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setCanvasReady(false);
    setStep("paint");
  };

  const startOver = () => {
    revokeUrl(imageUrl);
    revokeUrl(resultUrl);
    setImageUrl(null);
    setResultUrl(null);
    setError(null);
    setGenerating(false);
    setTurnstileToken(null);
    setTurnstileReset((n) => n + 1);
    setStep("upload");
  };

  const generate = useCallback(async () => {
    if (!paintRef.current || !imageUrl) return;
    if (!paintRef.current.hasPaint()) {
      setError("Paint the areas where you want Christmas lights first.");
      return;
    }
    if (!turnstileToken) {
      setError("Please complete the human verification checkbox.");
      return;
    }

    setError(null);
    setGenerating(true);

    try {
      const exported = await paintRef.current.exportForApi();
      if (!exported) {
        setError("Could not prepare your photo. Try another image.");
        return;
      }

      const form = new FormData();
      form.append("image", exported.imageBlob, "house.png");
      form.append("mask", exported.maskBlob, "mask.png");
      form.append("turnstileToken", turnstileToken);

      const res = await fetch("/api/visualize", {
        method: "POST",
        body: form,
      });

      const data = (await res.json()) as {
        imageBase64?: string;
        error?: string;
      };

      if (!res.ok || !data.imageBase64) {
        setError(data.error ?? "Something went wrong generating your preview.");
        setTurnstileToken(null);
        setTurnstileReset((n) => n + 1);
        return;
      }

      const afterUrl = `data:image/png;base64,${data.imageBase64}`;
      revokeUrl(resultUrl);
      setResultUrl(afterUrl);
      setStep("result");
    } catch {
      setError("Network error — check your connection and try again.");
      setTurnstileToken(null);
      setTurnstileReset((n) => n + 1);
    } finally {
      setGenerating(false);
    }
  }, [imageUrl, resultUrl, turnstileToken]);

  return (
    <div className="bg-cream">
      <section className="relative overflow-hidden bg-chestnut">
        <div className="absolute inset-0 bg-gradient-to-br from-chestnut via-chestnut to-primary-red/40" />
        <div className="relative mx-auto max-w-3xl px-4 py-10 text-center sm:px-6 sm:py-14">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent-gold/20 px-3 py-1 text-xs font-semibold text-accent-gold sm:text-sm">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Free AI preview
          </p>
          <h1 className="font-display text-3xl font-bold text-warm-white sm:text-4xl">
            Visualize Lights on Your Home
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-warm-white/80 sm:text-base">
            Upload a photo, finger-paint where you want Christmas lights, and we&apos;ll
            generate a photorealistic preview. Then get a free custom quote.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        {step === "upload" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-dashed border-chestnut/25 bg-white p-6 text-center sm:p-10">
              <p className="font-display text-xl font-semibold text-chestnut">
                Start with a photo of your house
              </p>
              <p className="mt-2 text-sm text-chestnut/70">
                Best results: standing out front, full facade visible, daytime photo.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary-red px-5 text-sm font-semibold text-warm-white touch-manipulation"
                >
                  <Camera className="h-5 w-5" aria-hidden />
                  Take photo
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-chestnut/20 bg-white px-5 text-sm font-semibold text-chestnut touch-manipulation"
                >
                  <ImagePlus className="h-5 w-5" aria-hidden />
                  Upload photo
                </button>
              </div>
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={(e) => loadFile(e.target.files?.[0])}
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => loadFile(e.target.files?.[0])}
              />
            </div>
            <ol className="grid gap-3 text-left text-sm text-chestnut/80 sm:grid-cols-3">
              <li className="rounded-xl border border-chestnut/10 bg-white p-4">
                <span className="font-semibold text-primary-red">1.</span> Upload
                or snap your house
              </li>
              <li className="rounded-xl border border-chestnut/10 bg-white p-4">
                <span className="font-semibold text-primary-red">2.</span> Paint
                rooflines, trees &amp; bushes
              </li>
              <li className="rounded-xl border border-chestnut/10 bg-white p-4">
                <span className="font-semibold text-primary-red">3.</span> Generate
                your lights preview
              </li>
            </ol>
          </div>
        )}

        {step === "paint" && imageUrl && (
          <div className="space-y-4 pb-28">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-xl font-bold text-chestnut">
                  Paint where you want lights
                </h2>
                <p className="mt-1 text-sm text-chestnut/70">
                  Trace rooflines and wrap trees with your finger. Gold strokes mark
                  where lights will go.
                </p>
              </div>
              <button
                type="button"
                onClick={startOver}
                className="shrink-0 text-sm font-semibold text-chestnut/60 underline-offset-2 hover:underline"
              >
                Change photo
              </button>
            </div>

            <PaintCanvas
              imageUrl={imageUrl}
              canvasRef={paintRef}
              disabled={generating}
              onReadyChange={setCanvasReady}
            />

            <TurnstileWidget onToken={setTurnstileToken} resetKey={turnstileReset} />

            {error && (
              <p
                className="rounded-xl border border-primary-red/30 bg-primary-red/5 px-4 py-3 text-sm text-primary-red"
                role="alert"
              >
                {error}
              </p>
            )}

            <div
              className="fixed inset-x-0 bottom-0 z-40 border-t border-chestnut/10 bg-cream/95 p-4 backdrop-blur-md lg:static lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none"
              style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
            >
              <div className="mx-auto flex max-w-3xl flex-col gap-2 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={generate}
                  disabled={generating || !canvasReady}
                  className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-accent-gold px-5 text-sm font-semibold text-chestnut disabled:opacity-50 touch-manipulation"
                >
                  {generating ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                      Generating preview…
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" aria-hidden />
                      Generate preview
                    </>
                  )}
                </button>
              </div>
              {generating && (
                <p className="mx-auto mt-2 max-w-3xl text-center text-xs text-chestnut/60">
                  This usually takes 15–40 seconds. Keep this tab open.
                </p>
              )}
            </div>
          </div>
        )}

        {step === "result" && imageUrl && resultUrl && (
          <div className="space-y-4">
            <ResultView
              beforeUrl={imageUrl}
              afterUrl={resultUrl}
              onStartOver={startOver}
            />
            {error && (
              <p
                className="rounded-xl border border-primary-red/30 bg-primary-red/5 px-4 py-3 text-sm text-primary-red"
                role="alert"
              >
                {error}
              </p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

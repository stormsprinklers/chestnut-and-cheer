import OpenAI, { toFile } from "openai";
import { NextResponse } from "next/server";
import { clientIpFromRequest, verifyTurnstileToken } from "@/lib/turnstile";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_BYTES = 4 * 1024 * 1024;

const PROMPT = `Photorealistic preview of this exact house with professional Christmas light installation by Chestnut & Cheer.

Add warm-white commercial-grade C9-style LED Christmas lights ONLY in the masked/transparent regions (typically rooflines, gables, eaves, trees, and bushes). Lights should look evenly spaced, neatly clipped, and glowing softly at dusk/evening.

Keep the house architecture, windows, driveway, landscaping layout, and camera angle unchanged. Do not add people, cars, text, logos, or watermarks. Do not redecorate areas outside the mask. High-end residential holiday lighting look.`;

function friendlyError(status: number, message: string): string {
  const lower = message.toLowerCase();
  if (status === 429 || lower.includes("rate")) {
    return "We're getting a lot of preview requests right now. Please wait a minute and try again.";
  }
  if (lower.includes("billing") || lower.includes("quota") || lower.includes("insufficient")) {
    return "Preview generation is temporarily unavailable. Please call or text us for a free quote instead.";
  }
  if (status >= 500) {
    return "The preview service had a hiccup. Please try again in a moment.";
  }
  return message || "Could not generate your preview.";
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Preview generation is not configured yet. Please contact us for a free quote.",
      },
      { status: 503 },
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid upload." }, { status: 400 });
  }

  const turnstileToken =
    (typeof form.get("turnstileToken") === "string" && String(form.get("turnstileToken"))) ||
    (typeof form.get("cf-turnstile-response") === "string" &&
      String(form.get("cf-turnstile-response"))) ||
    null;
  const turnstile = await verifyTurnstileToken(turnstileToken, clientIpFromRequest(request));
  if (!turnstile.ok) {
    return NextResponse.json({ error: turnstile.error }, { status: turnstile.status });
  }

  const image = form.get("image");
  const mask = form.get("mask");

  if (!(image instanceof File) || !(mask instanceof File)) {
    return NextResponse.json(
      { error: "Both image and mask files are required." },
      { status: 400 },
    );
  }

  if (image.size > MAX_BYTES || mask.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "Image files must be under 4MB each. Try a smaller photo." },
      { status: 400 },
    );
  }

  const allowed = new Set(["image/png", "image/jpeg", "image/jpg", "image/webp"]);
  if (!allowed.has(image.type) && image.type !== "") {
    return NextResponse.json(
      { error: "Unsupported image type. Use PNG or JPEG." },
      { status: 400 },
    );
  }

  try {
    const client = new OpenAI({ apiKey });

    const imageFile = await toFile(
      Buffer.from(await image.arrayBuffer()),
      "house.png",
      { type: "image/png" },
    );
    const maskFile = await toFile(
      Buffer.from(await mask.arrayBuffer()),
      "mask.png",
      { type: "image/png" },
    );

    const result = await client.images.edit({
      model: "gpt-image-1",
      image: imageFile,
      mask: maskFile,
      prompt: PROMPT,
      size: "1536x1024",
      quality: "medium",
      output_format: "png",
    });

    const b64 = result.data?.[0]?.b64_json;
    if (!b64) {
      return NextResponse.json(
        { error: "No image was returned. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ imageBase64: b64 });
  } catch (err) {
    const status =
      typeof err === "object" &&
      err !== null &&
      "status" in err &&
      typeof (err as { status: unknown }).status === "number"
        ? (err as { status: number }).status
        : 500;
    const message =
      typeof err === "object" &&
      err !== null &&
      "message" in err &&
      typeof (err as { message: unknown }).message === "string"
        ? (err as { message: string }).message
        : "Unknown error";

    console.error("[visualize]", status, message);
    return NextResponse.json(
      { error: friendlyError(status, message) },
      { status: status >= 400 && status < 600 ? status : 500 },
    );
  }
}

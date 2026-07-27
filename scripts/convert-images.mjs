import sharp from "sharp";
import { mkdir, access } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const imagesDir = join(root, "public", "images");
const brandPngDir = join(imagesDir, "C&C Brand Assets", "PNG Assets");

/** @typedef {{ src: string; dest: string; width: number; knockOut?: "white" | "black" }} Conversion */

/** @type {Conversion[]} */
const conversions = [
  {
    src: "Badge.png",
    dest: "brand/logo-primary.avif",
    width: 800,
    knockOut: "white",
  },
  {
    src: "Mascot-Icon.png",
    dest: "brand/head-color.avif",
    width: 512,
  },
  {
    src: "Badge_Plus_Mascot.png",
    dest: "brand/logo-with-mascot.avif",
    width: 800,
    knockOut: "black",
  },
  {
    src: "Tagline.png",
    dest: "brand/tagline.avif",
    width: 800,
    knockOut: "black",
  },
  {
    src: "Mascot_Worker.png",
    dest: "mascots/worker.avif",
    width: 400,
  },
  {
    src: "Mascot_Gift.png",
    dest: "mascots/gift.avif",
    width: 400,
  },
  {
    src: "Mascot_Cheering.png",
    dest: "mascots/cheer.avif",
    width: 400,
  },
  {
    src: "Mascot_Jumping.png",
    dest: "mascots/jump.avif",
    width: 400,
  },
  {
    src: "Full-Body-Mascot.png",
    dest: "mascots/full-body.avif",
    width: 400,
  },
  {
    src: "Mascot_Phone.png",
    dest: "mascots/phone.avif",
    width: 400,
  },
  {
    src: "Mascot_CSR.png",
    dest: "mascots/csr.avif",
    width: 400,
  },
  {
    src: "Mascot_Pointing_Right.png",
    dest: "mascots/pointing.avif",
    width: 400,
  },
  {
    src: "Mascot_Holding_Lights.png",
    dest: "mascots/holding-lights.avif",
    width: 400,
  },
  {
    src: "Sparkle.png",
    dest: "brand/sparkle.avif",
    width: 256,
    knockOut: "black",
  },
  {
    src: "String Lights.png",
    dest: "brand/string-lights.avif",
    width: 1600,
    knockOut: "black",
  },
];

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

/**
 * Knock out near-white or near-black pixels to transparency.
 * @param {Buffer} rgba
 * @param {number} width
 * @param {number} height
 * @param {"white" | "black"} mode
 * @param {number} threshold
 */
function knockOutBackground(rgba, width, height, mode, threshold = 28) {
  const out = Buffer.from(rgba);
  for (let i = 0; i < out.length; i += 4) {
    const r = out[i];
    const g = out[i + 1];
    const b = out[i + 2];
    const a = out[i + 3];
    if (a < 8) continue;

    if (mode === "white") {
      if (r >= 255 - threshold && g >= 255 - threshold && b >= 255 - threshold) {
        out[i + 3] = 0;
      }
    } else {
      if (r <= threshold && g <= threshold && b <= threshold) {
        out[i + 3] = 0;
      }
    }
  }
  return sharp(out, { raw: { width, height, channels: 4 } });
}

async function toAvif(srcPath, destPath, width, knockOut) {
  await mkdir(dirname(destPath), { recursive: true });

  let pipeline = sharp(srcPath).ensureAlpha().resize({
    width,
    withoutEnlargement: true,
  });

  if (knockOut) {
    const { data, info } = await pipeline.raw().toBuffer({ resolveWithObject: true });
    pipeline = knockOutBackground(data, info.width, info.height, knockOut);
  }

  await pipeline.avif({ quality: 70, effort: 4 }).toFile(destPath);
  console.log(`Converted: ${destPath}`);
}

async function main() {
  for (const dir of ["brand", "mascots", "reviews", "photos", "before-after"]) {
    await mkdir(join(imagesDir, dir), { recursive: true });
  }

  for (const { src, dest, width, knockOut } of conversions) {
    const srcPath = join(brandPngDir, src);
    if (!(await exists(srcPath))) {
      console.warn(`Skipping missing source: ${src}`);
      continue;
    }
    await toAvif(srcPath, join(imagesDir, dest), width, knockOut);
  }

  const iconSrc = join(brandPngDir, "Mascot-Icon.png");
  if (await exists(iconSrc)) {
    await sharp(iconSrc)
      .resize(32, 32, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(join(root, "app", "icon.png"));

    await sharp(iconSrc)
      .resize(180, 180, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(join(root, "app", "apple-icon.png"));

    // Next serves app/icon.png as the favicon; keep favicon.ico in sync as PNG bytes
    // (widely accepted by browsers for simple bookmark icons).
    await sharp(iconSrc)
      .resize(48, 48, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(join(root, "app", "favicon.ico"));

    console.log("Generated app/icon.png, app/apple-icon.png, and app/favicon.ico");
  }

  console.log("Done. Source PNGs in C&C Brand Assets were left in place.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

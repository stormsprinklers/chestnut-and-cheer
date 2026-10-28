import sharp from "sharp";
import { mkdir, readFile, unlink } from "node:fs/promises";
import { execFile } from "node:child_process";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
const outputDir = join(projectRoot, "public", "images", "offers");
const execFileAsync = promisify(execFile);

const sourceDirFlag = process.argv.indexOf("--source-dir");
const sourceDir = sourceDirFlag >= 0 ? process.argv[sourceDirFlag + 1] : null;

if (!sourceDir) {
  console.error("Usage: node scripts/convert-offer-images.mjs --source-dir <directory>");
  process.exit(1);
}

const images = [
  {
    source: "clicklights-photo-2.jpg",
    output: "permanent-lights-color-roofline",
    width: 1920,
  },
  {
    source: "clicklights-photo-3.jpg",
    output: "permanent-lights-warm-white-home",
    width: 1200,
  },
  {
    source: "lightshome2.jpg",
    output: "christmas-lights-white-roofline",
    width: 1800,
  },
  {
    source: "Photo - Night - White home with garage under tree, warm white lights - Screenshot 9.33.41 PM.png",
    output: "christmas-lights-warm-white-home",
    width: 1600,
  },
  {
    source: "AFTER - Dusk - 2-car garage home, red and green lights (vertical) - IMG_7379.HEIC",
    output: "christmas-lights-red-green-home",
    width: 1400,
  },
];

await mkdir(outputDir, { recursive: true });

async function decodeToRaw(sourcePath, width) {
  const decode = async (source) => sharp(source, {
    unlimited: true,
    page: 0,
    pages: 1,
    sequentialRead: true,
  })
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  try {
    return await decode(await readFile(sourcePath));
  } catch (error) {
    if (extname(sourcePath).toLowerCase() !== ".heic") throw error;

    const temporaryJpeg = join(outputDir, ".heic-decode-temp.jpg");
    try {
      await execFileAsync("heif-convert", [sourcePath, temporaryJpeg]);
      return await decode(await readFile(temporaryJpeg));
    } finally {
      await unlink(temporaryJpeg).catch(() => {});
    }
  }
}

for (const image of images) {
  const sourcePath = join(sourceDir, image.source);
  const { data, info } = await decodeToRaw(sourcePath, image.width);

  const pipeline = sharp(data, {
    raw: { width: info.width, height: info.height, channels: info.channels },
  });

  await Promise.all([
    pipeline
      .clone()
      .webp({ quality: 80, effort: 5, smartSubsample: true })
      .toFile(join(outputDir, `${image.output}.webp`)),
    pipeline
      .clone()
      .avif({ quality: 62, effort: 5, chromaSubsampling: "4:2:0" })
      .toFile(join(outputDir, `${image.output}.avif`)),
  ]);

  console.log(`Converted ${image.source} -> ${image.output}.{webp,avif}`);
}

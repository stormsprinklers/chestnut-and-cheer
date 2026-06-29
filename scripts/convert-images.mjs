import sharp from "sharp";
import { mkdir, copyFile, unlink, readdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const imagesDir = join(root, "public", "images");

const conversions = [
  {
    src: "C&C Head Color.png",
    dest: "brand/head-color.avif",
    width: 512,
  },
  {
    src: "C&C Logo Primary.png",
    dest: "brand/logo-primary.avif",
    width: 600,
  },
  {
    src: "C&C Mascot Color Glow.png",
    dest: "mascots/light.avif",
    width: 400,
  },
  {
    src: "C&C Mascot Gift.png",
    dest: "mascots/gift.avif",
    width: 400,
  },
  {
    src: "C&C Mascot Cheer.png",
    dest: "mascots/cheer.avif",
    width: 400,
  },
  {
    src: "C&C String Lights.png",
    dest: "photos/string-lights.avif",
    width: 1600,
  },
  {
    src: "C&C Sparkle.png",
    dest: "photos/sparkle.avif",
    width: 800,
  },
];

async function toAvif(srcPath, destPath, width) {
  await mkdir(dirname(destPath), { recursive: true });
  await sharp(srcPath)
    .resize({ width, withoutEnlargement: true })
    .avif({ quality: 65, effort: 4 })
    .toFile(destPath);
  console.log(`Converted: ${destPath}`);
}

async function main() {
  const dirs = [
    "brand",
    "mascots",
    "reviews",
    "photos",
    "before-after",
  ];
  for (const dir of dirs) {
    await mkdir(join(imagesDir, dir), { recursive: true });
  }

  for (const { src, dest, width } of conversions) {
    await toAvif(join(imagesDir, src), join(imagesDir, dest), width);
  }

  const avifMoves = [
    ["green5star-lights.avif", "reviews/stars-green.avif"],
    ["red5star-lights.avif", "reviews/stars-red.avif"],
    ["yellow5star-lights.avif", "reviews/stars-yellow.avif"],
    ["ChristmasTree-Commercial-PRoperty.avif", "photos/commercial-tree.avif"],
    ["Virtual-Quote-Call.avif", "photos/virtual-quote.avif"],
  ];

  for (const [src, dest] of avifMoves) {
    const srcPath = join(imagesDir, src);
    const destPath = join(imagesDir, dest);
    await copyFile(srcPath, destPath);
    await unlink(srcPath);
    console.log(`Moved: ${dest}`);
  }

  await sharp(join(imagesDir, "C&C Head Color.png"))
    .resize(32, 32)
    .png()
    .toFile(join(root, "app", "icon.png"));

  await sharp(join(imagesDir, "C&C Head Color.png"))
    .resize(180, 180)
    .png()
    .toFile(join(root, "app", "apple-icon.png"));

  console.log("Generated app/icon.png and app/apple-icon.png");

  const pngsToRemove = (await readdir(imagesDir)).filter((f) =>
    f.toLowerCase().endsWith(".png"),
  );
  for (const file of pngsToRemove) {
    await unlink(join(imagesDir, file));
    console.log(`Removed source PNG: ${file}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

# Image Assets

All site images are served as **AVIF** for fast loading.

## Brand assets

Source PNGs live in `C&C Brand Assets/PNG Assets/`. Convert (or re-convert) with:

```bash
npm run images:convert
```

That writes optimized AVIFs into `brand/` and `mascots/`, and regenerates `app/icon.png`, `app/apple-icon.png`, and `app/favicon.ico` from **Mascot-Icon** (mascot head).

| Source PNG | Output | Used for |
|---|---|---|
| `Badge.png` | `brand/logo-primary.avif` | Header & footer logo |
| `Mascot-Icon.png` | `brand/head-color.avif` + favicons | Favicon / app icons |
| `Badge_Plus_Mascot.png` | `brand/logo-with-mascot.avif` | Secondary brand moments (not header) |
| `Tagline.png` | `brand/tagline.avif` | Hero & footer tagline graphic |
| `Sparkle.png` | `brand/sparkle.avif` | Decorative accents |
| `String Lights.png` | `brand/string-lights.avif` | Hero / section decoration |
| `Mascot_Worker.png` | `mascots/worker.avif` | Section mascot |
| `Mascot_Gift.png` | `mascots/gift.avif` | Section mascot |
| `Mascot_Cheering.png` | `mascots/cheer.avif` | Section mascot |
| `Mascot_Jumping.png` | `mascots/jump.avif` | Extra mascot |
| `Full-Body-Mascot.png` | `mascots/full-body.avif` | Extra mascot |

## Folder structure

```
public/images/
├── C&C Brand Assets/     — Source PNG + SVG brand kit (kept)
├── brand/                — Converted brand AVIFs
├── mascots/              — Converted mascot AVIFs
├── photos/               — Photo AVIFs (hero, services, etc.)
├── reviews/              — Review star graphics
└── before-after/         — Before/after photos (when ready)
```

## Adding or replacing brand PNGs

1. Replace files in `C&C Brand Assets/PNG Assets/`.
2. Run `npm run images:convert`.

# Image Assets

All site images are served as **AVIF** for fast loading. Drop new photos into the folders below, then run:

```bash
npm run images:convert
```

## Folder structure

```
public/images/
├── brand/
│   ├── head-color.avif      — Header logo & favicon source
│   └── logo-primary.avif    — Footer logo
├── mascots/
│   ├── light.avif           — Mascot with holiday light
│   ├── gift.avif            — Mascot holding a present
│   └── cheer.avif           — Mascot jumping & cheering
├── photos/
│   ├── hero-home.avif       — Hero image
│   ├── string-lights.avif   — Decorative / alternate
│   ├── temporary-install.avif — Temporary service card
│   ├── sparkle.avif         — Decorative accent
│   ├── permanent-lighting.avif — Permanent service card
│   ├── commercial-tree.avif — Commercial service card
│   └── virtual-quote.avif   — Booking / consultation step
├── reviews/
│   ├── stars-red.avif       — Red 5-star lights (review cards)
│   ├── stars-green.avif
│   └── stars-yellow.avif
└── before-after/
    ├── before.avif          — Before photo (upload when ready)
    └── after.avif           — After photo (upload when ready)
```

## Adding new PNG photos

1. Place PNGs in `public/images/` (root).
2. Add an entry to `scripts/convert-images.mjs` with the desired output path.
3. Run `npm run images:convert`.

## Replacing before/after photos

Add `before.avif` and `after.avif` to `before-after/`, then update paths in `components/sections/BeforeAfter.tsx`.

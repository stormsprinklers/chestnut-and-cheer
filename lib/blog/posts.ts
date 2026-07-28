export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingMinutes: number;
  tags: string[];
  content: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "temporary-vs-permanent-christmas-lights",
    title: "Temporary vs Permanent Christmas Lights: Which Is Right for Your Home?",
    description:
      "Compare seasonal install-and-remove lighting with permanent LED systems — cost, look, maintenance, and when each option makes sense in Utah.",
    date: "2026-07-01",
    readingMinutes: 5,
    tags: ["Permanent Lighting", "Seasonal Lighting"],
    content: [
      "Utah homeowners usually start with one question: do I want a magical display for the holidays only, or lighting I can enjoy all year?",
      "Temporary (seasonal) Christmas lights are custom-fit each year, then taken down after the holidays and stored for you. They’re ideal if you love a classic holiday look without a long-term commitment.",
      "Permanent holiday lighting is installed once along your roofline and programmed for Christmas, other holidays, and everyday accent lighting. It’s a higher upfront investment with a longer lifespan and typically a multi-year warranty.",
      "If you want the full holiday treatment — trees, bushes, and complex accents — seasonal lighting is often the better fit. If you mainly care about a clean roofline you can control from your phone, permanent lighting shines.",
      "Not sure yet? Start with a free estimate. We’ll walk your property (or meet on Google Meet) and recommend the option that matches your home and budget.",
    ],
  },
  {
    slug: "when-to-book-christmas-light-installation-utah",
    title: "When to Book Christmas Light Installation in Utah",
    description:
      "Peak season fills fast across Utah County and Salt Lake County. Here’s the best timeline for residential and commercial holiday lighting.",
    date: "2026-06-15",
    readingMinutes: 4,
    tags: ["Planning", "Commercial"],
    content: [
      "Holiday lighting demand ramps up early in Utah — especially for commercial properties, HOAs, and larger homes.",
      "For residential seasonal installs, late summer through early fall is the sweet spot. You’ll lock in preferred dates before the November rush.",
      "Commercial and HOA projects should book even earlier. Storefronts, common areas, and municipal displays often need design approvals and coordinated install windows.",
      "Permanent lighting can be installed outside peak Christmas season, which is one reason many homeowners schedule it in spring or summer.",
      "Ready to reserve your spot? Get an instant estimate online or call Chestnut & Cheer — we’re nuts about Christmas lights, and we’re already booking the season.",
    ],
  },
  {
    slug: "gutter-cleaning-with-holiday-lights",
    title: "Why Gutter Cleaning Pairs Perfectly With Holiday Light Installation",
    description:
      "We’re already on the roof for your Christmas lights — here’s why adding gutter cleaning before winter is a smart (and efficient) move.",
    date: "2026-05-20",
    readingMinutes: 3,
    tags: ["Gutter Cleaning", "Maintenance"],
    content: [
      "When our crew is already on your roof installing Christmas lights, gutter cleaning is one of the easiest add-ons to schedule.",
      "Clear gutters help prevent ice dams, overflow damage, and foundation issues through Utah winters — and you avoid booking a second rooftop visit.",
      "We clear debris from gutters and downspouts so meltwater can flow when the snow starts. It’s a practical upgrade alongside a beautiful holiday display.",
      "Ask about gutter cleaning when you request your lighting estimate. Many homeowners bundle both for convenience and better winter readiness.",
    ],
  },
];

export function getPostBySlug(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug) ?? null;
}

export function getAllPosts() {
  return [...BLOG_POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
}

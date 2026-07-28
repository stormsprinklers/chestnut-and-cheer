export const ASSETS = {
  brand: {
    /** Mascot head — favicon / compact icon */
    head: "/images/brand/head-color.avif",
    /** Badge logo (no mascot) — header & footer */
    logoPrimary: "/images/brand/logo-primary.avif",
    /** Badge with mascot — secondary brand moments only */
    logoWithMascot: "/images/brand/logo-with-mascot.avif",
    tagline: "/images/brand/tagline.avif",
    sparkle: "/images/brand/sparkle.avif",
    stringLights: "/images/brand/string-lights.avif",
  },
  mascots: {
    worker: "/images/mascots/worker.avif",
    gift: "/images/mascots/gift.avif",
    cheer: "/images/mascots/cheer.avif",
    jump: "/images/mascots/jump.avif",
    fullBody: "/images/mascots/full-body.avif",
    phone: "/images/mascots/phone.avif",
    csr: "/images/mascots/csr.avif",
    pointing: "/images/mascots/pointing.avif",
    holdingLights: "/images/mascots/holding-lights.avif",
  },
  photos: {
    hero: "/images/photos/hero-home.avif",
    temporaryInstall: "/images/photos/temporary-install.avif",
    permanentLighting: "/images/photos/permanent-lighting.avif",
    commercialTree: "/images/photos/commercial-tree.avif",
    virtualQuote: "/images/photos/virtual-quote.avif",
  },
  beforeAfter: {
    before: "/images/before-after/before.avif",
    after: "/images/before-after/after.avif",
  },
  reviews: {
    starsRed: "/images/reviews/stars-red.avif",
    starsGreen: "/images/reviews/stars-green.avif",
    starsYellow: "/images/reviews/stars-yellow.avif",
  },
} as const;

export const COMPANY = {
  name: "Chestnut & Cheer",
  tagline: "we're nuts about christmas lights!",
  email: "hello@utah.christmas",
  phone: "385-999-NUTS",
  phoneDigits: "3859996887",
  address: {
    street: "1372 W Center St",
    city: "Orem",
    state: "UT",
    zip: "84057",
    full: "1372 W Center St, Orem UT 84057",
  },
  license: "S330 #14211467-5501",
  serviceAreas: ["Utah County", "Salt Lake County"],
} as const;

/** Same service area cities as Storm Sprinklers (../website home). */
export const UTAH_COUNTY_CITIES = [
  "Highland",
  "Alpine",
  "Pleasant Grove",
  "Lehi",
  "American Fork",
  "Saratoga Springs",
  "Eagle Mountain",
  "Cedar Hills",
  "Lindon",
  "Orem",
  "Provo",
  "Springville",
  "Spanish Fork",
  "Mapleton",
  "Payson",
  "Santaquin",
  "Salem",
  "Vineyard",
  "Elk Ridge",
  "Woodland Hills",
] as const;

export const SALT_LAKE_COUNTY_CITIES = [
  "Salt Lake City",
  "West Valley City",
  "West Jordan",
  "South Jordan",
  "Riverton",
  "Draper",
  "Sandy",
  "Murray",
  "Midvale",
  "Taylorsville",
  "Herriman",
  "Bluffdale",
  "Cottonwood Heights",
  "Holladay",
  "Millcreek",
  "Magna",
  "Kearns",
  "South Salt Lake",
] as const;

export const LINKS = {
  tel: `tel:${COMPANY.phoneDigits}`,
  sms: `sms:${COMPANY.phoneDigits}`,
  mailto: `mailto:${COMPANY.email}`,
  estimate: "/estimate",
  /** CRM public booking calendar for consultations (set NEXT_PUBLIC_CRM_BOOKING_URL) */
  bookConsultation: process.env.NEXT_PUBLIC_CRM_BOOKING_URL?.trim() || "",
  /** @deprecated use estimate — kept for any deep links */
  booking: "/estimate",
  contact: "/contact",
  pricing: "/pricing",
  visualize: "/visualize",
  about: "/about",
  blog: "/blog",
  doorHanger: "/door-hanger",
  permanentLighting: "/permanent-lighting",
  seasonalLighting: "/seasonal-holiday-lighting",
  commercialLighting: "/commercial-holiday-lighting",
  gutterCleaning: "/gutter-cleaning",
  privacy: "/privacy-policy",
  terms: "/terms-of-service",
  accessibility: "/accessibility",
} as const;

export const FOOTER_COLUMNS = [
  {
    title: "Services",
    links: [
      { label: "Seasonal Holiday Lighting", href: LINKS.seasonalLighting },
      { label: "Permanent Lighting", href: LINKS.permanentLighting },
      { label: "Commercial Holiday Lighting", href: LINKS.commercialLighting },
      { label: "Gutter Cleaning", href: LINKS.gutterCleaning },
      { label: "Pricing", href: LINKS.pricing },
      { label: "Visualize Lights", href: LINKS.visualize },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: LINKS.about },
      { label: "Blog", href: LINKS.blog },
      { label: "Contact", href: LINKS.contact },
      { label: "Get Instant Estimate", href: LINKS.estimate },
    ],
  },
  {
    title: "Policies",
    links: [
      { label: "Privacy Policy", href: LINKS.privacy },
      { label: "Terms of Service", href: LINKS.terms },
      { label: "Accessibility", href: LINKS.accessibility },
    ],
  },
] as const;

export const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Get Estimate", href: "/estimate" },
  { label: "Visualize", href: "/visualize" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const PRICING = {
  yearOne: {
    label: "Year 1",
    title: "Parts + Installation",
    startsAt: 699,
    summary:
      "Your first year includes the lights, timer, and custom design — plus professional installation.",
    includes: [
      "Commercial-grade lights",
      "Timer",
      "Custom design for your property",
      "Professional installation",
    ],
  },
  renewal: {
    label: "Year 2+",
    title: "Installation Only",
    startsAt: 299,
    summary:
      "Stay with us and your price drops — we already own the lights, so you pay for installation only.",
    includes: [
      "Professional reinstallation",
      "Your existing custom design",
      "Same premium light package",
    ],
  },
  includedEveryYear: [
    "Custom-designed commercial-grade lights",
    "Professional installation",
    "In-season maintenance",
    "Takedown after the holidays",
    "Off-season storage",
    "Replacement of normal bulb failures",
  ],
  quoteFactors: [
    { label: "Tree size", detail: "Height, canopy, and how many trees to light" },
    { label: "Roof angle", detail: "Steeper or complex rooflines take more time" },
    { label: "Home height", detail: "Two-story and taller homes need extra equipment" },
    { label: "Coverage area", detail: "Roofline length, bushes, and accent features" },
    { label: "Design complexity", detail: "Simple outlines vs. full custom displays" },
  ],
} as const;

export const SERVICES = [
  {
    id: "temporary",
    title: "Temporary Christmas Lights",
    description:
      "Custom-fit premium strands installed on your roofline, trees, and bushes — then removed and stored for summer.",
    features: [
      "Custom-fit lights",
      "Professional installation",
      "Removal in January & early February",
      "Summer storage included",
      "No customer-owned light installs",
    ],
    image: ASSETS.photos.temporaryInstall,
    href: "/seasonal-holiday-lighting",
  },
  {
    id: "permanent",
    title: "Permanent Holiday Lighting",
    description:
      "Locally sourced in Utah with a durable, higher-end product built to last — and a year-round upsell opportunity.",
    features: [
      "Locally sourced in Utah",
      "5-year warranty",
      "Premium, durable product",
      "Year-round lighting options",
    ],
    image: ASSETS.photos.permanentLighting,
    href: "/permanent-lighting",
  },
  {
    id: "commercial",
    title: "Commercial Lighting",
    description:
      "From storefronts to HOAs and city displays — commercial clients book earlier and invest more.",
    features: [
      "Businesses & retail",
      "HOAs & property managers",
      "City & municipal displays",
      "Off-season revenue programs",
    ],
    image: ASSETS.photos.commercialTree,
    href: "/commercial-holiday-lighting",
  },
] as const;

export const WHY_CHOOSE_US = [
  {
    title: "Premium Materials",
    description:
      "High-quality lights, strands, and clips — the kind of install that looks stunning and holds up all season.",
  },
  {
    title: "Roofs, Trees & Bushes",
    description:
      "We light rooflines, trees, and bushes with custom-fit designs tailored to your property.",
  },
  {
    title: "Gutter Cleaning Add-On",
    description:
      "Already on the roof? It's the perfect time for gutter cleaning while we're up there.",
  },
  {
    title: "Free Consultations",
    description:
      "Free online quotes over Google Meet, or in-person consultations at your home or business.",
  },
  {
    title: "Free Bulb Replacement",
    description:
      "We come out for free to replace bad bulbs — your display stays bright all season long.",
  },
  {
    title: "Licensed & Insured",
    description: `Fully licensed and insured — Utah DOPL license ${COMPANY.license} for your peace of mind.`,
  },
] as const;

export const BOOKING_STEPS = [
  {
    step: 1,
    title: "Get Instant Estimate",
    description: "Call, text, or email us — or get an instant estimate online in about 2 minutes.",
    mascot: "phone" as const,
  },
  {
    step: 2,
    title: "Free Consultation",
    description: "Google Meet video quote or in-person walkthrough of your property.",
    mascot: "csr" as const,
  },
  {
    step: 3,
    title: "Professional Install",
    description: "Our team installs custom-fit lighting on roofs, trees, and bushes.",
    mascot: "worker" as const,
  },
  {
    step: 4,
    title: "Enjoy the Season",
    description: "We handle takedown in January & early February, plus summer storage for temporary installs.",
    mascot: "cheer" as const,
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "Our home looked absolutely magical. The team was professional, fast, and the lights were perfectly even across the roofline.",
    author: "Sarah M.",
    location: "Homeowner in Orem",
    starsImage: ASSETS.reviews.starsRed,
  },
  {
    quote:
      "We switched to permanent lighting last year and couldn't be happier. The 5-year warranty gave us total confidence.",
    author: "David & Lisa K.",
    location: "Homeowner in Provo",
    starsImage: ASSETS.reviews.starsGreen,
  },
  {
    quote:
      "Our HOA common areas have never looked better. They handled everything from design to install — highly recommend for commercial work.",
    author: "James R.",
    location: "Property Manager in Sandy",
    starsImage: ASSETS.reviews.starsYellow,
  },
] as const;

export const FAQS = [
  {
    question: "How does pricing work?",
    answer:
      "Year 1 is Parts + Installation (starts at $699) and covers lights, timer, custom design, and install. Year 2+ with us drops to Installation Only (starts at $299). Every job is custom-quoted based on tree size, roof angle, home height, and other property features. Prices include commercial-grade lights, install, in-season maintenance, takedown, storage, and normal bulb replacements.",
  },
  {
    question: "When do you take down temporary lights?",
    answer:
      "We remove temporary installations in January and early February. Permanent lighting stays up year-round with optional seasonal programming.",
  },
  {
    question: "What's the difference between temporary and permanent lighting?",
    answer:
      "Temporary lights are installed each season, removed after the holidays, and stored by us over summer. Permanent lighting is a higher-ticket, locally sourced Utah product with a 5-year warranty — installed once and enjoyed year after year.",
  },
  {
    question: "Do you install lights I already own?",
    answer:
      "We do not install customer-owned lights. We use premium, professional-grade strands and clips for every install to ensure quality and reliability.",
  },
  {
    question: "Do you work with commercial clients?",
    answer:
      "Yes — we serve businesses, HOAs, property managers, and city/commercial displays. Commercial clients often book earlier in the season, so reach out soon for the best availability.",
  },
  {
    question: "Can you clean my gutters while you're on the roof?",
    answer:
      "Absolutely. Gutter cleaning is a popular add-on since we're already up there — it's the perfect time to get it done before winter.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We service all cities within Utah County and Salt Lake County—including Provo, Orem, Lehi, Spanish Fork, Salt Lake City, Draper, Sandy, and many more. Call if you're unsure!",
  },
  {
    question: "What if a bulb goes out?",
    answer:
      "We come out for free to replace bad bulbs. Just give us a call or text and we'll get your display shining again.",
  },
] as const;

export const TRUST_BADGES = [
  { label: "Licensed & Insured", detail: COMPANY.license },
  { label: "5-Year Warranty", detail: "On permanent lighting" },
  { label: "Free Bulb Replacement", detail: "All season long" },
  { label: "Locally Sourced", detail: "Utah permanent lights" },
] as const;

export const MAP_EMBED_URL =
  "https://maps.google.com/maps?q=1372+W+Center+St,+Orem,+UT+84057&output=embed";

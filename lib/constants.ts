export const ASSETS = {
  brand: {
    head: "/images/brand/head-color.avif",
    logoPrimary: "/images/brand/logo-primary.avif",
  },
  mascots: {
    light: "/images/mascots/light.avif",
    gift: "/images/mascots/gift.avif",
    cheer: "/images/mascots/cheer.avif",
  },
  photos: {
    hero: "/images/photos/string-lights.avif",
    stringLights: "/images/photos/string-lights.avif",
    sparkle: "/images/photos/sparkle.avif",
    commercialTree: "/images/photos/commercial-tree.avif",
    virtualQuote: "/images/photos/virtual-quote.avif",
  },
  reviews: {
    starsRed: "/images/reviews/stars-red.avif",
    starsGreen: "/images/reviews/stars-green.avif",
    starsYellow: "/images/reviews/stars-yellow.avif",
  },
} as const;

export const COMPANY = {
  name: "Chestnut & Cheer",
  tagline: "Premium Holiday Lighting",
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
  license: "S330 Landscape Contractor",
  serviceAreas: ["Utah County", "Salt Lake County"],
} as const;

export const LINKS = {
  tel: `tel:${COMPANY.phoneDigits}`,
  sms: `sms:${COMPANY.phoneDigits}`,
  mailto: `mailto:${COMPANY.email}`,
  booking: "#booking",
  contact: "#contact",
} as const;

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "Gallery", href: "#before-after" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;

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
    image: ASSETS.photos.stringLights,
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
    image: ASSETS.photos.sparkle,
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
    description: `Fully licensed and insured with an ${COMPANY.license} license for your peace of mind.`,
  },
] as const;

export const BOOKING_STEPS = [
  {
    step: 1,
    title: "Request a Quote",
    description: "Call, text, or email us — or book online when our scheduler launches.",
  },
  {
    step: 2,
    title: "Free Consultation",
    description: "Google Meet video quote or in-person walkthrough of your property.",
  },
  {
    step: 3,
    title: "Professional Install",
    description: "Our team installs custom-fit lighting on roofs, trees, and bushes.",
  },
  {
    step: 4,
    title: "Enjoy the Season",
    description: "We handle takedown in January & early February, plus summer storage for temporary installs.",
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
      "Pricing depends on your property size, roofline length, tree coverage, and whether you choose temporary or permanent lighting. We provide free quotes — no surprises. Commercial projects are quoted separately based on scope.",
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
      "We serve Utah County and Salt Lake County, including Orem, Provo, Lehi, American Fork, Sandy, Draper, and surrounding communities.",
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

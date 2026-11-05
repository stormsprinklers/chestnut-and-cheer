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
    hero: "/images/photos/professional/christmas-light-technician-carrying-ladder-utah.avif",
    temporaryInstall: "/images/photos/professional/professional-roofline-light-installation.webp",
    permanentLighting: "/images/photos/permanent-lighting.avif",
    commercialTree: "/images/photos/commercial-tree.avif",
    virtualQuote: "/images/photos/virtual-quote.avif",
  },
  professionalPhotos: {
    bundlingLights: "/images/photos/professional/technician-bundling-commercial-christmas-lights.webp",
    carryingLadderHero: "/images/photos/professional/christmas-light-technician-carrying-ladder-utah.avif",
    rooflineClip: "/images/photos/professional/roofline-christmas-light-clip-installation.webp",
    closeInstall: "/images/photos/professional/technician-installing-roofline-christmas-lights.webp",
    closeLighting: "/images/photos/professional/close-up-christmas-light-installation.webp",
    truckLadder: "/images/photos/professional/chestnut-cheer-service-truck-ladder.webp",
    unloadingLadder: "/images/photos/professional/technician-unloading-ladder-from-truck.webp",
    preparingLadder: "/images/photos/professional/technician-preparing-ladder-for-installation.webp",
    lightBundle: "/images/photos/professional/commercial-grade-holiday-light-bundle.webp",
    rooflineInstall: "/images/photos/professional/professional-roofline-light-installation.webp",
    roofInstall: "/images/photos/professional/professional-christmas-lights-roof-install.webp",
    serviceTruck: "/images/photos/professional/chestnut-cheer-christmas-lighting-service-truck.webp",
    technicianHero: "/images/photos/professional/licensed-christmas-lighting-technician-utah.avif",
    securingLadder: "/images/photos/professional/technician-securing-ladder-on-service-truck.webp",
    loadingLadder: "/images/photos/professional/chestnut-cheer-technician-loading-ladder.webp",
    checkingBulb: "/images/photos/professional/technician-checking-christmas-light-bulb.webp",
    truckTagline: "/images/photos/professional/chestnut-cheer-truck-christmas-lights-tagline.webp",
    travenHero: "/images/photos/professional/chestnut-cheer-lighting-technician-traven.avif",
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
  legalEntity: "Storm Sprinklers, LLC",
  tagline: "we're nuts about christmas lights!",
  email: "hello@utah.christmas",
  phone: "385-999-NUTS",
  phoneDigits: "3859996887",
  address: {
    street: "",
    city: "Lehi",
    state: "UT",
    zip: "84048",
    full: "Lehi, Utah 84048",
  },
  license: "S330 #14211467-5501",
  serviceAreas: [
    "Utah County",
    "Salt Lake County",
    "Davis County",
    "Weber County",
    "Summit County",
    "Wasatch County",
  ],
  limitedServiceCities: ["Mona", "Nephi"],
  serviceAreaSummary:
    "Utah, Salt Lake, Davis, Weber, Summit, and Wasatch counties, plus Mona and Nephi",
} as const;

/** Company introduction video. The YouTube player is created only after a visitor presses play. */
export const CHESTNUT_PROMO_YOUTUBE = {
  videoId: "dG9nVNa6z7o",
  title: "Meet Chestnut & Cheer Christmas Lighting",
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
  "Cedar Fort",
  "Cedar Hills",
  "Fairfield",
  "Genola",
  "Goshen",
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
  "Alta",
  "Brighton",
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
  "Copperton",
  "Emigration Canyon",
  "Holladay",
  "Millcreek",
  "Magna",
  "Kearns",
  "South Salt Lake",
  "White City",
] as const;

export const DAVIS_COUNTY_CITIES = [
  "Bountiful",
  "Centerville",
  "Clearfield",
  "Clinton",
  "Farmington",
  "Fruit Heights",
  "Kaysville",
  "Layton",
  "North Salt Lake",
  "South Weber",
  "Sunset",
  "Syracuse",
  "West Bountiful",
  "West Point",
  "Woods Cross",
] as const;

export const WEBER_COUNTY_CITIES = [
  "Farr West",
  "Harrisville",
  "Hooper",
  "Huntsville",
  "Marriott-Slaterville",
  "North Ogden",
  "Ogden",
  "Plain City",
  "Pleasant View",
  "Riverdale",
  "Roy",
  "South Ogden",
  "Uintah",
  "Washington Terrace",
  "West Haven",
] as const;

export const SUMMIT_COUNTY_CITIES = [
  "Coalville",
  "Francis",
  "Henefer",
  "Kamas",
  "Oakley",
  "Park City",
  "Summit Park",
] as const;

export const WASATCH_COUNTY_CITIES = [
  "Charleston",
  "Daniel",
  "Heber City",
  "Hideout",
  "Independence",
  "Interlaken",
  "Midway",
  "Park City",
  "Wallsburg",
] as const;

export const JUAB_COUNTY_CITIES = ["Mona", "Nephi"] as const;

export const LINKS = {
  tel: `tel:${COMPANY.phoneDigits}`,
  sms: `sms:+1${COMPANY.phoneDigits}`,
  mailto: `mailto:${COMPANY.email}`,
  google: "https://g.page/r/CQXfzb_ziCg5EBM",
  estimate: "/estimate",
  bookConsultation: "/book",
  /** @deprecated use estimate — kept for any deep links */
  booking: "/estimate",
  contact: "/contact",
  pricing: "/pricing",
  discounts: "/discounts",
  visualize: "/visualize",
  about: "/about",
  careers: "/careers",
  blog: "/blog",
  installationGuide: "/blog/professional-christmas-light-installation-guide",
  services: "/services",
  christmasLightInstallation: "/christmas-light-installation",
  residentialLighting: "/christmas-light-installation/residential",
  treeLighting: "/tree-lighting",
  commercialLighting: "/christmas-light-installation/commercial",
  projects: "/projects",
  doorHanger: "/door-hanger",
  permanentLighting: "/permanent-lighting",
  seasonalLighting: "/christmas-light-installation/residential",
  gutterCleaning: "/gutter-cleaning",
  privacy: "/privacy-policy",
  terms: "/terms-of-service",
  accessibility: "/accessibility",
  serviceAreas: "/service-areas",
  shareTheCheer: "/share-the-cheer",
} as const;

/** A2P / 10DLC SMS program copy used on opt-in forms and legal pages. */
export const SMS_PROGRAM = {
  types:
    "appointment reminders, quote follow-ups, scheduling updates, customer support, and (if you opt in separately) marketing offers related to Christmas lighting services",
  serviceTypes:
    "appointment reminders, quote follow-ups, scheduling updates, and customer support related to Christmas lighting services",
  marketingTypes:
    "seasonal tips, promotions, and special offers related to Christmas lighting services",
  frequency: "Message frequency varies.",
  rates: "Message and data rates may apply.",
  helpStop: "Reply STOP to unsubscribe and HELP for help.",
  notRequired: "Consent is not a condition of purchase.",
} as const;

export const FOOTER_COLUMNS = [
  {
    title: "Services",
    links: [
      { label: "Christmas Light Installation", href: LINKS.christmasLightInstallation },
      { label: "Residential Christmas Lights", href: LINKS.residentialLighting },
      { label: "Tree Lighting & Wrapping", href: LINKS.treeLighting },
      { label: "Permanent Lighting", href: LINKS.permanentLighting },
      { label: "Commercial Christmas Lights", href: LINKS.commercialLighting },
      { label: "Gutter Cleaning", href: LINKS.gutterCleaning },
      { label: "Pricing", href: LINKS.pricing },
      { label: "Discounts & Referral Rewards", href: LINKS.discounts },
      { label: "Visualize Lights", href: LINKS.visualize },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: LINKS.about },
      { label: "Careers", href: LINKS.careers },
      { label: "Share the Cheer", href: LINKS.shareTheCheer },
      { label: "Service Areas", href: LINKS.serviceAreas },
      { label: "Project Gallery", href: LINKS.projects },
      { label: "Expert Guides", href: LINKS.blog },
      { label: "Installation Guide", href: LINKS.installationGuide },
      { label: "Contact", href: LINKS.contact },
      { label: "Book Consultation", href: LINKS.bookConsultation },
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
  { label: "Services", href: LINKS.services },
  { label: "Service Areas", href: LINKS.serviceAreas },
  { label: "Pricing", href: LINKS.pricing },
  { label: "About", href: LINKS.about },
  { label: "Share the Cheer", href: LINKS.shareTheCheer },
  { label: "Contact", href: LINKS.contact },
] as const;

export const PRICING = {
  service: {
    label: "One upfront price",
    title: "Full-Season Lighting Service",
    startsAt: 299,
    summary:
      "We provide and pay for the materials. Your custom quote covers the complete seasonal service from installation through storage.",
    includes: [
      "Custom design and company-provided lights",
      "Installation by background-checked employees",
      "In-season maintenance",
      "Takedown and off-season storage",
    ],
  },
  includedEveryYear: [
    "Custom-designed commercial-grade lights",
    "Background-checked installation team",
    "In-season maintenance",
    "Takedown after the holidays",
    "Off-season storage",
    "Any color combination you choose",
    "Free color changes each season",
    "Lifetime warranty",
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
      "Background-checked installation team",
      "Free color changes each season",
      "Removal in January & early February",
      "Summer storage included",
      "No customer-owned light installs",
    ],
    image: ASSETS.photos.temporaryInstall,
    href: LINKS.residentialLighting,
  },
  {
    id: "permanent",
    title: "Permanent Holiday Lighting",
    description:
      "A discreet, durable roofline system with app-controlled colors and schedules for holidays, game days, and year-round accent lighting.",
    features: [
      "Locally sourced in Utah",
      "Lifetime warranty",
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
      "Planned lighting for storefronts, HOAs, property managers, campuses, and municipal displays, with coordinated installation and in-season service.",
    features: [
      "Businesses & retail",
      "HOAs & property managers",
      "City & municipal displays",
      "Year-round lighting options",
    ],
    image: ASSETS.photos.commercialTree,
    href: LINKS.commercialLighting,
  },
] as const;

export const WHY_CHOOSE_US = [
  {
    title: "One Full-Service Price",
    description:
      "We provide the lights and materials. Your custom quote covers installation, maintenance, takedown, and storage.",
  },
  {
    title: "Colors Your Way",
    description:
      "Choose from a wide variety of colors and patterns, then change colors in a future season without an added fee.",
  },
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
  {
    title: "Background-Checked Team",
    description:
      "Every employee who comes to your property is background checked, trained, and selected for professionalism.",
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
      "We switched to permanent lighting last year and couldn't be happier. The lifetime warranty gave us total confidence.",
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
      "We give you one custom upfront service price based on your property and design. Chestnut & Cheer provides and pays for the lights and materials; your quote covers professional installation, in-season maintenance, takedown, and off-season storage. Seasonal service starts at $299 for qualifying scopes.",
  },
  {
    question: "When do you take down temporary lights?",
    answer:
      "We remove temporary installations in January and early February. Permanent lighting stays up year-round with optional seasonal programming.",
  },
  {
    question: "What's the difference between temporary and permanent lighting?",
    answer:
      "Temporary lights are installed each season, removed after the holidays, and stored by us over summer. Permanent lighting is a higher-ticket, locally sourced Utah product with a lifetime warranty — installed once and enjoyed year after year.",
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
      `We service every city in ${COMPANY.serviceAreas.join(", ")}, plus Mona and Nephi in Juab County. Call if you're unsure whether your address is covered.`,
  },
  {
    question: "What if a bulb goes out?",
    answer:
      "We come out for free to replace bad bulbs. Just give us a call or text and we'll get your display shining again.",
  },
] as const;

export const TRUST_BADGES = [
  { label: "Licensed & Insured", detail: COMPANY.license },
  { label: "Lifetime Warranty", detail: "On our lighting" },
  { label: "Free Bulb Replacement", detail: "All season long" },
  { label: "Background Checked", detail: "Every employee" },
] as const;

/** Google Maps embed framed on the northern Utah and Wasatch Back service area. */
export const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d420000!2d-111.82!3d40.47!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus";

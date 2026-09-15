export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingMinutes: number;
  tags: string[];
  sections: { heading: string; paragraphs: string[] }[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "temporary-vs-permanent-christmas-lights",
    title: "Temporary vs. Permanent Christmas Lights for Utah Homes",
    description: "Compare seasonal installation and permanent roofline lighting by appearance, scope, maintenance, storage, controls, and long-term use.",
    date: "2026-07-01",
    readingMinutes: 7,
    tags: ["Permanent Lighting", "Seasonal Lighting"],
    sections: [
      {
        heading: "The practical difference",
        paragraphs: [
          "Temporary Christmas lights are installed for the season and removed afterward. A full-service program can include the commercial-grade lights, timer, custom design, installation, in-season maintenance, takedown, and off-season storage. This is the traditional choice for homeowners who want a strong Christmas-specific display without leaving equipment on the roof all year.",
          "Permanent lighting is installed once in a discreet track along selected rooflines. The homeowner controls colors, brightness, scenes, and schedules from an app for Christmas, other holidays, game days, and everyday architectural accents. It trades annual installation for a larger upfront project and a system that remains with the home.",
        ],
      },
      {
        heading: "Which option creates the look you want?",
        paragraphs: [
          "Seasonal C9 lighting is usually the strongest fit for a classic bulb-by-bulb roofline. It also adapts easily to temporary trees, bushes, wreaths, columns, and other features that are not normally part of a permanent roofline system.",
          "Permanent systems work best when the main goal is a clean architectural outline with fast color changes and scheduling. Ask to see the proposed track location and daylight appearance, because roof transitions, corners, additions, and trim color affect how discreet the system will look when it is off.",
        ],
      },
      {
        heading: "Cost, maintenance, and storage",
        paragraphs: [
          "Chestnut & Cheer seasonal installation starts at $699 in the first year because that scope includes parts and installation. Returning-customer installation starts at $299 when the established lighting package is already in storage. Roofline footage, height, pitch, trees, power, access, and design complexity determine the final quote.",
          "Permanent lighting has a different cost structure because the system, track, controls, power components, and installation remain on the property. Review the written warranty, covered components, workmanship terms, app support, and service process before comparing a permanent proposal with several years of seasonal service.",
        ],
      },
      {
        heading: "A simple decision framework",
        paragraphs: [
          "Choose seasonal lighting when the traditional Christmas look, temporary landscape accents, annual design flexibility, and included removal/storage matter most. Choose permanent lighting when year-round control, multiple occasions, and avoiding annual roofline installation matter more than the larger initial project.",
          "Some properties benefit from both: permanent roofline lighting for flexible year-round use and seasonal trees, wreaths, or landscape accents for December. A measured quote can separate those scopes so you can compare them without guessing.",
        ],
      },
    ],
  },
  {
    slug: "when-to-book-christmas-light-installation-utah",
    title: "When to Book Christmas Light Installation in Utah",
    description: "Plan residential, commercial, HOA, and permanent lighting around Utah’s installation season, approvals, weather, and desired display date.",
    date: "2026-06-15",
    readingMinutes: 6,
    tags: ["Planning", "Commercial"],
    sections: [
      {
        heading: "Start before the first snow forecast",
        paragraphs: [
          "The best time to request a Christmas light quote is before you need the display turned on. A quote may require property measurements, photos, color and scope decisions, access planning, and time to prepare custom-cut strands. Waiting until the desired installation week reduces design and scheduling flexibility.",
          "Late summer and early fall are useful planning windows for residential seasonal lighting. That does not mean the lights must turn on immediately; it means the design and route can be reserved while installation conditions and crew capacity are easier to manage.",
        ],
      },
      {
        heading: "Commercial and HOA projects need more lead time",
        paragraphs: [
          "Businesses, HOAs, multifamily properties, and public-facing spaces often involve more than one decision maker. Brand standards, board approval, certificates of insurance, power, pedestrian areas, tenant communication, operating hours, and multiple buildings can all affect the schedule.",
          "Begin commercial planning early enough to identify the display date, approval path, install window, access contact, maintenance contact, and takedown expectation. A smaller storefront may move quickly; a coordinated property should not be treated like a last-minute residential roofline.",
        ],
      },
      {
        heading: "Utah weather changes safe access",
        paragraphs: [
          "Foothill properties, steep driveways, shaded roofs, and higher elevations can collect snow or ice before valley-floor homes. Wind also affects exposed lots around Utah Lake and the west side of both counties. Crews may need to move work when roof, ladder, or driveway conditions are unsafe.",
          "Earlier installation gives the schedule room to respond to weather. No company can guarantee outdoor access during every storm, so ask how the installer communicates weather delays and prioritizes existing displays that need in-season service.",
        ],
      },
      {
        heading: "Permanent lighting has a broader season",
        paragraphs: [
          "Permanent roofline lighting can be installed outside the Christmas rush, subject to normal weather and product availability. Spring and summer appointments may offer more flexibility and give homeowners time to learn the controls before holiday programming begins.",
          "When requesting any quote, share the address, property type, desired features, ideal activation date, photos, HOA or property standards, and any known access constraints. Better inputs produce a faster and more realistic proposal.",
        ],
      },
    ],
  },
  {
    slug: "gutter-cleaning-with-holiday-lights",
    title: "Should You Schedule Gutter Cleaning With Holiday Light Installation?",
    description: "Understand when bundling gutter cleaning with Christmas light installation is practical, what to ask, and why access and scope still matter.",
    date: "2026-05-20",
    readingMinutes: 5,
    tags: ["Gutter Cleaning", "Maintenance"],
    sections: [
      {
        heading: "Why the services can fit together",
        paragraphs: [
          "Gutter cleaning and roofline Christmas light installation both require safe access to the roof edge. Scheduling them together can reduce the need to coordinate two separate appointments and lets the crew inspect the gutter edge before selecting light clips or routes.",
          "The services are still different scopes. A lighting quote does not automatically include removal of leaves, sediment, roof debris, downspout obstructions, gutter guards, or repairs. Ask for the gutter work as a separate line item so the access, disposal, and limitations are clear.",
        ],
      },
      {
        heading: "Clean access before clips are installed",
        paragraphs: [
          "Leaves and debris along the roof edge can interfere with inspection and attachment. When cleaning is approved, it normally makes sense to complete it before the lighting is installed rather than work around a finished display.",
          "Gutter guards, steep pitches, multiple stories, narrow side yards, fences, fragile landscaping, frozen debris, and unsafe weather can change whether the add-on is practical. A photo or site review helps the crew identify those conditions before the appointment.",
        ],
      },
      {
        heading: "Questions to ask before bundling",
        paragraphs: [
          "Confirm whether the quote includes gutters, downspout openings, debris bagging or haul-away, and any accessible roof-valley debris. Ask what is excluded, how the crew handles gutter guards, and whether the service includes inspection only or any repair. Cleaning should not be represented as a substitute for damaged-gutter or drainage work.",
          "If gutter cleaning is a priority, mention it when requesting the lighting estimate. Chestnut & Cheer can determine whether it fits the same visit and price it separately from the lighting design.",
        ],
      },
    ],
  },
];

export function getPostBySlug(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug) ?? null;
}

export function getAllPosts() {
  return [...BLOG_POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
}

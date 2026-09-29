export type ArticleImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type ArticleSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  image?: ArticleImage;
};

export type BlogPost = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  date: string;
  modified: string;
  readingMinutes: number;
  tags: string[];
  keywords: string[];
  eyebrow: string;
  heroImage: string;
  heroAlt: string;
  hub?: boolean;
  takeaways: string[];
  expertQuote?: string;
  sections: ArticleSection[];
  relatedSlugs: string[];
  serviceLinks: { label: string; href: string; description: string }[];
};

const PUBLISHED = "2026-09-29";

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "professional-christmas-light-installation-guide",
    title: "The Professional’s Guide to Christmas Light Installation",
    shortTitle: "Professional Installation Guide",
    description:
      "A practical guide to designing, hanging, powering, maintaining, removing, and storing Christmas lights.",
    date: PUBLISHED,
    modified: PUBLISHED,
    readingMinutes: 14,
    tags: ["Installation", "Planning", "Safety"],
    keywords: [
      "Christmas light installation guide",
      "how to install Christmas lights",
      "professional Christmas light installation",
      "Christmas lights Utah",
    ],
    eyebrow: "The complete field guide",
    heroImage:
      "/images/photos/professional/christmas-light-technician-carrying-ladder-utah.avif",
    heroAlt:
      "Chestnut & Cheer technician carrying a ladder for a Christmas light installation in Utah",
    hub: true,
    takeaways: [
      "Design the display around the home’s visible architecture before buying lights.",
      "Use the correct clip for each roof or surface and keep roofline spacing consistent.",
      "C7 and C9 socket line can be custom-fit; sealed mini-light strands should not be cut.",
      "Keep plugs and capped wire ends out of standing water, and stop if roof or electrical work feels unsafe.",
      "A full-service professional program should define the lights, installation, maintenance, removal, and storage in writing.",
    ],
    expertQuote:
      "Ideally, you shouldn’t even be able to see where the lights are getting power from.",
    sections: [
      {
        id: "plan-the-design",
        heading: "Begin with the view, not the box of lights",
        paragraphs: [
          "A clean display starts before anyone climbs a ladder. Stand where visitors and neighbors will see the home, then identify the street-facing soffits, eaves, peaks, garage, porch, columns, trees, and wreath locations that deserve attention. The goal is not automatically to light every edge. It is to create one clear visual composition.",
          "Color is personal. Warm white tends to feel quiet and inviting, while red, white, and green reads as unmistakably Christmas. When the budget is limited, our team’s simplest recommendation is to prioritize the [roofline or a wreath](/blog/christmas-light-design-tips). Those focal points usually create more impact than scattering a few lights across many features.",
        ],
      },
      {
        id: "choose-the-right-lights",
        heading: "Match the light to the job",
        paragraphs: [
          "C7 and C9 bulbs are the traditional choice for rooflines because each bulb can face outward and follow the architecture. C7 bulbs are roughly half the size of C9s. Mini lights are smaller, closer together, and normally better suited to trunks, branches, evergreens, and bushes.",
          "Commercial-grade products offer better customization than most retail sets. A professional can select the socket spacing, bulb colors, wire color, clips, plugs, and lead cord as one system. Read our practical comparison of [C7, C9, and mini lights](/blog/c7-vs-c9-vs-mini-christmas-lights) before choosing a product.",
        ],
        image: {
          src: "/images/photos/professional/commercial-grade-holiday-light-bundle.avif",
          alt: "Bundle of commercial-grade Christmas lights prepared for installation",
          caption: "Commercial-grade components can be prepared for the exact design instead of forcing a retail strand to fit.",
        },
      },
      {
        id: "straight-rooflines",
        heading: "Build a straight, consistent roofline",
        paragraphs: [
          "The right attachment depends on the surface. Shingle tabs, Solo Light Clips, and clips intended for clay tile solve different problems. Using one inexpensive universal clip everywhere often leads to crooked bulbs, weak attachment, or avoidable pressure on the surface.",
          "Consistency matters just as much as the clip. Our installers avoid jumping from soffit to gutter to shingle whenever possible, place a bulb directly at each peak, and keep spacing close to 12 inches when the architecture permits. That is the difference between a line that traces the house and one that looks improvised. See the [most common installation mistakes](/blog/christmas-light-installation-mistakes) for a closer look.",
        ],
        image: {
          src: "/images/photos/professional/roofline-christmas-light-clip-installation.avif",
          alt: "Purpose-built Christmas light clip attached along a roof edge",
          caption: "The best clip is the one designed for the actual roof edge or surface.",
        },
      },
      {
        id: "wrap-trees",
        heading: "Light the tree that is actually there",
        paragraphs: [
          "Full winter trees can work well with a spiral or branch-hopping method. Sparse deciduous trees often look better when major branches are wrapped individually, allowing the light to reveal the natural structure after dark. The right method depends on the species, winter fullness, height, and the effect the homeowner wants.",
          "Plugs should not be left exposed, and the route should be planned with takedown in mind. Reaching the top, managing circuits, and avoiding a knot of interlocked strands are common trouble spots. Our [tree-wrapping guide](/blog/how-to-wrap-outdoor-trees-with-christmas-lights) explains the decision in more detail.",
        ],
      },
      {
        id: "custom-fit-wire",
        heading: "Custom-fit the visible lights and hide the connections",
        paragraphs: [
          "Professional crews bring more socket line than the measured run is likely to require, install it to the architecture, and remove the excess at the approved cut point. C7 and C9 socket line can be cut and terminated correctly; mini-light strands generally cannot.",
          "Lead cord and properly placed plugs connect separated roof areas without leaving empty sockets or dangling extension cords in view. Safe concealment may include routing behind a downspout, within a soffit area, or beneath an appropriate shingle edge. The detailed [custom-cut lighting guide](/blog/how-professionals-custom-cut-christmas-lights) explains what can and cannot be tailored.",
        ],
      },
      {
        id: "power-and-weather",
        heading: "Respect the wire, the outlet, and the weather",
        paragraphs: [
          "Available wattage is only one limit. The light line and the distance from the outlet matter too. Our LED bulbs use about 0.5 watt each, but we still generally limit a run to about 200 bulbs away from the outlet because the wire—not only the circuit—can become the constraint.",
          "Rain and melting snow expose weak routing quickly. A cut end that is not sealed or a plug resting where water collects can trip a GFCI. We secure wire ends and keep plugs suspended instead of laying them on the ground. If a breaker or GFCI continues to trip, disconnect the display and investigate rather than repeatedly resetting it. Learn what to check in [why Christmas lights trip a GFCI](/blog/why-christmas-lights-trip-gfci).",
          "Electrical capacity varies with the circuit, other loads, product ratings, and local requirements. Follow the manufacturer’s instructions and use a qualified electrician when the available power or outlet condition is uncertain.",
        ],
      },
      {
        id: "safety",
        heading: "Know when the project should stop being DIY",
        paragraphs: [
          "Falls and electrical shock are the two risks our team worries about most. A homeowner should avoid the project if they are uncomfortable with heights or electricity, lack stable access, or do not trust their balance and coordination on ladders and roofs.",
          "Snow, frost, wind, a steep pitch, a second-story edge, or awkward landscaping can turn a familiar task into a bad bet. Hiring a professional is not a failure of DIY ambition; sometimes it is simply the right risk decision. Chestnut & Cheer provides [residential Christmas light installation](/christmas-light-installation/residential) across its northern Utah and Wasatch Back service area.",
        ],
      },
      {
        id: "maintenance-storage",
        heading: "Plan maintenance, takedown, and storage before installation",
        paragraphs: [
          "When a display goes dark, begin with the simple possibilities: confirm the outdoor outlet still has power and check whether an indoor switch controls it. Weather can accelerate deterioration; sun exposure can yellow bulbs, and repeated installation eventually makes clips brittle.",
          "Most deterioration happens outside, not in the storage bin. Installing later and removing earlier reduces exposure. For repeatable installation, our team favors a color-coded map that identifies each run. Read more about [light lifespan, troubleshooting, and storage](/blog/how-long-do-christmas-lights-last).",
        ],
      },
      {
        id: "hire-a-professional",
        heading: "Compare the whole service, not just the installation day",
        paragraphs: [
          "Professional quotes vary with workmanship, crew experience, demand, access, design, and the materials included. A complete seasonal service should make it clear who provides the lights and whether installation, in-season maintenance, removal, and storage are included.",
          "Look for reviews, reliable communication, a company that stands behind its work, and a clear takedown commitment. Buying, leasing, and multi-year programs distribute cost and ownership differently, so ask who owns the lights and what happens in later seasons. Use our [installer comparison checklist](/blog/how-to-choose-christmas-light-installer) and review [Chestnut & Cheer pricing](/pricing) before deciding.",
        ],
      },
      {
        id: "timing",
        heading: "Reserve the work before winter removes your options",
        paragraphs: [
          "Late October through November is the usual installation window. Planning earlier gives time to settle the design and gives the installer more flexibility before snow, ice, and a full route narrow the calendar.",
          "A professional installer can handle measuring, materials, connection planning, and electrical access around the specific home and the homeowner’s vision. Our guide to the [best time to install Christmas lights](/blog/best-time-to-install-christmas-lights) lays out the practical schedule.",
        ],
      },
    ],
    relatedSlugs: [
      "christmas-light-installation-mistakes",
      "c7-vs-c9-vs-mini-christmas-lights",
      "how-to-choose-christmas-light-installer",
    ],
    serviceLinks: [
      {
        label: "Residential installation",
        href: "/christmas-light-installation/residential",
        description: "Custom design, installation, service, takedown, and storage for Utah homes.",
      },
      {
        label: "Pricing and inclusions",
        href: "/pricing",
        description: "See starting prices, quote factors, and what the seasonal program includes.",
      },
      {
        label: "Get an instant estimate",
        href: "/estimate",
        description: "Share the property and desired scope in about two minutes.",
      },
    ],
  },
  {
    slug: "christmas-light-installation-mistakes",
    title: "7 Christmas Light Installation Mistakes Our Crews Notice",
    shortTitle: "Common Installation Mistakes",
    description:
      "Loose ends, wrong clips, crooked peaks, empty sockets, dangling cords, exposed plugs, and unsafe access—plus how a professional prevents each problem.",
    date: PUBLISHED,
    modified: PUBLISHED,
    readingMinutes: 6,
    tags: ["Installation", "Rooflines", "Safety"],
    keywords: ["Christmas light installation mistakes", "how to hang Christmas lights", "straight Christmas lights roofline"],
    eyebrow: "Lessons from the ladder",
    heroImage: "/images/photos/professional/professional-roofline-light-installation.avif",
    heroAlt: "Professional installer aligning Christmas lights along a residential roofline",
    takeaways: [
      "Do not use empty sockets as makeshift extension wire.",
      "Choose a clip made for the actual shingle, gutter, tile, or edge.",
      "Keep the attachment line and bulb spacing consistent across peaks and corners.",
      "Seal cut ends and keep plugs away from standing water.",
    ],
    expertQuote:
      "We avoid transitioning from soffit to gutter to shingles whenever possible so the lights stay in one straight line, and we make sure there’s a bulb directly at each peak.",
    sections: [
      {
        id: "visible-shortcuts",
        heading: "1–3: visible shortcuts that make a display look unfinished",
        paragraphs: [
          "The first three mistakes are exposed loose ends, dangling power cords, and runs of empty sockets used to bridge a gap. All three advertise how the display was powered instead of letting the architecture lead.",
          "A professional uses lead cord and properly placed plugs to connect separate roof areas, then routes those connections out of the primary view. C7 and C9 socket line is fitted to the run so excess wire does not collect at the last corner. Our [custom-cut lighting guide](/blog/how-professionals-custom-cut-christmas-lights) explains that system.",
        ],
      },
      {
        id: "wrong-clips",
        heading: "4–5: the wrong clip and an inconsistent line",
        paragraphs: [
          "The nicest clip can look like an unnecessary expense until a cheap one twists bulbs, slips, or does not suit the surface. Shingle tabs, Solo Light Clips, and clay-tile clips exist because roofs are not interchangeable.",
          "The fifth mistake is changing attachment surfaces without a visual reason. Moving from soffit to gutter to shingle changes the height and angle of the bulbs. Pros choose one line, keep spacing close to 12 inches when the house permits, and place a bulb at each peak so the geometry feels intentional.",
        ],
        image: {
          src: "/images/photos/professional/roofline-christmas-light-clip-installation.avif",
          alt: "Close-up of a Christmas light clip selected for a roof edge",
        },
      },
      {
        id: "water-and-access",
        heading: "6–7: exposed electrical connections and unsafe access",
        paragraphs: [
          "An unsealed cut end or a plug sitting in a puddle can create a GFCI problem. Cap approved cut ends, support plugs above places where rain or snowmelt collects, and follow the product’s rating and instructions.",
          "The final mistake is treating every roof as safely DIY. Height, pitch, wind, frost, ladder placement, and personal coordination all matter. If any of those feel uncertain, stop. You can compare the full process in our [professional installation guide](/blog/professional-christmas-light-installation-guide) or request [residential installation](/christmas-light-installation/residential).",
        ],
      },
    ],
    relatedSlugs: ["how-professionals-custom-cut-christmas-lights", "why-christmas-lights-trip-gfci", "professional-christmas-light-installation-guide"],
    serviceLinks: [
      { label: "Residential installation", href: "/christmas-light-installation/residential", description: "See how Chestnut & Cheer handles the full seasonal process." },
      { label: "Project gallery", href: "/projects", description: "Look at real local installation work and roofline details." },
    ],
  },
  {
    slug: "how-to-wrap-outdoor-trees-with-christmas-lights",
    title: "How Professionals Wrap Outdoor Trees With Christmas Lights",
    shortTitle: "How to Wrap Outdoor Trees",
    description:
      "Choose between spiral, branch-hopping, and individual-branch wrapping based on winter fullness, tree shape, height, and takedown—not guesswork.",
    date: PUBLISHED,
    modified: PUBLISHED,
    readingMinutes: 5,
    tags: ["Trees", "Design", "Installation"],
    keywords: ["how to wrap outdoor trees with Christmas lights", "Christmas tree wrapping lights", "outdoor tree lights"],
    eyebrow: "Let the tree choose the method",
    heroImage: "/images/photos/commercial-tree.avif",
    heroAlt: "Large outdoor tree wrapped with Christmas lights",
    takeaways: [
      "Full winter canopies can suit spiral or branch-hopping methods.",
      "Sparse trees often look better when major branches are wrapped individually.",
      "Mini lights are the normal choice for trunks and branches.",
      "Plan plug locations, reach, circuit load, and takedown before wrapping.",
    ],
    expertQuote: "You want to see a lit tree, not just haphazardly placed lights.",
    sections: [
      {
        id: "read-the-tree",
        heading: "Choose the method after the leaves are gone",
        paragraphs: [
          "A tree that stays full through winter can carry a broader spiral or branch-hopping pattern because the canopy provides visual mass. A deciduous tree that becomes open and sculptural usually benefits from wrapping the trunk and major branches individually. At night, the lights should reveal the tree’s natural form.",
          "Decide whether the goal is a glowing canopy, an outlined branch structure, or a simple trunk accent. That choice controls both the light count and the labor much more than the tree’s height alone.",
        ],
      },
      {
        id: "choose-the-light",
        heading: "Use mini lights for most trees",
        paragraphs: [
          "Mini lights have close spacing and a small visual scale, which makes them the practical choice for trunks and branches. C7 and C9 bulbs are usually better on rooflines or landscape stakes; most residential trees are not large enough for those bulbs to feel proportional inside the canopy.",
          "If you are still choosing products, compare [C7, C9, and mini lights](/blog/c7-vs-c9-vs-mini-christmas-lights) before buying a large quantity.",
        ],
      },
      {
        id: "plan-the-exit",
        heading: "Install for the January version of the job too",
        paragraphs: [
          "A good tree installation can still be a bad system if every plug is exposed, the top cannot be reached safely, several strands overload a weak route, or takedown requires untying a web of crossed wires.",
          "Professionals plan the direction of travel, connection points, supported transitions, access to the top, and the order of removal. For a full-property plan, start with the [professional Christmas light installation guide](/blog/professional-christmas-light-installation-guide).",
        ],
      },
    ],
    relatedSlugs: ["c7-vs-c9-vs-mini-christmas-lights", "christmas-light-design-tips", "how-long-do-christmas-lights-last"],
    serviceLinks: [
      { label: "Residential lighting", href: "/christmas-light-installation/residential", description: "Add professionally wrapped trees to a custom home design." },
      { label: "Commercial lighting", href: "/christmas-light-installation/commercial", description: "Plan statement trees and public-facing displays." },
    ],
  },
  {
    slug: "c7-vs-c9-vs-mini-christmas-lights",
    title: "C7 vs. C9 vs. Mini Christmas Lights: Where Each Belongs",
    shortTitle: "C7 vs. C9 vs. Mini Lights",
    description:
      "A simple field guide to bulb size, spacing, orientation, customization, and the best uses for C7, C9, and mini Christmas lights.",
    date: PUBLISHED,
    modified: PUBLISHED,
    readingMinutes: 5,
    tags: ["Products", "Design", "Rooflines"],
    keywords: ["C7 vs C9 Christmas lights", "C9 vs mini lights", "best Christmas lights for roofline"],
    eyebrow: "Use the right visual scale",
    heroImage: "/images/photos/professional/commercial-grade-holiday-light-bundle.avif",
    heroAlt: "Commercial-grade Christmas light bulbs and socket line bundled for installation",
    takeaways: [
      "C9 bulbs are the largest of the three and create the classic bold roofline.",
      "C7 bulbs are about half the size of C9s and work where a smaller outline is preferred.",
      "Mini lights have tight spacing and are the normal choice for trees and bushes.",
      "Commercial socket line makes custom colors, lengths, and outward-facing bulbs possible.",
    ],
    expertQuote:
      "C7s and C9s are great for rooflines, while minis work well for trees and bushes.",
    sections: [
      {
        id: "size-and-spacing",
        heading: "The visible difference is scale",
        paragraphs: [
          "C9 bulbs create the largest, most traditional roofline presence. C7 bulbs are roughly half their size. Mini-light strands use much smaller lamps at tighter spacing, so the effect reads as a field of light rather than a row of individual bulbs.",
          "C7 and C9 socket line also allows the installer to orient bulbs consistently outward. That disciplined direction is one reason a professional roofline looks clean from the street.",
        ],
      },
      {
        id: "best-uses",
        heading: "Match the product to the feature",
        paragraphs: [
          "Use C7 or C9 bulbs for eaves, peaks, garages, windows, and columns when you want distinct points of light. Use mini lights for branches, trunks, evergreens, and bushes where close spacing needs to follow an organic form.",
          "Other landscaping is a design choice, but scale still matters. A row of C7s on stakes can define a bed or path; mini lights stretched along the grass rarely create the same intentional edge. For trees specifically, see [how professionals wrap outdoor trees](/blog/how-to-wrap-outdoor-trees-with-christmas-lights).",
        ],
      },
      {
        id: "commercial-grade",
        heading: "Commercial-grade is mainly about control and consistency",
        paragraphs: [
          "Professional materials generally cost more, but they also offer better control over color schemes, socket spacing, wire color, replacement parts, and exact lengths. Professional mini-light strands are easier to work with and tend to create a more consistent result than a pile of mixed retail sets.",
          "Product quality cannot rescue a poor layout, so pair the material decision with a clear [Christmas light design plan](/blog/christmas-light-design-tips).",
        ],
      },
    ],
    relatedSlugs: ["how-to-wrap-outdoor-trees-with-christmas-lights", "how-professionals-custom-cut-christmas-lights", "christmas-light-design-tips"],
    serviceLinks: [
      { label: "Residential lighting", href: "/christmas-light-installation/residential", description: "See what is included in a custom-fit residential display." },
      { label: "Christmas light pricing", href: "/pricing", description: "Understand how materials and scope affect a quote." },
    ],
  },
  {
    slug: "why-christmas-lights-trip-gfci",
    title: "Why Christmas Lights Trip a GFCI in Rain or Snow",
    shortTitle: "Why Christmas Lights Trip GFCIs",
    description:
      "Learn why wet plugs, exposed wire ends, long runs, and simple power interruptions make Christmas lights go dark—and what to check safely first.",
    date: PUBLISHED,
    modified: PUBLISHED,
    readingMinutes: 5,
    tags: ["Electrical", "Troubleshooting", "Safety"],
    keywords: ["Christmas lights trip GFCI", "Christmas lights out after rain", "outdoor Christmas light electrical safety"],
    eyebrow: "Start with water and connections",
    heroImage: "/images/photos/professional/technician-checking-christmas-light-bulb.avif",
    heroAlt: "Christmas lighting technician checking a bulb and connection before installation",
    takeaways: [
      "Water around a plug or an exposed cut end can trip a GFCI.",
      "Hang and support plugs instead of leaving them where water pools.",
      "Wire length and product ratings matter even when LEDs draw little power.",
      "Check outlet power and indoor switches before assuming the lights failed.",
    ],
    expertQuote:
      "We help prevent this by securing our wire ends and making sure plugs are hanging rather than sitting on the ground or somewhere water can collect.",
    sections: [
      {
        id: "why-weather-trips-lights",
        heading: "Rain and snow expose vulnerable connections",
        paragraphs: [
          "A GFCI is meant to interrupt power when it detects current taking an unintended path. In an outdoor display, a cut end that was not sealed or a plug lying in meltwater can create exactly the condition the device is watching for.",
          "Approved cut points need the correct cap, and plugs should be supported above low areas where rain and snowmelt collect. Those small routing choices are part of a professional installation, not cosmetic extras.",
        ],
      },
      {
        id: "safe-loads",
        heading: "Low-watt LEDs do not make every run unlimited",
        paragraphs: [
          "Our LED bulbs use about 0.5 watt each, while a typical 15-amp, 120-volt circuit is often described as having 1,800 watts available before accounting for continuous-load guidance and everything else on the circuit. But circuit wattage is not the only boundary: wire size, distance, connections, and the manufacturer’s limits also matter.",
          "For that reason, our team generally limits a run to roughly 200 bulbs away from the outlet. Treat that as our field practice, not a universal specification. Follow the ratings for the exact product and ask a qualified electrician to evaluate uncertain circuits or outlets.",
        ],
      },
      {
        id: "what-to-check",
        heading: "What a homeowner can check first",
        paragraphs: [
          "If the display is dark, confirm that the outdoor outlet has power and check whether an indoor wall switch controls it. Look from the ground for a plug that has fallen into a wet area. Do not climb onto a wet or icy roof and do not keep resetting a device that immediately trips again.",
          "Disconnect the display if there is visible damage, heat, arcing, a burning smell, or repeated tripping. Customers in Chestnut & Cheer’s seasonal program can request [in-season service](/christmas-light-installation/residential); DIY installers can use the [full installation guide](/blog/professional-christmas-light-installation-guide) to review the system.",
        ],
      },
    ],
    relatedSlugs: ["christmas-light-installation-mistakes", "how-long-do-christmas-lights-last", "professional-christmas-light-installation-guide"],
    serviceLinks: [
      { label: "Residential installation", href: "/christmas-light-installation/residential", description: "Seasonal service includes normal bulb replacement and maintenance." },
      { label: "Contact the team", href: "/contact", description: "Ask about a Chestnut & Cheer installation or service visit." },
    ],
  },
  {
    slug: "how-professionals-custom-cut-christmas-lights",
    title: "How Professionals Custom-Cut Christmas Lights to Fit a Roofline",
    shortTitle: "How Custom-Cut Lights Work",
    description:
      "See how C7 and C9 socket line, lead cord, vampire plugs, and sealed ends create exact roofline lengths without visible excess wire.",
    date: PUBLISHED,
    modified: PUBLISHED,
    readingMinutes: 5,
    tags: ["Installation", "Wiring", "Rooflines"],
    keywords: ["custom cut Christmas lights", "cut C9 Christmas lights", "vampire plugs Christmas lights"],
    eyebrow: "Fit the house, not the package",
    heroImage: "/images/photos/professional/technician-bundling-commercial-christmas-lights.avif",
    heroAlt: "Chestnut & Cheer technician preparing custom Christmas light socket line",
    takeaways: [
      "C7 and C9 bulk socket line can be cut only at appropriate points and terminated correctly.",
      "Sealed mini-light strands should not be shortened.",
      "Lead cord bridges unlit gaps without a row of empty sockets.",
      "Custom fitting is what removes coils, dangling excess, and awkward endpoints.",
    ],
    expertQuote:
      "We bring more lights than we expect to need, install everything, and then remove the excess so the lights are tailored specifically to your house.",
    sections: [
      {
        id: "what-can-be-cut",
        heading: "Know which product is designed to be customized",
        paragraphs: [
          "Professional C7 and C9 socket line can be measured to the architectural run, cut at an appropriate point, and finished with the correct plug or protective end cap. That lets the last socket land where the roofline actually ends.",
          "Mini-light strands are a different electrical product and should not be cut. Their series sections and sealed construction are meant to remain intact. If a mini strand is too long, choose a different length or redesign the route.",
        ],
      },
      {
        id: "lead-cord",
        heading: "Use lead cord for the spaces that should stay dark",
        paragraphs: [
          "A display may need to travel from an outlet to the first bulb or from one roof section to another without showing light in between. Lead cord and correctly installed plugs make that transition without using empty lamp sockets as an extension cable.",
          "Professionals conceal safe connection routes behind downspouts, within suitable soffit areas, or beneath appropriate edges when the construction permits. The result should reveal the lights, not the wiring.",
        ],
        image: {
          src: "/images/photos/professional/close-up-christmas-light-installation.avif",
          alt: "Close-up of a professional custom Christmas light installation",
        },
      },
      {
        id: "measure-on-the-house",
        heading: "Final fitting happens on the architecture",
        paragraphs: [
          "Measurements establish material quantities, but the most accurate endpoint is confirmed as the line is clipped to peaks, corners, and transitions. Bringing extra line allows the installer to maintain spacing instead of stretching the last few sockets or stopping short.",
          "Electrical customization is not a good place to improvise. Use components intended to work together, cap every approved cut end, follow manufacturer instructions, and review the [GFCI and weather guide](/blog/why-christmas-lights-trip-gfci) before powering an outdoor display.",
        ],
      },
    ],
    relatedSlugs: ["christmas-light-installation-mistakes", "c7-vs-c9-vs-mini-christmas-lights", "why-christmas-lights-trip-gfci"],
    serviceLinks: [
      { label: "Residential installation", href: "/christmas-light-installation/residential", description: "Get a roofline prepared specifically for your home." },
      { label: "Get an estimate", href: "/estimate", description: "Describe the property and the features you want to light." },
    ],
  },
  {
    slug: "christmas-light-design-tips",
    title: "Christmas Light Design Tips for a Clean, High-Impact Display",
    shortTitle: "Christmas Light Design Tips",
    description:
      "Choose focal points, colors, bulb scale, and a realistic scope that complements the home instead of lighting every available edge.",
    date: PUBLISHED,
    modified: PUBLISHED,
    readingMinutes: 5,
    tags: ["Design", "Planning", "Budget"],
    keywords: ["Christmas light design ideas", "Christmas light color schemes", "Christmas light display budget"],
    eyebrow: "Fewer decisions, stronger composition",
    heroImage: "/images/photos/professional/professional-christmas-lights-roof-install.avif",
    heroAlt: "Professional Christmas light installation tracing the architecture of a Utah home",
    takeaways: [
      "Prioritize the street-facing architecture and one clear focal point.",
      "Warm white feels inviting; classic red, white, and green reads immediately as Christmas.",
      "Keep bulb size, spacing, and attachment line consistent.",
      "On a limited budget, start with the roofline or a wreath.",
    ],
    expertQuote: "Roofline lights or a wreath.",
    sections: [
      {
        id: "choose-features",
        heading: "Light what the street can understand",
        paragraphs: [
          "Begin with the street-facing soffits and roof edges. Peaks, the garage line, a porch, columns, or one statement tree can support that outline, but every feature does not need equal weight.",
          "A useful design can be described in one sentence: classic warm-white roofline with a lit wreath, for example. If the plan takes a paragraph to explain, it may need a clearer hierarchy.",
        ],
      },
      {
        id: "choose-colors",
        heading: "Choose color for the feeling you want",
        paragraphs: [
          "Warm white supports a calm, welcoming look and works easily with many exterior finishes. Red, white, and green gives the house an unmistakably traditional Christmas identity. Other palettes can work when they connect to the homeowner’s taste or the architecture.",
          "Keep the rule consistent across the visible composition. A deliberate alternating pattern looks designed; unrelated colors added feature by feature can feel accidental. The [C7, C9, and mini-light guide](/blog/c7-vs-c9-vs-mini-christmas-lights) helps match scale to each surface.",
        ],
      },
      {
        id: "budget",
        heading: "Spend a limited budget where it creates a silhouette",
        paragraphs: [
          "A complete front roofline can define the home from a distance. A well-sized wreath can create a strong focal point. Those choices usually outperform small fragments of light spread across roof, shrubs, windows, and trees.",
          "Ask for optional features as separate line items so the design can grow without losing its core. Chestnut & Cheer’s [pricing page](/pricing) explains the property factors behind a quote, and the [residential service page](/christmas-light-installation/residential) describes the full seasonal scope.",
        ],
      },
    ],
    relatedSlugs: ["c7-vs-c9-vs-mini-christmas-lights", "how-to-wrap-outdoor-trees-with-christmas-lights", "best-time-to-install-christmas-lights"],
    serviceLinks: [
      { label: "Visualize your lights", href: "/visualize", description: "Explore how a lighting concept could look on your property." },
      { label: "Project gallery", href: "/projects", description: "See real Chestnut & Cheer installation details." },
    ],
  },
  {
    slug: "how-long-do-christmas-lights-last",
    title: "How Long Do Christmas Lights Last Outdoors? Field Notes on Wear and Storage",
    shortTitle: "Light Lifespan and Storage",
    description:
      "Understand how sun, wind, snow, brittle clips, repeated installation, and storage affect outdoor Christmas lights—and how to simplify next season.",
    date: PUBLISHED,
    modified: PUBLISHED,
    readingMinutes: 5,
    tags: ["Maintenance", "Storage", "Troubleshooting"],
    keywords: ["how long do Christmas lights last", "store Christmas lights", "Christmas light weather damage"],
    eyebrow: "Most wear happens outside",
    heroImage: "/images/photos/professional/technician-securing-ladder-on-service-truck.avif",
    heroAlt: "Chestnut & Cheer technician preparing equipment after seasonal installation work",
    takeaways: [
      "Sun exposure can yellow and weaken lighting components.",
      "Wind, freezing weather, installation, and takedown all add wear.",
      "Most deterioration happens while the lights are outside, not in storage.",
      "A color-coded map makes an established design far easier to reinstall.",
    ],
    expertQuote:
      "A color-coded map is the best method I’ve found to ensure you can recreate the same installation year after year.",
    sections: [
      {
        id: "exposure",
        heading: "The house’s orientation can change the wear",
        paragraphs: [
          "A south-facing roofline generally receives more direct sun than a north-facing one. Over a season, ultraviolet exposure and heat can contribute to yellowing bulbs and aging wire or plastic components. There is no exact lifespan that fits every property because exposure varies so much.",
          "Installing later and removing earlier reduces outdoor time. That tradeoff matters most when longevity is a higher priority than displaying the lights for the longest possible season.",
        ],
      },
      {
        id: "weather-and-handling",
        heading: "Weather is only part of the stress",
        paragraphs: [
          "Snow, freezing temperatures, wind, and repeated wet-dry cycles accelerate deterioration. Clips eventually become brittle. Installation and removal flex those clips again, so even a carefully stored system will need consumable parts replaced over time.",
          "After installation, a dark display may have a simple cause: the outdoor outlet lost power or an indoor switch was turned off. Check those basics before assuming the strand has failed. For wet-weather problems, use the [GFCI troubleshooting guide](/blog/why-christmas-lights-trip-gfci).",
        ],
      },
      {
        id: "storage",
        heading: "Map the display before it comes down",
        paragraphs: [
          "Dry, organized storage protects the system, but most of its aging happened while it was installed. The larger storage challenge is preserving the logic of the design so every labeled run returns to the right location.",
          "A color-coded property map, matching labels, and separate containment for fragile or specialty pieces remove guesswork the following year. Full-service customers can confirm how [takedown and storage](/christmas-light-installation/residential) are handled in their proposal.",
        ],
      },
    ],
    relatedSlugs: ["why-christmas-lights-trip-gfci", "best-time-to-install-christmas-lights", "professional-christmas-light-installation-guide"],
    serviceLinks: [
      { label: "Residential installation", href: "/christmas-light-installation/residential", description: "Seasonal service includes takedown and labeled off-season storage." },
      { label: "Contact the team", href: "/contact", description: "Ask about maintenance for a Chestnut & Cheer display." },
    ],
  },
  {
    slug: "how-to-choose-christmas-light-installer",
    title: "How to Choose a Christmas Light Installer: 12 Questions to Ask",
    shortTitle: "How to Choose an Installer",
    description:
      "Compare Christmas light companies by materials, workmanship, maintenance, removal, storage, ownership, reviews, and the written scope—not price alone.",
    date: PUBLISHED,
    modified: PUBLISHED,
    readingMinutes: 6,
    tags: ["Hiring", "Pricing", "Planning"],
    keywords: ["how to choose Christmas light installer", "Christmas light installation cost", "professional Christmas light company"],
    eyebrow: "Compare the complete season",
    heroImage: "/images/photos/professional/chestnut-cheer-lighting-technician-traven.avif",
    heroAlt: "Experienced Chestnut & Cheer Christmas lighting technician in Utah",
    takeaways: [
      "Confirm exactly who provides and owns the lights.",
      "The proposal should address installation, maintenance, removal, and storage.",
      "Check reviews for follow-through, especially service and takedown.",
      "Understand how later-season pricing works before signing the first year.",
    ],
    expertQuote:
      "Look at their reviews and make sure you’re hiring a company that is going to do a good job, stand behind its work, and actually come back to take the lights down when the season is over.",
    sections: [
      {
        id: "scope-questions",
        heading: "Ask these questions about the physical work",
        paragraphs: [
          "A low number is not comparable to a full-service quote until the scope is clear. Ask the installer these six questions:",
        ],
        bullets: [
          "Are the commercial-grade lights, clips, timer, lead cord, and other materials included?",
          "Will the visible runs be custom-fit to the property?",
          "Which rooflines, peaks, trees, bushes, or wreaths are included?",
          "How are plugs, unlit transitions, and cut ends handled?",
          "What happens if a normal bulb failure occurs during the season?",
          "Are removal and off-season storage included, and when will takedown occur?",
        ],
      },
      {
        id: "company-questions",
        heading: "Ask these questions about the company",
        paragraphs: [
          "Quality of work, crew experience, confidence in employees, demand, and scheduling all contribute to price differences. The next six questions reveal whether the company can support its promise:",
        ],
        bullets: [
          "Is the company licensed and insured for the work it performs?",
          "Do reviews mention communication, maintenance, and takedown—not only installation day?",
          "Who should the customer contact when part of the display goes dark?",
          "What weather or access conditions can move an appointment?",
          "Who owns the lights after payment?",
          "How does first-year, renewal, lease, or multi-year pricing change over time?",
        ],
      },
      {
        id: "ownership-models",
        heading: "Understand buying, leasing, and multi-year programs",
        paragraphs: [
          "Buying normally carries a higher first-year price but gives the customer ownership. Leasing reduces the upfront price but the company retains the lights. A multi-year program can exchange a longer commitment for discounted pricing.",
          "None of those models is automatically best. The important part is knowing what you own, what service is included, and what happens next season. Chestnut & Cheer publishes its [starting prices and yearly inclusions](/pricing) and describes the complete [residential installation process](/christmas-light-installation/residential).",
        ],
      },
    ],
    relatedSlugs: ["best-time-to-install-christmas-lights", "christmas-light-installation-mistakes", "professional-christmas-light-installation-guide"],
    serviceLinks: [
      { label: "Pricing and inclusions", href: "/pricing", description: "Review Chestnut & Cheer’s first-year and returning-customer structure." },
      { label: "About Chestnut & Cheer", href: "/about", description: "Meet the company behind the installation program." },
      { label: "Get an estimate", href: "/estimate", description: "Request a property-specific starting point." },
    ],
  },
  {
    slug: "best-time-to-install-christmas-lights",
    title: "When Is the Best Time to Install Christmas Lights in Utah?",
    shortTitle: "Best Time to Install Lights",
    description:
      "Plan a late-October or November Christmas light installation around design decisions, installer availability, roof conditions, weather, and your preferred turn-on date.",
    date: PUBLISHED,
    modified: PUBLISHED,
    readingMinutes: 4,
    tags: ["Planning", "Utah", "Installation"],
    keywords: ["best time to install Christmas lights", "when to book Christmas lights Utah", "Christmas light installation schedule"],
    eyebrow: "Plan before the roof is icy",
    heroImage: "/images/photos/professional/technician-preparing-ladder-for-installation.avif",
    heroAlt: "Christmas lighting technician preparing a ladder for a Utah installation",
    takeaways: [
      "Late October through November is the normal installation window.",
      "Reserve earlier if the home is tall, steep, complex, or in a snow-prone area.",
      "The installation date and the turn-on date do not have to be the same.",
      "Share the design, access, power, and approval constraints during quoting.",
    ],
    expertQuote:
      "The best time to install Christmas lights is generally late October through November.",
    sections: [
      {
        id: "installation-window",
        heading: "Late October through November balances access and display time",
        paragraphs: [
          "That window allows most homeowners to have the display tested and ready for the holiday season without leaving it exposed for unnecessary extra months. The exact week depends on how long the homeowner wants the lights displayed and when safe crew access is available.",
          "An early physical installation does not require an early celebration. A timer can keep the display off until the homeowner’s preferred start date.",
        ],
      },
      {
        id: "weather-and-capacity",
        heading: "Weather and route capacity remove flexibility quickly",
        paragraphs: [
          "Snow, ice, wind, steep driveways, shaded roofs, and foothill elevation can make a scheduled day unsafe. Earlier reservations give both the homeowner and installer more room to respond instead of forcing the work into the first usable gap after a storm.",
          "Availability matters too. A custom design still needs measuring, materials, strand preparation, installation, and testing. Begin the quote before the week you want the lights turned on.",
        ],
      },
      {
        id: "prepare-the-quote",
        heading: "Bring four decisions to the planning conversation",
        paragraphs: [
          "Share the preferred turn-on date, the street-facing features you want to emphasize, the color direction, and any known access, outlet, HOA, or property restrictions. A professional can handle the detailed measuring and connection plan around that vision.",
          "Use the [design guide](/blog/christmas-light-design-tips) to choose priorities, then review [what to ask an installer](/blog/how-to-choose-christmas-light-installer) before approving the scope.",
        ],
      },
    ],
    relatedSlugs: ["christmas-light-design-tips", "how-to-choose-christmas-light-installer", "how-long-do-christmas-lights-last"],
    serviceLinks: [
      { label: "Get an instant estimate", href: "/estimate", description: "Start planning before the seasonal calendar tightens." },
      { label: "Service areas", href: "/service-areas", description: "Check Chestnut & Cheer’s northern Utah and Wasatch Back coverage." },
    ],
  },
];

export function getPostBySlug(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug) ?? null;
}

export function getAllPosts() {
  return [...BLOG_POSTS].sort((a, b) => {
    if (a.hub) return -1;
    if (b.hub) return 1;
    return a.title.localeCompare(b.title);
  });
}

export function getRelatedPosts(post: BlogPost) {
  return post.relatedSlugs
    .map((slug) => getPostBySlug(slug))
    .filter((related): related is BlogPost => related !== null);
}

export function getArticleWordCount(post: BlogPost) {
  const text = [
    post.title,
    post.description,
    ...post.takeaways,
    post.expertQuote ?? "",
    ...post.sections.flatMap((section) => [
      section.heading,
      ...section.paragraphs,
      ...(section.bullets ?? []),
    ]),
  ].join(" ");

  return text.trim().split(/\s+/).filter(Boolean).length;
}

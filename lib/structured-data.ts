import {
  COMPANY,
  FAQS,
  SERVICES,
  ASSETS,
  LINKS,
  PRICING,
} from "@/lib/constants";
import {
  cityPagePath,
  countyPagePath,
  type CityPageData,
} from "@/lib/cities";
import { absoluteUrl, SITE_URL } from "@/lib/site";

const reviewRating = process.env.NEXT_PUBLIC_GOOGLE_REVIEW_RATING
  ? Number(process.env.NEXT_PUBLIC_GOOGLE_REVIEW_RATING)
  : null;
const reviewCount = process.env.NEXT_PUBLIC_GOOGLE_REVIEW_COUNT
  ? Number(process.env.NEXT_PUBLIC_GOOGLE_REVIEW_COUNT)
  : null;

export function getGoogleReviewsUrl(): string {
  return process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_URL?.trim() || LINKS.google;
}

export function hasVerifiedGoogleReviews(): boolean {
  return (
    reviewRating !== null &&
    reviewCount !== null &&
    reviewCount > 0 &&
    reviewRating >= 1 &&
    reviewRating <= 5
  );
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: COMPANY.name,
    legalName: COMPANY.legalEntity,
    description:
      "Premium temporary and permanent Christmas light installation for residential and commercial properties in Utah County and Salt Lake County.",
    url: SITE_URL,
    telephone: `+1${COMPANY.phoneDigits}`,
    email: COMPANY.email,
    image: absoluteUrl(ASSETS.photos.hero),
    logo: absoluteUrl(ASSETS.brand.logoPrimary),
    sameAs: [LINKS.google],
    areaServed: COMPANY.serviceAreas.map((area) => ({
      "@type": "AdministrativeArea" as const,
      name: area,
    })),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: `+1${COMPANY.phoneDigits}`,
      email: COMPANY.email,
      contactType: "sales and customer service",
      areaServed: "US-UT",
      availableLanguage: "English",
    },
    priceRange: "$$",
    knowsAbout: [
      "Christmas light installation",
      "Permanent holiday lighting",
      "Commercial holiday lighting",
    ],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "license",
      name: COMPANY.license,
    },
  };
}

/** Backwards-compatible name for callers while the site uses one Organization entity. */
export const getLocalBusinessSchema = getOrganizationSchema;

export function getBreadcrumbSchema(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function getServiceSchema({
  path,
  name,
  description,
  areaServed = COMPANY.serviceAreas,
}: {
  path: string;
  name: string;
  description: string;
  areaServed?: string | readonly string[] | Record<string, unknown>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#service`,
    name,
    description,
    url: absoluteUrl(path),
    serviceType: name,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed,
  };
}

export function getServicePageSchemas({
  path,
  name,
  description,
  breadcrumbs,
}: {
  path: string;
  name: string;
  description: string;
  breadcrumbs: { name: string; path: string }[];
}) {
  return [
    getServiceSchema({ path, name, description }),
    getBreadcrumbSchema(breadcrumbs),
  ];
}

export function getFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getServicesSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: SERVICES.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: COMPANY.serviceAreas,
        url: absoluteUrl(service.href),
      },
    })),
  };
}

export function getHomePageSchemas() {
  return [getOrganizationSchema(), getFaqSchema(), getServicesSchema()];
}

export function getCityPageSchemas(
  city: CityPageData,
  faqs: { question: string; answer: string }[],
) {
  const path = cityPagePath(city);
  const countyPath = countyPagePath(city.county);
  return [
    getBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Service Areas", path: "/service-areas" },
      { name: city.county, path: countyPath },
      { name: city.name, path },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${SITE_URL}${path}#service`,
      name: `Christmas Light Installation in ${city.name}, Utah`,
      description: `Professional temporary and permanent Christmas light installation serving ${city.name}, Utah.`,
      url: `${SITE_URL}${path}`,
      serviceType: "Christmas light installation",
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: {
        "@type": "City",
        name: city.name,
        containedInPlace: { "@type": "AdministrativeArea", name: city.county },
      },
      offers: {
        "@type": "Offer",
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: PRICING.yearOne.startsAt,
          priceCurrency: "USD",
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];
}

export function getGoogleReviewStats() {
  if (!hasVerifiedGoogleReviews()) return null;
  return {
    rating: reviewRating!,
    count: reviewCount!,
    url: getGoogleReviewsUrl(),
  };
}

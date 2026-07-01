import {
  COMPANY,
  FAQS,
  SERVICES,
  ASSETS,
} from "@/lib/constants";
import { absoluteUrl, SITE_URL } from "@/lib/site";

const reviewRating = process.env.NEXT_PUBLIC_GOOGLE_REVIEW_RATING
  ? Number(process.env.NEXT_PUBLIC_GOOGLE_REVIEW_RATING)
  : null;
const reviewCount = process.env.NEXT_PUBLIC_GOOGLE_REVIEW_COUNT
  ? Number(process.env.NEXT_PUBLIC_GOOGLE_REVIEW_COUNT)
  : null;

export function getGoogleReviewsUrl(): string {
  return (
    process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_URL ??
    "https://www.google.com/maps/search/?api=1&query=Chestnut+%26+Cheer+Orem+UT"
  );
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

export function getLocalBusinessSchema() {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${SITE_URL}/#business`,
    name: COMPANY.name,
    description:
      "Premium temporary and permanent Christmas light installation for residential and commercial properties in Utah County and Salt Lake County.",
    url: SITE_URL,
    telephone: `+1${COMPANY.phoneDigits}`,
    email: COMPANY.email,
    image: absoluteUrl(ASSETS.photos.hero),
    logo: absoluteUrl(ASSETS.brand.logoPrimary),
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.address.street,
      addressLocality: COMPANY.address.city,
      addressRegion: COMPANY.address.state,
      postalCode: COMPANY.address.zip,
      addressCountry: "US",
    },
    areaServed: COMPANY.serviceAreas.map((area) => ({
      "@type": "AdministrativeArea",
      name: area,
    })),
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

  if (hasVerifiedGoogleReviews()) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: reviewRating,
      reviewCount: reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return schema;
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
        provider: {
          "@type": "LocalBusiness",
          name: COMPANY.name,
          "@id": `${SITE_URL}/#business`,
        },
        areaServed: COMPANY.serviceAreas,
        url: `${SITE_URL}/#services`,
      },
    })),
  };
}

export function getHomePageSchemas() {
  return [getLocalBusinessSchema(), getFaqSchema(), getServicesSchema()];
}

export function getGoogleReviewStats() {
  if (!hasVerifiedGoogleReviews()) return null;
  return {
    rating: reviewRating!,
    count: reviewCount!,
    url: getGoogleReviewsUrl(),
  };
}

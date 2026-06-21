import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "./constants";
import type { Locale } from "./i18n/config";

interface PageSEO {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
}

export function createMetadata({
  title,
  description,
  path = "",
  image,
  type = "website",
}: PageSEO): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImage = image || `${SITE_URL}${DEFAULT_OG_IMAGE}`;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      locale: path.startsWith("/vi") ? "vi_VN" : "en_US",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

function siteUrl(path = "") {
  if (!path) return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function localizedUrl(locale: Locale | undefined, path = "") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (!locale) return siteUrl(normalized);
  return siteUrl(`/${locale}${normalized === "/" ? "" : normalized}`);
}

export function hotelSchema(locale?: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: SITE_NAME,
    description:
      "Family-run hospitality in Phong Nha, Vietnam. Stay, eat, explore and connect.",
    url: localizedUrl(locale, "/"),
    telephone: "+84901234567",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Phong Nha",
      addressRegion: "Quang Binh",
      addressCountry: "VN",
    },
    priceRange: "$$",
    starRating: { "@type": "Rating", ratingValue: "4.8" },
  };
}

export function restaurantSchema(locale?: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Cozy Cafe Rooftop at Green Riverside",
    description: "Rooftop café with Vietnamese cuisine, coffee, and cocktails.",
    url: localizedUrl(locale, "/eat-drink"),
    servesCuisine: ["Vietnamese", "International"],
    priceRange: "$$",
  };
}

export function tourSchema(tour: {
  title?: string;
  name?: string;
  description: string;
  price?: number;
  priceFrom?: number;
  duration: string;
  slug: string;
}, locale?: Locale) {
  const name = tour.title || tour.name || "";
  const price = tour.price ?? tour.priceFrom ?? 0;
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name,
    description: tour.description,
    url: localizedUrl(locale, `/tours/${tour.slug}`),
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: "USD",
    },
    itinerary: { "@type": "ItemList", name: tour.duration },
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function blogPostSchema(post: {
  title: string;
  excerpt: string;
  slug: string;
  featuredImage?: string;
  coverImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  author: string;
  publishedAt: string;
}, locale?: Locale) {
  const image = post.featuredImage || post.coverImage || "";
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    url: localizedUrl(locale, `/blog/${post.slug}`),
    image,
    author: { "@type": "Person", name: post.author },
    datePublished: post.publishedAt,
    publisher: { "@type": "Organization", name: SITE_NAME },
  };
}

export function faqSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

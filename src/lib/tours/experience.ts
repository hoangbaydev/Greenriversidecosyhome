import type { Tour, TourTimelineItem } from "@/types";
import { getTourPrice, getTourTitle } from "@/types";
import { withSampleTourImages, SAMPLE_TOUR } from "@/lib/sample-media";

export interface TourDetailLabels {
  experienceLabel: string;
  duration: string;
  departure: string;
  return: string;
  price: string;
  from: string;
  bookWhatsApp: string;
  viewItinerary: string;
  highlightsTitle: string;
  overviewTitle: string;
  timelineTitle: string;
  galleryTitle: string;
  includedTitle: string;
  excludedTitle: string;
  whatToBringTitle: string;
  pricingTitle: string;
  reserveWhatsApp: string;
  childDiscount: string;
  childDiscountDefault: string;
  packageTitle: string;
  faqTitle: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButton: string;
  approxUsd: string;
}

export interface TourHighlightItem {
  icon: string;
  label: string;
}

export interface TourExperienceView {
  title: string;
  heroLabel: string;
  description: string;
  duration: string;
  departure: string;
  returnTime: string;
  price: number;
  currency: string;
  priceUsdApprox?: number;
  heroImage?: string;
  highlights: TourHighlightItem[];
  overviewHeading: string;
  overviewText: string;
  overviewImage?: string;
  timeline: TourTimelineItem[];
  galleryImages: string[];
  included: string[];
  excluded: string[];
  whatToBring: string[];
  childDiscountNote?: string;
  faq: { question: string; answer: string }[];
  ctaHeading: string;
  ctaSubheading: string;
  ctaImage?: string;
}

const HIGHLIGHT_ICONS: [RegExp, string][] = [
  [/garden|botanic|jungle|forest|leaf/i, "leaf"],
  [/cave|hang|grotto|mountain|paradise|phong nha/i, "mountain"],
  [/boat|river|son|cruise|kayak|water/i, "ship"],
  [/lunch|dinner|food|meal|vietnamese|eat/i, "utensils"],
  [/shuttle|bus|transport|pick|transfer/i, "bus"],
  [/duck|stop|local/i, "map-pin"],
  [/guide|english|speaking/i, "users"],
  [/insurance|safe/i, "shield"],
  [/photo|camera|view/i, "camera"],
];

const TIMELINE_ICONS = [
  "map-pin",
  "leaf",
  "mountain",
  "utensils",
  "ship",
  "mountain",
  "map-pin",
  "home",
] as const;

function inferHighlightIcon(label: string): string {
  for (const [pattern, icon] of HIGHLIGHT_ICONS) {
    if (pattern.test(label)) return icon;
  }
  return "sparkles";
}

function truncateWords(text: string, maxWords: number): string {
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text.trim();
  return `${words.slice(0, maxWords).join(" ")}…`;
}

const DEMO_HIGHLIGHTS = [
  "Explore Botanic Garden",
  "Visit Paradise Cave",
  "Boat Trip on Son River",
  "Explore Phong Nha Cave",
  "Local Vietnamese Lunch",
  "Free Shuttle to Duck Stop",
];

const DEMO_TIMELINE: TourTimelineItem[] = [
  { time: "08:30", title: "Pick up at Green Riverside", icon: "map-pin" },
  { time: "09:00", title: "Explore Botanic Garden", icon: "leaf" },
  { time: "11:00", title: "Visit Paradise Cave", icon: "mountain" },
  { time: "12:30", title: "Traditional Vietnamese Lunch", icon: "utensils" },
  { time: "14:00", title: "Boat Trip on Son River", icon: "ship" },
  { time: "15:00", title: "Explore Phong Nha Cave", icon: "mountain" },
  { time: "16:30", title: "Duck Stop Experience", icon: "map-pin" },
  { time: "19:00", title: "Return to Accommodation", icon: "home" },
];

const DEMO_INCLUDED = [
  "Transport",
  "English Speaking Guide",
  "Entrance Fees",
  "Boat",
  "Golf Cart",
  "Lunch",
  "Water",
  "Insurance",
];

const DEMO_EXCLUDED = ["Personal Expenses", "Tips", "Duck Stop Entrance Fee"];

const DEMO_BRING = [
  "Walking Shoes",
  "Sunglasses",
  "Sunscreen",
  "Camera",
  "Light Backpack",
  "Water Bottle",
];

const DEMO_FAQ = [
  { question: "What should I wear?", answer: "Comfortable clothing and walking shoes." },
  { question: "Is lunch included?", answer: "Yes." },
  { question: "Can vegetarians join?", answer: "Yes." },
  { question: "Do I need experience?", answer: "No." },
  { question: "Is transportation included?", answer: "Yes." },
];

function mergeTourDemo(tour: Tour): Tour {
  return {
    ...tour,
    highlights: tour.highlights?.length ? tour.highlights : DEMO_HIGHLIGHTS,
    timeline: tour.timeline?.length ? tour.timeline : DEMO_TIMELINE,
    included: tour.included?.length ? tour.included : DEMO_INCLUDED,
    excluded: tour.excluded?.length ? tour.excluded : DEMO_EXCLUDED,
    whatToBring: tour.whatToBring?.length ? tour.whatToBring : DEMO_BRING,
    faq: tour.faq?.length ? tour.faq : DEMO_FAQ,
    childDiscountNote: tour.childDiscountNote || "50% Discount",
    departure: tour.departure || "8:30 AM",
    returnTime: tour.returnTime || "7:00 PM",
    priceUsdApprox: tour.priceUsdApprox ?? (tour.currency === "VND" ? 55 : undefined),
  };
}

export function buildTourExperience(tour: Tour, labels: TourDetailLabels): TourExperienceView {
  const merged = mergeTourDemo(tour);
  const title = getTourTitle(merged);
  const price = getTourPrice(merged);
  const { hero: heroImage, gallery: galleryPoolRaw } = withSampleTourImages(
    merged.images ?? [],
    merged.galleryImages
  );
  const galleryPool = galleryPoolRaw.filter((url) => url !== heroImage);

  const overviewSource =
    merged.overviewText?.trim() ||
    merged.shortDescription?.trim() ||
    merged.description?.trim() ||
    "";

  return {
    title,
    heroLabel: merged.heroLabel?.trim() || labels.experienceLabel,
    description: merged.shortDescription?.trim() || truncateWords(merged.description, 30),
    duration: merged.duration?.trim() || "Full Day",
    departure: merged.departure?.trim() || "8:30 AM",
    returnTime: merged.returnTime?.trim() || "7:00 PM",
    price,
    currency: merged.currency || "VND",
    priceUsdApprox: merged.priceUsdApprox,
    heroImage,
    highlights: (merged.highlights ?? []).map((label) => ({
      icon: inferHighlightIcon(label),
      label,
    })),
    overviewHeading: merged.overviewHeading?.trim() || labels.overviewTitle,
    overviewText: truncateWords(overviewSource, 120),
    overviewImage: merged.overviewImage || merged.images[1] || SAMPLE_TOUR.overview || heroImage,
    timeline: (merged.timeline ?? []).map((item, index) => ({
      ...item,
      icon: item.icon || TIMELINE_ICONS[index % TIMELINE_ICONS.length],
    })),
    galleryImages: galleryPool.length >= 4 ? galleryPool : [...SAMPLE_TOUR.gallery],
    included: merged.included ?? [],
    excluded: merged.excluded ?? [],
    whatToBring: merged.whatToBring ?? [],
    childDiscountNote: merged.childDiscountNote,
    faq: merged.faq ?? [],
    ctaHeading: merged.ctaHeading?.trim() || labels.ctaTitle,
    ctaSubheading: merged.ctaSubheading?.trim() || labels.ctaSubtitle,
    ctaImage: merged.ctaImage || heroImage || SAMPLE_TOUR.cta,
  };
}

export function approxUsdLabel(price: number, currency: string, usdApprox?: number, template?: string): string | null {
  if (usdApprox && usdApprox > 0 && template) {
    return template.replace("{amount}", String(usdApprox));
  }
  if (currency === "VND" && price > 0 && template) {
    const approx = Math.round(price / 23500);
    return template.replace("{amount}", String(approx));
  }
  return null;
}

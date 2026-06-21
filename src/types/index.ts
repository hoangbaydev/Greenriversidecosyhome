import type { Timestamp } from "firebase/firestore";

export type FirestoreTimestamp = Timestamp | Date | string;
export type ContentStatus = "draft" | "published";

export interface User {
  id: string;
  email: string;
  displayName: string;
  role: "admin" | "editor";
  createdAt: FirestoreTimestamp;
}

export interface Room {
  id: string;
  slug: string;
  title: string;
  name?: string;
  category: string;
  description: string;
  shortDescription: string;
  amenities: string[];
  capacity: number;
  occupancy?: number;
  price: number;
  priceFrom?: number;
  currency: string;
  images: string[];
  featured: boolean;
  order: number;
  published: boolean;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
}

export interface TourTimelineItem {
  time: string;
  title: string;
  description?: string;
  icon?: string;
}

export interface TourFaqItem {
  question: string;
  answer: string;
}

export interface Tour {
  id: string;
  slug: string;
  title: string;
  name?: string;
  description: string;
  shortDescription: string;
  duration: string;
  price: number;
  priceFrom?: number;
  currency: string;
  highlights: string[];
  images: string[];
  featured: boolean;
  order: number;
  published: boolean;
  /** Experience page — hero */
  heroLabel?: string;
  departure?: string;
  returnTime?: string;
  priceUsdApprox?: number;
  /** Experience page — overview */
  overviewHeading?: string;
  overviewText?: string;
  overviewImage?: string;
  /** Experience page — structured content */
  timeline?: TourTimelineItem[];
  included?: string[];
  excluded?: string[];
  whatToBring?: string[];
  faq?: TourFaqItem[];
  childDiscountNote?: string;
  galleryImages?: string[];
  /** Experience page — final CTA */
  ctaHeading?: string;
  ctaSubheading?: string;
  ctaImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
}

export interface Activity {
  id: string;
  title: string;
  name?: string;
  description: string;
  dayOfWeek: string;
  time: string;
  icon: string;
  images: string[];
  featured: boolean;
  order: number;
  createdAt?: FirestoreTimestamp;
  updatedAt?: FirestoreTimestamp;
}

export interface Transportation {
  id: string;
  slug: string;
  title: string;
  name?: string;
  description: string;
  shortDescription: string;
  price: number;
  priceFrom?: number;
  route: string;
  currency: string;
  icon: string;
  featured: boolean;
  order: number;
  published: boolean;
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  imageUrl: string;
  thumbnailUrl?: string;
  order: number;
  featured: boolean;
  createdAt?: FirestoreTimestamp;
}

export type GalleryCategory =
  | "rooms"
  | "cafe"
  | "food"
  | "tours"
  | "activities"
  | "nature"
  | "sunset"
  | "community";

export interface Review {
  id: string;
  author: string;
  rating: number;
  content: string;
  source: "google" | "tripadvisor";
  country?: string;
  date: string;
  avatarUrl?: string;
  featured: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  coverImage?: string;
  category: string;
  tags: string[];
  author: string;
  seoTitle: string;
  seoDescription: string;
  status: ContentStatus;
  published: boolean;
  publishedAt: string;
  featured: boolean;
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
}

export interface HomepageSectionHeading {
  title: string;
  subtitle?: string;
  ctaLabel?: string;
}

export interface HomepageContent {
  id?: string;
  heroTitle: string;
  heroSubtitle: string;
  heroHeadline?: string;
  heroSubheadline?: string;
  heroImage: string;
  heroVideo?: string;
  primaryCtaLabel: string;
  primaryCtaMessageType: string;
  secondaryCtaLabel: string;
  secondaryCtaLink: string;
  whyChooseTitle: string;
  whyChooseSubtitle?: string;
  whyChooseItems: WhyChooseItem[];
  featuredRoomIds: string[];
  featuredTourIds: string[];
  finalCtaTitle: string;
  finalCtaSubtitle: string;
  heroEyebrow?: string;
  heroPillars?: string[];
  heroScrollHint?: string;
  /** Section headings for homepage blocks — all editable in Admin */
  sections?: {
    story?: HomepageSectionHeading;
    accommodation?: HomepageSectionHeading;
    tours?: HomepageSectionHeading;
    cafe?: HomepageSectionHeading;
    activities?: HomepageSectionHeading;
    reviews?: HomepageSectionHeading;
    gallery?: HomepageSectionHeading;
    blog?: HomepageSectionHeading;
    contact?: HomepageSectionHeading;
  };
  updatedAt?: FirestoreTimestamp;
}

export interface WhyChooseItem {
  title: string;
  description: string;
  icon: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  logoUrl?: string;
  whatsappNumber: string;
  phone: string;
  email: string;
  address: string;
  googleMapsUrl: string;
  bookNowLabel?: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    youtube?: string;
    tripadvisor?: string;
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    ogImage: string;
  };
  updatedAt?: FirestoreTimestamp;
}

export interface ContactInformation {
  phone: string;
  email: string;
  address: string;
  whatsapp: string;
  googleMapsEmbed: string;
  googleMapsUrl: string;
  openingHours: string;
}

export interface StoryContent {
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: string;
  homepagePreviewTitle?: string;
  homepagePreviewSubtitle?: string;
  homepagePreviewExcerpt?: string;
  homepagePreviewImage?: string;
  homepagePreviewCta?: string;
  sectionTitles?: {
    founderStory?: string;
    familyJourney?: string;
    philosophy?: string;
    natureFamilyCommunity?: string;
    lifeAtGreenRiverside?: string;
    timeline?: string;
  };
  founderStory: string;
  familyJourney: string;
  philosophy: string;
  natureFamilyCommunity: string;
  lifeAtGreenRiverside: string;
  timeline: TimelineEvent[];
}

export interface FaqItem {
  question: string;
  answer: string;
  order: number;
}

export interface Faq {
  id: string;
  locale: string;
  question: string;
  answer: string;
  order: number;
  published: boolean;
  createdAt?: FirestoreTimestamp;
  updatedAt?: FirestoreTimestamp;
}

export interface FaqContent {
  title: string;
  subtitle?: string;
  items: FaqItem[];
}

export type PageKey =
  | "stay"
  | "tours"
  | "our-story"
  | "eat-drink"
  | "transportation"
  | "social-activities"
  | "gallery"
  | "blog"
  | "contact";

export interface PageLabels {
  getInTouch?: string;
  phone?: string;
  email?: string;
  address?: string;
  hours?: string;
  mapTitle?: string;
  mapDirections?: string;
  viewOnMap?: string;
  priceFrom?: string;
  perNight?: string;
  viewDetails?: string;
  viewAll?: string;
  amenities?: string;
  guests?: string;
  upToGuests?: string;
  startingFrom?: string;
  bookRoom?: string;
  highlights?: string;
  bookTour?: string;
  searchPlaceholder?: string;
  noResults?: string;
  loadMore?: string;
  allCategory?: string;
  filterByCategory?: string;
  scheduleTitle?: string;
  scheduleSubtitle?: string;
  communityTitle?: string;
}

export interface PageContent {
  pageKey: PageKey;
  locale: string;
  heroTitle: string;
  heroSubtitle?: string;
  heroImage?: string;
  intro?: string;
  metaTitle?: string;
  metaDescription?: string;
  ctaLabel?: string;
  secondaryCtaLabel?: string;
  labels?: PageLabels;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface CafeContent {
  title: string;
  subtitle: string;
  description: string;
  reserveCtaLabel?: string;
  features: { title: string; description: string; icon: string }[];
  menuCategories: { name: string; items: string[] }[];
  images: string[];
}

export function getRoomTitle(room: Room): string {
  return room.title || room.name || "";
}

export function getRoomPrice(room: Room): number {
  return room.price ?? room.priceFrom ?? 0;
}

export function getRoomCapacity(room: Room): number {
  return room.capacity ?? room.occupancy ?? 0;
}

export function getTourTitle(tour: Tour): string {
  return tour.title || tour.name || "";
}

export function getTourPrice(tour: Tour): number {
  return tour.price ?? tour.priceFrom ?? 0;
}

export function getBlogImage(post: BlogPost): string {
  return post.featuredImage || post.coverImage || "";
}

export function normalizeHomepage(content: HomepageContent): HomepageContent {
  return {
    ...content,
    heroTitle: content.heroTitle || content.heroHeadline || "",
    heroSubtitle: content.heroSubtitle || content.heroSubheadline || "",
    primaryCtaLabel: content.primaryCtaLabel || "",
    primaryCtaMessageType: content.primaryCtaMessageType || "book_room",
    secondaryCtaLabel: content.secondaryCtaLabel || "",
    secondaryCtaLink: content.secondaryCtaLink || "",
    featuredRoomIds: content.featuredRoomIds || [],
    featuredTourIds: content.featuredTourIds || [],
    whyChooseItems: content.whyChooseItems || [],
    whyChooseSubtitle: content.whyChooseSubtitle || "",
    sections: content.sections || {},
    heroPillars: content.heroPillars || [],
  };
}

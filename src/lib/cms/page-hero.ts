export interface PageHeroProps {
  title: string;
  subtitle?: string;
  image?: string;
}

export function resolvePageHero(
  cms: { heroTitle?: string; heroSubtitle?: string; heroImage?: string } | null | undefined,
  fallback: PageHeroProps
): PageHeroProps {
  return {
    title: cms?.heroTitle?.trim() || fallback.title,
    subtitle: cms?.heroSubtitle?.trim() || fallback.subtitle,
    image: cms?.heroImage?.trim() || fallback.image,
  };
}

"use client";

import type { ElementType } from "react";
import {
  Utensils,
  Wine,
  ChefHat,
  Gamepad2,
  Brain,
  Music,
  Mic,
  Languages,
  Sparkles,
} from "lucide-react";
import type { Activity } from "@/types";
import { useLocale } from "@/components/providers/I18nProvider";
import { localizedPath } from "@/lib/i18n/config";
import { HomeSection } from "@/components/ui/home-section";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionLink } from "@/components/ui/section-link";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { MotionStagger, MotionItem } from "@/components/motion";
import { SAMPLE_ACTIVITY_IMAGES } from "@/lib/sample-media";

const iconMap: Record<string, ElementType> = {
  utensils: Utensils,
  wine: Wine,
  "chef-hat": ChefHat,
  gamepad: Gamepad2,
  brain: Brain,
  music: Music,
  mic: Mic,
  languages: Languages,
};

function ActivityCard({ activity, index }: { activity: Activity; index: number }) {
  const Icon = iconMap[activity.icon] || Sparkles;
  const image = activity.images?.[0] || SAMPLE_ACTIVITY_IMAGES[index % SAMPLE_ACTIVITY_IMAGES.length];

  return (
    <MotionItem>
      <article className="card-premium card-premium--interactive flex h-full flex-col overflow-hidden">
        {image ? (
          <div className="relative aspect-[16/10] overflow-hidden bg-soft">
            <OptimizedImage
              src={image}
              alt={activity.title}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="img-hover object-cover"
            />
          </div>
        ) : (
          <div className="flex aspect-[16/10] items-center justify-center bg-soft">
            <Icon className="h-10 w-10 text-primary/40" aria-hidden />
          </div>
        )}
        <div className="flex flex-1 flex-col p-5 md:p-6">
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-soft">
              <Icon className="h-4 w-4 text-primary" aria-hidden />
            </span>
            {activity.time ? (
              <span className="text-xs font-medium uppercase tracking-wide text-text-muted">
                {activity.dayOfWeek} · {activity.time}
              </span>
            ) : null}
          </div>
          <h3 className="text-h4 text-text">{activity.title}</h3>
          {activity.description ? (
            <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-text-muted">
              {activity.description}
            </p>
          ) : null}
        </div>
      </article>
    </MotionItem>
  );
}

export function SocialActivitiesShowcase({
  activities,
  title,
  subtitle,
  viewAllLabel,
}: {
  activities: Activity[];
  title?: string;
  subtitle?: string;
  joinLabel?: string;
  viewAllLabel?: string;
}) {
  const locale = useLocale();

  if (!title && !activities.length) return null;

  const featured = activities.filter((a) => a.featured).slice(0, 4);
  const display = featured.length > 0 ? featured : activities.slice(0, 4);

  return (
    <HomeSection id="activities" background="soft" divider>
      {title ? <SectionHeader eyebrow="Connect" title={title} subtitle={subtitle} /> : null}

      {display.length > 0 ? (
        <MotionStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {display.map((activity, index) => (
            <ActivityCard key={activity.id} activity={activity} index={index} />
          ))}
        </MotionStagger>
      ) : null}

      {viewAllLabel ? (
        <p className="mt-12 text-center">
          <SectionLink href={localizedPath(locale, "/social-activities")}>
            {viewAllLabel}
          </SectionLink>
        </p>
      ) : null}
    </HomeSection>
  );
}

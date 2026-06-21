"use client";

import {
  Utensils,
  Wine,
  ChefHat,
  Gamepad2,
  Brain,
  Music,
  Mic,
  Languages,
} from "lucide-react";
import type { Activity } from "@/types";
import { WEEK_DAYS } from "@/lib/constants";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";

const iconMap: Record<string, React.ElementType> = {
  utensils: Utensils,
  wine: Wine,
  "chef-hat": ChefHat,
  gamepad: Gamepad2,
  brain: Brain,
  music: Music,
  mic: Mic,
  languages: Languages,
};

export function WeeklySchedule({
  activities,
  embedded = false,
  title,
  subtitle,
  joinLabel,
}: {
  activities: Activity[];
  embedded?: boolean;
  title?: string;
  subtitle?: string;
  joinLabel?: string;
}) {
  const scheduleByDay = WEEK_DAYS.map((day) => ({
    day,
    activities: activities.filter((a) => a.dayOfWeek === day),
  }));

  const grid = (
    <div className="overflow-x-auto pb-2">
      <div className="grid min-w-[640px] gap-3 sm:grid-cols-3 md:min-w-0 md:grid-cols-7">
        {scheduleByDay.map(({ day, activities: dayActivities }) => (
          <div
            key={day}
            className="rounded-[var(--radius-card)] border border-border bg-white p-4"
          >
            <h3 className="mb-3 text-center text-xs font-semibold uppercase tracking-wide text-primary">
              {day.slice(0, 3)}
            </h3>
            {dayActivities.length === 0 ? (
              <p className="text-center text-xs text-text-muted">—</p>
            ) : (
              dayActivities.map((activity) => {
                const Icon = iconMap[activity.icon] || Utensils;
                return (
                  <div key={activity.id} className="mb-3 last:mb-0">
                    <div className="flex items-start gap-2">
                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                      <span className="text-sm font-medium leading-snug text-text">
                        {activity.title || activity.name}
                      </span>
                    </div>
                    {activity.time ? (
                      <p className="mt-1 pl-6 text-xs text-text-muted">{activity.time}</p>
                    ) : null}
                  </div>
                );
              })
            )}
          </div>
        ))}
      </div>
    </div>
  );

  if (embedded) {
    return (
      <div>
        <h3 className="font-heading text-h2 text-text">Weekly Schedule</h3>
        <p className="mt-2 max-w-[52ch] text-sm text-text-muted">
          Join our community events throughout the week — free for guests.
        </p>
        <div className="mt-8">{grid}</div>
      </div>
    );
  }

  return (
    <section className="section-breathe bg-white">
      <Container>
        {title ? <SectionHeader title={title} subtitle={subtitle} /> : null}
        {grid}
        {joinLabel ? (
          <div className="mt-12 text-center">
            <WhatsAppButton messageType="join_activity" label={joinLabel} size="lg" className="rounded-full px-10" />
          </div>
        ) : null}
      </Container>
    </section>
  );
}

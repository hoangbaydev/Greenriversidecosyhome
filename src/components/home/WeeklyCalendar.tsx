"use client";

import { motion } from "framer-motion";
import { getWeeklySchedule } from "@/lib/content/brand";
import { useLocale } from "@/components/providers/I18nProvider";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { fadeUp, staggerContainer, defaultTransition, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function WeeklyCalendar({
  title,
  subtitle,
  joinLabel,
}: {
  title?: string;
  subtitle?: string;
  joinLabel?: string;
}) {
  const locale = useLocale();
  const schedule = getWeeklySchedule(locale);

  return (
    <section className="section-breathe bg-white">
      <Container>
        {title ? (
          <SectionHeader title={title} subtitle={subtitle} />
        ) : null}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7"
        >
          {schedule.map((day, index) => {
            const isWeekend = index >= 5;
            return (
              <motion.article
                key={day.day}
                variants={fadeUp}
                transition={{ ...defaultTransition, delay: index * 0.05 }}
                className={cn(
                  "calendar-day-card flex flex-col",
                  isWeekend && "calendar-day-card--weekend"
                )}
              >
                <h3 className="font-heading text-sm font-semibold text-primary">{day.day}</h3>
                <ul className="mt-3 flex flex-1 flex-col gap-2">
                  {day.activities.map((activity) => (
                    <li key={activity} className="calendar-activity">
                      {activity}
                    </li>
                  ))}
                </ul>
                {day.note ? (
                  <p className="mt-3 text-xs leading-relaxed text-text-muted">{day.note}</p>
                ) : null}
              </motion.article>
            );
          })}
        </motion.div>
        {joinLabel ? (
          <div className="mt-12 text-center">
            <WhatsAppButton
              messageType="join_activity"
              label={joinLabel}
              size="lg"
              className="min-h-12 rounded-lg px-10 text-sm font-semibold shadow-sm"
            />
          </div>
        ) : null}
      </Container>
    </section>
  );
}

"use client";

import { adminLocales, type AdminLocale } from "@/lib/i18n/admin-dictionary";
import { useAdminI18n } from "@/components/admin/AdminI18nProvider";
import { cn } from "@/lib/utils";

export function AdminLanguageSwitcher({
  className,
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  const { locale, setLocale, dict } = useAdminI18n();

  return (
    <div
      className={cn(
        "flex items-center gap-0.5 rounded-full border p-1",
        inverted
          ? "border-white/20 bg-white/10"
          : "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800",
        className
      )}
      role="group"
      aria-label={dict?.layout.language ?? "Language"}
    >
      {adminLocales.map((loc) => {
        const isActive = loc === locale;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => setLocale(loc as AdminLocale)}
            className={cn(
              "min-h-9 min-w-9 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              isActive
                ? inverted
                  ? "bg-white text-primary"
                  : "bg-primary text-white"
                : inverted
                  ? "text-white/80 hover:bg-white/10"
                  : "text-gray-600 hover:bg-white dark:text-gray-300 dark:hover:bg-gray-700"
            )}
            aria-current={isActive ? "true" : undefined}
            lang={loc}
          >
            {loc}
          </button>
        );
      })}
    </div>
  );
}

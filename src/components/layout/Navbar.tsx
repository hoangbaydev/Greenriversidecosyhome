"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { useDictionary, useLocale } from "@/components/providers/I18nProvider";
import { useSiteData } from "@/components/providers/SiteDataProvider";
import { localizedPath, stripLocale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { SiteBrand } from "@/components/layout/SiteBrand";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";

type NavItemLink = {
  href: string;
  key: string;
  label: string;
};

function isNavActive(path: string, href: string) {
  return path === href || (href !== "/" && path.startsWith(href));
}

function navLinkClass(active: boolean) {
  return cn(
    "inline-flex min-h-9 items-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer",
    active
      ? "bg-soft text-primary font-semibold"
      : "text-[var(--color-body)] hover:bg-soft/70 hover:text-primary"
  );
}

export function Navbar() {
  const pathname = usePathname();
  const locale = useLocale();
  const dict = useDictionary();
  const { settings } = useSiteData();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  // Mobile accordion states
  const [mobileExploreOpen, setMobileExploreOpen] = useState(false);

  const siteName = settings?.siteName || dict.meta.siteName;
  const tagline = settings?.tagline || dict.meta.tagline;
  const bookNowLabel = dict.nav.bookNow;
  const pathWithoutLocale = stripLocale(pathname);
  const isHome = pathWithoutLocale === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    queueMicrotask(() => {
      setMobileOpen(false);
    });
  }, [pathname]);

  const exploreItems: NavItemLink[] = [
    { href: "/explore-phong-nha", key: "explorePhongNha", label: dict.nav.explorePhongNha },
    { href: "/tours", key: "tours", label: dict.nav.tours },
    { href: "/social-activities", key: "socialActivities", label: dict.nav.socialActivities },
  ];

  return (
    <>
      <a href="#main-content" className="skip-link">
        {dict.common.skipToContent}
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b bg-white/90 backdrop-blur-md transition-all duration-300",
          scrolled ? "border-border/60 shadow-[var(--shadow-sm)]" : "border-transparent"
        )}
      >
        <div className="mx-auto flex h-[4rem] max-w-[92rem] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 2xl:px-12">
          <SiteBrand
            siteName={siteName}
            tagline={tagline}
            logoUrl={settings?.logoUrl}
            locale={locale}
            className="min-w-0 shrink-0"
          />

          <nav
            className="hidden items-center gap-0.5 lg:flex"
            aria-label="Main navigation"
          >
            {/* 1. Our Story */}
            <Link
              href={localizedPath(locale, "/our-story")}
              className={navLinkClass(isNavActive(pathWithoutLocale, "/our-story"))}
            >
              {dict.nav.ourStory}
            </Link>

            {/* 2. Stay */}
            <Link
              href={localizedPath(locale, "/stay")}
              className={navLinkClass(isNavActive(pathWithoutLocale, "/stay"))}
            >
              {dict.nav.stay}
            </Link>

            {/* 3. Eat & Drink */}
            <Link
              href={localizedPath(locale, "/eat-drink")}
              className={navLinkClass(isNavActive(pathWithoutLocale, "/eat-drink"))}
            >
              {dict.nav.eatDrink}
            </Link>

            {/* 4. Explore Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown("explore")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                type="button"
                className={cn(
                  navLinkClass(exploreItems.some(i => isNavActive(pathWithoutLocale, i.href))),
                  "flex items-center gap-1 cursor-pointer"
                )}
                aria-expanded={openDropdown === "explore"}
                aria-haspopup="true"
              >
                {dict.nav.explore}
                <ChevronDown className={cn("h-4 w-4 opacity-60 transition-transform duration-300", openDropdown === "explore" && "rotate-180")} />
              </button>
              <AnimatePresence>
                {openDropdown === "explore" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
                    className="absolute top-full left-1/2 z-50 mt-1 w-56 -translate-x-1/2 border border-border bg-white p-2.5 shadow-[0_15px_30px_rgba(0,0,0,0.06)]"
                    style={{ borderRadius: "var(--radius-card, 0px)" }}
                  >
                    {exploreItems.map((sub) => {
                      const href = localizedPath(locale, sub.href);
                      const active = isNavActive(pathWithoutLocale, sub.href);
                      return (
                        <Link
                          key={sub.key}
                          href={href}
                          className={cn(
                            "block px-3.5 py-2.5 text-[14px] font-semibold tracking-[0.02em] transition-colors",
                            active
                              ? "bg-soft text-primary"
                              : "text-[var(--color-body)] hover:bg-soft/60 hover:text-primary"
                          )}
                        >
                          {sub.label}
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 5. Contact */}
            <Link
              href={localizedPath(locale, "/contact")}
              className={navLinkClass(isNavActive(pathWithoutLocale, "/contact"))}
            >
              {dict.nav.contact}
            </Link>
          </nav>

          <div className="flex shrink-0 items-center gap-3 md:gap-4">
            <LanguageSwitcher variant="minimal" className="hidden sm:flex" />
            <WhatsAppButton
              messageType="book_room"
              label={bookNowLabel}
              size="sm"
              showIcon={false}
              className="hidden lg:inline-flex"
            />
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-text hover:bg-soft lg:hidden"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? dict.nav.closeMenu : dict.nav.menu}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20 lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed inset-y-0 right-0 z-50 flex w-[min(100%,18rem)] flex-col border-l border-border bg-white shadow-xl lg:hidden"
              aria-label="Mobile navigation"
            >
              <div className="flex h-[4rem] items-center justify-between border-b border-border px-4">
                <SiteBrand
                  siteName={siteName}
                  tagline={tagline}
                  logoUrl={settings?.logoUrl}
                  locale={locale}
                  size="compact"
                  showName={false}
                />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-soft"
                  aria-label={dict.nav.closeMenu}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <ul className="space-y-1">
                  {/* 1. Our Story */}
                  <li>
                    <Link
                      href={localizedPath(locale, "/our-story")}
                      className={cn(
                        "flex min-h-10 items-center rounded-md px-3 text-[14px] font-semibold uppercase tracking-[0.04em]",
                        isNavActive(pathWithoutLocale, "/our-story") ? "bg-soft text-primary" : "text-[var(--color-body)] hover:bg-soft/80"
                      )}
                      onClick={() => setMobileOpen(false)}
                    >
                      {dict.nav.ourStory}
                    </Link>
                  </li>

                  {/* 2. Stay */}
                  <li>
                    <Link
                      href={localizedPath(locale, "/stay")}
                      className={cn(
                        "flex min-h-10 items-center rounded-md px-3 text-[14px] font-semibold uppercase tracking-[0.04em]",
                        isNavActive(pathWithoutLocale, "/stay") ? "bg-soft text-primary" : "text-[var(--color-body)] hover:bg-soft/80"
                      )}
                      onClick={() => setMobileOpen(false)}
                    >
                      {dict.nav.stay}
                    </Link>
                  </li>

                  {/* 3. Eat & Drink */}
                  <li>
                    <Link
                      href={localizedPath(locale, "/eat-drink")}
                      className={cn(
                        "flex min-h-10 items-center rounded-md px-3 text-[14px] font-semibold uppercase tracking-[0.04em]",
                        isNavActive(pathWithoutLocale, "/eat-drink") ? "bg-soft text-primary" : "text-[var(--color-body)] hover:bg-soft/80"
                      )}
                      onClick={() => setMobileOpen(false)}
                    >
                      {dict.nav.eatDrink}
                    </Link>
                  </li>

                  {/* 4. Explore Accordion */}
                  <li>
                    <button
                      type="button"
                      onClick={() => setMobileExploreOpen((o) => !o)}
                      className={cn(
                        "flex w-full min-h-10 items-center justify-between rounded-md px-3 text-[14px] font-semibold uppercase tracking-[0.04em] text-[var(--color-body)] hover:bg-soft/80",
                        exploreItems.some(i => isNavActive(pathWithoutLocale, i.href)) && "text-primary"
                      )}
                    >
                      {dict.nav.explore}
                      <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", mobileExploreOpen && "rotate-180")} />
                    </button>
                    <AnimatePresence initial={false}>
                      {mobileExploreOpen && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="pl-4 mt-1 space-y-1 overflow-hidden"
                        >
                          {exploreItems.map((sub) => {
                            const href = localizedPath(locale, sub.href);
                            const active = isNavActive(pathWithoutLocale, sub.href);
                            return (
                              <li key={sub.key}>
                                <Link
                                  href={href}
                                  className={cn(
                                    "flex min-h-9 items-center rounded px-3.5 text-[13px] font-medium transition-colors",
                                    active ? "bg-soft text-primary font-bold" : "text-[var(--color-body)] hover:text-primary"
                                  )}
                                  onClick={() => setMobileOpen(false)}
                                >
                                  {sub.label}
                                </Link>
                              </li>
                            );
                          })}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>

                  {/* 5. Contact */}
                  <li>
                    <Link
                      href={localizedPath(locale, "/contact")}
                      className={cn(
                        "flex min-h-10 items-center rounded-md px-3 text-[14px] font-semibold uppercase tracking-[0.04em]",
                        isNavActive(pathWithoutLocale, "/contact") ? "bg-soft text-primary" : "text-[var(--color-body)] hover:bg-soft/80"
                      )}
                      onClick={() => setMobileOpen(false)}
                    >
                      {dict.nav.contact}
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="space-y-3 border-t border-border p-4">
                <LanguageSwitcher variant="pill" />
                <WhatsAppButton
                  messageType="book_room"
                  label={bookNowLabel}
                  showIcon={false}
                  size="lg"
                  className="w-full"
                />
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {!isHome && <div className="h-[4rem]" aria-hidden />}
    </>
  );
}

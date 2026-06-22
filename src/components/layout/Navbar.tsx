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

function isNavActive(path: string, href: string) {
  return path === href || (href !== "/" && path.startsWith(href));
}

function navLinkClass(active: boolean) {
  return cn(
    "inline-flex min-h-9 items-center rounded-md px-1.5 xl:px-3 py-1 xl:py-1.5 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap tracking-normal font-sans border-2",
    active
      ? "bg-soft text-primary font-semibold border-primary/25 shadow-sm"
      : "text-[var(--color-body)] border-transparent hover:bg-soft/70 hover:text-primary hover:border-primary/10"
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
  const [mobileExploreOpen, setMobileExploreOpen] = useState(false);
  const [mobileTransportOpen, setMobileTransportOpen] = useState(false);

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

  const subExploreItems = [
    { href: "/explore-phong-nha#motorbike", label: dict.nav.exploreBicycleMotorbike },
    { href: "/explore-phong-nha#classic-tours", label: dict.nav.exploreClassic },
    { href: "/explore-phong-nha#adventure", label: dict.nav.exploreAdventure },
  ];

  const subTransportItems = [
    { href: "/transportation#bus", label: dict.nav.transportBus },
    { href: "/transportation#train-flight", label: dict.nav.transportTrainFlight },
    { href: "/transportation#private-transfer", label: dict.nav.transportPrivate },
  ];

  return (
    <>
      <a href="#main-content" className="skip-link">
        {dict.common.skipToContent}
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b-2 bg-white/95 backdrop-blur-md transition-all duration-300",
          scrolled ? "border-border/80 shadow-[var(--shadow-sm)]" : "border-border/30"
        )}
      >
        <div className={cn(
          "mx-auto flex items-center justify-between gap-2 xl:gap-4 px-4 sm:px-6 lg:px-8 transition-all duration-300 max-w-[85rem]",
          scrolled ? "h-[4.25rem]" : "h-[5.25rem]"
        )}>
          {/* Logo Branding (Left Column) */}
          <SiteBrand
            siteName={siteName}
            tagline={tagline}
            logoUrl={settings?.logoUrl}
            locale={locale}
            className="shrink-0"
          />

          {/* Navigation Links (Center Column) */}
          <nav
            className="hidden items-center gap-0.5 xl:gap-2 xl:flex justify-center"
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

            {/* 4. Social Activities */}
            <Link
              href={localizedPath(locale, "/social-activities")}
              className={navLinkClass(isNavActive(pathWithoutLocale, "/social-activities"))}
            >
              {dict.nav.socialActivities}
            </Link>

            {/* 5. Explore Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown("explore")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={localizedPath(locale, "/explore-phong-nha")}
                className={cn(
                  navLinkClass(isNavActive(pathWithoutLocale, "/explore-phong-nha")),
                  "flex items-center gap-1 cursor-pointer"
                )}
                aria-expanded={openDropdown === "explore"}
                aria-haspopup="true"
              >
                {dict.nav.explore}
                <ChevronDown className={cn("h-4 w-4 opacity-60 transition-transform duration-300", openDropdown === "explore" && "rotate-180")} />
              </Link>
              <AnimatePresence>
                {openDropdown === "explore" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
                    className="absolute top-full left-1/2 z-50 mt-1 w-56 -translate-x-1/2 border border-border bg-white p-2 shadow-[0_15px_30px_rgba(0,0,0,0.06)] rounded-xl"
                  >
                    {subExploreItems.map((sub) => {
                      const href = localizedPath(locale, sub.href);
                      const active = pathname.endsWith(sub.href);
                      return (
                        <Link
                          key={sub.href}
                          href={href}
                          className={cn(
                            "block px-3.5 py-2 text-sm font-medium transition-colors whitespace-nowrap rounded-md",
                            active
                              ? "bg-soft text-primary font-semibold"
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

            {/* 6. Transport Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown("transport")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={localizedPath(locale, "/transportation")}
                className={cn(
                  navLinkClass(isNavActive(pathWithoutLocale, "/transportation")),
                  "flex items-center gap-1 cursor-pointer"
                )}
                aria-expanded={openDropdown === "transport"}
                aria-haspopup="true"
              >
                {dict.nav.transport}
                <ChevronDown className={cn("h-4 w-4 opacity-60 transition-transform duration-300", openDropdown === "transport" && "rotate-180")} />
              </Link>
              <AnimatePresence>
                {openDropdown === "transport" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
                    className="absolute top-full left-1/2 z-50 mt-1 w-56 -translate-x-1/2 border border-border bg-white p-2 shadow-[0_15px_30px_rgba(0,0,0,0.06)] rounded-xl"
                  >
                    {subTransportItems.map((sub) => {
                      const href = localizedPath(locale, sub.href);
                      const active = pathname.endsWith(sub.href);
                      return (
                        <Link
                          key={sub.href}
                          href={href}
                          className={cn(
                            "block px-3.5 py-2 text-sm font-medium transition-colors whitespace-nowrap rounded-md",
                            active
                              ? "bg-soft text-primary font-semibold"
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

            {/* 7. Other Services */}
            <Link
              href={localizedPath(locale, "/other-services")}
              className={navLinkClass(isNavActive(pathWithoutLocale, "/other-services"))}
            >
              {dict.nav.otherServices}
            </Link>

            {/* 8. Useful Info */}
            <Link
              href={localizedPath(locale, "/useful-info")}
              className={navLinkClass(isNavActive(pathWithoutLocale, "/useful-info"))}
            >
              {dict.nav.usefulInfo}
            </Link>
          </nav>

          {/* Actions Block (Right Column) */}
          <div className="flex items-center gap-3 md:gap-4 shrink-0">
            <LanguageSwitcher variant="dropdown" className="hidden xl:inline-block" />
            <WhatsAppButton
              messageType="book_room"
              label={bookNowLabel}
              showIcon={false}
              className="hidden xl:inline-flex bg-primary hover:bg-primary-dark text-white rounded-full font-sans text-sm font-semibold tracking-normal px-4 xl:px-6 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(96,121,59,0.3)] active:translate-y-0 hover:scale-[1.02] border-none"
            />
            <LanguageSwitcher variant="dropdown" className="xl:hidden" />
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-text hover:bg-soft xl:hidden"
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
              className="fixed inset-0 z-40 bg-black/20 xl:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed inset-y-0 right-0 z-50 flex w-[min(100%,18rem)] flex-col border-l border-border bg-white shadow-xl xl:hidden"
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
                        "flex min-h-10 items-center rounded-md px-3 text-sm font-medium tracking-normal",
                        isNavActive(pathWithoutLocale, "/our-story") ? "bg-soft text-primary font-semibold" : "text-[var(--color-body)] hover:bg-soft/80"
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
                        "flex min-h-10 items-center rounded-md px-3 text-sm font-medium tracking-normal",
                        isNavActive(pathWithoutLocale, "/stay") ? "bg-soft text-primary font-semibold" : "text-[var(--color-body)] hover:bg-soft/80"
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
                        "flex min-h-10 items-center rounded-md px-3 text-sm font-medium tracking-normal",
                        isNavActive(pathWithoutLocale, "/eat-drink") ? "bg-soft text-primary font-semibold" : "text-[var(--color-body)] hover:bg-soft/80"
                      )}
                      onClick={() => setMobileOpen(false)}
                    >
                      {dict.nav.eatDrink}
                    </Link>
                  </li>

                  {/* 4. Social Activities */}
                  <li>
                    <Link
                      href={localizedPath(locale, "/social-activities")}
                      className={cn(
                        "flex min-h-10 items-center rounded-md px-3 text-sm font-medium tracking-normal",
                        isNavActive(pathWithoutLocale, "/social-activities") ? "bg-soft text-primary font-semibold" : "text-[var(--color-body)] hover:bg-soft/80"
                      )}
                      onClick={() => setMobileOpen(false)}
                    >
                      {dict.nav.socialActivities}
                    </Link>
                  </li>

                  {/* 5. Explore Accordion */}
                  <li>
                    <button
                      type="button"
                      onClick={() => setMobileExploreOpen((o) => !o)}
                      className={cn(
                        "flex w-full min-h-10 items-center justify-between rounded-md px-3 text-sm font-medium tracking-normal text-[var(--color-body)] hover:bg-soft/80",
                        isNavActive(pathWithoutLocale, "/explore-phong-nha") && "text-primary font-semibold"
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
                          {subExploreItems.map((sub) => {
                            const href = localizedPath(locale, sub.href);
                            const active = pathname.endsWith(sub.href);
                            return (
                              <li key={sub.href}>
                                <Link
                                  href={href}
                                  className={cn(
                                    "flex min-h-9 items-center rounded px-3.5 text-sm font-medium transition-colors",
                                    active ? "bg-soft text-primary font-semibold" : "text-[var(--color-body)] hover:text-primary"
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

                  {/* 6. Transport Accordion */}
                  <li>
                    <button
                      type="button"
                      onClick={() => setMobileTransportOpen((o) => !o)}
                      className={cn(
                        "flex w-full min-h-10 items-center justify-between rounded-md px-3 text-sm font-medium tracking-normal text-[var(--color-body)] hover:bg-soft/80",
                        isNavActive(pathWithoutLocale, "/transportation") && "text-primary font-semibold"
                      )}
                    >
                      {dict.nav.transport}
                      <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", mobileTransportOpen && "rotate-180")} />
                    </button>
                    <AnimatePresence initial={false}>
                      {mobileTransportOpen && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="pl-4 mt-1 space-y-1 overflow-hidden"
                        >
                          {subTransportItems.map((sub) => {
                            const href = localizedPath(locale, sub.href);
                            const active = pathname.endsWith(sub.href);
                            return (
                              <li key={sub.href}>
                                <Link
                                  href={href}
                                  className={cn(
                                    "flex min-h-9 items-center rounded px-3.5 text-sm font-medium transition-colors",
                                    active ? "bg-soft text-primary font-semibold" : "text-[var(--color-body)] hover:text-primary"
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

                  {/* 7. Other Services */}
                  <li>
                    <Link
                      href={localizedPath(locale, "/other-services")}
                      className={cn(
                        "flex min-h-10 items-center rounded-md px-3 text-sm font-medium tracking-normal",
                        isNavActive(pathWithoutLocale, "/other-services") ? "bg-soft text-primary font-semibold" : "text-[var(--color-body)] hover:bg-soft/80"
                      )}
                      onClick={() => setMobileOpen(false)}
                    >
                      {dict.nav.otherServices}
                    </Link>
                  </li>

                  {/* 8. Useful Info */}
                  <li>
                    <Link
                      href={localizedPath(locale, "/useful-info")}
                      className={cn(
                        "flex min-h-10 items-center rounded-md px-3 text-sm font-medium tracking-normal",
                        isNavActive(pathWithoutLocale, "/useful-info") ? "bg-soft text-primary font-semibold" : "text-[var(--color-body)] hover:bg-soft/80"
                      )}
                      onClick={() => setMobileOpen(false)}
                    >
                      {dict.nav.usefulInfo}
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
                  className="w-full bg-primary hover:bg-primary-dark text-white rounded-full font-sans text-sm font-semibold tracking-normal py-3 transition-all shadow-sm hover:shadow-md duration-300 hover:scale-[1.02] border-none"
                />
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {!isHome && <div className="h-[5.25rem]" aria-hidden />}
    </>
  );
}

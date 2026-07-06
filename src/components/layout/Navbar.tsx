"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { useDictionary, useLocale } from "@/components/providers/I18nProvider";
import { useSiteData } from "@/components/providers/SiteDataProvider";
import { localizedPath, stripLocale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { SiteBrand } from "@/components/layout/SiteBrand";
import { WhatsAppButton, WhatsAppLink } from "@/components/whatsapp/WhatsAppButton";

function isNavActive(path: string, href: string) {
  return path === href || (href !== "/" && path.startsWith(href));
}

function navLinkClass(active: boolean) {
  return cn(
    "inline-flex min-h-10 items-center rounded-full border px-2.5 py-1.5 font-sans text-[0.82rem] font-semibold tracking-normal transition-all duration-200 cursor-pointer whitespace-nowrap 2xl:px-3",
    active
      ? "border-white/30 bg-white/16 text-white shadow-sm"
      : "border-transparent text-white/88 hover:-translate-y-0.5 hover:border-white/18 hover:bg-white/10 hover:text-white"
  );
}

export function Navbar() {
  const pathname = usePathname();
  const locale = useLocale();
  const dict = useDictionary();
  const { settings } = useSiteData();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExploreOpen, setMobileExploreOpen] = useState(false);
  const [mobileTransportOpen, setMobileTransportOpen] = useState(false);
  const [mobileUsefulOpen, setMobileUsefulOpen] = useState(false);
  const scrolledRef = useRef(false);

  const siteName = settings?.siteName || dict.meta.siteName;
  const tagline = settings?.tagline || dict.meta.tagline;
  const bookNowLabel = dict.nav.bookNow;
  const pathWithoutLocale = stripLocale(pathname);
  const isHome = pathWithoutLocale === "/";

  useEffect(() => {
    let frame = 0;

    const syncScrolled = () => {
      frame = 0;
      const nextScrolled = window.scrollY > 8;
      if (scrolledRef.current === nextScrolled) return;
      scrolledRef.current = nextScrolled;
      setScrolled(nextScrolled);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(syncScrolled);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
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
    { href: "/explore-phong-nha#bong-lai", label: dict.nav.exploreCountryside },
    { href: "/explore-phong-nha#motorbike-adventures", label: dict.nav.exploreMotorbike },
    { href: "/explore-phong-nha#classic-cave-tours", label: dict.nav.exploreClassic },
    { href: "/explore-phong-nha#adventure-cave-tours", label: dict.nav.exploreAdventure },
    { href: "/explore-phong-nha#other-tours-vietnam", label: dict.nav.exploreOtherVietnam },
  ];

  const subTransportItems = [
    { href: "/transportation#bus", label: dict.nav.transportBus },
    { href: "/transportation#train-flight", label: dict.nav.transportTrainFlight },
    { href: "/transportation#private-transfer", label: dict.nav.transportPrivate },
  ];

  const subUsefulItems = [
    { href: "/contact", label: dict.nav.contactUs },
    { href: "/faq", label: dict.nav.faqs },
    { href: "/terms", label: dict.nav.policies },
    { href: "/contact", label: dict.nav.careers },
  ];

  return (
    <>
      <a href="#main-content" className="skip-link">
        {dict.common.skipToContent}
      </a>

      <header
        translate="no"
        className={cn(
          "notranslate fixed inset-x-0 top-0 z-50 border-b bg-primary/96 text-white shadow-[0_8px_28px_rgba(28,36,18,0.12)] backdrop-blur-xl transition-all duration-300",
          scrolled ? "border-white/12 bg-primary/98" : "border-white/8"
        )}
      >
        <WhatsAppLink
          messageType="general"
          className="top-booking-bar group flex min-h-8 items-center justify-center bg-[#D96B0B] px-3 py-1.5 text-center text-white shadow-sm transition-colors hover:bg-[#C95F08]"
        >
          <span className="hidden text-xs font-semibold tracking-normal sm:inline">
            Book via WhatsApp for best price & support.
          </span>
          <span className="text-xs font-semibold tracking-normal sm:hidden">
            Book via WhatsApp · Best price
          </span>
          <span className="ml-2 text-xs font-black uppercase tracking-[0.08em] underline decoration-white/35 underline-offset-4 transition-colors group-hover:decoration-white">
            CHAT NOW →
          </span>
        </WhatsAppLink>
        <div className={cn(
          "relative mx-auto grid grid-cols-[minmax(0,auto)_minmax(0,1fr)_auto] items-center gap-3 px-3 transition-all duration-300 sm:gap-4 sm:px-6 lg:px-8 max-w-[112rem]",
          scrolled ? "h-16 sm:h-[4.25rem]" : "h-20 sm:h-[5.25rem]"
        )}>
          {/* Logo Branding (Left Column) */}
          <SiteBrand
            siteName={siteName}
            tagline={tagline}
            logoUrl={settings?.logoUrl}
            locale={locale}
            className="site-header-brand flex-none"
            nameClassName="!text-white"
            subtitleClassName="!text-white/78"
          />

          {/* Navigation Links (Center Column) */}
          <nav
            className="site-main-nav hidden min-w-0 items-center justify-center gap-0.5 xl:flex 2xl:gap-1.5"
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
            <div className="relative nav-dropdown-trigger">
              <Link
                href={localizedPath(locale, "/explore-phong-nha")}
                className={cn(
                  navLinkClass(isNavActive(pathWithoutLocale, "/explore-phong-nha")),
                  "flex items-center gap-1 cursor-pointer"
                )}
                aria-haspopup="true"
              >
                {dict.nav.explore}
                <ChevronDown className="h-4 w-4 opacity-60 transition-transform duration-300" />
              </Link>
              <div
                className="nav-dropdown-menu absolute top-full left-1/2 z-50 mt-2 w-max min-w-[15rem] pointer-events-none opacity-0 invisible rounded-xl border border-border bg-white p-2 text-text shadow-[0_18px_38px_rgba(28,36,18,0.12)]"
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
              </div>
            </div>

            {/* 6. Transport Dropdown */}
            <div className="relative nav-dropdown-trigger">
              <Link
                href={localizedPath(locale, "/transportation")}
                className={cn(
                  navLinkClass(isNavActive(pathWithoutLocale, "/transportation")),
                  "flex items-center gap-1 cursor-pointer"
                )}
                aria-haspopup="true"
              >
                {dict.nav.transport}
                <ChevronDown className="h-4 w-4 opacity-60 transition-transform duration-300" />
              </Link>
              <div
                className="nav-dropdown-menu absolute top-full left-1/2 z-50 mt-2 w-max min-w-[15rem] pointer-events-none opacity-0 invisible rounded-xl border border-border bg-white p-2 text-text shadow-[0_18px_38px_rgba(28,36,18,0.12)]"
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
              </div>
            </div>

            {/* 7. Other Services */}
            <Link
              href={localizedPath(locale, "/other-services")}
              className={navLinkClass(isNavActive(pathWithoutLocale, "/other-services"))}
            >
              {dict.nav.otherServices}
            </Link>

            {/* 8. Gallery */}
            <Link
              href={localizedPath(locale, "/gallery")}
              className={navLinkClass(isNavActive(pathWithoutLocale, "/gallery"))}
            >
              {dict.nav.gallery}
            </Link>

            {/* 9. Useful Info Dropdown */}
            <div className="relative nav-dropdown-trigger">
              <Link
                href={localizedPath(locale, "/useful-info")}
                className={cn(
                  navLinkClass(
                    isNavActive(pathWithoutLocale, "/useful-info") ||
                      isNavActive(pathWithoutLocale, "/contact") ||
                      isNavActive(pathWithoutLocale, "/faq") ||
                      isNavActive(pathWithoutLocale, "/terms")
                  ),
                  "flex items-center gap-1 cursor-pointer"
                )}
                aria-haspopup="true"
              >
                {dict.nav.usefulInfo}
                <ChevronDown className="h-4 w-4 opacity-60 transition-transform duration-300" />
              </Link>
              <div
                className="nav-dropdown-menu absolute top-full left-1/2 z-50 mt-2 w-max min-w-[15rem] pointer-events-none opacity-0 invisible rounded-xl border border-border bg-white p-2 text-text shadow-[0_18px_38px_rgba(28,36,18,0.12)]"
              >
                {subUsefulItems.map((sub) => {
                  const href = localizedPath(locale, sub.href);
                  const active = pathWithoutLocale === sub.href;
                  return (
                    <Link
                      key={`${sub.href}-${sub.label}`}
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
              </div>
            </div>
          </nav>

          {/* Actions Block (Right Column) */}
          <div className="site-header-actions flex shrink-0 items-center justify-end gap-3 md:gap-4">
            <LanguageSwitcher
              variant="dropdown"
              inverted
              className="desktop-language-switcher hidden xl:inline-block"
            />
            <WhatsAppButton
              messageType="book_room"
              label={bookNowLabel}
              showIcon={false}
              className="site-book-now hidden border border-white/18 bg-white px-4 py-2.5 font-sans text-sm font-semibold tracking-normal text-primary shadow-sm hover:bg-soft min-[1700px]:inline-flex xl:px-5"
            />
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="mobile-menu-trigger absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-sm transition-colors hover:bg-white/18 sm:right-5 xl:hidden"
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
              className="fixed inset-0 z-40 bg-black/35 xl:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed inset-y-0 right-0 z-50 flex w-[min(100%,22rem)] flex-col border-l border-border bg-white shadow-xl xl:hidden"
              aria-label="Mobile navigation"
            >
              <div className="flex h-[4.5rem] items-center justify-between border-b border-border px-4">
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
                  className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-soft"
                  aria-label={dict.nav.closeMenu}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <ul className="space-y-1.5">
                  {/* 1. Our Story */}
                  <li>
                    <Link
                      href={localizedPath(locale, "/our-story")}
                      className={cn(
                        "flex min-h-11 items-center rounded-xl px-3 text-base font-semibold tracking-normal",
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
                        "flex min-h-11 items-center rounded-xl px-3 text-base font-semibold tracking-normal",
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
                        "flex min-h-11 items-center rounded-xl px-3 text-base font-semibold tracking-normal",
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
                        "flex min-h-11 items-center rounded-xl px-3 text-base font-semibold tracking-normal",
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
                        "flex w-full min-h-11 items-center justify-between rounded-xl px-3 text-base font-semibold tracking-normal text-[var(--color-body)] hover:bg-soft/80",
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
                                    "flex min-h-10 items-center rounded-lg px-3.5 text-sm font-semibold transition-colors",
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
                        "flex w-full min-h-11 items-center justify-between rounded-xl px-3 text-base font-semibold tracking-normal text-[var(--color-body)] hover:bg-soft/80",
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
                                    "flex min-h-10 items-center rounded-lg px-3.5 text-sm font-semibold transition-colors",
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
                        "flex min-h-11 items-center rounded-xl px-3 text-base font-semibold tracking-normal",
                        isNavActive(pathWithoutLocale, "/other-services") ? "bg-soft text-primary font-semibold" : "text-[var(--color-body)] hover:bg-soft/80"
                      )}
                      onClick={() => setMobileOpen(false)}
                    >
                      {dict.nav.otherServices}
                    </Link>
                  </li>

                  {/* 8. Gallery */}
                  <li>
                    <Link
                      href={localizedPath(locale, "/gallery")}
                      className={cn(
                        "flex min-h-11 items-center rounded-xl px-3 text-base font-semibold tracking-normal",
                        isNavActive(pathWithoutLocale, "/gallery") ? "bg-soft text-primary font-semibold" : "text-[var(--color-body)] hover:bg-soft/80"
                      )}
                      onClick={() => setMobileOpen(false)}
                    >
                      {dict.nav.gallery}
                    </Link>
                  </li>

                  {/* 9. Useful Info Accordion */}
                  <li>
                    <button
                      type="button"
                      onClick={() => setMobileUsefulOpen((o) => !o)}
                      className={cn(
                        "flex w-full min-h-11 items-center justify-between rounded-xl px-3 text-base font-semibold tracking-normal text-[var(--color-body)] hover:bg-soft/80",
                        (isNavActive(pathWithoutLocale, "/useful-info") ||
                          isNavActive(pathWithoutLocale, "/contact") ||
                          isNavActive(pathWithoutLocale, "/faq") ||
                          isNavActive(pathWithoutLocale, "/terms")) &&
                          "text-primary font-semibold"
                      )}
                    >
                      {dict.nav.usefulInfo}
                      <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", mobileUsefulOpen && "rotate-180")} />
                    </button>
                    <AnimatePresence initial={false}>
                      {mobileUsefulOpen && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="pl-4 mt-1 space-y-1 overflow-hidden"
                        >
                          {subUsefulItems.map((sub) => {
                            const href = localizedPath(locale, sub.href);
                            const active = pathWithoutLocale === sub.href;
                            return (
                              <li key={`${sub.href}-${sub.label}`}>
                                <Link
                                  href={href}
                                  className={cn(
                                    "flex min-h-10 items-center rounded-lg px-3.5 text-sm font-semibold transition-colors",
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
                </ul>
              </div>

              <div className="space-y-3 border-t border-border p-4">
                <LanguageSwitcher variant="pill" />
                <WhatsAppButton
                  messageType="book_room"
                  label={bookNowLabel}
                  showIcon={false}
                  size="lg"
                  className="w-full border-none bg-primary py-3 font-sans text-base font-semibold tracking-normal text-white hover:bg-primary-dark"
                />
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {!isHome && <div className="h-[var(--header-total-h)]" aria-hidden />}
    </>
  );
}

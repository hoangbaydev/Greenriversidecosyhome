"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
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
    "inline-flex min-h-9 items-center rounded-md px-2.5 py-1.5 text-[13px] xl:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap",
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

  const navItems = [
    { href: "/our-story", label: dict.nav.ourStory },
    { href: "/stay", label: dict.nav.stay },
    { href: "/eat-drink", label: dict.nav.eatDrink },
    { href: "/explore-phong-nha", label: dict.nav.explore },
    { href: "/social-activities", label: dict.nav.activities },
    { href: "/transportation", label: dict.nav.transport },
    { href: "/gallery", label: dict.nav.gallery },
    { href: "/contact", label: dict.nav.contact },
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
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={localizedPath(locale, item.href)}
                className={navLinkClass(isNavActive(pathWithoutLocale, item.href))}
              >
                {item.label}
              </Link>
            ))}
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
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={localizedPath(locale, item.href)}
                        className={cn(
                          "flex min-h-10 items-center rounded-md px-3 text-[14px] font-semibold uppercase tracking-[0.04em]",
                          isNavActive(pathWithoutLocale, item.href)
                            ? "bg-soft text-primary font-bold"
                            : "text-[var(--color-body)] hover:bg-soft/80"
                        )}
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
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

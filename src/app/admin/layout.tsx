"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTheme } from "next-themes";
import {
  LayoutDashboard,
  Bed,
  Map,
  Calendar,
  Truck,
  Image,
  FileText,
  Star,
  Home,
  Settings,
  LogOut,
  Moon,
  Sun,
  Menu,
  BookOpen,
  Coffee,
  HelpCircle,
  Layout,
  ExternalLink,
  Globe2,
} from "lucide-react";
import { Toaster } from "sonner";
import { AuthProvider, useAuth } from "@/components/admin/AuthProvider";
import { AdminI18nProvider, useAdminI18n } from "@/components/admin/AdminI18nProvider";
import { AdminLanguageSwitcher } from "@/components/admin/AdminLanguageSwitcher";
import { AdminThemeProvider } from "@/components/providers/AdminThemeProvider";
import { logoutAdmin } from "@/lib/firebase/auth";
import { cn } from "@/lib/utils";
import { AdminPageSkeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { motion } from "framer-motion";

type NavKey =
  | "dashboard"
  | "homepage"
  | "story"
  | "cafe"
  | "faq"
  | "pages"
  | "rooms"
  | "stay"
  | "explore"
  | "transport"
  | "otherServices"
  | "usefulInfo"
  | "tours"
  | "activities"
  | "transportation"
  | "gallery"
  | "blog"
  | "reviews"
  | "settings";

type AdminNavGroup = {
  labelKey: "overview" | "website" | "catalog" | "trustMedia";
  links: { href: string; key: NavKey; icon: typeof LayoutDashboard }[];
};

const adminLinkGroups: AdminNavGroup[] = [
  {
    labelKey: "overview",
    links: [{ href: "/admin", key: "dashboard", icon: LayoutDashboard }],
  },
  {
    labelKey: "website",
    links: [
      { href: "/admin/homepage", key: "homepage", icon: Home },
      { href: "/admin/story", key: "story", icon: BookOpen },
      { href: "/admin/rooms", key: "stay", icon: Bed },
      { href: "/admin/cafe", key: "cafe", icon: Coffee },
      { href: "/admin/activities", key: "activities", icon: Calendar },
      { href: "/admin/tours", key: "explore", icon: Map },
      { href: "/admin/transportation", key: "transport", icon: Truck },
      { href: "/admin/pages#other-services", key: "otherServices", icon: Layout },
      { href: "/admin/pages#useful-info", key: "usefulInfo", icon: HelpCircle },
    ],
  },
  {
    labelKey: "catalog",
    links: [
      { href: "/admin/pages", key: "pages", icon: Layout },
      { href: "/admin/rooms", key: "rooms", icon: Bed },
      { href: "/admin/tours", key: "tours", icon: Map },
      { href: "/admin/activities", key: "activities", icon: Calendar },
      { href: "/admin/transportation", key: "transportation", icon: Truck },
    ],
  },
  {
    labelKey: "trustMedia",
    links: [
      { href: "/admin/blog", key: "blog", icon: FileText },
      { href: "/admin/gallery", key: "gallery", icon: Image },
      { href: "/admin/reviews", key: "reviews", icon: Star },
      { href: "/admin/faq", key: "faq", icon: HelpCircle },
      { href: "/admin/settings", key: "settings", icon: Settings },
    ],
  },
];

function getAdminLinkActiveState(href: string, pathname: string, pageHash: string) {
  const [hrefPath, hrefHash] = href.split("#");
  if (hrefPath !== pathname) return false;
  if (hrefHash) return pageHash === hrefHash;
  if (hrefPath === "/admin/pages") return !pageHash;
  return true;
}

function readAdminPageHash() {
  if (typeof window === "undefined") return "";
  return window.location.hash.replace("#", "");
}

function ThemeToggle({ toggleLabel }: { toggleLabel: string }) {
  const { theme, setTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
      aria-label={toggleLabel}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, loading, firebaseConfigured } = useAuth();
  const { dict, locale } = useAdminI18n();
  const pathname = usePathname();
  const router = useRouter();
  const [pageHash, setPageHash] = useState(() => readAdminPageHash());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isLoginPage = pathname === "/admin/login";
  const websiteHref = locale === "vi" ? "/vi" : "/en";

  useEffect(() => {
    if (loading || isLoginPage) return;
    if (!firebaseConfigured) return;
    if (!user || !isAdmin) {
      router.push("/admin/login");
    }
  }, [user, isAdmin, loading, router, isLoginPage, firebaseConfigured]);

  useEffect(() => {
    const syncHash = () => setPageHash(readAdminPageHash());
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  if (isLoginPage) return <>{children}</>;

  if (loading || !dict) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 dark:bg-gray-950">
        <AdminPageSkeleton />
      </div>
    );
  }

  if (!firebaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-8 dark:bg-gray-950">
        <div className="max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center dark:border-red-900 dark:bg-gray-900">
          <h1 className="font-heading text-xl font-bold text-red-600">
            {dict.layout.firebaseNotConfiguredTitle}
          </h1>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            {dict.layout.firebaseNotConfiguredDesc}
          </p>
          <Link
            href={websiteHref}
            className="mt-6 inline-block text-sm text-primary hover:underline"
          >
            {dict.login.backToWebsite}
          </Link>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label={dict.layout.closeSidebar}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col border-r border-gray-200 bg-white shadow-sm transition-transform dark:border-gray-800 dark:bg-gray-900 lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800">
          <Link href="/admin" className="min-w-0">
            <span className="block font-heading text-lg font-bold text-primary">
              {dict.layout.brand}
            </span>
            <span className="mt-0.5 block truncate text-xs font-medium text-gray-500 dark:text-gray-400">
              {dict.layout.productName}
            </span>
          </Link>
          <ThemeToggle toggleLabel={dict.layout.toggleTheme} />
        </div>
        <nav className="flex-1 space-y-4 overflow-y-auto p-3">
          {adminLinkGroups.map((group) => (
            <div key={group.labelKey}>
              <p className="mb-1.5 px-3 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                {dict.layout.groups[group.labelKey]}
              </p>
              <div className="space-y-1">
                {group.links.map((link) => {
                  const Icon = link.icon;
                  const active =
                    link.href === "/admin"
                      ? pathname === link.href
                      : getAdminLinkActiveState(
                          link.href,
                          pathname,
                          pageHash
                        ) || pathname.startsWith(`${link.href.split("#")[0]}/`);

                  return (
                    <motion.div key={link.href} whileTap={{ scale: 0.99 }}>
                      <Link
                        href={link.href}
                        onClick={() => setSidebarOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors",
                          active
                            ? "bg-primary text-white"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-950 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {dict.nav[link.key]}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
        <div className="space-y-3 border-t border-gray-200 p-4 dark:border-gray-800">
          <Link
            href={websiteHref}
            target="_blank"
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <Globe2 className="h-4 w-4" />
            {dict.layout.website}
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
          <AdminLanguageSwitcher className="w-full justify-center" />
          <button
            type="button"
            onClick={() =>
              logoutAdmin().then(() => router.push("/admin/login"))
            }
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
          >
            <LogOut className="h-4 w-4" />
            {dict.layout.logout}
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="sticky top-0 z-30 hidden items-center justify-between border-b border-gray-200 bg-white/90 px-6 py-3 backdrop-blur dark:border-gray-800 dark:bg-gray-900/90 lg:flex">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
              {dict.layout.topbarEyebrow}
            </p>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              Green Riverside Cosy Home
            </p>
          </div>
          <div className="flex items-center gap-2">
            <AdminLanguageSwitcher />
            <Link
              href={websiteHref}
              target="_blank"
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-gray-200 px-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <Globe2 className="h-4 w-4" />
              {dict.layout.website}
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2"
            aria-label={dict.layout.openMenu}
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="font-heading font-bold text-primary">{dict.layout.brand}</span>
          <div className="flex items-center gap-1">
            <AdminLanguageSwitcher />
            <ThemeToggle toggleLabel={dict.layout.toggleTheme} />
          </div>
        </div>
        <div className="p-4 md:p-8">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </div>
      </main>
      <Toaster richColors position="top-right" />
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminThemeProvider>
      <AdminI18nProvider>
        <AuthProvider>
          <AdminLayoutInner>{children}</AdminLayoutInner>
        </AuthProvider>
      </AdminI18nProvider>
    </AdminThemeProvider>
  );
}

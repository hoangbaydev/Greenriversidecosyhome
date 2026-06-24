"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Bed,
  Calendar,
  CheckCircle2,
  ExternalLink,
  FileText,
  Globe,
  Home,
  Image as ImageIcon,
  Layout,
  Map,
  MessageCircle,
  Plus,
  Settings,
  Sparkles,
  Truck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  countActivities,
  countBlogPosts,
  countGallery,
  countRooms,
  countTours,
} from "@/services";
import { AdminPageSkeleton } from "@/components/ui/skeleton";
import { useAdminI18n } from "@/components/admin/AdminI18nProvider";

type StatCard = {
  label: string;
  value?: number;
  icon: typeof Bed;
  href: string;
  tone: string;
  helper: string;
};

export default function AdminDashboard() {
  const { dict, locale } = useAdminI18n();
  const websiteHref = locale === "vi" ? "/vi" : "/en";
  const [stats, setStats] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [rooms, tours, activities, blog, gallery] = await Promise.all([
          countRooms(),
          countTours(),
          countActivities(),
          countBlogPosts(),
          countGallery(),
        ]);
        setStats({ rooms, tours, activities, blog, gallery });
      } catch (e) {
        console.error("Failed to load stats", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const cards = useMemo<StatCard[]>(
    () => [
      {
        label: dict.dashboard.rooms,
        value: stats.rooms,
        icon: Bed,
        href: "/admin/rooms",
        tone: "bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
        helper: dict.dashboard.helpers.rooms,
      },
      {
        label: dict.dashboard.tours,
        value: stats.tours,
        icon: Map,
        href: "/admin/tours",
        tone: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
        helper: dict.dashboard.helpers.tours,
      },
      {
        label: dict.dashboard.activities,
        value: stats.activities,
        icon: Calendar,
        href: "/admin/activities",
        tone: "bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
        helper: dict.dashboard.helpers.activities,
      },
      {
        label: dict.dashboard.blogPosts,
        value: stats.blog,
        icon: FileText,
        href: "/admin/blog",
        tone: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
        helper: dict.dashboard.helpers.blogPosts,
      },
      {
        label: dict.dashboard.galleryImages,
        value: stats.gallery,
        icon: ImageIcon,
        href: "/admin/gallery",
        tone: "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
        helper: dict.dashboard.helpers.galleryImages,
      },
    ],
    [dict, stats]
  );

  const quickActions = [
    { label: dict.dashboard.actions.homepage, href: "/admin/homepage", icon: Home, helper: dict.dashboard.actions.homepageHelp },
    { label: dict.dashboard.actions.pages, href: "/admin/pages", icon: Layout, helper: dict.dashboard.actions.pagesHelp },
    { label: dict.dashboard.actions.newTour, href: "/admin/tours", icon: Map, helper: dict.dashboard.actions.newTourHelp },
    { label: dict.dashboard.actions.gallery, href: "/admin/gallery", icon: ImageIcon, helper: dict.dashboard.actions.galleryHelp },
    { label: dict.dashboard.actions.transportation, href: "/admin/transportation", icon: Truck, helper: dict.dashboard.actions.transportationHelp },
    { label: dict.dashboard.actions.settings, href: "/admin/settings", icon: Settings, helper: dict.dashboard.actions.settingsHelp },
  ];

  if (loading) return <AdminPageSkeleton />;

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="grid gap-6 p-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              {dict.dashboard.eyebrow}
            </div>
            <h1 className="mt-4 font-heading text-3xl font-bold text-gray-950 dark:text-white">
              {dict.dashboard.title}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              {dict.dashboard.subtitle}
            </p>
          </div>
          <Link
            href={websiteHref}
            target="_blank"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark"
          >
            <Globe className="h-4 w-4" />
            {dict.layout.viewWebsite}
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.href} href={card.href} className="group">
              <Card className="h-full border-gray-200 dark:border-gray-800 dark:bg-gray-900">
                <CardHeader className="flex-row items-start justify-between gap-3 pb-3">
                  <div>
                    <CardTitle className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                      {card.label}
                    </CardTitle>
                    <p className="mt-1 text-xs text-gray-400">{card.helper}</p>
                  </div>
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${card.tone}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-extrabold text-gray-950 dark:text-white">
                    {card.value ?? 0}
                  </p>
                  <span className="mt-2 block text-xs font-semibold text-gray-400 transition-colors group-hover:text-primary">
                    {dict.dashboard.manageContent}
                  </span>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="border-gray-200 dark:border-gray-800 dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-heading text-xl text-gray-950 dark:text-white">
              <Plus className="h-5 w-5 text-primary" />
              {dict.dashboard.quickActions}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="group rounded-lg border border-gray-200 p-4 transition-colors hover:border-primary/40 hover:bg-primary/5 dark:border-gray-800 dark:hover:bg-primary/10"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors group-hover:bg-primary group-hover:text-white dark:bg-gray-800 dark:text-gray-300">
                        <Icon className="h-4 w-4" />
                      </span>
                      <ExternalLink className="h-4 w-4 text-gray-300 transition-colors group-hover:text-primary" />
                    </div>
                    <p className="mt-4 text-sm font-bold text-gray-900 dark:text-white">{action.label}</p>
                    <p className="mt-1 text-xs leading-relaxed text-gray-500 dark:text-gray-400">{action.helper}</p>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 dark:border-gray-800 dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-heading text-xl text-gray-950 dark:text-white">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              {dict.dashboard.publishingChecklist}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {dict.dashboard.workflow.map((item) => (
              <div key={item} className="flex gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-950">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{item}</p>
              </div>
            ))}
            <div className="mt-5 rounded-lg border border-primary/20 bg-primary/5 p-4">
              <div className="flex gap-3">
                <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{dict.dashboard.directBookingFocus}</p>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    {dict.dashboard.directBookingHelp}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

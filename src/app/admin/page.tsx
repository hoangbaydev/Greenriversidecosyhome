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
  TrendingUp,
  Truck,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  countActivities,
  countBlogPosts,
  countGallery,
  countRooms,
  countTours,
  emptyAnalyticsSummary,
  fetchAnalyticsSummary,
  type AnalyticsSummary,
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

function formatShortDate(day: string) {
  const [, month, date] = day.split("-");
  return month && date ? `${date}/${month}` : day;
}

function buildLinePath(points: { x: number; y: number }[]) {
  if (!points.length) return "";
  return points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");
}

function percent(value: number, max: number) {
  if (!max) return 0;
  return Math.max(4, Math.round((value / max) * 100));
}

export default function AdminDashboard() {
  const { dict, locale } = useAdminI18n();
  const websiteHref = locale === "vi" ? "/vi" : "/en";
  const [stats, setStats] = useState<Record<string, number>>({});
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [rooms, tours, activities, blog, gallery, analyticsSummary] =
        await Promise.all([
          countRooms().catch(() => 0),
          countTours().catch(() => 0),
          countActivities().catch(() => 0),
          countBlogPosts().catch(() => 0),
          countGallery().catch(() => 0),
          fetchAnalyticsSummary().catch(() => emptyAnalyticsSummary()),
        ]);

      setStats({ rooms, tours, activities, blog, gallery });
      setAnalytics(analyticsSummary);
      setLoading(false);
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

  const analyticsCards = [
    {
      label: "Page views",
      value: analytics?.totalViews ?? 0,
      helper: "All tracked visits",
      icon: TrendingUp,
      tone: "from-emerald-500 to-lime-500",
    },
    {
      label: "Today",
      value: analytics?.viewsToday ?? 0,
      helper: "Fresh demand",
      icon: Calendar,
      tone: "from-sky-500 to-cyan-400",
    },
    {
      label: "7 days",
      value: analytics?.views7Days ?? 0,
      helper: "Recent momentum",
      icon: Sparkles,
      tone: "from-amber-500 to-orange-400",
    },
    {
      label: "Sessions",
      value: analytics?.uniqueSessions ?? 0,
      helper: "Anonymous visitors",
      icon: Users,
      tone: "from-violet-500 to-fuchsia-500",
    },
  ];

  const dailyViews = analytics?.dailyViews ?? [];
  const chartMax = Math.max(1, ...dailyViews.map((item) => item.views));
  const chartPoints = dailyViews.map((item, index) => {
    const x = dailyViews.length <= 1 ? 24 : 24 + (index / (dailyViews.length - 1)) * 452;
    const y = 174 - (item.views / chartMax) * 128;
    return { ...item, x, y };
  });
  const chartPath = buildLinePath(chartPoints);
  const chartAreaPath = chartPath
    ? `${chartPath} L ${chartPoints[chartPoints.length - 1].x} 190 L ${chartPoints[0].x} 190 Z`
    : "";
  const topPageMax = Math.max(1, ...(analytics?.topPages ?? []).map((item) => item.views));
  const referrerMax = Math.max(1, ...(analytics?.topReferrers ?? []).map((item) => item.views));
  const totalDeviceViews = Math.max(
    1,
    ...(analytics?.deviceBreakdown ?? []).map((item) => item.views),
    analytics?.deviceBreakdown.reduce((sum, item) => sum + item.views, 0) ?? 0
  );

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

      <section className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="border-b border-gray-100 bg-[linear-gradient(135deg,#f7fbef_0%,#ffffff_48%,#eef7f2_100%)] p-6 dark:border-gray-800 dark:bg-none">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-lg bg-white/80 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary shadow-sm ring-1 ring-primary/10 dark:bg-gray-950/60">
                <TrendingUp className="h-3.5 w-3.5" />
                SEO traffic
              </div>
              <h2 className="mt-3 font-heading text-2xl font-bold text-gray-950 dark:text-white">
                Website visits dashboard
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                Track which pages attract guests, where visits come from, and what devices people use before they message or book.
              </p>
            </div>
            <div className="rounded-lg bg-white/85 px-4 py-3 text-sm text-gray-500 shadow-sm ring-1 ring-gray-200 dark:bg-gray-950/70 dark:ring-gray-800">
              <span className="font-bold text-gray-950 dark:text-white">{analytics?.totalViews ?? 0}</span>{" "}
              latest pageview events
            </div>
          </div>
        </div>

        <div className="grid gap-4 p-6 sm:grid-cols-2 xl:grid-cols-4">
          {analyticsCards.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="relative overflow-hidden rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950"
              >
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.tone}`} />
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                      {item.label}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">{item.helper}</p>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                </div>
                <p className="mt-5 text-3xl font-extrabold text-gray-950 dark:text-white">
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>

        <div className="grid gap-6 px-6 pb-6 xl:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-lg border border-gray-200 bg-gray-50/70 p-5 dark:border-gray-800 dark:bg-gray-950">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="font-heading text-xl font-bold text-gray-950 dark:text-white">
                  14-day traffic rhythm
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Daily page views from the latest events.
                </p>
              </div>
              <span className="rounded-lg bg-white px-3 py-1 text-xs font-bold text-primary shadow-sm dark:bg-gray-900">
                Peak {chartMax}
              </span>
            </div>

            <div className="mt-6 h-64 rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800">
              {chartPoints.length ? (
                <svg viewBox="0 0 500 210" className="h-full w-full" role="img" aria-label="Daily page views line chart">
                  <defs>
                    <linearGradient id="trafficLine" x1="0" x2="1" y1="0" y2="0">
                      <stop offset="0%" stopColor="#60793b" />
                      <stop offset="100%" stopColor="#cf640a" />
                    </linearGradient>
                    <linearGradient id="trafficArea" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#60793b" stopOpacity="0.24" />
                      <stop offset="100%" stopColor="#60793b" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>
                  {[46, 82, 118, 154, 190].map((y) => (
                    <line key={y} x1="20" x2="480" y1={y} y2={y} stroke="#e5e7eb" strokeDasharray="4 6" />
                  ))}
                  {chartAreaPath ? <path d={chartAreaPath} fill="url(#trafficArea)" /> : null}
                  <path d={chartPath} fill="none" stroke="url(#trafficLine)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
                  {chartPoints.map((point) => (
                    <g key={point.day}>
                      <circle cx={point.x} cy={point.y} r="5.5" fill="#fff" stroke="#60793b" strokeWidth="3" />
                      <text x={point.x} y="205" textAnchor="middle" className="fill-gray-400 text-[10px]">
                        {formatShortDate(point.day)}
                      </text>
                    </g>
                  ))}
                </svg>
              ) : (
                <div className="flex h-full items-center justify-center text-sm font-semibold text-gray-400">
                  No traffic data yet
                </div>
              )}
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <h3 className="font-heading text-xl font-bold text-gray-950 dark:text-white">
              Device mix
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Useful for prioritizing mobile layout fixes.
            </p>
            <div className="mt-6 space-y-4">
              {(analytics?.deviceBreakdown.length ? analytics.deviceBreakdown : []).map((item) => (
                <div key={item.device}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="capitalize text-gray-600 dark:text-gray-300">{item.device}</span>
                    <span className="font-bold text-gray-950 dark:text-white">{item.views}</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                      style={{ width: `${percent(item.views, totalDeviceViews)}%` }}
                    />
                  </div>
                </div>
              ))}
              {!analytics?.deviceBreakdown.length ? (
                <div className="rounded-lg bg-gray-50 p-4 text-sm font-semibold text-gray-400 dark:bg-gray-900">
                  No device data yet
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="grid gap-6 px-6 pb-6 xl:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <h3 className="font-heading text-xl font-bold text-gray-950 dark:text-white">
              Top landing pages
            </h3>
            <div className="mt-5 space-y-4">
              {(analytics?.topPages.length ? analytics.topPages : [{ path: "No data yet", views: 0 }]).map((page) => (
                <div key={page.path}>
                  <div className="mb-1.5 flex items-center justify-between gap-4 text-sm">
                    <span className="min-w-0 truncate font-semibold text-gray-700 dark:text-gray-200">
                      {page.path}
                    </span>
                    <span className="font-extrabold text-primary">{page.views}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${percent(page.views, topPageMax)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <h3 className="font-heading text-xl font-bold text-gray-950 dark:text-white">
              Referrers
            </h3>
            <div className="mt-5 space-y-4">
              {(analytics?.topReferrers.length ? analytics.topReferrers : [{ referrer: "No data yet", views: 0 }]).map((item) => (
                <div key={item.referrer}>
                  <div className="mb-1.5 flex items-center justify-between gap-4 text-sm">
                    <span className="min-w-0 truncate text-gray-600 dark:text-gray-300">{item.referrer}</span>
                    <span className="font-extrabold text-gray-950 dark:text-white">{item.views}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${percent(item.views, referrerMax)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
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

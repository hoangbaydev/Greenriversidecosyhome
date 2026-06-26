import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { getFirebaseDb, FIRESTORE_COLLECTIONS } from "@/lib/firebase/config";

export type DeviceType = "desktop" | "mobile" | "tablet";

export interface AnalyticsEvent {
  id?: string;
  path: string;
  title: string;
  locale: string;
  referrer: string;
  device: DeviceType;
  sessionId: string;
  userAgent: string;
  day: string;
  month: string;
  createdAt?: Timestamp | Date | string;
}

export interface AnalyticsSummary {
  totalViews: number;
  uniqueSessions: number;
  viewsToday: number;
  views7Days: number;
  topPages: { path: string; views: number }[];
  topReferrers: { referrer: string; views: number }[];
  deviceBreakdown: { device: DeviceType; views: number }[];
  localeBreakdown: { locale: string; views: number }[];
  dailyViews: { day: string; views: number }[];
  recentEvents: AnalyticsEvent[];
}

export function emptyAnalyticsSummary(): AnalyticsSummary {
  return {
    totalViews: 0,
    uniqueSessions: 0,
    viewsToday: 0,
    views7Days: 0,
    topPages: [],
    topReferrers: [],
    deviceBreakdown: [],
    localeBreakdown: [],
    dailyViews: [],
    recentEvents: [],
  };
}

function isRecoverableFirestoreError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    ["permission-denied", "failed-precondition"].includes(
      String((error as { code?: string }).code)
    )
  );
}

function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function normalizePath(path: string) {
  const clean = path.split("?")[0].split("#")[0] || "/";
  return clean.length > 1 ? clean.replace(/\/$/, "") : clean;
}

function detectDevice(userAgent: string): DeviceType {
  if (/ipad|tablet|playbook|silk/i.test(userAgent)) return "tablet";
  if (/mobile|iphone|ipod|android|blackberry|phone/i.test(userAgent)) return "mobile";
  return "desktop";
}

function getLocaleFromPath(path: string) {
  const first = normalizePath(path).split("/")[1];
  return first === "vi" || first === "en" ? first : "unknown";
}

export async function trackPageView(input: {
  path: string;
  title: string;
  referrer: string;
  sessionId: string;
  userAgent: string;
}) {
  const db = getFirebaseDb();
  if (!db) return;

  const path = normalizePath(input.path);
  if (path.startsWith("/admin")) return;

  const now = new Date();
  await addDoc(collection(db, FIRESTORE_COLLECTIONS.analyticsEvents), {
    path,
    title: input.title.slice(0, 160),
    locale: getLocaleFromPath(path),
    referrer: input.referrer ? input.referrer.slice(0, 240) : "direct",
    device: detectDevice(input.userAgent),
    sessionId: input.sessionId,
    userAgent: input.userAgent.slice(0, 180),
    day: toDateKey(now),
    month: toDateKey(now).slice(0, 7),
    createdAt: serverTimestamp(),
  });
}

function increment(map: Map<string, number>, key: string) {
  map.set(key, (map.get(key) ?? 0) + 1);
}

function topEntries(map: Map<string, number>, count: number) {
  return [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([key, views]) => ({ key, views }));
}

export async function fetchAnalyticsSummary(maxEvents = 1000): Promise<AnalyticsSummary> {
  const db = getFirebaseDb();
  if (!db) {
    return emptyAnalyticsSummary();
  }

  let snap;
  try {
    snap = await getDocs(
      query(
        collection(db, FIRESTORE_COLLECTIONS.analyticsEvents),
        orderBy("createdAt", "desc"),
        limit(maxEvents)
      )
    );
  } catch (error) {
    if (isRecoverableFirestoreError(error)) {
      console.warn(
        "[Analytics] Read denied or index missing for analytics_events. Deploy Firestore rules/indexes to enable traffic dashboard."
      );
      return emptyAnalyticsSummary();
    }
    throw error;
  }

  const events = snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as AnalyticsEvent[];

  const today = toDateKey(new Date());
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  const sevenDayStart = toDateKey(sevenDaysAgo);

  const sessions = new Set<string>();
  const pages = new Map<string, number>();
  const referrers = new Map<string, number>();
  const devices = new Map<string, number>();
  const locales = new Map<string, number>();
  const days = new Map<string, number>();

  for (const event of events) {
    if (event.sessionId) sessions.add(event.sessionId);
    increment(pages, event.path || "/");
    increment(referrers, event.referrer || "direct");
    increment(devices, event.device || "desktop");
    increment(locales, event.locale || "unknown");
    increment(days, event.day || "unknown");
  }

  const dailyViews = [...days.entries()]
    .filter(([day]) => day !== "unknown")
    .sort((a, b) => a[0].localeCompare(b[0]))
    .slice(-14)
    .map(([day, views]) => ({ day, views }));

  return {
    totalViews: events.length,
    uniqueSessions: sessions.size,
    viewsToday: events.filter((event) => event.day === today).length,
    views7Days: events.filter((event) => event.day >= sevenDayStart).length,
    topPages: topEntries(pages, 6).map(({ key, views }) => ({ path: key, views })),
    topReferrers: topEntries(referrers, 5).map(({ key, views }) => ({
      referrer: key,
      views,
    })),
    deviceBreakdown: topEntries(devices, 3).map(({ key, views }) => ({
      device: key as DeviceType,
      views,
    })),
    localeBreakdown: topEntries(locales, 4).map(({ key, views }) => ({
      locale: key,
      views,
    })),
    dailyViews,
    recentEvents: events.slice(0, 8),
  };
}

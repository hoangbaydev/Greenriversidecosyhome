"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getFirebaseAnalytics } from "@/lib/firebase/config";
import { trackPageView } from "@/services/analytics.service";

const SESSION_KEY = "gr_analytics_session";

function getSessionId() {
  const existing = window.sessionStorage.getItem(SESSION_KEY);
  if (existing) return existing;
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  window.sessionStorage.setItem(SESSION_KEY, id);
  return id;
}

export function AnalyticsProvider() {
  const pathname = usePathname();

  useEffect(() => {
    getFirebaseAnalytics().catch(() => {});
  }, []);

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;

    const timeout = window.setTimeout(() => {
      const path = `${window.location.pathname}${window.location.search}`;
      trackPageView({
        path,
        title: document.title,
        referrer: document.referrer,
        sessionId: getSessionId(),
        userAgent: navigator.userAgent,
      }).catch(() => {});
    }, 800);

    return () => window.clearTimeout(timeout);
  }, [pathname]);

  return null;
}

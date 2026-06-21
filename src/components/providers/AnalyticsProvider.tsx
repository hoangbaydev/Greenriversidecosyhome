"use client";

import { useEffect } from "react";
import { getFirebaseAnalytics } from "@/lib/firebase/config";

export function AnalyticsProvider() {
  useEffect(() => {
    getFirebaseAnalytics().catch(() => {});
  }, []);

  return null;
}

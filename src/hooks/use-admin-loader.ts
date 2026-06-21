"use client";

import { useCallback, useEffect, useState } from "react";

/** Loads admin data in an effect without synchronous setState in the effect body. */
export function useAdminLoader<T>(fetcher: () => Promise<T>, initial: T) {
  const [data, setData] = useState<T>(initial);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      setData(await fetcher());
    } finally {
      setLoading(false);
    }
  }, [fetcher]);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      setLoading(true);
      try {
        const next = await fetcher();
        if (!cancelled) setData(next);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [fetcher]);

  return { data, setData, loading, reload };
}

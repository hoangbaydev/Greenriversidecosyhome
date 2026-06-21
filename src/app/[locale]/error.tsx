"use client";

import { useEffect } from "react";

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 pt-24 text-center">
      <h2 className="font-heading text-h2 text-text">Something went wrong</h2>
      <p className="mt-2 max-w-md text-text-muted">
        Please refresh the page. If the problem continues, contact us on WhatsApp.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 min-h-11 rounded-full bg-primary px-6 text-sm font-semibold text-white"
      >
        Try again
      </button>
    </div>
  );
}

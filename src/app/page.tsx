"use client";

import { useEffect } from "react";
import Link from "next/link";
import { defaultLocale, localizedPath } from "@/lib/i18n/config";
import { Button } from "@/components/ui/button";

const homePath = localizedPath(defaultLocale, "/");

export default function RootPage() {
  useEffect(() => {
    window.location.replace(homePath);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
        Green Riverside Cosy Home
      </p>
      <h1 className="mt-4 font-heading text-4xl font-semibold text-text">
        Opening the homepage
      </h1>
      <p className="mt-3 max-w-md text-text-muted">
        If you are not redirected automatically, continue to the homepage.
      </p>
      <Button asChild className="mt-6">
        <Link href={homePath}>Go Home</Link>
      </Button>
    </main>
  );
}

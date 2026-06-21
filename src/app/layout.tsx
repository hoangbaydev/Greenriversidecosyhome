import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Phong Nha Homestay & Tours`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Book a family-run Phong Nha homestay with riverside rooms, cave tours, local transport, rooftop cafe, and direct WhatsApp support.",
  keywords: [
    "Phong Nha Tours",
    "Phong Nha Accommodation",
    "Green Riverside Cozy Home",
    "Green Riverside Cosy Home",
    "Phong Nha Homestay",
    "Phong Nha Travel",
    "Phong Nha cave tours",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: SITE_URL,
    languages: {
      en: `${SITE_URL}/en`,
      vi: `${SITE_URL}/vi`,
    },
  },
  openGraph: {
    title: `${SITE_NAME} | Phong Nha Homestay & Tours`,
    description:
      "Stay beside the Son River, book Phong Nha cave tours, arrange transfers, and enjoy local hospitality direct with Green Riverside Cosy Home.",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Phong Nha Homestay & Tours`,
    description:
      "Riverside homestay, rooms, tours, transport, and local travel support in Phong Nha.",
    images: [DEFAULT_OG_IMAGE],
  },
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    apple: [{ url: "/logo.png", type: "image/png" }],
    shortcut: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}

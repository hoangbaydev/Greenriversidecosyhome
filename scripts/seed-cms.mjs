/**
 * Legacy seed script (requires Firebase Admin service account).
 * Prefer: npm run seed:auth
 *
 * Get credentials: Firebase Console → Project settings → Service accounts → Generate new private key
 * Add to .env.local:
 *   FIREBASE_ADMIN_CLIENT_EMAIL=...
 *   FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
 */

import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    console.error(`Missing ${name} in .env.local`);
    process.exit(1);
  }
  return value;
}

const projectId = requireEnv("NEXT_PUBLIC_FIREBASE_PROJECT_ID");
const clientEmail = requireEnv("FIREBASE_ADMIN_CLIENT_EMAIL");
const privateKey = requireEnv("FIREBASE_ADMIN_PRIVATE_KEY").replace(/\\n/g, "\n");

initializeApp({
  credential: cert({ projectId, clientEmail, privateKey }),
});

const db = getFirestore();
const ts = FieldValue.serverTimestamp();

async function seed() {
  console.log("Seeding Firestore for Green Riverside Cosy Home...\n");

  await db.collection("site_settings").doc("main").set(
    {
      siteName: "Green Riverside Cosy Home",
      tagline: "Come as our guest, leave as our family.",
      whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
      phone: "+84 912 345 678",
      email: "hello@greenriversidecosyhome.com",
      address: "Son River, Phong Nha, Quang Binh, Vietnam",
      googleMapsUrl: "https://maps.app.goo.gl/pG4zBELktoPaRYtdA",
      bookNowLabel: "Book Now",
      socialLinks: {
        facebook: "https://www.facebook.com/greenriverguesthouse",
        instagram: "https://www.instagram.com/greenriversidecosyhomephongnha",
        tiktok: "https://www.tiktok.com/@greenriversidecosyhome",
      },
      seo: {
        defaultTitle: "Green Riverside Cosy Home | Phong Nha",
        defaultDescription:
          "Family-run hospitality in Phong Nha. Stay, eat, explore and connect.",
        ogImage: "",
      },
      updatedAt: ts,
    },
    { merge: true }
  );
  console.log("✓ site_settings/main");

  await db.collection("contact_information").doc("main").set(
    {
      phone: "",
      email: "hello@greenriversidecosyhome.com",
      address: "Son River, Phong Nha, Quang Binh, Vietnam",
      whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
      googleMapsEmbed: "",
      googleMapsUrl: "https://maps.app.goo.gl/pG4zBELktoPaRYtdA",
      openingHours: "Daily · 7:00 – 22:00",
      updatedAt: ts,
    },
    { merge: true }
  );
  console.log("✓ contact_information/main");

  await db.collection("homepage_content").doc("main").set(
    {
      heroTitle: "Where Nature Unites, Hearts Connect",
      heroSubtitle:
        "Stay by the Son River. Eat on our rooftop. Explore limestone wonders.",
      heroImage: "",
      heroEyebrow: "Phong Nha, Vietnam",
      heroPillars: ["Stay", "Eat & Drink", "Tours", "Community"],
      heroScrollHint: "Scroll",
      primaryCtaLabel: "Book on WhatsApp",
      primaryCtaMessageType: "book_room",
      secondaryCtaLabel: "Explore Tours",
      secondaryCtaLink: "/tours",
      whyChooseTitle: "Why Choose Us",
      whyChooseItems: [],
      featuredRoomIds: [],
      featuredTourIds: [],
      finalCtaTitle: "Ready for Sapa?",
      finalCtaSubtitle: "Message us on WhatsApp to plan your stay.",
      sections: {
        story: { title: "Our Story", subtitle: "", ctaLabel: "Read more" },
        accommodation: { title: "Stay With Us", subtitle: "", ctaLabel: "View all rooms" },
        tours: { title: "Tours & Experiences", subtitle: "", ctaLabel: "View all tours" },
        cafe: { title: "Eat & Drink", subtitle: "", ctaLabel: "" },
        activities: { title: "Social Activities", subtitle: "", ctaLabel: "View schedule" },
        reviews: { title: "Guest Reviews", subtitle: "", ctaLabel: "" },
        gallery: { title: "Gallery", subtitle: "", ctaLabel: "View gallery" },
        blog: { title: "From Our Blog", subtitle: "", ctaLabel: "Read blog" },
        contact: { title: "Find Us", subtitle: "", ctaLabel: "Contact us →" },
      },
      updatedAt: ts,
    },
    { merge: true }
  );
  console.log("✓ homepage_content/main");

  for (const locale of ["en", "vi"]) {
    await db.collection("page_content").doc(`${locale}_contact`).set(
      {
        pageKey: "contact",
        locale,
        heroTitle: locale === "vi" ? "Liên hệ" : "Contact",
        heroSubtitle: "",
        intro: "",
        metaTitle: "",
        metaDescription: "",
        ctaLabel: locale === "vi" ? "Chat WhatsApp" : "Chat on WhatsApp",
        labels: {
          getInTouch: locale === "vi" ? "Liên hệ" : "Get in touch",
          phone: locale === "vi" ? "Điện thoại" : "Phone",
          email: "Email",
          address: locale === "vi" ? "Địa chỉ" : "Address",
          hours: locale === "vi" ? "Giờ mở cửa" : "Opening hours",
          viewOnMap: locale === "vi" ? "Xem trên bản đồ" : "View on map",
        },
        updatedAt: ts,
      },
      { merge: true }
    );
    console.log(`✓ page_content/${locale}_contact`);
  }

  console.log("\nDone! Restart npm run dev and refresh the homepage.");
  console.log("For Admin CMS in the browser, also deploy rules: npm run firebase:login && npm run firebase:deploy");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});

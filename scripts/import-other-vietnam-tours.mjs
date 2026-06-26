/**
 * Import other Vietnam tours from the admin content brief.
 *
 * Usage:
 *   node --env-file=.env.local scripts/import-other-vietnam-tours.mjs --dry-run
 *   node --env-file=.env.local scripts/import-other-vietnam-tours.mjs
 *
 * This script only merges the listed tour documents. It does not delete or
 * overwrite unrelated Firestore data.
 */

import { initializeApp, cert, applicationDefault, getApps } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

const dryRun = process.argv.includes("--dry-run");

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    console.error(`Missing ${name} in .env.local`);
    process.exit(1);
  }
  return value;
}

function initAdmin() {
  if (getApps().length) return;

  const projectId = requireEnv("NEXT_PUBLIC_FIREBASE_PROJECT_ID");
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");

  initializeApp({
    credential:
      clientEmail && privateKey
        ? cert({ projectId, clientEmail, privateKey })
        : applicationDefault(),
    projectId,
  });
}

const tours = [
  {
    id: "dmz-phong-nha-to-hue-vinh-moc-tunnels",
    slug: "dmz-phong-nha-to-hue-vinh-moc-tunnels",
    title: "DMZ Tour: Phong Nha to Hue via Vinh Moc Tunnels",
    name: "DMZ Tour: Phong Nha to Hue via Vinh Moc Tunnels",
    description:
      "Turn the journey from Phong Nha to Hue into a meaningful historical experience with a guided visit to the Vinh Moc Tunnels and DMZ Museum. Hidden beneath the coastal countryside of Quang Tri Province, this underground village sheltered local families during the Vietnam War.",
    shortDescription:
      "A scenic transfer from Phong Nha to Hue with a guided stop at Vinh Moc Tunnels and the DMZ Museum.",
    duration: "Half Day",
    price: 0,
    priceFrom: 0,
    currency: "USD",
    heroLabel: "Historical Transfer",
    departure: "7:00 AM",
    returnTime: "Approximately 1:30 PM in Hue",
    overviewHeading: "More Than A Transfer",
    overviewText:
      "This route combines comfortable transportation with one of Central Vietnam's most fascinating historical sites. With an English-speaking guide, guests explore the tunnel network, visit the museum, and learn about the resilience of communities who lived through one of Vietnam's most challenging periods.",
    highlights: [
      "Transform the transfer from Phong Nha to Hue into a historical experience",
      "Explore Vinh Moc Tunnels, where an entire community lived underground",
      "Learn about the former DMZ and its role in Vietnam's history",
      "Visit the DMZ Museum with wartime stories, artifacts, and photographs",
      "Travel through the coastal landscapes of Quang Tri Province",
    ],
    timeline: [
      {
        time: "07:00",
        title: "Departure From Phong Nha",
        description:
          "Pick-up from your accommodation in Phong Nha and drive south toward Quang Tri Province.",
        icon: "bus",
      },
      {
        time: "Morning",
        title: "Vinh Moc Tunnels & DMZ Museum",
        description:
          "Meet the local guide, explore the tunnel network, visit living quarters and shelters, then continue to the nearby museum.",
        icon: "landmark",
      },
      {
        time: "Late Morning",
        title: "Continue To Hue",
        description:
          "Rejoin the bus and continue through Central Vietnam's countryside and coastal landscapes.",
        icon: "route",
      },
      {
        time: "13:30",
        title: "Arrival In Hue",
        description:
          "Drop-off at DMZ Bar & Restaurant, 60 Le Loi Street, close to Hue city centre.",
        icon: "map-pin",
      },
    ],
    included: [
      "Transfer from Phong Nha to Hue",
      "Entrance fee to Vinh Moc Tunnels",
      "English-speaking guide at Vinh Moc Tunnels",
      "Drinking water",
      "Comfortable tourist bus transportation",
    ],
    excluded: ["Meals", "Personal expenses", "Travel insurance", "Tips"],
    whatToBring: ["Comfortable shoes", "Hat", "Sunscreen", "Camera", "Personal essentials"],
    faq: [
      {
        question: "Can I continue to Hoi An on the same day?",
        answer:
          "Yes. Local buses from Hue to Hoi An usually have afternoon and evening departures, depending on availability.",
      },
      {
        question: "Is this tour only a transfer?",
        answer:
          "No. It is a transfer with a guided historical visit to Vinh Moc Tunnels and the DMZ Museum.",
      },
    ],
    images: [],
    galleryImages: [],
    featured: false,
    order: 60,
    published: true,
    seoTitle: "DMZ Tour From Phong Nha To Hue Via Vinh Moc Tunnels",
    seoDescription:
      "Travel from Phong Nha to Hue with a guided DMZ stop at Vinh Moc Tunnels, museum visit, water, entrance fees, and tourist bus transport.",
    ctaHeading: "Make The Journey To Hue Meaningful",
    ctaSubheading: "Message us for seats, departure details, and onward travel advice.",
    ctaImage: "",
  },
  {
    id: "easy-rider-phong-nha-khe-sanh-dmz-hue-2-days",
    slug: "easy-rider-phong-nha-khe-sanh-dmz-hue-2-days",
    title: "Easy Rider Central Vietnam Adventure: Phong Nha - Khe Sanh - DMZ - Hue",
    name: "Easy Rider Central Vietnam Adventure: Phong Nha - Khe Sanh - DMZ - Hue",
    description:
      "Discover Central Vietnam on a private 2-day Easy Rider motorbike adventure between Phong Nha, Khe Sanh, the DMZ, and Hue. Follow sections of the Ho Chi Minh Trail, visit historic war sites, remote villages, mountain roads, and coastal landscapes.",
    shortDescription:
      "A private 2-day Easy Rider journey between Phong Nha and Hue via Khe Sanh, the DMZ, and the Ho Chi Minh Trail.",
    duration: "2 Days / 1 Night",
    price: 80,
    priceFrom: 80,
    currency: "USD",
    priceUsdApprox: 80,
    heroLabel: "Private Motorbike Adventure",
    departure: "Flexible",
    returnTime: "Late afternoon on day 2",
    overviewHeading: "Ho Chi Minh Trail & DMZ By Easy Rider",
    overviewText:
      "This route is a cultural, historical, and scenic journey across Central Vietnam. Ride with an experienced local driver as a passenger, stay overnight in Khe Sanh, and explore mountain landscapes, ethnic minority villages, DMZ landmarks, and Vietnam War history.",
    highlights: [
      "Ride the legendary Ho Chi Minh Trail west and east sections",
      "Explore remote ethnic minority villages and mountain landscapes",
      "Visit Khe Sanh Combat Base and Ta Con Airfield Museum",
      "Discover Vinh Moc Tunnels, Hien Luong Bridge, and Ben Hai River",
      "Pay respects at Truong Son National Cemetery",
      "Private Easy Rider with experienced local driver",
    ],
    timeline: [
      {
        time: "Day 1",
        title: "Phong Nha - Ho Chi Minh Trail - Khe Sanh",
        description:
          "Hotel pick-up in Phong Nha, ride the West Ho Chi Minh Trail through mountains and jungle, stop at villages and viewpoints, then arrive in Khe Sanh.",
        icon: "route",
      },
      {
        time: "Day 1",
        title: "Khe Sanh History",
        description:
          "Visit Khe Sanh Combat Base and Ta Con Airfield Museum before overnighting in Khe Sanh.",
        icon: "landmark",
      },
      {
        time: "Day 2",
        title: "Khe Sanh - DMZ - Hue",
        description:
          "Visit DMZ sites such as Truong Son National Cemetery, Hien Luong Bridge, Ben Hai River, and Vinh Moc Tunnels.",
        icon: "map-pin",
      },
      {
        time: "Day 2",
        title: "Scenic Ride Into Hue",
        description: "Continue along coastal and countryside roads, arriving in Hue in the late afternoon.",
        icon: "bike",
      },
    ],
    included: [
      "Private Easy Rider motorbike and experienced driver",
      "Hotel pick-up and drop-off in Phong Nha or Hue",
      "1-night accommodation in Khe Sanh",
      "Helmet and raincoat",
      "Fuel",
      "Entrance fees if included in selected package",
    ],
    excluded: ["Meals and drinks", "Personal expenses", "Travel insurance", "Tips"],
    whatToBring: [
      "Comfortable clothes and shoes",
      "Sunscreen and insect repellent",
      "Water bottle",
      "Hat and camera",
      "Light rain jacket",
    ],
    faq: [
      {
        question: "Can this route run in reverse?",
        answer: "Yes. The tour can run from Hue to DMZ, Khe Sanh, and Phong Nha.",
      },
      {
        question: "Do I need motorbike riding experience?",
        answer:
          "No. This tour is suitable for passengers riding behind an experienced local Easy Rider driver.",
      },
      {
        question: "How far is the route?",
        answer: "The full journey is approximately 500km over 2 days.",
      },
    ],
    images: [],
    galleryImages: [],
    featured: false,
    order: 61,
    published: true,
    childDiscountNote: "Suitable for passengers. No riding experience required.",
    seoTitle: "Easy Rider Phong Nha To Hue 2 Day Tour Via DMZ & Khe Sanh",
    seoDescription:
      "Private 2-day Easy Rider tour between Phong Nha and Hue via Khe Sanh, DMZ sites, Vinh Moc Tunnels, and the Ho Chi Minh Trail.",
    ctaHeading: "Ride The Real Central Vietnam",
    ctaSubheading: "Message us for route options, weather advice, and Easy Rider availability.",
    ctaImage: "",
  },
  {
    id: "easy-rider-hoi-an-hue-dmz-khe-sanh-phong-nha-3-days",
    slug: "easy-rider-hoi-an-hue-dmz-khe-sanh-phong-nha-3-days",
    title: "Easy Rider Central Vietnam Adventure: Hoi An - Hue - DMZ - Khe Sanh - Phong Nha",
    name: "Easy Rider Central Vietnam Adventure: Hoi An - Hue - DMZ - Khe Sanh - Phong Nha",
    description:
      "A complete 3-day Easy Rider adventure connecting Hoi An, Hue, the DMZ, Khe Sanh, and Phong Nha. Travel as a passenger with a local driver through mountain passes, countryside roads, war history sites, ethnic villages, and coastal landscapes.",
    shortDescription:
      "A 3-day private Easy Rider route linking Hoi An, Hue, DMZ, Khe Sanh, and Phong Nha with the Hai Van Pass and Ho Chi Minh Trail.",
    duration: "3 Days / 2 Nights",
    price: 80,
    priceFrom: 80,
    currency: "USD",
    priceUsdApprox: 80,
    heroLabel: "Central Vietnam Easy Rider",
    departure: "Flexible",
    returnTime: "Flexible by route",
    overviewHeading: "Hoi An, Hue, DMZ & Phong Nha In One Route",
    overviewText:
      "From Hoi An's lantern town to Hue's imperial heritage and the jungle landscapes of Phong Nha, this Easy Rider journey connects some of Central Vietnam's strongest cultural, historical, and natural highlights.",
    highlights: [
      "Ride the legendary Ho Chi Minh Trail",
      "Cross the famous Hai Van Pass",
      "Explore Marble Mountains and countryside villages",
      "Visit Hue Imperial City as an optional stop",
      "Discover DMZ historical sites including Vinh Moc Tunnels",
      "Explore Khe Sanh Combat Base and Ta Con Airfield Museum",
      "Swim in hidden jungle springs and waterfalls when conditions allow",
    ],
    timeline: [
      {
        time: "Day 1",
        title: "Hoi An - Hai Van Pass - Hue",
        description:
          "Optional Marble Mountains stop, scenic Hai Van Pass ride, Lang Co Beach and lagoon, then overnight in Hue.",
        icon: "bike",
      },
      {
        time: "Day 2",
        title: "Hue - DMZ - Khe Sanh",
        description:
          "Visit Vinh Moc Tunnels, Hien Luong Bridge, Ben Hai River, optional Quang Tri Citadel, Rock Pile, Dakrong Bridge, and overnight in Khe Sanh.",
        icon: "landmark",
      },
      {
        time: "Day 3",
        title: "Khe Sanh - Ho Chi Minh Trail - Phong Nha",
        description:
          "Visit Khe Sanh Combat Base, ride jungle roads, stop at waterfalls and ethnic minority villages, then arrive in Phong Nha.",
        icon: "route",
      },
    ],
    included: [
      "Private Easy Rider motorbike and driver",
      "Hotel pick-up and drop-off",
      "2 nights accommodation in Hue and Khe Sanh",
      "Helmet and raincoat",
      "Fuel",
      "Local support during the trip",
    ],
    excluded: ["Meals and drinks", "Entrance fees", "Personal expenses", "Travel insurance", "Tips"],
    whatToBring: ["Comfortable clothes", "Sunscreen and sunglasses", "Camera", "Light jacket", "Swimwear"],
    faq: [
      {
        question: "Can the route run from Phong Nha to Hoi An?",
        answer: "Yes. The same itinerary can run in reverse from Phong Nha to Khe Sanh, Hue, and Hoi An.",
      },
      {
        question: "How far is the route?",
        answer: "The route is approximately 600-800km depending on selected stops.",
      },
      {
        question: "Are the stops flexible?",
        answer:
          "Yes. Stops can be adjusted based on weather, timing, guest preference, and safety conditions.",
      },
    ],
    images: [],
    galleryImages: [],
    featured: false,
    order: 62,
    published: true,
    childDiscountNote: "Suitable for passengers. Self-riding is not required.",
    seoTitle: "Easy Rider Hoi An To Phong Nha 3 Day Tour Via Hue & DMZ",
    seoDescription:
      "Private 3-day Easy Rider adventure from Hoi An to Phong Nha via Hue, DMZ, Khe Sanh, Hai Van Pass, and Ho Chi Minh Trail.",
    ctaHeading: "Connect Central Vietnam The Scenic Way",
    ctaSubheading: "Message us for reverse routes, driver availability, and route planning.",
    ctaImage: "",
  },
  {
    id: "ninh-binh-bai-dinh-hoa-lu-trang-an-mua-cave-day-tour",
    slug: "ninh-binh-bai-dinh-hoa-lu-trang-an-mua-cave-day-tour",
    title: "Ninh Binh Day Tour: Bai Dinh - Hoa Lu - Trang An - Mua Cave",
    name: "Ninh Binh Day Tour: Bai Dinh - Hoa Lu - Trang An - Mua Cave",
    description:
      "Discover the best of Ninh Binh in one day with ancient history, Buddhist temples, limestone landscapes, a Trang An boat trip, and the panoramic Mua Cave viewpoint.",
    shortDescription:
      "A full-day small group Ninh Binh tour with Bai Dinh, Hoa Lu, Trang An boat trip, Mua Cave, buffet lunch, and transfers.",
    duration: "1 Day",
    price: 0,
    priceFrom: 0,
    currency: "USD",
    heroLabel: "Small Group Day Tour",
    departure: "8:30 AM",
    returnTime: "Approximately 5:30 PM",
    overviewHeading: "History, Temples, Boats & Mountain Views",
    overviewText:
      "This Ninh Binh day tour combines Vietnam's ancient capital, one of Southeast Asia's largest Buddhist complexes, a peaceful boat journey through limestone mountains, and a rewarding hike to one of the region's most iconic viewpoints.",
    highlights: [
      "Hoa Lu Ancient Capital",
      "Bai Dinh Pagoda, one of Southeast Asia's largest Buddhist complexes",
      "Trang An UNESCO World Heritage boat trip",
      "Mua Cave viewpoint hike",
      "Vietnamese buffet lunch included",
      "Comfortable limousine transfer",
    ],
    timeline: [
      {
        time: "08:30",
        title: "Pick-Up In Ninh Binh",
        description: "Pick-up from hotel, hostel, office, or requested location in Ninh Binh.",
        icon: "bus",
      },
      {
        time: "09:15",
        title: "Hoa Lu Ancient Capital",
        description: "Visit Vietnam's first capital and the temples of King Dinh and King Le.",
        icon: "landmark",
      },
      {
        time: "10:45",
        title: "Bai Dinh Pagoda",
        description: "Explore the large Buddhist complex, giant statues, and peaceful spiritual atmosphere.",
        icon: "landmark",
      },
      {
        time: "12:50",
        title: "Buffet Lunch",
        description: "Enjoy lunch at a local restaurant with vegetarian options available.",
        icon: "utensils",
      },
      {
        time: "14:15",
        title: "Trang An Boat Trip",
        description: "Ride by sampan through caves, rivers, and limestone mountains.",
        icon: "ship",
      },
      {
        time: "15:45",
        title: "Mua Cave Viewpoint",
        description: "Climb around 500 steps for panoramic views over Tam Coc valley.",
        icon: "mountain",
      },
      {
        time: "17:30",
        title: "Drop-Off In Ninh Binh",
        description: "Return transfer and end of tour.",
        icon: "map-pin",
      },
    ],
    included: [
      "Limousine transfer",
      "English-speaking guide",
      "Small group tour",
      "Buffet lunch",
      "Entrance fees",
      "Trang An boat trip",
      "2 bottles of water per person",
    ],
    excluded: ["Drinks during meals", "Personal expenses", "Travel insurance", "Tips"],
    whatToBring: ["Comfortable shoes", "Hat", "Sunscreen", "Camera", "Water bottle"],
    faq: [
      {
        question: "Is pick-up available in Ninh Binh?",
        answer: "Yes. Pick-up and drop-off can be arranged from an office, hostel, hotel, or requested location.",
      },
      {
        question: "Is there a private option?",
        answer: "Yes. Contact us for group and private tour pricing.",
      },
    ],
    images: [],
    galleryImages: [],
    featured: false,
    order: 63,
    published: true,
    seoTitle: "Ninh Binh Day Tour Bai Dinh Hoa Lu Trang An Mua Cave",
    seoDescription:
      "Small group Ninh Binh day tour with Bai Dinh Pagoda, Hoa Lu Ancient Capital, Trang An boat trip, Mua Cave, buffet lunch, and transfers.",
    ctaHeading: "See Ninh Binh In One Day",
    ctaSubheading: "Message us for group or private options and real-time best price.",
    ctaImage: "",
  },
  {
    id: "ha-long-bay-cruise-tours-from-hanoi",
    slug: "ha-long-bay-cruise-tours-from-hanoi",
    title: "Ha Long Bay Cruise Tours From Hanoi",
    name: "Ha Long Bay Cruise Tours From Hanoi",
    description:
      "Discover Ha Long Bay with day trip, overnight, and luxury cruise options from Hanoi. Cruise through emerald water and limestone islands with kayaking, cave visits, meals, transfers, and English-speaking guides available by package.",
    shortDescription:
      "Ha Long Bay day cruises, overnight cruises, and luxury upgrades from Hanoi with transfer, meals, kayaking, and cave visits.",
    duration: "1 Day / 2 Days 1 Night",
    price: 50,
    priceFrom: 50,
    currency: "USD",
    priceUsdApprox: 50,
    heroLabel: "UNESCO Cruise Experience",
    departure: "Morning from Hanoi Old Quarter",
    returnTime: "Varies by cruise option",
    overviewHeading: "Vietnam's Iconic Bay Experience",
    overviewText:
      "Ha Long Bay is famous for emerald waters and thousands of limestone islands rising from the sea. Choose a day cruise for a compact experience, an overnight cruise for sunset and sunrise on the bay, or a luxury upgrade with balcony cabins and premium service.",
    highlights: [
      "UNESCO World Heritage Site experience",
      "Comfortable limousine transfer from Hanoi",
      "Day trip and overnight cruise options",
      "Kayaking or bamboo boat activities",
      "Cave visits and limestone island scenery",
      "Vietnamese seafood meals by package",
    ],
    timeline: [
      {
        time: "Morning",
        title: "Pick-Up From Hanoi",
        description: "Pick-up from Hanoi Old Quarter and transfer by limousine for around 2.5-3 hours.",
        icon: "bus",
      },
      {
        time: "Midday",
        title: "Board The Cruise",
        description: "Welcome drink, check-in, safety briefing, and begin cruising through Ha Long Bay.",
        icon: "ship",
      },
      {
        time: "Afternoon",
        title: "Bay Activities",
        description: "Kayaking or bamboo boat, cave visits, limestone islands, and swimming when weather permits.",
        icon: "waves",
      },
      {
        time: "Meals",
        title: "Lunch Or Overnight Meals",
        description: "Enjoy Vietnamese seafood lunch. Overnight cruises include additional meals by package.",
        icon: "utensils",
      },
      {
        time: "Overnight Option",
        title: "Sunset & Sunrise",
        description: "Relax on the sundeck and enjoy sunset and sunrise views on overnight cruises.",
        icon: "sun",
      },
      {
        time: "Return",
        title: "Transfer Back To Hanoi",
        description: "Cruise ends and transfer returns guests to Hanoi.",
        icon: "map-pin",
      },
    ],
    included: [
      "Limousine transfer round trip from Hanoi by package",
      "Cruise accommodation if overnight",
      "English-speaking guide",
      "Entrance fees",
      "Meals as mentioned by package",
      "Kayaking or bamboo boat",
      "Drinking water onboard",
    ],
    excluded: [
      "Drinks not included in meals",
      "Personal expenses",
      "Travel insurance",
      "Tips",
      "Single supplement if any",
    ],
    whatToBring: ["Passport or ID", "Comfortable clothes", "Swimwear", "Sunscreen and hat", "Camera", "Light jacket in winter"],
    faq: [
      {
        question: "What cruise options are available?",
        answer:
          "Common options include 1-day cruises, 2D1N overnight cruises, and luxury cruise upgrades with balcony cabin options.",
      },
      {
        question: "What are typical prices?",
        answer:
          "Day tours often range from 50-120 USD, overnight cruises from 120-250 USD, and luxury cruises from 250-500+ USD depending on package.",
      },
    ],
    images: [],
    galleryImages: [],
    featured: false,
    order: 64,
    published: true,
    seoTitle: "Ha Long Bay Cruise Tours From Hanoi | Day & Overnight Cruises",
    seoDescription:
      "Book Ha Long Bay cruise tours from Hanoi with day trip, overnight, and luxury cruise options, transfers, meals, kayaking, and cave visits.",
    ctaHeading: "Book Your Ha Long Bay Cruise",
    ctaSubheading: "Message us for best deals, live availability, and fast confirmation.",
    ctaImage: "",
  },
  {
    id: "ha-giang-loop-motorbike-adventure",
    slug: "ha-giang-loop-motorbike-adventure",
    title: "Ha Giang Loop Motorbike Adventure",
    name: "Ha Giang Loop Motorbike Adventure",
    description:
      "Experience one of Vietnam's most dramatic mountain routes with trusted local Ha Giang operators. Choose 3D2N or 4D3N options with Easy Rider, self-ride, or seat-behind riding styles, homestay stays, and small group departures.",
    shortDescription:
      "Ha Giang Loop 3D2N and 4D3N adventures with Easy Rider, self-ride, trusted operators, homestays, and mountain landscapes.",
    duration: "3 Days 2 Nights / 4 Days 3 Nights",
    price: 120,
    priceFrom: 120,
    currency: "USD",
    priceUsdApprox: 120,
    heroLabel: "Northern Vietnam Motorbike Adventure",
    departure: "Daily by availability",
    returnTime: "Varies by route",
    overviewHeading: "The Most Epic Motorbike Adventure In Vietnam",
    overviewText:
      "Ride through dramatic limestone peaks, deep valleys, ethnic minority villages, and the legendary Ma Pi Leng Pass. Green Riverside helps compare trusted licensed operators and coordinate the best option for your travel date and riding style.",
    highlights: [
      "Choose 3 days 2 nights or 4 days 3 nights",
      "Easy Rider, self-ride, or seat behind a friend options",
      "Local homestay experience",
      "Ma Pi Leng Pass, Dong Van, Meo Vac, and mountain viewpoints",
      "Trusted licensed local operators",
      "WhatsApp booking support and price comparison",
    ],
    timeline: [
      {
        time: "3D2N Option",
        title: "Classic Loop",
        description:
          "A popular route through Dong Van, Ma Pi Leng, Meo Vac, scenic mountain passes, ethnic villages, and 2 nights in local homestays.",
        icon: "route",
      },
      {
        time: "4D3N Option",
        title: "Full Experience",
        description:
          "A slower route with more hidden villages, viewpoints, cultural immersion, and photography time.",
        icon: "mountain",
      },
      {
        time: "Riding Options",
        title: "Choose Your Style",
        description:
          "Easy Rider is recommended for safety and comfort. Self-ride is only for experienced riders with suitable licensing and confidence.",
        icon: "bike",
      },
    ],
    included: [
      "Local operator coordination",
      "Homestay accommodation by package",
      "Motorbike option by selected package",
      "Small group departure by selected operator",
      "Local support during booking",
    ],
    excluded: [
      "Personal expenses",
      "Travel insurance",
      "Tips",
      "Items not mentioned in the selected operator package",
    ],
    whatToBring: [
      "Warm layers",
      "Rain jacket",
      "Comfortable clothes",
      "Passport or ID",
      "Camera",
      "Sunscreen",
      "Small overnight bag",
    ],
    faq: [
      {
        question: "Which riding option is safest?",
        answer:
          "Easy Rider is usually the safest and most comfortable choice because you ride with an experienced local driver.",
      },
      {
        question: "Which operators can be arranged?",
        answer:
          "We work with trusted licensed partners such as Jasmine Tours, Mama's Tours, Buffalo Tours, Motor Adventure Vietnam, or equivalent operators based on availability.",
      },
      {
        question: "How do I book?",
        answer:
          "Message us with your preferred 3D2N or 4D3N option, riding style, and travel date. We will recommend the best available operator and price.",
      },
    ],
    images: [],
    galleryImages: [],
    featured: false,
    order: 65,
    published: true,
    childDiscountNote: "Self-ride is recommended only for experienced riders.",
    seoTitle: "Ha Giang Loop 3D2N & 4D3N Motorbike Adventure",
    seoDescription:
      "Book Ha Giang Loop 3D2N or 4D3N adventures with Easy Rider, self-ride options, homestays, trusted local operators, and WhatsApp support.",
    ctaHeading: "Plan Your Ha Giang Loop",
    ctaSubheading: "Message us with travel dates, route length, and riding style for best operator matching.",
    ctaImage: "",
  },
];

async function main() {
  initAdmin();
  const db = getFirestore();

  console.log(`Mode: ${dryRun ? "dry run" : "write"}\n`);

  for (const tour of tours) {
    const payload = {
      ...tour,
      updatedAt: FieldValue.serverTimestamp(),
      createdAt: FieldValue.serverTimestamp(),
    };

    if (dryRun) {
      console.log(`WOULD IMPORT tours/${tour.id}`);
      console.log(`  Title: ${tour.title}`);
      console.log(`  Slug: ${tour.slug}`);
      console.log(`  Price from: ${tour.priceFrom} ${tour.currency}`);
      console.log(`  Highlights: ${tour.highlights.length}`);
      console.log(`  Timeline items: ${tour.timeline.length}`);
      continue;
    }

    await db.collection("tours").doc(tour.id).set(payload, { merge: true });
    console.log(`Imported tours/${tour.id}`);
  }

  console.log("\nDone.");
}

main().catch((err) => {
  console.error("\nImport failed:", err.message || err);
  process.exit(1);
});

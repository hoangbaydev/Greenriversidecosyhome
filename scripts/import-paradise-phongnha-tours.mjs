/**
 * Import tours extracted from:
 * C:\Users\HOANG BAY DEV\Downloads\Paradise Cave 7km Exploration 1 Day Tour.docx
 *
 * Usage:
 *   node --env-file=.env.local scripts/import-paradise-phongnha-tours.mjs
 *   node --env-file=.env.local scripts/import-paradise-phongnha-tours.mjs --dry-run
 *
 * Requires one of:
 * - FIREBASE_ADMIN_CLIENT_EMAIL + FIREBASE_ADMIN_PRIVATE_KEY in .env.local
 * - OR Application Default Credentials.
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
    id: "paradise-cave-7km-exploration-1-day",
    slug: "paradise-cave-7km-exploration-1-day",
    title: "Paradise Cave 7km Exploration 1 Day Tour",
    name: "Paradise Cave 7km Exploration 1 Day Tour",
    description:
      "Discover one of the most extraordinary cave adventures in Phong Nha - Ke Bang National Park. While regular visitors can explore only the first 1km of Paradise Cave along the wooden boardwalk, this exclusive expedition takes you 7km deep into the heart of the cave system. Trek, kayak, crawl through narrow passages, visit the famous Heaven Well doline, and enjoy lunch beside an underground stream deep inside the cave.",
    shortDescription:
      "A challenging full-day expedition 7km deep inside Paradise Cave, with trekking, kayaking, underground streams, Heaven Well, and lunch inside the cave.",
    duration: "1 Day",
    price: 0,
    priceFrom: 0,
    currency: "VND",
    priceUsdApprox: undefined,
    heroLabel: "Challenging Cave Expedition",
    departure: "7:30 AM",
    returnTime: "Approximately 4:00 PM",
    overviewHeading: "Beyond The Tourist Route",
    overviewText:
      "Paradise Cave was discovered by a local man in 2005 and later surveyed by the British Cave Research Association. Stretching over 31km, it is the longest dry cave in Phong Nha - Ke Bang National Park. This adventure goes far beyond the standard 1km tourist boardwalk into vast underground chambers, spectacular stalactite and stalagmite formations, hidden streams, cave wildlife habitats, and the famous Heaven Well doline.",
    highlights: [
      "Explore 7km deep inside Paradise Cave beyond the standard tourist route",
      "Discover spectacular cave chambers, limestone formations, and cave wildlife",
      "Trek, climb, and kayak through untouched underground landscapes",
      "Visit the famous Heaven Well doline deep inside the cave",
      "Enjoy a unique underground lunch beside a natural stream",
    ],
    timeline: [
      {
        time: "7:30 AM",
        title: "Pick-Up in Phong Nha",
        description:
          "Guests staying in Phong Nha are collected from their accommodation and transferred to Paradise Cave.",
        icon: "bus",
      },
      {
        time: "8:20 AM",
        title: "Safety Briefing & Equipment Check",
        description:
          "Meet your guide and cave support team for a safety briefing and equipment fitting before beginning the adventure.",
        icon: "shield",
      },
      {
        time: "8:30 AM",
        title: "Start the Adventure",
        description:
          "Take an electric buggy through the forest, hike to the cave entrance, then explore the first 1km of Paradise Cave along the wooden boardwalk.",
        icon: "map-pin",
      },
      {
        time: "9:00 AM - 10:30 AM",
        title: "Explore the First 4km",
        description:
          "Leave the tourist section behind and venture deeper into the cave through vast underground chambers before crossing sections of the underground river.",
        icon: "footprints",
      },
      {
        time: "10:30 AM - 12:00 PM",
        title: "Kayaking & Cave Exploration",
        description:
          "Continue through underground streams and cave passages by kayak, then arrive at Heaven Well for photos and a short rest.",
        icon: "ship",
      },
      {
        time: "12:00 PM - 1:00 PM",
        title: "Underground Lunch",
        description:
          "Enjoy a freshly prepared lunch beside the underground stream at the 7km point of the cave.",
        icon: "utensils",
      },
      {
        time: "1:00 PM - 3:00 PM",
        title: "Return Journey",
        description:
          "Trek back through the cave, retracing your route while seeing the formations and underground landscapes from a different perspective.",
        icon: "route",
      },
      {
        time: "3:00 PM",
        title: "Exit Paradise Cave",
        description:
          "Return to the cave entrance and transfer back to the reception area by electric buggy.",
        icon: "home",
      },
      {
        time: "4:00 PM",
        title: "Arrive Back in Phong Nha",
        description: "Drop-off at your accommodation. End of tour.",
        icon: "map-pin",
      },
    ],
    included: [
      "Experienced English-speaking guide & porters",
      "Lunch inside the cave (vegetarian options available upon request)",
      "Paradise Cave entrance ticket",
      "Electric buggy transfer",
      "Drinking water",
      "Safety equipment and protective gear",
      "Hotel pick-up and drop-off",
    ],
    excluded: ["Personal expenses", "Travel insurance"],
    whatToBring: [
      "Long trousers",
      "Good trekking shoes",
      "Swimwear (under your clothes)",
      "Small travel towel or sarong",
      "Change of clothes",
      "Waterproof bag for personal belongings (optional)",
      "Personal essentials: camera, sunscreen, insect repellent, and personal medication if required",
    ],
    faq: [
      {
        question: "Who is this tour suitable for?",
        answer:
          "This is a challenging adventure suitable for adventurous travelers aged 15-60 with a good level of fitness.",
      },
      {
        question: "Who should not join this tour?",
        answer:
          "It is not recommended for elderly travelers, guests with limited mobility, heart conditions, high blood pressure, or other serious health concerns.",
      },
      {
        question: "What activities are involved?",
        answer:
          "The tour involves trekking, climbing uneven terrain, stream crossings, kayaking, crawling through narrow passages, and extended cave exploration.",
      },
      {
        question: "Is lunch included?",
        answer:
          "Yes. A freshly prepared lunch is served beside an underground stream deep inside the cave.",
      },
    ],
    images: [],
    galleryImages: [],
    featured: true,
    order: 20,
    published: true,
    childDiscountNote: "Minimum recommended age: 15 years old.",
    seoTitle: "Paradise Cave 7km Exploration 1 Day Tour | Phong Nha",
    seoDescription:
      "A challenging full-day Paradise Cave expedition 7km deep with trekking, kayaking, Heaven Well, underground streams, and lunch inside the cave.",
    ctaHeading: "Ready For A Real Cave Expedition?",
    ctaSubheading:
      "Message us on WhatsApp for availability, fitness requirements, and direct booking support.",
    ctaImage: "",
  },
  {
    id: "phong-nha-cave-45km-exploration-kayaking",
    slug: "phong-nha-cave-45km-exploration-kayaking",
    title: "Phong Nha Cave 4.5km Exploration Kayaking Tour",
    name: "Phong Nha Cave 4.5km Exploration Kayaking Tour",
    description:
      "Go beyond the regular tourist route and discover the hidden depths of Phong Nha Cave on this exciting full-day adventure. Paddle along the underground river, explore magnificent cave chambers, admire limestone formations millions of years old, visit Bi Ky Cave, discover traces of ancient Champa culture, trek through dry passages, and relax at a hidden underground sandbank deep inside the cave.",
    shortDescription:
      "A full-day moderate adventure exploring 4.5km inside Phong Nha Cave by kayak and on foot, with Bi Ky Cave, underground river, lunch, and a hidden sandbank.",
    duration: "1 Day",
    price: 1700000,
    priceFrom: 1700000,
    currency: "VND",
    priceUsdApprox: 67,
    heroLabel: "Moderate Kayaking Adventure",
    departure: "8:30 AM",
    returnTime: "Approximately 3:30 PM",
    overviewHeading: "Kayak Deep Inside Phong Nha Cave",
    overviewText:
      "While most visitors explore only the first section of Phong Nha Cave by traditional dragon boat, this experience takes you 4.5km deep into the cave system by kayak and on foot. Combining kayaking, trekking, cave exploration, swimming, and underground discovery, it is one of the most immersive adventure tours in Phong Nha.",
    highlights: [
      "Go beyond the regular tourist route and explore 4.5km deep inside Phong Nha Cave",
      "Paddle through the spectacular underground river system by kayak",
      "Visit Bi Ky Cave and discover traces of ancient Champa culture",
      "Trek through impressive cave chambers and dry passages",
      "Relax and swim at a hidden underground sandbank",
      "Experience one of the most adventurous cave tours in Phong Nha",
    ],
    timeline: [
      {
        time: "08:30 - 09:00",
        title: "Hotel Pick-up",
        description:
          "Guests are collected from their accommodation in Phong Nha and transferred to the Phong Nha Tourism Centre.",
        icon: "bus",
      },
      {
        time: "09:00 - 09:30",
        title: "Safety Briefing & Equipment Check",
        description:
          "Meet your guide, receive a full safety briefing, sign the participation waiver, and get fitted with kayaking and safety equipment.",
        icon: "shield",
      },
      {
        time: "09:30 - 10:00",
        title: "Transfer to Phong Nha Cave",
        description:
          "Travel by boat along the Son River to the entrance of Phong Nha Cave before beginning the kayaking adventure.",
        icon: "ship",
      },
      {
        time: "10:00 - 10:30",
        title: "Begin the Cave Exploration",
        description:
          "Start kayaking along the underground river and venture deep into the cave system, surrounded by limestone formations.",
        icon: "ship",
      },
      {
        time: "10:30 - 11:00",
        title: "Explore Bi Ky Cave",
        description:
          "Visit one of the most significant chambers inside Phong Nha Cave, known for impressive formations and traces of ancient Champa culture.",
        icon: "landmark",
      },
      {
        time: "11:00 - 11:30",
        title: "Venture Deeper Into the Cave",
        description:
          "Continue kayaking beyond the regular tourist route into darker sections where artificial lighting disappears.",
        icon: "route",
      },
      {
        time: "11:30 - 12:00",
        title: "Cave Trekking Adventure",
        description:
          "Leave the kayaks behind and continue exploring on foot through rocky passages and impressive cave chambers.",
        icon: "footprints",
      },
      {
        time: "12:00 - 13:00",
        title: "Underground Lunch Break",
        description:
          "Enjoy a picnic lunch and refreshments deep inside the cave while surrounded by limestone formations.",
        icon: "utensils",
      },
      {
        time: "13:00 - 14:00",
        title: "Hidden Sandbank Experience",
        description:
          "Reach a beautiful underground sandbank located deep within the cave system. Relax, swim, and enjoy the atmosphere.",
        icon: "waves",
      },
      {
        time: "14:00 - 15:00",
        title: "Return Journey by Kayak",
        description:
          "Paddle back through the underground river while admiring the cave from a different perspective.",
        icon: "ship",
      },
      {
        time: "15:00 - 15:30",
        title: "Explore Additional Chambers",
        description:
          "Before exiting, visit Tien Cave and the impressive Royal Court Chamber (Cung Dinh).",
        icon: "landmark",
      },
      {
        time: "15:30",
        title: "Return to Phong Nha",
        description: "Transfer back to your accommodation. End of tour.",
        icon: "home",
      },
    ],
    included: [
      "Experienced English-speaking guide",
      "Phong Nha Cave entrance ticket",
      "Boat transfer to and from the cave",
      "Kayak equipment (2 guests per kayak)",
      "Helmet, life jacket, headlamp, and safety equipment",
      "Drinking water and snacks",
      "Picnic lunch inside the cave",
      "Hotel pick-up and drop-off in Phong Nha",
      "Travel insurance",
    ],
    excluded: ["Personal expenses", "Additional food and beverages"],
    whatToBring: [
      "Swimwear",
      "Quick-dry clothing",
      "Water shoes or trekking sandals",
      "Small towel",
      "Change of clothes",
      "Waterproof bag for personal belongings",
      "Personal essentials: camera, sunscreen, and personal medication if required",
    ],
    faq: [
      {
        question: "What is the minimum age?",
        answer: "Children must be at least 10 years old to participate.",
      },
      {
        question: "Do I need to know how to swim?",
        answer:
          "Participants should be comfortable with kayaking and basic swimming. Safety equipment is provided and must be worn throughout the tour.",
      },
      {
        question: "Can the itinerary change?",
        answer:
          "Yes. The itinerary may be adjusted depending on weather, river conditions, and safety conditions.",
      },
      {
        question: "Does the tour operate year-round?",
        answer:
          "The tour operates year-round, subject to river and safety conditions.",
      },
    ],
    images: [],
    galleryImages: [],
    featured: true,
    order: 21,
    published: true,
    childDiscountNote: "Minimum age: 10 years old.",
    seoTitle: "Phong Nha Cave 4.5km Exploration Kayaking Tour",
    seoDescription:
      "Explore 4.5km inside Phong Nha Cave by kayak and on foot with Bi Ky Cave, underground river, lunch, and a hidden sandbank.",
    ctaHeading: "Kayak Beyond The Regular Route",
    ctaSubheading:
      "Message us on WhatsApp to check availability, river conditions, and direct booking details.",
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

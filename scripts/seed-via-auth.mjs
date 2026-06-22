/**
 * Seed CMS via admin login (no service account required).
 * Usage: node --env-file=.env.local scripts/seed-via-auth.mjs
 */

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  deleteDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import {
  WHY_CHOOSE_ITEMS,
  getStoryContent,
  getCafeContent,
  ROOMS,
} from "./content/from-docx.mjs";
import { CLASSIC_TOURS, ADVENTURE_TOURS } from "./content/brochure-tours.mjs";

const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || "admin@greenriversidecosyhome.com";
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || "admin123@";
const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const ts = () => serverTimestamp();

const local = (name) => `/images/samples/${name}.webp`;

const IMG = {
  cave: local("cave"),
  caveAlt: local("cave-alt"),
  jungle: local("jungle"),
  garden: local("garden"),
  boat: local("boat"),
  mountains: local("mountains"),
  river: local("river"),
  room: local("room"),
  roomAlt: local("room-alt"),
  rooftop: local("rooftop"),
  lunch: local("lunch"),
  sunset: local("sunset"),
  community: local("community"),
  homestay: local("homestay"),
  pool: local("pool"),
  hero: local("hero"),
};

async function set(path, data) {
  await setDoc(doc(db, ...path.split("/")), { ...data, updatedAt: ts() }, { merge: true });
  console.log(`✓ ${path}`);
}

async function upsert(collectionName, id, data) {
  await setDoc(
    doc(db, collectionName, id),
    { ...data, id, updatedAt: ts() },
    { merge: true }
  );
  console.log(`✓ ${collectionName}/${id}`);
}

const PAGE_HERO = {
  stay: IMG.room,
  tours: IMG.cave,
  "our-story": IMG.homestay,
  "eat-drink": IMG.rooftop,
  transportation: IMG.boat,
  "social-activities": IMG.community,
  contact: IMG.sunset,
  gallery: IMG.mountains,
  blog: IMG.jungle,
};

const PAGE_LABELS = {
  en: {
    stay: { priceFrom: "From", perNight: "/ night", viewDetails: "View details", bookRoom: "Book this room" },
    tours: { viewDetails: "View details", startingFrom: "From", bookTour: "Book this tour" },
  },
  vi: {
    stay: { priceFrom: "Từ", perNight: "/ đêm", viewDetails: "Xem chi tiết", bookRoom: "Đặt phòng này" },
    tours: { viewDetails: "Xem chi tiết", startingFrom: "Từ", bookTour: "Đặt tour này" },
  },
};

async function main() {
  console.log("Signing in as admin...");
  await signInWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
  console.log("Authenticated.\nSeeding Firestore...\n");

  await set("site_settings/main", {
    siteName: "Green Riverside Cosy Home",
    tagline: "Come as our guest, leave as our family.",
    logoUrl: "/logo.png",
    whatsappNumber: whatsapp,
    phone: "+84 77 850 8898",
    email: "greenriverphongnha@gmail.com",
    address: "Son River, Phong Nha, Quang Binh, Vietnam",
    googleMapsUrl: "https://maps.app.goo.gl/ziWqMez9fChLCKNJ7",
    bookNowLabel: "Book Now",
    socialLinks: {
      facebook: "https://facebook.com/",
      instagram: "https://instagram.com/",
      tiktok: "https://tiktok.com/",
      youtube: "https://youtube.com/",
      tripadvisor: "https://tripadvisor.com/",
    },
    seo: {
      defaultTitle: "Green Riverside Cosy Home | Phong Nha",
      defaultDescription:
        "Family-run hospitality in Phong Nha. Stay, eat, explore and connect. Book direct via WhatsApp.",
      ogImage: "/images/home-hero.webp",
    },
  });

  await set("contact_information/main", {
    phone: "+84 77 850 8898",
    email: "greenriverphongnha@gmail.com",
    address: "Son River, Phong Nha, Quang Binh, Vietnam",
    whatsapp,
    googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.2520336187974!2d106.2917730750519!3d17.585785083321528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313833777595e1e1%3A0x92f986259021e1d0!2sGreen%20Riverside%20Cosy%20Home!5e0!3m2!1sen!2svn!4v1718533000000!5m2!1sen!2svn",
    googleMapsUrl: "https://maps.app.goo.gl/ziWqMez9fChLCKNJ7",
    openingHours: "Daily · 7:00 – 22:00",
  });

  await set("homepage_content/main", {
    heroTitle: "Stay • Eat • Explore • Connect",
    heroSubtitle:
      "Experience authentic local hospitality surrounded by rice fields, limestone mountains and the peaceful Son River.",
    heroImage: "/images/home-hero.webp",
    heroEyebrow: "Phong Nha, Vietnam",
    heroPillars: ["Stay", "Eat", "Explore", "Connect"],
    heroScrollHint: "Discover more",
    primaryCtaLabel: "Book Your Stay",
    primaryCtaMessageType: "book_room",
    secondaryCtaLabel: "Explore Experiences",
    secondaryCtaLink: "/tours",
    whyChooseTitle: "Why Stay With Us",
    whyChooseSubtitle:
      "Come as our guest, leave as our family. More than a hostel — a place where travellers stay, eat, explore, and connect.",
    whyChooseItems: WHY_CHOOSE_ITEMS,
    featuredRoomIds: [],
    featuredTourIds: [],
    finalCtaTitle: "Ready To Experience Phong Nha?",
    finalCtaSubtitle: "Book direct on WhatsApp — we reply fast and help with everything.",
    sections: {
      story: {
        title: "Our Story",
        subtitle: "More than a place to stay — a home shaped by nature, family, and community.",
        ctaLabel: "Read our story",
      },
      accommodation: {
        title: "Stay With Us",
        subtitle:
          "Stay in the heart of nature — comfortable rooms and dorms for solo backpackers, couples, families, and groups.",
        ctaLabel: "View all rooms",
      },
      tours: {
        title: "Tours & Adventures",
        subtitle: "Caves, kayaking, and local experiences — booked directly with us.",
        ctaLabel: "View all tours",
      },
      cafe: {
        title: "Eat & Drink",
        subtitle: "Cozy Cafe Rooftop — home-cooked food, fresh drinks, and one of the best views in Phong Nha.",
        ctaLabel: "View menu",
      },
      activities: {
        title: "Social Activities",
        subtitle: "Family Dinner, Happy Hour, and a weekly program at Cozy Cafe Rooftop.",
        ctaLabel: "View schedule",
      },
      reviews: { title: "Guest Reviews", subtitle: "Hear from travellers who became family.", ctaLabel: "" },
      gallery: { title: "Gallery", subtitle: "Moments at Green Riverside.", ctaLabel: "View gallery" },
      blog: { title: "From Our Blog", subtitle: "Travel tips and Phong Nha guides.", ctaLabel: "Read blog" },
      contact: {
        title: "Plan Your Stay",
        subtitle: "Message us on WhatsApp — we reply fast.",
        ctaLabel: "Contact us →",
      },
    },
  });

  for (const locale of ["en", "vi"]) {
    const vi = locale === "vi";
    const story = getStoryContent(vi);
    const cafe = getCafeContent(vi);

    await set(`story_content/${locale}`, {
      locale,
      heroImage: IMG.homestay,
      homepagePreviewImage: IMG.homestay,
      ...story,
      timeline: [
        {
          year: "2018",
          title: vi ? "Khởi nguồn" : "The Beginning",
          description: vi
            ? "Linh bắt đầu xây dựng giấc mơ homestay bên sông Son."
            : "Linh began building her dream homestay beside the Son River.",
        },
        {
          year: "2020",
          title: "Cozy Cafe Rooftop",
          description: vi
            ? "Mở café sân thượng tầng 4 với view núi, sông và cánh đồng lúa."
            : "Opened Cozy Cafe Rooftop on the 4th floor with mountain, river and rice field views.",
        },
        {
          year: "2024",
          title: vi ? "Cộng đồng du khách" : "Traveller Community",
          description: vi
            ? "Trở thành điểm gặp gỡ yêu thích — nơi khách đến như người lạ, về như người thân."
            : "Became a favourite meeting point — where guests arrive as strangers and leave as family.",
        },
      ],
    });

    await set(`cafe_content/${locale}`, {
      title: cafe.title,
      subtitle: cafe.subtitle,
      description: cafe.description,
      reserveCtaLabel: cafe.reserveCtaLabel,
      features: [
        {
          title: vi ? "Ẩm thực home-cooked" : "Home-Cooked Food",
          description: vi
            ? "Nguyên liệu tươi, lành mạnh — bữa sáng, menu cả ngày và món đặc biệt hàng ngày."
            : "Fresh, healthy, locally sourced ingredients — breakfast, all-day menu, and daily specials.",
          icon: "coffee",
        },
        {
          title: vi ? "Cà phê & cocktail" : "Coffee & Cocktails",
          description: vi
            ? "Cà phê phin, egg coffee, craft beer và cocktail hoàng hôn trên rooftop."
            : "Vietnamese drip coffee, egg coffee, craft beer, and sunset cocktails on the rooftop.",
          icon: "coffee",
        },
        {
          title: vi ? "Không gian xã hội" : "Social Rooftop Space",
          description: vi
            ? "Bóng bàn, bi-a, yoga, game night, karaoke và Family Dinner hàng ngày."
            : "Table tennis, pool, yoga, game nights, karaoke, and daily Family Dinner & Happy Hour.",
          icon: "wine",
        },
      ],
      menuCategories: [
        {
          name: vi ? "Bữa sáng" : "Breakfast",
          items: vi
            ? ["Trứng & bánh mì", "Pancake trái cây/mật ong", "Smoothie bowl", "Món sáng Việt Nam"]
            : ["Egg & baguette", "Pancakes with fruit or honey", "Smoothie bowls", "Traditional Vietnamese breakfast"],
        },
        {
          name: vi ? "Cả ngày" : "All Day",
          items: vi
            ? ["Món Việt địa phương", "Món Tây", "Khai vị", "Món chay", "Món đặc biệt hàng ngày"]
            : ["Local Vietnamese dishes", "Western comfort food", "Starters", "Vegetarian", "Daily specials"],
        },
        {
          name: vi ? "Đồ uống" : "Drinks",
          items: vi
            ? ["Cà phê phin & sữa đá", "Egg / salt / peanut / coconut coffee", "Nước ép & smoothie", "Craft beer & cocktail"]
            : ["Drip & iced milk coffee", "Egg, salt, peanut, coconut coffee", "Juices & smoothies", "Craft beer & cocktails"],
        },
      ],
      images: [IMG.rooftop, IMG.lunch, IMG.sunset],
    });

    await set(`faq_content/${locale}`, {
      locale,
      title: vi ? "Câu hỏi thường gặp" : "Frequently Asked Questions",
      subtitle: vi ? "Mọi thứ bạn cần biết trước khi lưu trú." : "Everything you need to know before your stay.",
    });

    const faqItems = [
      {
        order: 0,
        question: vi ? "Làm sao để đặt phòng?" : "How do I book a room?",
        answer: vi
          ? "Nhắn WhatsApp cho chúng tôi để được phản hồi nhanh nhất — không phí đặt phòng."
          : "Message us on WhatsApp for the fastest response — no booking fees.",
      },
      {
        order: 1,
        question: vi ? "Có bao gồm bữa sáng không?" : "Is breakfast included?",
        answer: vi
          ? "Có. Mỗi khách được miễn phí bữa sáng tại quán café trên rooftop."
          : "Yes. Every guest enjoys complimentary breakfast at our rooftop café.",
      },
      {
        order: 2,
        question: vi ? "Có thể đặt tour hang động không?" : "Can I book cave tours?",
        answer: vi
          ? "Có. Chúng tôi sắp xếp tour Paradise Cave, Dark Cave và nhiều hơn nữa — nhắn WhatsApp để đặt."
          : "Yes. We arrange Paradise Cave, Dark Cave and more — message us on WhatsApp to book.",
      },
      {
        order: 3,
        question: vi ? "Có WiFi và máy lạnh không?" : "Is there WiFi and air conditioning?",
        answer: vi
          ? "Có. Tất cả phòng đều có WiFi miễn phí và máy lạnh."
          : "Yes. All rooms include free WiFi and air conditioning.",
      },
      {
        order: 4,
        question: vi ? "Làm sao đến từ ga Dong Hoi?" : "How do I get here from Dong Hoi station?",
        answer: vi
          ? "Chúng tôi hỗ trợ đón ga và sân bay — xem trang Di chuyển hoặc nhắn WhatsApp."
          : "We offer train station and airport transfers — see our Transportation page or WhatsApp us.",
      },
    ];

    for (const item of faqItems) {
      const faqId = `${locale}_faq_${item.order}`;
      await setDoc(
        doc(db, "faqs", faqId),
        {
          id: faqId,
          locale,
          question: item.question,
          answer: item.answer,
          order: item.order,
          published: true,
          updatedAt: ts(),
        },
        { merge: true }
      );
    }
    console.log(`✓ faqs (${locale})`);

    for (const [pageKey, titles] of [
      ["stay", vi ? ["Lưu trú", "Ở giữa thiên nhiên — phòng riêng và dorm cho mọi loại du khách."] : ["Stay With Us", "Stay in the heart of nature — rooms and dorms for every traveller."]],
      ["tours", vi ? ["Tour & Trải nghiệm", "Khám phá hang động và thiên nhiên."] : ["Tours & Experiences", "Explore caves and nature with us."]],
      ["our-story", vi ? ["Câu chuyện", "Gặp gỡ gia đình đằng sau Green Riverside."] : ["Our Story", "Meet the family behind Green Riverside."]],
      ["eat-drink", vi ? ["Cozy Cafe Rooftop", "Ẩm thực home-cooked và view núi, sông trên tầng 4."] : ["Cozy Cafe Rooftop", "Home-cooked food and mountain views on the 4th floor."]],
      ["transportation", vi ? ["Di chuyển", "Đón sân bay, ga tàu và xe bus."] : ["Transportation", "Airport, train and bus transfers."]],
      ["social-activities", vi ? ["Hoạt động cộng đồng", "Kết nối với du khách mỗi tuần."] : ["Social Activities", "Connect with fellow travellers every week."]],
      ["contact", vi ? ["Liên hệ", "Chúng tôi rất mong được lắng nghe bạn."] : ["Contact Us", "We would love to hear from you."]],
      ["gallery", vi ? ["Thư viện ảnh", "Khoảnh khắc tại Green Riverside."] : ["Gallery", "Capturing moments at Green Riverside."]],
      ["blog", vi ? ["Blog", "Mẹo du lịch và hướng dẫn Phong Nha."] : ["Blog", "Travel tips and Phong Nha guides."]],
    ]) {
      await set(`page_content/${locale}_${pageKey}`, {
        pageKey,
        locale,
        heroTitle: titles[0],
        heroSubtitle: titles[1],
        heroImage: PAGE_HERO[pageKey] || "",
        intro:
          pageKey === "our-story"
            ? vi
              ? "Giữa cánh đồng lúa, núi đá vôi và dòng sông Son yên bình — Green Riverside là nơi bạn trải nghiệm Phong Nha qua góc nhìn của một gia đình địa phương."
              : "Nestled between rice fields, limestone mountains, and the peaceful Son River — experience Phong Nha through the eyes of a local family."
            : pageKey === "stay"
            ? vi
              ? "Thức giấc cùng thiên nhiên, view núi và sông Son. Phòng riêng và dorm cho mọi loại du khách — tại Green Riverside bạn không chỉ đặt giường mà tham gia một nơi để stay, eat, explore và connect."
              : "Wake up to nature, rice fields, limestone mountains, and the peaceful Son River. Private rooms and dorms for every traveller — at Green Riverside you're not just booking a bed, you're joining a place to stay, eat, explore, and connect."
            : pageKey === "social-activities"
              ? vi
                ? "Tại Cozy Cafe Rooftop, du lịch là con người bạn gặp và kỷ niệm bạn tạo ra. Family Dinner và Happy Hour mỗi ngày — lịch hoạt động xã hội thay đổi theo từng tuần."
                : "At Cozy Cafe Rooftop, travel is about the people you meet and the memories you create. Daily Family Dinner & Happy Hour — plus a weekly social program designed to bring guests together naturally."
            : pageKey === "eat-drink"
              ? vi
                ? "Cozy Cafe Rooftop tầng 4 — ẩm thực home-cooked, đồ uống tươi và view núi, sông, cánh đồng lúa."
                : "4th-floor Cozy Cafe Rooftop — home-cooked food, fresh drinks, and mountain, river, and rice field views in the heart of Phong Nha."
            : pageKey === "tours"
              ? vi
                ? "Tour hang động và trải nghiệm thiên nhiên do gia đình chúng tôi tổ chức — nhóm nhỏ, hướng dẫn viên thân thiện."
                : "Cave tours and nature experiences run by our family — small groups and friendly local guides."
              : pageKey === "transportation"
                ? vi
                  ? "Đón sân bay, ga tàu và xe bus — chúng tôi sắp xếp mọi chuyến đi cho bạn."
                  : "Airport, train and bus transfers — we arrange every leg of your journey."
                : "",
        metaTitle: "",
        metaDescription: "",
        ctaLabel: vi ? "Chat WhatsApp" : "Chat on WhatsApp",
        labels: PAGE_LABELS[locale][pageKey] || {},
      });
    }
  }

  const now = new Date().toISOString();

  const blogPost = (slug, title, excerpt, content, image, category, featured = true) => ({
    slug,
    title,
    excerpt,
    content,
    featuredImage: image,
    coverImage: image,
    category,
    tags: ["phong nha", "travel"],
    author: "Green Riverside Team",
    seoTitle: title,
    seoDescription: excerpt,
    status: "published",
    published: true,
    featured,
    publishedAt: now,
    createdAt: ts(),
    updatedAt: ts(),
  });

  // ——— Rooms (from content doc) ———
  for (const room of ROOMS) {
    await upsert("rooms", room.id, {
      ...room,
      images: [],
      roomImages: [],
      featured: room.order <= 4,
      published: true,
      createdAt: ts(),
    });
  }
  console.log("✓ rooms (from docx)");

  // ——— Tours ———
  console.log("Cleaning up old unused/duplicate tour documents...");
  const ALLOWED_TOUR_IDS = [
    "phong-nha-cave-half-day",
    "dark-cave-half-day",
    "botanic-paradise-half-day",
    "phong-nha-paradise-full-day",
    "paradise-dark-full-day",
    "phong-nha-dark-full-day",
    "botanic-phong-nha-paradise-full-day",
    "botanic-paradise-dark-full-day",
    "botanic-phong-nha-dark-full-day",
    "wildlife-jungle-trek-1d",
    "ruc-mon-adventure-1d",
    "abandoned-valley-e-cave-1d",
    "elephant-cave-mada-valley-1d",
    "hang-pygmy-2d1n",
    "hung-thoong-3d2n",
    "kong-collapse-5d4n",
    "son-river-kayak"
  ];
  const toursCollection = collection(db, "tours");
  const toursSnapshot = await getDocs(toursCollection);
  for (const docSnap of toursSnapshot.docs) {
    if (!ALLOWED_TOUR_IDS.includes(docSnap.id)) {
      await deleteDoc(doc(db, "tours", docSnap.id));
      console.log(`Deleted old tour: ${docSnap.id}`);
    }
  }
  console.log("Cleaned up old tour documents.");

  await upsert("tours", "son-river-kayak", {
    slug: "son-river-kayak",
    title: "Son River Kayak & Sunset",
    description:
      "Paddle the emerald Son River at golden hour. A peaceful experience perfect after a day of cave exploring.",
    shortDescription: "Kayak · Sunset · 2 hours · All levels",
    duration: "2 Hours",
    price: 350000,
    priceFrom: 350000,
    currency: "VND",
    priceUsdApprox: 15,
    heroLabel: "River Experience",
    departure: "4:30 PM",
    returnTime: "6:30 PM",
    overviewText:
      "Glide along the Son River as the sun sets behind limestone karsts. No experience needed — our guide leads the way.",
    highlights: ["Sunset paddle", "Limestone views", "Beginner friendly", "Photo stops"],
    timeline: [
      { time: "16:30", title: "Meet at riverside", icon: "map-pin" },
      { time: "17:00", title: "Kayak briefing & launch", icon: "ship" },
      { time: "18:30", title: "Return to shore", icon: "home" },
    ],
    included: ["Kayak", "Life jacket", "Guide", "Water"],
    excluded: ["Transport to meeting point"],
    whatToBring: ["Sunscreen", "Hat", "Camera"],
    images: [IMG.boat, IMG.sunset, IMG.river],
    galleryImages: [IMG.boat, IMG.sunset, IMG.river, IMG.mountains],
    featured: true,
    order: 3,
    published: true,
    createdAt: ts(),
  });

  const brochureImages = [IMG.cave, IMG.jungle, IMG.boat, IMG.mountains, IMG.caveAlt, IMG.garden];
  for (const tour of [...CLASSIC_TOURS, ...ADVENTURE_TOURS]) {
    const img = brochureImages[(tour.order - 1) % brochureImages.length];
    await upsert("tours", tour.id, {
      ...tour,
      slug: tour.slug,
      highlights: tour.highlights || [tour.shortDescription],
      overviewHeading: tour.overviewHeading || "Overview",
      overviewText: tour.overviewText || tour.description,
      images: [img],
      galleryImages: tour.galleryImages || [img, IMG.river, IMG.sunset],
      included: tour.included || ["Local booking support from Green Riverside", "WhatsApp confirmation with Ms. Linh"],
      excluded: tour.excluded || ["Personal expenses & tips"],
      whatToBring: tour.whatToBring || [],
      faq: tour.faq || [
        {
          question: "How do I book?",
          answer: "Message Ms. Linh on WhatsApp for timing, combinations, and instant booking.",
        },
      ],
      featured: tour.order <= 8,
      published: true,
      heroLabel: tour.heroLabel || (tour.difficulty ? "Adventure Tour" : "Classic Tour"),
      createdAt: ts(),
    });
  }
  console.log("✓ tours (brochure catalog)");

  // ——— Activities ———
  const activities = [
    {
      id: "daily-family-dinner",
      title: "Daily Family Dinner & Happy Hour",
      description:
        "Every day, guests gather around a shared table for home-cooked local food and drinks — the heart of our community.",
      dayOfWeek: "Daily",
      time: "18:00",
      icon: "utensils",
      images: [IMG.lunch],
      order: 0,
    },
    { id: "monday-cooking", title: "Cooking Class & Vietnamese Language", description: "Learn simple local dishes and connect through culture and laughter.", dayOfWeek: "Monday", time: "16:00", icon: "chef-hat", images: [IMG.community], order: 1 },
    { id: "tuesday-games", title: "Smash Ball & Beer Pong", description: "Playful tournaments and a fun competitive atmosphere.", dayOfWeek: "Tuesday", time: "20:00", icon: "gamepad", images: [IMG.rooftop], order: 2 },
    { id: "wednesday-trivia", title: "Board Games & Trivia Night", description: "Relaxed evening — share laughs and meet new people.", dayOfWeek: "Wednesday", time: "20:00", icon: "brain", images: [IMG.community], order: 3 },
    { id: "thursday-crafts", title: "Language & Craft Painting", description: "Culture and creativity combined.", dayOfWeek: "Thursday", time: "19:00", icon: "languages", images: [IMG.sunset], order: 4 },
    { id: "friday-do-or-drink", title: "Do or Drink Game Night", description: "Our famous lively social game night.", dayOfWeek: "Friday", time: "20:00", icon: "wine", images: [IMG.rooftop], order: 5 },
    { id: "saturday-karaoke", title: "Music Bingo & Karaoke", description: "One of the most energetic nights of the week.", dayOfWeek: "Saturday", time: "20:00", icon: "music", images: [IMG.pool], order: 6 },
    { id: "sunday-olympics", title: "Bar Olympics & Team Games", description: "A fun, friendly end to the week.", dayOfWeek: "Sunday", time: "20:00", icon: "gamepad", images: [IMG.community], order: 7 },
  ];
  for (const act of activities) {
    await upsert("activities", act.id, {
      ...act,
      featured: true,
      createdAt: ts(),
    });
  }
  console.log("✓ activities (sample)");

  // ——— Gallery ———
  const galleryItems = [
    { id: "gallery-01", title: "Son River Morning", imageUrl: IMG.river, category: "sunset", order: 1 },
    { id: "gallery-02", title: "Paradise Cave", imageUrl: IMG.cave, category: "tours", order: 2 },
    { id: "gallery-03", title: "Rooftop Café", imageUrl: IMG.rooftop, category: "cafe", order: 3 },
    { id: "gallery-04", title: "Jungle Trail", imageUrl: IMG.jungle, category: "nature", order: 4 },
    { id: "gallery-05", title: "River Kayak", imageUrl: IMG.boat, category: "tours", order: 5 },
    { id: "gallery-06", title: "Family Dinner", imageUrl: IMG.community, category: "community", order: 6 },
    { id: "gallery-07", title: "Limestone Peaks", imageUrl: IMG.mountains, category: "nature", order: 7 },
    { id: "gallery-08", title: "Sunset Riverside", imageUrl: IMG.sunset, category: "sunset", order: 8 },
    { id: "gallery-09", title: "Deluxe Room", imageUrl: IMG.room, category: "rooms", order: 9 },
    { id: "gallery-10", title: "Vietnamese Lunch", imageUrl: IMG.lunch, category: "food", order: 10 },
    { id: "gallery-11", title: "Botanic Garden", imageUrl: IMG.garden, category: "tours", order: 11 },
    { id: "gallery-12", title: "Karaoke Night", imageUrl: IMG.pool, category: "activities", order: 12 },
    { id: "gallery-13", title: "Coffee Experience", imageUrl: IMG.rooftop, category: "cafe", order: 13 },
    { id: "gallery-14", title: "Paddle Boarding", imageUrl: IMG.boat, category: "activities", order: 14 },
    { id: "gallery-15", title: "Bong Lai Valley", imageUrl: IMG.homestay, category: "nature", order: 15 },
    { id: "gallery-16", title: "Music Bingo", imageUrl: IMG.community, category: "community", order: 16 },
  ];
  for (const item of galleryItems) {
    await upsert("gallery", item.id, { ...item, featured: true });
  }
  console.log("✓ gallery (sample)");

  // ——— Blog ———
  const posts = [
    blogPost("phong-nha-travel-guide", "Phong Nha Travel Guide for First-Time Visitors", "Everything you need to know before exploring caves, rivers, and jungle trails.", "Phong Nha is one of Vietnam's most spectacular destinations. From world-famous caves to peaceful riverside life, this guide covers transport, where to stay, and the best tours for first-time visitors.", IMG.cave, "Travel Guide"),
    blogPost("best-things-to-do-phong-nha", "Top 7 Things To Do in Phong Nha", "From Paradise Cave to kayaking on the Son River — our favourite experiences.", "Whether you have one day or one week, Phong Nha rewards slow travel. Here are seven experiences our guests love most.", IMG.boat, "Experiences"),
    blogPost("where-to-stay-phong-nha", "Where To Stay in Phong Nha", "Why riverside homestays offer the best base for cave adventures.", "Staying beside the Son River puts you minutes from nature and close to the social heart of Phong Nha town.", IMG.homestay, "Accommodation"),
    blogPost("paradise-cave-vs-phong-nha-cave", "Paradise Cave vs Phong Nha Cave", "Which cave should you visit first? We break down both iconic experiences.", "Both caves are unmissable. Paradise Cave impresses with scale; Phong Nha Cave combines boat rides and history.", IMG.caveAlt, "Caves"),
    blogPost("phong-nha-food-guide", "What To Eat in Phong Nha", "Local specialties, rooftop dining and our favourite Quang Binh dishes.", "From bun bo Hue to fresh river fish, Phong Nha's food scene is authentic and affordable.", IMG.lunch, "Food"),
    blogPost("best-time-visit-phong-nha", "Best Time to Visit Phong Nha", "Weather, crowds and seasonal tips for planning your trip.", "Dry season (Feb–Aug) is ideal for caves and kayaking. Green season brings lush landscapes and fewer crowds.", IMG.mountains, "Planning"),
  ];
  for (const post of posts) {
    await upsert("blog_posts", post.slug, post);
  }
  console.log("✓ blog (sample)");

  // ——— Reviews ———
  const reviews = [
    { id: "review-1", author: "Emily", country: "Australia", rating: 5, content: "One of the best places we stayed in Vietnam. The family dinner was amazing and we met so many great people.", source: "google", date: "2025-11-20" },
    { id: "review-2", author: "Tom", country: "United Kingdom", rating: 5, content: "Beautiful location, fantastic rooftop café and incredibly helpful hosts.", source: "tripadvisor", date: "2025-10-15" },
    { id: "review-3", author: "Sarah M.", country: "Canada", rating: 5, content: "Felt like home from the first night. The family is incredibly welcoming and the tours were amazing.", source: "google", date: "2025-09-08" },
    { id: "review-4", author: "Marco R.", country: "Italy", rating: 5, content: "Authentic Vietnamese hospitality. The cooking class and kayak sunset were unforgettable.", source: "tripadvisor", date: "2025-08-22" },
    { id: "review-5", author: "Lin W.", country: "Singapore", rating: 5, content: "Booked direct on WhatsApp — saved money and got personal recommendations. Highly recommend!", source: "google", date: "2025-07-20" },
    { id: "review-6", author: "James K.", country: "United States", rating: 5, content: "Best homestay in Phong Nha! Rooftop views, great coffee, and they helped us book every tour.", source: "google", date: "2025-06-08" },
  ];
  for (const rev of reviews) {
    await upsert("reviews", rev.id, { ...rev, featured: true });
  }
  console.log("✓ reviews (sample)");

  // ——— Transportation ———
  const transport = [
    { id: "airport-dong-hoi", slug: "airport-dong-hoi", title: "Dong Hoi Airport Transfer", shortDescription: "Private car · 45 min · Door to door", description: "Meet-and-greet pickup from Dong Hoi Airport direct to Green Riverside.", route: "Dong Hoi Airport → Phong Nha", price: 350000, currency: "VND", icon: "plane", order: 1 },
    { id: "train-dong-hoi", slug: "train-dong-hoi", title: "Dong Hoi Train Station Pickup", shortDescription: "Private car · 45 min", description: "We meet you at the station platform and drive you to the homestay.", route: "Dong Hoi Station → Phong Nha", price: 300000, currency: "VND", icon: "train", order: 2 },
    { id: "bus-phong-nha", slug: "bus-phong-nha", title: "Sleeper Bus Booking", shortDescription: "Hanoi / Hue → Phong Nha", description: "We book reputable sleeper buses and arrange drop-off near the homestay.", route: "Major cities → Phong Nha", price: 250000, currency: "VND", icon: "bus", order: 3 },
    { id: "motorbike-rental", slug: "motorbike-rental", title: "Motorbike Rental", shortDescription: "Automatic · Daily rate", description: "Explore Phong Nha at your own pace. Helmets and basic insurance included.", route: "Phong Nha area", price: 150000, currency: "VND", icon: "bike", order: 4 },
  ];
  for (const t of transport) {
    await upsert("transportation", t.id, {
      ...t,
      priceFrom: t.price,
      featured: true,
      published: true,
      createdAt: ts(),
    });
  }
  console.log("✓ transportation (sample)");

  await set("homepage_content/main", {
    featuredRoomIds: ["deluxe-single-double", "deluxe-double-twin", "superior-double-twin"],
    featuredTourIds: ["phong-nha-cave-half-day", "dark-cave-half-day", "son-river-kayak"],
  });

  console.log("\nDone! Refresh http://localhost:3000/en or /vi");
}

main().catch((err) => {
  console.error("\nSeed failed:", err.message || err);
  process.exit(1);
});

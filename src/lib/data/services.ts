import "server-only";

import {
  serverGetCollection,
  serverGetDocument,
  serverGetDocumentBySlug,
} from "@/lib/firebase/server-firestore";
import { FIRESTORE_COLLECTIONS } from "@/lib/firebase/firestore";
import type { Locale } from "@/lib/i18n/config";
import type {
  Room,
  Tour,
  Activity,
  Transportation,
  GalleryItem,
  Review,
  BlogPost,
  HomepageContent,
  SiteSettings,
  ContactInformation,
  StoryContent,
  CafeContent,
  FaqContent,
  FaqItem,
  Faq,
  PageContent,
  PageKey,
} from "@/types";
import { normalizeHomepage } from "@/types";
import {
  normalizeContactInformation,
  normalizeSiteSettings,
} from "@/lib/content/site-settings-defaults";
import { SAMPLE_IMAGES } from "@/lib/sample-media";

const HOMEPAGE_ID = "main";
const SETTINGS_ID = "main";
const CONTACT_ID = "main";

function pageDocId(locale: Locale, pageKey: PageKey): string {
  return `${locale}_${pageKey}`;
}

function byOrder<T extends { order?: number }>(a: T, b: T): number {
  return (a.order ?? 0) - (b.order ?? 0);
}

function byPublishedAtDesc(a: BlogPost, b: BlogPost): number {
  return (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "");
}

const TRAVEL_FAQ_EN = [
  {
    question: "🍜 Where Are the Best Places to Eat in Phong Nha?",
    answer:
      "Start with Cozy Cafe Rooftop at Green Riverside for Vietnamese and Western dishes, then ask our team for current local favorites around town. Popular options often include Bamboo Chopsticks, The Rice House, Ganesh, The Villas, and After 8 Bistro.",
  },
  {
    question: "🥗 Where Can I Find Vegan & Vegetarian Food in Phong Nha?",
    answer:
      "Cozy Cafe Rooftop offers vegetarian and vegan-friendly options. Several local restaurants can also adapt dishes if you explain your diet clearly. Ask us before you go and we will suggest the best current choices.",
  },
  {
    question: "☕ What Are the Best Cafés in Phong Nha?",
    answer:
      "Cozy Cafe Rooftop is the easiest choice for guests, with coffee, juices, smoothies, and mountain views. Other good cafe stops vary by season, so ask reception for the latest places to work, relax, or watch the town go by.",
  },
  {
    question: "🍻 Where Can I Enjoy a Drink or Nightlife in Phong Nha?",
    answer:
      "Phong Nha nightlife is relaxed and social rather than big-city busy. Cozy Cafe Rooftop is good for sunset drinks and guest activities, while town bars are better for later nights.",
  },
  {
    question: "🌅 Where Are the Best Places to Watch Sunrise & Sunset?",
    answer:
      "Our rooftop is one of the easiest places for sunrise and sunset. Around Phong Nha, East Hill, riverside spots, Bong Lai Valley, and countryside viewpoints can be beautiful when the weather is clear.",
  },
  {
    question: "🏊 Where Are the Best Swimming Spots in Phong Nha?",
    answer:
      "Swimming options depend on weather and water level. Guests often ask about Mooc Spring, Ha Va Valley, Ozo, riverside areas, and local pools. Always check conditions first, especially in rainy season.",
  },
  {
    question: "🏞️ What Are the Must-Visit Attractions in Phong Nha?",
    answer:
      "First-time visitors usually choose Paradise Cave, Phong Nha Cave, Dark Cave, Bong Lai Valley, Mooc Spring, Botanic Garden, and scenic countryside routes. We can help match attractions to your time and budget.",
  },
  {
    question: "🚲 What Are the Best Cycling Routes Around Phong Nha?",
    answer:
      "Bong Lai Valley is the classic cycling route, with rice fields, farms, villages, and relaxed stops. We can share route advice and help you avoid confusing back roads.",
  },
  {
    question: "🛵 Where Can I Rent a Reliable Motorbike in Phong Nha?",
    answer:
      "You can rent motorbikes through Green Riverside or ask us to recommend a trusted local provider. Check brakes, lights, helmet quality, fuel, and insurance conditions before riding.",
  },
  {
    question: "🏋️ Is There a Good Gym in Phong Nha?",
    answer:
      "Phong Nha has small local gym options rather than large fitness centers. Green Riverside also has yoga mats for light exercise on the rooftop.",
  },
  {
    question: "💵 Where Can I Find ATMs or Exchange Money?",
    answer:
      "ATMs are available around Phong Nha town, but they can run out of cash during busy periods. Bring some VND cash, and ask reception for the nearest working ATM or money exchange option.",
  },
  {
    question: "🛒 Where Can I Shop for Groceries, Souvenirs, or Daily Essentials?",
    answer:
      "Small shops and mini markets in Son Trach/Phong Nha sell snacks, toiletries, drinks, and basic travel items. For more choice, Dong Hoi has larger stores.",
  },
  {
    question: "🏥 What Should I Do If I Get Sick?",
    answer:
      "Tell our team as soon as possible. We can help you find a pharmacy, clinic, doctor, or transport to Dong Hoi if needed. For serious symptoms, seek medical help immediately.",
  },
  {
    question: "💊 Where Are the Nearest Pharmacy, Clinic, and Hospital?",
    answer:
      "There are local pharmacies and clinics in the Phong Nha/Son Trach area. For more serious care, Dong Hoi has larger hospitals. Ask reception and we will help arrange directions or transport.",
  },
  {
    question: "🌦️ What Is the Weather Like in Phong Nha?",
    answer:
      "Phong Nha is tropical. Dry months are usually better for caves and outdoor activities, while green season brings lush scenery and occasional heavy rain. Check the forecast before long rides or hikes.",
  },
  {
    question: "🌧️ When Is the Rainy Season and Flooding Season in Phong Nha?",
    answer:
      "Heavy rain is more common in the later part of the year, and some activities may change for safety. Conditions vary each year, so ask us for the latest local update before booking tours.",
  },
  {
    question: "🛂 Do I Need a Visa to Visit Vietnam?",
    answer:
      "Visa requirements depend on your nationality, passport, entry point, and length of stay. Always check the official Vietnam immigration website or your airline before travel.",
  },
  {
    question: "✈️ How Do I Travel to Vietnam?",
    answer:
      "Most international travelers arrive by air through Hanoi, Ho Chi Minh City, Da Nang, or other major airports. From there, you can connect to Dong Hoi, Hue, Da Nang, or Phong Nha by flight, train, bus, or private car.",
  },
  {
    question: "📱 What SIM Card or eSIM Should I Use in Vietnam?",
    answer:
      "Viettel usually has strong coverage for rural areas and national parks. Vinaphone and Mobifone are also common. eSIMs are convenient if your phone supports them.",
  },
  {
    question: "💳 Can I Pay by Credit Card in Phong Nha?",
    answer:
      "Some hotels, restaurants, and tour offices accept cards, but cash is still important in Phong Nha. Small shops, taxis, and local services often prefer VND cash.",
  },
  {
    question: "🚕 How Can I Get Around Phong Nha?",
    answer:
      "Common options include walking, bicycles, motorbikes, taxis, private cars, Easy Rider, and arranged tour transport. Ride-hailing apps may be limited, especially outside town.",
  },
  {
    question: "🎒 What Should I Pack for Visiting Phong Nha?",
    answer:
      "Bring comfortable walking shoes, swimwear, light clothes, rain protection, sunscreen, insect repellent, a small day bag, and any personal medicine. For cave tours, check the tour-specific packing list.",
  },
].map((item, order) => ({ ...item, order }));

const TRAVEL_FAQ_VI = [
  {
    question: "🍜 Ăn ở đâu ngon nhất tại Phong Nha?",
    answer:
      "Bạn có thể bắt đầu với Cozy Cafe Rooftop tại Green Riverside cho món Việt và món Âu. Sau đó hãy hỏi đội ngũ lễ tân để được gợi ý các quán địa phương đang được khách yêu thích.",
  },
  {
    question: "🥗 Tìm món chay và thuần chay ở đâu tại Phong Nha?",
    answer:
      "Cozy Cafe Rooftop có lựa chọn chay và thân thiện với vegan. Một số quán địa phương cũng có thể điều chỉnh món nếu bạn nói rõ nhu cầu ăn uống.",
  },
  {
    question: "☕ Những quán cafe nào đáng ghé nhất ở Phong Nha?",
    answer:
      "Cozy Cafe Rooftop là lựa chọn thuận tiện cho khách lưu trú, với cà phê, nước ép, smoothie và view núi. Hãy hỏi lễ tân để biết các quán cafe phù hợp nhất theo thời điểm.",
  },
  {
    question: "🍻 Uống bia, cocktail hoặc nightlife ở đâu tại Phong Nha?",
    answer:
      "Buổi tối ở Phong Nha khá nhẹ nhàng và dễ giao lưu. Cozy Cafe Rooftop phù hợp cho đồ uống hoàng hôn và hoạt động cộng đồng; các bar trong thị trấn phù hợp nếu bạn muốn đi muộn hơn.",
  },
  {
    question: "🌅 Địa điểm ngắm bình minh và hoàng hôn đẹp nhất ở đâu?",
    answer:
      "Rooftop của Green Riverside là một trong những nơi dễ nhất để ngắm bình minh và hoàng hôn. East Hill, ven sông, thung lũng Bong Lai và các điểm đồng quê cũng rất đẹp khi trời quang.",
  },
  {
    question: "🏊 Những điểm bơi đẹp nhất ở Phong Nha ở đâu?",
    answer:
      "Điểm bơi phụ thuộc thời tiết và mực nước. Khách thường hỏi về Suối Moọc, Ha Va, Ozo, khu ven sông và hồ bơi địa phương. Luôn kiểm tra điều kiện an toàn trước khi bơi.",
  },
  {
    question: "🏞️ Những điểm tham quan không nên bỏ lỡ ở Phong Nha là gì?",
    answer:
      "Khách lần đầu thường chọn Hang Thiên Đường, Động Phong Nha, Hang Tối, Bong Lai Valley, Suối Moọc, Vườn Thực vật và các cung đường đồng quê.",
  },
  {
    question: "🚲 Những cung đường đạp xe đẹp quanh Phong Nha là gì?",
    answer:
      "Bong Lai Valley là cung đạp xe kinh điển với đồng lúa, trang trại, làng quê và các điểm dừng thư giãn. Chúng tôi có thể gợi ý tuyến phù hợp để bạn đi dễ hơn.",
  },
  {
    question: "🛵 Thuê xe máy uy tín ở đâu tại Phong Nha?",
    answer:
      "Bạn có thể thuê xe máy qua Green Riverside hoặc nhờ chúng tôi giới thiệu nhà cung cấp địa phương đáng tin cậy. Hãy kiểm tra phanh, đèn, mũ bảo hiểm, xăng và điều kiện thuê trước khi đi.",
  },
  {
    question: "🏋️ Có phòng gym tốt ở Phong Nha không?",
    answer:
      "Phong Nha có một số phòng gym địa phương nhỏ, không phải trung tâm lớn. Green Riverside cũng có thảm yoga để khách tự tập nhẹ trên rooftop.",
  },
  {
    question: "💵 Có thể rút tiền ATM hoặc đổi tiền ở đâu?",
    answer:
      "ATM có ở khu thị trấn Phong Nha/Sơn Trạch nhưng đôi khi hết tiền vào mùa cao điểm. Nên chuẩn bị một ít tiền mặt VND và hỏi lễ tân điểm ATM/đổi tiền thuận tiện nhất.",
  },
  {
    question: "🛒 Mua đồ tạp hóa, quà lưu niệm hoặc đồ dùng hằng ngày ở đâu?",
    answer:
      "Các cửa hàng nhỏ và mini market ở Sơn Trạch/Phong Nha bán đồ ăn nhẹ, đồ vệ sinh cá nhân, nước uống và vật dụng cơ bản. Nếu cần nhiều lựa chọn hơn, Đồng Hới sẽ phù hợp hơn.",
  },
  {
    question: "🏥 Nếu bị ốm thì nên làm gì?",
    answer:
      "Hãy báo cho đội ngũ Green Riverside càng sớm càng tốt. Chúng tôi có thể giúp tìm nhà thuốc, phòng khám, bác sĩ hoặc sắp xếp xe đi Đồng Hới nếu cần.",
  },
  {
    question: "💊 Nhà thuốc, phòng khám và bệnh viện gần nhất ở đâu?",
    answer:
      "Khu Phong Nha/Sơn Trạch có nhà thuốc và phòng khám địa phương. Với trường hợp nghiêm trọng hơn, Đồng Hới có bệnh viện lớn hơn. Lễ tân có thể hỗ trợ chỉ đường hoặc gọi xe.",
  },
  {
    question: "🌦️ Thời tiết ở Phong Nha như thế nào?",
    answer:
      "Phong Nha có khí hậu nhiệt đới. Mùa khô thường thuận lợi hơn cho hang động và hoạt động ngoài trời; mùa xanh có cảnh quan tươi đẹp nhưng đôi khi mưa lớn.",
  },
  {
    question: "🌧️ Mùa mưa và mùa lũ ở Phong Nha là khi nào?",
    answer:
      "Mưa lớn thường xuất hiện nhiều hơn vào cuối năm và một số hoạt động có thể thay đổi vì an toàn. Điều kiện mỗi năm khác nhau, nên hãy hỏi chúng tôi cập nhật mới nhất trước khi đặt tour.",
  },
  {
    question: "🛂 Có cần visa để đến Việt Nam không?",
    answer:
      "Yêu cầu visa phụ thuộc quốc tịch, hộ chiếu, điểm nhập cảnh và thời gian lưu trú. Hãy kiểm tra website chính thức của xuất nhập cảnh Việt Nam hoặc hãng bay trước chuyến đi.",
  },
  {
    question: "✈️ Di chuyển đến Việt Nam như thế nào?",
    answer:
      "Phần lớn khách quốc tế bay đến Hà Nội, TP. Hồ Chí Minh, Đà Nẵng hoặc các sân bay lớn khác. Từ đó có thể nối chuyến đến Đồng Hới, Huế, Đà Nẵng hoặc Phong Nha bằng máy bay, tàu, xe khách hoặc xe riêng.",
  },
  {
    question: "📱 Nên dùng SIM hoặc eSIM nào ở Việt Nam?",
    answer:
      "Viettel thường có sóng tốt ở vùng nông thôn và khu vực vườn quốc gia. Vinaphone và Mobifone cũng phổ biến. eSIM tiện nếu điện thoại của bạn hỗ trợ.",
  },
  {
    question: "💳 Có thể thanh toán bằng thẻ tín dụng ở Phong Nha không?",
    answer:
      "Một số khách sạn, nhà hàng và văn phòng tour nhận thẻ, nhưng tiền mặt vẫn rất quan trọng ở Phong Nha. Cửa hàng nhỏ, taxi và dịch vụ địa phương thường ưu tiên VND tiền mặt.",
  },
  {
    question: "🚕 Di chuyển quanh Phong Nha bằng cách nào?",
    answer:
      "Bạn có thể đi bộ, thuê xe đạp, xe máy, taxi, xe riêng, Easy Rider hoặc dùng xe đi kèm tour. Ứng dụng gọi xe có thể hạn chế, nhất là ngoài khu trung tâm.",
  },
  {
    question: "🎒 Nên chuẩn bị gì khi đến Phong Nha?",
    answer:
      "Nên mang giày đi bộ thoải mái, đồ bơi, quần áo nhẹ, áo mưa, kem chống nắng, chống muỗi, balo nhỏ và thuốc cá nhân. Với tour hang động, hãy xem danh sách đồ cần mang riêng của từng tour.",
  },
].map((item, order) => ({ ...item, order }));

function getDefaultTravelFaq(locale: Locale): FaqItem[] {
  return locale === "vi" ? TRAVEL_FAQ_VI : TRAVEL_FAQ_EN;
}

function mergeFaqItems(primary: FaqItem[], fallback: FaqItem[]): FaqItem[] {
  const seen = new Set(primary.map((item) => item.question.trim().toLowerCase()));
  const missing = fallback
    .filter((item) => !seen.has(item.question.trim().toLowerCase()))
    .map((item, index) => ({
      ...item,
      order: primary.length + index,
    }));
  return [...primary, ...missing];
}

const FALLBACK_BLOG_POSTS: BlogPost[] = [
  {
    id: "phong-nha-travel-guide",
    slug: "phong-nha-travel-guide",
    title: "Phong Nha Travel Guide for First-Time Visitors",
    excerpt: "Everything you need to know before exploring caves, rivers, and jungle trails.",
    content:
      "Phong Nha is one of Vietnam's most spectacular destinations. From world-famous caves to peaceful riverside life, this guide covers transport, where to stay, and the best tours for first-time visitors.",
    featuredImage: SAMPLE_IMAGES.cave,
    category: "Travel Guide",
    tags: ["Phong Nha", "Travel Guide"],
    author: "Green Riverside Team",
    seoTitle: "Phong Nha Travel Guide for First-Time Visitors",
    seoDescription: "Plan your first Phong Nha trip with practical advice on caves, transport, rooms, food, and local experiences.",
    status: "published",
    published: true,
    publishedAt: "2026-01-12",
    featured: true,
    createdAt: "2026-01-12",
    updatedAt: "2026-01-12",
  },
  {
    id: "best-things-to-do-phong-nha",
    slug: "best-things-to-do-phong-nha",
    title: "Top 7 Things To Do in Phong Nha",
    excerpt: "From Paradise Cave to kayaking on the Son River, here are our favourite experiences.",
    content:
      "Whether you have one day or one week, Phong Nha rewards slow travel. Explore caves, cycle Bong Lai Valley, watch sunset by the river, and join local social activities after dark.",
    featuredImage: SAMPLE_IMAGES.boat,
    category: "Experiences",
    tags: ["Things to do", "Phong Nha"],
    author: "Green Riverside Team",
    seoTitle: "Top Things To Do in Phong Nha",
    seoDescription: "Discover caves, countryside, river activities, food, and social experiences in Phong Nha.",
    status: "published",
    published: true,
    publishedAt: "2026-01-08",
    featured: true,
    createdAt: "2026-01-08",
    updatedAt: "2026-01-08",
  },
  {
    id: "where-to-stay-phong-nha",
    slug: "where-to-stay-phong-nha",
    title: "Where To Stay in Phong Nha",
    excerpt: "Why riverside homestays offer a comfortable base for cave adventures.",
    content:
      "Staying beside the Son River puts you close to nature, restaurants, tours, and the social heart of Phong Nha town. A family-run homestay is ideal for guests who want practical help and a warm local welcome.",
    featuredImage: SAMPLE_IMAGES.homestay,
    category: "Accommodation",
    tags: ["Accommodation", "Homestay"],
    author: "Green Riverside Team",
    seoTitle: "Where To Stay in Phong Nha",
    seoDescription: "Compare Phong Nha accommodation options and learn why a riverside homestay is a practical base.",
    status: "published",
    published: true,
    publishedAt: "2026-01-05",
    featured: false,
    createdAt: "2026-01-05",
    updatedAt: "2026-01-05",
  },
  {
    id: "paradise-cave-vs-phong-nha-cave",
    slug: "paradise-cave-vs-phong-nha-cave",
    title: "Paradise Cave vs Phong Nha Cave",
    excerpt: "Which cave should you visit first? We break down both iconic experiences.",
    content:
      "Both caves are worth visiting. Paradise Cave impresses with scale and dramatic formations, while Phong Nha Cave combines a boat ride, river scenery, and local history.",
    featuredImage: SAMPLE_IMAGES.caveAlt,
    category: "Caves",
    tags: ["Paradise Cave", "Phong Nha Cave"],
    author: "Green Riverside Team",
    seoTitle: "Paradise Cave vs Phong Nha Cave",
    seoDescription: "Compare Paradise Cave and Phong Nha Cave to choose the best tour for your travel style.",
    status: "published",
    published: true,
    publishedAt: "2026-01-02",
    featured: false,
    createdAt: "2026-01-02",
    updatedAt: "2026-01-02",
  },
  {
    id: "phong-nha-food-guide",
    slug: "phong-nha-food-guide",
    title: "What To Eat in Phong Nha",
    excerpt: "Local specialties, rooftop dining, and our favourite Quang Binh dishes.",
    content:
      "Phong Nha's food scene is relaxed and affordable. Try Vietnamese breakfasts, fresh local dishes, vegetarian options, and sunset drinks after a day of exploring.",
    featuredImage: SAMPLE_IMAGES.lunch,
    category: "Food",
    tags: ["Food", "Cafe"],
    author: "Green Riverside Team",
    seoTitle: "What To Eat in Phong Nha",
    seoDescription: "A simple guide to food, cafes, vegetarian options, and local dishes in Phong Nha.",
    status: "published",
    published: true,
    publishedAt: "2025-12-28",
    featured: false,
    createdAt: "2025-12-28",
    updatedAt: "2025-12-28",
  },
  {
    id: "best-time-visit-phong-nha",
    slug: "best-time-visit-phong-nha",
    title: "Best Time to Visit Phong Nha",
    excerpt: "Weather, crowds, and seasonal tips for planning your trip.",
    content:
      "Dry season from February to August is ideal for caves, cycling, and kayaking. Green season brings lush scenery and fewer crowds, while heavy rain periods require more flexible plans.",
    featuredImage: SAMPLE_IMAGES.mountains,
    category: "Planning",
    tags: ["Weather", "Planning"],
    author: "Green Riverside Team",
    seoTitle: "Best Time to Visit Phong Nha",
    seoDescription: "Learn the best months to visit Phong Nha for caves, cycling, kayaking, and green-season scenery.",
    status: "published",
    published: true,
    publishedAt: "2025-12-20",
    featured: false,
    createdAt: "2025-12-20",
    updatedAt: "2025-12-20",
  },
];

function localizeRoom(room: Room, locale?: Locale): Room {
  if (!locale || locale === "en") return room;
  const localized = room.translations?.[locale];
  if (!localized) return room;

  return {
    ...room,
    ...localized,
    slug: room.slug,
    id: room.id,
    price: room.price,
    priceFrom: room.priceFrom,
    currency: room.currency,
    images: room.images,
    roomImages: room.roomImages,
    featured: room.featured,
    order: room.order,
    published: room.published,
    createdAt: room.createdAt,
    updatedAt: room.updatedAt,
    translations: room.translations,
  };
}

export async function getRooms(locale?: Locale): Promise<Room[]> {
  const rooms = await serverGetCollection<Room>(FIRESTORE_COLLECTIONS.rooms, {
    publishedOnly: true,
  });
  return rooms.sort(byOrder).map((room) => localizeRoom(room, locale));
}

export async function getRoomBySlug(slug: string, locale?: Locale): Promise<Room | null> {
  const room = await serverGetDocumentBySlug<Room>(FIRESTORE_COLLECTIONS.rooms, slug, {
    publishedOnly: true,
  });
  return room ? localizeRoom(room, locale) : null;
}

export async function getFeaturedRooms(count = 4, locale?: Locale): Promise<Room[]> {
  const rooms = await getRooms(locale);
  return rooms.filter((r) => r.featured).slice(0, count);
}

export async function getAllRoomSlugs(): Promise<string[]> {
  const rooms = await getRooms();
  return rooms.map((r) => r.slug);
}

export async function fetchRoomsByIds(ids: string[], locale?: Locale): Promise<Room[]> {
  if (!ids.length) return [];
  const all = await getRooms(locale);
  return ids.map((id) => all.find((r) => r.id === id)).filter((r): r is Room => Boolean(r));
}

export async function getTours(): Promise<Tour[]> {
  const tours = await serverGetCollection<Tour>(FIRESTORE_COLLECTIONS.tours, {
    publishedOnly: true,
  });
  return tours.sort(byOrder);
}

export async function getTourBySlug(slug: string): Promise<Tour | null> {
  return serverGetDocumentBySlug<Tour>(FIRESTORE_COLLECTIONS.tours, slug, {
    publishedOnly: true,
  });
}

export async function getFeaturedTours(count = 4): Promise<Tour[]> {
  const tours = await getTours();
  return tours.filter((t) => t.featured).slice(0, count);
}

export async function getAllTourSlugs(): Promise<string[]> {
  const tours = await getTours();
  return tours.map((t) => t.slug);
}

export async function fetchToursByIds(ids: string[]): Promise<Tour[]> {
  if (!ids.length) return [];
  const all = await getTours();
  return ids.map((id) => all.find((t) => t.id === id)).filter((t): t is Tour => Boolean(t));
}

export async function getActivities(): Promise<Activity[]> {
  const activities = await serverGetCollection<Activity>(FIRESTORE_COLLECTIONS.activities);
  return activities.sort(byOrder);
}

export async function getTransportation(): Promise<Transportation[]> {
  const items = await serverGetCollection<Transportation>(FIRESTORE_COLLECTIONS.transportation, {
    publishedOnly: true,
  });
  return items.sort(byOrder);
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const items = await serverGetCollection<GalleryItem>(FIRESTORE_COLLECTIONS.gallery);
  return items.sort(byOrder);
}

export async function getFeaturedGallery(count = 8): Promise<GalleryItem[]> {
  const items = await getGalleryItems();
  return items.filter((i) => i.featured).slice(0, count);
}

export async function getReviews(): Promise<Review[]> {
  return serverGetCollection<Review>(FIRESTORE_COLLECTIONS.reviews);
}

export async function getFeaturedReviews(count = 4): Promise<Review[]> {
  const reviews = await getReviews();
  return reviews.filter((r) => r.featured).slice(0, count);
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const posts = await serverGetCollection<BlogPost>(FIRESTORE_COLLECTIONS.blogPosts, {
    statusPublished: true,
  });
  return (posts.length ? posts : FALLBACK_BLOG_POSTS).sort(byPublishedAtDesc);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const post = await serverGetDocumentBySlug<BlogPost>(FIRESTORE_COLLECTIONS.blogPosts, slug, {
    statusPublished: true,
  });
  return post ?? FALLBACK_BLOG_POSTS.find((item) => item.slug === slug) ?? null;
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const posts = await getBlogPosts();
  return posts.map((p) => p.slug);
}

export async function getHomepageContent(): Promise<HomepageContent | null> {
  const doc = await serverGetDocument<HomepageContent>(
    FIRESTORE_COLLECTIONS.homepageContent,
    HOMEPAGE_ID
  );
  return doc ? normalizeHomepage(doc) : null;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const settings = await serverGetDocument<SiteSettings>(
    FIRESTORE_COLLECTIONS.siteSettings,
    SETTINGS_ID
  );
  return normalizeSiteSettings(settings);
}

export async function getContactInformation(): Promise<ContactInformation> {
  const [contact, settings] = await Promise.all([
    serverGetDocument<ContactInformation>(
      FIRESTORE_COLLECTIONS.contactInformation,
      CONTACT_ID
    ),
    serverGetDocument<SiteSettings>(FIRESTORE_COLLECTIONS.siteSettings, SETTINGS_ID),
  ]);

  return normalizeContactInformation(contact, settings);
}

export async function getStoryContent(locale: Locale): Promise<StoryContent | null> {
  return serverGetDocument<StoryContent>(FIRESTORE_COLLECTIONS.storyContent, locale);
}

export async function getCafeContent(locale: Locale): Promise<CafeContent | null> {
  return serverGetDocument<CafeContent>(FIRESTORE_COLLECTIONS.cafeContent, locale);
}

export async function getFaqContent(locale: Locale): Promise<FaqContent | null> {
  const meta = await serverGetDocument<FaqContent>(
    FIRESTORE_COLLECTIONS.faqContent,
    locale
  );
  const faqDocs = await serverGetCollection<Faq>(FIRESTORE_COLLECTIONS.faqs, {
    publishedOnly: true,
  });
  const fromCollection = faqDocs
    .filter((f) => f.locale === locale && f.published !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map(({ question, answer, order }) => ({ question, answer, order }));

  const cmsItems =
    fromCollection.length > 0 ? fromCollection : (meta?.items ?? []).filter((i) => i.question?.trim());
  const items = mergeFaqItems(cmsItems, getDefaultTravelFaq(locale));

  if (!meta?.title && !items.length) return null;

  return {
    title:
      meta?.title ??
      (locale === "vi" ? "Câu hỏi thường gặp" : "Frequently Asked Questions"),
    subtitle:
      meta?.subtitle ??
      (locale === "vi"
        ? "Những câu hỏi khách du lịch thường hỏi nhất trước và trong khi ở Phong Nha."
        : "The most common travel questions guests ask before and during a Phong Nha stay."),
    items,
  };
}

export async function getPageContent(
  locale: Locale,
  pageKey: PageKey
): Promise<PageContent | null> {
  return serverGetDocument<PageContent>(
    FIRESTORE_COLLECTIONS.pageContent,
    pageDocId(locale, pageKey)
  );
}

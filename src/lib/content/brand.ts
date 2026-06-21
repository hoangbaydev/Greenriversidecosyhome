import type { Locale } from "@/lib/i18n/config";

export type BrandIcon =
  | "leaf"
  | "heart"
  | "waves"
  | "users"
  | "shield"
  | "message"
  | "coffee"
  | "wifi"
  | "map"
  | "utensils";

export interface WhyStayItem {
  title: string;
  description: string;
  icon: BrandIcon;
}

export interface WeeklyDay {
  day: string;
  activities: string[];
  note?: string;
}

export interface ExploreHighlight {
  title: string;
  description: string;
}

export interface ExploreSection {
  id: string;
  title: string;
  subtitle: string;
  body: string;
  highlights?: ExploreHighlight[];
  ctaHref?: string;
  ctaLabel?: string;
}

const WHY_CHOOSE_EN: WhyStayItem[] = [
  { title: "Beautiful Natural Surroundings", description: "Wake up to stunning views of rice fields, limestone mountains, and the crystal-clear Son River.", icon: "leaf" },
  { title: "Free Breakfast Every Morning", description: "Complimentary breakfast daily from 7:00 AM – 9:30 AM.", icon: "utensils" },
  { title: "Free Activities Included", description: "2 hours of free bicycle use and 30 minutes of paddle boarding or swimming on the Son River.", icon: "waves" },
  { title: "Comfortable Spaces to Relax & Connect", description: "AC, hammocks, bean bags, sofas and beautiful views — perfect for relaxing or remote work.", icon: "users" },
  { title: "Everything You Need", description: "Unlimited filtered water, fast Wi-Fi, secure parking, and free showers before/after stay.", icon: "shield" },
  { title: "Expert Local Support", description: "English-speaking host for tours, transport, Easy Riders, motorbike rental, and laundry.", icon: "map" },
  { title: "Daily Social Activities", description: "Family dinners, happy hours, games, and cultural exchanges every week.", icon: "message" },
  { title: "Local Family Hospitality", description: "Come as our guest, leave as our family.", icon: "heart" },
];

const WHY_CHOOSE_VI: WhyStayItem[] = [
  { title: "Thiên nhiên tuyệt đẹp", description: "Cánh đồng lúa, núi đá vôi và dòng sông Son trong vắt.", icon: "leaf" },
  { title: "Bữa sáng miễn phí", description: "Phục vụ hàng ngày từ 7:00 – 9:30 sáng.", icon: "utensils" },
  { title: "Hoạt động miễn phí", description: "2 giờ xe đạp và 30 phút paddle board/bơi trên sông Son.", icon: "waves" },
  { title: "Không gian thư giãn & kết nối", description: "Võng, bean bag, sofa, điều hòa — lý tưởng để nghỉ ngơi hoặc làm việc.", icon: "users" },
  { title: "Tiện nghi đầy đủ", description: "Nước lọc, Wi-Fi, bãi xe an toàn, phòng tắm trước/sau check-in.", icon: "shield" },
  { title: "Hỗ trợ địa phương chuyên nghiệp", description: "Chủ nhà nói tiếng Anh — tour, xe, Easy Rider, giặt ủi.", icon: "map" },
  { title: "Hoạt động xã hội hàng ngày", description: "Bữa tối gia đình, happy hour, trò chơi và trao đổi văn hóa.", icon: "message" },
  { title: "Lòng hiếu khách gia đình", description: "Đến như khách, về như người thân.", icon: "heart" },
];

const WHY_STAY_EN: WhyStayItem[] = WHY_CHOOSE_EN;
const WHY_STAY_VI: WhyStayItem[] = WHY_CHOOSE_VI;

const WEEKLY_EN: WeeklyDay[] = [
  { day: "Monday", activities: ["Cooking Class", "Vietnamese Language"], note: "Learn simple local dishes and connect through culture and laughter." },
  { day: "Tuesday", activities: ["Smash Ball", "Beer Pong"], note: "Playful tournaments and a fun, competitive atmosphere." },
  { day: "Wednesday", activities: ["Board Games", "Trivia Night"], note: "Relaxed evening — share laughs and meet new people." },
  { day: "Thursday", activities: ["Language Practice", "Craft Painting"], note: "Culture and creativity combined." },
  { day: "Friday", activities: ["Do or Drink"], note: "Our famous lively game night — everyone joins in." },
  { day: "Saturday", activities: ["Music Bingo", "Karaoke Night"], note: "One of the most energetic nights of the week." },
  { day: "Sunday", activities: ["Bar Olympics", "Team Games"], note: "A fun, friendly end to the week." },
];

const WEEKLY_VI: WeeklyDay[] = [
  { day: "Thứ Hai", activities: ["Lớp nấu ăn", "Tiếng Việt"], note: "Học món địa phương và kết nối qua văn hóa." },
  { day: "Thứ Ba", activities: ["Smash Ball", "Beer Pong"], note: "Không khí vui vẻ và cạnh tranh nhẹ." },
  { day: "Thứ Tư", activities: ["Board Games", "Trivia"], note: "Buổi tối thư giãn, dễ làm quen." },
  { day: "Thứ Năm", activities: ["Tiếng Việt", "Vẽ tranh thủ công"], note: "Văn hóa và sáng tạo." },
  { day: "Thứ Sáu", activities: ["Do or Drink"], note: "Đêm game sôi động nhất tuần." },
  { day: "Thứ Bảy", activities: ["Music Bingo", "Karaoke"], note: "Đêm giải trí đầy năng lượng." },
  { day: "Chủ Nhật", activities: ["Bar Olympics", "Trò chơi đội"], note: "Kết thúc tuần vui vẻ và thân thiện." },
];

export function getWhyStayItems(locale: Locale): WhyStayItem[] {
  return locale === "vi" ? WHY_STAY_VI : WHY_STAY_EN;
}

export function getWeeklySchedule(locale: Locale): WeeklyDay[] {
  return locale === "vi" ? WEEKLY_VI : WEEKLY_EN;
}

export function getExploreSections(locale: Locale): ExploreSection[] {
  const vi = locale === "vi";
  return [
    {
      id: "why-phong-nha",
      title: vi ? "Phong Nha – Vương quốc hang động" : "Phong Nha – The Kingdom of Caves",
      subtitle: vi ? "Di sản UNESCO · Quảng Bình" : "UNESCO World Heritage · Quang Binh",
      body: vi
        ? "Phong Nha – Kẻ Bàng là một trong những hệ thống hang động ngoạn mục nhất thế giới — hơn 400 hang đã được phát hiện, núi đá vôi, sông ngầm và làng quê yên bình.\n\nVới hàng trăm hoạt động trên GetYourGuide, Tripadvisor và mạng xã hội, rất dễ bị choáng ngợp. Tại Green Riverside, cô Linh — hơn 30 năm sống tại địa phương và hơn 10 năm làm hướng dẫn viên — sẽ tư vấn trung thực theo thời gian, sức khỏe và ngân sách của bạn."
        : "Phong Nha – Ke Bang National Park is known worldwide as the “Kingdom of Caves.” With more than 400 discovered caves, dramatic limestone mountains, underground rivers, and peaceful Son River villages, it is one of Earth's most spectacular landscapes.\n\nWith countless options on GetYourGuide, Tripadvisor, and social media, it is easy to feel overwhelmed. At Green Riverside Cosy Home, Ms. Linh — with over 30 years of local life and 10+ years as a tour guide and travel consultant — gives honest, tailored recommendations based on your time, fitness, interests, and budget.",
    },
    {
      id: "bong-lai",
      title: vi ? "Thung lũng Bong Lai" : "Bong Lai Valley",
      subtitle: vi ? "10–15 km từ Phong Nha · Làng quê chân thực" : "10–15 km from town · Authentic countryside",
      body: vi
        ? "Bong Lai Valley nổi tiếng với cánh đồng lúa, sông, trang trại và trải nghiệm vui nhộn. Tour xe đạp sáng/chiều kèm lớp nấu ăn với Green Riverside là cách dễ nhất để khám phá mà không lo lạc đường.\n\nBạn có thể tự đạp xe, đi xe máy, hoặc tham gia tour có hướng dẫn để gặp gỡ người dân và những điểm ẩn mà du khách tự đi thường bỏ lỡ."
        : "Bong Lai Valley is one of the most unique countryside areas near Phong Nha — rice fields, rivers, farms, and fun local experiences. Our Morning or Afternoon Cycling Tour & Cooking Class is the easiest, most meaningful way to explore without route confusion.\n\nYou can self-cycle, ride a motorbike, or join our guided tour for local stories and hidden spots most independent travellers miss.",
      highlights: [
        { title: "Duck Stop", description: vi ? "Trải nghiệm “duck leader”, Bánh Xèo và massage chân vịt — biểu tượng Bong Lai." : "Become a duck leader, enjoy Bánh Xèo and the famous duck foot massage." },
        { title: "Duck Tang Farm", description: vi ? "Cưỡi trâu, cho vật nuôi ăn, câu cá, bữa ăn hữu cơ tươi." : "Buffalo riding, animal feeding, fishing, and fresh organic meals." },
        { title: "Monkey Bridge", description: vi ? "Cầu khỉ, xích đu và thử thách nông thôn vui nhộn tại Cuong Rung Farm." : "Monkey bridge, swings, and light adventure at Cuong Rung Farm." },
        { title: "Pub With Cold Beer", description: vi ? "BBQ gà, hồ bơi và view thung lũng — điểm nghỉ giữa hành trình." : "Cold drinks, BBQ chicken, swimming pool, and open valley views." },
        { title: "Ồ Ồ Lake", description: vi ? "Bơi, paddle board, gà nướng và cơm nếp — điểm kết thúc lý tưởng." : "Swim, paddle board, grilled chicken, and sticky rice by the water." },
        { title: "Funky Beach & East Hill", description: vi ? "Bãi sông thư giãn và điểm ngắm hoàng hôn đẹp nhất thung lũng." : "Riverside chill spot and East Hill — golden sunset over rice fields." },
      ],
      ctaHref: "/tours",
      ctaLabel: vi ? "Tour Bong Lai & nấu ăn" : "Bong Lai cycling tour",
    },
    {
      id: "motorbike",
      title: vi ? "Khám phá bằng xe máy" : "Explore by Motorbike",
      subtitle: vi ? "Vòng loop công viên quốc gia" : "National park loop routes",
      body: vi
        ? "Xe máy mở ra hành trình rộng hơn — núi đá vôi, thung lũng ẩn và đường mòn hoang sơ. Không tự tin? Đặt Easy Rider hoặc xe riêng — Grab hầu như không có ở vùng sâu trong mùa cao điểm."
        : "A motorbike adventure opens up dramatic karsts, hidden valleys, and back roads at your own pace — the perfect alternative if you want more freedom than a cycling tour.\n\nNot confident riding? Book our Easy Rider or private car — ride-hailing is very limited in deeper areas of the national park, especially in high season.",
      highlights: [
        { title: vi ? "Route 1: Caves & Country (50–90 km)" : "Route 1: Caves & Country Loop (50–90 km)", description: vi ? "Countryside, làng và khu hang nổi tiếng." : "Countryside roads, villages, and famous cave areas." },
        { title: vi ? "Route 2: Bridges & Back-Roads (40 km)" : "Route 2: Bridges & Back-Roads (40 km)", description: vi ? "Đường làng yên tĩnh, cầu nhỏ, xa đám đông." : "Quiet rural roads and authentic landscapes." },
        { title: vi ? "Route 3: Bong Lai Valley (15 km)" : "Route 3: Bong Lai Valley Loop (15 km)", description: vi ? "Vòng ngắn qua trang trại và điểm vui ở Bong Lai." : "Short loop through farms and valley highlights." },
        { title: vi ? "Route 4: Ho Chi Minh West (290 km)" : "Route 4: Ho Chi Minh West is Best (290 km)", description: vi ? "Hành trình dài qua núi và làng remote." : "Long adventure along historic mountain roads." },
        { title: vi ? "Route 5: King Kong Loop (190–220 km)" : "Route 5: King Kong Loop (190–220 km)", description: vi ? "Đường phim King Kong: Skull Island." : "Cinematic route through Skull Island filming locations." },
      ],
      ctaHref: "/transportation",
      ctaLabel: vi ? "Easy Rider & thuê xe" : "Easy Rider & rentals",
    },
    {
      id: "classic-tours",
      title: vi ? "Tour hang động kinh điển" : "National Classic Tours",
      subtitle: vi ? "Dễ · Thư giãn · Must-see" : "Easy · Relaxed · Must-see caves",
      body: vi
        ? "Tour nửa ngày hoặc cả ngày tới Phong Nha Cave, Paradise Cave, Dark Cave và các combo — phù hợp nếu bạn có một ngày và muốn trải nghiệm kinh điển không cần lên kế hoạch phức tạp.\n\n🎁 ƯU ĐÃI: Shuttle MIỄN PHÍ tới Duck Tang Farm cho khách Green Riverside trên mọi National Classic Tour."
        : "Half-day and full-day tours to Phong Nha Cave, Paradise Cave, Dark Cave, and combinations — perfect if you have limited time and want iconic caves without complicated planning.\n\n🎁 SPECIAL OFFER: FREE shuttle to Duck Tang Farm (Bong Lai Valley) for all Green Riverside guests on National Classic Tours. See our Tours page for full pricing from 650,000 VND.",
      ctaHref: "/tours",
      ctaLabel: vi ? "Xem bảng giá tour" : "View classic tour prices",
    },
    {
      id: "adventure",
      title: vi ? "Tour hang mạo hiểm" : "Adventure Cave Tours",
      subtitle: vi ? "Từ Easy đến Extremely Strenuous" : "Jungle treks · Overnight camping",
      body: vi
        ? "Trek rừng nguyên sinh, bơi hang động, leo núi đá vôi, camping qua đêm — từ Wildlife 1 Day đến Kong Collapse 5 ngày 4 đêm. Hướng dẫn viên địa phương, bữa ăn home-cooked và đội hỗ trợ an toàn.\n\nLiên hệ cô Linh qua WhatsApp để chọn tour phù hợp thể lực, thời gian và ngân sách."
        : "Trek ancient jungle, wade clear streams, explore remote villages, climb karsts, swim in cave pools, paddle underground rivers, and camp overnight inside caves — from easy 1-day trips to 5-day Kong Collapse expeditions.\n\nContact Ms. Linh on WhatsApp for honest advice on fitness level, timing, and the perfect adventure for you. Prices from 1,490,000 VND (Wildlife Trek) to 35,000,000 VND (Kong Collapse).",
      ctaHref: "/tours",
      ctaLabel: vi ? "Tư vấn tour mạo hiểm" : "Adventure tour advice",
    },
  ];
}

export const LINH_ROLES_EN = [
  "English Teacher",
  "Tour Guide",
  "Travel Consultant",
  "Receptionist",
];

export const LINH_ROLES_VI = [
  "Giáo viên tiếng Anh",
  "Hướng dẫn viên du lịch",
  "Tư vấn du lịch",
  "Lễ tân",
];

export function getLinhRoles(locale: Locale) {
  return locale === "vi" ? LINH_ROLES_VI : LINH_ROLES_EN;
}

const STORY_VALUE_EMOJI = ["🌿", "🏡", "🤝"] as const;

export function parseStoryValues(text: string | undefined, locale: Locale) {
  const fallback = [
    {
      emoji: "🌿" as const,
      title: locale === "vi" ? "Thiên nhiên" : "Nature",
      body: locale === "vi"
        ? "Thức giấc giữa cánh đồng lúa, núi đá vôi và view sông."
        : "Wake up surrounded by rice fields, limestone mountains, and beautiful river views.",
    },
    {
      emoji: "🏡" as const,
      title: locale === "vi" ? "Gia đình" : "Family",
      body: locale === "vi"
        ? "Lòng hiếu khách chân thành từ đội ngũ gia đình."
        : "Experience genuine local hospitality from our family-run team.",
    },
    {
      emoji: "🤝" as const,
      title: locale === "vi" ? "Cộng đồng" : "Community",
      body: locale === "vi"
        ? "Kết nối qua bữa tối gia đình và hoạt động xã hội."
        : "Connect through family dinners, social activities, and shared adventures.",
    },
  ];

  if (!text?.trim()) return fallback;

  const parts = text.split(/\n\n+/).filter(Boolean);
  if (parts.length < 2) return fallback;

  return parts.slice(0, 3).map((part, index) => {
    const [titleLine, ...rest] = part.split(" — ");
    const title = titleLine?.replace(/^[^A-Za-zÀ-ỹ]*\s*/, "").trim() || fallback[index]?.title || "";
    const body = rest.length ? rest.join(" — ").trim() : part.replace(/^[^—]+—\s*/, "").trim();
    return {
      emoji: STORY_VALUE_EMOJI[index] ?? "🌿",
      title: title || fallback[index]?.title || "",
      body: body || fallback[index]?.body || "",
    };
  });
}

export interface CafeExperienceBlock {
  title: string;
  description: string;
  imageKey: keyof typeof import("@/lib/sample-media").SAMPLE_IMAGES;
}

export function getCafeExperienceBlocks(locale: Locale): CafeExperienceBlock[] {
  const vi = locale === "vi";
  return [
    {
      title: vi ? "Trải nghiệm ẩm thực" : "Food Experience",
      description: vi
        ? "Bữa sáng tươi mát — trứng bánh mì, pancake trái cây, smoothie bowl và món Việt truyền thống. Cả ngày phục vụ menu Việt, món Tây, khai vị, chay và món đặc biệt hàng ngày."
        : "Breakfast with egg & baguette, pancakes, smoothie bowls, and traditional Vietnamese dishes. All-day menu of local Vietnamese food, Western comfort food, starters, vegetarian options, and daily specials — simple, honest, and satisfying.",
      imageKey: "lunch",
    },
    {
      title: vi ? "Đồ uống & văn hóa cà phê" : "Drinks & Coffee Culture",
      description: vi
        ? "Cà phê phin, cà phê sữa đá, egg coffee, salt coffee, peanut coffee, coconut coffee — cùng nước ép, smoothie, trà thảo mộc, craft beer và cocktail hoàng hôn."
        : "Vietnamese drip coffee, iced milk coffee, egg coffee, salt coffee, peanut coffee, coconut coffee — plus fresh juices, smoothies, herbal teas, craft beer, and sunset cocktails over the rice fields.",
      imageKey: "rooftop",
    },
    {
      title: vi ? "Trải nghiệm rooftop" : "Rooftop Experience",
      description: vi
        ? "Không gian ngoài trời từ bình minh đến hoàng hôn — không khí núi trong lành, view sông yên bình và ánh vàng trên cánh đồng lúa."
        : "Open-air space from sunrise to sunset — fresh mountain air, peaceful river views, and golden light over the rice fields. Many guests come for a short break and stay for hours.",
      imageKey: "sunset",
    },
    {
      title: vi ? "Hoạt động & đời sống xã hội" : "Activities & Social Life",
      description: vi
        ? "Bóng bàn, bi-a, foosball, yoga mats, góc đổi sách — buổi tối có game night, karaoke, music bingo, học tiếng Việt và các buổi gặp gỡ thân thiện."
        : "Table tennis, pool, foosball, yoga mats, book exchange — evenings bring game nights, karaoke, music bingo, Vietnamese lessons, and gatherings where travellers connect naturally.",
      imageKey: "community",
    },
    {
      title: vi ? "Một ngày tại Cozy Cafe" : "The Experience",
      description: vi
        ? "Từ cà phê bình minh yên tĩnh, chiều làm việc chậm rãi, đến cocktail hoàng hôn và buổi tối social với bạn mới từ khắp nơi trên thế giới."
        : "A gentle flow from quiet sunrise coffee, to slow productive afternoons, sunset drinks over the rice fields, and social evenings filled with new friends and shared stories.",
      imageKey: "river",
    },
    {
      title: vi ? "Vì sao khách yêu thích" : "Why Guests Love Cozy Cafe Rooftop",
      description: vi
        ? "Một trong những view rooftop đẹp nhất Phong Nha, cà phê Việt chân thực, ẩm thực home-style và không khí vừa thư giãn vừa giao lưu."
        : "One of the best rooftop views in Phong Nha, authentic Vietnamese coffee culture, fresh home-style food, and a relaxed yet social atmosphere that feels like home in nature.",
      imageKey: "mountains",
    },
    {
      title: vi ? "Ghé thăm chúng tôi" : "Visit Us",
      description: vi
        ? "Đến vì cà phê, ở lại vì món ăn, view và cảm giác như ở nhà giữa thiên nhiên. Tầng 4 — Green Riverside Cosy Home."
        : "Come for a coffee, stay for the food, the views, and the feeling of being at home in nature. 4th Floor — Green Riverside Cosy Home.",
      imageKey: "homestay",
    },
  ];
}

export function getSocialActivitiesIntro(locale: Locale): { lead: string; paragraphs: string[] } {
  const vi = locale === "vi";
  if (vi) {
    return {
      lead: "Come as our guest, leave as our family",
      paragraphs: [
        "Tại Green Riverside – Cozy Cafe Rooftop, du lịch không chỉ là nơi ở hay ăn uống — mà là con người bạn gặp và kỷ niệm bạn tạo ra. Nhiều khách đến một mình nhưng nhanh chóng trở thành bạn bè và cảm thấy như một phần của gia đình lớn hơn.",
        "Mỗi ngày chúng tôi tổ chức Family Dinner và Happy Hour — mọi người quây quần quanh bàn chung, thưởng thức món địa phương và tự nhiên kết nối với nhau. Buổi tối tiếp tục với các hoạt động thay đổi theo năng lượng và sở thích của khách trong ngày.",
      ],
    };
  }
  return {
    lead: "Come as our guest, leave as our family",
    paragraphs: [
      "At Green Riverside Cosy Home – Cozy Cafe Rooftop, travel is about the people you meet and the memories you create. Many guests arrive alone but quickly become friends — and often leave feeling like part of a bigger family.",
      "Every day we organize Family Dinner and Happy Hour where everyone gathers around a shared table. After dinner, the evening continues with activities that change depending on the energy and interests of guests that day.",
      "Our social atmosphere is designed naturally so guests can meet without anything feeling forced — whether you travel solo, as a couple, or in a group.",
    ],
  };
}

export function getFallbackReviews(locale: Locale) {
  const vi = locale === "vi";
  return [
    {
      id: "fallback-emily",
      author: "Emily",
      country: vi ? "Úc" : "Australia",
      rating: 5,
      content: vi
        ? "Một trong những nơi tuyệt vời nhất chúng tôi ở tại Việt Nam. Bữa tối gia đình thật tuyệt và chúng tôi gặp rất nhiều người tuyệt vời."
        : "One of the best places we stayed in Vietnam. The family dinner was amazing and we met so many great people.",
      source: "google" as const,
      date: "2025-11-20",
      featured: true,
    },
    {
      id: "fallback-tom",
      author: "Tom",
      country: vi ? "Anh Quốc" : "United Kingdom",
      rating: 5,
      content: vi
        ? "Vị trí tuyệt đẹp, café rooftop tuyệt vời và chủ nhà cực kỳ nhiệt tình."
        : "Beautiful location, fantastic rooftop café and incredibly helpful hosts.",
      source: "tripadvisor" as const,
      date: "2025-10-15",
      featured: true,
    },
    {
      id: "fallback-sarah",
      author: "Sarah M.",
      country: vi ? "Canada" : "Canada",
      rating: 5,
      content: vi
        ? "Cảm giác như về nhà ngay từ đêm đầu. Gia đình rất chào đón và các tour được sắp xếp hoàn hảo."
        : "Felt like home from the first night. The family is incredibly welcoming and the tours were amazing.",
      source: "google" as const,
      date: "2025-09-08",
      featured: true,
    },
    {
      id: "fallback-marco",
      author: "Marco R.",
      country: vi ? "Ý" : "Italy",
      rating: 5,
      content: vi
        ? "Lòng hiếu khách Việt Nam chân thực. Lớp nấu ăn và kayak lúc hoàng hôn thật khó quên."
        : "Authentic Vietnamese hospitality. The cooking class and kayak sunset were unforgettable.",
      source: "tripadvisor" as const,
      date: "2025-08-22",
      featured: true,
    },
  ];
}

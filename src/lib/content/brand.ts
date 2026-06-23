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

const WHY_STAY_EN: WhyStayItem[] = [
  {
    title: "Beautiful Natural Surroundings",
    description:
      "Wake up to rice fields, limestone mountains, and peaceful views of the Son River.",
    icon: "leaf",
  },
  {
    title: "Free Breakfast Every Morning",
    description: "Start the day with complimentary breakfast served daily from 7:00 AM to 9:30 AM.",
    icon: "utensils",
  },
  {
    title: "Free Activities Included",
    description:
      "Enjoy 2 hours of bicycle use and 30 minutes of paddle boarding or swimming in the Son River.",
    icon: "waves",
  },
  {
    title: "Comfortable Spaces to Relax & Connect",
    description:
      "Indoor and outdoor common areas with air-conditioning, fans, hammocks, bean bags, sofas, and beautiful views.",
    icon: "users",
  },
  {
    title: "Everything You Need for a Comfortable Stay",
    description:
      "Filtered drinking water, fast Wi-Fi, secure indoor parking, and shower/toilet access before check-in or after check-out.",
    icon: "shield",
  },
  {
    title: "Expert Local Support",
    description:
      "Ms. Linh can help with tours, transport, bus tickets, motorbike rental, Easy Riders, taxis, private cars, and laundry.",
    icon: "map",
  },
  {
    title: "Daily Social Activities",
    description:
      "Family dinners, happy hours, games, cultural exchanges, and relaxed events help travellers connect naturally.",
    icon: "message",
  },
  {
    title: "Local Family Hospitality",
    description: "More than a hostel, Green Riverside is a place where guests are welcomed like family.",
    icon: "heart",
  },
];

const WHY_STAY_VI: WhyStayItem[] = [
  {
    title: "Thiên nhiên tuyệt đẹp",
    description: "Thức dậy giữa cánh đồng lúa, núi đá vôi và khung cảnh yên bình bên sông Son.",
    icon: "leaf",
  },
  {
    title: "Bữa sáng miễn phí mỗi ngày",
    description: "Bắt đầu ngày mới với bữa sáng miễn phí phục vụ hằng ngày từ 7:00 đến 9:30.",
    icon: "utensils",
  },
  {
    title: "Hoạt động miễn phí đi kèm",
    description:
      "Tận hưởng 2 giờ sử dụng xe đạp và 30 phút chèo SUP hoặc bơi ở sông Son.",
    icon: "waves",
  },
  {
    title: "Không gian thư giãn và kết nối",
    description:
      "Khu sinh hoạt trong nhà và ngoài trời có điều hòa, quạt, võng, ghế lười, sofa và tầm nhìn đẹp.",
    icon: "users",
  },
  {
    title: "Đầy đủ tiện ích cho kỳ nghỉ thoải mái",
    description:
      "Nước lọc miễn phí, Wi-Fi nhanh, chỗ đậu xe an toàn và phòng tắm/nhà vệ sinh trước check-in hoặc sau check-out.",
    icon: "shield",
  },
  {
    title: "Hỗ trợ địa phương tận tâm",
    description:
      "Cô Linh hỗ trợ tour, phương tiện, vé xe, thuê xe máy, Easy Rider, taxi, xe riêng và giặt ủi.",
    icon: "map",
  },
  {
    title: "Hoạt động giao lưu hằng ngày",
    description:
      "Bữa tối gia đình, happy hour, trò chơi, giao lưu văn hóa và các hoạt động giúp du khách kết nối tự nhiên.",
    icon: "message",
  },
  {
    title: "Lòng hiếu khách gia đình",
    description: "Hơn cả một hostel, Green Riverside là nơi du khách được chào đón như người thân.",
    icon: "heart",
  },
];

const WEEKLY_EN: WeeklyDay[] = [
  {
    day: "Monday",
    activities: ["Cooking Class", "Vietnamese Language"],
    note: "Learn simple local dishes and connect through culture and laughter.",
  },
  {
    day: "Tuesday",
    activities: ["Smash Ball", "Beer Pong"],
    note: "Playful tournaments and an easy social atmosphere.",
  },
  {
    day: "Wednesday",
    activities: ["Board Games", "Trivia Night"],
    note: "A relaxed evening for sharing laughs and meeting new people.",
  },
  {
    day: "Thursday",
    activities: ["Vietnamese Practice", "Craft Painting"],
    note: "A mix of culture, creativity, and conversation.",
  },
  {
    day: "Friday",
    activities: ["Do or Drink"],
    note: "A lively game night where everyone can join in.",
  },
  {
    day: "Saturday",
    activities: ["Music Bingo", "Karaoke Night"],
    note: "One of the most energetic and entertaining nights of the week.",
  },
  {
    day: "Sunday",
    activities: ["Bar Olympics", "Team Games"],
    note: "A fun, friendly way to end the week together.",
  },
];

const WEEKLY_VI: WeeklyDay[] = [
  {
    day: "Thứ Hai",
    activities: ["Lớp nấu ăn", "Tiếng Việt giao tiếp"],
    note: "Học món địa phương đơn giản và kết nối qua văn hóa, tiếng cười.",
  },
  {
    day: "Thứ Ba",
    activities: ["Smash Ball", "Beer Pong"],
    note: "Các trò chơi vui, cạnh tranh nhẹ và dễ làm quen.",
  },
  {
    day: "Thứ Tư",
    activities: ["Board Games", "Đố vui"],
    note: "Buổi tối thư giãn để trò chuyện, cười vui và gặp bạn mới.",
  },
  {
    day: "Thứ Năm",
    activities: ["Luyện tiếng Việt", "Vẽ thủ công"],
    note: "Kết hợp văn hóa, sáng tạo và giao lưu.",
  },
  {
    day: "Thứ Sáu",
    activities: ["Do or Drink"],
    note: "Đêm trò chơi sôi động để mọi người cùng tham gia.",
  },
  {
    day: "Thứ Bảy",
    activities: ["Music Bingo", "Karaoke"],
    note: "Một trong những đêm vui và nhiều năng lượng nhất trong tuần.",
  },
  {
    day: "Chủ Nhật",
    activities: ["Bar Olympics", "Trò chơi đội nhóm"],
    note: "Kết thúc tuần bằng một buổi tối thân thiện và nhiều tiếng cười.",
  },
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
      title: vi ? "Phong Nha - Vương quốc hang động" : "Phong Nha - The Kingdom of Caves",
      subtitle: vi ? "Di sản UNESCO và thiên nhiên nguyên sơ" : "UNESCO heritage and untouched nature",
      body: vi
        ? "Phong Nha - Kẻ Bàng là một trong những hệ thống hang động ngoạn mục nhất thế giới, với hơn 400 hang đã được phát hiện, núi đá vôi hùng vĩ, sông ngầm, thung lũng xanh và những làng quê yên bình bên sông Son.\n\nCó quá nhiều lựa chọn tour trên mạng xã hội và các nền tảng đặt dịch vụ, nên du khách rất dễ bị rối. Tại Green Riverside, cô Linh hỗ trợ bạn chọn trải nghiệm phù hợp với thời gian, thể lực, sở thích và ngân sách."
        : "Phong Nha - Ke Bang National Park is known worldwide as the Kingdom of Caves. With more than 400 discovered caves, limestone mountains, underground rivers, jungle valleys, and peaceful Son River villages, it is one of the most spectacular landscapes in Vietnam.\n\nWith so many tour options online, it is easy to feel overwhelmed. At Green Riverside, Ms. Linh helps you choose the right experiences for your time, fitness level, interests, and budget.",
    },
    {
      id: "bong-lai",
      title: vi ? "Tour Xe Đạp Đồng Quê" : "Countryside Cycling Tours",
      subtitle: vi ? "Đồng quê, trang trại và trải nghiệm địa phương" : "Countryside, farms, and local experiences",
      body: vi
        ? "Bong Lai Valley nằm cách trung tâm Phong Nha khoảng 10-15 km, nổi tiếng với đồng lúa, dòng sông, trang trại và những trải nghiệm vui, gần gũi với đời sống nông thôn.\n\nBạn có thể tự đạp xe, đi xe máy hoặc tham gia tour xe đạp và lớp nấu ăn cùng Green Riverside để tiết kiệm thời gian, đi đúng tuyến và hiểu câu chuyện địa phương phía sau mỗi điểm dừng."
        : "Bong Lai Valley is one of the most unique countryside areas near Phong Nha, about 10-15 km from town. It is known for rice fields, rivers, farms, and playful local experiences beyond the caves.\n\nYou can self-cycle, ride a motorbike, or join our guided cycling tour and cooking class for a smoother route, local stories, and hidden stops that are easy to miss on your own.",
      highlights: [
        {
          title: "Duck Stop",
          description: vi
            ? "Trở thành duck leader, thử massage chân vịt, thưởng thức bánh xèo và một trải nghiệm rất vui của Bong Lai."
            : "Become a duck leader, try the famous duck foot massage, and enjoy banh xeo in one of Bong Lai's most iconic stops.",
        },
        {
          title: "Duck Tang Farm",
          description: vi
            ? "Cưỡi trâu, cho vật nuôi ăn, câu cá, hái rau và dùng bữa với nguyên liệu địa phương tươi mới."
            : "Buffalo riding, animal feeding, fishing, vegetable picking, and a fresh meal made with local ingredients.",
        },
        {
          title: "Monkey Bridge & Countryside Stops",
          description: vi
            ? "Cầu khỉ, xích đu và các thử thách nhẹ ở vùng quê, phù hợp để vui chơi và chụp ảnh."
            : "Monkey bridge, swings, and countryside challenges for light adventure and memorable photos.",
        },
        {
          title: "Pub With Cold Beer",
          description: vi
            ? "Một điểm dừng thư giãn với đồ uống lạnh, gà nướng, hồ bơi và tầm nhìn thung lũng."
            : "Cold drinks, BBQ chicken, a swimming pool, and open valley views for a relaxed afternoon break.",
        },
        {
          title: "O O Lake",
          description: vi
            ? "Điểm bơi tự nhiên để thư giãn, chèo SUP và thưởng thức các món địa phương khi thời tiết phù hợp."
            : "A natural swimming spot for relaxing, paddle boarding, and simple local food when conditions are suitable.",
        },
        {
          title: "Funky Beach & East Hill",
          description: vi
            ? "Điểm ven sông thư giãn và nơi ngắm hoàng hôn đẹp trên cánh đồng, núi và làng quê."
            : "Relaxed riverside stops and one of the most beautiful sunset viewpoints over fields and mountains.",
        },
      ],
      ctaHref: "/tours",
      ctaLabel: vi ? "Xem tour Bong Lai" : "View Bong Lai tours",
    },
    {
      id: "motorbike-adventures",
      title: vi ? "Tour Xe Máy Vòng Quanh" : "Motorbike Loop Tours",
      subtitle: vi ? "Tự do khám phá các cung đường Phong Nha" : "Scenic loop routes through Phong Nha",
      body: vi
        ? "Nếu bạn muốn đi xa hơn tour xe đạp, xe máy là cách linh hoạt để khám phá núi đá vôi, đường làng, thung lũng ẩn và các cung đường trong Vườn quốc gia Phong Nha - Kẻ Bàng.\n\nBạn có thể tự lái nếu có kinh nghiệm, hoặc chọn Easy Rider/xe riêng để an toàn và thoải mái hơn. Dịch vụ gọi xe như Grab rất hạn chế ở khu vực sâu trong vườn quốc gia, nên nên sắp xếp trước."
        : "If you want to explore beyond the cycling route, a motorbike adventure gives you freedom to reach limestone mountains, back roads, hidden valleys, and scenic routes inside Phong Nha - Ke Bang National Park.\n\nRide yourself if you are confident, or book an Easy Rider/private car for a safer, more comfortable experience. Ride-hailing services are very limited in deeper national park areas, so pre-arranged transport is strongly recommended.",
      highlights: [
        {
          title: "Caves & Country Loop",
          description: vi
            ? "Tuyến 50-90 km kết hợp đường quê, làng địa phương và khu vực hang động nổi tiếng."
            : "A 50-90 km route combining countryside roads, local villages, and famous cave areas.",
        },
        {
          title: "Bridges & Back-Roads Loop",
          description: vi
            ? "Tuyến khoảng 40 km qua đường nhỏ, cầu làng và cảnh quan yên tĩnh ít đông khách."
            : "A relaxed 40 km route through quiet back roads, small bridges, and authentic rural scenery.",
        },
        {
          title: "Bong Lai Valley Loop",
          description: vi
            ? "Vòng ngắn khoảng 15 km qua trang trại, đồng quê và các điểm vui trong thung lũng."
            : "A short 15 km loop through farms, local experiences, and countryside highlights.",
        },
        {
          title: "Ho Chi Minh West Loop",
          description: vi
            ? "Cung đường dài khoảng 290 km qua núi, làng xa và cảnh quan hoang sơ cho tay lái có kinh nghiệm."
            : "A 290 km mountain route with remote villages and untouched scenery for experienced riders.",
        },
        {
          title: "King Kong Loop",
          description: vi
            ? "Cung đường 190-220 km qua cảnh quan đá vôi ấn tượng và khu vực từng xuất hiện trong phim."
            : "A 190-220 km cinematic route through dramatic limestone landscapes and film locations.",
        },
      ],
      ctaHref: "/transport",
      ctaLabel: vi ? "Xem thuê xe & Easy Rider" : "View rentals & Easy Rider",
    },
    {
      id: "classic-cave-tours",
      title: vi ? "Tour Hang Động Kinh Điển" : "Classic Cave Tours",
      subtitle: vi ? "Nhẹ nhàng, dễ đi và phù hợp lần đầu đến Phong Nha" : "Easy, relaxed, must-see cave experiences",
      body: vi
        ? "Classic Cave Tours phù hợp nếu bạn có ít thời gian và muốn thăm các hang nổi tiếng như Phong Nha Cave, Paradise Cave, Dark Cave hoặc các combo nửa ngày/cả ngày mà không cần tự lên kế hoạch phức tạp.\n\nKhách Green Riverside có thể nhận hỗ trợ chọn tour, đặt nhanh và kết hợp shuttle miễn phí đến Duck Tang Farm khi áp dụng."
        : "Classic Cave Tours are ideal if you have limited time and want to visit famous caves such as Phong Nha Cave, Paradise Cave, Dark Cave, or easy half-day/full-day combinations without complicated planning.\n\nGreen Riverside guests receive local support for choosing the right tour, fast booking, and free shuttle connection to Duck Tang Farm where available.",
      ctaHref: "/tours",
      ctaLabel: vi ? "Xem bảng tour" : "View tour options",
    },
    {
      id: "adventure-cave-tours",
      title: vi ? "Tour Hang Động Mạo Hiểm" : "Adventure Cave Tours",
      subtitle: vi ? "Trekking rừng, bơi hang và cắm trại qua đêm" : "Jungle trekking, cave swimming, and overnight expeditions",
      body: vi
        ? "Phong Nha là điểm đến tuyệt vời cho người thích phiêu lưu. Các tour có thể bao gồm trekking rừng nguyên sinh, lội suối, thăm bản làng xa, leo núi đá vôi, khám phá hang, bơi trong hồ hang trong xanh, chèo SUP trong hang và cắm trại qua đêm.\n\nCó nhiều cấp độ từ tour một ngày dễ đi đến hành trình 2, 3, 4 hoặc 5 ngày. Cô Linh sẽ tư vấn tour phù hợp với thời gian, thể lực và ngân sách của bạn."
        : "Phong Nha is one of Vietnam's best destinations for adventure lovers. Tours may include jungle trekking, stream crossings, remote villages, limestone climbs, cave exploration, swimming in clear cave pools, underground paddle boarding, and overnight camping.\n\nOptions range from easy one-day trips to 2, 3, 4, and 5-day expeditions. Ms. Linh can help you choose the right adventure for your time, fitness level, and budget.",
      ctaHref: "/tours",
      ctaLabel: vi ? "Nhận tư vấn tour mạo hiểm" : "Get adventure tour advice",
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

const STORY_VALUE_MARKERS = ["Nature", "Family", "Community"] as const;

export function parseStoryValues(text: string | undefined, locale: Locale) {
  const fallback = [
    {
      marker: STORY_VALUE_MARKERS[0],
      title: locale === "vi" ? "Thiên nhiên" : "Nature",
      body:
        locale === "vi"
          ? "Thức dậy giữa cánh đồng lúa, núi đá vôi và tầm nhìn sông yên bình."
          : "Wake up surrounded by rice fields, limestone mountains, and peaceful river views.",
    },
    {
      marker: STORY_VALUE_MARKERS[1],
      title: locale === "vi" ? "Gia đình" : "Family",
      body:
        locale === "vi"
          ? "Cảm nhận lòng hiếu khách chân thành từ một đội ngũ gia đình địa phương."
          : "Experience genuine local hospitality from our family-run team.",
    },
    {
      marker: STORY_VALUE_MARKERS[2],
      title: locale === "vi" ? "Cộng đồng" : "Community",
      body:
        locale === "vi"
          ? "Kết nối qua bữa tối gia đình, hoạt động xã hội, trao đổi văn hóa và những chuyến đi chung."
          : "Connect through family dinners, social activities, cultural exchanges, and shared adventures.",
    },
  ];

  if (!text?.trim() || /â|ð|Ã|�/.test(text)) return fallback;

  const parts = text.split(/\n\n+/).filter(Boolean);
  if (parts.length < 2) return fallback;

  return parts.slice(0, 3).map((part, index) => {
    const [titleLine, ...rest] = part.split(" - ");
    const title = titleLine?.trim() || fallback[index]?.title || "";
    const body = rest.length ? rest.join(" - ").trim() : fallback[index]?.body || "";
    return {
      marker: STORY_VALUE_MARKERS[index] ?? "Nature",
      title,
      body,
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
      title: vi ? "Food" : "Food",
      description: vi
        ? "Bữa sáng có trứng bánh mì, pancake với trái cây hoặc mật ong, smoothie bowl và các món Việt truyền thống. Trong ngày, bếp phục vụ món Việt, món Âu dễ ăn, khai vị, món chay và món đặc biệt hằng ngày với nguyên liệu tươi, đơn giản và tốt cho sức khỏe."
        : "Breakfast includes egg and baguette, pancakes with fruit or honey, smoothie bowls, and traditional Vietnamese dishes. Throughout the day, the kitchen serves Vietnamese food, Western comfort dishes, starters, vegetarian options, and daily specials made with fresh, local ingredients.",
      imageKey: "lunch",
    },
    {
      title: vi ? "Drinks" : "Drinks",
      description: vi
        ? "Thưởng thức cà phê phin, cà phê sữa đá, egg coffee, salt coffee, peanut coffee, coconut coffee, nước ép, smoothie, trà thảo mộc, craft beer và cocktail hoàng hôn nhìn ra núi, sông và đồng lúa."
        : "Enjoy Vietnamese drip coffee, iced milk coffee, egg coffee, salt coffee, peanut coffee, coconut coffee, fresh juices, smoothies, herbal teas, craft beer, and sunset cocktails overlooking the mountains and rice fields.",
      imageKey: "rooftop",
    },
    {
      title: vi ? "Rooftop Experience" : "Rooftop Experience",
      description: vi
        ? "Không gian ngoài trời trên tầng 4 để chậm lại, hít thở không khí núi, nhìn sông Son và tận hưởng ánh sáng vàng trên cánh đồng từ sáng sớm đến hoàng hôn."
        : "An open-air 4th-floor space where you can slow down, breathe in the mountain air, watch the Son River, and enjoy golden light over the rice fields from sunrise to sunset.",
      imageKey: "sunset",
    },
    {
      title: vi ? "Activities" : "Activities",
      description: vi
        ? "Rooftop có bóng bàn, bi-a, foosball, thảm yoga, góc đổi sách và các buổi tối giao lưu như game night, karaoke, music bingo, học tiếng Việt và những buổi gặp gỡ thân thiện."
        : "The rooftop offers table tennis, pool, foosball, yoga mats, book exchange, and social evenings with game nights, karaoke, music bingo, Vietnamese lessons, and friendly gatherings.",
      imageKey: "community",
    },
    {
      title: vi ? "Why Guests Love It" : "Why Guests Love It",
      description: vi
        ? "Khách yêu nơi này vì view rooftop đẹp, cà phê Việt Nam chân thật, đồ ăn home-style tươi ngon và bầu không khí vừa thư giãn vừa dễ kết nối."
        : "Guests love it for the rooftop views, authentic Vietnamese coffee culture, fresh home-style food, and a relaxed yet social atmosphere that feels like home in nature.",
      imageKey: "mountains",
    },
  ];
}

export function getSocialActivitiesIntro(locale: Locale): { lead: string; paragraphs: string[] } {
  const vi = locale === "vi";

  if (vi) {
    return {
      lead: "Đến như khách, về như người thân",
      paragraphs: [
        "Tại Green Riverside Cosy Home - Cozy Cafe Rooftop, du lịch không chỉ là nơi bạn ở, ăn hay uống, mà còn là những người bạn gặp và kỷ niệm bạn tạo ra trên đường đi.",
        "Không khí giao lưu ở đây được thiết kế tự nhiên, không gượng ép. Dù bạn đi một mình, đi cùng người yêu hay theo nhóm, bạn đều có một không gian thoải mái để trò chuyện, chia sẻ câu chuyện và gặp bạn mới.",
        "Mỗi ngày chúng tôi có Family Dinner và Happy Hour. Sau bữa tối, các hoạt động thay đổi theo năng lượng và sở thích của khách trong ngày.",
      ],
    };
  }

  return {
    lead: "Come as our guest, leave as our family",
    paragraphs: [
      "At Green Riverside Cosy Home - Cozy Cafe Rooftop, travel is not only about where you stay, eat, or drink. It is about the people you meet and the memories you create along the way.",
      "Our social atmosphere is designed naturally, so meeting people never feels forced. Whether you travel solo, as a couple, or in a group, you will find an easy space to talk, share stories, and enjoy time with others.",
      "Every day we organize Family Dinner and Happy Hour. After dinner, the evening continues with activities that change depending on the energy and interests of the guests that day.",
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
        ? "Một trong những nơi tuyệt vời nhất chúng tôi từng ở tại Việt Nam. Bữa tối gia đình rất ấm áp và chúng tôi gặp được nhiều người bạn mới."
        : "One of the best places we stayed in Vietnam. The family dinner was warm, social, and we met so many great people.",
      source: "google" as const,
      date: "2025-11-20",
      featured: true,
    },
    {
      id: "fallback-tom",
      author: "Tom",
      country: vi ? "Vương quốc Anh" : "United Kingdom",
      rating: 5,
      content: vi
        ? "Vị trí rất đẹp, rooftop cafe tuyệt vời và chủ nhà cực kỳ nhiệt tình."
        : "Beautiful location, fantastic rooftop cafe, and incredibly helpful hosts.",
      source: "tripadvisor" as const,
      date: "2025-10-15",
      featured: true,
    },
    {
      id: "fallback-sarah",
      author: "Sarah M.",
      country: "Canada",
      rating: 5,
      content: vi
        ? "Cảm giác như ở nhà ngay từ đêm đầu tiên. Gia đình rất chào đón và hỗ trợ tour rất chu đáo."
        : "Felt like home from the first night. The family is incredibly welcoming and the tour advice was excellent.",
      source: "google" as const,
      date: "2025-09-08",
      featured: true,
    },
  ];
}

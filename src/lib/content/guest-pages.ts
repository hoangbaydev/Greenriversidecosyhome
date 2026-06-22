import type { Locale } from "@/lib/i18n/config";

export type GuestPageItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type GuestPageSection = {
  id: string;
  title: string;
  subtitle: string;
  items: GuestPageItem[];
};

type GuestPageContent = {
  sections: GuestPageSection[];
};

const otherServices: Record<Locale, GuestPageContent> = {
  en: {
    sections: [
      {
        id: "transport-rentals",
        title: "Transport & Rentals",
        subtitle: "Flexible ways to explore Phong Nha at your own pace.",
        items: [
          {
            id: "bicycle-rental",
            title: "Bicycle Rental",
            description:
              "Easy local rides around the river, village roads, nearby farms, and quiet viewpoints.",
            icon: "bike",
          },
          {
            id: "motorbike-rental",
            title: "Motorbike Rental",
            description:
              "Reliable motorbikes with route advice for Bong Lai Valley, cave roads, and national park loops.",
            icon: "motorbike",
          },
          {
            id: "taxi-private-transfers",
            title: "Taxi & Private Transfers",
            description:
              "Door-to-door help for bus offices, Dong Hoi, airports, train stations, and local trips.",
            icon: "car",
          },
          {
            id: "easy-rider",
            title: "Easy Rider Tours",
            description:
              "Local drivers for scenic motorbike routes when you want the views without riding yourself.",
            icon: "route",
          },
          {
            id: "kayak-paddle-board",
            title: "Kayak & Paddle Board",
            description:
              "A simple way to enjoy the Son River when weather and river conditions are suitable.",
            icon: "waves",
          },
        ],
      },
      {
        id: "comfort-care",
        title: "Comfort & Care",
        subtitle: "Practical services that make arrival, departure, and rest easier.",
        items: [
          {
            id: "laundry",
            title: "Laundry Service",
            description: "Freshen up clothes after cave tours, cycling, swimming, or long bus rides.",
            icon: "shirt",
          },
          {
            id: "massage",
            title: "Massage Service",
            description: "Relax after travel days, trekking, or a full schedule of adventure tours.",
            icon: "massage",
          },
          {
            id: "filtered-water",
            title: "Free Filtered Drinking Water",
            description: "Refill your bottle during your stay and reduce single-use plastic.",
            icon: "water",
          },
          {
            id: "luggage-shower",
            title: "Luggage Storage, Shower & Toilet Facilities",
            description:
              "Useful before check-in, after check-out, or before an overnight bus or train.",
            icon: "luggage",
          },
        ],
      },
      {
        id: "common-spaces",
        title: "Common Spaces",
        subtitle: "Places to slow down, work, wait comfortably, or meet other travellers.",
        items: [
          {
            id: "relaxed-common-areas",
            title: "Hammocks, Bean Bags & Shared Corners",
            description:
              "Comfortable indoor and outdoor spaces for reading, planning, remote work, or casual conversations.",
            icon: "sofa",
          },
        ],
      },
    ],
  },
  vi: {
    sections: [
      {
        id: "transport-rentals",
        title: "Di chuyển & cho thuê",
        subtitle: "Những cách linh hoạt để khám phá Phong Nha theo nhịp riêng của bạn.",
        items: [
          {
            id: "bicycle-rental",
            title: "Thuê xe đạp",
            description:
              "Phù hợp để đi quanh bờ sông, đường làng, nông trại gần đó và các điểm ngắm cảnh yên tĩnh.",
            icon: "bike",
          },
          {
            id: "motorbike-rental",
            title: "Thuê xe máy",
            description:
              "Xe máy đáng tin cậy kèm gợi ý cung đường Bong Lai, đường hang động và các loop trong vườn quốc gia.",
            icon: "motorbike",
          },
          {
            id: "taxi-private-transfers",
            title: "Taxi & xe riêng",
            description:
              "Hỗ trợ đưa đón tận nơi đến bến xe, Đồng Hới, sân bay, ga tàu và các chuyến đi trong khu vực.",
            icon: "car",
          },
          {
            id: "easy-rider",
            title: "Easy Rider",
            description:
              "Tài xế địa phương cho các cung đường xe máy đẹp khi bạn muốn ngắm cảnh mà không tự lái.",
            icon: "route",
          },
          {
            id: "kayak-paddle-board",
            title: "Kayak & SUP",
            description:
              "Cách nhẹ nhàng để tận hưởng sông Son khi thời tiết và mực nước phù hợp.",
            icon: "waves",
          },
        ],
      },
      {
        id: "comfort-care",
        title: "Tiện ích & chăm sóc",
        subtitle: "Những dịch vụ thực tế giúp việc đến, đi và nghỉ ngơi dễ dàng hơn.",
        items: [
          {
            id: "laundry",
            title: "Giặt ủi",
            description: "Làm mới quần áo sau tour hang động, đạp xe, bơi lội hoặc chuyến xe dài.",
            icon: "shirt",
          },
          {
            id: "massage",
            title: "Massage",
            description: "Thư giãn sau ngày di chuyển, trekking hoặc lịch trình khám phá nhiều năng lượng.",
            icon: "massage",
          },
          {
            id: "filtered-water",
            title: "Nước lọc miễn phí",
            description: "Nạp lại bình nước cá nhân trong thời gian lưu trú và giảm rác thải nhựa.",
            icon: "water",
          },
          {
            id: "luggage-shower",
            title: "Giữ hành lý, phòng tắm & nhà vệ sinh",
            description:
              "Tiện lợi trước giờ check-in, sau giờ check-out hoặc trước chuyến xe/tàu đêm.",
            icon: "luggage",
          },
        ],
      },
      {
        id: "common-spaces",
        title: "Không gian chung",
        subtitle: "Nơi để chậm lại, làm việc, chờ xe thoải mái hoặc gặp gỡ du khách khác.",
        items: [
          {
            id: "relaxed-common-areas",
            title: "Võng, ghế lười & góc sinh hoạt chung",
            description:
              "Không gian trong nhà và ngoài trời để đọc sách, lên lịch trình, làm việc từ xa hoặc trò chuyện.",
            icon: "sofa",
          },
        ],
      },
    ],
  },
};

const usefulInfo: Record<Locale, GuestPageContent> = {
  en: {
    sections: [
      {
        id: "food-drink",
        title: "Food, Cafes & Nightlife",
        subtitle: "Where to eat, drink, work from a cafe, or spend an easy evening.",
        items: [
          {
            id: "where-to-eat",
            title: "Where are the best places to eat in Phong Nha?",
            description:
              "Local restaurants, simple meals, vegetarian options, and reliable guest favorites.",
            icon: "utensils",
          },
          {
            id: "best-cafes",
            title: "What are the best cafes in Phong Nha?",
            description: "Coffee, breakfast, remote-work corners, and quiet afternoon stops.",
            icon: "coffee",
          },
          {
            id: "drinks-nightlife",
            title: "Where can I enjoy a drink or social evening?",
            description: "Relaxed bars, rooftop evenings, happy hours, and low-key nightlife.",
            icon: "beer",
          },
        ],
      },
      {
        id: "nature-activities",
        title: "Nature & Local Activities",
        subtitle: "Simple ways to enjoy Phong Nha beyond the main cave tours.",
        items: [
          {
            id: "sunrise-sunset",
            title: "Where can I watch sunrise or sunset?",
            description: "Scenic viewpoints, river corners, and quiet golden-hour spots.",
            icon: "sunrise",
          },
          {
            id: "swimming-spots",
            title: "Where are the best swimming spots?",
            description: "Safe places to cool down when weather and water conditions are suitable.",
            icon: "waves",
          },
          {
            id: "must-visit",
            title: "What should I not miss in Phong Nha?",
            description: "Caves, rivers, Bong Lai Valley, local farms, and classic first-time stops.",
            icon: "map",
          },
          {
            id: "cycling-routes",
            title: "What are the best cycling routes?",
            description: "Gentle village loops, Bong Lai Valley, and scenic countryside roads.",
            icon: "bike",
          },
        ],
      },
      {
        id: "practical-help",
        title: "Practical Help",
        subtitle: "Money, shopping, health, and everyday essentials while you are here.",
        items: [
          {
            id: "atm-exchange",
            title: "Where can I find ATMs or exchange money?",
            description: "Cash, exchange options, and what to prepare before arriving.",
            icon: "money",
          },
          {
            id: "shopping",
            title: "Where can I buy groceries or daily essentials?",
            description: "Useful stops for snacks, toiletries, small gifts, and travel needs.",
            icon: "shopping",
          },
          {
            id: "health",
            title: "What should I do if I get sick?",
            description: "Who to ask first and how we can help you find care quickly.",
            icon: "health",
          },
          {
            id: "pharmacy-clinic",
            title: "Where are the nearest pharmacy, clinic, and hospital?",
            description: "Nearby healthcare options for minor needs or urgent support.",
            icon: "pill",
          },
        ],
      },
      {
        id: "travel-planning",
        title: "Vietnam Travel Planning",
        subtitle: "Weather, visa, payment, connectivity, transport, and packing basics.",
        items: [
          {
            id: "weather",
            title: "What is the weather like in Phong Nha?",
            description: "Seasonal expectations so you can plan clothes and activities.",
            icon: "weather",
          },
          {
            id: "rainy-season",
            title: "When is rainy or flooding season?",
            description: "What to know about wet season, safety, and flexible plans.",
            icon: "rain",
          },
          {
            id: "visa",
            title: "Do I need a visa for Vietnam?",
            description: "A reminder to check official visa rules before travel.",
            icon: "visa",
          },
          {
            id: "sim-esim",
            title: "Which SIM card or eSIM should I use?",
            description: "Connectivity options for maps, messaging, and booking on the road.",
            icon: "phone",
          },
          {
            id: "packing",
            title: "What should I pack for Phong Nha?",
            description: "A practical checklist for caves, rivers, countryside days, and bus travel.",
            icon: "backpack",
          },
        ],
      },
    ],
  },
  vi: {
    sections: [
      {
        id: "food-drink",
        title: "Ăn uống, cafe & buổi tối",
        subtitle: "Nơi ăn ngon, uống cafe, làm việc nhẹ hoặc tận hưởng buổi tối.",
        items: [
          {
            id: "where-to-eat",
            title: "Ăn ở đâu ngon tại Phong Nha?",
            description: "Quán địa phương, bữa ăn đơn giản, món chay và những địa điểm khách hay thích.",
            icon: "utensils",
          },
          {
            id: "best-cafes",
            title: "Cafe nào đáng ghé ở Phong Nha?",
            description: "Cà phê, bữa sáng, góc làm việc và điểm dừng chân yên tĩnh buổi chiều.",
            icon: "coffee",
          },
          {
            id: "drinks-nightlife",
            title: "Có thể uống gì hoặc giao lưu buổi tối ở đâu?",
            description: "Quán bar nhẹ nhàng, rooftop, happy hour và các lựa chọn nightlife vừa đủ vui.",
            icon: "beer",
          },
        ],
      },
      {
        id: "nature-activities",
        title: "Thiên nhiên & hoạt động địa phương",
        subtitle: "Những cách đơn giản để tận hưởng Phong Nha ngoài các tour hang động chính.",
        items: [
          {
            id: "sunrise-sunset",
            title: "Ngắm bình minh hoặc hoàng hôn ở đâu?",
            description: "Các điểm view đẹp, góc ven sông và nơi yên tĩnh cho giờ vàng.",
            icon: "sunrise",
          },
          {
            id: "swimming-spots",
            title: "Điểm bơi nào phù hợp?",
            description: "Nơi giải nhiệt an toàn khi thời tiết và mực nước phù hợp.",
            icon: "waves",
          },
          {
            id: "must-visit",
            title: "Không nên bỏ lỡ gì ở Phong Nha?",
            description: "Hang động, sông, thung lũng Bong Lai, trang trại địa phương và các điểm kinh điển.",
            icon: "map",
          },
          {
            id: "cycling-routes",
            title: "Cung đường đạp xe nào đẹp?",
            description: "Vòng làng nhẹ nhàng, thung lũng Bong Lai và các tuyến đồng quê nhiều cảnh đẹp.",
            icon: "bike",
          },
        ],
      },
      {
        id: "practical-help",
        title: "Hỗ trợ thực tế",
        subtitle: "Tiền mặt, mua sắm, sức khỏe và nhu cầu hằng ngày khi ở Phong Nha.",
        items: [
          {
            id: "atm-exchange",
            title: "Rút tiền hoặc đổi tiền ở đâu?",
            description: "Lưu ý về tiền mặt, lựa chọn đổi tiền và những gì nên chuẩn bị trước khi đến.",
            icon: "money",
          },
          {
            id: "shopping",
            title: "Mua đồ dùng hằng ngày ở đâu?",
            description: "Gợi ý mua snack, đồ cá nhân, quà nhỏ và các vật dụng cần thiết.",
            icon: "shopping",
          },
          {
            id: "health",
            title: "Nếu bị ốm thì nên làm gì?",
            description: "Nên hỏi ai trước và chúng tôi có thể hỗ trợ tìm chăm sóc y tế như thế nào.",
            icon: "health",
          },
          {
            id: "pharmacy-clinic",
            title: "Nhà thuốc, phòng khám và bệnh viện gần nhất ở đâu?",
            description: "Các lựa chọn y tế gần đó cho nhu cầu nhỏ hoặc tình huống cần hỗ trợ gấp.",
            icon: "pill",
          },
        ],
      },
      {
        id: "travel-planning",
        title: "Chuẩn bị du lịch Việt Nam",
        subtitle: "Thời tiết, visa, thanh toán, kết nối mạng, di chuyển và hành lý cần mang.",
        items: [
          {
            id: "weather",
            title: "Thời tiết Phong Nha như thế nào?",
            description: "Đặc điểm theo mùa để bạn chuẩn bị trang phục và lịch trình phù hợp.",
            icon: "weather",
          },
          {
            id: "rainy-season",
            title: "Mùa mưa hoặc mùa lũ là khi nào?",
            description: "Điều cần biết về mùa mưa, an toàn và kế hoạch linh hoạt.",
            icon: "rain",
          },
          {
            id: "visa",
            title: "Có cần visa để đến Việt Nam không?",
            description: "Nhắc nhở kiểm tra quy định visa chính thức trước chuyến đi.",
            icon: "visa",
          },
          {
            id: "sim-esim",
            title: "Nên dùng SIM hoặc eSIM nào?",
            description: "Lựa chọn kết nối để dùng bản đồ, nhắn tin và đặt dịch vụ trên đường.",
            icon: "phone",
          },
          {
            id: "packing",
            title: "Nên chuẩn bị gì khi đến Phong Nha?",
            description: "Checklist thực tế cho hang động, sông nước, ngày đi vùng quê và xe đêm.",
            icon: "backpack",
          },
        ],
      },
    ],
  },
};

export function getOtherServicesContent(locale: Locale): GuestPageContent {
  return otherServices[locale] ?? otherServices.en;
}

export function getUsefulInfoContent(locale: Locale): GuestPageContent {
  return usefulInfo[locale] ?? usefulInfo.en;
}

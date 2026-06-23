import type { Locale } from "@/lib/i18n/config";
import type { GuestPageContent } from "@/lib/content/guest-pages";

const content: Record<Locale, GuestPageContent> = {
  en: {
    sections: [
      {
        id: "contact-direct",
        title: "Contact Us Directly",
        subtitle: "Best available rates, fast replies, and honest local travel advice.",
        items: [
          {
            id: "best-price-local-advice",
            title: "Why contact Green Riverside directly?",
            description:
              "You can book through Hostelworld, Booking.com, Agoda, or Airbnb, but many guests message us first for the best available rates and personalised support. We can help arrange rooms, cave tours, buses, trains, airport transfers, private cars, and local plans in one place.",
            icon: "phone",
          },
          {
            id: "quick-response",
            title: "Quick response via WhatsApp, Zalo, or phone",
            description:
              "For latest availability, prices, tours, transport, or travel planning, message Ms. Linh on +84 778 508 898. You can also email greenriverphongnha@gmail.com or follow us on Facebook, TikTok, Instagram, Tripadvisor, and Google Maps.",
            icon: "phone",
          },
        ],
      },
      {
        id: "policies",
        title: "Policies & Conditions of Stay",
        subtitle: "Simple house rules so every guest has a comfortable stay.",
        items: [
          {
            id: "check-in-out",
            title: "Check-in, check-out, and cancellation",
            description:
              "Free cancellation is available up to 24 hours before arrival. Check-in starts from 2:00 PM and check-out is before 11:00 AM. Late check-out is subject to availability: 11:00 AM-5:00 PM is 50% of the room rate, after 5:00 PM is 100%. Please notify us in advance for arrivals between 10:00 PM and 6:00 AM.",
            icon: "key",
          },
          {
            id: "payment-deposit",
            title: "Payment, cards, and deposits",
            description:
              "Payment is required upon check-in. VND cash is preferred. Visa and MasterCard are accepted with a 5% bank transaction fee. A refundable 100,000 VND deposit may be required for keys, towels, or locker keys.",
            icon: "card",
          },
          {
            id: "house-rules",
            title: "House rules and quiet hours",
            description:
              "Please do not wear shoes inside the hostel or guest rooms. Smoking is not permitted inside rooms or indoor common areas. Please keep noise low after 11:00 PM. Illegal drugs are strictly prohibited, and disruptive or unsafe behaviour may result in refusal of service without refund.",
            icon: "leaf",
          },
        ],
      },
      {
        id: "arrival-transport",
        title: "Arrival & Transport FAQ",
        subtitle: "Getting to Green Riverside from bus stops and around Phong Nha.",
        items: [
          {
            id: "bus-dropoff",
            title: "Where do buses stop in Phong Nha?",
            description:
              "Phong Nha does not have one central bus station. Long-distance buses usually stop around the main road, Central Backpacker area, TP Office, Hung Thanh Bus Office, or the Phong Nha Tourism Center. Green Riverside is about 2 km from town and the main bus stops.",
            icon: "taxi",
          },
          {
            id: "getting-to-us",
            title: "How do I get from the bus stop to Green Riverside?",
            description:
              "Grab car or Grab bike is recommended when available. Local motorbike taxis are usually around 50,000 VND, and cars are usually around 70,000-100,000 VND depending on time, day/night, and holidays. If you arrive late, contact us via WhatsApp and we can help arrange a pickup.",
            icon: "taxi",
          },
          {
            id: "visa-extension",
            title: "Can I extend my 90-day Vietnam e-Visa?",
            description:
              "In most cases, Vietnam e-Visas cannot be extended online while you are in the country. If your visa is close to expiry, check current rules with Immigration. If you need to exit and re-enter, we can help arrange transport to border gates such as Lao Bao.",
            icon: "visa",
          },
        ],
      },
      {
        id: "food-drink",
        title: "Food, Cafes & Nightlife",
        subtitle: "Where to eat, drink, work from a cafe, or spend an easy evening.",
        items: [
          {
            id: "where-to-eat",
            title: "Where are the best places to eat in Phong Nha?",
            description:
              "Start with Cozy Cafe on the 4th floor for fresh Vietnamese and Western dishes, including vegan and vegetarian options. Other popular choices include Bamboo Chopsticks, The Rice House, Ganesh Indian Restaurant, The Villas Restaurant, and After 8 Bistro.",
            icon: "utensils",
          },
          {
            id: "must-try-foods",
            title: "What local foods should I try?",
            description:
              "Try Quang Binh fish noodle soup, grilled pork noodles, beef wrapped in betel leaves, braised carp, grilled mountain chicken with cheo salt and sticky rice, caramelized stream shrimp, banh xeo, fresh spring rolls, duck porridge, and rustic eel with banana stem.",
            icon: "utensils",
          },
          {
            id: "best-cafes",
            title: "What are the best cafes in Phong Nha?",
            description:
              "Popular options include Hallo Coffee, Phong Nha Coffee Station, Tree House Cafe & Restaurant, and Cozy Cafe at Green Riverside. Cozy Cafe serves Vietnamese drip coffee, iced milk coffee, egg coffee, salt coffee, peanut coffee, coconut coffee, juices, smoothies, local craft beer, wine, and cocktails.",
            icon: "coffee",
          },
          {
            id: "drinks-nightlife",
            title: "Where can I enjoy drinks or nightlife?",
            description:
              "Phong Nha nightlife is relaxed compared with big cities. Bee Pub and King Kong Bar are popular late spots. For a softer social night, Cozy Cafe hosts games and events such as Beer Pong, Music Bingo, Do or Drink, and easy evenings where guests can meet after 8:00 PM.",
            icon: "beer",
          },
        ],
      },
      {
        id: "local-essentials",
        title: "Local Essentials",
        subtitle: "Practical tips for rentals, fuel, SIM cards, gym, yoga, and daily needs.",
        items: [
          {
            id: "rentals",
            title: "Where can I rent a bicycle or motorbike?",
            description:
              "You can rent bicycles and motorbikes directly at Green Riverside. Our team can share maps, route ideas, cave stops, swimming spots, restaurants, and sunrise or sunset viewpoints. Other trusted motorbike providers include Thach's Motorbike Rental, Thang's Phong Nha Riders, and Motorvina Phong Nha.",
            icon: "bike",
          },
          {
            id: "fuel",
            title: "Where can I buy fuel?",
            description:
              "The main petrol station is Tien Tien Petrol Station in Son Trach Town, usually open from 5:30 AM to 9:00 PM. E10 petrol is commonly available. Tell the attendant the exact amount you want, prepare cash, and check the pump display. Small roadside shops may sell fuel at higher prices.",
            icon: "money",
          },
          {
            id: "sim-card",
            title: "Where can I buy a SIM card?",
            description:
              "Viettel is usually the best choice for Phong Nha, rural areas, and the national park. You can also use Vinaphone or Mobifone. Official stores are in Son Trach or Dong Hoi, and local phone shops can often help with setup or data top-ups.",
            icon: "phone",
          },
          {
            id: "gym-yoga",
            title: "Is there a gym or yoga in Phong Nha?",
            description:
              "Mia's Private Gym is a small local option for basic workouts. Nguyen Shack Retreat may offer yoga or meditation depending on schedule. Green Riverside also provides yoga mats so guests can practise independently on the rooftop, especially at sunrise or sunset.",
            icon: "health",
          },
        ],
      },
      {
        id: "nature-history",
        title: "Nature, History & Local Highlights",
        subtitle: "Ideas for guests who want to explore beyond the main cave tour.",
        items: [
          {
            id: "sunrise-sunset",
            title: "Where can I watch sunrise or sunset?",
            description:
              "Our rooftop is one of the easiest places to enjoy both sunrise and sunset with mountain, river, and countryside views. Around Phong Nha, East Hill, Karst Residence, and Phong Nha Funky Beach are also popular sunset spots.",
            icon: "sunrise",
          },
          {
            id: "history",
            title: "Where can I learn about local history?",
            description:
              "Visit the Phong Nha Cave Exploration Museum for cave and local history. For wartime history, consider the Ho Chi Minh Trail, Commander Cave, and Eight Ladies Cave. Let us know your interests and we can suggest a suitable route or tour.",
            icon: "map",
          },
          {
            id: "nature-spots",
            title: "What nature spots should I consider?",
            description:
              "Besides the classic cave tours, guests often enjoy Mooc Spring, Ozo Treetop Park, Phong Nha Botanic Garden, Ha Va Valley, Blue Diamond Camp, Khe Nuoc Lanh, Bong Lai Valley, and riverside swimming when conditions are safe.",
            icon: "waves",
          },
        ],
      },
    ],
  },
  vi: {
    sections: [
      {
        id: "contact-direct",
        title: "Liên hệ trực tiếp",
        subtitle: "Giá tốt nhất, phản hồi nhanh và tư vấn địa phương thật lòng.",
        items: [
          {
            id: "best-price-local-advice",
            title: "Vì sao nên liên hệ Green Riverside trực tiếp?",
            description:
              "Bạn có thể đặt qua Hostelworld, Booking.com, Agoda hoặc Airbnb, nhưng nhiều khách chọn nhắn trực tiếp để nhận giá tốt nhất và hỗ trợ cá nhân hơn. Chúng tôi có thể giúp sắp xếp phòng, tour hang động, xe khách, tàu hỏa, đưa đón sân bay, xe riêng và lịch trình địa phương trong một nơi.",
            icon: "phone",
          },
          {
            id: "quick-response",
            title: "Phản hồi nhanh qua WhatsApp, Zalo hoặc điện thoại",
            description:
              "Nếu cần hỏi phòng trống, giá mới nhất, tour, di chuyển hoặc lịch trình du lịch, hãy nhắn Ms. Linh qua số +84 778 508 898. Bạn cũng có thể email greenriverphongnha@gmail.com hoặc theo dõi chúng tôi trên Facebook, TikTok, Instagram, Tripadvisor và Google Maps.",
            icon: "phone",
          },
        ],
      },
      {
        id: "policies",
        title: "Chính sách & điều kiện lưu trú",
        subtitle: "Nội quy rõ ràng để mọi khách đều có kỳ nghỉ thoải mái.",
        items: [
          {
            id: "check-in-out",
            title: "Nhận phòng, trả phòng và hủy phòng",
            description:
              "Miễn phí hủy phòng trước 24 giờ so với giờ đến. Nhận phòng từ 2:00 PM và trả phòng trước 11:00 AM. Trả phòng muộn tùy tình trạng phòng: 11:00 AM-5:00 PM tính 50% giá phòng, sau 5:00 PM tính 100%. Nếu đến trong khoảng 10:00 PM-6:00 AM, vui lòng báo trước cho chúng tôi.",
            icon: "key",
          },
          {
            id: "payment-deposit",
            title: "Thanh toán, thẻ và đặt cọc",
            description:
              "Thanh toán khi nhận phòng. Tiền mặt VND được ưu tiên. Visa và MasterCard được chấp nhận với phí giao dịch ngân hàng 5%. Có thể cần đặt cọc hoàn lại 100.000 VND cho chìa khóa, khăn hoặc khóa tủ.",
            icon: "card",
          },
          {
            id: "house-rules",
            title: "Nội quy và giờ yên tĩnh",
            description:
              "Vui lòng không mang giày vào trong hostel hoặc phòng khách. Không hút thuốc trong phòng và khu vực chung trong nhà. Sau 11:00 PM vui lòng giữ yên tĩnh. Chất cấm bị nghiêm cấm; hành vi gây rối hoặc không an toàn có thể bị từ chối phục vụ mà không hoàn tiền.",
            icon: "leaf",
          },
        ],
      },
      {
        id: "arrival-transport",
        title: "Câu hỏi về đến nơi & di chuyển",
        subtitle: "Cách đến Green Riverside từ điểm dừng xe và di chuyển quanh Phong Nha.",
        items: [
          {
            id: "bus-dropoff",
            title: "Xe khách dừng ở đâu tại Phong Nha?",
            description:
              "Phong Nha không có một bến xe trung tâm duy nhất. Xe đường dài thường dừng quanh trục đường chính, khu Central Backpacker, văn phòng TP, văn phòng Hưng Thành hoặc Trung tâm Du lịch Phong Nha. Green Riverside cách thị trấn và các điểm dừng chính khoảng 2 km.",
            icon: "taxi",
          },
          {
            id: "getting-to-us",
            title: "Từ điểm dừng xe về Green Riverside như thế nào?",
            description:
              "Grab car hoặc Grab bike là lựa chọn thuận tiện khi có sẵn. Xe ôm địa phương thường khoảng 50.000 VND, ô tô khoảng 70.000-100.000 VND tùy thời gian, ngày/đêm hoặc dịp lễ. Nếu đến muộn, hãy nhắn WhatsApp để chúng tôi hỗ trợ gọi xe.",
            icon: "taxi",
          },
          {
            id: "visa-extension",
            title: "Có thể gia hạn e-Visa 90 ngày không?",
            description:
              "Thông thường e-Visa Việt Nam không thể gia hạn online khi bạn đang ở trong nước. Nếu visa sắp hết hạn, hãy kiểm tra quy định mới nhất với cơ quan Xuất nhập cảnh. Nếu cần xuất cảnh và nhập cảnh lại, chúng tôi có thể hỗ trợ sắp xếp xe đến cửa khẩu như Lao Bảo.",
            icon: "visa",
          },
        ],
      },
      {
        id: "food-drink",
        title: "Ăn uống, cafe & buổi tối",
        subtitle: "Nơi ăn ngon, uống cafe, làm việc nhẹ hoặc tận hưởng buổi tối.",
        items: [
          {
            id: "where-to-eat",
            title: "Ăn ở đâu ngon tại Phong Nha?",
            description:
              "Bạn có thể bắt đầu tại Cozy Cafe tầng 4 với món Việt và món Âu tươi ngon, có lựa chọn chay/vegan. Một số quán phổ biến khác gồm Bamboo Chopsticks, The Rice House, Ganesh Indian Restaurant, The Villas Restaurant và After 8 Bistro.",
            icon: "utensils",
          },
          {
            id: "must-try-foods",
            title: "Món địa phương nào nên thử?",
            description:
              "Nên thử cháo canh Quảng Bình, bún thịt nướng, bò nướng lá lốt, cá trắm kho tộ, gà đồi nướng muối cheo ăn với xôi, tôm khe rim, bánh xèo, nem cuốn, cháo vịt và lươn om chuối.",
            icon: "utensils",
          },
          {
            id: "best-cafes",
            title: "Cafe nào đáng ghé ở Phong Nha?",
            description:
              "Các lựa chọn phổ biến gồm Hallo Coffee, Phong Nha Coffee Station, Tree House Cafe & Restaurant và Cozy Cafe tại Green Riverside. Cozy Cafe phục vụ cà phê phin, cà phê sữa đá, egg coffee, salt coffee, peanut coffee, coconut coffee, nước ép, smoothie, craft beer, rượu vang và cocktail.",
            icon: "coffee",
          },
          {
            id: "drinks-nightlife",
            title: "Có thể uống gì hoặc giao lưu buổi tối ở đâu?",
            description:
              "Nightlife ở Phong Nha nhẹ hơn các thành phố lớn. Bee Pub và King Kong Bar là các điểm đi muộn phổ biến. Nếu muốn không khí dễ kết nối hơn, Cozy Cafe thường có Beer Pong, Music Bingo, Do or Drink và các buổi giao lưu sau 8:00 PM.",
            icon: "beer",
          },
        ],
      },
      {
        id: "local-essentials",
        title: "Thông tin thiết yếu địa phương",
        subtitle: "Thuê xe, xăng, SIM, gym, yoga và nhu cầu hằng ngày.",
        items: [
          {
            id: "rentals",
            title: "Thuê xe đạp hoặc xe máy ở đâu?",
            description:
              "Bạn có thể thuê xe đạp và xe máy trực tiếp tại Green Riverside. Đội ngũ của chúng tôi có thể gợi ý bản đồ, cung đường, điểm hang động, điểm bơi, quán ăn và nơi ngắm bình minh/hoàng hôn. Một số nơi thuê xe máy uy tín khác gồm Thach's Motorbike Rental, Thang's Phong Nha Riders và Motorvina Phong Nha.",
            icon: "bike",
          },
          {
            id: "fuel",
            title: "Đổ xăng ở đâu?",
            description:
              "Cây xăng chính là Tiên Tiến ở thị trấn Sơn Trạch, thường mở từ 5:30 AM đến 9:00 PM. E10 là loại xăng phổ biến. Hãy nói rõ số tiền muốn đổ, chuẩn bị tiền mặt và nhìn đồng hồ bơm. Một số tiệm ven đường có bán xăng nhưng giá có thể cao hơn.",
            icon: "money",
          },
          {
            id: "sim-card",
            title: "Mua SIM ở đâu?",
            description:
              "Viettel thường là lựa chọn tốt nhất cho Phong Nha, vùng nông thôn và khu vực vườn quốc gia. Bạn cũng có thể dùng Vinaphone hoặc Mobifone. Cửa hàng chính thức có ở Sơn Trạch hoặc Đồng Hới, và một số tiệm điện thoại địa phương có thể hỗ trợ cài đặt/gia hạn data.",
            icon: "phone",
          },
          {
            id: "gym-yoga",
            title: "Phong Nha có gym hoặc yoga không?",
            description:
              "Mia's Private Gym là lựa chọn nhỏ tại địa phương cho nhu cầu tập cơ bản. Nguyen Shack Retreat có thể có yoga/thiền tùy lịch. Green Riverside cũng có thảm yoga để khách tự tập trên rooftop, đặc biệt đẹp vào lúc bình minh hoặc hoàng hôn.",
            icon: "health",
          },
        ],
      },
      {
        id: "nature-history",
        title: "Thiên nhiên, lịch sử & điểm nổi bật",
        subtitle: "Gợi ý cho khách muốn khám phá thêm ngoài tour hang động chính.",
        items: [
          {
            id: "sunrise-sunset",
            title: "Ngắm bình minh hoặc hoàng hôn ở đâu?",
            description:
              "Rooftop của chúng tôi là một trong những nơi thuận tiện nhất để ngắm bình minh và hoàng hôn với view núi, sông và làng quê. Quanh Phong Nha, East Hill, Karst Residence và Phong Nha Funky Beach cũng là các điểm hoàng hôn được yêu thích.",
            icon: "sunrise",
          },
          {
            id: "history",
            title: "Muốn tìm hiểu lịch sử thì đi đâu?",
            description:
              "Bạn có thể ghé Bảo tàng Khám phá Hang động Phong Nha để hiểu thêm về hang động và lịch sử địa phương. Nếu quan tâm lịch sử chiến tranh, hãy cân nhắc Đường Hồ Chí Minh, Hang Chỉ Huy và Hang Tám Cô. Hãy nói với chúng tôi sở thích của bạn để được gợi ý lộ trình phù hợp.",
            icon: "map",
          },
          {
            id: "nature-spots",
            title: "Nên cân nhắc điểm thiên nhiên nào?",
            description:
              "Ngoài các tour hang động kinh điển, khách thường thích Suối Moọc, Ozo Treetop Park, Vườn Thực vật Phong Nha, Ha Va Valley, Blue Diamond Camp, Khe Nước Lạnh, thung lũng Bong Lai và các điểm bơi ven sông khi điều kiện an toàn.",
            icon: "waves",
          },
        ],
      },
    ],
  },
};

export function getUsefulInfoContentClean(locale: Locale): GuestPageContent {
  return content[locale] ?? content.en;
}

import type { Locale } from "@/lib/i18n/config";
import { getUsefulInfoContentClean } from "@/lib/content/useful-info";

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

export type GuestPageContent = {
  sections: GuestPageSection[];
};

const otherServices: Record<Locale, GuestPageContent> = {
  en: {
    sections: [
    {
        "id": "transport-rentals",
        "title": "Transport & Rentals",
        "subtitle": "Flexible ways to explore Phong Nha at your own pace.",
        "items": [
            {
                "id": "bicycle-rental",
                "title": "Bicycle Rental",
                "icon": "bike",
                "description": "Explore Phong Nha at your own pace!\n\nRates\n• First 2 hours: Free\n• Full day rental: 70,000 VND/bicycle\n\nIncluded\n• Bicycle\n• Lock\n\nReturn Time\n• Please return bicycles by 11:00 PM.\n\nPolicy\n• Please inspect the bicycle before use.\n• If your bicycle is damaged during the rental period, contact us for assistance. Guests are responsible for repair and transportation costs.\n• Lost lock: 200,000 VND\n• Lost bicycle: 5,000,000 VND"
            },
            {
                "id": "motorbike-rental",
                "title": "Motorbike Rental",
                "icon": "motorbike",
                "description": "Explore Phong Nha with the freedom of your own motorbike!\n\nRates\n• Automatic scooter: 150,000 VND/day\n• Semi-automatic motorbike: 150,000 VND/day\nRental is charged per day, not per 24 hours.\n\nReturn Time\n• Please return the motorbike before 11:00 PM, or before 10:00 AM the following morning.\n\nRental Policy\n• Please inspect the motorbike before renting.\n• Guests are responsible for any damage occurring during the rental period.\n• Guests are responsible for any traffic violations, fines, accidents, or related costs incurred during the rental period.\n• By renting a motorbike, you confirm that you know how to ride, have a valid driving licence recognised in Vietnam, and sufficient riding experience.\n\nRide Safely\nPlease drive carefully in Phong Nha Village and the National Park area. Children often play near the roads, and dogs, buffaloes, cows, loose gravel, and unpredictable drivers can create unexpected hazards.\n\nNeed Assistance?\nIf you experience any problems with the motorbike or need assistance, please contact us or the rental company:\nWhatsApp:\n• Ms Linh (Manager): +84 778 508 898\n• Mr Thach: +84 919 565 775"
            },
            {
                "id": "taxi-private-transfers",
                "title": "Taxi & Private Transfers",
                "icon": "car",
                "description": "We offer reliable, friendly, and affordable taxi and private transfer services.\n\nOur fleet includes 5–7 seat cars and 9–16 seat limousines, serving Phong Nha National Park and intercity routes upon request.\nDetailed routes and price lists are available in the Transportation (Private Transfers) section.\n\nFor custom requests such as special pick-up/drop-off locations or sightseeing stops, please contact us to get the best available price."
            },
            {
                "id": "easy-rider",
                "title": "Easy Rider Tours",
                "icon": "route",
                "description": "Not confident riding a motorbike yourself, or simply looking for an authentic local experience? Our Easy Rider Tours are the perfect option.\n\nRide with our friendly and experienced local drivers as they take you beyond the tourist trail to discover beautiful countryside roads, hidden viewpoints, local villages, and secret spots that many visitors never get to see.\nAlong the way, you'll learn more about local life, culture, and the history of the area while enjoying a safe and memorable journey through Phong Nha.\n\nBy joining an Easy Rider Tour, you're also supporting local drivers and their families, helping create sustainable income opportunities within the community.\nWe offer several suggested itineraries below, but every trip can be customized to suit your interests. If you have special requests or would like to explore a different route, please contact us for the best options and prices.\n\nEasy Riders Itinerary & Prices:\n• Our hostel <-> Phong Nha town/bus stop: 50,000 vnd/way\n• Phong Nha <-> Duck Stop/ Duck Tang Farm: 300,000 vnd/round trip\n• Phong Nha <-> Paradise cave/ Dark Cave: 400,000 vnd/round trip\n• Phong Nha <-> Botanic Garden/ Commander Cave/ Ozo Park: 300,000 vnd/round trip\n\nCombo Packages (450,000 vnd/round trip):\n• Paradise Cave + Dark cave\n• Botanic Garden + Paradise Cave\n• Paradise Cave + Nuoc Mooc Spring\n• One cave + Duck Stop/ Duck Farm\n• Two spots in Phong Nha\n\nExtended Packages (500,000 vnd/round trip):\n• Botanic Garden + Paradise Cave + Dark cave\n• Botanic Garden + Paradise Cave + Duck Farm/Duck Stop\n• Paradise Cave + Nuoc Mooc Spring + Duck Farm/ Duck Stop\n• Two caves + Duck Stop/ Duck Farm\n• Three spots in Phong Nha"
            },
            {
                "id": "sup-paddle-board",
                "title": "SUP Paddle Boarding & Swimming Experience at the Son River",
                "icon": "waves",
                "description": "Green Riverside Cosy Home is located just 10 meters from the Son River, offering guests direct access to a beautiful natural river experience in Phong Nha.\n\nInstead of an artificial swimming pool, we offer direct access to the natural river right in front of the property — free of charge. Guests can swim in the fresh river water or enjoy our SUP (Stand-Up Paddle Board) for a fun and relaxing experience on the water.\n\nHere, you can enjoy:\n• Swimming in the natural Son River\n• 30 minutes of free SUP paddle boarding (life jackets provided)\n• Extra SUP time is available at 100,000 VND per hour\n• A peaceful riverside atmosphere with views of fishermen, local farming activities, and children playing along the riverbank\n• Beautiful sunsets over the Son River\n\nImportant notes:\n• Guests must know how to swim\n• Do not swim into deep or mid-river areas\n• SUP is available only before 7:00 AM or after 4:00 PM\n• SUP is not available during 7:00 AM – 5:00 PM due to boat traffic for Phong Nha Cave tours\n• River conditions may vary depending on weather and water flow\n\nSafety & Regulations:\n• Do not use SUP to enter Phong Nha Cave as it is strictly prohibited and unsafe\n• All Phong Nha Cave visits must be done via official boats at Phong Nha Boat Station (bến thuyền Phong Nha)\n• Guests participate in all river activities at their own risk and must follow safety instructions at all times"
            }
        ]
    },
    {
        "id": "comfort-care",
        "title": "Comfort & Care",
        "subtitle": "Practical services that make arrival, departure, and rest easier.",
        "items": [
            {
                "id": "laundry",
                "title": "Laundry Service",
                "icon": "shirt",
                "description": "We offer convenient laundry services for our guests.\n\nPrices\n• Wash & Dry: 45,000 VND/kg\n• Express Wash & Dry (2–3 hours): 60,000 VND/kg\n• Shoes Cleaning: 80,000 VND/pair\n• Backpack Cleaning: 70,000 VND/item\n\nDrying Options\nYou can choose between:\n• Sun Drying (weather permitting)\n• Machine Drying\n\nTurnaround Time\n• Laundry submitted before 4:00 PM will be returned the same day (around 10:00–11:00 PM).\n• Laundry submitted after 4:00 PM will be returned the following day.\n\nDrop-off & Collection\n• Please leave and collect your laundry at the Reception Desk.\n• Contact reception if you need a laundry bag or have any special requests regarding your laundry.\n\nImportant Notes\n• Please check all pockets before handing in your laundry.\n• Items that may bleed color, shrink, or are delicate should be declared in advance.\n• We are not responsible for damage to delicate items, color bleeding, shrinkage, or other issues if guests do not inform us beforehand.\n• Weather conditions may affect the availability of sun drying."
            },
            {
                "id": "massage",
                "title": "Massage Service",
                "icon": "massage",
                "description": "Need to relax after a day of adventure?\nWe work with trusted local massage providers in Phong Nha, offering professional treatments at fair and transparent prices. Complimentary pick-up and drop-off from our hostel is included with every booking.\n\nHighly Recommended\nGia Bảo – Blind Massage Therapy\n• 30-minute body massage: 150,000 VND\n• 60-minute body massage: 300,000 VND\n\nPT Hằng Massage & Nail\n• Massage, nail care, and beauty treatments\n• Please ask at reception for the price list.\n\nSpecial Offer\nGuests who book a Room + Tour + Bus package through our hostel will receive one complimentary wellness treatment per person:\n• 30-minute massage\n• Herbal hair wash\n• Facial treatment\n\nPlease contact reception for bookings, availability, and more information."
            },
            {
                "id": "filtered-water",
                "title": "Free Filtered Drinking Water",
                "icon": "water",
                "description": "To help reduce plastic waste and save our guests money, we provide free filtered drinking water throughout your stay.\n\nYou are welcome to refill your bottle anytime from the water dispenser on the first floor. If you need a bottle, please ask at reception.\n\nIf you would like to support disadvantaged local students, a donation box is available at reception. All contributions are entirely voluntary and greatly appreciated.\n\nPlease note that the filtered water is served at room temperature. If you prefer chilled water or other beverages, they are available for purchase at reception or at our rooftop bar on the fourth floor."
            },
            {
                "id": "luggage-shower",
                "title": "Luggage Storage, Shower & Toilet Facilities Before Check-in / After Check-out",
                "icon": "luggage",
                "description": "Arriving early or leaving late? We've got you covered.\n\nWe provide free luggage storage on the first floor, allowing you to explore Phong Nha without carrying your bags. If you need a secure locker for valuables such as passports, electronics, or cash, please contact reception for a lock and refundable key deposit.\n\nGuests are also welcome to use our free public showers and toilet facilities on the first and fourth floors before check-in or after check-out.\n\nWhether you're waiting for your room, heading off on a tour, or catching an overnight bus, feel free to make use of our facilities and common areas during your stay.\nThese facilities are available free of charge for all in-house guests. Guests booking tours or transportation through us are also welcome to use them."
            }
        ]
    },
    {
        "id": "common-spaces",
        "title": "Common Spaces",
        "subtitle": "Places to slow down, work, wait comfortably, or meet other travellers.",
        "items": [
            {
                "id": "relaxed-common-areas",
                "title": "Common Areas with Hammocks & Bean Bag Sofas",
                "icon": "sofa",
                "description": "Whether you're arriving early, waiting for your bus after check-out, or simply looking for a place to relax, our common areas are designed to make you feel at home.\n\nEnjoy our cozy indoor lounge on the second floor, featuring bean bags, comfortable sofas, fans, and air conditioning, or unwind on our cool rooftop terrace on the fourth floor, surrounded by fresh air and beautiful views.\n\nThese spaces are perfect for reading, working, taking a nap, enjoying a drink, or meeting fellow travelers.\nMany of our social events, games, and community activities also take place here, creating plenty of opportunities to laugh, connect with new friends, and make unforgettable memories during your stay in Phong Nha."
            }
        ]
    }
]
  },
  vi: {
    sections: [
    {
        "id": "transport-rentals",
        "title": "Di chuyển & cho thuê",
        "subtitle": "Những cách linh hoạt để khám phá Phong Nha theo nhịp riêng của bạn.",
        "items": [
            {
                "id": "bicycle-rental",
                "title": "Thuê xe đạp",
                "icon": "bike",
                "description": "Khám phá Phong Nha theo nhịp độ của riêng bạn!\n\nGiá thuê\n• 2 giờ đầu tiên: Miễn phí\n• Thuê cả ngày: 70.000 VND/xe\n\nBao gồm\n• Xe đạp\n• Khóa xe\n\nThời gian trả xe\n• Vui lòng trả xe đạp trước 23:00.\n\nChính sách\n• Vui lòng kiểm tra xe đạp trước khi sử dụng.\n• Nếu xe đạp của bạn bị hỏng trong thời gian thuê, hãy liên hệ với chúng tôi để được hỗ trợ. Khách hàng chịu trách nhiệm về chi phí sửa chữa và vận chuyển.\n• Mất khóa xe: 200.000 VND\n• Mất xe đạp: 5.000.000 VND"
            },
            {
                "id": "motorbike-rental",
                "title": "Thuê xe máy",
                "icon": "motorbike",
                "description": "Khám phá Phong Nha với sự tự do của riêng bạn!\n\nGiá thuê\n• Xe tay ga: 150.000 VND/ngày\n• Xe số: 150.000 VND/ngày\nGiá thuê được tính theo ngày, không phải theo 24 giờ.\n\nThời gian trả xe\n• Vui lòng trả xe máy trước 23:00, hoặc trước 10:00 sáng hôm sau.\n\nChính sách thuê\n• Vui lòng kiểm tra xe máy trước khi thuê.\n• Khách hàng chịu trách nhiệm cho bất kỳ hư hỏng nào xảy ra trong thời gian thuê.\n• Khách hàng chịu trách nhiệm đối với các vi phạm giao thông, tiền phạt, tai nạn hoặc chi phí liên quan phát sinh trong thời gian thuê.\n• Bằng việc thuê xe máy, bạn xác nhận rằng bạn biết lái xe, có giấy phép lái xe hợp lệ được công nhận tại Việt Nam và có đủ kinh nghiệm lái xe.\n\nLái xe an toàn\nVui lòng lái xe cẩn thận tại Làng Phong Nha và khu vực Vườn Quốc Gia. Trẻ em thường chơi gần đường, ngoài ra chó, trâu, bò, sỏi đá và những người lái xe khó đoán có thể tạo ra những rủi ro bất ngờ.\n\nCần hỗ trợ?\nNếu bạn gặp bất kỳ vấn đề gì với xe máy hoặc cần hỗ trợ, vui lòng liên hệ với chúng tôi hoặc công ty cho thuê:\nWhatsApp:\n• Ms Linh (Quản lý): +84 778 508 898\n• Mr Thạch: +84 919 565 775"
            },
            {
                "id": "taxi-private-transfers",
                "title": "Taxi & Xe riêng đưa đón",
                "icon": "car",
                "description": "Chúng tôi cung cấp dịch vụ taxi và xe riêng đáng tin cậy, thân thiện và giá cả phải chăng.\n\nĐội xe của chúng tôi bao gồm xe 5–7 chỗ và xe limousine 9–16 chỗ, phục vụ khu vực Vườn Quốc Gia Phong Nha và các tuyến liên tỉnh theo yêu cầu.\nChi tiết tuyến đường và bảng giá có trong phần Di chuyển (Xe riêng đưa đón).\n\nĐối với các yêu cầu tùy chỉnh như địa điểm đón/trả đặc biệt hoặc dừng tham quan, vui lòng liên hệ với chúng tôi để có giá tốt nhất."
            },
            {
                "id": "easy-rider",
                "title": "Tour Easy Rider",
                "icon": "route",
                "description": "Bạn không tự tin tự lái xe máy, hoặc đơn giản là tìm kiếm một trải nghiệm địa phương đích thực? Tour Easy Rider của chúng tôi là lựa chọn hoàn hảo.\n\nCùng những tài xế địa phương thân thiện và giàu kinh nghiệm của chúng tôi khám phá những cung đường đồng quê tuyệt đẹp, điểm ngắm cảnh ẩn mình, làng bản địa phương và những điểm bí mật mà nhiều du khách không bao giờ được thấy.\nDọc đường, bạn sẽ hiểu thêm về cuộc sống địa phương, văn hóa và lịch sử khu vực trong khi tận hưởng một hành trình an toàn và đáng nhớ qua Phong Nha.\n\nBằng việc tham gia Tour Easy Rider, bạn cũng đang ủng hộ các tài xế địa phương và gia đình họ, giúp tạo ra cơ hội thu nhập bền vững trong cộng đồng.\nChúng tôi cung cấp một số lịch trình gợi ý bên dưới, nhưng mọi chuyến đi đều có thể được tùy chỉnh theo sở thích của bạn. Nếu bạn có yêu cầu đặc biệt hoặc muốn khám phá một tuyến đường khác, vui lòng liên hệ với chúng tôi để có lựa chọn và giá tốt nhất.\n\nLịch trình & Giá Easy Rider:\n• Hostel <-> Thị trấn Phong Nha/bến xe: 50.000 vnd/chiều\n• Phong Nha <-> Duck Stop/ Duck Tang Farm: 300.000 vnd/khứ hồi\n• Phong Nha <-> Động Thiên Đường/ Hang Tối: 400.000 vnd/khứ hồi\n• Phong Nha <-> Vườn Thực Vật/ Hang Chỉ Huy/ Ozo Park: 300.000 vnd/khứ hồi\n\nGói Combo (450.000 vnd/khứ hồi):\n• Động Thiên Đường + Hang Tối\n• Vườn Thực Vật + Động Thiên Đường\n• Động Thiên Đường + Suối Nước Moọc\n• Một hang động + Duck Stop/ Duck Farm\n• Hai điểm bất kỳ ở Phong Nha\n\nGói Mở rộng (500.000 vnd/khứ hồi):\n• Vườn Thực Vật + Động Thiên Đường + Hang Tối\n• Vườn Thực Vật + Động Thiên Đường + Duck Farm/Duck Stop\n• Động Thiên Đường + Suối Nước Moọc + Duck Farm/ Duck Stop\n• Hai hang động + Duck Stop/ Duck Farm\n• Ba điểm bất kỳ ở Phong Nha"
            },
            {
                "id": "sup-paddle-board",
                "title": "Chèo SUP & Tắm sông Son",
                "icon": "waves",
                "description": "Green Riverside Cosy Home chỉ cách sông Son 10 mét, mang đến cho du khách trải nghiệm sông nước tự nhiên tuyệt đẹp tại Phong Nha.\n\nThay vì bể bơi nhân tạo, chúng tôi cung cấp lối đi trực tiếp ra dòng sông tự nhiên ngay trước nhà — hoàn toàn miễn phí. Khách có thể bơi trong dòng nước sông trong mát hoặc tận hưởng ván chèo SUP (Stand-Up Paddle Board) của chúng tôi để có trải nghiệm vui vẻ và thư giãn trên mặt nước.\n\nTại đây, bạn có thể tận hưởng:\n• Tắm trên sông Son tự nhiên\n• 30 phút chèo SUP miễn phí (có cung cấp áo phao)\n• Có thể thuê thêm giờ chèo SUP với giá 100.000 VND/giờ\n• Không khí ven sông yên bình với khung cảnh ngư dân, hoạt động nông nghiệp địa phương và trẻ em chơi đùa dọc bờ sông\n• Hoàng hôn tuyệt đẹp trên sông Son\n\nLưu ý quan trọng:\n• Khách phải biết bơi\n• Không bơi ra khu vực nước sâu hoặc giữa sông\n• SUP chỉ khả dụng trước 7:00 sáng hoặc sau 4:00 chiều\n• SUP không được phép sử dụng từ 7:00 sáng – 5:00 chiều do lưu lượng tàu thuyền phục vụ tour Động Phong Nha\n• Tình trạng sông có thể thay đổi tùy thuộc vào thời tiết và dòng chảy\n\nAn toàn & Quy định:\n• Không dùng SUP để chèo vào Động Phong Nha vì điều này bị nghiêm cấm và không an toàn\n• Tất cả các chuyến tham quan Động Phong Nha phải được thực hiện qua thuyền chính thức tại bến thuyền Phong Nha\n• Khách tự chịu rủi ro khi tham gia mọi hoạt động trên sông và phải tuân thủ hướng dẫn an toàn mọi lúc"
            }
        ]
    },
    {
        "id": "comfort-care",
        "title": "Tiện ích & chăm sóc",
        "subtitle": "Những dịch vụ thực tế giúp việc đến, đi và nghỉ ngơi dễ dàng hơn.",
        "items": [
            {
                "id": "laundry",
                "title": "Dịch vụ giặt ủi",
                "icon": "shirt",
                "description": "Chúng tôi cung cấp dịch vụ giặt ủi tiện lợi cho khách hàng.\n\nGiá cả\n• Giặt & Sấy khô: 45.000 VND/kg\n• Giặt & Sấy nhanh (2–3 giờ): 60.000 VND/kg\n• Giặt giày: 80.000 VND/đôi\n• Giặt balo: 70.000 VND/chiếc\n\nLựa chọn làm khô\nBạn có thể chọn giữa:\n• Phơi nắng (nếu thời tiết cho phép)\n• Sấy bằng máy\n\nThời gian hoàn thành\n• Quần áo gửi trước 16:00 sẽ được trả lại trong ngày (khoảng 22:00–23:00).\n• Quần áo gửi sau 16:00 sẽ được trả lại vào ngày hôm sau.\n\nNhận & Trả đồ\n• Vui lòng gửi và nhận đồ giặt tại Quầy Lễ Tân.\n• Liên hệ lễ tân nếu bạn cần túi đựng đồ giặt hoặc có bất kỳ yêu cầu đặc biệt nào.\n\nLưu ý quan trọng\n• Vui lòng kiểm tra tất cả các túi trước khi giao đồ giặt.\n• Những món đồ có thể phai màu, co rút hoặc đồ dễ hỏng cần được báo trước.\n• Chúng tôi không chịu trách nhiệm đối với hư hỏng của đồ mỏng manh, phai màu, co rút hoặc các vấn đề khác nếu khách không thông báo trước.\n• Điều kiện thời tiết có thể ảnh hưởng đến khả năng phơi nắng."
            },
            {
                "id": "massage",
                "title": "Dịch vụ Massage",
                "icon": "massage",
                "description": "Cần thư giãn sau một ngày phiêu lưu?\nChúng tôi hợp tác với các cơ sở massage địa phương uy tín tại Phong Nha, cung cấp các liệu pháp chuyên nghiệp với mức giá hợp lý và minh bạch. Dịch vụ đón trả miễn phí từ hostel của chúng tôi được bao gồm trong mỗi lượt đặt.\n\nGợi ý (Được đề xuất cao)\nGia Bảo – Massage khiếm thị\n• Massage toàn thân 30 phút: 150.000 VND\n• Massage toàn thân 60 phút: 300.000 VND\n\nPT Hằng Massage & Nail\n• Massage, làm móng và các liệu pháp làm đẹp\n• Vui lòng hỏi lễ tân để biết bảng giá.\n\nƯu đãi Đặc biệt\nKhách đặt gói Phòng + Tour + Xe buýt qua hostel của chúng tôi sẽ nhận được một liệu pháp chăm sóc sức khỏe miễn phí cho mỗi người:\n• Massage 30 phút\n• Gội đầu thảo dược\n• Chăm sóc da mặt\n\nVui lòng liên hệ lễ tân để đặt chỗ, kiểm tra tình trạng và biết thêm thông tin."
            },
            {
                "id": "filtered-water",
                "title": "Nước lọc miễn phí",
                "icon": "water",
                "description": "Để giúp giảm thiểu rác thải nhựa và tiết kiệm chi phí cho khách hàng, chúng tôi cung cấp nước lọc miễn phí trong suốt thời gian bạn lưu trú.\n\nBạn được hoan nghênh nạp lại bình nước của mình bất cứ lúc nào từ cây nước ở tầng 1. Nếu bạn cần mượn bình, vui lòng hỏi tại quầy lễ tân.\n\nNếu bạn muốn hỗ trợ học sinh địa phương có hoàn cảnh khó khăn, có một thùng quyên góp tại quầy lễ tân. Mọi đóng góp đều hoàn toàn tự nguyện và được đánh giá cao.\n\nXin lưu ý rằng nước lọc được phục vụ ở nhiệt độ phòng. Nếu bạn thích nước lạnh hoặc các loại đồ uống khác, chúng có sẵn để mua tại quầy lễ tân hoặc quán bar sân thượng của chúng tôi trên tầng bốn."
            },
            {
                "id": "luggage-shower",
                "title": "Giữ hành lý, Phòng tắm & Nhà vệ sinh Trước Check-in / Sau Check-out",
                "icon": "luggage",
                "description": "Bạn đến sớm hay đi trễ? Chúng tôi luôn sẵn sàng hỗ trợ.\n\nChúng tôi cung cấp dịch vụ giữ hành lý miễn phí ở tầng 1, cho phép bạn khám phá Phong Nha mà không phải mang vác túi xách. Nếu bạn cần tủ khóa an toàn cho các đồ có giá trị như hộ chiếu, đồ điện tử hoặc tiền mặt, vui lòng liên hệ lễ tân để mượn khóa (có đặt cọc chìa khóa).\n\nKhách cũng được hoan nghênh sử dụng phòng tắm và nhà vệ sinh công cộng miễn phí trên tầng một và tầng bốn trước khi nhận phòng hoặc sau khi trả phòng.\n\nCho dù bạn đang đợi phòng, chuẩn bị đi tour, hay bắt chuyến xe đêm, hãy thoải mái sử dụng các tiện nghi và không gian chung của chúng tôi trong thời gian lưu trú.\nCác tiện nghi này được cung cấp miễn phí cho tất cả khách lưu trú. Khách đặt tour hoặc xe đưa đón qua chúng tôi cũng được hoan nghênh sử dụng."
            }
        ]
    },
    {
        "id": "common-spaces",
        "title": "Không gian chung",
        "subtitle": "Nơi để chậm lại, làm việc, chờ xe thoải mái hoặc gặp gỡ du khách khác.",
        "items": [
            {
                "id": "relaxed-common-areas",
                "title": "Khu vực sinh hoạt chung với Võng & Ghế lười",
                "icon": "sofa",
                "description": "Cho dù bạn đến sớm, chờ xe sau khi trả phòng, hay chỉ đơn giản là tìm một nơi để thư giãn, các không gian chung của chúng tôi được thiết kế để bạn cảm thấy như ở nhà.\n\nHãy tận hưởng phòng chờ ấm cúng trong nhà trên tầng 2, với ghế lười, sofa êm ái, quạt mát và máy lạnh, hoặc thư giãn trên sân thượng mát mẻ ở tầng 4, bao quanh bởi không khí trong lành và cảnh quan tuyệt đẹp.\n\nNhững không gian này hoàn hảo để đọc sách, làm việc, chợp mắt, thưởng thức đồ uống, hoặc gặp gỡ những người bạn đồng hành khác.\nNhiều sự kiện xã hội, trò chơi và hoạt động cộng đồng của chúng tôi cũng diễn ra tại đây, tạo ra nhiều cơ hội để cười đùa, kết nối với những người bạn mới và lưu giữ những kỷ niệm khó quên trong thời gian lưu trú tại Phong Nha."
            }
        ]
    }
]
  }
};

export const legacyUsefulInfo: Record<Locale, GuestPageContent> = {
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
  return getUsefulInfoContentClean(locale);
}

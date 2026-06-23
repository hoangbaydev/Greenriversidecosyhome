import fs from 'fs';
import path from 'path';

const newEnSections = [
  {
    id: "transport-rentals",
    title: "Transport & Rentals",
    subtitle: "Flexible ways to explore Phong Nha at your own pace.",
    items: [
      {
        id: "bicycle-rental",
        title: "Bicycle Rental",
        icon: "bike",
        description: `Explore Phong Nha at your own pace!

Rates
• First 2 hours: Free
• Full day rental: 70,000 VND/bicycle

Included
• Bicycle
• Lock

Return Time
• Please return bicycles by 11:00 PM.

Policy
• Please inspect the bicycle before use.
• If your bicycle is damaged during the rental period, contact us for assistance. Guests are responsible for repair and transportation costs.
• Lost lock: 200,000 VND
• Lost bicycle: 5,000,000 VND`
      },
      {
        id: "motorbike-rental",
        title: "Motorbike Rental",
        icon: "motorbike",
        description: `Explore Phong Nha with the freedom of your own motorbike!

Rates
• Automatic scooter: 150,000 VND/day
• Semi-automatic motorbike: 150,000 VND/day
Rental is charged per day, not per 24 hours.

Return Time
• Please return the motorbike before 11:00 PM, or before 10:00 AM the following morning.

Rental Policy
• Please inspect the motorbike before renting.
• Guests are responsible for any damage occurring during the rental period.
• Guests are responsible for any traffic violations, fines, accidents, or related costs incurred during the rental period.
• By renting a motorbike, you confirm that you know how to ride, have a valid driving licence recognised in Vietnam, and sufficient riding experience.

Ride Safely
Please drive carefully in Phong Nha Village and the National Park area. Children often play near the roads, and dogs, buffaloes, cows, loose gravel, and unpredictable drivers can create unexpected hazards.

Need Assistance?
If you experience any problems with the motorbike or need assistance, please contact us or the rental company:
WhatsApp:
• Ms Linh (Manager): +84 778 508 898
• Mr Thach: +84 919 565 775`
      },
      {
        id: "taxi-private-transfers",
        title: "Taxi & Private Transfers",
        icon: "car",
        description: `We offer reliable, friendly, and affordable taxi and private transfer services.

Our fleet includes 5–7 seat cars and 9–16 seat limousines, serving Phong Nha National Park and intercity routes upon request.
Detailed routes and price lists are available in the Transportation (Private Transfers) section.

For custom requests such as special pick-up/drop-off locations or sightseeing stops, please contact us to get the best available price.`
      },
      {
        id: "easy-rider",
        title: "Easy Rider Tours",
        icon: "route",
        description: `Not confident riding a motorbike yourself, or simply looking for an authentic local experience? Our Easy Rider Tours are the perfect option.

Ride with our friendly and experienced local drivers as they take you beyond the tourist trail to discover beautiful countryside roads, hidden viewpoints, local villages, and secret spots that many visitors never get to see.
Along the way, you'll learn more about local life, culture, and the history of the area while enjoying a safe and memorable journey through Phong Nha.

By joining an Easy Rider Tour, you're also supporting local drivers and their families, helping create sustainable income opportunities within the community.
We offer several suggested itineraries below, but every trip can be customized to suit your interests. If you have special requests or would like to explore a different route, please contact us for the best options and prices.

Easy Riders Itinerary & Prices:
• Our hostel <-> Phong Nha town/bus stop: 50,000 vnd/way
• Phong Nha <-> Duck Stop/ Duck Tang Farm: 300,000 vnd/round trip
• Phong Nha <-> Paradise cave/ Dark Cave: 400,000 vnd/round trip
• Phong Nha <-> Botanic Garden/ Commander Cave/ Ozo Park: 300,000 vnd/round trip

Combo Packages (450,000 vnd/round trip):
• Paradise Cave + Dark cave
• Botanic Garden + Paradise Cave
• Paradise Cave + Nuoc Mooc Spring
• One cave + Duck Stop/ Duck Farm
• Two spots in Phong Nha

Extended Packages (500,000 vnd/round trip):
• Botanic Garden + Paradise Cave + Dark cave
• Botanic Garden + Paradise Cave + Duck Farm/Duck Stop
• Paradise Cave + Nuoc Mooc Spring + Duck Farm/ Duck Stop
• Two caves + Duck Stop/ Duck Farm
• Three spots in Phong Nha`
      },
      {
        id: "sup-paddle-board",
        title: "SUP Paddle Boarding & Swimming Experience at the Son River",
        icon: "waves",
        description: `Green Riverside Cosy Home is located just 10 meters from the Son River, offering guests direct access to a beautiful natural river experience in Phong Nha.

Instead of an artificial swimming pool, we offer direct access to the natural river right in front of the property — free of charge. Guests can swim in the fresh river water or enjoy our SUP (Stand-Up Paddle Board) for a fun and relaxing experience on the water.

Here, you can enjoy:
• Swimming in the natural Son River
• 30 minutes of free SUP paddle boarding (life jackets provided)
• Extra SUP time is available at 100,000 VND per hour
• A peaceful riverside atmosphere with views of fishermen, local farming activities, and children playing along the riverbank
• Beautiful sunsets over the Son River

Important notes:
• Guests must know how to swim
• Do not swim into deep or mid-river areas
• SUP is available only before 7:00 AM or after 4:00 PM
• SUP is not available during 7:00 AM – 5:00 PM due to boat traffic for Phong Nha Cave tours
• River conditions may vary depending on weather and water flow

Safety & Regulations:
• Do not use SUP to enter Phong Nha Cave as it is strictly prohibited and unsafe
• All Phong Nha Cave visits must be done via official boats at Phong Nha Boat Station (bến thuyền Phong Nha)
• Guests participate in all river activities at their own risk and must follow safety instructions at all times`
      }
    ]
  },
  {
    id: "comfort-care",
    title: "Comfort & Care",
    subtitle: "Practical services that make arrival, departure, and rest easier.",
    items: [
      {
        id: "laundry",
        title: "Laundry Service",
        icon: "shirt",
        description: `We offer convenient laundry services for our guests.

Prices
• Wash & Dry: 45,000 VND/kg
• Express Wash & Dry (2–3 hours): 60,000 VND/kg
• Shoes Cleaning: 80,000 VND/pair
• Backpack Cleaning: 70,000 VND/item

Drying Options
You can choose between:
• Sun Drying (weather permitting)
• Machine Drying

Turnaround Time
• Laundry submitted before 4:00 PM will be returned the same day (around 10:00–11:00 PM).
• Laundry submitted after 4:00 PM will be returned the following day.

Drop-off & Collection
• Please leave and collect your laundry at the Reception Desk.
• Contact reception if you need a laundry bag or have any special requests regarding your laundry.

Important Notes
• Please check all pockets before handing in your laundry.
• Items that may bleed color, shrink, or are delicate should be declared in advance.
• We are not responsible for damage to delicate items, color bleeding, shrinkage, or other issues if guests do not inform us beforehand.
• Weather conditions may affect the availability of sun drying.`
      },
      {
        id: "massage",
        title: "Massage Service",
        icon: "massage",
        description: `Need to relax after a day of adventure?
We work with trusted local massage providers in Phong Nha, offering professional treatments at fair and transparent prices. Complimentary pick-up and drop-off from our hostel is included with every booking.

Highly Recommended
Gia Bảo – Blind Massage Therapy
• 30-minute body massage: 150,000 VND
• 60-minute body massage: 300,000 VND

PT Hằng Massage & Nail
• Massage, nail care, and beauty treatments
• Please ask at reception for the price list.

Special Offer
Guests who book a Room + Tour + Bus package through our hostel will receive one complimentary wellness treatment per person:
• 30-minute massage
• Herbal hair wash
• Facial treatment

Please contact reception for bookings, availability, and more information.`
      },
      {
        id: "filtered-water",
        title: "Free Filtered Drinking Water",
        icon: "water",
        description: `To help reduce plastic waste and save our guests money, we provide free filtered drinking water throughout your stay.

You are welcome to refill your bottle anytime from the water dispenser on the first floor. If you need a bottle, please ask at reception.

If you would like to support disadvantaged local students, a donation box is available at reception. All contributions are entirely voluntary and greatly appreciated.

Please note that the filtered water is served at room temperature. If you prefer chilled water or other beverages, they are available for purchase at reception or at our rooftop bar on the fourth floor.`
      },
      {
        id: "luggage-shower",
        title: "Luggage Storage, Shower & Toilet Facilities Before Check-in / After Check-out",
        icon: "luggage",
        description: `Arriving early or leaving late? We've got you covered.

We provide free luggage storage on the first floor, allowing you to explore Phong Nha without carrying your bags. If you need a secure locker for valuables such as passports, electronics, or cash, please contact reception for a lock and refundable key deposit.

Guests are also welcome to use our free public showers and toilet facilities on the first and fourth floors before check-in or after check-out.

Whether you're waiting for your room, heading off on a tour, or catching an overnight bus, feel free to make use of our facilities and common areas during your stay.
These facilities are available free of charge for all in-house guests. Guests booking tours or transportation through us are also welcome to use them.`
      }
    ]
  },
  {
    id: "common-spaces",
    title: "Common Spaces",
    subtitle: "Places to slow down, work, wait comfortably, or meet other travellers.",
    items: [
      {
        id: "relaxed-common-areas",
        title: "Common Areas with Hammocks & Bean Bag Sofas",
        icon: "sofa",
        description: `Whether you're arriving early, waiting for your bus after check-out, or simply looking for a place to relax, our common areas are designed to make you feel at home.

Enjoy our cozy indoor lounge on the second floor, featuring bean bags, comfortable sofas, fans, and air conditioning, or unwind on our cool rooftop terrace on the fourth floor, surrounded by fresh air and beautiful views.

These spaces are perfect for reading, working, taking a nap, enjoying a drink, or meeting fellow travelers.
Many of our social events, games, and community activities also take place here, creating plenty of opportunities to laugh, connect with new friends, and make unforgettable memories during your stay in Phong Nha.`
      }
    ]
  }
];

// Re-translating to Vietnamese
const newViSections = [
  {
    id: "transport-rentals",
    title: "Di chuyển & cho thuê",
    subtitle: "Những cách linh hoạt để khám phá Phong Nha theo nhịp riêng của bạn.",
    items: [
      {
        id: "bicycle-rental",
        title: "Thuê xe đạp",
        icon: "bike",
        description: `Khám phá Phong Nha theo nhịp độ của riêng bạn!

Giá thuê
• 2 giờ đầu tiên: Miễn phí
• Thuê cả ngày: 70.000 VND/xe

Bao gồm
• Xe đạp
• Khóa xe

Thời gian trả xe
• Vui lòng trả xe đạp trước 23:00.

Chính sách
• Vui lòng kiểm tra xe đạp trước khi sử dụng.
• Nếu xe đạp của bạn bị hỏng trong thời gian thuê, hãy liên hệ với chúng tôi để được hỗ trợ. Khách hàng chịu trách nhiệm về chi phí sửa chữa và vận chuyển.
• Mất khóa xe: 200.000 VND
• Mất xe đạp: 5.000.000 VND`
      },
      {
        id: "motorbike-rental",
        title: "Thuê xe máy",
        icon: "motorbike",
        description: `Khám phá Phong Nha với sự tự do của riêng bạn!

Giá thuê
• Xe tay ga: 150.000 VND/ngày
• Xe số: 150.000 VND/ngày
Giá thuê được tính theo ngày, không phải theo 24 giờ.

Thời gian trả xe
• Vui lòng trả xe máy trước 23:00, hoặc trước 10:00 sáng hôm sau.

Chính sách thuê
• Vui lòng kiểm tra xe máy trước khi thuê.
• Khách hàng chịu trách nhiệm cho bất kỳ hư hỏng nào xảy ra trong thời gian thuê.
• Khách hàng chịu trách nhiệm đối với các vi phạm giao thông, tiền phạt, tai nạn hoặc chi phí liên quan phát sinh trong thời gian thuê.
• Bằng việc thuê xe máy, bạn xác nhận rằng bạn biết lái xe, có giấy phép lái xe hợp lệ được công nhận tại Việt Nam và có đủ kinh nghiệm lái xe.

Lái xe an toàn
Vui lòng lái xe cẩn thận tại Làng Phong Nha và khu vực Vườn Quốc Gia. Trẻ em thường chơi gần đường, ngoài ra chó, trâu, bò, sỏi đá và những người lái xe khó đoán có thể tạo ra những rủi ro bất ngờ.

Cần hỗ trợ?
Nếu bạn gặp bất kỳ vấn đề gì với xe máy hoặc cần hỗ trợ, vui lòng liên hệ với chúng tôi hoặc công ty cho thuê:
WhatsApp:
• Ms Linh (Quản lý): +84 778 508 898
• Mr Thạch: +84 919 565 775`
      },
      {
        id: "taxi-private-transfers",
        title: "Taxi & Xe riêng đưa đón",
        icon: "car",
        description: `Chúng tôi cung cấp dịch vụ taxi và xe riêng đáng tin cậy, thân thiện và giá cả phải chăng.

Đội xe của chúng tôi bao gồm xe 5–7 chỗ và xe limousine 9–16 chỗ, phục vụ khu vực Vườn Quốc Gia Phong Nha và các tuyến liên tỉnh theo yêu cầu.
Chi tiết tuyến đường và bảng giá có trong phần Di chuyển (Xe riêng đưa đón).

Đối với các yêu cầu tùy chỉnh như địa điểm đón/trả đặc biệt hoặc dừng tham quan, vui lòng liên hệ với chúng tôi để có giá tốt nhất.`
      },
      {
        id: "easy-rider",
        title: "Tour Easy Rider",
        icon: "route",
        description: `Bạn không tự tin tự lái xe máy, hoặc đơn giản là tìm kiếm một trải nghiệm địa phương đích thực? Tour Easy Rider của chúng tôi là lựa chọn hoàn hảo.

Cùng những tài xế địa phương thân thiện và giàu kinh nghiệm của chúng tôi khám phá những cung đường đồng quê tuyệt đẹp, điểm ngắm cảnh ẩn mình, làng bản địa phương và những điểm bí mật mà nhiều du khách không bao giờ được thấy.
Dọc đường, bạn sẽ hiểu thêm về cuộc sống địa phương, văn hóa và lịch sử khu vực trong khi tận hưởng một hành trình an toàn và đáng nhớ qua Phong Nha.

Bằng việc tham gia Tour Easy Rider, bạn cũng đang ủng hộ các tài xế địa phương và gia đình họ, giúp tạo ra cơ hội thu nhập bền vững trong cộng đồng.
Chúng tôi cung cấp một số lịch trình gợi ý bên dưới, nhưng mọi chuyến đi đều có thể được tùy chỉnh theo sở thích của bạn. Nếu bạn có yêu cầu đặc biệt hoặc muốn khám phá một tuyến đường khác, vui lòng liên hệ với chúng tôi để có lựa chọn và giá tốt nhất.

Lịch trình & Giá Easy Rider:
• Hostel <-> Thị trấn Phong Nha/bến xe: 50.000 vnd/chiều
• Phong Nha <-> Duck Stop/ Duck Tang Farm: 300.000 vnd/khứ hồi
• Phong Nha <-> Động Thiên Đường/ Hang Tối: 400.000 vnd/khứ hồi
• Phong Nha <-> Vườn Thực Vật/ Hang Chỉ Huy/ Ozo Park: 300.000 vnd/khứ hồi

Gói Combo (450.000 vnd/khứ hồi):
• Động Thiên Đường + Hang Tối
• Vườn Thực Vật + Động Thiên Đường
• Động Thiên Đường + Suối Nước Moọc
• Một hang động + Duck Stop/ Duck Farm
• Hai điểm bất kỳ ở Phong Nha

Gói Mở rộng (500.000 vnd/khứ hồi):
• Vườn Thực Vật + Động Thiên Đường + Hang Tối
• Vườn Thực Vật + Động Thiên Đường + Duck Farm/Duck Stop
• Động Thiên Đường + Suối Nước Moọc + Duck Farm/ Duck Stop
• Hai hang động + Duck Stop/ Duck Farm
• Ba điểm bất kỳ ở Phong Nha`
      },
      {
        id: "sup-paddle-board",
        title: "Chèo SUP & Tắm sông Son",
        icon: "waves",
        description: `Green Riverside Cosy Home chỉ cách sông Son 10 mét, mang đến cho du khách trải nghiệm sông nước tự nhiên tuyệt đẹp tại Phong Nha.

Thay vì bể bơi nhân tạo, chúng tôi cung cấp lối đi trực tiếp ra dòng sông tự nhiên ngay trước nhà — hoàn toàn miễn phí. Khách có thể bơi trong dòng nước sông trong mát hoặc tận hưởng ván chèo SUP (Stand-Up Paddle Board) của chúng tôi để có trải nghiệm vui vẻ và thư giãn trên mặt nước.

Tại đây, bạn có thể tận hưởng:
• Tắm trên sông Son tự nhiên
• 30 phút chèo SUP miễn phí (có cung cấp áo phao)
• Có thể thuê thêm giờ chèo SUP với giá 100.000 VND/giờ
• Không khí ven sông yên bình với khung cảnh ngư dân, hoạt động nông nghiệp địa phương và trẻ em chơi đùa dọc bờ sông
• Hoàng hôn tuyệt đẹp trên sông Son

Lưu ý quan trọng:
• Khách phải biết bơi
• Không bơi ra khu vực nước sâu hoặc giữa sông
• SUP chỉ khả dụng trước 7:00 sáng hoặc sau 4:00 chiều
• SUP không được phép sử dụng từ 7:00 sáng – 5:00 chiều do lưu lượng tàu thuyền phục vụ tour Động Phong Nha
• Tình trạng sông có thể thay đổi tùy thuộc vào thời tiết và dòng chảy

An toàn & Quy định:
• Không dùng SUP để chèo vào Động Phong Nha vì điều này bị nghiêm cấm và không an toàn
• Tất cả các chuyến tham quan Động Phong Nha phải được thực hiện qua thuyền chính thức tại bến thuyền Phong Nha
• Khách tự chịu rủi ro khi tham gia mọi hoạt động trên sông và phải tuân thủ hướng dẫn an toàn mọi lúc`
      }
    ]
  },
  {
    id: "comfort-care",
    title: "Tiện ích & chăm sóc",
    subtitle: "Những dịch vụ thực tế giúp việc đến, đi và nghỉ ngơi dễ dàng hơn.",
    items: [
      {
        id: "laundry",
        title: "Dịch vụ giặt ủi",
        icon: "shirt",
        description: `Chúng tôi cung cấp dịch vụ giặt ủi tiện lợi cho khách hàng.

Giá cả
• Giặt & Sấy khô: 45.000 VND/kg
• Giặt & Sấy nhanh (2–3 giờ): 60.000 VND/kg
• Giặt giày: 80.000 VND/đôi
• Giặt balo: 70.000 VND/chiếc

Lựa chọn làm khô
Bạn có thể chọn giữa:
• Phơi nắng (nếu thời tiết cho phép)
• Sấy bằng máy

Thời gian hoàn thành
• Quần áo gửi trước 16:00 sẽ được trả lại trong ngày (khoảng 22:00–23:00).
• Quần áo gửi sau 16:00 sẽ được trả lại vào ngày hôm sau.

Nhận & Trả đồ
• Vui lòng gửi và nhận đồ giặt tại Quầy Lễ Tân.
• Liên hệ lễ tân nếu bạn cần túi đựng đồ giặt hoặc có bất kỳ yêu cầu đặc biệt nào.

Lưu ý quan trọng
• Vui lòng kiểm tra tất cả các túi trước khi giao đồ giặt.
• Những món đồ có thể phai màu, co rút hoặc đồ dễ hỏng cần được báo trước.
• Chúng tôi không chịu trách nhiệm đối với hư hỏng của đồ mỏng manh, phai màu, co rút hoặc các vấn đề khác nếu khách không thông báo trước.
• Điều kiện thời tiết có thể ảnh hưởng đến khả năng phơi nắng.`
      },
      {
        id: "massage",
        title: "Dịch vụ Massage",
        icon: "massage",
        description: `Cần thư giãn sau một ngày phiêu lưu?
Chúng tôi hợp tác với các cơ sở massage địa phương uy tín tại Phong Nha, cung cấp các liệu pháp chuyên nghiệp với mức giá hợp lý và minh bạch. Dịch vụ đón trả miễn phí từ hostel của chúng tôi được bao gồm trong mỗi lượt đặt.

Gợi ý (Được đề xuất cao)
Gia Bảo – Massage khiếm thị
• Massage toàn thân 30 phút: 150.000 VND
• Massage toàn thân 60 phút: 300.000 VND

PT Hằng Massage & Nail
• Massage, làm móng và các liệu pháp làm đẹp
• Vui lòng hỏi lễ tân để biết bảng giá.

Ưu đãi Đặc biệt
Khách đặt gói Phòng + Tour + Xe buýt qua hostel của chúng tôi sẽ nhận được một liệu pháp chăm sóc sức khỏe miễn phí cho mỗi người:
• Massage 30 phút
• Gội đầu thảo dược
• Chăm sóc da mặt

Vui lòng liên hệ lễ tân để đặt chỗ, kiểm tra tình trạng và biết thêm thông tin.`
      },
      {
        id: "filtered-water",
        title: "Nước lọc miễn phí",
        icon: "water",
        description: `Để giúp giảm thiểu rác thải nhựa và tiết kiệm chi phí cho khách hàng, chúng tôi cung cấp nước lọc miễn phí trong suốt thời gian bạn lưu trú.

Bạn được hoan nghênh nạp lại bình nước của mình bất cứ lúc nào từ cây nước ở tầng 1. Nếu bạn cần mượn bình, vui lòng hỏi tại quầy lễ tân.

Nếu bạn muốn hỗ trợ học sinh địa phương có hoàn cảnh khó khăn, có một thùng quyên góp tại quầy lễ tân. Mọi đóng góp đều hoàn toàn tự nguyện và được đánh giá cao.

Xin lưu ý rằng nước lọc được phục vụ ở nhiệt độ phòng. Nếu bạn thích nước lạnh hoặc các loại đồ uống khác, chúng có sẵn để mua tại quầy lễ tân hoặc quán bar sân thượng của chúng tôi trên tầng bốn.`
      },
      {
        id: "luggage-shower",
        title: "Giữ hành lý, Phòng tắm & Nhà vệ sinh Trước Check-in / Sau Check-out",
        icon: "luggage",
        description: `Bạn đến sớm hay đi trễ? Chúng tôi luôn sẵn sàng hỗ trợ.

Chúng tôi cung cấp dịch vụ giữ hành lý miễn phí ở tầng 1, cho phép bạn khám phá Phong Nha mà không phải mang vác túi xách. Nếu bạn cần tủ khóa an toàn cho các đồ có giá trị như hộ chiếu, đồ điện tử hoặc tiền mặt, vui lòng liên hệ lễ tân để mượn khóa (có đặt cọc chìa khóa).

Khách cũng được hoan nghênh sử dụng phòng tắm và nhà vệ sinh công cộng miễn phí trên tầng một và tầng bốn trước khi nhận phòng hoặc sau khi trả phòng.

Cho dù bạn đang đợi phòng, chuẩn bị đi tour, hay bắt chuyến xe đêm, hãy thoải mái sử dụng các tiện nghi và không gian chung của chúng tôi trong thời gian lưu trú.
Các tiện nghi này được cung cấp miễn phí cho tất cả khách lưu trú. Khách đặt tour hoặc xe đưa đón qua chúng tôi cũng được hoan nghênh sử dụng.`
      }
    ]
  },
  {
    id: "common-spaces",
    title: "Không gian chung",
    subtitle: "Nơi để chậm lại, làm việc, chờ xe thoải mái hoặc gặp gỡ du khách khác.",
    items: [
      {
        id: "relaxed-common-areas",
        title: "Khu vực sinh hoạt chung với Võng & Ghế lười",
        icon: "sofa",
        description: `Cho dù bạn đến sớm, chờ xe sau khi trả phòng, hay chỉ đơn giản là tìm một nơi để thư giãn, các không gian chung của chúng tôi được thiết kế để bạn cảm thấy như ở nhà.

Hãy tận hưởng phòng chờ ấm cúng trong nhà trên tầng 2, với ghế lười, sofa êm ái, quạt mát và máy lạnh, hoặc thư giãn trên sân thượng mát mẻ ở tầng 4, bao quanh bởi không khí trong lành và cảnh quan tuyệt đẹp.

Những không gian này hoàn hảo để đọc sách, làm việc, chợp mắt, thưởng thức đồ uống, hoặc gặp gỡ những người bạn đồng hành khác.
Nhiều sự kiện xã hội, trò chơi và hoạt động cộng đồng của chúng tôi cũng diễn ra tại đây, tạo ra nhiều cơ hội để cười đùa, kết nối với những người bạn mới và lưu giữ những kỷ niệm khó quên trong thời gian lưu trú tại Phong Nha.`
      }
    ]
  }
];

const filePath = path.join(process.cwd(), 'src/lib/content/guest-pages.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Replace the otherServices object
// We will replace from "const otherServices: Record<Locale, GuestPageContent> = {" 
// up to the closing "};" before "const usefulInfo"

const regex = /const otherServices: Record<Locale, GuestPageContent> = \{[\s\S]*?\n\};\n\nconst usefulInfo/g;
const replacement = "const otherServices: Record<Locale, GuestPageContent> = {\n" +
"  en: {\n" +
"    sections: " + JSON.stringify(newEnSections, null, 4) + "\n" +
"  },\n" +
"  vi: {\n" +
"    sections: " + JSON.stringify(newViSections, null, 4) + "\n" +
"  }\n" +
"};\n\n" +
"const usefulInfo";

content = content.replace(regex, replacement);
fs.writeFileSync(filePath, content);
console.log('Successfully updated otherServices in guest-pages.ts');

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
            description: "Easy local rides around the river, village roads, and nearby viewpoints.",
            icon: "bike",
          },
          {
            id: "motorbike-rental",
            title: "Motorbike Rental",
            description: "Reliable motorbikes with local route advice before you head out.",
            icon: "motorbike",
          },
          {
            id: "taxi-private-transfers",
            title: "Taxi & Private Transfers",
            description: "Door-to-door help for stations, airports, bus offices, and local trips.",
            icon: "car",
          },
          {
            id: "easy-rider-tours",
            title: "Easy Rider Tours",
            description: "Guided motorbike experiences with local drivers and flexible routes.",
            icon: "route",
          },
          {
            id: "kayak-rental",
            title: "Kayak Rental",
            description: "A simple way to enjoy the Son River when conditions are suitable.",
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
            id: "laundry-service",
            title: "Laundry Service",
            description: "Freshen up clothes after cave tours, kayaking, cycling, or long bus rides.",
            icon: "shirt",
          },
          {
            id: "massage-service",
            title: "Massage Service",
            description: "Relax after travel days, trekking, or a full schedule of adventure tours.",
            icon: "massage",
          },
          {
            id: "free-filtered-water",
            title: "Free Filtered Drinking Water",
            description: "Refill your bottle and reduce plastic during your stay.",
            icon: "water",
          },
          {
            id: "luggage-facilities",
            title: "Luggage Storage, Shower & Toilet Facilities",
            description: "Useful before check-in, after check-out, or before an overnight bus.",
            icon: "luggage",
          },
        ],
      },
      {
        id: "social-spaces",
        title: "Relaxed Common Spaces",
        subtitle: "Places to slow down, meet people, work, or wait comfortably.",
        items: [
          {
            id: "common-areas",
            title: "Common Areas with Hammocks & Bean Bag Sofas",
            description: "Comfortable shared spaces for reading, planning, working, or chatting.",
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
        title: "Di chuyen & cho thue",
        subtitle: "Nhung cach linh hoat de kham pha Phong Nha theo nhip rieng cua ban.",
        items: [
          {
            id: "bicycle-rental",
            title: "Thue xe dap",
            description: "Phu hop de di quanh bo song, duong lang va cac diem ngam canh gan nha.",
            icon: "bike",
          },
          {
            id: "motorbike-rental",
            title: "Thue xe may",
            description: "Xe may dang tin cay kem goi y cung duong dia phuong truoc khi ban xuat phat.",
            icon: "motorbike",
          },
          {
            id: "taxi-private-transfers",
            title: "Taxi & xe rieng dua don",
            description: "Ho tro dua don tan noi den ga, san bay, ben xe va cac diem quanh khu vuc.",
            icon: "car",
          },
          {
            id: "easy-rider-tours",
            title: "Tour Easy Rider",
            description: "Trai nghiem xe may co tai xe dia phuong, linh hoat theo lich trinh.",
            icon: "route",
          },
          {
            id: "kayak-rental",
            title: "Thue kayak",
            description: "Cach gon nhe de tan huong song Son khi dieu kien thoi tiet phu hop.",
            icon: "waves",
          },
        ],
      },
      {
        id: "comfort-care",
        title: "Tien ich & cham soc",
        subtitle: "Nhung dich vu thuc te giup viec den, di va nghi ngoi de dang hon.",
        items: [
          {
            id: "laundry-service",
            title: "Dich vu giat ui",
            description: "Lam moi quan ao sau tour hang dong, kayak, dap xe hoac nhung chuyen xe dai.",
            icon: "shirt",
          },
          {
            id: "massage-service",
            title: "Dich vu massage",
            description: "Thu gian sau ngay di chuyen, trekking hoac lich trinh kham pha day nang luong.",
            icon: "massage",
          },
          {
            id: "free-filtered-water",
            title: "Nuoc loc mien phi",
            description: "Nap lai binh nuoc ca nhan va giam rac thai nhua trong thoi gian luu tru.",
            icon: "water",
          },
          {
            id: "luggage-facilities",
            title: "Giu hanh ly, phong tam & nha ve sinh",
            description: "Tien loi truoc gio check-in, sau gio check-out hoac truoc chuyen xe dem.",
            icon: "luggage",
          },
        ],
      },
      {
        id: "social-spaces",
        title: "Khong gian sinh hoat chung",
        subtitle: "Noi nghi ngoi, gap go ban moi, lam viec hoac cho doi thoai mai.",
        items: [
          {
            id: "common-areas",
            title: "Khu sinh hoat chung voi vong & ghe luoi",
            description: "Khong gian de doc sach, len lich trinh, lam viec hoac tro chuyen cung du khach.",
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
          { id: "best-places-to-eat", title: "Where Are the Best Places to Eat in Phong Nha?", description: "Local restaurants, casual meals, and reliable guest favorites.", icon: "utensils" },
          { id: "vegan-vegetarian", title: "Where Can I Find Vegan & Vegetarian Food in Phong Nha?", description: "Plant-based and vegetarian-friendly places around town.", icon: "leaf" },
          { id: "best-cafes", title: "What Are the Best Cafes in Phong Nha?", description: "Coffee, breakfast, remote-work corners, and quiet afternoon stops.", icon: "coffee" },
          { id: "drinks-nightlife", title: "Where Can I Enjoy a Drink or Nightlife in Phong Nha?", description: "Relaxed bars, social places, and easy evening recommendations.", icon: "beer" },
        ],
      },
      {
        id: "nature-activities",
        title: "Nature & Local Activities",
        subtitle: "Simple ways to enjoy the landscape beyond the main cave tours.",
        items: [
          { id: "sunrise-sunset", title: "Where Are the Best Places to Watch Sunrise & Sunset?", description: "Scenic viewpoints for golden-hour photos and quiet moments.", icon: "sunrise" },
          { id: "swimming-spots", title: "Where Are the Best Swimming Spots in Phong Nha?", description: "Refreshing places to cool down when conditions are safe.", icon: "waves" },
          { id: "must-visit-attractions", title: "What Are the Must-Visit Attractions in Phong Nha?", description: "Caves, rivers, valleys, and classic stops for first-time visitors.", icon: "map" },
          { id: "cycling-routes", title: "What Are the Best Cycling Routes Around Phong Nha?", description: "Gentle village loops and more scenic countryside routes.", icon: "bike" },
          { id: "motorbike-rental", title: "Where Can I Rent a Reliable Motorbike in Phong Nha?", description: "Practical advice for safe, reliable motorbike rental.", icon: "key" },
          { id: "gym", title: "Is There a Good Gym in Phong Nha?", description: "Where to train or keep your routine while traveling.", icon: "dumbbell" },
        ],
      },
      {
        id: "practical-help",
        title: "Practical Help",
        subtitle: "Money, shopping, health, and everyday essentials while you are here.",
        items: [
          { id: "atm-exchange", title: "Where Can I Find ATMs or Exchange Money?", description: "Cash, exchange options, and what to prepare before arriving.", icon: "money" },
          { id: "shopping", title: "Where Can I Shop for Groceries, Souvenirs, or Daily Essentials?", description: "Useful stops for snacks, toiletries, gifts, and small travel needs.", icon: "shopping" },
          { id: "sick", title: "What Should I Do If I Get Sick?", description: "Who to ask first and how we can help you find care quickly.", icon: "health" },
          { id: "pharmacy-clinic-hospital", title: "Where Are the Nearest Pharmacy, Clinic, and Hospital?", description: "Nearby healthcare options for minor needs or urgent support.", icon: "pill" },
        ],
      },
      {
        id: "travel-planning",
        title: "Vietnam Travel Planning",
        subtitle: "Weather, entry, payment, connectivity, transport, and packing basics.",
        items: [
          { id: "weather", title: "What Is the Weather Like in Phong Nha?", description: "Seasonal expectations so you can plan clothes and activities.", icon: "weather" },
          { id: "rainy-flooding-season", title: "When Is the Rainy Season and Flooding Season in Phong Nha?", description: "What to know about wet season, safety, and flexible plans.", icon: "rain" },
          { id: "visa", title: "Do I Need a Visa to Visit Vietnam?", description: "A reminder to check official visa rules before travel.", icon: "visa" },
          { id: "travel-to-vietnam", title: "How Do I Travel to Vietnam?", description: "Airports, arrival cities, and onward routes toward Phong Nha.", icon: "plane" },
          { id: "sim-esim", title: "What SIM Card or eSIM Should I Use in Vietnam?", description: "Connectivity options for maps, messaging, and booking on the road.", icon: "phone" },
          { id: "credit-card", title: "Can I Pay by Credit Card in Phong Nha?", description: "Where cards work, where cash is better, and what to prepare.", icon: "card" },
          { id: "getting-around", title: "How Can I Get Around Phong Nha?", description: "Walking, cycling, motorbikes, taxis, and transfers.", icon: "taxi" },
          { id: "packing", title: "What Should I Pack for Visiting Phong Nha?", description: "A practical packing checklist for caves, rivers, and countryside days.", icon: "backpack" },
        ],
      },
    ],
  },
  vi: {
    sections: [
      {
        id: "food-drink",
        title: "An uong, cafe & buoi toi",
        subtitle: "Noi an ngon, uong cafe, lam viec nhe hoac tan huong buoi toi.",
        items: [
          { id: "best-places-to-eat", title: "An o dau ngon nhat tai Phong Nha?", description: "Quan dia phuong, bua an don gian va nhung dia diem khach hay thich.", icon: "utensils" },
          { id: "vegan-vegetarian", title: "Tim mon chay va thuan chay o dau tai Phong Nha?", description: "Nhung lua chon than thien voi khach an chay quanh thi tran.", icon: "leaf" },
          { id: "best-cafes", title: "Nhung quan cafe nao dang ghe nhat o Phong Nha?", description: "Cafe, bua sang, goc lam viec va diem dung chan buoi chieu.", icon: "coffee" },
          { id: "drinks-nightlife", title: "Uong bia, cocktail hoac nightlife o dau tai Phong Nha?", description: "Quan bar nhe nhang, dia diem giao luu va goi y cho buoi toi.", icon: "beer" },
        ],
      },
      {
        id: "nature-activities",
        title: "Thien nhien & hoat dong dia phuong",
        subtitle: "Nhung cach don gian de tan huong canh quan ngoai cac tour hang dong chinh.",
        items: [
          { id: "sunrise-sunset", title: "Dia diem ngam binh minh va hoang hon dep nhat o dau?", description: "Goc ngam canh dep cho anh gio vang va khoanh khac yen tinh.", icon: "sunrise" },
          { id: "swimming-spots", title: "Nhung diem boi dep nhat o Phong Nha o dau?", description: "Noi mat me de giai nhiet khi dieu kien an toan va phu hop.", icon: "waves" },
          { id: "must-visit-attractions", title: "Nhung diem tham quan khong nen bo lo o Phong Nha la gi?", description: "Hang dong, song, thung lung va cac diem kinh dien cho lan dau ghe tham.", icon: "map" },
          { id: "cycling-routes", title: "Nhung cung duong dap xe dep quanh Phong Nha la gi?", description: "Cung duong lang nhe nhang va cac tuyen dong que nhieu canh dep.", icon: "bike" },
          { id: "motorbike-rental", title: "Thue xe may uy tin o dau tai Phong Nha?", description: "Goi y thuc te de thue xe may an toan va dang tin cay.", icon: "key" },
          { id: "gym", title: "Co phong gym tot o Phong Nha khong?", description: "Noi tap luyen hoac giu thoi quen the thao khi di du lich.", icon: "dumbbell" },
        ],
      },
      {
        id: "practical-help",
        title: "Tien ich thuc te",
        subtitle: "Tien mat, mua sam, suc khoe va nhung nhu cau hang ngay khi o Phong Nha.",
        items: [
          { id: "atm-exchange", title: "Co the rut tien ATM hoac doi tien o dau?", description: "Luu y ve tien mat, doi tien va nhung gi nen chuan bi truoc khi den.", icon: "money" },
          { id: "shopping", title: "Mua do tap hoa, qua luu niem hoac do dung hang ngay o dau?", description: "Nhung diem mua snack, do ca nhan, qua nho va vat dung can thiet.", icon: "shopping" },
          { id: "sick", title: "Neu bi om thi nen lam gi?", description: "Nen hoi ai truoc va chung toi co the ho tro tim cham soc y te nhu the nao.", icon: "health" },
          { id: "pharmacy-clinic-hospital", title: "Nha thuoc, phong kham va benh vien gan nhat o dau?", description: "Cac lua chon y te gan do cho nhu cau nho hoac tinh huong can ho tro gap.", icon: "pill" },
        ],
      },
      {
        id: "travel-planning",
        title: "Chuan bi du lich Viet Nam",
        subtitle: "Thoi tiet, visa, thanh toan, ket noi mang, di chuyen va hanh ly can mang.",
        items: [
          { id: "weather", title: "Thoi tiet o Phong Nha nhu the nao?", description: "Dac diem theo mua de ban chuan bi trang phuc va lich trinh phu hop.", icon: "weather" },
          { id: "rainy-flooding-season", title: "Mua mua va mua lu o Phong Nha la khi nao?", description: "Nhung dieu can biet ve mua mua, an toan va lich trinh linh hoat.", icon: "rain" },
          { id: "visa", title: "Co can visa de den Viet Nam khong?", description: "Nhac nho kiem tra quy dinh visa chinh thuc truoc khi di.", icon: "visa" },
          { id: "travel-to-vietnam", title: "Di chuyen den Viet Nam nhu the nao?", description: "San bay, thanh pho den dau tien va cach noi chuyen ve Phong Nha.", icon: "plane" },
          { id: "sim-esim", title: "Nen dung SIM hoac eSIM nao o Viet Nam?", description: "Lua chon ket noi de dung ban do, nhan tin va dat dich vu tren duong.", icon: "phone" },
          { id: "credit-card", title: "Co the thanh toan bang the tin dung o Phong Nha khong?", description: "Noi co the dung the, noi nen dung tien mat va cach chuan bi.", icon: "card" },
          { id: "getting-around", title: "Di chuyen quanh Phong Nha bang cach nao?", description: "Di bo, xe dap, xe may, taxi va cac dich vu dua don.", icon: "taxi" },
          { id: "packing", title: "Nen chuan bi gi khi den Phong Nha?", description: "Danh sach goi y cho hang dong, song nuoc va nhung ngay di vung que.", icon: "backpack" },
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

import type { Locale } from "@/lib/i18n/config";

export interface CafeMenuItem {
  name: string;
  vi?: string;
  note?: string;
  price: string;
}

export interface CafeMenuCategory {
  id: string;
  group: "food" | "drinks";
  title: string;
  viTitle?: string;
  description?: string;
  items: CafeMenuItem[];
}

export const CAFE_MENU_SCANS = Array.from(
  { length: 13 },
  (_, index) => `/images/cafe/menu/cozy-cafe-menu-${String(index + 1).padStart(2, "0")}.jpg`
);

export const CAFE_PHRASES = [
  ["Hello / Hi", "Xin chao"],
  ["Good morning", "Chao buoi sang"],
  ["Good afternoon", "Chao buoi chieu"],
  ["Good evening", "Chao buoi toi"],
  ["Good night", "Chuc ngu ngon"],
  ["Nice to meet you", "Rat vui duoc gap ban"],
  ["How are you?", "Ban khoe khong?"],
  ["Please can I order?", "Toi co the goi mon khong?"],
  ["I'm vegetarian / vegan", "Toi an chay"],
  ["Can I have the bill?", "Tinh tien"],
  ["Thank you", "Cam on"],
  ["See you again", "Hen gap lai"],
];

export const CAFE_MENU: CafeMenuCategory[] = [
  {
    id: "starters",
    group: "food",
    title: "Starters",
    viTitle: "Mon khai vi",
    items: [
      { name: "Roasted peanuts", vi: "Lac rang", price: "35k" },
      { name: "Prawn crackers", vi: "Phong tom", price: "30k" },
      { name: "French fries", vi: "Khoai tay chien", price: "55k" },
      { name: "Fried spring rolls", vi: "Nem ran", price: "70k" },
      { name: "Fried sausages", vi: "Xuc xich chien", price: "50k / plate" },
    ],
  },
  {
    id: "salads",
    group: "food",
    title: "Salads",
    items: [
      {
        name: "Garden salad",
        vi: "Goi rau cu",
        note: "Cucumber, tomatoes, lettuces, green bell, onion",
        price: "70k",
      },
      {
        name: "Mango & papaya salad",
        vi: "Goi xoai & du du",
        note: "Mango, papaya, tomato, lemon, peanuts, onion, carrot, Vietnamese sauce",
        price: "80k",
      },
      { name: "Mango & papaya salad with shrimp & pork", vi: "Goi xoai du du voi tom thit", price: "100k" },
    ],
  },
  {
    id: "breakfast",
    group: "food",
    title: "Breakfast",
    viTitle: "Menu an sang",
    description: "Served with simple home-style comfort and rooftop views.",
    items: [
      { name: "Fried or scrambled eggs with bread", vi: "Mi trung op la / trung khuay", price: "50k" },
      { name: "Omelette with bread", vi: "Mi trung op let", price: "50k" },
      { name: "Bread / toast with cheese, butter & jam", vi: "Banh mi voi pho mai, bo & mut", price: "50k" },
      { name: "Bread with eggs, bacon / ham & cheese", vi: "Banh mi voi trung, thit xong khoi & pho mai", price: "80k" },
      { name: "Bread with grilled pork / chicken / beef & cheese", vi: "Banh mi voi thit heo / ga / bo & pho mai", price: "80k" },
      { name: "Pancake with banana / pineapple / mango", vi: "Banh kep chuoi / dua / xoai", price: "50k" },
      { name: "Fried noodles with vegetables & tofu", vi: "Mi xao rau", price: "60k" },
      { name: "Fried noodles with pork / chicken / beef", vi: "Mi xao thit lon / ga / bo", price: "90k" },
      { name: "Rice noodle soup with vegetable and/or eggs", vi: "Pho rau voi / hoac trung", price: "50k" },
      { name: "Rice noodle soup with pork / chicken / beef", vi: "Pho voi thit lon / ga / bo", price: "60k" },
      { name: "Plate of mixed seasonal fruit", vi: "Dia trai cay", price: "60k" },
      { name: "Scrambled tofu & vegetables with bread", vi: "Banh mi voi dau phu danh va rau", price: "60k" },
      { name: "Smoothie bowl", note: "Seasonal fruits, muesli, cashew, dried coconut, chia seed", price: "90k" },
      { name: "Full English breakfast", note: "Bacon, fried eggs, mushrooms, beans, toast, grilled tomatoes", price: "100k" },
      { name: "Breakfast extras", note: "Bread 10k, egg or yogurt 15k, cheese/butter/jam 15k, bacon 40k, sausage 40k", price: "from 10k" },
    ],
  },
  {
    id: "vegetarian-vegan",
    group: "food",
    title: "Lunch & Dinner",
    viTitle: "Vegetarian / vegan",
    items: [
      { name: "Fried mixed vegetables + rice", vi: "Rau xao + com", price: "55k" },
      { name: "Boiled mixed vegetables + rice", vi: "Rau luoc + com", price: "55k" },
      { name: "Potato, carrot & pumpkin stew with mushrooms", vi: "Canh ham cu qua", price: "70k" },
      { name: "Tomato soup with eggs", vi: "Sup ca chua voi trung", price: "60k" },
      { name: "Mashed pumpkin soup", vi: "Sup bi do", price: "60k" },
      { name: "Fried tofu", vi: "Dau phu ran", price: "60k" },
      { name: "Fried tofu with tomato sauce", vi: "Dau phu sot ca chua", price: "60k" },
      { name: "Fried eggs with vegetables", vi: "Trung ran", price: "60k" },
      { name: "Fried noodles with vegetables & tofu", vi: "Mi xao rau", price: "60k" },
      { name: "Fried rice with vegetables & tofu", vi: "Com chien rau", price: "60k" },
      { name: "Fried spring rolls", vi: "Nem ran chay", price: "60k" },
      { name: "Fresh spring rolls", vi: "Nem tuoi chay", price: "70k" },
      { name: "Stir fried macaroni with vegetables", vi: "Nui xao", price: "60k" },
      { name: "Steamed rice", vi: "Com trang", price: "30k" },
      { name: "Braised eggplant", vi: "Ca tim kho", price: "65k" },
      { name: "Fried mushrooms with soy sauce", vi: "Nam xao thap cam", price: "75k" },
    ],
  },
  {
    id: "chicken",
    group: "food",
    title: "With Chicken",
    items: [
      { name: "Fried noodles with chicken & vegetables", vi: "Mi ga xao rau", price: "90k" },
      { name: "Fried rice with chicken & vegetables", vi: "Com chien ga rau", price: "90k" },
      { name: "Fried chicken with citronella and rice", vi: "Ga xao sa ot + com", price: "100k" },
      { name: "Chicken curry + bread", vi: "Ga cari + banh mi", price: "120k" },
      { name: "Sweet & sour chicken with rice", vi: "Ga xao chua ngot + com", price: "100k" },
      { name: "Crispy chicken thighs + french fries", vi: "Dui ga chien gion", price: "130k" },
      { name: "Roasted chicken with lemon leaves", vi: "Ga nuong la chanh", price: "350k" },
    ],
  },
  {
    id: "seafood",
    group: "food",
    title: "With Seafoods",
    items: [
      { name: "Fried noodles with seafood", vi: "Mi xao hai san", price: "110k" },
      { name: "Fried rice with seafood", vi: "Com chien hai san", price: "110k" },
    ],
  },
  {
    id: "pork",
    group: "food",
    title: "Local Foods With Pork",
    items: [
      { name: "Fried spring rolls", vi: "Nem ran thit", price: "70k" },
      { name: "Fresh spring rolls", vi: "Nem tuoi thit", price: "80k" },
      { name: "Fried noodles with pork & vegetables", vi: "Mi xao thit heo voi rau", price: "90k" },
      { name: "Fried rice with pork & vegetables", vi: "Com chien thit heo voi rau", price: "90k" },
      { name: "Sweet & sour pork + rice", vi: "Lon xao chua ngot + com", price: "100k" },
      { name: "Crispy pork with rice", vi: "Lon chien gion + com", price: "110k" },
      { name: "Grilled pork skewers with vegetables", vi: "Lon xien nuong rau cu", price: "110k" },
      { name: "BBQ pork + steamed rice", vi: "Lon nuong + com", price: "110k" },
    ],
  },
  {
    id: "beef",
    group: "food",
    title: "With Beef",
    items: [
      { name: "Fried noodles with beef & vegetables", vi: "My xao bo + rau", price: "100k" },
      { name: "Fried rice with beef & vegetables", vi: "Com chien rau + thit bo", price: "100k" },
      { name: "Sweet & sour beef + rice", vi: "Bo xao chua ngot + com", price: "110k" },
    ],
  },
  {
    id: "western-food",
    group: "food",
    title: "Western Food",
    items: [
      { name: "Bologna spaghetti", vi: "My y sot bo bam", price: "130k" },
      { name: "Spaghetti with tomatoes", vi: "My y sot ca chua", price: "100k" },
      { name: "Spaghetti with cream sauce & mushrooms", vi: "My y sot kem nam", price: "130k" },
      { name: "Beef hamburger & chips", vi: "Hamburger bo & khoai tay chien", price: "130k" },
      { name: "Pork hamburger & chips", vi: "Hamburger lon & khoai tay chien", price: "130k" },
      { name: "Bread with grilled chicken & cheese", vi: "Banh mi ga nuong pho mai", price: "80k" },
      { name: "Bread with grilled beef & cheese", vi: "Banh mi bo nuong pho mai", price: "80k" },
      { name: "Bread with grilled pork & cheese", vi: "Banh mi thit heo nuong pho mai", price: "80k" },
      { name: "Bread with bacon / ham, eggs & cheese", vi: "Banh mi sandwich voi trung, thit xong khoi va pho mai", price: "80k" },
    ],
  },
  {
    id: "pizza",
    group: "food",
    title: "Pizza",
    items: [
      { name: "Margarita sauce & cheese", vi: "Pho mai va ca chua", price: "Large 160k" },
      { name: "Margarita + tomato", vi: "Them ca chua", price: "Large 200k" },
      { name: "Margarita + lots of veggies", vi: "Nhieu rau", price: "Large 210k" },
      { name: "Margarita + mushrooms", vi: "Nhieu nam", price: "Large 230k" },
      { name: "Seafood pizza", vi: "Pizza hai san", price: "Large 270k" },
      { name: "Chicken pizza", vi: "Pizza ga", price: "SM 160k / LG 230k" },
      { name: "Cheeseburger pizza", vi: "Pizza bo", price: "SM 160k / LG 230k" },
      { name: "Bacon & cheese", vi: "Thit xong khoi & pho mai", price: "SM 160k / LG 230k" },
      { name: "Ham & cheese", vi: "Thit dam bong", price: "SM 160k / LG 230k" },
      { name: "Hawaiian", vi: "Thit dam bong va dua", price: "SM 160k / LG 230k" },
      { name: "Pepperoni", vi: "Xuc xich y", price: "SM 160k / LG 230k" },
      { name: "The Supreme", note: "3 kinds of meat and 3 cheese with vegetables", price: "Large 270k" },
    ],
  },
  {
    id: "special-local-foods",
    group: "food",
    title: "Special Local Foods",
    description: "Please check availability first. Some dishes need more time and special ingredients.",
    items: [
      { name: "Sizzling pancake rolled with vegetables", vi: "Banh xeo cuon rau", price: "100k / plate" },
      { name: "Charcoal grilled pork on skewers with noodles", vi: "Bun thit nuong", price: "90k / bowl" },
      { name: "Steamed pork dumplings", vi: "Banh sui cao thit", price: "80k / plate" },
      { name: "Steamed shrimp dumplings", vi: "Banh sui cai tom", price: "80k / plate" },
      { name: "Vegetables with dumplings", vi: "Banh sui cao chay", price: "80k / plate" },
      { name: "Clay pot chicken / pork / fish", vi: "Thit heo / ga / ca kho to", price: "120k" },
      { name: "Sizzling beef steak + bread", vi: "Bo ne + banh mi", price: "130k" },
      { name: "Beef luc lac & chips", vi: "Bo luc lac xao + khoai tay chien", price: "130k" },
      { name: "Glazed pork & shrimp", vi: "Thit heo chay canh rang tom", price: "150k" },
      { name: "Sweet & sour spare ribs", vi: "Suon xao chua ngot", price: "150k" },
      { name: "Vietnamese omelet with minced pork", vi: "Trung duc thit heo", price: "100k" },
      { name: "Phong Nha Amur fish cooked with turmeric + rice", vi: "Ca tram kho + com", price: "150k" },
      { name: "Sweet and sour squid", vi: "Muc xao chua ngot", price: "150k" },
      { name: "Beef stew", vi: "Bo kho", price: "155k" },
      { name: "Momma's special pork and egg stew + rice", vi: "Thit kho trung + com", price: "110k" },
      { name: "Steamed squid with ginger", vi: "Muc hap gung", price: "200k" },
      { name: "Fried sweet & sour squid with onion & tomato", vi: "Muc xao chua ngot", price: "150k" },
      { name: "Hot pot", note: "Choice of beef, pork, chicken, seafood, mixed vegetables, mushroom and noodles on side", price: "350k - 500k" },
    ],
  },
  {
    id: "water-soft-drinks",
    group: "drinks",
    title: "Water & Soft Drinks",
    viTitle: "25k / bottle or can",
    items: [
      { name: "Small water", price: "10k" },
      { name: "Big water", price: "20k" },
      { name: "Coke / Coke Light / Diet Coke", price: "25k" },
      { name: "Pepsi / 7Up / Sprite / Fanta Orange / Tonic", price: "25k" },
      { name: "Energy drinks", note: "Lipovitan, Red Bull, White Horse", price: "25k" },
      { name: "Soda water", price: "25k" },
    ],
  },
  {
    id: "tea",
    group: "drinks",
    title: "Tea",
    viTitle: "Hot / iced",
    items: [
      { name: "Green tea", vi: "Tra xanh", price: "30k" },
      { name: "Lemon tea", vi: "Tra chanh", price: "30k" },
      { name: "Lipton tea", vi: "Tra lipton", price: "30k" },
      { name: "Ginger tea", vi: "Tra gung", price: "30k" },
      { name: "Peach tea", vi: "Tra dao", price: "30k" },
      { name: "Litchee tea", vi: "Tra vai", price: "30k" },
      { name: "Strawberry tea", vi: "Tra dau", price: "30k" },
    ],
  },
  {
    id: "juice-sodas",
    group: "drinks",
    title: "Fresh Juice Sodas",
    items: [
      { name: "Passion fruit soda", price: "45k" },
      { name: "Mango soda", price: "45k" },
      { name: "Dragon fruit soda", price: "45k" },
      { name: "Cucumber & mint soda", price: "45k" },
      { name: "Lemon soda", price: "45k" },
    ],
  },
  {
    id: "yogurt",
    group: "drinks",
    title: "Yogurt",
    items: [
      { name: "Passion yogurt", vi: "Yogurt chanh day", price: "40k" },
      { name: "Strawberry yogurt", vi: "Yogurt dau tay", price: "40k" },
      { name: "Blueberry yogurt", vi: "Yogurt viet quat", price: "40k" },
    ],
  },
  {
    id: "fresh-juices",
    group: "drinks",
    title: "Seasonal Fresh Fruit Juices",
    viTitle: "Nuoc ep trai cay theo mua",
    items: [
      { name: "Lemon juice", vi: "Nuoc chanh", price: "30k" },
      { name: "Tomato", vi: "Nuoc ep ca chua", price: "40k" },
      { name: "Carrot", vi: "Nuoc ep ca rot", price: "40k" },
      { name: "Passion fruit", vi: "Chanh day", price: "40k" },
      { name: "Watermelon", vi: "Dua hau", price: "40k" },
      { name: "Pineapple", vi: "Nuoc ep dua", price: "40k" },
      { name: "Orange", vi: "Nuoc cam", price: "40k" },
      { name: "Coconut", vi: "Trai dua tuoi", price: "45k" },
      { name: "Orange & pineapple", vi: "Cam + dua", price: "45k" },
      { name: "Orange & carrot", vi: "Cam + ca rot", price: "45k" },
    ],
  },
  {
    id: "smoothies",
    group: "drinks",
    title: "Fruit Shakes / Smoothies",
    viTitle: "Sinh to xay",
    items: [
      { name: "Banana", vi: "Chuoi xay", price: "40k" },
      { name: "Banana & peanut butter", vi: "Chuoi & bo dau", price: "40k" },
      { name: "Banana & chocolate", vi: "Chuoi & socola", price: "40k" },
      { name: "Mango", vi: "Xoai xay", price: "40k" },
      { name: "Mango & banana", vi: "Xoai + chuoi", price: "40k" },
      { name: "Mango & pineapple", vi: "Xoai + dua", price: "40k" },
      { name: "Mango & yogurt", vi: "Xoai + sua chua", price: "40k" },
      { name: "Dragon fruit", vi: "Thanh long xay", price: "40k" },
      { name: "Mixed seasonal fruit with yogurt", note: "Create your own smoothie with fresh fruits", price: "45k" },
    ],
  },
  {
    id: "coffee",
    group: "drinks",
    title: "Coffee",
    items: [
      { name: "Vietnamese coffee", note: "Black or milk, hot or cold", price: "30k" },
      { name: "Egg coffee", price: "50k" },
      { name: "Salted coffee", price: "50k" },
      { name: "Coconut coffee", price: "50k" },
      { name: "Peanut butter coffee", price: "50k" },
    ],
  },
  {
    id: "beer-cocktail",
    group: "drinks",
    title: "Beer, Cocktail & Others",
    items: [
      { name: "Craft beer brewed in Phong Nha", note: "IPA, wheat, green rice, stout, Thien Duong, blonde", price: "60k" },
      { name: "Saigon can / bottle", price: "25k" },
      { name: "Huda can / bottle", price: "25k" },
      { name: "333 beer can", price: "25k" },
      { name: "Tiger can", price: "30k" },
      { name: "Heineken can", price: "35k" },
      { name: "Strongbow", note: "Apple or berry", price: "40k" },
      { name: "VN rice wine", vi: "Happy water", price: "50k / 0.5l or 100k / 1l" },
      { name: "Gin & tonic", price: "60k" },
      { name: "Mojito", price: "60k" },
      { name: "Passion fruit mojito", price: "70k" },
      { name: "Hot cacao", price: "40k" },
      { name: "Chocolate hot / cold", price: "40k" },
      { name: "Matcha hot / cold", price: "40k" },
      { name: "Matcha latte", price: "40k" },
      { name: "Condensed milk with ginger hot / cold", price: "40k" },
    ],
  },
];

export function getCafeMenuCopy(locale: Locale) {
  const vi = locale === "vi";
  return {
    eyebrow: vi ? "Cozy Cafe Menu" : "Cozy Cafe Menu",
    title: vi ? "Menu đồ ăn & đồ uống" : "Food & Drink Menu",
    subtitle: vi
      ? "Menu được chuyển từ ảnh sang dạng text để khách dễ đọc, dễ tìm món và tham khảo giá trước khi đặt bàn."
      : "A clean text version of our cafe menu so guests can browse dishes, drinks, and prices easily before ordering.",
    all: vi ? "Tất cả" : "All",
    food: vi ? "Đồ ăn" : "Food",
    drinks: vi ? "Đồ uống" : "Drinks",
    search: vi ? "Tìm món, đồ uống hoặc giá..." : "Search dishes, drinks, or prices...",
    noResults: vi ? "Không tìm thấy món phù hợp." : "No matching menu items found.",
    scansTitle: vi ? "Xem ảnh menu gốc" : "Original Menu Scans",
    scansSubtitle: vi
      ? "Ảnh menu gốc được giữ lại để khách đối chiếu khi cần."
      : "Original menu images are kept for guests who want to compare the printed design.",
    phrasesTitle: vi ? "Câu tiếng Việt hữu ích" : "Useful Vietnamese Phrases",
    aboutTitle: vi ? "Về Cozy Cafe" : "About Cozy Cafe",
  };
}

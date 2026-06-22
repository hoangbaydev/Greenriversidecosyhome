import { initializeApp as initializeAdminApp, cert, getApps as getAdminApps } from "firebase-admin/app";
import { getFirestore as getAdminFirestore, FieldValue } from "firebase-admin/firestore";
import { initializeApp as initializeClientApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  doc,
  getFirestore as getClientFirestore,
  serverTimestamp,
  setDoc as clientSetDoc,
} from "firebase/firestore";

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    console.error(`Missing ${name} in .env.local`);
    process.exit(1);
  }
  return value;
}

const projectId = requireEnv("NEXT_PUBLIC_FIREBASE_PROJECT_ID");
const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");
const useAdmin = Boolean(clientEmail && privateKey);

let db;
let updatedAt;
let writeDoc;

if (useAdmin) {
  if (!getAdminApps().length) {
    initializeAdminApp({
      credential: cert({ projectId, clientEmail, privateKey }),
    });
  }

  db = getAdminFirestore();
  updatedAt = FieldValue.serverTimestamp();
  writeDoc = (collection, id, data) => db.collection(collection).doc(id).set(data, { merge: true });
} else {
  const firebaseConfig = {
    apiKey: requireEnv("NEXT_PUBLIC_FIREBASE_API_KEY"),
    authDomain: requireEnv("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"),
    projectId,
    storageBucket: requireEnv("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"),
    messagingSenderId: requireEnv("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"),
    appId: requireEnv("NEXT_PUBLIC_FIREBASE_APP_ID"),
  };
  const app = initializeClientApp(firebaseConfig);
  const auth = getAuth(app);
  db = getClientFirestore(app);
  updatedAt = serverTimestamp();

  const email = process.env.SEED_ADMIN_EMAIL || "admin@greenriversidecosyhome.com";
  const password = process.env.SEED_ADMIN_PASSWORD || "admin123@";
  console.log("Service account env not found. Signing in with Firebase Auth admin user...");
  await signInWithEmailAndPassword(auth, email, password);
  writeDoc = (collection, id, data) => clientSetDoc(doc(db, collection, id), data, { merge: true });
}

const story = {
  en: {
    heroTitle: "Our Story",
    heroSubtitle: "Meet the Family Behind Green Riverside",
    homepagePreviewTitle: "Our Story",
    homepagePreviewSubtitle: "Meet the Family Behind Green Riverside",
    homepagePreviewExcerpt:
      "Nestled between rice fields, limestone mountains, and the peaceful Son River, Green Riverside Cosy Home is more than just a place to stay. It is a place where travellers experience Phong Nha through the eyes of a local family.",
    homepagePreviewCta: "Read our story",
    sectionTitles: {
      founderStory: "Meet Linh",
      familyJourney: "More Than a Hostel",
      philosophy: "Our Philosophy",
      natureFamilyCommunity: "Nature - Family - Community",
      lifeAtGreenRiverside: "Stay - Eat - Explore - Connect",
      timeline: "Our Journey",
    },
    founderStory:
      "My name is Linh, founder and host of Green Riverside. I was born and raised in the countryside of Phong Nha and always dreamed of building something meaningful for my family, my community, and the place I call home. Before opening Green Riverside, I worked as an English teacher, tour guide, travel consultant, and receptionist. These experiences taught me the value of hospitality and inspired me to create a place where travellers feel genuinely welcomed.",
    familyJourney:
      "Today, Green Riverside is more than a hostel. It is a place to stay, eat, explore, and connect. Whether you join a family dinner, watch the sunset from our rooftop cafe, explore the caves of Phong Nha, or simply relax by the river, we hope you feel at home here.",
    philosophy:
      '"Come as our guest, leave as our family." This simple idea guides everything we do. We believe travel is about more than sightseeing. It is about sharing stories, learning from different cultures, building friendships, and creating meaningful connections.',
    natureFamilyCommunity:
      "Nature - Wake up surrounded by rice fields, limestone mountains, and beautiful river views.\n\nFamily - Experience genuine local hospitality from our family-run team.\n\nCommunity - Connect with travellers from around the world through family dinners, social activities, cultural exchanges, and shared adventures.",
    lifeAtGreenRiverside:
      "At Green Riverside you can stay in the heart of nature, eat at Cozy Cafe Rooftop, explore Phong Nha's caves and countryside, and connect with fellow travellers from around the world.",
    timeline: [
      {
        year: "Local roots",
        title: "Born and raised in Phong Nha",
        description: "Linh grew up in the countryside and carries local knowledge into every guest experience.",
      },
      {
        year: "Hospitality",
        title: "Teaching, guiding, consulting",
        description: "Her work as an English teacher, guide, travel consultant, and receptionist shaped Green Riverside's warm service.",
      },
      {
        year: "Today",
        title: "Stay, eat, explore, connect",
        description: "Green Riverside welcomes travellers into a family-run home beside nature.",
      },
    ],
    updatedAt,
  },
  vi: {
    heroTitle: "Câu chuyện của chúng tôi",
    heroSubtitle: "Gặp gỡ gia đình phía sau Green Riverside",
    homepagePreviewTitle: "Câu chuyện của chúng tôi",
    homepagePreviewSubtitle: "Gặp gỡ gia đình phía sau Green Riverside",
    homepagePreviewExcerpt:
      "Nằm giữa cánh đồng lúa, núi đá vôi và dòng sông Son yên bình, Green Riverside Cosy Home không chỉ là nơi lưu trú. Đây là nơi du khách cảm nhận vẻ đẹp Phong Nha qua góc nhìn của một gia đình địa phương.",
    homepagePreviewCta: "Đọc câu chuyện",
    sectionTitles: {
      founderStory: "Gặp gỡ Linh",
      familyJourney: "Hơn cả một hostel",
      philosophy: "Triết lý của chúng tôi",
      natureFamilyCommunity: "Thiên nhiên - Gia đình - Cộng đồng",
      lifeAtGreenRiverside: "Ở lại - Ăn uống - Khám phá - Kết nối",
      timeline: "Hành trình của chúng tôi",
    },
    founderStory:
      "Tôi tên là Linh, người sáng lập và chủ nhà của Green Riverside. Tôi sinh ra và lớn lên ở vùng quê Phong Nha, luôn mong muốn xây dựng điều gì đó ý nghĩa cho gia đình, cộng đồng và quê hương mình. Trước khi mở Green Riverside, tôi từng là giáo viên tiếng Anh, hướng dẫn viên du lịch, tư vấn viên du lịch và lễ tân. Những trải nghiệm đó giúp tôi hiểu giá trị của lòng hiếu khách chân thành.",
    familyJourney:
      "Hôm nay, Green Riverside không chỉ là một hostel. Đây là nơi để ở, ăn uống, khám phá và kết nối. Dù bạn tham gia bữa tối gia đình, ngắm hoàng hôn từ rooftop cafe, khám phá hang động Phong Nha hay chỉ đơn giản là thư giãn bên sông, chúng tôi hy vọng bạn sẽ cảm thấy như ở nhà.",
    philosophy:
      '"Đến như khách, về như người thân." Ý tưởng đơn giản này dẫn dắt mọi điều chúng tôi làm. Du lịch không chỉ là tham quan, mà còn là chia sẻ câu chuyện, học hỏi văn hóa, kết bạn và tạo nên những kết nối ý nghĩa.',
    natureFamilyCommunity:
      "Thiên nhiên - Thức dậy giữa cánh đồng lúa, núi đá vôi và tầm nhìn sông yên bình.\n\nGia đình - Cảm nhận lòng hiếu khách chân thành từ đội ngũ gia đình địa phương.\n\nCộng đồng - Kết nối với du khách từ khắp nơi qua bữa tối gia đình, hoạt động xã hội, giao lưu văn hóa và những chuyến đi chung.",
    lifeAtGreenRiverside:
      "Tại Green Riverside, bạn có thể ở lại trong lòng thiên nhiên, ăn uống tại Cozy Cafe Rooftop, khám phá hang động và đồng quê Phong Nha, đồng thời kết nối với những người bạn mới từ khắp nơi trên thế giới.",
    timeline: [
      {
        year: "Gốc rễ địa phương",
        title: "Sinh ra và lớn lên ở Phong Nha",
        description: "Linh lớn lên giữa vùng quê và mang hiểu biết địa phương vào từng trải nghiệm của khách.",
      },
      {
        year: "Hiếu khách",
        title: "Dạy học, dẫn tour, tư vấn",
        description: "Kinh nghiệm giáo viên, hướng dẫn viên, tư vấn du lịch và lễ tân tạo nên cách phục vụ ấm áp của Green Riverside.",
      },
      {
        year: "Hôm nay",
        title: "Ở lại, ăn uống, khám phá, kết nối",
        description: "Green Riverside chào đón du khách trong một ngôi nhà gia đình gần thiên nhiên.",
      },
    ],
    updatedAt,
  },
};

const cafe = {
  en: {
    title: "Cozy Cafe Rooftop",
    subtitle: "4th Floor - Green Riverside Cosy Home",
    description:
      "Discover Cozy Cafe Rooftop, a peaceful place where simple home-cooked food, fresh drinks, and the beauty of nature come together in the heart of Phong Nha. Surrounded by mountains, river, and rice fields, this is a space where you can slow down, enjoy honest flavors, and experience calm moments above nature.",
    reserveCtaLabel: "View Menu",
    features: [
      {
        title: "Fresh, local ingredients",
        description: "Food is prepared with care, using fresh and locally sourced ingredients whenever possible.",
        icon: "leaf",
      },
      {
        title: "Rooftop social space",
        description: "Games, books, yoga mats, music, and relaxed evenings help guests connect naturally.",
        icon: "users",
      },
      {
        title: "Sunrise to sunset",
        description: "A gentle daily rhythm from quiet morning coffee to sunset drinks and social nights.",
        icon: "coffee",
      },
    ],
    menuCategories: [
      {
        name: "Food",
        items: ["Egg and baguette", "Pancakes with fruit or honey", "Smoothie bowls", "Vietnamese dishes", "Vegetarian options"],
      },
      {
        name: "Coffee & Drinks",
        items: ["Vietnamese drip coffee", "Egg coffee", "Salt coffee", "Coconut coffee", "Fresh juices", "Craft beer", "Sunset cocktails"],
      },
      {
        name: "Rooftop Activities",
        items: ["Table tennis", "Pool", "Foosball", "Yoga mats", "Book exchange", "Game nights", "Karaoke"],
      },
    ],
    images: [],
    updatedAt,
  },
  vi: {
    title: "Cozy Cafe Rooftop",
    subtitle: "Tầng 4 - Green Riverside Cosy Home",
    description:
      "Khám phá Cozy Cafe Rooftop, nơi món ăn nhà nấu đơn giản, đồ uống tươi mát và vẻ đẹp thiên nhiên hòa quyện giữa lòng Phong Nha. Được bao quanh bởi núi, sông và cánh đồng lúa, đây là không gian để bạn chậm lại, thưởng thức hương vị chân thật và tận hưởng những khoảnh khắc bình yên trên cao.",
    reserveCtaLabel: "Xem thực đơn",
    features: [
      {
        title: "Nguyên liệu tươi, địa phương",
        description: "Món ăn được chuẩn bị cẩn thận với nguyên liệu tươi và ưu tiên nguồn địa phương khi có thể.",
        icon: "leaf",
      },
      {
        title: "Không gian rooftop giao lưu",
        description: "Trò chơi, sách, thảm yoga, âm nhạc và buổi tối thân thiện giúp khách kết nối tự nhiên.",
        icon: "users",
      },
      {
        title: "Từ bình minh đến hoàng hôn",
        description: "Nhịp ngày nhẹ nhàng từ cà phê buổi sáng đến đồ uống hoàng hôn và buổi tối giao lưu.",
        icon: "coffee",
      },
    ],
    menuCategories: [
      {
        name: "Food",
        items: ["Trứng và bánh mì", "Pancake với trái cây hoặc mật ong", "Smoothie bowl", "Món Việt", "Món chay"],
      },
      {
        name: "Drinks",
        items: ["Cà phê phin", "Egg coffee", "Salt coffee", "Coconut coffee", "Nước ép", "Craft beer", "Cocktail hoàng hôn"],
      },
      {
        name: "Activities",
        items: ["Bóng bàn", "Bi-a", "Foosball", "Thảm yoga", "Đổi sách", "Game night", "Karaoke"],
      },
    ],
    images: [],
    updatedAt,
  },
};

const pageContent = [
  {
    id: "en_stay",
    data: {
      pageKey: "stay",
      locale: "en",
      heroTitle: "Stay in the Heart of Nature",
      heroSubtitle:
        "Comfortable private rooms and social dorms surrounded by rice fields, limestone mountains, and the peaceful Son River.",
      intro:
        "Whether you are a solo backpacker, a couple, a family, or a group of friends, Green Riverside Cosy Home offers accommodation for every type of traveller. Here, you are not just booking a bed or a room - you are joining a place where travellers stay, eat, explore, and connect.",
      metaTitle: "Stay | Green Riverside Cosy Home",
      metaDescription: "Browse private rooms and dorms in Phong Nha with VND pricing, free breakfast, social activities, and local family hospitality.",
      ctaLabel: "Book Your Stay on WhatsApp",
      labels: { priceFrom: "From", perNight: "/ night", viewDetails: "View details", bookRoom: "Book now" },
      updatedAt,
    },
  },
  {
    id: "vi_stay",
    data: {
      pageKey: "stay",
      locale: "vi",
      heroTitle: "Lưu trú giữa lòng thiên nhiên",
      heroSubtitle:
        "Phòng riêng thoải mái và dorm giao lưu giữa cánh đồng lúa, núi đá vôi và dòng sông Son yên bình.",
      intro:
        "Dù bạn đi một mình, đi cùng người yêu, gia đình hay nhóm bạn, Green Riverside Cosy Home đều có lựa chọn phù hợp. Ở đây, bạn không chỉ đặt một chiếc giường hay căn phòng, mà đang đến với nơi du khách có thể ở lại, ăn uống, khám phá và kết nối.",
      metaTitle: "Lưu trú | Green Riverside Cosy Home",
      metaDescription: "Xem phòng riêng và dorm tại Phong Nha với giá VND, bữa sáng miễn phí, hoạt động giao lưu và lòng hiếu khách gia đình.",
      ctaLabel: "Đặt phòng qua WhatsApp",
      labels: { priceFrom: "Từ", perNight: "/ đêm", viewDetails: "Xem chi tiết", bookRoom: "Đặt ngay" },
      updatedAt,
    },
  },
  {
    id: "en_our-story",
    data: {
      pageKey: "our-story",
      locale: "en",
      heroTitle: story.en.heroTitle,
      heroSubtitle: story.en.heroSubtitle,
      intro: story.en.homepagePreviewExcerpt,
      metaTitle: "Our Story | Green Riverside Cosy Home",
      metaDescription: "Meet Linh and the family behind Green Riverside Cosy Home in Phong Nha.",
      updatedAt,
    },
  },
  {
    id: "vi_our-story",
    data: {
      pageKey: "our-story",
      locale: "vi",
      heroTitle: story.vi.heroTitle,
      heroSubtitle: story.vi.heroSubtitle,
      intro: story.vi.homepagePreviewExcerpt,
      metaTitle: "Câu chuyện | Green Riverside Cosy Home",
      metaDescription: "Gặp gỡ Linh và gia đình phía sau Green Riverside Cosy Home tại Phong Nha.",
      updatedAt,
    },
  },
  {
    id: "en_eat-drink",
    data: {
      pageKey: "eat-drink",
      locale: "en",
      heroTitle: cafe.en.title,
      heroSubtitle: cafe.en.subtitle,
      intro: cafe.en.description,
      metaTitle: "Eat & Drink | Cozy Cafe Rooftop",
      metaDescription: "Home-cooked food, Vietnamese coffee, fresh drinks, rooftop views, and social activities in Phong Nha.",
      ctaLabel: "View Menu",
      updatedAt,
    },
  },
  {
    id: "vi_eat-drink",
    data: {
      pageKey: "eat-drink",
      locale: "vi",
      heroTitle: cafe.vi.title,
      heroSubtitle: cafe.vi.subtitle,
      intro: cafe.vi.description,
      metaTitle: "Ẩm thực | Cozy Cafe Rooftop",
      metaDescription: "Món nhà nấu, cà phê Việt Nam, đồ uống tươi, view rooftop và hoạt động giao lưu tại Phong Nha.",
      ctaLabel: "Xem thực đơn",
      updatedAt,
    },
  },
  {
    id: "en_social-activities",
    data: {
      pageKey: "social-activities",
      locale: "en",
      heroTitle: "Social Activities",
      heroSubtitle: "Family dinner, happy hour, games, culture, and a natural way to meet people.",
      intro: "Guests arrive as strangers and often leave as friends. Every evening has a simple rhythm of shared food, drinks, games, and conversation.",
      metaTitle: "Social Activities | Green Riverside Cosy Home",
      metaDescription: "Weekly social activities at Cozy Cafe Rooftop: family dinner, happy hour, cooking class, games, music bingo, karaoke, and more.",
      ctaLabel: "Join an Activity",
      labels: {
        scheduleTitle: "Weekly Social Program",
        scheduleSubtitle: "A different activity each night, displayed as easy cards instead of one long text block.",
        communityTitle: "A place to connect naturally",
      },
      updatedAt,
    },
  },
  {
    id: "vi_social-activities",
    data: {
      pageKey: "social-activities",
      locale: "vi",
      heroTitle: "Hoạt động giao lưu",
      heroSubtitle: "Bữa tối gia đình, happy hour, trò chơi, văn hóa và cách tự nhiên để gặp bạn mới.",
      intro: "Nhiều khách đến như người lạ và rời đi như bạn bè. Mỗi buổi tối có nhịp điệu nhẹ nhàng của bữa ăn chung, đồ uống, trò chơi và những cuộc trò chuyện.",
      metaTitle: "Hoạt động giao lưu | Green Riverside Cosy Home",
      metaDescription: "Lịch hoạt động hằng tuần tại Cozy Cafe Rooftop: bữa tối gia đình, happy hour, lớp nấu ăn, trò chơi, music bingo, karaoke và nhiều hơn.",
      ctaLabel: "Tham gia hoạt động",
      labels: {
        scheduleTitle: "Lịch hoạt động hằng tuần",
        scheduleSubtitle: "Mỗi tối một hoạt động khác nhau, hiển thị bằng card dễ xem thay vì một khối chữ dài.",
        communityTitle: "Không gian để kết nối tự nhiên",
      },
      updatedAt,
    },
  },
  {
    id: "en_transportation",
    data: {
      pageKey: "transportation",
      locale: "en",
      heroTitle: "Transport",
      heroSubtitle: "Bus tickets, train advice, airport transfers, motorbike rental, Easy Rider, and private cars.",
      intro: "We help you plan how to get to Phong Nha, move around safely, and continue your Vietnam journey with less stress.",
      metaTitle: "Transport | Green Riverside Cosy Home",
      metaDescription: "Transport support in Phong Nha including buses, trains, airport transfers, motorbike rental, Easy Rider, and private cars.",
      updatedAt,
    },
  },
  {
    id: "vi_transportation",
    data: {
      pageKey: "transportation",
      locale: "vi",
      heroTitle: "Di chuyển",
      heroSubtitle: "Vé xe, tư vấn tàu, đưa đón sân bay, thuê xe máy, Easy Rider và xe riêng.",
      intro: "Chúng tôi hỗ trợ bạn đến Phong Nha, di chuyển an toàn trong khu vực và tiếp tục hành trình Việt Nam nhẹ nhàng hơn.",
      metaTitle: "Di chuyển | Green Riverside Cosy Home",
      metaDescription: "Hỗ trợ di chuyển tại Phong Nha gồm xe khách, tàu, đưa đón sân bay, thuê xe máy, Easy Rider và xe riêng.",
      updatedAt,
    },
  },
  {
    id: "en_tours",
    data: {
      pageKey: "tours",
      locale: "en",
      heroTitle: "Tours & Experiences",
      heroSubtitle: "Bong Lai Valley, classic cave tours, and adventure cave expeditions with local advice.",
      intro: "Choose relaxed countryside experiences, classic must-see caves, or deeper adventure cave tours. Ms. Linh can help you compare timing, difficulty, and budget.",
      metaTitle: "Tours | Green Riverside Cosy Home",
      metaDescription: "Bong Lai Valley, classic cave tours, and adventure cave tours in Phong Nha with local support from Green Riverside.",
      ctaLabel: "Ask Ms. Linh for tour advice",
      updatedAt,
    },
  },
  {
    id: "vi_tours",
    data: {
      pageKey: "tours",
      locale: "vi",
      heroTitle: "Tour & trải nghiệm",
      heroSubtitle: "Bong Lai Valley, tour hang động kinh điển và tour hang mạo hiểm với tư vấn địa phương.",
      intro: "Chọn trải nghiệm đồng quê nhẹ nhàng, tour hang động kinh điển hoặc các hành trình mạo hiểm sâu hơn. Cô Linh có thể giúp bạn so sánh thời gian, độ khó và ngân sách.",
      metaTitle: "Tour | Green Riverside Cosy Home",
      metaDescription: "Bong Lai Valley, tour hang động kinh điển và tour hang mạo hiểm tại Phong Nha với hỗ trợ địa phương từ Green Riverside.",
      ctaLabel: "Nhờ cô Linh tư vấn tour",
      updatedAt,
    },
  },
];

const homepageContent = {
  heroTitle: "Green Riverside Cosy Home",
  heroSubtitle:
    "Stay by the Son River, eat on our rooftop, explore Phong Nha, and connect with travellers from around the world.",
  primaryCtaLabel: "Book on WhatsApp",
  primaryCtaMessageType: "book_room",
  secondaryCtaLabel: "View rooms",
  secondaryCtaLink: "/stay",
  whyChooseTitle: "Why Stay With Us",
  whyChooseSubtitle: "Nature, family hospitality, local support, and social energy in one place.",
  whyChooseItems: [],
  sections: {
    accommodation: {
      title: "Accommodation Preview",
      subtitle: "Private rooms and social dorms with the current VND prices.",
      ctaLabel: "View all rooms",
    },
    cafe: {
      title: "Cozy Cafe Rooftop Preview",
      subtitle: "Home-cooked food, Vietnamese coffee, sunset drinks, and a relaxed social space.",
    },
    activities: {
      title: "Social Activities Preview",
      subtitle: "Family dinner, happy hour, games, karaoke, and weekly ways to meet people.",
      ctaLabel: "View schedule",
    },
    tours: {
      title: "Explore Preview",
      subtitle: "Bong Lai Valley, motorbike adventures, classic caves, and adventure cave tours.",
      ctaLabel: "Explore Phong Nha",
    },
    reviews: {
      title: "Guest Reviews",
      subtitle: "Stories from travellers who stayed, ate, explored, and connected with us.",
    },
    contact: {
      title: "Contact",
      subtitle: "Message us for room booking, tours, transport, or local advice.",
      ctaLabel: "Contact us",
    },
  },
  updatedAt,
};

async function setDoc(collection, id, data) {
  await writeDoc(collection, id, data);
  console.log(`Synced ${collection}/${id}`);
}

async function main() {
  await Promise.all([
    setDoc("story_content", "en", story.en),
    setDoc("story_content", "vi", story.vi),
    setDoc("cafe_content", "en", cafe.en),
    setDoc("cafe_content", "vi", cafe.vi),
    setDoc("homepage_content", "main", homepageContent),
    ...pageContent.map((item) => setDoc("page_content", item.id, item.data)),
  ]);

  console.log("\nSite content synced. Rooms, room prices, and room images were not modified.");
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

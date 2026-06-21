import { getTransportation } from "@/lib/data/services";
import { PageHero, PageIntro, Section, SectionHeader } from "@/components/ui/section";
import { EmptyState } from "@/components/ui/empty-state";
import { formatPrice } from "@/lib/utils";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import type { ElementType } from "react";
import {
  Plane,
  Train,
  Bus,
  Car,
  Bike,
  CircleDot,
  ChevronDown,
  Clock,
  MapPin,
  Ticket,
  BadgeCheck,
  CheckCircle2,
  ExternalLink,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Transportation } from "@/types";
import { getPageContext } from "@/lib/i18n/get-dictionary";
import { createLocalizedMetadata, localizedBreadcrumb } from "@/lib/i18n/metadata";
import { resolvePageMeta } from "@/lib/cms/page-meta";
import { resolvePageHero } from "@/lib/cms/page-hero";
import type { Locale } from "@/lib/i18n/config";

type BusOption = {
  time: string;
  type: string;
  price: string;
};

type BusRoute = {
  group: string;
  route: string;
  duration: string;
  pickup: string;
  dropoff: string;
  options: BusOption[];
  notes?: string[];
};

function busRouteMessage(route: BusRoute) {
  const options = route.options
    .map((option) => `- ${option.time}: ${option.type}, ${option.price}`)
    .join("\n");

  return [
    "Hi Green Riverside!",
    `I would like to book the bus route: ${route.route}.`,
    `Duration: ${route.duration}.`,
    `Pick up: ${route.pickup}.`,
    `Drop off: ${route.dropoff}.`,
    "Options I saw on the website:",
    options,
    "Could you please confirm availability, pickup point, and final price?",
  ].join("\n");
}

function routeTimeSummary(route: BusRoute) {
  const times = route.options.map((option) => option.time);
  return times.length > 2 ? `${times.slice(0, 2).join(" | ")} +${times.length - 2}` : times.join(" | ");
}

function routePriceSummary(route: BusRoute) {
  const prices = route.options.flatMap((option) => option.price.match(/\d+/g) ?? []);
  const minPrice = prices.map(Number).filter(Boolean).sort((a, b) => a - b)[0];
  return minPrice ? `${minPrice}K` : route.options[0]?.price ?? "";
}

function optionCount(route: BusRoute) {
  return route.options.length;
}

const BUS_ROUTES: BusRoute[] = [
  {
    group: "To Phong Nha",
    route: "Ha Noi - Phong Nha",
    duration: "7 hours",
    pickup: "70 Nguyen Huu Huan, 459 Tran Khat Chan, 208 Tran Quang Khai",
    dropoff: "Green Riverside Cosy Home",
    options: [
      { time: "7:30; 11:30", type: "VIP Cabin 20 beds (2 rows)", price: "800K" },
      { time: "17:00; 18:00; 19:00; 21:00", type: "VIP Cabin 20 beds (2 rows)", price: "700K" },
      { time: "18:00", type: "VIP 34 beds (3 rows)", price: "550K" },
    ],
  },
  {
    group: "To Phong Nha",
    route: "Ninh Binh - Phong Nha",
    duration: "6 hours",
    pickup: "27/7 Ninh Binh city or Dong Gung Bus Station",
    dropoff: "Hung Thanh Bus Office",
    options: [
      { time: "9:00; 13:00", type: "VIP Cabin 20 beds (2 rows)", price: "750K" },
      { time: "18:30; 19:30; 20:30; 22:30", type: "VIP Cabin 20 beds (2 rows)", price: "650K" },
      { time: "19:30", type: "VIP Cabin 20 beds (2 rows)", price: "500K" },
    ],
  },
  {
    group: "To Phong Nha",
    route: "Hoi An - Phong Nha",
    duration: "7 hours",
    pickup: "97 Nguyen Tat Thanh / 105 Ton Duc Thang",
    dropoff: "Hung Thanh Bus Office",
    options: [
      { time: "6:30; 7:00; 9:00; 11:00; 15:00; 17:00; 20:00; 23:30", type: "VIP Cabin 20 beds (2 rows)", price: "500K" },
      { time: "13:00", type: "VIP 34 beds (3 rows)", price: "450K" },
    ],
  },
  {
    group: "To Phong Nha",
    route: "Da Nang - Phong Nha",
    duration: "6 hours",
    pickup: "79 Nguyen Tuong Pho",
    dropoff: "Hung Thanh Bus Office",
    options: [
      { time: "7:30; 8:00; 10:00; 12:00; 16:00; 18:00; 21:00; 0:30", type: "VIP Cabin 20 beds (2 rows)", price: "450K" },
      { time: "7:30; 9:45; 12:15; 15:20; 17:30; 19:10", type: "VIP 34 beds (3 rows)", price: "370K" },
    ],
  },
  {
    group: "To Phong Nha",
    route: "Hue - Phong Nha",
    duration: "4.5 hours",
    pickup: "Nguyen Hoang Bus Station or No 7 Doi Cung",
    dropoff: "Hung Thanh Bus Office",
    options: [
      { time: "9:00; 9:30; 11:30; 13:30; 17:30; 19:30; 22:30; 2:00", type: "VIP Cabin 20 beds (2 rows)", price: "350K" },
      { time: "8:30; 11:30; 13:30; 16:30; 18:30; 20:30", type: "VIP 34 beds (3 rows)", price: "320K" },
    ],
  },
  {
    group: "To Phong Nha",
    route: "Quy Nhon - Phong Nha",
    duration: "around 13 hours",
    pickup: "Lan Anh hotel",
    dropoff: "Hung Thanh Bus Office",
    options: [{ time: "9:30; 20:30; 21:30", type: "Cabin 20 beds", price: "850K" }],
  },
  {
    group: "To Phong Nha",
    route: "Phu Yen - Phong Nha",
    duration: "15 hours",
    pickup: "Vincom Plaza Tuy Hoa",
    dropoff: "Hung Thanh Bus Office",
    options: [{ time: "11:30; 22:30; 23:30", type: "Cabin 20 beds", price: "880K" }],
  },
  {
    group: "To Phong Nha",
    route: "Nha Trang - Phong Nha",
    duration: "16.5 hours",
    pickup: "Nha Trang Coopmart Supermarket",
    dropoff: "Hung Thanh Bus Office",
    options: [{ time: "13:00; 21:00; 22:00", type: "Cabin 20 beds", price: "950K" }],
  },
  {
    group: "To Phong Nha",
    route: "Da Lat - Phong Nha",
    duration: "19.5 hours",
    pickup: "Da Lat Train Station",
    dropoff: "Hung Thanh Bus Office",
    options: [{ time: "10:00; 18:00; 19:00", type: "Cabin 20 beds", price: "1050K" }],
  },
  {
    group: "From Phong Nha",
    route: "Phong Nha - Quy Nhon",
    duration: "around 13 hours",
    pickup: "Green Riverside Cosy Home",
    dropoff: "Lan Anh hotel",
    options: [{ time: "12:00; 16:00; 17:00; 20:00", type: "Cabin 20 beds", price: "850K" }],
  },
  {
    group: "From Phong Nha",
    route: "Phong Nha - Phu Yen",
    duration: "15 hours",
    pickup: "Green Riverside Cosy Home",
    dropoff: "Vincom Plaza Tuy Hoa",
    options: [{ time: "12:00; 16:00; 17:00; 20:00", type: "Cabin 20 beds", price: "880K" }],
  },
  {
    group: "From Phong Nha",
    route: "Phong Nha - Nha Trang",
    duration: "16.5 hours",
    pickup: "Green Riverside Cosy Home",
    dropoff: "Nha Trang Coopmart Supermarket",
    options: [{ time: "12:00; 16:00; 17:00; 20:00", type: "Cabin 20 beds", price: "950K" }],
  },
  {
    group: "From Phong Nha",
    route: "Phong Nha - Da Lat",
    duration: "19.5 hours",
    pickup: "Green Riverside Cosy Home",
    dropoff: "Da Lat Train Station",
    options: [{ time: "12:00; 16:00; 17:00; 20:00", type: "Cabin 20 beds", price: "1050K" }],
  },
  {
    group: "North connections",
    route: "Phong Nha - Ha Long / Cat Ba",
    duration: "Ha Long 12 hours / Cat Ba 14 hours",
    pickup: "Green Riverside Cosy Home",
    dropoff: "Ha Long or Cat Ba",
    options: [{ time: "20:00 or 23:00", type: "Cabin 20 beds", price: "850K Ha Long / 950K Cat Ba" }],
    notes: ["Direct bus from Phong Nha to Ha Long or Cat Ba."],
  },
  {
    group: "North connections",
    route: "Phong Nha - Ha Noi - Ha Long",
    duration: "7 hours to Ha Noi, then limousine to Ha Long",
    pickup: "Green Riverside Cosy Home",
    dropoff: "Ha Long",
    options: [{ time: "20:00; 22:00; 23:00", type: "Phong Nha to Ha Noi, then Ha Noi to Ha Long limousine at 8:00", price: "400-450K cabin 34 or 550-650K cabin 20 + 350K limousine" }],
  },
  {
    group: "North connections",
    route: "Phong Nha - Ha Noi - Cat Ba",
    duration: "7 hours to Ha Noi, then bus/limousine to Cat Ba",
    pickup: "Green Riverside Cosy Home",
    dropoff: "Cat Ba",
    options: [{ time: "20:00; 22:00; 23:00", type: "Phong Nha to Ha Noi, then 33-seat bus or limousine to Cat Ba", price: "400-450K cabin 34 or 550-650K cabin 20 + 350-400K to Cat Ba" }],
    notes: ["Ha Noi to Cat Ba 33-seat bus: 5:30, 7:30, 10:00, 12:00, 14:00. Limousine: 7:00, 10:00, 14:00."],
  },
  {
    group: "North connections",
    route: "Phong Nha - Ha Noi - Ha Giang",
    duration: "7 hours to Ha Noi, then 6 hours to Ha Giang",
    pickup: "Green Riverside Cosy Home",
    dropoff: "Ha Giang",
    options: [{ time: "20:00; 22:00; 23:00", type: "Phong Nha to Ha Noi, then Ha Noi to Ha Giang", price: "400-450K cabin 34 or 550-650K cabin 20 + 450-650K to Ha Giang" }],
    notes: ["Ha Noi to Ha Giang: 450K 40-bed bus at 11:00, 15:30, 20:00; 650K cabin 20 at 9:00, 11:00, 20:00; 550K limousine at 6:30, 15:30."],
  },
  {
    group: "North connections",
    route: "Phong Nha - Sa Pa",
    duration: "15 hours",
    pickup: "Green Riverside Cosy Home",
    dropoff: "Sa Pa",
    options: [{ time: "21:30 or 23:30", type: "Cabin 20 beds", price: "1150K" }],
    notes: ["Direct bus from Phong Nha to Sa Pa."],
  },
  {
    group: "North connections",
    route: "Phong Nha - Ha Noi - Sa Pa",
    duration: "6 hours to Ha Noi, then 5 hours to Sa Pa",
    pickup: "Green Riverside Cosy Home",
    dropoff: "Sa Pa",
    options: [{ time: "20:00; 22:00; 23:00", type: "Phong Nha to Ha Noi, then Ha Noi to Sa Pa at 6:30 or 22:00", price: "450K cabin 34 or 550K cabin 20 + 450K standard / 550K cabin 20" }],
  },
  {
    group: "North connections",
    route: "Phong Nha - Ninh Binh - Mai Chau / Pu Luong",
    duration: "6 hours to Ninh Binh, then 3.5 hours to Mai Chau",
    pickup: "Green Riverside Cosy Home",
    dropoff: "Mai Chau or Pu Luong",
    options: [{ time: "20:00; 22:00; 23:00", type: "Phong Nha to Ninh Binh, then 33-seat bus to Mai Chau or Pu Luong", price: "400-450K cabin 34 or 550-650K cabin 20 + 480-500K onward bus" }],
    notes: ["Ninh Binh to Pu Luong at 7:00: 480K. Ninh Binh to Mai Chau at 7:00, 12:30 or 16:00: 500K."],
  },
  {
    group: "From Phong Nha",
    route: "Phong Nha - Ninh Binh",
    duration: "around 6 hours",
    pickup: "Green Riverside Cosy Home",
    dropoff: "Ninh Binh: Ben xe Dong Gung (Tam Coc) or 27/7 Ninh Binh city",
    options: [
      { time: "8:30", type: "Cabin 20 beds", price: "550K" },
      { time: "10:30", type: "Cabin 20 beds", price: "600K" },
      { time: "13:30", type: "Cabin 20 beds", price: "700K" },
      { time: "15:30", type: "Cabin 34 beds", price: "450K" },
      { time: "16:00", type: "Cabin 20 beds", price: "600K" },
      { time: "20:00", type: "Cabin 34 beds / Cabin 20 beds", price: "400K / 600K" },
      { time: "22:00", type: "Cabin 34 beds / Cabin 20 beds", price: "450K / 550K" },
      { time: "23:00", type: "Cabin 20 beds", price: "550K" },
      { time: "0:30", type: "Cabin 20 beds", price: "700K" },
      { time: "2:00", type: "Cabin 20 beds", price: "700K" },
    ],
  },
  {
    group: "From Phong Nha",
    route: "Phong Nha - Ha Noi",
    duration: "around 7 hours",
    pickup: "Green Riverside Cosy Home",
    dropoff: "Ha Noi: 208 Tran Quang Khai / 495 Tran Khat Chan or 70 Nguyen Huu Huan",
    options: [
      { time: "8:30", type: "Cabin 20 beds", price: "600K" },
      { time: "13:30", type: "Cabin 20 beds", price: "750K" },
      { time: "15:30", type: "Cabin 34 beds", price: "500K" },
      { time: "20:00", type: "Cabin 34 beds / Cabin 20 beds", price: "400K / 600K" },
      { time: "22:00", type: "Cabin 34 beds / Cabin 20 beds", price: "450K / 550K" },
      { time: "23:00", type: "Cabin 20 beds", price: "550K" },
      { time: "0:30", type: "Cabin 20 beds", price: "700K" },
      { time: "2:00", type: "Cabin 20 beds", price: "700K" },
    ],
  },
  {
    group: "From Phong Nha",
    route: "Phong Nha - Hue",
    duration: "4.5 hours",
    pickup: "Green Riverside Cosy Home",
    dropoff: "Ben xe Nguyen Hoang, 01 Le Duan, Hue city",
    options: [
      { time: "6:30", type: "Cabin 34 beds / Cabin 20 beds", price: "310K / 370K" },
      { time: "8:00", type: "Cabin 20 beds", price: "370K" },
      { time: "9:00", type: "Cabin 34 beds", price: "310K" },
      { time: "10:00", type: "Cabin 20 beds", price: "370K" },
      { time: "11:00", type: "Cabin 34 beds", price: "310K" },
      { time: "12:00", type: "Cabin 20 beds", price: "370K" },
      { time: "13:00", type: "Cabin 20 beds", price: "380K" },
      { time: "15:00", type: "Cabin 34 beds / Cabin 20 beds", price: "310K / 370K" },
      { time: "16:00", type: "Cabin 20 beds", price: "370K" },
      { time: "19:00", type: "Cabin 34 beds", price: "310K" },
      { time: "20:00", type: "Cabin 20 beds", price: "370K" },
      { time: "22:00 or 23:00", type: "Cabin 20 beds", price: "370K" },
    ],
  },
  {
    group: "From Phong Nha",
    route: "Phong Nha - Da Nang",
    duration: "6 hours",
    pickup: "Green Riverside Cosy Home",
    dropoff: "79 Nguyen Tuong Pho for 20-bed bus, or Da Nang central bus station for 34-bed bus",
    options: [
      { time: "6:30", type: "Cabin 34 beds / Cabin 20 beds", price: "360K / 420K" },
      { time: "8:00", type: "Cabin 20 beds", price: "420K" },
      { time: "9:00", type: "Cabin 34 beds", price: "360K" },
      { time: "10:00", type: "Cabin 20 beds", price: "420K" },
      { time: "11:00", type: "Cabin 34 beds", price: "360K" },
      { time: "12:00", type: "Cabin 20 beds", price: "420K" },
      { time: "13:00", type: "Cabin 20 beds", price: "430K" },
      { time: "15:00", type: "Cabin 34 beds / Cabin 20 beds", price: "360K / 420K" },
      { time: "16:00", type: "Cabin 20 beds", price: "420K" },
      { time: "19:00", type: "Cabin 34 beds", price: "360K" },
      { time: "20:00", type: "Cabin 20 beds", price: "420K" },
      { time: "22:00 or 23:00", type: "Cabin 20 beds", price: "420K" },
    ],
  },
  {
    group: "From Phong Nha",
    route: "Phong Nha - Hoi An",
    duration: "7 hours",
    pickup: "Green Riverside Cosy Home",
    dropoff: "97 Nguyen Tat Thanh, Hoi An",
    options: [
      { time: "6:30", type: "Cabin 34 beds / Cabin 20 beds", price: "460K / 470K" },
      { time: "8:00", type: "Cabin 20 beds", price: "470K" },
      { time: "9:00", type: "Cabin 34 beds", price: "460K" },
      { time: "10:00", type: "Cabin 20 beds", price: "470K" },
      { time: "11:00", type: "Cabin 34 beds", price: "460K" },
      { time: "12:00", type: "Cabin 20 beds", price: "470K" },
      { time: "13:00", type: "Cabin 20 beds", price: "480K" },
      { time: "15:00", type: "Cabin 34 beds / Cabin 20 beds", price: "460K / 470K" },
      { time: "16:00", type: "Cabin 20 beds", price: "470K" },
      { time: "19:00", type: "Cabin 34 beds", price: "460K" },
      { time: "20:00", type: "Cabin 20 beds", price: "470K" },
      { time: "22:00 or 23:00", type: "Cabin 20 beds", price: "470K" },
    ],
  },
];

const busScheduleLabels = {
  en: {
    title: "Bus Schedule",
    subtitle: "Popular sleeper bus routes from the latest schedule. Times and seats can change, so please confirm before booking.",
    route: "Route",
    time: "Time",
    type: "Bus type",
    price: "Price",
    pickup: "Pick up",
    dropoff: "Drop off",
    duration: "Duration",
    details: "View details",
    book: "Book this route",
    timeLabel: "Bus time",
    priceLabel: "From",
    options: "Available options",
    option: "option",
    optionsPlural: "options",
    routeCount: "routes",
    quickTitle: "Choose your route, then book on WhatsApp",
    quickText: "Open a route to compare departure times, bus type, pickup point, drop-off point, and price. We will confirm the latest seat availability before booking.",
    groups: {
      "To Phong Nha": "To Phong Nha",
      "From Phong Nha": "From Phong Nha",
      "North connections": "North connections",
    },
    note: "Buses may arrive earlier or be delayed because of traffic, road conditions, or other circumstances.",
    cta: "Book bus ticket",
  },
  vi: {
    title: "Lich xe bus",
    subtitle: "Cac tuyen xe giuong nam pho bien tu lich moi nhat. Gio chay va ghe co the thay doi, vui long xac nhan truoc khi dat ve.",
    route: "Tuyen",
    time: "Gio",
    type: "Loai xe",
    price: "Gia",
    pickup: "Diem don",
    dropoff: "Diem tra",
    duration: "Thoi gian",
    details: "Xem chi tiet",
    book: "Dat tuyen nay",
    timeLabel: "Gio xe",
    priceLabel: "Tu",
    options: "Lua chon co san",
    option: "lua chon",
    optionsPlural: "lua chon",
    routeCount: "tuyen",
    quickTitle: "Chon tuyen roi dat nhanh qua WhatsApp",
    quickText: "Mo tung tuyen de xem gio xe, loai xe, diem don, diem tra va gia. Chung toi se xac nhan lai ghe trong va gia moi nhat truoc khi dat.",
    groups: {
      "To Phong Nha": "Den Phong Nha",
      "From Phong Nha": "Tu Phong Nha",
      "North connections": "Tuyen noi mien Bac",
    },
    note: "Xe co the den som hoac tre do giao thong, tinh trang duong, hoac cac yeu to khac.",
    cta: "Dat ve xe",
  },
} as const;

const serviceLabels = {
  en: {
    route: "Route",
    price: "From",
    help: "We confirm availability, pickup details, and the latest price before booking.",
    ready: "Ready to arrange",
  },
  vi: {
    route: "Tuyen",
    price: "Tu",
    help: "Chung toi se xac nhan lai ghe trong, diem don va gia moi nhat truoc khi dat.",
    ready: "San sang sap xep",
  },
} as const;

const officialGuideLabels = {
  en: {
    eyebrow: "Official travel guide",
    title: "Getting to and from Phong Nha",
    subtitle:
      "Practical advice for buses, trains, and private transfers, with support from Green Riverside Cosy Home before arrival or during your stay.",
    supportTitle: "Personal travel support from Ms. Linh",
    supportText:
      "Ms. Linh, founder and host of Green Riverside Cosy Home, was born and raised in Phong Nha and has more than 30 years of local experience, including tourism and tour operations. She can help you choose suitable transport and plan the next part of your Vietnam journey smoothly.",
    assistance: [
      "Bus bookings, train tickets, and private transfers",
      "Advice on routes, timing, comfort, and reliable providers",
      "Help with changes, cancellations, luggage issues, and communication",
    ],
    disclaimerTitle: "Independent transport providers",
    disclaimer:
      "Transport services operate independently from Green Riverside Cosy Home. We are happy to assist with bookings and recommendations, but delays, schedule changes, cancellations, or provider issues are outside our control.",
    whatsapp: "WhatsApp: +84 778 508 898 (Ms. Linh)",
    trainTitle: "Train travel tips",
    trainText:
      "Travelling by train is comfortable and scenic, but schedules are not always guaranteed. If you plan to join a tour in Phong Nha, arrive at least one day before your tour so you can rest and avoid stress from possible delays.",
    trainExperienceTitle: "Day train or night train",
    trainExperience:
      "A day train to Dong Hoi gives you countryside, village, mountain, and coastal views. Overnight trains save travel time and can help you arrive refreshed.",
    trainBookingTitle: "Train routes and ticket booking",
    trainBooking:
      "You can check schedules, availability, and prices on Vietnam Railways, or ask our team to help book your ticket.",
    trainClassesTitle: "Train classes",
    trainClasses: [
      "Soft seat: air-conditioned reclining seat for shorter daytime trips",
      "6-bed sleeper: budget cabin with three bunk levels",
      "4-bed sleeper: more space and privacy",
      "VIP 2-bed cabin: selected trains only, best privacy and comfort",
    ],
    busTitle: "Bus travel tips",
    busText:
      "Bus travel is one of the most popular and affordable ways to reach Phong Nha, with daily connections from northern, central, and southern Vietnam.",
    busRoutes:
      "Popular origins include Ha Giang, Sa Pa, Ha Long, Cat Ba, Hanoi, Ninh Binh, Mai Chau, Pu Luong, Hue, Da Nang, Hoi An, Quy Nhon, Phu Yen, Nha Trang, Da Lat, and Ho Chi Minh City.",
    busTypesTitle: "Common bus types",
    busTypes: [
      "Limousine vans with VIP 9-11 seats",
      "Standard seated buses",
      "Sleeper buses and cabin buses with 20-34 beds",
    ],
    bookingOptionsTitle: "Booking options",
    bookingOptions: [
      { label: "Vietnam Railways", href: "https://dsvn.vn" },
      { label: "Vexere", href: "https://vexere.com" },
      { label: "12Go Asia", href: "https://12go.asia" },
    ],
    greenSupportTitle: "Why book transport through us",
    greenSupport: [
      "Fair and reasonable prices",
      "Full support for changes, cancellations, or refunds",
      "Fast help with ticket or luggage issues",
      "Reliable and transparent communication",
    ],
    transferTitle: "Dong Hoi transfer",
    transferText:
      "Dong Hoi train station is about 50 km from Phong Nha. Our driver can meet you at the station with a welcome board for easy pickup.",
    transfers: [
      { vehicle: "4-5 seater car", price: "500,000 VND / car" },
      { vehicle: "7 seater car", price: "550,000 VND / car" },
    ],
    guestBenefitsTitle: "Special benefits for our guests",
    guestBenefits: [
      "Free shower and refreshment service before departure or after arrival",
      "Free use of our common area to rest and relax",
      "Direct pickup from Green Riverside Cosy Home, with complimentary shuttle to the main bus station about 2 km away",
    ],
    arrivalTitle: "Arrival in Phong Nha or Dong Hoi",
    arrivalText:
      "Most buses drop off either in Dong Hoi or directly in Phong Nha village. If you arrive in Dong Hoi, we can arrange the private transfer to Green Riverside Cosy Home.",
    adviceTitle: "Travel advice",
    advice: [
      "Book early during peak season",
      "Choose reputable transport providers",
      "Keep valuables with you during travel",
      "Bring a light jacket for air-conditioned vehicles",
    ],
    cta: "Ask Ms. Linh for transport advice",
  },
  vi: {
    eyebrow: "Huong dan di chuyen chinh thuc",
    title: "Di chuyen den va roi Phong Nha",
    subtitle:
      "Thong tin de khach de chon xe bus, tau hoa va xe rieng, kem ho tro tu Green Riverside Cosy Home truoc khi den hoac trong thoi gian luu tru.",
    supportTitle: "Ms. Linh ho tro tu van hanh trinh",
    supportText:
      "Ms. Linh la nguoi sang lap va chu nha Green Riverside Cosy Home, sinh ra va lon len tai Phong Nha, co hon 30 nam kinh nghiem dia phuong va kinh nghiem trong linh vuc du lich, tour. Chi co the giup khach chon phuong tien phu hop va sap xep hanh trinh Viet Nam gon gang hon.",
    assistance: [
      "Ho tro dat ve xe bus, ve tau va xe rieng",
      "Tu van tuyen duong, thoi gian, do thoai mai va nha xe uy tin",
      "Ho tro doi/huy ve, van de hanh ly va giao tiep voi nha xe",
    ],
    disclaimerTitle: "Dich vu van chuyen cua ben thu ba",
    disclaimer:
      "Cac dich vu van chuyen hoat dong doc lap voi Green Riverside Cosy Home. Chung toi san sang ho tro dat ve va tu van, nhung viec tre gio, doi lich, huy chuyen hoac su co tu nha cung cap nam ngoai pham vi kiem soat cua homestay.",
    whatsapp: "WhatsApp: +84 778 508 898 (Ms. Linh)",
    trainTitle: "Luu y khi di tau hoa",
    trainText:
      "Di tau hoa thoai mai va co nhieu canh dep, nhung gio tau khong phai luc nao cung dam bao. Neu khach co tour o Phong Nha, nen den truoc it nhat 1 ngay de nghi ngoi va tranh rui ro tre gio.",
    trainExperienceTitle: "Tau ngay hoac tau dem",
    trainExperience:
      "Tau ngay den Dong Hoi cho khach ngam canh dong que, lang mac, nui va bien. Tau dem giup tiet kiem thoi gian va den noi do met hon.",
    trainBookingTitle: "Kiem tra lich tau va dat ve",
    trainBooking:
      "Khach co the xem lich, cho trong va gia tren Vietnam Railways, hoac nhan Green Riverside ho tro dat ve.",
    trainClassesTitle: "Hang ghe/giuong tren tau",
    trainClasses: [
      "Ghe mem dieu hoa: phu hop chuyen ngan ban ngay",
      "Khoang 6 giuong: tiet kiem, 3 tang giuong",
      "Khoang 4 giuong: rong va rieng tu hon",
      "VIP 2 giuong: chi co tren mot so tau, thoai mai va rieng tu nhat",
    ],
    busTitle: "Luu y khi di xe bus",
    busText:
      "Xe bus la cach pho bien va tiet kiem de den Phong Nha, co nhieu tuyen hang ngay tu mien Bac, mien Trung va mien Nam.",
    busRoutes:
      "Cac tuyen pho bien gom Ha Giang, Sa Pa, Ha Long, Cat Ba, Ha Noi, Ninh Binh, Mai Chau, Pu Luong, Hue, Da Nang, Hoi An, Quy Nhon, Phu Yen, Nha Trang, Da Lat va TP. Ho Chi Minh.",
    busTypesTitle: "Loai xe pho bien",
    busTypes: [
      "Limousine VIP 9-11 ghe",
      "Xe ghe ngoi tieu chuan",
      "Xe giuong nam va cabin bus 20-34 giuong",
    ],
    bookingOptionsTitle: "Kenh dat ve",
    bookingOptions: [
      { label: "Vietnam Railways", href: "https://dsvn.vn" },
      { label: "Vexere", href: "https://vexere.com" },
      { label: "12Go Asia", href: "https://12go.asia" },
    ],
    greenSupportTitle: "Loi ich khi dat qua Green Riverside",
    greenSupport: [
      "Gia hop ly va minh bach",
      "Ho tro doi, huy hoac refund khi co the",
      "Ho tro nhanh neu co van de ve hoac hanh ly",
      "Giao tiep ro rang, dang tin cay",
    ],
    transferTitle: "Xe rieng tu Dong Hoi",
    transferText:
      "Ga Dong Hoi cach Phong Nha khoang 50 km. Tai xe co the don khach o ga voi bang ten de de nhan ra.",
    transfers: [
      { vehicle: "Xe 4-5 cho", price: "500,000 VND / xe" },
      { vehicle: "Xe 7 cho", price: "550,000 VND / xe" },
    ],
    guestBenefitsTitle: "Quyen loi rieng cho khach luu tru",
    guestBenefits: [
      "Tam va refresh mien phi truoc gio di hoac sau khi den",
      "Dung khu sinh hoat chung mien phi de nghi ngoi",
      "Don truc tiep tai Green Riverside Cosy Home, kem shuttle mien phi ra ben xe chinh cach khoang 2 km",
    ],
    arrivalTitle: "Den Phong Nha hoac Dong Hoi",
    arrivalText:
      "Phan lon xe bus tra khach tai Dong Hoi hoac ngay lang Phong Nha. Neu khach den Dong Hoi, chung toi co the sap xep xe rieng ve Green Riverside Cosy Home.",
    adviceTitle: "Loi khuyen di chuyen",
    advice: [
      "Dat som vao mua cao diem",
      "Chon nha xe/nha cung cap uy tin",
      "Giu do gia tri ben minh khi di chuyen",
      "Mang ao khoac mong vi xe co dieu hoa lanh",
    ],
    cta: "Hoi Ms. Linh ve di chuyen",
  },
} as const;

function getTransportTitle(s: Transportation) {
  return s.title || s.name || "";
}
function getTransportPrice(s: Transportation) {
  return s.price ?? s.priceFrom ?? 0;
}

function transportServiceMessage(service: Transportation) {
  const title = getTransportTitle(service);
  const price = getTransportPrice(service);
  return [
    "Hi Green Riverside!",
    `I would like to ask about transportation: ${title}.`,
    service.route ? `Route: ${service.route}.` : null,
    service.shortDescription ? `Short description: ${service.shortDescription}.` : null,
    price > 0 ? `Listed price: ${formatPrice(price, service.currency)}.` : null,
    "Could you please confirm availability, pickup details, and final price?",
  ].filter(Boolean).join("\n");
}

const iconMap: Record<string, ElementType> = {
  plane: Plane, train: Train, bus: Bus, car: Car, bike: Bike, bicycle: CircleDot,
};

function OfficialTransportationGuide({ locale }: { locale: Locale }) {
  const guide = officialGuideLabels[locale] ?? officialGuideLabels.en;
  const adviceMessage = [
    "Hi Ms. Linh and Green Riverside!",
    "I would like help planning transportation for my trip.",
    "Could you please advise the best bus, train, or private transfer option, including timing, pickup point, and price?",
  ].join("\n");
  const stepTitles =
    locale === "vi"
      ? ["Gui lo trinh", "So sanh lua chon", "Di chuyen co ho tro"]
      : ["Tell us your route", "Compare the best option", "Travel with support"];
  const planningSteps = [
    { label: "1", title: stepTitles[0], text: guide.assistance[0] },
    { label: "2", title: stepTitles[1], text: guide.assistance[1] },
    { label: "3", title: stepTitles[2], text: guide.assistance[2] },
  ];

  return (
    <div className="space-y-8">
      <div className="overflow-hidden rounded-lg border border-primary/15 bg-white shadow-sm">
        <div className="grid lg:grid-cols-[1.35fr_0.65fr]">
          <div className="bg-primary p-6 text-white md:p-8">
            <p className="text-eyebrow text-white/75">{guide.eyebrow}</p>
            <h2 className="mt-3 max-w-3xl font-heading text-h2 text-white">{guide.title}</h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/80 md:text-lg">
              {guide.subtitle}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {planningSteps.map((step) => (
                <div key={step.label} className="border border-white/18 bg-white/10 p-4">
                  <span className="flex h-8 w-8 items-center justify-center bg-white text-sm font-bold text-primary">
                    {step.label}
                  </span>
                  <h3 className="mt-3 text-sm font-semibold text-white">{step.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-white/68">{step.text}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="flex flex-col justify-between bg-soft p-6 md:p-8">
            <div>
              <div className="flex h-12 w-12 items-center justify-center bg-white text-primary shadow-sm">
                <BadgeCheck className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-text">{guide.supportTitle}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text/68">{guide.supportText}</p>
            </div>
            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold text-primary">{guide.whatsapp}</p>
              <WhatsAppButton
                messageType="transportation"
                customMessage={adviceMessage}
                label={guide.cta}
                size="sm"
                className="w-full"
              />
            </div>
          </aside>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <section id="train-flight" className="border border-border bg-white p-5 shadow-sm md:p-6">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-primary text-white">
                <Train className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h3 className="text-2xl font-semibold text-text">{guide.trainTitle}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text/68">{guide.trainText}</p>
              </div>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="border-l-4 border-primary bg-soft/55 p-4">
                <h4 className="font-semibold text-text">{guide.trainExperienceTitle}</h4>
                <p className="mt-2 text-sm leading-relaxed text-text/65">{guide.trainExperience}</p>
              </div>
              <div className="border-l-4 border-accent bg-soft/55 p-4">
                <h4 className="font-semibold text-text">{guide.trainBookingTitle}</h4>
                <p className="mt-2 text-sm leading-relaxed text-text/65">{guide.trainBooking}</p>
                <a
                  href="https://dsvn.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                >
                  Vietnam Railways
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
              </div>
            </div>
            <div className="mt-5">
              <h4 className="font-semibold text-text">{guide.trainClassesTitle}</h4>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {guide.trainClasses.map((item) => (
                  <p key={item} className="flex gap-2 text-sm text-text/70">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                    <span>{item}</span>
                  </p>
                ))}
              </div>
            </div>
          </section>

          <section id="private-transfer" className="border border-primary/20 bg-primary p-5 text-white shadow-sm md:p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-white/15">
                <Car className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white">{guide.transferTitle}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{guide.transferText}</p>
              </div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {guide.transfers.map((item) => (
              <div key={item.vehicle} className="bg-white p-4 text-primary-dark">
                <p className="text-sm font-semibold">{item.vehicle}</p>
                <p className="mt-1 text-2xl font-bold text-primary">{item.price}</p>
              </div>
            ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="border border-border bg-white p-5 shadow-sm md:p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-primary text-white">
                <Bus className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-text">{guide.busTitle}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text/68">{guide.busText}</p>
              </div>
            </div>
            <p className="mt-5 border-l-4 border-primary bg-soft/55 p-4 text-sm leading-relaxed text-text/65">
              {guide.busRoutes}
            </p>
            <h4 className="mt-5 font-semibold text-text">{guide.busTypesTitle}</h4>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {guide.busTypes.map((item) => (
                <p key={item} className="flex gap-2 text-sm text-text/70">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <span>{item}</span>
                </p>
              ))}
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="border border-border bg-white p-5 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center bg-primary text-white">
                <Ticket className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-text">{guide.bookingOptionsTitle}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text/65">{guide.greenSupportTitle}</p>
              <div className="mt-4 grid gap-2">
              {guide.bookingOptions.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                    className="flex items-center justify-between border border-border bg-soft/45 px-3 py-2 text-sm font-semibold text-text transition-colors hover:border-primary/25 hover:text-primary"
                >
                  {item.label}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
              ))}
              </div>
            </div>

            <div className="border border-border bg-white p-5 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center bg-primary text-white">
                <ShieldCheck className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-text">{guide.guestBenefitsTitle}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text/65">{guide.arrivalTitle}</p>
              <div className="mt-4 space-y-2">
                {guide.guestBenefits.map((item) => (
                  <p key={item} className="flex gap-2 text-sm text-text/70">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                    <span>{item}</span>
                  </p>
                ))}
              </div>
            </div>
          </section>

          <section className="border border-border bg-white p-5 shadow-sm md:p-6">
            <h3 className="text-xl font-semibold text-text">{guide.greenSupportTitle}</h3>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {guide.greenSupport.map((item) => (
                <p key={item} className="flex gap-2 text-sm text-text/70">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <span>{item}</span>
                </p>
              ))}
            </div>
            <div className="mt-5 border-l-4 border-primary bg-soft/55 p-4">
              <p className="text-sm leading-relaxed text-text/65">{guide.arrivalText}</p>
            </div>
          </section>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="border border-border bg-white p-5 shadow-sm md:p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary text-white">
              <Lightbulb className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-text">{guide.adviceTitle}</h3>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {guide.advice.map((item) => (
                  <p key={item} className="flex gap-2 text-sm text-text/70">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                    <span>{item}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="border border-amber-200 bg-amber-50 p-5 shadow-sm md:p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-amber-500 text-white">
              <ShieldCheck className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-text">{guide.disclaimerTitle}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text/70">{guide.disclaimer}</p>
              <p className="mt-3 text-sm font-semibold text-primary">{guide.whatsapp}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await getPageContext(params);
  const { title, description } = await resolvePageMeta(locale as Locale, "transportation", "/transportation");
  return createLocalizedMetadata(locale, { title, description, path: "/transportation" });
}

export default async function TransportationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale, dict } = await getPageContext(params);
  const loc = locale as Locale;
  const p = dict.pages.transportation;
  const busLabels = busScheduleLabels[loc] ?? busScheduleLabels.en;
  const labels = serviceLabels[loc] ?? serviceLabels.en;
  const [page, services] = await Promise.all([
    resolvePageMeta(loc, "transportation", "/transportation").then((r) => r.page),
    getTransportation(),
  ]);

  const hero = resolvePageHero(page, { title: p.title, subtitle: p.subtitle });
  const busGroups = Array.from(new Set(BUS_ROUTES.map((route) => route.group)));

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          localizedBreadcrumb(locale, [
            { name: dict.nav.home, path: "/" },
            { name: hero.title, path: "/transportation" },
          ])
        )}
      />
      <PageHero title={hero.title} subtitle={hero.subtitle} image={hero.image} />

      <Section>
        {page?.intro ? <PageIntro>{page.intro}</PageIntro> : null}
        <SectionHeader title={p.servicesTitle} subtitle={p.servicesSubtitle} showAccent />
        {services.length === 0 ? (
          <EmptyState message={dict.common.contentNotPublished} />
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => {
              const Icon = iconMap[service.icon] || Car;
              const title = getTransportTitle(service);
              const price = getTransportPrice(service);
              return (
                <Card
                  key={service.id}
                  className="group flex h-full flex-col overflow-hidden rounded-lg border-primary/10 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                >
                  <CardHeader className="border-b border-border bg-soft/45 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-white shadow-sm">
                        <Icon className="h-5.5 w-5.5" aria-hidden />
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full border border-primary/15 bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                        <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
                        {labels.ready}
                      </span>
                    </div>
                    <CardTitle className="mt-4 leading-tight group-hover:text-primary">{title}</CardTitle>
                    <CardDescription className="leading-relaxed">
                      {service.route || service.shortDescription}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col p-5">
                    <p className="text-sm leading-relaxed text-text/70">{service.description}</p>

                    <div className="mt-5 grid gap-2 text-sm">
                      {service.route ? (
                        <div className="flex items-start gap-2 rounded-md border border-border bg-white p-3">
                          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text/45">
                              {labels.route}
                            </p>
                            <p className="mt-0.5 text-text/75">{service.route}</p>
                          </div>
                        </div>
                      ) : null}
                      {price > 0 ? (
                        <div className="flex items-center justify-between rounded-md border border-primary/15 bg-primary/5 p-3">
                          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-primary/75">
                            {labels.price}
                          </span>
                          <span className="font-semibold text-primary">
                            {formatPrice(price, service.currency)}
                          </span>
                        </div>
                      ) : null}
                    </div>

                    <p className="mt-4 text-xs leading-relaxed text-text/55">{labels.help}</p>
                    <WhatsAppButton
                      messageType="transportation"
                      customMessage={transportServiceMessage(service)}
                      label={p.inquire}
                      size="sm"
                      className="mt-5 w-full"
                    />
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </Section>

      <Section background="soft">
        <OfficialTransportationGuide locale={loc} />
      </Section>

      <Section id="bus">
        <SectionHeader title={busLabels.title} subtitle={busLabels.subtitle} showAccent />
        <div className="mb-8 rounded-lg border border-primary/15 bg-white p-5 shadow-sm md:flex md:items-center md:justify-between md:gap-6">
          <div className="flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary text-white">
              <Ticket className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text">{busLabels.quickTitle}</h3>
              <p className="mt-1 max-w-3xl text-sm leading-relaxed text-text/65">{busLabels.quickText}</p>
            </div>
          </div>
          <WhatsAppButton
            messageType="transportation"
            customMessage="Hi Green Riverside! I would like to book a bus ticket. Could you help me choose the best route, confirm the latest schedule, pickup point, and final price?"
            label={busLabels.cta}
            size="sm"
            className="mt-4 shrink-0 md:mt-0"
          />
        </div>
        <div className="space-y-8">
          {busGroups.map((group) => (
            <div key={group}>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-soft text-primary">
                    <Bus className="h-4.5 w-4.5" aria-hidden />
                  </span>
                  <h3 className="text-base font-semibold uppercase tracking-[0.14em] text-text/70">
                    {busLabels.groups[group as keyof typeof busLabels.groups] ?? group}
                  </h3>
                </div>
                <span className="rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold text-text/55">
                  {BUS_ROUTES.filter((item) => item.group === group).length} {busLabels.routeCount}
                </span>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                {BUS_ROUTES.filter((item) => item.group === group).map((item) => (
                  <details
                    key={item.route}
                    className="group overflow-hidden rounded-lg border border-border bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md open:border-primary/35 open:shadow-md"
                  >
                    <summary className="flex cursor-pointer list-none flex-col gap-4 p-5 [&::-webkit-details-marker]:hidden sm:flex-row sm:items-start sm:justify-between">
                      <span className="min-w-0">
                        <span className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                            <Clock className="h-3 w-3" aria-hidden />
                            {busLabels.duration}: {item.duration}
                          </span>
                          <span className="inline-flex rounded-full bg-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-text/55">
                            {optionCount(item)} {optionCount(item) === 1 ? busLabels.option : busLabels.optionsPlural}
                          </span>
                        </span>
                        <span className="mt-3 block text-xl font-semibold leading-tight text-text">{item.route}</span>
                        <span className="mt-3 flex flex-wrap gap-2">
                          <span className="inline-flex items-center rounded-md border border-border bg-soft px-3 py-1.5 text-xs font-semibold text-text/75">
                            {busLabels.timeLabel}: {routeTimeSummary(item)}
                          </span>
                          <span className="inline-flex items-center rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-white">
                            {busLabels.priceLabel} {routePriceSummary(item)}
                          </span>
                        </span>
                      </span>
                      <span className="inline-flex min-h-10 shrink-0 items-center justify-center gap-1 rounded-md border border-border bg-white px-3 text-xs font-semibold text-primary transition-colors group-open:border-primary/30 group-open:bg-primary/5">
                        {busLabels.details}
                        <ChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180" aria-hidden />
                      </span>
                    </summary>

                    <div className="grid gap-3 border-t border-border bg-soft/35 p-5 text-sm md:grid-cols-2">
                      <div className="rounded-md bg-white p-3">
                        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-text/45">
                          <MapPin className="h-3.5 w-3.5" aria-hidden />
                          {busLabels.pickup}
                        </p>
                        <p className="mt-1 text-text/75">{item.pickup}</p>
                      </div>
                      <div className="rounded-md bg-white p-3">
                        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-text/45">
                          <MapPin className="h-3.5 w-3.5" aria-hidden />
                          {busLabels.dropoff}
                        </p>
                        <p className="mt-1 text-text/75">{item.dropoff}</p>
                      </div>
                    </div>

                    <div className="border-t border-border p-5">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text/45">{busLabels.options}</p>
                        <p className="text-xs font-semibold text-primary">
                          {busLabels.priceLabel} {routePriceSummary(item)}
                        </p>
                      </div>
                      <div className="mt-3 overflow-x-auto rounded-md border border-border shadow-sm">
                        <table className="min-w-[520px] w-full text-left text-sm">
                          <thead className="bg-soft text-xs uppercase tracking-[0.12em] text-text/50">
                            <tr>
                              <th scope="col" className="px-3 py-2 font-semibold">{busLabels.time}</th>
                              <th scope="col" className="px-3 py-2 font-semibold">{busLabels.type}</th>
                              <th scope="col" className="px-3 py-2 font-semibold">{busLabels.price}</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border bg-white">
                            {item.options.map((option) => (
                              <tr key={`${item.route}-${option.time}-${option.type}-${option.price}`} className="transition-colors hover:bg-soft/50">
                                <td className="px-3 py-3 font-medium text-text">{option.time}</td>
                                <td className="px-3 py-3 text-text/70">{option.type}</td>
                                <td className="px-3 py-3 font-semibold text-primary">{option.price}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {item.notes?.length ? (
                        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-text/65">
                          {item.notes.map((note) => (
                            <li key={note} className="flex gap-2">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" aria-hidden />
                              <span>{note}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}

                      <WhatsAppButton
                        messageType="transportation"
                        customMessage={busRouteMessage(item)}
                        label={busLabels.book}
                        size="sm"
                        className="mt-5 w-full sm:w-auto"
                      />
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-col gap-3 rounded-lg border border-border bg-soft/50 p-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm leading-relaxed text-text/65">{busLabels.note}</p>
          <WhatsAppButton
            messageType="transportation"
            customMessage="Hi Green Riverside! I would like to book a bus ticket. Could you help me choose the best route, confirm the latest schedule, pickup point, and final price?"
            label={busLabels.cta}
            size="sm"
          />
        </div>
      </Section>
    </>
  );
}

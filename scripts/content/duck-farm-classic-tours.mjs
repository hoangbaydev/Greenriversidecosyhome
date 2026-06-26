const SAMPLE = "/images/samples";

const DUCK_FARM_HIGHLIGHT =
  "Free Duck Tang Farm shuttle option: duck feeding, buffalo riding, fishing, hands-on farming activities, local family visit, and home-cooked food";

const PERSONAL_ESSENTIALS =
  "Personal essentials: camera or smartphone, sunscreen, hat, sunglasses, water, and cash for personal expenses";

function seo(title, description) {
  return {
    seoTitle: `${title} | Green Riverside Cosy Home`,
    seoDescription: description,
  };
}

function baseTour(overrides) {
  return {
    currency: "VND",
    heroLabel: "Classic Phong Nha Tour",
    overviewHeading: "Overview",
    featured: true,
    published: true,
    ctaHeading: "Want To Book This Tour?",
    ctaSubheading: "Message us on WhatsApp for timing, ticket policy, and same-day availability.",
    ctaImage: `${SAMPLE}/mountains.webp`,
    excluded: ["Personal expenses and tips"],
    faq: [
      {
        question: "Can I skip Duck Tang Farm?",
        answer:
          "Yes. You can finish after the cave program, or continue with the free shuttle to Duck Tang Farm and return later.",
      },
      {
        question: "Is vegetarian food available?",
        answer:
          "Yes. Please tell us in advance so the local restaurant or farm can prepare suitable options.",
      },
    ],
    ...overrides,
  };
}

export const DUCK_FARM_CLASSIC_TOURS = [
  baseTour({
    id: "phong-nha-cave-half-day",
    slug: "phong-nha-cave-half-day",
    title: "Half-Day Phong Nha Cave Tour + Free Shuttle to Duck Tang Farm",
    name: "Half-Day Phong Nha Cave Tour + Free Shuttle to Duck Tang Farm",
    shortDescription:
      "Relaxing half-day Son River dragon boat cruise, Phong Nha Cave, and optional free Duck Tang Farm countryside shuttle.",
    description:
      "Cruise along the peaceful Son River and explore Phong Nha Cave, one of the most famous natural wonders in Phong Nha - Ke Bang National Park. After the cave, choose to return to your accommodation or continue by free shuttle to Duck Tang Farm.",
    duration: "Half Day",
    price: 650000,
    priceFrom: 650000,
    priceUsdApprox: 26,
    departure: "2:30 PM",
    returnTime: "4:30 PM cave only, or 7:00 PM with Duck Tang Farm",
    difficulty: "Easy",
    order: 1,
    overviewText:
      "This relaxing half-day tour is ideal for travellers with limited time. Board a traditional dragon boat on the Son River, enjoy limestone mountain views, then enter Phong Nha Cave to see its underground river, limestone formations, Bi Ky Cave, and Royal Court Chamber.\n\nAfter the cave, guests can return to their accommodation or continue with the free shuttle to Duck Tang Farm for duck feeding, buffalo riding, fishing, farming activities, and a home-cooked meal in the countryside.",
    highlights: [
      "Scenic dragon boat cruise on the Son River",
      "Explore Phong Nha Cave with underground river, cave chambers, stalactites, and stalagmites",
      "Visit highlights such as Bi Ky Cave and Royal Court Chamber",
      DUCK_FARM_HIGHLIGHT,
    ],
    whatToBring: ["Comfortable clothing", "Walking shoes or sandals", PERSONAL_ESSENTIALS],
    included: [
      "Round-trip transportation within the Phong Nha area",
      "Dragon boat ticket on the Son River",
      "Phong Nha Cave entrance fee",
      "English-speaking guide",
      "Complimentary round-trip shuttle transfer to Duck Tang Farm",
      "Drinking water",
    ],
    timeline: [
      { time: "2:30 PM", title: "Pick-Up from Accommodation", description: "Transfer to Phong Nha Tourism Centre.", icon: "map-pin" },
      { time: "3:00 PM", title: "Dragon Boat Cruise", description: "Relax on the Son River with views of limestone mountains, villages, and countryside.", icon: "ship" },
      { time: "3:30 PM", title: "Explore Phong Nha Cave", description: "Travel into the cave by boat, then continue on foot to see formations and chambers.", icon: "mountain" },
      { time: "4:30 PM", title: "Tour Ends - Option 1", description: "Return to your accommodation if choosing the cave-only option.", icon: "home" },
      { time: "4:45 PM", title: "Duck Tang Farm - Option 2", description: "Free shuttle to duck feeding, buffalo riding, fishing, farming, and local family activities.", icon: "leaf" },
      { time: "6:30 PM - 7:00 PM", title: "Return Transfer", description: "Meet the shuttle and return to Phong Nha.", icon: "bus" },
    ],
    childDiscountNote: "Children under 1.3 meters are free of charge.",
    images: [`${SAMPLE}/boat.webp`, `${SAMPLE}/cave.webp`],
    galleryImages: [`${SAMPLE}/boat.webp`, `${SAMPLE}/cave.webp`, `${SAMPLE}/river.webp`, `${SAMPLE}/community.webp`],
    ...seo(
      "Half-Day Phong Nha Cave Tour",
      "Half-day Phong Nha Cave tour with Son River dragon boat, cave exploration, guide, transfer, and optional free Duck Tang Farm shuttle."
    ),
  }),

  baseTour({
    id: "dark-cave-half-day",
    slug: "dark-cave-half-day",
    title: "Half-Day Dark Cave Adventure + Free Shuttle to Duck Tang Farm",
    name: "Half-Day Dark Cave Adventure + Free Shuttle to Duck Tang Farm",
    shortDescription:
      "Action-packed half-day Dark Cave tour with zipline, cave swim, mud bath, kayaking, water games, and optional Duck Tang Farm shuttle.",
    description:
      "A fun adventure afternoon at Dark Cave with ziplining, headlamp cave exploration, natural mud bath, swimming, kayaking, and optional free Duck Tang Farm shuttle.",
    duration: "Half Day",
    price: 900000,
    priceFrom: 900000,
    priceUsdApprox: 36,
    departure: "1:00 PM",
    returnTime: "4:30 PM Dark Cave only, or 7:00 PM with Duck Tang Farm",
    difficulty: "Easy to Moderate",
    order: 2,
    overviewText:
      "Dark Cave is one of Phong Nha's most exciting adventure activities. Start with a zipline across the Chay River, swim into the cave, explore with a headlamp, enjoy the famous natural mud bath, then kayak and join water games outside the cave.\n\nAfter the adventure, return to your accommodation or continue with the free Duck Tang Farm shuttle for a countryside experience and home-cooked food.",
    highlights: [
      "Zipline across the Chay River",
      "Swim into Dark Cave and explore by headlamp",
      "Enjoy the natural mud bath inside the cave",
      "Kayaking and water activities after the cave",
      DUCK_FARM_HIGHLIGHT,
    ],
    whatToBring: ["Swimwear", "Towel", "Comfortable clothing", "Water shoes or sandals", PERSONAL_ESSENTIALS],
    included: [
      "Round-trip transportation within the Phong Nha area",
      "Dark Cave entrance fee",
      "Zipline and adventure activities",
      "Kayak rental",
      "Safety equipment",
      "English-speaking guide",
      "Complimentary round-trip shuttle transfer to Duck Tang Farm",
      "Drinking water",
    ],
    timeline: [
      { time: "1:00 PM", title: "Pick-Up from Accommodation", description: "Transfer from Phong Nha to Dark Cave.", icon: "map-pin" },
      { time: "1:30 PM", title: "Dark Cave Adventure", description: "Zipline, cave swim, headlamp exploration, mud bath, kayaking, and water activities.", icon: "waves" },
      { time: "4:30 PM", title: "Tour Ends - Option 1", description: "Return to your accommodation if choosing Dark Cave only.", icon: "home" },
      { time: "4:45 PM", title: "Duck Tang Farm - Option 2", description: "Free shuttle to countryside activities and home-cooked food.", icon: "leaf" },
      { time: "6:30 PM - 7:00 PM", title: "Return Transfer", description: "Return to Phong Nha.", icon: "bus" },
    ],
    childDiscountNote: "Children under 1.3 meters: 150,000 VND per person for Dark Cave ticket only. Zipline requirement: 40-90 kg.",
    images: [`${SAMPLE}/caveAlt.webp`, `${SAMPLE}/river.webp`],
    galleryImages: [`${SAMPLE}/caveAlt.webp`, `${SAMPLE}/river.webp`, `${SAMPLE}/jungle.webp`, `${SAMPLE}/community.webp`],
    ...seo(
      "Half-Day Dark Cave Adventure",
      "Half-day Dark Cave adventure with zipline, mud bath, kayaking, cave swim, guide, transfer, and optional free Duck Tang Farm shuttle."
    ),
  }),

  baseTour({
    id: "botanic-paradise-half-day",
    slug: "botanic-paradise-half-day",
    title: "Half-Day Botanic Garden & Paradise Cave Tour + Free Shuttle to Duck Tang Farm",
    name: "Half-Day Botanic Garden & Paradise Cave Tour + Free Shuttle to Duck Tang Farm",
    shortDescription:
      "Nature and cave half-day tour with Botanic Garden trails, waterfalls, Paradise Cave, lunch, and optional Duck Tang Farm shuttle.",
    description:
      "A half-day combination of Botanic Garden jungle paths and the spectacular dry chambers of Paradise Cave, with optional free Duck Tang Farm shuttle.",
    duration: "Half Day",
    price: 950000,
    priceFrom: 950000,
    priceUsdApprox: 38,
    departure: "8:30 AM",
    returnTime: "4:30 PM cave only, or 7:00 PM with Duck Tang Farm",
    difficulty: "Easy to Moderate",
    order: 3,
    overviewText:
      "Start with a light jungle walk in the Botanic Garden, where forest trails, waterfalls, streams, and local flora create a refreshing nature experience. Continue to Paradise Cave, one of Asia's most spectacular dry caves, known for huge chambers and beautiful limestone formations.\n\nAfter the cave, guests can return to their accommodation or continue to Duck Tang Farm by free shuttle.",
    highlights: [
      "Light jungle walk through Botanic Garden",
      "Waterfalls, streams, tropical forest trails, and local flora",
      "Explore Paradise Cave's massive dry chambers",
      DUCK_FARM_HIGHLIGHT,
    ],
    whatToBring: ["Comfortable clothing", "Walking shoes or sandals with grip", PERSONAL_ESSENTIALS],
    included: [
      "Round-trip transportation within Phong Nha area",
      "Botanic Garden entrance fee",
      "Paradise Cave entrance fee",
      "Electric buggy transfer if applicable",
      "English-speaking guide",
      "Lunch at a local restaurant",
      "Complimentary round-trip shuttle transfer to Duck Tang Farm",
      "Drinking water",
    ],
    timeline: [
      { time: "8:30 AM", title: "Pick-Up from Accommodation", description: "Transfer to Botanic Garden.", icon: "map-pin" },
      { time: "9:00 AM", title: "Botanic Garden Exploration", description: "Light jungle walk through waterfalls, streams, and tropical forest trails.", icon: "leaf" },
      { time: "11:30 AM", title: "Transfer to Paradise Cave", description: "Travel deeper into Phong Nha - Ke Bang National Park.", icon: "bus" },
      { time: "12:00 PM", title: "Lunch Break", description: "Local Vietnamese lunch with vegan or vegetarian options on request.", icon: "utensils" },
      { time: "1:30 PM", title: "Explore Paradise Cave", description: "Walk along wooden pathways through enormous chambers and limestone formations.", icon: "mountain" },
      { time: "4:30 PM", title: "Tour Ends - Option 1", description: "Return to accommodation.", icon: "home" },
      { time: "4:45 PM", title: "Duck Tang Farm - Option 2", description: "Free shuttle to countryside activities and home-cooked food.", icon: "leaf" },
      { time: "6:30 PM - 7:00 PM", title: "Return Transfer", description: "Return to Phong Nha.", icon: "bus" },
    ],
    childDiscountNote: "Paradise Cave ticket policy: under 1.1m free, 1.1m-1.3m 50% of adult ticket.",
    images: [`${SAMPLE}/garden.webp`, `${SAMPLE}/cave.webp`],
    galleryImages: [`${SAMPLE}/garden.webp`, `${SAMPLE}/cave.webp`, `${SAMPLE}/jungle.webp`, `${SAMPLE}/community.webp`],
    ...seo(
      "Botanic Garden & Paradise Cave Half-Day Tour",
      "Half-day Botanic Garden and Paradise Cave tour with lunch, guide, transfer, and optional free Duck Tang Farm shuttle."
    ),
  }),

  baseTour({
    id: "phong-nha-paradise-full-day",
    slug: "phong-nha-paradise-full-day",
    title: "Full-Day Paradise Cave & Phong Nha Cave Tour + Free Shuttle to Duck Tang Farm",
    name: "Full-Day Paradise Cave & Phong Nha Cave Tour + Free Shuttle to Duck Tang Farm",
    shortDescription:
      "Easy full-day two-cave tour with Paradise Cave, Phong Nha Cave, Son River boat, lunch, and optional Duck Tang Farm shuttle.",
    description:
      "A full-day route combining Paradise Cave's dry chambers and Phong Nha Cave's underground river by boat, with optional free Duck Tang Farm shuttle.",
    duration: "Full Day",
    price: 1190000,
    priceFrom: 1190000,
    priceUsdApprox: 48,
    departure: "9:00 AM",
    returnTime: "4:30 PM caves only, or 7:00 PM with Duck Tang Farm",
    difficulty: "Easy",
    order: 4,
    overviewText:
      "Visit two of Phong Nha - Ke Bang National Park's most iconic caves in one easy full-day journey. Begin at Paradise Cave, one of Asia's most beautiful dry caves, then continue to Phong Nha Cave for a scenic Son River boat ride and underground river exploration.\n\nThis tour is a strong choice for guests who want the best classic caves without adventure activities like zipline or mud bath.",
    highlights: [
      "Explore Paradise Cave's spectacular dry chambers",
      "Discover Phong Nha Cave with underground river and limestone formations",
      "Scenic dragon boat ride on the Son River",
      DUCK_FARM_HIGHLIGHT,
    ],
    whatToBring: ["Comfortable clothing", "Walking shoes or sandals with good grip", PERSONAL_ESSENTIALS],
    included: [
      "Round-trip transportation in Phong Nha area",
      "Son River boat trip",
      "Paradise Cave entrance ticket and electric buggy transfer",
      "Phong Nha Cave entrance fee",
      "English-speaking guide",
      "Lunch at a local restaurant",
      "Complimentary round-trip shuttle transfer to Duck Tang Farm",
      "Drinking water",
    ],
    timeline: [
      { time: "9:00 AM", title: "Pick-Up from Accommodation", description: "Transfer to Paradise Cave.", icon: "map-pin" },
      { time: "9:45 AM", title: "Explore Paradise Cave", description: "Walk through vast dry cave chambers and formations.", icon: "mountain" },
      { time: "12:00 PM", title: "Lunch Break", description: "Vietnamese lunch with vegan or vegetarian options on request.", icon: "utensils" },
      { time: "1:30 PM", title: "Explore Phong Nha Cave", description: "Boat trip on Son River and cave exploration by boat and on foot.", icon: "ship" },
      { time: "4:30 PM", title: "Tour Ends - Option 1", description: "Return to accommodation.", icon: "home" },
      { time: "4:45 PM", title: "Duck Tang Farm - Option 2", description: "Free shuttle to countryside activities and home-cooked food.", icon: "leaf" },
      { time: "6:30 PM - 7:00 PM", title: "Return Transfer", description: "Return to Phong Nha.", icon: "bus" },
    ],
    childDiscountNote: "Paradise Cave: under 1.1m free, 1.1m-1.3m 50%. Phong Nha Cave: under 1.3m free.",
    images: [`${SAMPLE}/cave.webp`, `${SAMPLE}/boat.webp`],
    galleryImages: [`${SAMPLE}/cave.webp`, `${SAMPLE}/boat.webp`, `${SAMPLE}/river.webp`, `${SAMPLE}/community.webp`],
    ...seo(
      "Paradise Cave & Phong Nha Cave Full-Day Tour",
      "Full-day Paradise Cave and Phong Nha Cave tour with Son River boat, lunch, guide, transfer, and optional free Duck Tang Farm shuttle."
    ),
  }),

  baseTour({
    id: "paradise-dark-full-day",
    slug: "paradise-dark-full-day",
    title: "Full-Day Paradise Cave & Dark Cave Adventure + Free Shuttle to Duck Tang Farm",
    name: "Full-Day Paradise Cave & Dark Cave Adventure + Free Shuttle to Duck Tang Farm",
    shortDescription:
      "Sightseeing and adventure in one day: Paradise Cave, Dark Cave zipline, mud bath, kayaking, lunch, and optional Duck Tang Farm.",
    description:
      "A full-day mix of Paradise Cave's natural beauty and Dark Cave's adventure activities, including zipline, swimming, mud bath, and kayaking.",
    duration: "Full Day",
    price: 1390000,
    priceFrom: 1390000,
    priceUsdApprox: 56,
    departure: "9:00 AM",
    returnTime: "4:30 PM caves only, or 7:00 PM with Duck Tang Farm",
    difficulty: "Easy to Moderate",
    order: 5,
    overviewText:
      "This is a balanced day for travellers who want both classic cave beauty and adventure. Start with Paradise Cave's impressive dry chambers, then head to Dark Cave for zipline, swimming, headlamp exploration, natural mud bath, kayaking, and water activities.\n\nIt is best for active guests who want more energy than a sightseeing-only tour.",
    highlights: [
      "Explore Paradise Cave, one of Asia's most spectacular dry caves",
      "Dark Cave zipline, swimming, headlamp exploration, mud bath, and kayaking",
      "Lunch at a local restaurant",
      DUCK_FARM_HIGHLIGHT,
    ],
    whatToBring: ["Swimwear", "Towel", "Comfortable clothing", "Water shoes or sandals with good grip", PERSONAL_ESSENTIALS],
    included: [
      "Round-trip transportation in Phong Nha area",
      "Paradise Cave entrance ticket and electric buggy transfer",
      "Dark Cave entrance fee and adventure activities",
      "Zipline, kayak, and safety equipment",
      "English-speaking guide",
      "Lunch at a local restaurant",
      "Complimentary round-trip shuttle transfer to Duck Tang Farm",
      "Drinking water",
    ],
    timeline: [
      { time: "9:00 AM", title: "Pick-Up from Accommodation", description: "Transfer to Paradise Cave.", icon: "map-pin" },
      { time: "9:45 AM", title: "Explore Paradise Cave", description: "Walk through massive dry cave chambers.", icon: "mountain" },
      { time: "12:00 PM", title: "Lunch Break", description: "Vietnamese lunch with vegan or vegetarian options on request.", icon: "utensils" },
      { time: "1:30 PM", title: "Dark Cave Adventure", description: "Zipline, cave swim, headlamp exploration, mud bath, kayaking, and water activities.", icon: "waves" },
      { time: "4:30 PM", title: "Tour Ends - Option 1", description: "Return to accommodation.", icon: "home" },
      { time: "4:45 PM", title: "Duck Tang Farm - Option 2", description: "Free shuttle to countryside activities and home-cooked food.", icon: "leaf" },
      { time: "6:30 PM - 7:00 PM", title: "Return Transfer", description: "Return to Phong Nha.", icon: "bus" },
    ],
    childDiscountNote: "Paradise Cave: under 1.1m free, 1.1m-1.3m 50%. Dark Cave: under 1.3m 150,000 VND ticket only. Zipline requirement: 40-90 kg.",
    images: [`${SAMPLE}/cave.webp`, `${SAMPLE}/river.webp`],
    galleryImages: [`${SAMPLE}/cave.webp`, `${SAMPLE}/river.webp`, `${SAMPLE}/caveAlt.webp`, `${SAMPLE}/community.webp`],
    ...seo(
      "Paradise Cave & Dark Cave Full-Day Tour",
      "Full-day Paradise Cave and Dark Cave adventure with zipline, mud bath, kayaking, lunch, guide, and optional Duck Tang Farm shuttle."
    ),
  }),

  baseTour({
    id: "dark-phong-nha-full-day",
    slug: "dark-phong-nha-full-day",
    title: "Full-Day Dark Cave & Phong Nha Cave Tour + Free Shuttle to Duck Tang Farm",
    name: "Full-Day Dark Cave & Phong Nha Cave Tour + Free Shuttle to Duck Tang Farm",
    shortDescription:
      "Adventure plus river cave: Dark Cave zipline, mud bath, kayaking, Phong Nha Cave boat trip, lunch, and optional Duck Tang Farm.",
    description:
      "Combine the excitement of Dark Cave with the world-famous Phong Nha Cave and Son River boat ride in one full-day experience.",
    duration: "Full Day",
    price: 1390000,
    priceFrom: 1390000,
    priceUsdApprox: 56,
    departure: "9:00 AM",
    returnTime: "4:30 PM caves only, or 7:00 PM with Duck Tang Farm",
    difficulty: "Easy to Moderate",
    order: 6,
    overviewText:
      "Start the day with Dark Cave's zipline, cave swim, headlamp exploration, natural mud bath, kayaking, and water activities. After lunch, continue to Phong Nha Cave for a scenic dragon boat ride on the Son River and underground river cave exploration.\n\nThis tour is good for guests who want both adventure and one of Vietnam's most iconic river caves.",
    highlights: [
      "Dark Cave zipline, swimming, mud bath, kayaking, and cave exploration",
      "Phong Nha Cave underground river and limestone formations",
      "Scenic dragon boat cruise on the Son River",
      DUCK_FARM_HIGHLIGHT,
    ],
    whatToBring: ["Swimwear", "Towel", "Comfortable clothing", "Water shoes or sandals with good grip", PERSONAL_ESSENTIALS],
    included: [
      "Round-trip transportation in Phong Nha area",
      "Dark Cave entrance fee and adventure activities",
      "Zipline, kayak, and safety equipment",
      "Son River boat trip",
      "Phong Nha Cave entrance fee",
      "English-speaking guide",
      "Lunch at a local restaurant",
      "Complimentary round-trip shuttle transfer to Duck Tang Farm",
      "Drinking water",
    ],
    timeline: [
      { time: "9:00 AM", title: "Pick-Up from Accommodation", description: "Transfer to Dark Cave.", icon: "map-pin" },
      { time: "9:30 AM", title: "Dark Cave Adventure", description: "Zipline, cave swim, headlamp exploration, mud bath, kayaking, and water activities.", icon: "waves" },
      { time: "12:00 PM", title: "Lunch Break", description: "Vietnamese lunch with vegan or vegetarian options on request.", icon: "utensils" },
      { time: "1:30 PM", title: "Explore Phong Nha Cave", description: "Dragon boat ride on the Son River and cave exploration.", icon: "ship" },
      { time: "4:30 PM", title: "Tour Ends - Option 1", description: "Return to accommodation.", icon: "home" },
      { time: "4:45 PM", title: "Duck Tang Farm - Option 2", description: "Free shuttle to countryside activities and home-cooked food.", icon: "leaf" },
      { time: "6:30 PM - 7:00 PM", title: "Return Transfer", description: "Return to Phong Nha.", icon: "bus" },
    ],
    childDiscountNote: "Phong Nha Cave: under 1.3m free. Dark Cave: under 1.3m 150,000 VND ticket only. Zipline requirement: 40-90 kg.",
    images: [`${SAMPLE}/caveAlt.webp`, `${SAMPLE}/boat.webp`],
    galleryImages: [`${SAMPLE}/caveAlt.webp`, `${SAMPLE}/boat.webp`, `${SAMPLE}/river.webp`, `${SAMPLE}/community.webp`],
    ...seo(
      "Dark Cave & Phong Nha Cave Full-Day Tour",
      "Full-day Dark Cave and Phong Nha Cave tour with zipline, mud bath, Son River boat, lunch, guide, and optional Duck Tang Farm shuttle."
    ),
  }),

  baseTour({
    id: "botanic-paradise-phong-nha-full-day",
    slug: "botanic-paradise-phong-nha-full-day",
    title: "Full-Day Botanic Garden, Paradise Cave & Phong Nha Cave Tour + Free Shuttle to Duck Tang Farm",
    name: "Full-Day Botanic Garden, Paradise Cave & Phong Nha Cave Tour + Free Shuttle to Duck Tang Farm",
    shortDescription:
      "Easy full-day nature and cave route with Botanic Garden, Paradise Cave, Phong Nha Cave, Son River boat, lunch, and Duck Tang Farm option.",
    description:
      "A complete classic day for guests who want Botanic Garden, Paradise Cave, Phong Nha Cave, and optional Duck Tang Farm countryside experience.",
    duration: "Full Day",
    price: 1290000,
    priceFrom: 1290000,
    priceUsdApprox: 52,
    departure: "8:30 AM",
    returnTime: "4:30 PM caves only, or 7:00 PM with Duck Tang Farm",
    difficulty: "Easy",
    order: 7,
    overviewText:
      "This route combines three popular Phong Nha highlights in one day. Start with Botanic Garden's jungle trails, waterfalls, and rescued wildlife, continue to Paradise Cave's spectacular dry chambers, then finish with Phong Nha Cave and its Son River boat ride.\n\nIt is one of the best choices for guests who want nature, caves, and culture without adventure activities like zipline or mud bath.",
    highlights: [
      "Botanic Garden waterfalls, jungle trails, and rescued wildlife",
      "Paradise Cave's massive dry chambers",
      "Phong Nha Cave underground river and Son River boat ride",
      DUCK_FARM_HIGHLIGHT,
    ],
    whatToBring: ["Comfortable clothing", "Walking shoes or sandals with good grip", PERSONAL_ESSENTIALS],
    included: [
      "Round-trip transportation in Phong Nha area",
      "Botanic Garden entrance fee",
      "Paradise Cave entrance ticket and electric buggy transfer",
      "Son River boat trip",
      "Phong Nha Cave entrance fee",
      "English-speaking guide",
      "Lunch at a local restaurant",
      "Complimentary round-trip shuttle transfer to Duck Tang Farm",
      "Drinking water",
    ],
    timeline: [
      { time: "8:30 AM", title: "Pick-Up from Accommodation", description: "Transfer to Botanic Garden.", icon: "map-pin" },
      { time: "9:00 AM", title: "Explore Botanic Garden", description: "Walk forest trails, waterfalls, and rescued wildlife areas.", icon: "leaf" },
      { time: "10:30 AM", title: "Explore Paradise Cave", description: "Walk inside spectacular dry cave chambers.", icon: "mountain" },
      { time: "12:30 PM", title: "Lunch Break", description: "Vietnamese lunch with vegan or vegetarian options on request.", icon: "utensils" },
      { time: "1:30 PM", title: "Explore Phong Nha Cave", description: "Son River boat ride and underground river cave exploration.", icon: "ship" },
      { time: "4:30 PM", title: "Tour Ends - Option 1", description: "Return to accommodation.", icon: "home" },
      { time: "4:45 PM", title: "Duck Tang Farm - Option 2", description: "Free shuttle to countryside activities and home-cooked food.", icon: "leaf" },
      { time: "6:30 PM - 7:00 PM", title: "Return Transfer", description: "Return to Phong Nha.", icon: "bus" },
    ],
    childDiscountNote: "Paradise Cave: under 1.1m free, 1.1m-1.3m 50%. Phong Nha Cave: under 1.3m free.",
    images: [`${SAMPLE}/garden.webp`, `${SAMPLE}/cave.webp`, `${SAMPLE}/boat.webp`],
    galleryImages: [`${SAMPLE}/garden.webp`, `${SAMPLE}/cave.webp`, `${SAMPLE}/boat.webp`, `${SAMPLE}/community.webp`],
    ...seo(
      "Botanic Garden, Paradise Cave & Phong Nha Cave Tour",
      "Full-day Botanic Garden, Paradise Cave and Phong Nha Cave tour with lunch, Son River boat, guide, and optional Duck Tang Farm shuttle."
    ),
  }),

  baseTour({
    id: "botanic-paradise-dark-full-day",
    slug: "botanic-paradise-dark-full-day",
    title: "Full-Day Botanic Garden, Paradise Cave & Dark Cave Adventure + Free Shuttle to Duck Tang Farm",
    name: "Full-Day Botanic Garden, Paradise Cave & Dark Cave Adventure + Free Shuttle to Duck Tang Farm",
    shortDescription:
      "Nature, dry cave, and adventure combo with Botanic Garden, Paradise Cave, Dark Cave zipline and mud bath, lunch, and Duck Tang Farm option.",
    description:
      "A full-day combination of Botanic Garden nature, Paradise Cave sightseeing, and Dark Cave adventure activities.",
    duration: "Full Day",
    price: 1490000,
    priceFrom: 1490000,
    priceUsdApprox: 60,
    departure: "8:30 AM",
    returnTime: "4:30 PM caves only, or 7:00 PM with Duck Tang Farm",
    difficulty: "Easy to Moderate",
    order: 8,
    overviewText:
      "Begin with Botanic Garden's waterfalls, jungle trails, and rescued wildlife. Continue to Paradise Cave for massive dry cave chambers, then finish with Dark Cave's zipline, swimming, headlamp exploration, mud bath, kayaking, and water activities.\n\nThis is one of the most varied one-day combinations for active guests.",
    highlights: [
      "Botanic Garden waterfalls, jungle trails, and rescued wildlife",
      "Paradise Cave's huge dry chambers and formations",
      "Dark Cave zipline, mud bath, swimming, kayaking, and water games",
      DUCK_FARM_HIGHLIGHT,
    ],
    whatToBring: ["Swimwear", "Towel", "Comfortable clothing", "Water shoes or sandals with good grip", PERSONAL_ESSENTIALS],
    included: [
      "Round-trip transportation in Phong Nha area",
      "Botanic Garden entrance fee",
      "Paradise Cave entrance ticket and electric buggy transfer",
      "Dark Cave entrance fee and adventure activities",
      "Zipline, kayak, and safety equipment",
      "English-speaking guide",
      "Lunch at a local restaurant",
      "Complimentary round-trip shuttle transfer to Duck Tang Farm",
      "Drinking water",
    ],
    timeline: [
      { time: "8:30 AM", title: "Pick-Up from Accommodation", description: "Transfer to Botanic Garden.", icon: "map-pin" },
      { time: "9:00 AM", title: "Explore Botanic Garden", description: "Walk forest trails, waterfalls, and rescued wildlife areas.", icon: "leaf" },
      { time: "10:30 AM", title: "Explore Paradise Cave", description: "Walk inside spectacular dry cave chambers.", icon: "mountain" },
      { time: "12:30 PM", title: "Lunch Break", description: "Vietnamese lunch with vegan or vegetarian options on request.", icon: "utensils" },
      { time: "1:30 PM", title: "Dark Cave Adventure", description: "Zipline, cave swim, mud bath, kayaking, and water activities.", icon: "waves" },
      { time: "4:30 PM", title: "Tour Ends - Option 1", description: "Return to accommodation.", icon: "home" },
      { time: "4:45 PM", title: "Duck Tang Farm - Option 2", description: "Free shuttle to countryside activities and home-cooked food.", icon: "leaf" },
      { time: "6:30 PM - 7:00 PM", title: "Return Transfer", description: "Return to Phong Nha.", icon: "bus" },
    ],
    childDiscountNote: "Paradise Cave: under 1.1m free, 1.1m-1.3m 50%. Dark Cave: under 1.3m 150,000 VND ticket only. Zipline requirement: 40-90 kg.",
    images: [`${SAMPLE}/garden.webp`, `${SAMPLE}/cave.webp`, `${SAMPLE}/river.webp`],
    galleryImages: [`${SAMPLE}/garden.webp`, `${SAMPLE}/cave.webp`, `${SAMPLE}/river.webp`, `${SAMPLE}/community.webp`],
    ...seo(
      "Botanic Garden, Paradise Cave & Dark Cave Tour",
      "Full-day Botanic Garden, Paradise Cave and Dark Cave tour with zipline, mud bath, lunch, guide, and optional Duck Tang Farm shuttle."
    ),
  }),

  baseTour({
    id: "botanic-phong-nha-dark-full-day",
    slug: "botanic-phong-nha-dark-full-day",
    title: "Full-Day Botanic Garden, Dark Cave & Phong Nha Cave Tour + Free Shuttle to Duck Tang Farm",
    name: "Full-Day Botanic Garden, Dark Cave & Phong Nha Cave Tour + Free Shuttle to Duck Tang Farm",
    shortDescription:
      "Jungle, adventure, and river cave combo with Botanic Garden, Dark Cave, Phong Nha Cave, lunch, and Duck Tang Farm option.",
    description:
      "A full-day route combining Botanic Garden nature, Dark Cave adventure, and Phong Nha Cave's underground river by boat.",
    duration: "Full Day",
    price: 1490000,
    priceFrom: 1490000,
    priceUsdApprox: 60,
    departure: "8:30 AM",
    returnTime: "4:30 PM caves only, or 7:00 PM with Duck Tang Farm",
    difficulty: "Easy to Moderate",
    order: 9,
    overviewText:
      "This full-day route gives guests nature, adventure, and a classic river cave in one day. Begin with Botanic Garden's trails and rescued wildlife, continue to Dark Cave for zipline, swimming, mud bath, kayaking, and water activities, then finish with Phong Nha Cave by dragon boat on the Son River.\n\nIt is ideal for active travellers who want both water adventure and Phong Nha's most iconic cave.",
    highlights: [
      "Botanic Garden waterfalls, jungle trails, and rescued wildlife",
      "Dark Cave zipline, mud bath, swimming, kayaking, and cave exploration",
      "Phong Nha Cave underground river and Son River boat ride",
      DUCK_FARM_HIGHLIGHT,
    ],
    whatToBring: ["Swimwear", "Towel", "Comfortable clothing", "Water shoes or sandals with good grip", PERSONAL_ESSENTIALS],
    included: [
      "Round-trip transportation in Phong Nha area",
      "Botanic Garden entrance fee",
      "Dark Cave entrance fee and adventure activities",
      "Zipline, kayak, and safety equipment",
      "Son River boat trip",
      "Phong Nha Cave entrance fee",
      "English-speaking guide",
      "Lunch at a local restaurant",
      "Complimentary round-trip shuttle transfer to Duck Tang Farm",
      "Drinking water",
    ],
    timeline: [
      { time: "8:30 AM", title: "Pick-Up from Accommodation", description: "Transfer to Botanic Garden.", icon: "map-pin" },
      { time: "9:00 AM", title: "Explore Botanic Garden", description: "Walk forest trails, waterfalls, and rescued wildlife areas.", icon: "leaf" },
      { time: "10:30 AM", title: "Dark Cave Adventure", description: "Zipline, cave swim, mud bath, kayaking, and water activities.", icon: "waves" },
      { time: "12:30 PM", title: "Lunch Break", description: "Vietnamese lunch with vegan or vegetarian options on request.", icon: "utensils" },
      { time: "1:30 PM", title: "Explore Phong Nha Cave", description: "Dragon boat ride on the Son River and underground river cave exploration.", icon: "ship" },
      { time: "4:30 PM", title: "Tour Ends - Option 1", description: "Return to accommodation.", icon: "home" },
      { time: "4:45 PM", title: "Duck Tang Farm - Option 2", description: "Free shuttle to countryside activities and home-cooked food.", icon: "leaf" },
      { time: "6:30 PM - 7:00 PM", title: "Return Transfer", description: "Return to Phong Nha.", icon: "bus" },
    ],
    childDiscountNote: "Phong Nha Cave: under 1.3m free. Dark Cave: under 1.3m 150,000 VND ticket only. Zipline requirement: 40-90 kg.",
    images: [`${SAMPLE}/garden.webp`, `${SAMPLE}/river.webp`, `${SAMPLE}/boat.webp`],
    galleryImages: [`${SAMPLE}/garden.webp`, `${SAMPLE}/river.webp`, `${SAMPLE}/boat.webp`, `${SAMPLE}/community.webp`],
    ...seo(
      "Botanic Garden, Dark Cave & Phong Nha Cave Tour",
      "Full-day Botanic Garden, Dark Cave and Phong Nha Cave tour with zipline, mud bath, Son River boat, lunch, and Duck Tang Farm shuttle."
    ),
  }),
];

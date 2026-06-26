const JB = "/images/tours/jungle-boss";
const SAMPLE = "/images/samples";

export const JUNGLE_BOSS_PROVIDED = [
  "English-speaking guide and professional porter team",
  "Transportation for the tour route",
  "Tour equipment such as helmet, headlight, gloves, trekking shoes or sandals, towel, harness, rope, and life jacket when required",
  "Waterproof bag for phone and camera when required",
  "Meals, snacks, drinking water, tea or coffee as listed in the itinerary",
  "Camping tent, sleeping bag, pillow, and air mattress on overnight tours",
  "First aid kit and safety support",
  "Entrance fees included in the selected package",
];

export const JUNGLE_BOSS_WHAT_TO_BRING = [
  "Swimwear",
  "One set of dry clothes for after the tour",
  "Long-sleeved shirt and long trousers for jungle sections",
  "Personal medication if needed",
  "Mosquito repellent, sunscreen, hat, and sunglasses",
  "Small backpack or dry bag for personal items",
  "Do not bring jewelry or valuable accessories",
];

export const JUNGLE_BOSS_POLICY_FAQ = [
  {
    question: "What is the cancellation policy for one-day Jungle Boss tours?",
    answer:
      "100% refund if cancelled 3 days before departure. 50% refund if cancelled 24 hours before departure. No refund for cancellations within 24 hours of departure. Service changes can be requested 3 days before departure, subject to availability.",
  },
  {
    question: "What is the cancellation policy for Jungle Boss tours of two days or more?",
    answer:
      "100% refund if cancelled 7 days before departure. 50% refund if cancelled 3 days before departure. No refund for cancellations within 3 days of departure. Service changes can be requested 7 days before departure, subject to availability.",
  },
  {
    question: "Can the itinerary change?",
    answer:
      "Yes. Jungle Boss guides may change the route, campsite, or activities due to weather, water level, terrain, or group safety.",
  },
  {
    question: "How are cancellation or change requests accepted?",
    answer:
      "Cancellation and service change requests must be sent by email or message to the official tour contact address.",
  },
  {
    question: "What happens if Jungle Boss cancels because of weather or force majeure?",
    answer:
      "Jungle Boss may offer a new departure date, an alternative tour with any price difference adjusted, or a 100% refund of the tour price if the customer does not agree to the options.",
  },
];

const JUNGLE_BOSS_EXCLUDED = [
  "Personal expenses and tips",
  "Travel insurance",
  "Drinks or services not mentioned in the selected package",
];

function policyFaq(extra = []) {
  return [...extra, ...JUNGLE_BOSS_POLICY_FAQ];
}

function seo(title, description) {
  return {
    seoTitle: `${title} | Jungle Boss Phong Nha`,
    seoDescription: description,
  };
}

function baseTour(overrides) {
  return {
    currency: "VND",
    heroLabel: "Jungle Boss Adventure",
    overviewHeading: "Overview",
    included: JUNGLE_BOSS_PROVIDED,
    excluded: JUNGLE_BOSS_EXCLUDED,
    whatToBring: JUNGLE_BOSS_WHAT_TO_BRING,
    featured: false,
    published: true,
    ctaHeading: "Ready For A Real Jungle Adventure?",
    ctaSubheading: "Message us on WhatsApp for availability, fitness advice, and booking support.",
    ctaImage: `${SAMPLE}/jungle.webp`,
    ...overrides,
  };
}

export const JUNGLE_BOSS_TOURS = [
  baseTour({
    id: "wildlife-jungle-trek-1d",
    slug: "wildlife-jungle-trek-1d",
    title: "Wildlife 1 Day & Jungle Trek",
    name: "Wildlife 1 Day & Jungle Trek",
    shortDescription:
      "A conservation-focused jungle day with Wildlife Rescue Centre, Secret Valley trekking, BBQ lunch, Weapon Cave, waterfall, and natural swimming.",
    description:
      "An introductory eco-adventure inside Phong Nha - Ke Bang National Park, combining wildlife conservation, jungle trekking, cave history, BBQ lunch, and a refreshing swim in a natural pool.",
    duration: "1 Day",
    price: 1490000,
    priceFrom: 1490000,
    priceUsdApprox: 60,
    departure: "8:30 AM",
    returnTime: "Approximately 5:00 PM",
    difficulty: "Moderate",
    order: 10,
    overviewText:
      "This is a strong first adventure for guests who want jungle, wildlife, and a manageable full-day itinerary. Travel into Phong Nha - Ke Bang National Park, visit the Wildlife Rescue and Rehabilitation Centre, then trek through tropical forest along the old Secret Route. The day includes BBQ lunch near Weapon Cave, a waterfall walk, and time to swim in a natural pool.\n\nBest for guests with basic fitness who want more than a sightseeing tour but do not want an overnight expedition.",
    highlights: [
      "Visit the Wildlife Rescue and Rehabilitation Centre",
      "Trek 6-8km through jungle and Secret Valley",
      "Learn about conservation work inside the National Park",
      "BBQ lunch in the jungle with vegetarian options",
      "Visit Weapon Cave and Secret Cave",
      "Swim in a natural pool near the waterfall",
    ],
    timeline: [
      { time: "08:30", title: "Pick-up in Phong Nha", description: "Transfer from accommodation to the tour office for briefing.", icon: "bus" },
      { time: "09:15", title: "Wildlife Rescue Centre", description: "See conservation work and rescued wildlife in the National Park.", icon: "leaf" },
      { time: "10:30", title: "Secret Valley Trek", description: "Trek through Botanical Garden forest trails toward Secret Valley.", icon: "footprints" },
      { time: "12:45", title: "BBQ Lunch", description: "Relax with lunch, tea or coffee, and jungle scenery.", icon: "utensils" },
      { time: "14:00", title: "Weapon Cave & Secret Cave", description: "Visit wartime cave sites and learn their local history.", icon: "landmark" },
      { time: "15:30", title: "Natural Swimming Hole", description: "Swim and cool down before the final walk.", icon: "waves" },
      { time: "17:00", title: "Return To Hotel", description: "Transfer back to Phong Nha.", icon: "home" },
    ],
    childDiscountNote: "Minimum 2 guests. Children 7-10 years old may join at child rate when suitable.",
    faq: policyFaq([
      {
        question: "Who is this tour best for?",
        answer:
          "Guests who exercise occasionally and are comfortable with a 6-8km jungle trek, uneven paths, and swimming.",
      },
    ]),
    images: [`${SAMPLE}/jungle.webp`],
    galleryImages: [`${SAMPLE}/jungle.webp`, `${SAMPLE}/garden.webp`, `${SAMPLE}/cave.webp`],
    ...seo(
      "Wildlife 1 Day & Jungle Trek",
      "Visit Wildlife Rescue Centre, trek Secret Valley, enjoy BBQ lunch, Weapon Cave, waterfall, and natural swimming in Phong Nha."
    ),
  }),

  baseTour({
    id: "tra-ang-excursion-1d",
    slug: "tra-ang-excursion-1d",
    title: "Tra Ang Excursion 1 Day",
    name: "Tra Ang Excursion 1 Day",
    shortDescription:
      "Easy jungle and river adventure with Tra Ang Cave, forest walk, swimming, BBQ lunch, and relaxed outdoor time.",
    description:
      "A gentle one-day adventure for guests who want jungle, river, cave swimming, and local food without a difficult trek.",
    duration: "1 Day",
    price: 800000,
    priceFrom: 800000,
    priceUsdApprox: 32,
    departure: "8:00 AM",
    returnTime: "Approximately 3:30 PM",
    difficulty: "Easy",
    order: 11,
    overviewText:
      "Tra Ang is one of the easiest Jungle Boss experiences and a good choice for families, first-time adventurers, or guests who want a relaxed day in nature. The route combines forest walking, swimming, a cave visit, and a BBQ lunch beside the water.\n\nIt is still an outdoor tour, so guests should be comfortable walking on natural trails and getting wet.",
    highlights: [
      "Easy forest walk in Phong Nha - Ke Bang National Park",
      "Swim and explore Tra Ang Cave",
      "Relaxed outdoor BBQ lunch",
      "Good option for families and first-time cave guests",
      "Lower physical demand than the longer Jungle Boss treks",
    ],
    timeline: [
      { time: "08:00", title: "Pick-up & Briefing", description: "Meet the guide, prepare equipment, and transfer into the National Park.", icon: "bus" },
      { time: "09:30", title: "Forest Walk", description: "Walk through jungle trails toward Tra Ang area.", icon: "footprints" },
      { time: "10:30", title: "Tra Ang Cave", description: "Swim and explore the cave with safety equipment.", icon: "waves" },
      { time: "12:00", title: "BBQ Lunch", description: "Enjoy lunch and rest beside the stream.", icon: "utensils" },
      { time: "14:00", title: "Return Walk", description: "Walk back through the forest at an easy pace.", icon: "route" },
      { time: "15:30", title: "Back To Phong Nha", description: "Transfer back to town.", icon: "home" },
    ],
    childDiscountNote: "Suitable for many guests from around 8 to 65 years old, depending on swimming confidence and health.",
    faq: policyFaq([
      {
        question: "Is Tra Ang suitable for beginners?",
        answer:
          "Yes. It is one of the easier Jungle Boss cave experiences, though guests should still be comfortable walking outdoors and swimming with a life jacket.",
      },
    ]),
    images: [`${SAMPLE}/river.webp`],
    galleryImages: [`${SAMPLE}/river.webp`, `${SAMPLE}/jungle.webp`, `${SAMPLE}/caveAlt.webp`],
    ...seo(
      "Tra Ang Excursion 1 Day",
      "Easy Tra Ang one-day jungle and cave tour with forest walk, cave swimming, BBQ lunch, and transfer from Phong Nha."
    ),
  }),

  baseTour({
    id: "abandoned-valley-e-cave-1d",
    slug: "abandoned-valley-e-cave-1d",
    title: "Abandoned Valley & E Cave 1 Day",
    name: "Abandoned Valley & E Cave 1 Day",
    shortDescription:
      "Moderate one-day trek to E Cave with turquoise water, SUP or swimming, outdoor activities, snack break, and sticker gift.",
    description:
      "A beautiful one-day Abandoned Valley route focused on E Cave, turquoise water, jungle trekking, SUP or swimming, and relaxed outdoor activities.",
    duration: "1 Day",
    price: 1750000,
    priceFrom: 1750000,
    priceUsdApprox: 70,
    departure: "8:00 AM",
    returnTime: "5:30 PM",
    difficulty: "Moderate",
    order: 12,
    overviewText:
      "This route is one of the clearest choices for guests who want a real jungle and cave day without sleeping overnight. Trek through Abandoned Valley from Km19 on the West Ho Chi Minh Trail, cross karst terrain, and reach E Cave, known for its clear turquoise water.\n\nGuests swim or paddle SUP inside the cave, enjoy lunch and outdoor games, then trek back in the afternoon. It is active but not as demanding as the multi-day expeditions.",
    highlights: [
      "Explore Abandoned Valley and E Cave in one day",
      "7.5km total distance with around 5km forest trekking",
      "Swim or paddle SUP 2-3km in E Cave",
      "Turquoise cave water and karst scenery",
      "Outdoor activities such as SUP, snorkeling, and water volleyball",
      "Suitable for active guests who exercise regularly 2-3 times per week",
    ],
    timeline: [
      { time: "08:00", title: "Pick-up in Phong Nha", description: "Transfer to the operations house for briefing and equipment preparation.", icon: "bus" },
      { time: "09:30", title: "Start Abandoned Valley Trek", description: "Begin at Km19 and walk through jungle, rocky terrain, and bamboo forest.", icon: "footprints" },
      { time: "11:00", title: "Explore E Cave", description: "Swim and paddle SUP through clear turquoise water inside E Cave.", icon: "waves" },
      { time: "12:00", title: "Lunch", description: "Lunch near the cave area.", icon: "utensils" },
      { time: "13:00", title: "Outdoor Activities", description: "SUP, snorkeling, water volleyball, and free time at the cave entrance.", icon: "waves" },
      { time: "15:00", title: "Snack Break", description: "Seasonal fruit, nuts, yogurt, tea, or coffee.", icon: "coffee" },
      { time: "15:30", title: "Trek Back", description: "Return 2.5km to the pick-up point.", icon: "route" },
      { time: "17:30", title: "Complete The Journey", description: "Return to Phong Nha.", icon: "home" },
    ],
    childDiscountNote:
      "Adventure level: Moderate. Total distance: 7.5km. Total travel time: about 7 hours. Age guideline: 5-65 years old.",
    faq: policyFaq([
      {
        question: "How hard is the E Cave one-day tour?",
        answer:
          "Moderate. Expect forest trekking, karst terrain, swimming or SUP, and a full active day. It suits guests who exercise regularly.",
      },
      {
        question: "Do I need to swim?",
        answer:
          "You should be comfortable in water. Life jackets and safety equipment are provided.",
      },
    ]),
    images: [`${JB}/abandoned-valley-e-cave-1d.jpg`],
    overviewImage: `${JB}/abandoned-valley-e-cave-1d.jpg`,
    galleryImages: [`${JB}/abandoned-valley-e-cave-1d.jpg`, `${SAMPLE}/jungle.webp`, `${SAMPLE}/cave.webp`],
    ...seo(
      "Abandoned Valley & E Cave 1 Day",
      "One-day Abandoned Valley and E Cave tour with jungle trekking, turquoise cave water, SUP or swimming, lunch, and Phong Nha transfer."
    ),
  }),

  baseTour({
    id: "elephant-cave-mada-valley-1d",
    slug: "elephant-cave-mada-valley-1d",
    title: "Elephant Cave & Ma Da Valley Jungle Trek",
    name: "Elephant Cave & Ma Da Valley Jungle Trek",
    shortDescription:
      "Moderate one-day Jungle Boss trek combining Elephant Cave, Ma Da Valley, jungle trails, swimming, and BBQ lunch.",
    description:
      "A full-day jungle trek through Ma Da Valley with Elephant Cave exploration, swimming, and a picnic-style jungle lunch.",
    duration: "1 Day",
    price: 1950000,
    priceFrom: 1950000,
    priceUsdApprox: 78,
    departure: "8:00 AM",
    returnTime: "Approximately 5:00 PM",
    difficulty: "Moderate",
    order: 13,
    overviewText:
      "This is a classic Jungle Boss one-day adventure for guests who want a stronger trek than Tra Ang but still prefer to return the same day. The route combines forest trails, Elephant Cave, Ma Da Valley, swimming, and a meal in the jungle.\n\nIt is a good middle option between easy cave excursions and the overnight expeditions.",
    highlights: [
      "Visit Elephant Cave, one of the impressive cave entrances in the area",
      "Trek through Ma Da Valley jungle trails",
      "Swim in natural water when conditions allow",
      "BBQ-style lunch in the jungle",
      "Good moderate option before trying overnight expeditions",
    ],
    timeline: [
      { time: "08:00", title: "Pick-up & Briefing", description: "Meet the guide, prepare equipment, and transfer into the National Park.", icon: "bus" },
      { time: "09:30", title: "Elephant Cave", description: "Explore the cave entrance and learn about the karst landscape.", icon: "mountain" },
      { time: "11:00", title: "Ma Da Valley Trek", description: "Continue through jungle trails and stream areas.", icon: "footprints" },
      { time: "12:30", title: "Jungle Lunch", description: "Lunch and rest in the valley.", icon: "utensils" },
      { time: "14:00", title: "Swimming & Nature Time", description: "Swim or relax in the valley depending on conditions.", icon: "waves" },
      { time: "16:00", title: "Return Trek", description: "Walk back to the pick-up point.", icon: "route" },
      { time: "17:00", title: "Back To Phong Nha", description: "Transfer back to town.", icon: "home" },
    ],
    childDiscountNote: "Moderate adventure. Best for guests with normal fitness and confidence walking on uneven jungle trails.",
    faq: policyFaq([
      {
        question: "Is this harder than Tra Ang?",
        answer:
          "Yes. Elephant Cave & Ma Da Valley is more active, with more trekking and rougher jungle terrain.",
      },
    ]),
    images: [`${SAMPLE}/jungle.webp`],
    galleryImages: [`${SAMPLE}/jungle.webp`, `${SAMPLE}/cave.webp`, `${SAMPLE}/river.webp`],
    ...seo(
      "Elephant Cave & Ma Da Valley Jungle Trek",
      "One-day Elephant Cave and Ma Da Valley Jungle Boss tour with trekking, cave exploration, swimming, lunch, and Phong Nha transfer."
    ),
  }),

  baseTour({
    id: "ruc-mon-adventure-1d",
    slug: "ruc-mon-adventure-1d",
    title: "Ruc Mon Cave 1 Day Adventure",
    name: "Ruc Mon Cave 1 Day Adventure",
    shortDescription:
      "Medium-difficulty cave adventure with Da Deo Pass views, minority village, jungle trek, Ruc Mon Cave, ladder descent, swimming, and BBQ lunch.",
    description:
      "A challenging one-day cave route near the Vietnam-Laos border, mixing jungle trekking, Ruc Mon Cave, ladder sections, swimming, and local BBQ lunch.",
    duration: "1 Day",
    price: 1850000,
    priceFrom: 1850000,
    priceUsdApprox: 74,
    departure: "7:30 AM - 8:00 AM",
    returnTime: "5:30 PM - 6:30 PM",
    difficulty: "Medium difficulty",
    order: 14,
    overviewText:
      "Ruc Mon Cave is a strong one-day option for guests who want a real cave challenge. The day starts with a transfer over Da Deo Mountain Pass and a visit near Yen Phu village, then continues into jungle and mountain terrain toward the cave.\n\nInside Ruc Mon, guests experience dry and wet cave systems, limestone formations, ladder descents with safety gear, swimming, and a memorable 5m jump option for confident guests. It is best for active travellers who want more challenge than a simple cave visit.",
    highlights: [
      "Explore Ruc Mon Cave near the Vietnam-Laos border",
      "Da Deo Mountain Pass and Ho Chi Minh Trail scenery",
      "Walk through minority village landscapes",
      "Jungle and mountain trekking with rocky terrain",
      "Ladder descent with harness and guide support",
      "Swim or float inside the cave with life jacket",
      "BBQ lunch with meat and vegetable options",
    ],
    timeline: [
      { time: "07:30", title: "Pick-up & Preparation", description: "Transfer to the headquarters for briefing and equipment.", icon: "bus" },
      { time: "09:30", title: "Yen Phu Village", description: "Drive through Da Deo Pass and begin the adventure near local minority villages.", icon: "map-pin" },
      { time: "11:00", title: "Trek To Ruc Mon Entrance", description: "Walk through jungle and reach the cave entrance area.", icon: "footprints" },
      { time: "12:30", title: "BBQ Lunch", description: "Lunch prepared by local support team, with vegetarian options on request.", icon: "utensils" },
      { time: "13:00", title: "Ruc Mon Cave Adventure", description: "Climb rocky terrain, descend ladders with harness, swim, float, and explore cave formations.", icon: "mountain" },
      { time: "16:00", title: "Trek Back", description: "Return through jungle, rivers, and rice-field valley.", icon: "route" },
      { time: "17:30", title: "Return To Phong Nha", description: "Transfer back to town, arriving around 5:30-6:30 PM.", icon: "home" },
    ],
    childDiscountNote:
      "Group size: 2-20 guests. Minimum age guideline: 12 years old. Route may change due to weather and safety.",
    faq: policyFaq([
      {
        question: "Is the 5m jump required?",
        answer:
          "No. There is usually an alternative way into the water for guests who are not comfortable jumping.",
      },
      {
        question: "How hard is Ruc Mon 1 day?",
        answer:
          "Medium difficulty. Expect jungle trekking, rocky climbs, ladder descents, swimming, and a long active day.",
      },
    ]),
    images: [`${SAMPLE}/cave.webp`],
    galleryImages: [`${SAMPLE}/cave.webp`, `${SAMPLE}/jungle.webp`, `${SAMPLE}/mountains.webp`],
    ...seo(
      "Ruc Mon Cave 1 Day Adventure",
      "Ruc Mon Cave one-day adventure with jungle trekking, ladder descent, cave swimming, Da Deo Pass, BBQ lunch, and Phong Nha transfer."
    ),
  }),

  baseTour({
    id: "abandoned-valley-e-cave-2d1n",
    slug: "abandoned-valley-e-cave-2d1n",
    title: "Abandoned Valley & E Cave 2 Days 1 Night",
    name: "Abandoned Valley & E Cave 2 Days 1 Night",
    shortDescription:
      "Overnight camping at E Cave with Abandoned Valley trek, turquoise water, SUP, fish massage, hot pot, sunrise, and outdoor games.",
    description:
      "A two-day camping route for guests who want the beauty of E Cave at a slower pace, with trekking, swimming, SUP, hot pot dinner, and a night beside the cave.",
    duration: "2 Days 1 Night",
    price: 4000000,
    priceFrom: 4000000,
    priceUsdApprox: 160,
    departure: "8:00 AM",
    returnTime: "4:00 PM the next day",
    difficulty: "Challenging",
    order: 15,
    overviewText:
      "This overnight E Cave route is ideal for guests who want to slow down and enjoy Abandoned Valley after the day visitors leave. The route starts from Km17 on the West Ho Chi Minh Trail, crosses forest, slopes, karst terrain, and bamboo forest, then reaches E Cave and its turquoise water.\n\nGuests camp near E Cave, swim, try fish massage, enjoy hot pot, stargaze when weather allows, then explore more by SUP the next morning before returning to Phong Nha.",
    highlights: [
      "2 days 1 night camping near E Cave",
      "11km total distance with about 8km forest trekking",
      "Swim or SUP 2-3km in E Cave",
      "Hot pot dinner and stargazing at campsite",
      "Sunrise, breakfast, outdoor games, and nature painting",
      "Good for active guests who exercise 3-5 times per week",
    ],
    timeline: [
      { time: "Day 1 - 08:00", title: "Pick-up & Briefing", description: "Transfer to operations house for route and safety briefing.", icon: "bus" },
      { time: "Day 1 - 09:15", title: "Start From Km17", description: "Trek through forest, mountain terrain, flat paths, slopes, and sharp karst range.", icon: "footprints" },
      { time: "Day 1 - 11:30", title: "Lunch Near Dark Cave Exit", description: "Have lunch before following the stream toward E Cave.", icon: "utensils" },
      { time: "Day 1 - 14:00", title: "Arrive At E Cave Campsite", description: "Receive tent and settle into the campsite.", icon: "tent" },
      { time: "Day 1 - 17:00", title: "Hot Pot Dinner", description: "Dinner at the campsite followed by stargazing if weather permits.", icon: "utensils" },
      { time: "Day 2 - 06:30", title: "Sunrise & Breakfast", description: "Wake up with forest sounds and enjoy breakfast.", icon: "sun" },
      { time: "Day 2 - 08:00", title: "SUP Inside E Cave", description: "Explore and paddle 2-3km inside E Cave.", icon: "waves" },
      { time: "Day 2 - 13:15", title: "Return Trek", description: "Begin the 2.5km journey back to Km19.", icon: "route" },
      { time: "Day 2 - 16:00", title: "Return To Phong Nha", description: "Transfer back to town.", icon: "home" },
    ],
    childDiscountNote:
      "Adventure level: Challenging. Total distance: 11km. Age guideline: 12-60 years old.",
    faq: policyFaq([
      {
        question: "Is this harder than the one-day E Cave tour?",
        answer:
          "Yes. It adds overnight camping, more total trekking, and a longer time outdoors, so good endurance is recommended.",
      },
    ]),
    images: [`${JB}/abandoned-valley-e-cave-2d1n.jpg`],
    overviewImage: `${JB}/abandoned-valley-e-cave-2d1n.jpg`,
    galleryImages: [`${JB}/abandoned-valley-e-cave-2d1n.jpg`, `${JB}/abandoned-valley-e-cave-1d.jpg`, `${SAMPLE}/jungle.webp`],
    ...seo(
      "Abandoned Valley & E Cave 2 Days 1 Night",
      "Overnight E Cave camping tour with Abandoned Valley trek, SUP, swimming, hot pot dinner, sunrise, and return transfer to Phong Nha."
    ),
  }),

  baseTour({
    id: "ma-da-valley-jungle-camping-2d1n",
    slug: "ma-da-valley-jungle-camping-2d1n",
    title: "Ma Da Valley Jungle Camping & Caving 2 Days 1 Night",
    name: "Ma Da Valley Jungle Camping & Caving 2 Days 1 Night",
    shortDescription:
      "Two-day jungle camping route with Elephant Cave, Ma Da Lake, Tra Ang Cave, swimming, BBQ dinner, and forest trekking.",
    description:
      "A complete Ma Da Valley camping experience with jungle trekking, caves, lake swimming, camp dinner, and a night inside the National Park landscape.",
    duration: "2 Days 1 Night",
    price: 5175000,
    priceFrom: 5175000,
    priceUsdApprox: 207,
    departure: "8:00 AM",
    returnTime: "4:00 PM the next day",
    difficulty: "Moderate",
    order: 16,
    overviewText:
      "Ma Da Valley Jungle Camping is a balanced overnight adventure for guests who want camping, cave exploration, and beautiful water without the extreme difficulty of longer expeditions. The route usually combines Elephant Cave, Ma Da Lake, Tra Ang Cave, forest trails, swimming, and a campsite dinner.\n\nIt is a strong choice for couples, friends, and small groups who want the feeling of a real expedition in two days.",
    highlights: [
      "2 days 1 night jungle camping in Ma Da Valley",
      "Elephant Cave, Ma Da Lake, and Tra Ang Cave route",
      "Swimming in clear water and jungle stream areas",
      "Dinner and breakfast at camp",
      "Moderate overnight adventure with porter and guide support",
      "Good balance of trekking, caves, camping, and water activities",
    ],
    timeline: [
      { time: "Day 1 - 08:00", title: "Pick-up & Briefing", description: "Transfer to Jungle Boss headquarters for safety briefing and gear.", icon: "bus" },
      { time: "Day 1 - Morning", title: "Elephant Cave", description: "Explore Elephant Cave and begin the jungle trek.", icon: "mountain" },
      { time: "Day 1 - Midday", title: "Jungle Lunch", description: "Lunch on the trail with support team.", icon: "utensils" },
      { time: "Day 1 - Afternoon", title: "Ma Da Lake", description: "Swim and relax in the clear Ma Da water area before camp.", icon: "waves" },
      { time: "Day 1 - Evening", title: "Camping Dinner", description: "Enjoy dinner, camp atmosphere, and forest night sounds.", icon: "tent" },
      { time: "Day 2 - Morning", title: "Tra Ang Cave", description: "Explore Tra Ang Cave and continue the return trek.", icon: "waves" },
      { time: "Day 2 - 16:00", title: "Return To Phong Nha", description: "Finish the route and transfer back to town.", icon: "home" },
    ],
    childDiscountNote:
      "Group size guideline: 2-30 guests. Age guideline: 9-65 years old. Route may change due to weather.",
    faq: policyFaq([
      {
        question: "Is camping equipment provided?",
        answer:
          "Yes. Tent, sleeping bag, pillow, air mattress, meals, guide, porter support, and safety gear are included by package.",
      },
    ]),
    images: [`${SAMPLE}/jungle.webp`],
    galleryImages: [`${SAMPLE}/jungle.webp`, `${SAMPLE}/river.webp`, `${SAMPLE}/cave.webp`],
    ...seo(
      "Ma Da Valley Jungle Camping 2 Days 1 Night",
      "Ma Da Valley 2D1N Jungle Boss camping tour with Elephant Cave, Ma Da Lake, Tra Ang Cave, swimming, meals, and Phong Nha transfer."
    ),
  }),

  baseTour({
    id: "abandoned-valley-dark-cave-exit-2d1n",
    slug: "abandoned-valley-dark-cave-exit-2d1n",
    title: "Abandoned Valley & Dark Cave Exit 2 Days 1 Night",
    name: "Abandoned Valley & Dark Cave Exit 2 Days 1 Night",
    shortDescription:
      "Challenging 2D1N route through Dark Cave Exit, E Cave campsite, Golden Cave, karst ridge, swimming, SUP, and campfire.",
    description:
      "A demanding Abandoned Valley expedition for fit guests, combining Dark Cave Exit, E Cave, Golden Cave, overnight camping, SUP, swimming, and karst trekking.",
    duration: "2 Days 1 Night",
    price: 5800000,
    priceFrom: 5800000,
    priceUsdApprox: 232,
    departure: "8:00 AM",
    returnTime: "5:30 PM the next day",
    difficulty: "Challenging",
    order: 17,
    overviewText:
      "This is the tougher Abandoned Valley overnight option. Guests trek from Km17 across mountain and karst terrain, enter Dark Cave Exit, camp at E Cave, then continue to Golden Cave on day two. The route is built for fit guests who want more cave time, more trekking, and a stronger sense of achievement.\n\nExpect long active days, swimming or SUP in E Cave, cave exploration, camping, campfire, and a souvenir gift set at the end.",
    highlights: [
      "Explore Dark Cave Exit, E Cave, and Golden Cave",
      "15km total distance with around 10km forest trekking",
      "2km Dark Cave Exit exploration and 600m Golden Cave exploration",
      "Swim or SUP 2-3km in E Cave",
      "Overnight camping at E Cave with dinner and campfire",
      "Best for guests with good endurance and mountain hiking experience",
    ],
    timeline: [
      { time: "Day 1 - 08:00", title: "Pick-up & Safety Briefing", description: "Meet at operations house for detailed route and safety preparation.", icon: "bus" },
      { time: "Day 1 - 09:30", title: "Karst Ridge Trek", description: "Hike from Km17 through jungle, mountains, and a 4.5km karst rock ridge.", icon: "footprints" },
      { time: "Day 1 - 11:30", title: "Dark Cave Exit", description: "Explore moss-covered stalactites, stalagmites, and jade formations.", icon: "mountain" },
      { time: "Day 1 - 13:30", title: "Lunch", description: "Finish Dark Cave Exit and have lunch.", icon: "utensils" },
      { time: "Day 1 - 16:00", title: "E Cave Campsite", description: "Set up camp, swim, fish, or enjoy fish spa.", icon: "tent" },
      { time: "Day 1 - 17:30", title: "Dinner & Campfire", description: "BBQ dinner or hot pot, campfire, and stargazing.", icon: "utensils" },
      { time: "Day 2 - 08:00", title: "E Cave By SUP", description: "Explore E Cave by SUP and enjoy water activities.", icon: "waves" },
      { time: "Day 2 - 13:00", title: "Golden Cave", description: "Explore Golden Cave's formations before hiking back to Km19.", icon: "mountain" },
      { time: "Day 2 - 17:30", title: "Return To Phong Nha", description: "Transfer back to town after refreshments.", icon: "home" },
    ],
    childDiscountNote:
      "Adventure level: Challenging. Total distance: 15km. Age guideline: 12-60 years old. Suitable for people who exercise 3-5 times per week.",
    faq: policyFaq([
      {
        question: "Who should choose this instead of the E Cave overnight route?",
        answer:
          "Choose this route if you want a harder trek and more cave exploration, including Dark Cave Exit and Golden Cave.",
      },
    ]),
    images: [`${JB}/abandoned-valley-dark-cave-exit-2d1n.jpg`],
    overviewImage: `${JB}/abandoned-valley-dark-cave-exit-2d1n.jpg`,
    galleryImages: [`${JB}/abandoned-valley-dark-cave-exit-2d1n.jpg`, `${JB}/abandoned-valley-e-cave-2d1n.jpg`, `${SAMPLE}/jungle.webp`],
    ...seo(
      "Abandoned Valley & Dark Cave Exit 2 Days 1 Night",
      "Challenging Abandoned Valley 2D1N tour with Dark Cave Exit, E Cave camping, Golden Cave, SUP, swimming, and Phong Nha transfer."
    ),
  }),

  baseTour({
    id: "ruc-mon-cave-2d1n",
    slug: "ruc-mon-cave-2d1n",
    title: "Ruc Mon Cave 2 Days 1 Night",
    name: "Ruc Mon Cave 2 Days 1 Night",
    shortDescription:
      "Overnight Ruc Mon expedition with minority village, cave swimming, dry cave system, BBQ meals, camping, and forest return trek.",
    description:
      "A two-day Ruc Mon expedition for guests who want deeper cave time, overnight camping, local culture, and a more complete route than the one-day adventure.",
    duration: "2 Days 1 Night",
    price: 5650000,
    priceFrom: 5650000,
    priceUsdApprox: 226,
    departure: "7:30 AM - 8:30 AM",
    returnTime: "5:15 PM - 6:30 PM the next day",
    difficulty: "Medium difficulty",
    order: 18,
    overviewText:
      "Ruc Mon Cave was explored in 2017 and is known for its huge entrances, dry and wet systems, and striking geology near the Vietnam-Laos border. This two-day version gives guests more time in the cave, a night near the cave or village depending on conditions, and a deeper look at local minority life.\n\nExpect jungle trekking, swimming inside the cave, dry cave exploration across mineral layers, local BBQ meals, camping, and a return trek through forest and rivers.",
    highlights: [
      "Two-day Ruc Mon route with cave and village experience",
      "Swim up to 3km inside the cave on day one by conditions",
      "Explore dry cave systems with mineral and fossil layers",
      "Dinner with local minority support team",
      "Camping at cave entrance or village area depending on weather",
      "Forest trek and cave exit route on day two",
    ],
    timeline: [
      { time: "Day 1 - 07:30", title: "Pick-up & Gear Preparation", description: "Prepare long sleeves, socks, refillable water bottle, sandals, and safety gear.", icon: "bus" },
      { time: "Day 1 - 10:30", title: "Hoa Son Village", description: "Walk through local village landscapes and begin the trek toward Ruc Mon.", icon: "map-pin" },
      { time: "Day 1 - 11:30", title: "BBQ Lunch At Ruc Mon Entrance", description: "Lunch with meat and vegetable options on request.", icon: "utensils" },
      { time: "Day 1 - 13:30", title: "Wet & Dry Cave Exploration", description: "Swim cave sections, climb rock layers, and explore dry systems with formations.", icon: "waves" },
      { time: "Day 1 - Evening", title: "Dinner & Camping", description: "Dinner with local support team; campsite may be cave entrance or village home area.", icon: "tent" },
      { time: "Day 2 - 07:30", title: "Breakfast & Pack Up", description: "Breakfast then prepare for the return route.", icon: "coffee" },
      { time: "Day 2 - Morning", title: "Primeval Forest Trek", description: "Walk through around 6km of forest and river trail.", icon: "footprints" },
      { time: "Day 2 - 13:30", title: "Cave Exit & Return Trek", description: "Float, swim, climb, then trek back toward the finishing point.", icon: "route" },
      { time: "Day 2 - 17:15", title: "Back To Phong Nha", description: "Transfer back to town.", icon: "home" },
    ],
    childDiscountNote:
      "Group size: 2-20 guests. Minimum age guideline: 12 years old. Camping spot may change due to weather.",
    faq: policyFaq([
      {
        question: "How is this different from the Ruc Mon 1-day tour?",
        answer:
          "The 2D1N route allows more time inside the wet and dry cave systems and includes camping plus a deeper local village experience.",
      },
    ]),
    images: [`${SAMPLE}/caveAlt.webp`],
    galleryImages: [`${SAMPLE}/caveAlt.webp`, `${SAMPLE}/jungle.webp`, `${SAMPLE}/mountains.webp`],
    ...seo(
      "Ruc Mon Cave 2 Days 1 Night",
      "Ruc Mon Cave 2D1N expedition with cave swimming, dry cave system, minority village, BBQ meals, camping, and transfer from Phong Nha."
    ),
  }),

  baseTour({
    id: "ruc-mon-cave-expedition",
    slug: "ruc-mon-cave-expedition",
    title: "Ruc Mon Cave Expedition",
    name: "Ruc Mon Cave Expedition",
    shortDescription:
      "A more complete Ruc Mon expedition for guests who want a stronger cave challenge, local culture, jungle trekking, and overnight adventure.",
    description:
      "A deeper Ruc Mon route focused on cave challenge, geology, local minority culture, and expedition-style trekking near the Vietnam-Laos border.",
    duration: "2 Days 1 Night",
    price: 5650000,
    priceFrom: 5650000,
    priceUsdApprox: 226,
    departure: "7:30 AM - 8:30 AM",
    returnTime: "5:30 PM - 6:30 PM the next day",
    difficulty: "Challenging",
    order: 19,
    overviewText:
      "This version is positioned for guests who are already excited by Ruc Mon and want a more expedition-style experience. It focuses on the sense of achievement: jungle approach, cave swimming, rock layers, mineral formations, local support team meals, and overnight conditions that may vary with weather.\n\nIt is best for adventurous travellers who want a bigger story than a standard day tour.",
    highlights: [
      "Expedition-style Ruc Mon Cave experience",
      "Jungle approach through remote village and river landscapes",
      "Wet and dry cave systems with limestone formations",
      "Swimming, floating, and climbing sections by conditions",
      "Local BBQ meals and support team",
      "Flexible campsite depending on weather and safety",
    ],
    timeline: [
      { time: "Day 1", title: "Preparation & Transfer", description: "Briefing, gear check, and transfer toward Hoa Son village and Ruc Mon area.", icon: "bus" },
      { time: "Day 1", title: "Jungle Approach", description: "Trek through forest, river, and village landscapes toward the cave.", icon: "footprints" },
      { time: "Day 1", title: "Ruc Mon Cave Systems", description: "Explore wet and dry cave sections, formations, and swimming routes.", icon: "mountain" },
      { time: "Day 1", title: "Camp & Dinner", description: "Dinner and overnight near the cave or village area depending on conditions.", icon: "tent" },
      { time: "Day 2", title: "Return Expedition", description: "Continue cave or forest sections and trek back to the pick-up point.", icon: "route" },
      { time: "Day 2", title: "Return To Phong Nha", description: "Transfer back to town in the late afternoon.", icon: "home" },
    ],
    childDiscountNote: "Best for fit guests with previous outdoor experience. Route may change for safety.",
    faq: policyFaq([
      {
        question: "Is this suitable for beginners?",
        answer:
          "It is better for guests who already feel confident with trekking, swimming, and rough terrain. First-time guests may prefer Tra Ang, Wildlife Trek, or Ruc Mon 1 Day.",
      },
    ]),
    images: [`${SAMPLE}/cave.webp`],
    galleryImages: [`${SAMPLE}/cave.webp`, `${SAMPLE}/jungle.webp`, `${SAMPLE}/river.webp`],
    ...seo(
      "Ruc Mon Cave Expedition",
      "Ruc Mon Cave expedition near Phong Nha with jungle trekking, cave swimming, local culture, camping, and guide support."
    ),
  }),

  baseTour({
    id: "hang-pygmy-2d1n",
    slug: "hang-pygmy-2d1n",
    title: "Hang Pygmy Exploration 2 Days 1 Night",
    name: "Hang Pygmy Exploration 2 Days 1 Night",
    shortDescription:
      "Strenuous 2D1N expedition to Hang Pygmy with jungle trekking, cave campsite, rope support, swimming, and one of Phong Nha's most impressive cave entrances.",
    description:
      "A demanding overnight expedition for fit travellers who want jungle trekking, cave camping, technical support, and the scale of Hang Pygmy.",
    duration: "2 Days 1 Night",
    price: 7900000,
    priceFrom: 7900000,
    priceUsdApprox: 316,
    departure: "8:00 AM",
    returnTime: "5:30 PM the next day",
    difficulty: "Strenuous",
    order: 20,
    overviewText:
      "Hang Pygmy is a serious overnight cave adventure for guests with good fitness. The tour includes long jungle trekking, cave exploration, camping, safety equipment, and sections that may require rope or harness support depending on conditions.\n\nIt is a good step up from Ma Da Valley or Abandoned Valley for travellers who want a true expedition feeling.",
    highlights: [
      "2 days 1 night expedition into Hang Pygmy",
      "Jungle trekking through remote National Park terrain",
      "Camp inside or near the cave landscape",
      "Large cave entrance and dramatic formations",
      "Safety equipment and porter support",
      "Best for fit and adventurous guests",
    ],
    timeline: [
      { time: "Day 1 - Morning", title: "Pick-up & Briefing", description: "Safety briefing, gear preparation, and transfer to trailhead.", icon: "bus" },
      { time: "Day 1 - Midday", title: "Jungle Trek", description: "Trek through forest and uneven mountain terrain.", icon: "footprints" },
      { time: "Day 1 - Afternoon", title: "Hang Pygmy Area", description: "Reach the cave area and begin exploration with guide support.", icon: "mountain" },
      { time: "Day 1 - Evening", title: "Camping Dinner", description: "Dinner and overnight camp in the expedition area.", icon: "tent" },
      { time: "Day 2 - Morning", title: "Cave & Jungle Return", description: "Continue exploration and trek back through the forest.", icon: "route" },
      { time: "Day 2 - Late Afternoon", title: "Return To Phong Nha", description: "Transfer back to town.", icon: "home" },
    ],
    childDiscountNote: "Strenuous expedition. Minimum age and fitness approval may apply.",
    faq: policyFaq([
      {
        question: "How fit do I need to be?",
        answer:
          "You should have good endurance, be comfortable with steep jungle terrain, and be ready for a full overnight expedition.",
      },
    ]),
    images: [`${SAMPLE}/caveAlt.webp`],
    galleryImages: [`${SAMPLE}/caveAlt.webp`, `${SAMPLE}/jungle.webp`, `${SAMPLE}/mountains.webp`],
    ...seo(
      "Hang Pygmy Exploration 2 Days 1 Night",
      "Hang Pygmy 2D1N Jungle Boss expedition with jungle trekking, cave camping, safety equipment, meals, and transfer from Phong Nha."
    ),
  }),

  baseTour({
    id: "hung-thoong-3d2n",
    slug: "hung-thoong-3d2n",
    title: "Hung Thoong Exploration 3 Days 2 Nights",
    name: "Hung Thoong Exploration 3 Days 2 Nights",
    shortDescription:
      "Three-day expedition through Hung Thoong with blue lakes, caves, jungle camping, swimming, trekking, and remote National Park scenery.",
    description:
      "A multi-day Jungle Boss expedition for fit guests who want remote jungle, cave systems, blue water, camping, and a deeper Phong Nha adventure.",
    duration: "3 Days 2 Nights",
    price: 12000000,
    priceFrom: 12000000,
    priceUsdApprox: 480,
    departure: "7:30 AM",
    returnTime: "Late afternoon on day 3",
    difficulty: "Strenuous",
    order: 21,
    overviewText:
      "Hung Thoong is a deeper expedition into one of Phong Nha's most beautiful adventure areas. The route is known for blue lakes, cave systems, jungle camping, swimming, and long trekking days.\n\nChoose this if you want a real multi-day adventure but are not looking for the extreme length of Kong Collapse.",
    highlights: [
      "3 days 2 nights in the Hung Thoong area",
      "Blue lake scenery and cave exploration",
      "Remote jungle trekking and camping",
      "Swimming and cave water sections by conditions",
      "Professional guide and porter support",
      "Best for fit guests ready for a multi-day expedition",
    ],
    timeline: [
      { time: "Day 1", title: "Briefing & Jungle Trek", description: "Transfer, safety briefing, and trek into the Hung Thoong area.", icon: "footprints" },
      { time: "Day 1", title: "First Camp", description: "Set up camp and enjoy dinner in the jungle.", icon: "tent" },
      { time: "Day 2", title: "Caves & Blue Lakes", description: "Explore cave and water sections with swimming by conditions.", icon: "waves" },
      { time: "Day 2", title: "Second Camp", description: "Dinner and overnight in the expedition area.", icon: "tent" },
      { time: "Day 3", title: "Return Trek", description: "Pack up and trek back toward the trailhead.", icon: "route" },
      { time: "Day 3", title: "Back To Phong Nha", description: "Transfer to town in the late afternoon.", icon: "home" },
    ],
    childDiscountNote: "Strenuous multi-day expedition. Fitness screening may apply before booking.",
    faq: policyFaq([
      {
        question: "Is this harder than Hang Pygmy?",
        answer:
          "It is longer and requires sustained endurance over 3 days, but the exact difficulty depends on weather, water level, and group pace.",
      },
    ]),
    images: [`${SAMPLE}/jungle.webp`],
    galleryImages: [`${SAMPLE}/jungle.webp`, `${SAMPLE}/cave.webp`, `${SAMPLE}/river.webp`],
    ...seo(
      "Hung Thoong Exploration 3 Days 2 Nights",
      "Hung Thoong 3D2N expedition with jungle camping, caves, blue lakes, swimming, meals, porter team, and Phong Nha transfer."
    ),
  }),

  baseTour({
    id: "tiger-cave-series-3d2n",
    slug: "tiger-cave-series-3d2n",
    title: "Tiger Cave Series Adventure 3 Days 2 Nights",
    name: "Tiger Cave Series Adventure 3 Days 2 Nights",
    shortDescription:
      "Challenging 3D2N expedition through the Tiger Cave Series with jungle trekking, cave systems, swimming, camping, and remote scenery.",
    description:
      "A serious three-day adventure through the Tiger Cave Series for fit guests who want a remote cave expedition with camping and big jungle days.",
    duration: "3 Days 2 Nights",
    price: 12500000,
    priceFrom: 12500000,
    priceUsdApprox: 500,
    departure: "7:30 AM",
    returnTime: "Late afternoon on day 3",
    difficulty: "Strenuous",
    order: 22,
    overviewText:
      "Tiger Cave Series is for travellers who want a true multi-day expedition: long jungle trekking, several cave sections, swimming by conditions, camping, and remote Phong Nha scenery. It sits above the one-day and 2D1N tours in physical demand.\n\nThis tour is best for guests who already feel confident outdoors and want a big adventure without choosing the full Kong Collapse route.",
    highlights: [
      "3 days 2 nights in the Tiger Cave Series",
      "Multiple cave sections and remote jungle landscapes",
      "Camping with guide and porter support",
      "Swimming and cave water sections by conditions",
      "A strong expedition for fit adventure travellers",
      "Good step before attempting Kong Collapse",
    ],
    timeline: [
      { time: "Day 1", title: "Pick-up & Jungle Approach", description: "Briefing, gear preparation, and trek into the expedition area.", icon: "footprints" },
      { time: "Day 1", title: "First Cave Area & Camp", description: "Explore the first cave sections and set up camp.", icon: "tent" },
      { time: "Day 2", title: "Tiger Cave Series", description: "Full day of cave exploration, trekking, and water sections by conditions.", icon: "mountain" },
      { time: "Day 2", title: "Second Camp", description: "Dinner and overnight in the jungle.", icon: "tent" },
      { time: "Day 3", title: "Final Exploration & Return Trek", description: "Complete the final sections and trek out.", icon: "route" },
      { time: "Day 3", title: "Return To Phong Nha", description: "Transfer back to town.", icon: "home" },
    ],
    childDiscountNote: "Strenuous expedition. Good fitness and outdoor confidence are required.",
    faq: policyFaq([
      {
        question: "Who should choose Tiger Cave Series?",
        answer:
          "Guests who want a serious multi-day jungle and cave expedition but do not want the full 5-day Kong Collapse commitment.",
      },
    ]),
    images: [`${SAMPLE}/cave.webp`],
    galleryImages: [`${SAMPLE}/cave.webp`, `${SAMPLE}/jungle.webp`, `${SAMPLE}/river.webp`],
    ...seo(
      "Tiger Cave Series Adventure 3 Days 2 Nights",
      "Tiger Cave Series 3D2N Jungle Boss expedition with caves, jungle trekking, camping, swimming sections, meals, and Phong Nha transfer."
    ),
  }),

  baseTour({
    id: "kong-collapse-5d4n",
    slug: "kong-collapse-5d4n",
    title: "Kong Collapse Top Adventure 5 Days 4 Nights",
    name: "Kong Collapse Top Adventure 5 Days 4 Nights",
    shortDescription:
      "The most demanding Jungle Boss expedition: 5D4N to Kong Collapse with long trekking, caves, camping, rope sections, and remote terrain.",
    description:
      "A top-level Phong Nha expedition for experienced, very fit adventurers who want the full Kong Collapse challenge.",
    duration: "5 Days 4 Nights",
    price: 35000000,
    priceFrom: 35000000,
    priceUsdApprox: 1400,
    departure: "7:30 AM",
    returnTime: "Late afternoon on day 5",
    difficulty: "Extremely strenuous",
    order: 23,
    overviewText:
      "Kong Collapse is the biggest and hardest adventure in this Jungle Boss collection. It is built for experienced guests with strong fitness, confidence in remote terrain, and readiness for long trekking days, cave sections, camping, rope support, and changing expedition conditions.\n\nThis is not a casual tour. It should be booked only after checking fitness, weather, and availability carefully.",
    highlights: [
      "5 days 4 nights top-level expedition",
      "Remote jungle trekking and cave systems",
      "Kong Collapse viewpoint and expedition route",
      "Camping in wild cave and jungle environments",
      "Rope, harness, helmet, headlight, and guide support",
      "For experienced and very fit adventurers only",
    ],
    timeline: [
      { time: "Day 1", title: "Briefing & Start Expedition", description: "Safety briefing, gear check, and trek into the remote route.", icon: "footprints" },
      { time: "Day 2", title: "Deep Jungle & Cave Systems", description: "Continue through demanding jungle and cave terrain.", icon: "mountain" },
      { time: "Day 3", title: "Kong Collapse Area", description: "Reach major cave and collapse sections with guide support.", icon: "mountain" },
      { time: "Day 4", title: "Return Route Begins", description: "Continue exploration and begin the route back through remote terrain.", icon: "route" },
      { time: "Day 5", title: "Final Trek & Return", description: "Complete the expedition and transfer back to Phong Nha.", icon: "home" },
    ],
    childDiscountNote: "Extremely strenuous. Fitness approval and strict safety screening are required.",
    faq: policyFaq([
      {
        question: "Can beginners join Kong Collapse?",
        answer:
          "No. This is for experienced, very fit guests who are comfortable with multi-day remote expeditions.",
      },
    ]),
    images: [`${SAMPLE}/mountains.webp`],
    galleryImages: [`${SAMPLE}/mountains.webp`, `${SAMPLE}/caveAlt.webp`, `${SAMPLE}/jungle.webp`],
    ...seo(
      "Kong Collapse Top Adventure 5 Days 4 Nights",
      "Kong Collapse 5D4N top Jungle Boss expedition with remote caves, jungle trekking, camping, rope support, meals, and Phong Nha transfer."
    ),
  }),
];

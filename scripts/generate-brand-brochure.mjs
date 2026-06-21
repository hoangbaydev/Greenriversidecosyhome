/**
 * Generate a professionally formatted Word brochure from brand content.
 * Usage: node scripts/generate-brand-brochure.mjs
 * Output: ~/Downloads/Green Riverside Cosy Home - Brand Guide.docx
 */

import fs from "fs";
import path from "path";
import os from "os";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  ShadingType,
  PageBreak,
  Header,
  Footer,
  PageNumber,
} from "docx";

const GREEN = "1F6F43";
const GREEN_LIGHT = "F0F7F3";
const MUTED = "6B7280";
const DARK = "111827";

const font = "Calibri";

function sp(size = 120) {
  return { after: size, before: 0 };
}

function hr() {
  return new Paragraph({
    spacing: { before: 200, after: 200 },
    border: { bottom: { color: "E5E7EB", space: 1, style: BorderStyle.SINGLE, size: 6 } },
  });
}

function title(text, level = HeadingLevel.HEADING_1) {
  return new Paragraph({
    heading: level,
    spacing: { before: level === HeadingLevel.HEADING_1 ? 360 : 280, after: 160 },
    children: [
      new TextRun({
        text,
        font,
        bold: true,
        color: level === HeadingLevel.HEADING_1 ? GREEN : DARK,
        size: level === HeadingLevel.HEADING_1 ? 36 : level === HeadingLevel.HEADING_2 ? 28 : 24,
      }),
    ],
  });
}

function subtitle(text) {
  return new Paragraph({
    spacing: sp(80),
    children: [new TextRun({ text, font, italics: true, color: MUTED, size: 22 })],
  });
}

function body(text) {
  return new Paragraph({
    spacing: sp(120),
    children: [new TextRun({ text, font, color: DARK, size: 22 })],
  });
}

function bullet(text, level = 0) {
  return new Paragraph({
    bullet: { level },
    spacing: sp(60),
    children: [new TextRun({ text, font, color: DARK, size: 22 })],
  });
}

function quote(text) {
  return new Paragraph({
    spacing: { before: 200, after: 200 },
    indent: { left: 360, right: 360 },
    shading: { type: ShadingType.CLEAR, fill: GREEN_LIGHT, color: GREEN_LIGHT },
    children: [
      new TextRun({ text: `"${text}"`, font, italics: true, bold: true, color: GREEN, size: 26 }),
    ],
  });
}

function labelValue(label, value) {
  return new Paragraph({
    spacing: sp(40),
    children: [
      new TextRun({ text: `${label}: `, font, bold: true, color: DARK, size: 20 }),
      new TextRun({ text: value, font, color: MUTED, size: 20 }),
    ],
  });
}

function callout(titleText, lines) {
  return [
    new Paragraph({
      spacing: { before: 160, after: 80 },
      shading: { type: ShadingType.CLEAR, fill: GREEN_LIGHT, color: GREEN_LIGHT },
      indent: { left: 200, right: 200 },
      children: [new TextRun({ text: titleText, font, bold: true, color: GREEN, size: 22 })],
    }),
    ...lines.map((line) =>
      new Paragraph({
        spacing: sp(40),
        indent: { left: 360, right: 200 },
        children: [new TextRun({ text: line, font, color: DARK, size: 20 })],
      })
    ),
  ];
}

function table(headers, rows, colWidths) {
  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map(
      (h, i) =>
        new TableCell({
          width: { size: colWidths[i], type: WidthType.PERCENTAGE },
          shading: { fill: GREEN, type: ShadingType.CLEAR, color: GREEN },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          children: [
            new Paragraph({
              children: [new TextRun({ text: h, font, bold: true, color: "FFFFFF", size: 20 })],
            }),
          ],
        })
    ),
  });

  const dataRows = rows.map(
    (row, ri) =>
      new TableRow({
        children: row.map(
          (cell, ci) =>
            new TableCell({
              width: { size: colWidths[ci], type: WidthType.PERCENTAGE },
              shading:
                ri % 2 === 1
                  ? { fill: "FAFAFA", type: ShadingType.CLEAR, color: "FAFAFA" }
                  : undefined,
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [
                new Paragraph({
                  children: [new TextRun({ text: cell, font, color: DARK, size: 20 })],
                }),
              ],
            })
        ),
      })
  );

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [headerRow, ...dataRows],
  });
}

function roomBlock(room) {
  return [
    title(room.name, HeadingLevel.HEADING_3),
    ...room.details.map(([k, v]) => labelValue(k, v)),
    new Paragraph({
      spacing: sp(60),
      children: [new TextRun({ text: "Facilities", font, bold: true, color: DARK, size: 20 })],
    }),
    new Paragraph({
      spacing: sp(80),
      children: [new TextRun({ text: room.facilities, font, color: MUTED, size: 20 })],
    }),
    new Paragraph({
      spacing: sp(120),
      children: [
        new TextRun({ text: room.price, font, bold: true, color: GREEN, size: 22 }),
      ],
    }),
    hr(),
  ];
}

const WHY_STAY = [
  ["Beautiful Natural Surroundings", "Wake up to rice fields, limestone mountains, and the crystal-clear Son River."],
  ["Free Breakfast Every Morning", "Complimentary breakfast daily from 7:00 AM – 9:30 AM."],
  ["Free Activities Included", "2 hours free bicycle use + 30 minutes paddle boarding or swimming in the Son River."],
  ["Comfortable Common Spaces", "AC, hammocks, bean bags, sofas — perfect for relaxing or remote work."],
  ["Everything You Need", "Filtered water, fast Wi-Fi, secure parking, free showers before/after stay."],
  ["Expert Local Support", "English-speaking host for tours, transport, Easy Riders, and laundry."],
  ["Daily Social Activities", "Family dinners, happy hours, games, and cultural exchanges."],
  ["Local Family Hospitality", "More than a hostel — guests are welcomed like family."],
];

const ROOMS = [
  {
    name: "1. Deluxe Single or Double Room — Mountain View",
    details: [
      ["Room size", "20 m²"],
      ["Max occupancy", "2 adults"],
      ["Bed", "1 double bed (1.6m × 2m)"],
      ["View", "Mountain view"],
      ["Balcony", "Yes"],
      ["Bathroom", "Private"],
    ],
    facilities: "A/C · Fan · Mini bar · Kettle · Hair dryer · Desk · Fridge · Wi-Fi",
    price: "From USD 20/night (Direct) · OTA from USD 22",
  },
  {
    name: "2. Superior Double / Twin Room",
    details: [
      ["Room size", "26 m²"],
      ["Max occupancy", "3–4 guests / family"],
      ["Bed", "2 double beds (1.6m × 2m)"],
      ["View", "Partial mountain view"],
      ["Balcony", "No"],
      ["Bathroom", "Private"],
    ],
    facilities: "A/C · Fan · Mini bar · Kettle · Hair dryer · Desk · Fridge · Wi-Fi",
    price: "From USD 20–30/night (Direct) · OTA USD 25–40",
  },
  {
    name: "3. Deluxe Double / Twin Room — Mountain View",
    details: [
      ["Room size", "30 m²"],
      ["Max occupancy", "3–4 guests / family"],
      ["Bed", "1 double + 1 single (flexible)"],
      ["View", "Mountain view"],
      ["Balcony", "Yes"],
      ["Bathroom", "Private"],
    ],
    facilities: "A/C · Fan · Mini bar · Kettle · Hair dryer · Desk · Fridge · Wi-Fi",
    price: "From USD 25/night (Direct) · OTA USD 30–40",
  },
  {
    name: "4. Family Suite with Balcony",
    details: [
      ["Room size", "30 m²"],
      ["Max occupancy", "3–4 guests / family"],
      ["Bed", "1 double (1.6m × 2m) + 1 bunk (1.2m × 2m)"],
      ["View", "Mountain view"],
      ["Balcony", "Yes"],
      ["Bathroom", "Private"],
    ],
    facilities: "A/C · Fan · Mini bar · Kettle · Hair dryer · Desk · Fridge · Wi-Fi",
    price: "USD 25–30/night (Direct) · OTA USD 30–40",
  },
  {
    name: "5. Deluxe 4-Bed Mixed Dorm",
    details: [
      ["Room size", "25 m²"],
      ["Beds", "2 bunk beds (4 beds)"],
      ["Max occupancy", "4 guests"],
      ["Bathroom", "En-suite inside room"],
    ],
    facilities: "Privacy curtain · Reading light · Socket · Locker · A/C · Fan · Wi-Fi",
    price: "From USD 9 / bed",
  },
  {
    name: "6. Deluxe Female 6-Bed Dorm",
    details: [
      ["Room size", "30 m²"],
      ["Beds", "3 bunk beds (6 beds)"],
      ["Max occupancy", "6 guests (female only)"],
      ["Bathroom", "En-suite inside room"],
    ],
    facilities: "Privacy curtain · Reading light · Socket · Locker · A/C · Fan · Wi-Fi",
    price: "From USD 8 / bed",
  },
  {
    name: "7. Deluxe Mixed 8-Bed Dorm",
    details: [
      ["Room size", "40 m²"],
      ["Beds", "4 bunk beds (8 beds)"],
      ["Max occupancy", "8 guests"],
      ["Bathroom", "2 en-suite bathrooms"],
    ],
    facilities: "Privacy curtain · Reading light · Socket · Locker · A/C · Fan · Wi-Fi",
    price: "From USD 8 / bed",
  },
];

const CLASSIC_TOURS = [
  ["Half Day — Phong Nha Cave", "Dep. 2:30 PM · End 4:30 PM (cave) or 7 PM (Duck Farm)", "650,000 VND"],
  ["Half Day — Dark Cave", "Dep. 1:00 PM · End 4:30 PM or 7 PM (Duck Farm)", "900,000 VND"],
  ["Half Day — Botanic Garden & Paradise Cave", "Dep. 8:30 AM · End 4:30 PM or 7 PM", "950,000 VND"],
  ["Full Day — Phong Nha & Paradise Cave", "Dep. 9:00 AM · End 4:30 PM or 7 PM", "1,190,000 VND"],
  ["Full Day — Paradise & Dark Cave", "Dep. 9:00 AM · End 4:30 PM or 7 PM", "1,390,000 VND"],
  ["Full Day — Phong Nha & Dark Cave", "Dep. 9:00 AM · End 4:30 PM or 7 PM", "1,390,000 VND"],
  ["Full Day — Botanic + Phong Nha & Paradise", "Dep. 8:30 AM · End 4:30 PM or 7 PM", "1,290,000 VND"],
  ["Full Day — Botanic + Paradise & Dark Cave", "Dep. 8:30 AM · End 4:30 PM or 7 PM", "1,490,000 VND"],
  ["Full Day — Botanic + Phong Nha & Dark Cave", "Dep. 8:30 AM · End 4:30 PM or 7 PM", "1,490,000 VND"],
];

const ADVENTURE_TOURS = [
  ["Wildlife 1 Day & Jungle Trek", "Same day · 8:30–17:00", "Easy", "1,490,000"],
  ["Ruc Mon 1 Day Adventure", "Same day · 8:00–17:30", "Moderate", "1,850,000"],
  ["Abandoned Valley (E Cave)", "Same day · 8:00–17:30", "Moderate", "1,750,000"],
  ["Elephant Cave & Ma Da Valley", "Same day · 8:00–17:30", "Moderate", "1,950,000"],
  ["Abandoned Valley (E Cave & Dark Exit)", "Same day · 8:00–18:00", "Mod. Challenging", "2,100,000"],
  ["Ruc Mon 1 Day Expedition", "Same day · 8:00–18:30", "Mod. Challenging", "2,750,000"],
  ["Ma Da Valley Jungle Camping", "2D1N · End Day 2 at 16:00", "Moderate", "5,175,000"],
  ["Ruc Mon Cave Expedition 2D1N", "2D1N · End Day 2 at 18:00", "Moderate", "5,650,000"],
  ["Abandon Valley 2D1N", "2D1N · End Day 2 at 16:00", "Moderate", "4,000,000"],
  ["Abandon Valley (Golden + Dark Exit) 2D1N", "2D1N · End Day 2 at 17:30", "Challenging", "5,800,000"],
  ["Hang Pygmy Exploration 2D1N", "2D1N · End Day 2 at 15:00", "Strenuous", "7,900,000"],
  ["Hung Thoong Exploration 3D2N", "3D2N · End Day 3 at 15:00", "Strenuous", "12,000,000"],
  ["Tiger Cave Series 3D2N", "3D2N · End Day 3 at 15:00", "Very strenuous", "12,500,000"],
  ["Kong Collapse Top Adventure 5D4N", "5D4N · End Day 5 at 18:00", "Extremely strenuous", "35,000,000"],
];

const doc = new Document({
  styles: {
    default: {
      document: { run: { font, size: 22, color: DARK } },
    },
    paragraphStyles: [
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        run: { size: 36, bold: true, font, color: GREEN },
        paragraph: { spacing: { before: 360, after: 160 } },
      },
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        next: "Normal",
        run: { size: 28, bold: true, font, color: DARK },
        paragraph: { spacing: { before: 280, after: 120 } },
      },
      {
        id: "Heading3",
        name: "Heading 3",
        basedOn: "Normal",
        next: "Normal",
        run: { size: 24, bold: true, font, color: DARK },
        paragraph: { spacing: { before: 200, after: 80 } },
      },
    ],
  },
  sections: [
    {
      properties: {
        page: { margin: { top: 720, right: 900, bottom: 720, left: 900 } },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [
                new TextRun({
                  text: "Green Riverside Cosy Home · Phong Nha, Vietnam",
                  font,
                  size: 18,
                  color: MUTED,
                }),
              ],
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: "Come as our guest, leave as our family  ·  Page ",
                  font,
                  size: 18,
                  color: MUTED,
                }),
                new TextRun({ children: [PageNumber.CURRENT], font, size: 18, color: MUTED }),
              ],
            }),
          ],
        }),
      },
      children: [
        // —— Cover ——
        new Paragraph({ spacing: { before: 2400 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [
            new TextRun({ text: "GREEN RIVERSIDE", font, bold: true, size: 52, color: GREEN }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 120 },
          children: [
            new TextRun({ text: "COSY HOME", font, bold: true, size: 44, color: DARK }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
          children: [
            new TextRun({
              text: "Stay · Eat · Explore · Connect",
              font,
              size: 26,
              color: MUTED,
            }),
          ],
        }),
        quote("Come as our guest, leave as our family."),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 600 },
          children: [
            new TextRun({
              text: "Brand & Experience Guide",
              font,
              size: 24,
              color: MUTED,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 120 },
          children: [
            new TextRun({
              text: "Phong Nha – Ke Bang · Quang Binh, Vietnam",
              font,
              size: 22,
              color: MUTED,
            }),
          ],
        }),
        new Paragraph({ children: [new PageBreak()] }),

        // —— Contents ——
        title("Contents", HeadingLevel.HEADING_1),
        ...[
          "1. Our Story",
          "2. Stay With Us",
          "3. Cozy Cafe Rooftop",
          "4. Social Activities",
          "5. Bong Lai Valley & Cycling",
          "6. Motorbike Adventures",
          "7. National Classic Tours",
          "8. Adventure Cave Tours",
        ].map((item) => bullet(item)),
        new Paragraph({ children: [new PageBreak()] }),

        // —— 1. Our Story ——
        title("1. Our Story", HeadingLevel.HEADING_1),
        subtitle("Meet the Family Behind Green Riverside"),
        body(
          "Nestled between rice fields, limestone mountains, and the peaceful Son River, Green Riverside Cosy Home is more than just a place to stay. It is a place where travellers experience the beauty of Phong Nha through the eyes of a local family."
        ),
        title("Meet Linh", HeadingLevel.HEADING_2),
        body(
          "My name is Linh, founder and host of Green Riverside. I was born and raised in the countryside of Phong Nha and always dreamed of building something meaningful for my family, my community, and the place I call home."
        ),
        body(
          "Before opening Green Riverside, I worked as an English teacher, tour guide, travel consultant, and receptionist. These experiences taught me the value of hospitality and inspired me to create a place where travellers could feel genuinely welcomed."
        ),
        body(
          "Today, Green Riverside is more than a hostel. It is a place to stay, eat, explore, and connect. Whether you join a family dinner, watch the sunset from our rooftop café, explore the caves of Phong Nha, or relax by the river — we hope you feel at home here."
        ),
        title("Our Philosophy", HeadingLevel.HEADING_2),
        quote("Come as our guest, leave as our family."),
        body(
          "This simple idea guides everything we do. We believe travel is about more than sightseeing — sharing stories, learning cultures, building friendships, and creating meaningful connections."
        ),
        title("Nature · Family · Community", HeadingLevel.HEADING_2),
        bullet("Nature — Wake up surrounded by rice fields, limestone mountains, and river views."),
        bullet("Family — Genuine local hospitality from our family-run team."),
        bullet("Community — Connect through family dinners, social activities, and shared adventures."),
        new Paragraph({ children: [new PageBreak()] }),

        // —— 2. Stay ——
        title("2. Stay With Us", HeadingLevel.HEADING_1),
        subtitle("Stay in the Heart of Nature"),
        body(
          "Wake up to the sounds of nature with views of rice fields, limestone mountains, and the peaceful Son River. Whether you are a solo backpacker, couple, family, or group — Green Riverside offers comfortable accommodation for every traveller."
        ),
        title("Why Stay With Us?", HeadingLevel.HEADING_2),
        ...WHY_STAY.map(([t, d]) => bullet(`${t} — ${d}`)),
        quote("Come as our guest, leave as our family."),
        title("Rooms & Rates", HeadingLevel.HEADING_2),
        body("All prices in USD. Book direct via WhatsApp for the best rates."),
        ...ROOMS.flatMap((r) => roomBlock(r)),
        new Paragraph({ children: [new PageBreak()] }),

        // —— 3. Cafe ——
        title("3. Cozy Cafe Rooftop", HeadingLevel.HEADING_1),
        subtitle("4th Floor — Green Riverside Cosy Home"),
        body(
          "Discover Cozy Cafe Rooftop — where home-cooked food, fresh drinks, and nature come together. Surrounded by mountains, river, and rice fields, slow down and enjoy honest flavours above the countryside."
        ),
        title("Food Experience", HeadingLevel.HEADING_2),
        body(
          "Breakfast: egg & baguette, pancakes, smoothie bowls, and traditional Vietnamese dishes. All-day menu: local Vietnamese, Western comfort food, starters, vegetarian options, and daily specials."
        ),
        title("Drinks & Coffee Culture", HeadingLevel.HEADING_2),
        body(
          "Vietnamese drip coffee, iced milk coffee, egg coffee, salt coffee, peanut coffee, coconut coffee. Fresh juices, smoothies, herbal teas, craft beer, and sunset cocktails."
        ),
        title("Rooftop Experience", HeadingLevel.HEADING_2),
        body(
          "Open-air space from sunrise to sunset — mountain air, river views, and golden light over the rice fields. Perfect for remote work or a quiet drink."
        ),
        title("Activities on the Rooftop", HeadingLevel.HEADING_2),
        bullet("Table tennis, pool, foosball, yoga mats, book exchange."),
        bullet("Evenings: game nights, karaoke, music bingo, Vietnamese lessons."),
        new Paragraph({ children: [new PageBreak()] }),

        // —— 4. Social ——
        title("4. Social Activities", HeadingLevel.HEADING_1),
        body(
          "At Green Riverside, travel is about the people you meet and memories you create. Many guests arrive as strangers and leave as family — never feeling alone, even when travelling solo."
        ),
        title("Daily Family Dinner & Happy Hour", HeadingLevel.HEADING_2),
        body(
          "Every day, guests gather for Family Dinner and Happy Hour — shared local food, drinks, and natural connection. Evenings continue with activities shaped by the energy of the group."
        ),
        title("Weekly Social Program", HeadingLevel.HEADING_2),
        bullet("Monday — Rest & recharge"),
        bullet("Tuesday — Language exchange"),
        bullet("Wednesday — Cooking class"),
        bullet("Thursday — Trivia night"),
        bullet("Friday — Family dinner (highlight)"),
        bullet("Saturday — Rooftop happy hour"),
        bullet("Sunday — Movie & games night"),
        new Paragraph({ children: [new PageBreak()] }),

        // —— 5. Cycling ——
        title("5. Bong Lai Valley & Cycling Tour", HeadingLevel.HEADING_1),
        body(
          "Bong Lai Valley — 10–15 km from town — is perfect for authentic rural life beyond the caves. Our guided Morning or Afternoon Cycling Tour & Cooking Class is the easiest, most meaningful way to explore."
        ),
        title("Highlights Along the Route", HeadingLevel.HEADING_2),
        bullet("Duck Stop — iconic duck leader experience & Bánh Xèo"),
        bullet("Duck Tang Farm — buffalo riding, animal feeding, organic meal"),
        bullet("Monkey Bridge & adventure stops at Cuong Rung Farm"),
        bullet("Pub with Cold Beer — BBQ, pool, valley views"),
        bullet("Ồ Ồ Lake — swim, paddle board, local food"),
        bullet("Funky Beach & East Hill — sunset viewpoints"),
        ...callout("Why join our guided tour?", [
          "Well-planned route without confusion",
          "Hidden spots most travellers miss",
          "Local stories and cultural insights",
          "Relaxed, stress-free timing",
        ]),
        new Paragraph({ children: [new PageBreak()] }),

        // —— 6. Motorbike ——
        title("6. Motorbike Adventures", HeadingLevel.HEADING_1),
        body(
          "For freedom and wider exploration, motorbike routes through Phong Nha – Ke Bang National Park are the perfect alternative to cycling."
        ),
        title("Popular Loop Routes", HeadingLevel.HEADING_2),
        bullet("Route 1: Caves & Country Loop (50–90 km) — full-day scenic ride"),
        bullet("Route 2: Bridges & Back-Roads (40 km) — quiet rural roads"),
        bullet("Route 3: Bong Lai Valley Loop (15 km) — easy countryside"),
        bullet("Route 4: Ho Chi Minh West is Best (290 km) — experienced riders"),
        bullet("Route 5: King Kong Loop (190–220 km) — Skull Island filming locations"),
        ...callout("Easy Rider & Private Car (Recommended)", [
          "Not confident on mountain roads? Book an Easy Rider or private car.",
          "Grab is limited in remote park areas — pre-arrange transport in high season.",
          "Easy Rider spots are limited daily — book early via WhatsApp.",
        ]),
        new Paragraph({ children: [new PageBreak()] }),

        // —— 7. Classic tours ——
        title("7. National Classic Tours", HeadingLevel.HEADING_1),
        subtitle("Easy, relaxed & must-see cave experiences"),
        body(
          "Perfect for cave lovers with limited time — iconic Phong Nha caves without complicated planning. All tours include optional FREE shuttle to Duck Tang Farm (Bong Lai Valley)."
        ),
        new Paragraph({ spacing: sp(160) }),
        table(["Tour", "Timing", "Price (VND)"], CLASSIC_TOURS, [40, 40, 20]),
        new Paragraph({ spacing: sp(200) }),
        ...callout("Why book with Green Riverside?", [
          "Local expert support · Fast WhatsApp booking",
          "Honest recommendations · Flexible combinations",
          "Help with transport & timing",
        ]),
        new Paragraph({ children: [new PageBreak()] }),

        // —— 8. Adventure ——
        title("8. Adventure Cave Tours", HeadingLevel.HEADING_1),
        subtitle("The Kingdom of Caves — caving capital of Southeast Asia"),
        body(
          "Join small-group adventure tours: jungle trekking, stream wading, remote villages, rock climbing, underground swimming, paddle boarding, and overnight camping in caves."
        ),
        new Paragraph({ spacing: sp(160) }),
        table(
          ["Tour", "Timing", "Level", "Price (VND)"],
          ADVENTURE_TOURS,
          [35, 25, 15, 25]
        ),
        new Paragraph({ spacing: sp(240) }),
        quote("Your unforgettable Phong Nha adventure starts here."),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 400 },
          children: [
            new TextRun({
              text: "Green Riverside Cosy Home · Phong Nha, Vietnam",
              font,
              bold: true,
              size: 24,
              color: GREEN,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 80 },
          children: [
            new TextRun({
              text: "WhatsApp Ms. Linh for booking, itinerary & local tips",
              font,
              size: 22,
              color: MUTED,
            }),
          ],
        }),
      ],
    },
  ],
});

const outPath = path.join(
  os.homedir(),
  "Downloads",
  "Green Riverside Cosy Home - Brand Guide.docx"
);

const buffer = await Packer.toBuffer(doc);
fs.writeFileSync(outPath, buffer);
console.log(`\nCreated: ${outPath}\n`);

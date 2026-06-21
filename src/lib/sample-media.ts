/** Local sample photography in /public/images/samples/ (run: npm run images:fetch). */

function local(name: string) {
  return `/images/samples/${name}.webp`;
}

export const SAMPLE_IMAGES = {
  homestay: local("homestay"),
  river: local("river"),
  rooftop: local("rooftop"),
  room: local("room"),
  roomAlt: local("room-alt"),
  cave: local("cave"),
  caveAlt: local("cave-alt"),
  jungle: local("jungle"),
  garden: local("garden"),
  boat: local("boat"),
  mountains: local("mountains"),
  lunch: local("lunch"),
  sunset: local("sunset"),
  pool: local("pool"),
  community: local("community"),
} as const;

export const SAMPLE_TOUR = {
  hero: SAMPLE_IMAGES.cave,
  overview: SAMPLE_IMAGES.jungle,
  gallery: [
    SAMPLE_IMAGES.cave,
    SAMPLE_IMAGES.garden,
    SAMPLE_IMAGES.boat,
    SAMPLE_IMAGES.mountains,
    SAMPLE_IMAGES.jungle,
    SAMPLE_IMAGES.caveAlt,
    SAMPLE_IMAGES.river,
    SAMPLE_IMAGES.sunset,
  ],
  cta: SAMPLE_IMAGES.mountains,
} as const;

export const SAMPLE_ROOM_IMAGES = [
  SAMPLE_IMAGES.room,
  SAMPLE_IMAGES.roomAlt,
  SAMPLE_IMAGES.garden,
  SAMPLE_IMAGES.river,
];

export const SAMPLE_GALLERY = [
  { title: "Son River Morning", imageUrl: SAMPLE_IMAGES.river, category: "sunset" as const },
  { title: "Paradise Cave", imageUrl: SAMPLE_IMAGES.cave, category: "tours" as const },
  { title: "Rooftop Café", imageUrl: SAMPLE_IMAGES.rooftop, category: "cafe" as const },
  { title: "Jungle Trail", imageUrl: SAMPLE_IMAGES.jungle, category: "tours" as const },
  { title: "River Boat", imageUrl: SAMPLE_IMAGES.boat, category: "tours" as const },
  { title: "Guest Community", imageUrl: SAMPLE_IMAGES.community, category: "activities" as const },
  { title: "Limestone Peaks", imageUrl: SAMPLE_IMAGES.mountains, category: "nature" as const },
  { title: "Sunset Riverside", imageUrl: SAMPLE_IMAGES.sunset, category: "sunset" as const },
];

export const SAMPLE_ACTIVITY_IMAGES = [
  SAMPLE_IMAGES.lunch,
  SAMPLE_IMAGES.community,
  SAMPLE_IMAGES.rooftop,
  SAMPLE_IMAGES.pool,
];

export function withSampleTourImages(images: string[], galleryImages?: string[]) {
  const hero = images[0] || SAMPLE_TOUR.hero;
  const rest = images.slice(1);
  const gallery =
    galleryImages?.length || rest.length
      ? [...(galleryImages ?? []), ...rest].filter((url, i, arr) => arr.indexOf(url) === i)
      : [...SAMPLE_TOUR.gallery];

  return { hero, gallery: gallery.filter((url) => url !== hero) };
}

export function withSampleImages(images: string[], fallbacks: readonly string[]) {
  if (images.length) return images;
  return [...fallbacks];
}

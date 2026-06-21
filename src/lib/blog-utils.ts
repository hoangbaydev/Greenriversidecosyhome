export interface BlogHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export function estimateReadingTime(html: string, wpm = 200): number {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / wpm));
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function extractHeadings(html: string): BlogHeading[] {
  const headings: BlogHeading[] = [];
  const regex = /<(h[23])[^>]*>(.*?)<\/\1>/gi;
  let match: RegExpExecArray | null;
  const usedIds = new Set<string>();

  while ((match = regex.exec(html)) !== null) {
    const level = match[1] === "h2" ? 2 : 3;
    const text = stripHtml(match[2]);
    if (!text) continue;

    let id = slugifyHeading(text);
    let suffix = 2;
    while (usedIds.has(id)) {
      id = `${slugifyHeading(text)}-${suffix++}`;
    }
    usedIds.add(id);
    headings.push({ id, text, level });
  }

  return headings;
}

export function injectHeadingIds(html: string, headings: BlogHeading[]): string {
  let index = 0;
  return html.replace(/<(h[23])([^>]*)>(.*?)<\/\1>/gi, (full, tag, attrs, inner) => {
    const heading = headings[index];
    index += 1;
    if (!heading) return full;
    if (/\bid=/.test(attrs)) return full;
    return `<${tag}${attrs} id="${heading.id}">${inner}</${tag}>`;
  });
}

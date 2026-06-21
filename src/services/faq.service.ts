import {
  getCollection,
  getDocument,
  setDocument,
  removeDocument,
  FIRESTORE_COLLECTIONS,
} from "@/lib/firebase/firestore";
import type { Locale } from "@/lib/i18n/config";
import type { Faq, FaqContent } from "@/types";

const META_COL = FIRESTORE_COLLECTIONS.faqContent;
const FAQ_COL = FIRESTORE_COLLECTIONS.faqs;

function byOrder(a: Faq, b: Faq): number {
  return (a.order ?? 0) - (b.order ?? 0);
}

export async function fetchFaqSection(locale: Locale): Promise<Pick<FaqContent, "title" | "subtitle"> | null> {
  const doc = await getDocument<FaqContent>(META_COL, locale);
  if (!doc) return null;
  return { title: doc.title ?? "", subtitle: doc.subtitle };
}

export async function saveFaqSection(
  locale: Locale,
  data: Pick<FaqContent, "title" | "subtitle">
): Promise<void> {
  await setDocument(META_COL, locale, { locale, ...data, items: [] }, { merge: true });
}

export async function fetchFaqsByLocale(locale: Locale): Promise<Faq[]> {
  const all = await getCollection<Faq>(FAQ_COL);
  return all.filter((f) => f.locale === locale).sort(byOrder);
}

export async function fetchAllFaqs(): Promise<Faq[]> {
  const all = await getCollection<Faq>(FAQ_COL);
  return all.sort(byOrder);
}

export async function saveFaq(id: string, data: Omit<Faq, "id">): Promise<void> {
  await setDocument(FAQ_COL, id, { ...data, id });
}

export async function deleteFaq(id: string): Promise<void> {
  await removeDocument(FAQ_COL, id);
}

/** @deprecated Use fetchFaqSection + fetchFaqsByLocale in admin */
export async function fetchFaqContent(locale: Locale): Promise<FaqContent | null> {
  const section = await fetchFaqSection(locale);
  const items = await fetchFaqsByLocale(locale);
  const legacy = await getDocument<FaqContent>(META_COL, locale);

  const mergedItems =
    items.length > 0
      ? items.map(({ question, answer, order }) => ({ question, answer, order }))
      : (legacy?.items ?? []);

  if (!section?.title && !mergedItems.length) return null;

  return {
    title: section?.title ?? legacy?.title ?? "",
    subtitle: section?.subtitle ?? legacy?.subtitle,
    items: mergedItems,
  };
}

/** @deprecated Use saveFaqSection + saveFaq */
export async function saveFaqContent(locale: Locale, data: FaqContent): Promise<void> {
  await saveFaqSection(locale, { title: data.title, subtitle: data.subtitle });
  for (const [index, item] of data.items.entries()) {
    const id = `${locale}_${index}_${item.question.slice(0, 20).replace(/\W/g, "") || index}`;
    await saveFaq(id, {
      locale,
      question: item.question,
      answer: item.answer,
      order: item.order ?? index,
      published: true,
    });
  }
}

import { buildFaqPageSchema } from "@/lib/faq/schema";
import type { FaqContent } from "@/types";
import { JsonLd } from "@/components/seo/JsonLd";

export function FaqJsonLd({ faq }: { faq: FaqContent | null }) {
  const schema = buildFaqPageSchema(faq);
  if (!schema) return null;
  return <JsonLd data={schema} />;
}

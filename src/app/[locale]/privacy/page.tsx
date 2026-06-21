import { PageHero, Section } from "@/components/ui/section";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { getPageContext } from "@/lib/i18n/get-dictionary";
import { createLocalizedMetadata, localizedBreadcrumb } from "@/lib/i18n/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = await getPageContext(params);
  const p = dict.pages.privacy;
  return createLocalizedMetadata(locale, {
    title: p.metaTitle,
    description: p.metaDescription,
    path: "/privacy",
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = await getPageContext(params);
  const p = dict.pages.privacy;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          localizedBreadcrumb(locale, [
            { name: dict.nav.home, path: "/" },
            { name: p.title, path: "/privacy" },
          ])
        )}
      />
      <PageHero title={p.title} />
      <Section narrow>
        <div className="prose-content">
          <p>{p.body}</p>
        </div>
      </Section>
    </>
  );
}

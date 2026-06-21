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
  const t = dict.pages.terms;
  return createLocalizedMetadata(locale, {
    title: t.metaTitle,
    description: t.metaDescription,
    path: "/terms",
  });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = await getPageContext(params);
  const t = dict.pages.terms;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          localizedBreadcrumb(locale, [
            { name: dict.nav.home, path: "/" },
            { name: t.title, path: "/terms" },
          ])
        )}
      />
      <PageHero title={t.title} />
      <Section narrow>
        <div className="prose-content">
          <p>{t.body}</p>
        </div>
      </Section>
    </>
  );
}

import { notFound } from "next/navigation";
import { getDictionary } from "../../lib/dictionary";
import { isLocale } from "../../lib/site";
import { LegalPage } from "../../components/legal-page";
import { LEGAL_UPDATED } from "../../lib/legal";

export default async function TermsPage({
  params,
}: {
  params: { lang: string };
}) {
  if (!isLocale(params.lang)) notFound();
  const dict = await getDictionary(params.lang);

  return (
    <LegalPage
      lang={params.lang}
      title={dict.legal.terms.title}
      updated={LEGAL_UPDATED}
      updatedLabel={dict.legal.updated}
      backLabel={dict.legal.backHome}
      sections={dict.legal.terms.sections}
    />
  );
}

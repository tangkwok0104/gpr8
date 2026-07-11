import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "../lib/dictionary";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { LOCALES, isLocale, SITE } from "../lib/site";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  if (!isLocale(params.lang)) return {};
  const dict = await getDictionary(params.lang);

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `${SITE.url}/${params.lang}`,
      languages: { en: `${SITE.url}/en`, "zh-Hant": `${SITE.url}/zh` },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `${SITE.url}/${params.lang}`,
      siteName: dict.company.name,
      locale: params.lang === "zh" ? "zh_HK" : "en_US",
      type: "website",
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang;
  const dict = await getDictionary(lang);

  // Tells Google this is a real business with a real address — the kind of signal a
  // bullion dealer needs and the old site never emitted.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: dict.company.name,
    url: `${SITE.url}/${lang}`,
    email: SITE.email,
    telephone: SITE.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address[lang],
      addressLocality: "Hong Kong",
      addressCountry: "HK",
    },
  };

  return (
    <div lang={lang === "zh" ? "zh-Hant-HK" : "en"} className="flex min-h-screen flex-col">
      {/* JSON.stringify does not escape "</script>", so a future dictionary edit could
          otherwise break out of this tag. Escaping "<" closes that off permanently. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader lang={lang} dict={dict} />
      <main className="flex-1">{children}</main>
      <SiteFooter lang={lang} dict={dict} />
    </div>
  );
}

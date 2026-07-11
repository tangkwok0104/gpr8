import { notFound } from "next/navigation";
import { getDictionary } from "../../lib/dictionary";
import { isLocale } from "../../lib/site";

export default async function AboutPage({
  params,
}: {
  params: { lang: string };
}) {
  if (!isLocale(params.lang)) notFound();
  const dict = await getDictionary(params.lang);

  return (
    <div className="mx-auto max-w-page px-6 py-20 lg:py-28">
      <div className="max-w-3xl">
        <p className="eyebrow">{dict.about.eyebrow}</p>
        <h1 className="mt-6 font-display text-5xl font-bold leading-tight text-ink sm:text-6xl">
          {dict.about.title}
        </h1>
        <p className="mt-8 text-lg leading-relaxed text-muted">
          {dict.about.lead}
        </p>
      </div>

      <div className="rule-gold mt-14" />

      <div className="mt-14 grid gap-12 md:grid-cols-3">
        {dict.about.sections.map((section) => (
          <section key={section.title}>
            <h2 className="font-display text-2xl font-bold leading-snug text-ink">
              {section.title}
            </h2>
            <p className="mt-4 leading-relaxed text-muted">{section.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}

import Link from "next/link";
import type { Locale } from "../lib/site";

type Section = { title: string; body: string };

export function LegalPage({
  lang,
  title,
  updated,
  updatedLabel,
  backLabel,
  sections,
}: {
  lang: Locale;
  title: string;
  updated: string;
  updatedLabel: string;
  backLabel: string;
  sections: Section[];
}) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 lg:py-28">
      <h1 className="font-display text-5xl font-bold leading-tight">{title}</h1>
      <p className="mt-4 text-sm text-muted">
        {updatedLabel} <span className="tabular">{updated}</span>
      </p>

      <div className="rule-gold mt-10" />

      <div className="mt-12 space-y-12">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="font-display text-2xl font-bold">{section.title}</h2>
            <p className="mt-4 leading-relaxed text-muted">{section.body}</p>
          </section>
        ))}
      </div>

      <Link
        href={`/${lang}`}
        className="mt-16 inline-block text-sm text-muted transition-colors hover:text-gold-bright"
      >
        ← {backLabel}
      </Link>
    </div>
  );
}

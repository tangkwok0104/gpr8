import Link from "next/link";
import { Mark } from "./logo";
import { SITE, type Locale } from "../lib/site";

type Dict = {
  company: { name: string };
  nav: { home: string; about: string; contact: string };
  footer: {
    blurb: string;
    navTitle: string;
    contactTitle: string;
    legalTitle: string;
    privacy: string;
    terms: string;
    rights: string;
    disclaimer: string;
  };
  contact: { info: { emailLabel: string; phoneLabel: string } };
};

export function SiteFooter({ lang, dict }: { lang: Locale; dict: Dict }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-gold/10 bg-surface/40">
      <div className="mx-auto max-w-page px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Mark className="h-7 w-7" />
              <span className="font-display text-lg font-bold tracking-wide">
                GPR
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {dict.footer.blurb}
            </p>
          </div>

          <div>
            <h3 className="eyebrow">{dict.footer.navTitle}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href={`/${lang}`} className="link">
                  {dict.nav.home}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/about`} className="link">
                  {dict.nav.about}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/contact`} className="link">
                  {dict.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="eyebrow">{dict.footer.contactTitle}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href={`mailto:${SITE.email}`} className="link break-all">
                  {SITE.email}
                </a>
              </li>
              <li>
                <a href={`tel:${SITE.phoneHref}`} className="link tabular">
                  {SITE.phone}
                </a>
              </li>
              <li className="pt-1 text-xs leading-relaxed text-muted">
                {SITE.address[lang]}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="eyebrow">{dict.footer.legalTitle}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href={`/${lang}/privacy`} className="link">
                  {dict.footer.privacy}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/terms`} className="link">
                  {dict.footer.terms}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-subtle/40 pt-8">
          <p className="max-w-3xl text-xs leading-relaxed text-muted/80">
            {dict.footer.disclaimer}
          </p>
          <p className="mt-4 text-xs text-muted/60">
            © {year} {dict.company.name}. {dict.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}

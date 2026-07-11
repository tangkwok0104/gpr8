import Link from "next/link";
import { Logo } from "./logo";
import { LanguageSwitcher } from "./language-switcher";
import type { Locale } from "../lib/site";

type Dict = {
  company: { name: string };
  nav: { home: string; bullion: string; about: string; contact: string };
};

export function SiteHeader({ lang, dict }: { lang: Locale; dict: Dict }) {
  const links = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}#bullion`, label: dict.nav.bullion },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gold/10 bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-page items-center gap-6 px-6">
        <Link href={`/${lang}`} className="shrink-0">
          <Logo name={dict.company.name} />
        </Link>

        <nav className="ml-auto hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[0.8rem] font-medium uppercase tracking-widest text-muted transition-colors hover:text-gold-bright"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto md:ml-0">
          <LanguageSwitcher lang={lang} />
        </div>
      </div>
    </header>
  );
}

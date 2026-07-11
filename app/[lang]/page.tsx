import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "../lib/dictionary";
import { getSpotPrices } from "../lib/spot";
import { SpotPanel } from "../components/spot-panel";
import { isLocale } from "../lib/site";

export default async function HomePage({
  params,
}: {
  params: { lang: string };
}) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang;
  const [dict, prices] = await Promise.all([
    getDictionary(lang),
    getSpotPrices(),
  ]);

  const specs = [
    { label: dict.product.specs.weightLabel, value: dict.product.specs.weightValue },
    { label: dict.product.specs.finenessLabel, value: dict.product.specs.finenessValue },
    { label: dict.product.specs.refinersLabel, value: dict.product.specs.refinersValue },
    { label: dict.product.specs.serialLabel, value: dict.product.specs.serialValue },
  ];

  return (
    <>
      {/* Hero */}
      <section>
        <div className="mx-auto grid max-w-page items-center gap-12 px-6 py-20 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:py-28">
          <div>
            <p className="eyebrow">{dict.hero.eyebrow}</p>
            <h1 className="mt-6 text-balance font-display text-5xl font-bold leading-[1.08] tracking-tight text-ink sm:text-6xl">
              {dict.hero.titleTop}
              <br />
              <span className="text-gold">{dict.hero.titleBottom}</span>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted">
              {dict.hero.body}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href={`/${lang}/contact`} className="btn-primary">
                {dict.hero.primary}
              </Link>
              <Link href={`/${lang}#how`} className="btn-ghost">
                {dict.hero.secondary}
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-sm border border-line shadow-sm shadow-ink/5">
            <Image
              src="/img/hero-bullion.webp"
              alt=""
              width={1376}
              height={768}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      {/* Reference prices */}
      <section id="bullion" className="scroll-mt-24">
        <div className="mx-auto max-w-page px-6 py-8">
          <SpotPanel prices={prices} dict={dict} lang={lang} />
        </div>
      </section>

      {/* The bar */}
      <section className="mx-auto max-w-page px-6 py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative min-h-[20rem] overflow-hidden rounded-sm border border-line shadow-sm shadow-ink/5">
            <Image
              src="/img/bullion-1kg.webp"
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="eyebrow">{dict.product.eyebrow}</p>
            <h2 className="mt-5 font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
              {dict.product.title}
            </h2>
            <p className="mt-6 leading-relaxed text-muted">{dict.product.body}</p>

            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-line bg-line">
              {specs.map((spec) => (
                <div key={spec.label} className="bg-card px-5 py-4">
                  <dt className="text-[0.68rem] uppercase tracking-widest text-muted">
                    {spec.label}
                  </dt>
                  <dd className="tabular mt-1.5 font-display text-lg font-bold text-ink">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section id="how" className="scroll-mt-24 border-y border-line bg-well/40">
        <div className="mx-auto max-w-page px-6 py-20 lg:py-28">
          <h2 className="font-display text-4xl font-bold text-ink sm:text-5xl">
            {dict.pillars.title}
          </h2>
          <div className="rule-gold mt-8" />

          <div className="mt-12 grid gap-x-12 gap-y-12 md:grid-cols-2">
            {dict.pillars.items.map((item, i) => (
              <div key={item.title} className="flex gap-6">
                <span className="tabular shrink-0 font-display text-2xl font-bold text-gold-fill">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-bold leading-snug text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-page px-6 py-24 text-center lg:py-32">
        <h2 className="mx-auto max-w-2xl font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
          {dict.cta.title}
        </h2>
        <p className="mx-auto mt-6 max-w-xl leading-relaxed text-muted">
          {dict.cta.body}
        </p>
        <Link href={`/${lang}/contact`} className="btn-primary mt-10">
          {dict.cta.button}
        </Link>
      </section>
    </>
  );
}

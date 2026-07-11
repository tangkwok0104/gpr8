import { notFound } from "next/navigation";
import { getDictionary } from "../../lib/dictionary";
import { SITE, isLocale } from "../../lib/site";
import { ContactForm } from "../../components/contact-form";
import {
  MailIcon,
  PhoneIcon,
  ChatIcon,
  PinIcon,
  ClockIcon,
} from "../../components/icons";

export default async function ContactPage({
  params,
}: {
  params: { lang: string };
}) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang;
  const dict = await getDictionary(lang);
  const info = dict.contact.info;

  return (
    <div className="mx-auto max-w-page px-6 py-20 lg:py-28">
      <div className="max-w-3xl">
        <p className="eyebrow">{dict.contact.eyebrow}</p>
        <h1 className="mt-6 font-display text-5xl font-bold leading-tight text-ink sm:text-6xl">
          {dict.contact.title}
        </h1>
        <p className="mt-8 text-lg leading-relaxed text-muted">
          {dict.contact.lead}
        </p>
      </div>

      <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        {/* Direct channels. Email leads — it is the thing that was missing. */}
        <div>
          <h2 className="eyebrow">{info.title}</h2>
          <div className="rule-gold mt-5" />

          <dl className="mt-8 space-y-7">
            <div className="flex gap-4">
              <MailIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <div>
                <dt className="text-[0.68rem] uppercase tracking-widest text-muted">
                  {info.emailLabel}
                </dt>
                <dd className="mt-1.5">
                  <a
                    href={`mailto:${SITE.email}`}
                    className="break-all font-display text-xl font-bold text-ink transition-colors hover:text-gold"
                  >
                    {SITE.email}
                  </a>
                </dd>
              </div>
            </div>

            <div className="flex gap-4">
              <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <div>
                <dt className="text-[0.68rem] uppercase tracking-widest text-muted">
                  {info.phoneLabel}
                </dt>
                <dd className="mt-1.5">
                  <a
                    href={`tel:${SITE.phoneHref}`}
                    className="tabular font-display text-xl font-bold text-ink transition-colors hover:text-gold"
                  >
                    {SITE.phone}
                  </a>
                </dd>
              </div>
            </div>

            <div className="flex gap-4">
              <ChatIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <div>
                <dt className="text-[0.68rem] uppercase tracking-widest text-muted">
                  {info.messagingLabel}
                </dt>
                <dd className="tabular mt-1.5 text-ink">{SITE.phone}</dd>
              </div>
            </div>

            <div className="flex gap-4">
              <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <div>
                <dt className="text-[0.68rem] uppercase tracking-widest text-muted">
                  {info.addressLabel}
                </dt>
                <dd className="mt-1.5 leading-relaxed text-ink">
                  {SITE.address[lang]}
                </dd>
              </div>
            </div>

            <div className="flex gap-4">
              <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <div>
                <dt className="text-[0.68rem] uppercase tracking-widest text-muted">
                  {info.hoursLabel}
                </dt>
                <dd className="mt-1.5 text-ink">{info.hoursValue}</dd>
              </div>
            </div>
          </dl>
        </div>

        <div className="rounded-sm border border-line bg-card p-8 shadow-sm shadow-ink/[0.03] lg:p-10">
          <h2 className="font-display text-2xl font-bold text-ink">
            {dict.contact.form.title}
          </h2>
          <div className="mt-8">
            <ContactForm dict={dict} lang={lang} />
          </div>
        </div>
      </div>
    </div>
  );
}

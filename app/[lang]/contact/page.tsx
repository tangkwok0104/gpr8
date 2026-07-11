import { notFound } from "next/navigation";
import { getDictionary } from "../../lib/dictionary";
import { SITE, isLocale } from "../../lib/site";
import {
  MailIcon,
  PhoneIcon,
  ChatIcon,
  PinIcon,
  ClockIcon,
} from "../../components/icons";

/**
 * No contact form, by design.
 *
 * A form here would only forward to the very address printed on this page, so it adds a
 * mail provider, an API route, a bot-spam surface, and a silent failure mode — in
 * exchange for nothing. The email, the phone and WeChat/WhatsApp ARE the contact path.
 * A dead form is worse than no form.
 */
export default async function ContactPage({
  params,
}: {
  params: { lang: string };
}) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang;
  const dict = await getDictionary(lang);
  const info = dict.contact.info;

  const rows = [
    {
      icon: <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />,
      label: info.phoneLabel,
      value: (
        <a
          href={`tel:${SITE.phoneHref}`}
          className="tabular font-display text-xl font-bold text-ink transition-colors hover:text-gold"
        >
          {SITE.phone}
        </a>
      ),
    },
    {
      icon: <ChatIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />,
      label: info.messagingLabel,
      value: <span className="tabular text-ink">{SITE.phone}</span>,
    },
    {
      icon: <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />,
      label: info.addressLabel,
      value: (
        <span className="leading-relaxed text-ink">{SITE.address[lang]}</span>
      ),
    },
    {
      icon: <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />,
      label: info.hoursLabel,
      value: <span className="text-ink">{info.hoursValue}</span>,
    },
  ];

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

      <div className="mt-16 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        {/* Email leads — it is the thing the old site never showed at all. */}
        <div className="rounded-sm border border-line bg-card p-8 shadow-sm shadow-ink/[0.03] lg:p-10">
          <div className="flex gap-4">
            <MailIcon className="mt-1 h-5 w-5 shrink-0 text-gold" />
            <div className="min-w-0">
              <p className="text-[0.68rem] uppercase tracking-widest text-muted">
                {info.emailLabel}
              </p>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-2 block break-all font-display text-3xl font-bold leading-tight text-ink transition-colors hover:text-gold sm:text-4xl"
              >
                {SITE.email}
              </a>
            </div>
          </div>

          <p className="mt-6 leading-relaxed text-muted">
            {dict.contact.emailBody}
          </p>

          <a href={`mailto:${SITE.email}`} className="btn-primary mt-8 w-full">
            {dict.contact.emailCta}
          </a>
        </div>

        <div>
          <h2 className="eyebrow">{info.title}</h2>
          <div className="rule-gold mt-5" />

          <dl className="mt-8 space-y-7">
            {rows.map((row) => (
              <div key={row.label} className="flex gap-4">
                {row.icon}
                <div>
                  <dt className="text-[0.68rem] uppercase tracking-widest text-muted">
                    {row.label}
                  </dt>
                  <dd className="mt-1.5">{row.value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

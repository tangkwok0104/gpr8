"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE, type Locale } from "../lib/site";

type Dict = {
  contact: {
    form: {
      name: string;
      email: string;
      message: string;
      submit: string;
      sending: string;
      success: string;
      error: string;
      consent: string;
      consentSuffix: string;
    };
  };
  footer: { privacy: string };
};

type Status = "idle" | "sending" | "sent" | "failed";

export function ContactForm({ dict, lang }: { dict: Dict; lang: Locale }) {
  const [status, setStatus] = useState<Status>("idle");
  const f = dict.contact.form;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      // Never silently swallow a failed send: the user is told, and handed the email
      // address so their enquiry isn't lost to a dead form.
      setStatus("failed");
    }
  }

  if (status === "sent") {
    return (
      <p className="rounded-sm border border-positive/30 bg-positive/5 px-5 py-4 text-sm leading-relaxed text-ink">
        {f.success}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot: invisible to humans, irresistible to bots. The server drops any
          submission that fills it. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="company_website">Do not fill this in</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="name" className="sr-only">
          {f.name}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={100}
          autoComplete="name"
          placeholder={f.name}
          className="field"
        />
      </div>

      <div>
        <label htmlFor="email" className="sr-only">
          {f.email}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={200}
          autoComplete="email"
          placeholder={f.email}
          className="field"
        />
      </div>

      <div>
        <label htmlFor="message" className="sr-only">
          {f.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={4000}
          placeholder={f.message}
          className="field resize-y"
        />
      </div>

      {status === "failed" && (
        <p className="rounded-sm border border-negative/30 bg-negative/5 px-5 py-4 text-sm leading-relaxed text-ink">
          {f.error}{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="font-medium text-gold transition-colors hover:text-gold-hover"
          >
            {SITE.email}
          </a>
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary w-full"
      >
        {status === "sending" ? f.sending : f.submit}
      </button>

      <p className="text-xs leading-relaxed text-muted">
        {f.consent}{" "}
        <Link
          href={`/${lang}/privacy`}
          className="text-gold transition-colors hover:text-gold-hover"
        >
          {dict.footer.privacy}
        </Link>
        {f.consentSuffix}
      </p>
    </form>
  );
}

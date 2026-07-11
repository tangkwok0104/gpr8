import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { SITE } from "../../lib/site";

export const runtime = "nodejs";

const MAX_PER_WINDOW = 3;
const WINDOW_MS = 10 * 60 * 1000;

// Best-effort in-memory throttle. It resets when the instance recycles and isn't shared
// across instances, so it will not stop a determined attacker — it exists to blunt the
// obvious case (a bot hammering the form) without adding a database to a brochure site.
// If spam ever becomes real, the right fix is Cloudflare Turnstile, not a bigger map.
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  // Trusting x-forwarded-for is only safe because Vercel's edge sets it and a client
  // cannot spoof it. Behind a different proxy, an attacker could forge a fresh bucket
  // per request and walk straight through the throttle below.
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Unable to send" }, { status: 400 });
  }

  // Honeypot. A human never sees this field, so anything in it is a bot. Return 200 so
  // the bot believes it succeeded and doesn't retry with a different strategy.
  if (typeof body.company_website === "string" && body.company_website !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  const valid =
    name.length > 0 &&
    name.length <= 100 &&
    email.length <= 200 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    message.length > 0 &&
    message.length <= 4000;

  if (!valid) {
    return NextResponse.json({ error: "Unable to send" }, { status: 400 });
  }

  // Throttle only what actually costs us a send. Counting rejected requests here would
  // mean a client who mistypes their email three times gets locked out for ten minutes —
  // punishing the human and not the bot.
  if (rateLimited(ip)) {
    // Generic message — never tell a bot why it was blocked.
    return NextResponse.json({ error: "Unable to send" }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set");
    return NextResponse.json({ error: "Unable to send" }, { status: 500 });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      // Must be a domain verified in Resend. Falls back to Resend's shared sender only
      // if the env var is absent, which is a testing-only path — a shared sender will
      // land in spam or be refused for real traffic.
      from: process.env.CONTACT_FROM ?? "onboarding@resend.dev",
      to: SITE.email,
      replyTo: email,
      subject: `Website enquiry — ${name}`,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
      `,
    });

    if (error) {
      console.error("[contact] resend rejected the send", error);
      return NextResponse.json({ error: "Unable to send" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] send threw", err);
    return NextResponse.json({ error: "Unable to send" }, { status: 500 });
  }
}

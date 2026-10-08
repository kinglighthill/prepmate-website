import { NextRequest, NextResponse } from "next/server";
import { API_BASE, SITE_URL, cleanRef } from "../../../lib/socialAuth";

export const dynamic = "force-dynamic";

const bad = (message: string, status = 400) =>
  NextResponse.json({ message }, { status });

export async function POST(req: NextRequest) {
  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return bad("Invalid request.");
  }

  const fullName = String(b.full_name ?? "").trim();
  const email = String(b.email ?? "")
    .trim()
    .toLowerCase();
  const password = String(b.password ?? "");
  const phone = String(b.phone_number ?? "").trim();
  const country = String(b.country ?? "NG").toUpperCase();
  const ref = cleanRef(String(b.referrer_code ?? ""));

  if (fullName.length < 2) return bad("Enter your full name.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return bad("Enter a valid email address.");
  if (password.length < 6)
    return bad("Password must be at least 6 characters.");

  const res = await fetch(`${API_BASE}/api/v1/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      x_client_app_name: process.env.APP_NAME ?? "",
      x_client_app_version: "web",
      x_client_db_version: "0",
      platform: "web",
    },
    body: JSON.stringify({
      app_slug: process.env.APP_SLUG ?? "prepmate",
      email,
      password,
      full_name: fullName,
      phone_number: phone,
      country,
      fcm_token: "", // no push token on web
      profile_pic_url: null,
      email_verified: false,
      device_info: null,
      referrer_info: {
        app_install_time: null,
        instant_experience_launched: false,
        referrer_click_time: ref ? Date.now() : null,
        referrer_code: ref || null,
        referrer_url: req.headers.get("referer") ?? `${SITE_URL}/signup`,
      },
    }),
    cache: "no-store",
  }).catch(() => null);

  if (!res) return bad("We couldn't reach the server. Please try again.", 502);

  const json = (await res.json().catch(() => null)) as {
    message?: string;
  } | null;

  console.log("Signup response:", res.status, json);

  if (!res.ok) {
    const message =
      res.status < 500 && typeof json?.message === "string"
        ? json.message
        : "We couldn't create your account. Please try again.";
    return bad(message, res.status < 500 ? res.status : 502);
  }

  return NextResponse.json({ ok: true });
}

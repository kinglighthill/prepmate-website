import { NextRequest, NextResponse } from "next/server";
import {
  API_BASE,
  SITE_URL,
  STATE_COOKIE,
  isProvider,
  redirectUri,
  type Provider,
} from "../../../../lib/socialAuth";

export const dynamic = "force-dynamic";

type Params = Promise<{ provider: string }>;

export async function GET(req: NextRequest, { params }: { params: Params }) {
  return handle(req, (await params).provider, req.nextUrl.searchParams);
}

export async function POST(req: NextRequest, { params }: { params: Params }) {
  return handle(req, (await params).provider, await req.formData());
}

const done = (path: string) => {
  const res = NextResponse.redirect(`${SITE_URL}${path}`, 303);
  res.cookies.set(STATE_COOKIE, "", { path: "/api/auth", maxAge: 0 });
  return res;
};
const fail = (code: string) => done(`/signup?error=${code}`);

async function handle(
  req: NextRequest,
  providerParam: string,
  data: URLSearchParams | FormData,
) {
  const get = (k: string) => {
    const v = data.get(k);
    return typeof v === "string" ? v : null;
  };

  try {
    if (!isProvider(providerParam)) return fail("failed");
    const provider: Provider = providerParam;

    const raw = req.cookies.get(STATE_COOKIE)?.value;
    if (!raw) return fail("expired");
    const saved = JSON.parse(raw) as {
      provider: Provider;
      state: string;
      ref: string;
    };
    if (saved.provider !== provider || saved.state !== get("state")) {
      return fail("failed");
    }

    if (get("error")) return fail("cancelled");

    const authCode = get("code");
    if (!authCode) return fail("failed");

    const common = {
      app_slug: process.env.APP_SLUG ?? "prepmate",
      country: "NG",
      fcm_token: "",
      auth_code: authCode,
      device_info: null,
      referrer_info: {
        app_install_time: null,
        instant_experience_launched: false,
        referrer_click_time: saved.ref ? Date.now() : null,
        referrer_code: saved.ref || null,
        referrer_url: req.headers.get("platform") ?? `${SITE_URL}/signup`,
      },
    };

    const body =
      provider === "google"
        ? { ...common, redirect_uri: redirectUri("google") }
        : common;

    const res = await fetch(`${API_BASE}/api/v1/signup/${provider}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        x_client_app_name: process.env.APP_NAME ?? "",
        x_client_app_version: "web",
        x_client_db_version: "1",
        platform: req.headers.get("platform") ?? "web",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    if (res.status === 409) return fail("exists");
    if (!res.ok) return fail("failed");

    return done("/signup?status=success");
  } catch (e) {
    console.error("social signup failed:", e);
    return fail("failed");
  }
}

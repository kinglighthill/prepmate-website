import { NextRequest, NextResponse } from "next/server";
import {
  API_BASE,
  SITE_URL,
  STATE_COOKIE,
  isProvider,
  redirectUri,
  signupPath,
  webDeviceInfo,
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
type Ctx = { platform?: string; ref?: string };

async function handle(
  req: NextRequest,
  providerParam: string,
  data: URLSearchParams | FormData,
) {
  const get = (k: string) => {
    const v = data.get(k);
    return typeof v === "string" ? v : null;
  };

  let ctx: Ctx = {};
  const fail = (code: string) => done(signupPath(ctx, { error: code }));

  try {
    const raw = req.cookies.get(STATE_COOKIE)?.value;
    const saved = raw
      ? (JSON.parse(raw) as {
          provider: Provider;
          state: string;
          ref: string;
          platform?: string;
        })
      : null;
    if (saved) ctx = { platform: saved.platform, ref: saved.ref };

    if (!isProvider(providerParam)) return fail("failed");
    const provider: Provider = providerParam;

    if (!saved) return fail("expired");
    if (saved.provider !== provider || saved.state !== get("state")) {
      return fail("failed");
    }

    if (get("error")) return fail("cancelled");

    const authCode = get("code");
    if (!authCode) return fail("failed");

    const common = {
      app_slug: null,
      country: "nigeria",
      fcm_token: "",
      auth_code: authCode,
      device_info: webDeviceInfo(req.headers.get("user-agent")),
      referrer_info: {
        app_install_time: null,
        instant_experience_launched: false,
        referrer_click_time: saved.ref ? Date.now() : null,
        referrer_code: saved.ref || null,
        referrer_url: saved.platform ?? `${SITE_URL}/signup`,
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
        platform: "website",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    if (res.status === 409) return fail("exists");
    if (!res.ok) return fail("failed");

    return done(signupPath(ctx, { status: "success" }));
  } catch (e) {
    console.error("social signup failed:", e);
    return fail("failed");
  }
}

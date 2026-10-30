import { randomUUID } from "crypto";
import type { NextResponse } from "next/server";
import { RESULT_COOKIE, type SignupResult } from "./signupResult";

export type Provider = "google" | "apple";

export const STATE_COOKIE = "pm_oauth";

export const SITE_URL = process.env.SITE_URL ?? "";
export const API_BASE = process.env.API_BASE_URL ?? "";

export const isProvider = (p: string): p is Provider =>
  p === "google" || p === "apple";

export const redirectUri = (p: Provider) =>
  p === "apple"
    ? `${API_BASE}/api/v1/signup/apple/callback`
    : `${SITE_URL}/api/auth/${p}/callback`;

export const APPLE_WEB_STATE_PREFIX = "web.";

export const cleanRef = (v: string | null | undefined): string => {
  const c = (v ?? "").trim().toUpperCase();
  return /^[A-Z0-9]{3,12}$/.test(c) ? c : "";
};

export const cleanPlatform = (v: string | null | undefined): string => {
  const c = (v ?? "").trim().toLowerCase();
  return /^[a-z]{1,20}$/.test(c) ? c : "";
};

export const signupPath = (ctx: { platform?: string; ref?: string }) => {
  const q = new URLSearchParams();
  if (ctx.platform) q.set("platform", ctx.platform);
  if (ctx.ref) q.set("ref", ctx.ref);
  const s = q.toString();
  return s ? `/signup?${s}` : "/signup";
};

// Read by app/signup/page.tsx. Success lasts 10 minutes so a refresh keeps the
// success screen; errors are cleared by SignupClient once shown.
export const setResult = (res: NextResponse, result: SignupResult) => {
  if ("message" in result && result.message) {
    result = { ...result, message: result.message.slice(0, 300) };
  }
  res.cookies.set(RESULT_COOKIE, JSON.stringify(result), {
    path: "/signup",
    maxAge: "status" in result ? 600 : 60,
    sameSite: "lax",
    secure: SITE_URL.startsWith("https://"),
  });
  return res;
};

export const webDeviceInfo = (userAgent: string | null) => {
  const ua = userAgent ?? "";
  const formFactor = /iPad|Tablet/i.test(ua)
    ? "tablet"
    : /Mobi|Android|iPhone/i.test(ua)
      ? "phone"
      : "desktop";
  return {
    api_level: 0,
    app_version_name: "web",
    device_id: randomUUID(),
    form_factor: formFactor,
    name: ua.slice(0, 255) || "web",
    platform: "website",
    version: "",
  };
};

export function authorizeUrl(
  p: Provider,
  state: string,
  nonce: string,
): string {
  if (p === "google") {
    const q = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID ?? "",
      redirect_uri: redirectUri("google"),
      response_type: "code",
      scope: "openid email profile",
      state,
      nonce,
      prompt: "select_account",
    });
    return `https://accounts.google.com/o/oauth2/v2/auth?${q}`;
  }

  const q = new URLSearchParams({
    client_id: process.env.APPLE_SERVICES_ID ?? "",
    redirect_uri: redirectUri("apple"),
    response_type: "code",
    response_mode: "form_post",
    scope: "name email",
    state,
    nonce,
  });
  return `https://appleid.apple.com/auth/authorize?${q}`;
}

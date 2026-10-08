export type Provider = "google" | "apple";

export const STATE_COOKIE = "pm_oauth";

export const SITE_URL = process.env.SITE_URL ?? "";
export const API_BASE = process.env.API_BASE_URL ?? "";

export const isProvider = (p: string): p is Provider =>
  p === "google" || p === "apple";

export const redirectUri = (p: Provider) =>
  `${SITE_URL}/api/auth/${p}/callback`;

export const cleanRef = (v: string | null | undefined): string => {
  const c = (v ?? "").trim().toUpperCase();
  return /^[A-Z0-9]{3,12}$/.test(c) ? c : "";
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

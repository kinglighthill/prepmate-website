// One-shot result of a social sign-up, handed from the OAuth callback to /signup
// in a short-lived cookie instead of the URL.
export const RESULT_COOKIE = "pm_signup_result";

export type SignupResult =
  | { status: "success" }
  | { error: string; message?: string };

export const parseResult = (raw: string | undefined): SignupResult | null => {
  if (!raw) return null;
  try {
    const v = JSON.parse(raw) as Record<string, unknown>;
    if (v.status === "success") return { status: "success" };
    if (typeof v.error === "string") {
      return {
        error: v.error,
        message: typeof v.message === "string" ? v.message : undefined,
      };
    }
  } catch {}
  return null;
};

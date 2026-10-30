import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import {
  APPLE_WEB_STATE_PREFIX,
  STATE_COOKIE,
  SITE_URL,
  authorizeUrl,
  cleanPlatform,
  cleanRef,
  isProvider,
  setResult,
  signupPath,
} from "../../../../lib/socialAuth";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ provider: string }> },
) {
  const { provider } = await params;
  const ref = cleanRef(req.nextUrl.searchParams.get("ref"));
  const platform = cleanPlatform(req.nextUrl.searchParams.get("platform"));

  if (!isProvider(provider)) {
    return setResult(
      NextResponse.redirect(`${SITE_URL}${signupPath({ platform, ref })}`, 303),
      { error: "failed" },
    );
  }

  const state =
    (provider === "apple" ? APPLE_WEB_STATE_PREFIX : "") +
    randomBytes(24).toString("base64url");
  const nonce = randomBytes(24).toString("base64url");

  const res = NextResponse.redirect(authorizeUrl(provider, state, nonce), 303);

  res.cookies.set(
    STATE_COOKIE,
    JSON.stringify({ provider, state, nonce, ref, platform }),
    {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/api/auth",
      maxAge: 600,
    },
  );
  return res;
}

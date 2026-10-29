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
    return NextResponse.redirect(
      `${SITE_URL}${signupPath({ platform, ref }, { error: "failed" })}`,
      303,
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

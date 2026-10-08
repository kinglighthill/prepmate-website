import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import {
  STATE_COOKIE,
  SITE_URL,
  authorizeUrl,
  cleanRef,
  isProvider,
} from "../../../../lib/socialAuth";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ provider: string }> },
) {
  const { provider } = await params;
  if (!isProvider(provider)) {
    return NextResponse.redirect(`${SITE_URL}/signup?error=failed`, 303);
  }

  const state = randomBytes(24).toString("base64url");
  const nonce = randomBytes(24).toString("base64url");
  const ref = cleanRef(req.nextUrl.searchParams.get("ref"));

  const res = NextResponse.redirect(authorizeUrl(provider, state, nonce), 303);

  res.cookies.set(
    STATE_COOKIE,
    JSON.stringify({ provider, state, nonce, ref }),
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

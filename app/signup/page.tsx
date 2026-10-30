// app/signup/page.tsx
import { Suspense } from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import  SignupClient  from "../components/SignupClient";
import { makeMetadata } from "../seo";
import { RESULT_COOKIE, parseResult } from "../lib/signupResult";

export const metadata: Metadata = makeMetadata({
  title: "Sign up",
  description: "Create your Prepmate account with Google or Apple.",
  path: "/signup",
  keywords: ["Prepmate sign up"],
});

export default async function SignupPage() {
  const result = parseResult((await cookies()).get(RESULT_COOKIE)?.value);

  return (
    <Suspense fallback={null}>
      <SignupClient result={result} />
    </Suspense>
  );
}

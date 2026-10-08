// app/signup/page.tsx
import { Suspense } from "react";
import type { Metadata } from "next";
import  SignupClient  from "../components/SignupClient";
import { makeMetadata } from "../seo";

export const metadata: Metadata = makeMetadata({
  title: "Sign up",
  description: "Create your Prepmate account with Google or Apple.",
  path: "/signup",
  keywords: ["Prepmate sign up"],
});

export default function SignupPage() {
  return (
    <Suspense fallback={null}>
      <SignupClient />
    </Suspense>
  );
}
"use client";

import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { APP_LINKS } from "../lib/appLinks";

import Navbar from "./Navbar";
import Footer from "./Footer";
import styles from "./SignupClient.module.css";
import { platform } from "os";

const REFERRAL_RE = /^[A-Z0-9]{3,12}$/;

const ERRORS: Record<string, string> = {
  cancelled: "Sign-up was cancelled. You can try again.",
  expired: "That sign-in took too long. Please try again.",
  exists:
    "An account with this email already exists. Log in on the Prepmate app.",
  failed: "We couldn't complete sign-up. Please try again.",
};

export default function SignupClient() {
  const params = useSearchParams();

  const platform = useMemo(
    () => (params.get("platform") ?? "").trim(),
    [params],
  );

  const initialRef = useMemo(
    () => (params.get("ref") ?? "").trim().toUpperCase(),
    [params],
  );

  const success = params.get("status") === "success";
  const [created, setCreated] = useState(false);

  if (success || created) {
    return (
      <main className={styles.main}>
        <Navbar />
        <Success platform={platform} />
        <Footer />
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <Navbar minimal={true} />
      <Form initialRef={initialRef} setCreated={setCreated} />
      <Footer minimal={true} />
    </main>
  );
}

function Form({
  initialRef,
  setCreated,
}: {
  initialRef: string;
  setCreated: Dispatch<SetStateAction<boolean>>;
}) {
  const params = useSearchParams();

  const locked = REFERRAL_RE.test(initialRef);
  const errorCode = params.get("error");

  const [referral, setReferral] = useState(locked ? initialRef : "");
  const [showReferral, setShowReferral] = useState(locked);
  const [navigating, setNavigating] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const referralInvalid = referral !== "" && !REFERRAL_RE.test(referral);

  const formValid =
    fullName.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) &&
    password.length >= 6 &&
    !referralInvalid;

  const query =
    referral && !referralInvalid ? `?ref=${encodeURIComponent(referral)}` : "";

  const onGo = (e: React.MouseEvent) => {
    if (referralInvalid || navigating) {
      e.preventDefault();
      setShowReferral(true);
      return;
    }
    setNavigating(true);
  };

  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formValid || submitting) return;

    setFormError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName,
          email,
          password,
          referrer_code: referral,
        }),
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        setFormError(json?.message ?? ERRORS.failed);
      } else {
        setCreated(true);
      }
    } catch {
      setFormError(ERRORS.failed);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.body}>
      <header className={styles.head}></header>
      <section className={styles.card}>
        <h1 className={styles.title}>Sign up</h1>

        <p className={styles.sub}>
          Create your Prepmate account, then log in on the app with same
          credentials.
        </p>

        <form className={styles.form} onSubmit={onSubmit} noValidate>
          <div className={styles.field}>
            <label htmlFor="pm-name">Full name</label>
            <input
              id="pm-name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              autoComplete="name"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="pm-email">Email address</label>
            <input
              id="pm-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              autoComplete="email"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="pm-password">Password</label>

            <div className={styles.inputWrap}>
              <input
                id="pm-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="new-password"
              />

              <button
                type="button"
                className={styles.toggle}
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {password.length > 0 && password.length < 6 && (
              <p className={styles.hint}>Use at least 6 characters.</p>
            )}
          </div>

          {showReferral ? (
            <div className={styles.field}>
              <label htmlFor="pm-ref">
                {locked ? "Referral code" : "Referral code (optional)"}
              </label>

              <input
                id="pm-ref"
                value={referral}
                readOnly={locked}
                aria-readonly={locked}
                onChange={(e) => {
                  if (!locked) {
                    setReferral(e.target.value.toUpperCase());
                  }
                }}
                maxLength={12}
                autoCapitalize="characters"
                autoComplete="off"
                spellCheck={false}
                placeholder="Enter referral code"
                aria-invalid={referralInvalid}
              />

              {locked && (
                <p className={styles.hint}>Applied from your invite link.</p>
              )}

              {referralInvalid && (
                <p className={styles.error}>Use 3 to 12 letters or numbers.</p>
              )}
            </div>
          ) : (
            <button
              type="button"
              className={styles.referralToggle}
              onClick={() => setShowReferral(true)}
            >
              Have a referral code? (Optional)
            </button>
          )}

          {formError && (
            <p className={styles.error} role="alert">
              {formError}
            </p>
          )}

          <button
            type="submit"
            className={`${styles.btn} ${styles.btnPrimary} ${styles.submit}`}
            disabled={!formValid || submitting}
          >
            {submitting ? "Creating account…" : "Create account"}
          </button>
        </form>

        <div className={styles.divider}>
          <span>or continue with</span>
        </div>

        <div className={`${styles.actions} ${styles.actionsRow}`}>
          <a
            className={`${styles.btn} ${styles.btnSocial}`}
            href={`/api/auth/google/start${query}`}
            onClick={onGo}
            aria-disabled={navigating}
            aria-label="Continue with Google"
          >
            <GoogleIcon />
            Google
          </a>

          <a
            className={`${styles.btn} ${styles.btnSocial}`}
            href={`/api/auth/apple/start${query}`}
            onClick={onGo}
            aria-disabled={navigating}
            aria-label="Continue with Apple"
          >
            <AppleIcon />
            Apple
          </a>
        </div>

        {errorCode && (
          <p className={styles.error} role="alert">
            {ERRORS[errorCode] ?? ERRORS.failed}
          </p>
        )}

        <p className={styles.legal}>
          By continuing, you agree to Prepmate&apos;s{" "}
          <a href="/terms-of-use">Terms of Use</a> and confirm that you have
          read the <a href="/privacy-policy">Privacy Policy</a>.
        </p>
      </section>
    </div>
  );
}

function Success({ platform }: { platform: string }) {
  const url = APP_LINKS[platform];

  return (
    <section className={styles.card} aria-live="polite">
      <h1 className={styles.title}>Account created</h1>

      <p className={styles.sub}>
        Download the Prepmate app and log in with the account you just created.
      </p>

      <a className={`${styles.btn} ${styles.btnPrimary}`} href={url}>
        Download Prepmate App
      </a>
    </section>
  );
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.58-5.17 3.58-8.81z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.94-2.9l-3.88-3c-1.08.72-2.45 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.94H1.28v3.09A12 12 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.29 14.31A7.2 7.2 0 0 1 4.91 12c0-.8.14-1.58.38-2.31V6.6H1.28A12 12 0 0 0 0 12c0 1.94.46 3.77 1.28 5.4l4.01-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.76 0 3.34.61 4.59 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.28 6.6l4.01 3.09C6.23 6.86 8.88 4.75 12 4.75z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
      />
    </svg>
  );
}
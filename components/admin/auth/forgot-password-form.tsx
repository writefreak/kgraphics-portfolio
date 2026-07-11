// components/auth/forgot-password-form.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSignIn } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { TextField } from "./text-field";
import { PasswordInput } from "./password-input";
import { isValidEmail, getPasswordStrength } from "@/lib/password-strength";

type Step = "request" | "reset";

export function ForgotPasswordForm() {
  const router = useRouter();
  const { signIn, errors: clerkErrors, fetchStatus } = useSignIn();

  const [step, setStep] = useState<Step>("request");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState<string | undefined>();
  const [codeError, setCodeError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();
  const [formError, setFormError] = useState<string | null>(null);

  const submitting = fetchStatus === "fetching";

  async function handleRequestCode(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    if (!email) {
      setEmailError("Enter your email address.");
      return;
    }
    if (!isValidEmail(email)) {
      setEmailError("Enter a valid email address.");
      return;
    }
    setEmailError(undefined);

    const { error: createError } = await signIn.create({
      identifier: email,
    });

    if (createError) {
      setFormError(
        createError.longMessage ??
          "We couldn't find an account with that email.",
      );
      return;
    }

    const { error: sendCodeError } =
      await signIn.resetPasswordEmailCode.sendCode();

    if (sendCodeError) {
      setFormError(
        sendCodeError.longMessage ?? "Couldn't send the reset code. Try again.",
      );
      return;
    }

    setStep("reset");
  }

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    let hasError = false;
    if (!code) {
      setCodeError("Enter the code we sent you.");
      hasError = true;
    } else {
      setCodeError(undefined);
    }
    if (!password || getPasswordStrength(password).score < 2) {
      setPasswordError(
        "Use at least 8 characters, with a number and a capital letter.",
      );
      hasError = true;
    } else {
      setPasswordError(undefined);
    }
    if (hasError) return;

    const { error: verifyError } =
      await signIn.resetPasswordEmailCode.verifyCode({
        code,
      });

    if (verifyError) {
      setFormError(verifyError.longMessage ?? "Invalid or expired code.");
      return;
    }

    if (signIn.status === "needs_new_password") {
      const { error: submitError } =
        await signIn.resetPasswordEmailCode.submitPassword({ password });

      if (submitError) {
        setFormError(
          submitError.longMessage ?? "Couldn't reset your password. Try again.",
        );
        return;
      }
    }

    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: async ({ session, decorateUrl }) => {
          if (session?.currentTask) return;
          const url = decorateUrl("/dashboard");
          if (url.startsWith("http")) {
            window.location.href = url;
          } else {
            router.push(url);
          }
        },
      });
    } else {
      setFormError("Reset incomplete. Check the code and try again.");
    }
  }

  if (step === "reset") {
    return (
      <div className="mx-auto w-full max-w-sm">
        <div className="mb-8 space-y-1.5">
          <h1 className="font-display text-2xl font-bold text-ink">
            Set a new password
          </h1>
          <p className="text-sm text-ink/60">
            Enter the code we sent to {email} and choose a new password.
          </p>
        </div>

        <form onSubmit={handleResetPassword} noValidate className="space-y-5">
          {formError && (
            <p
              role="alert"
              className="rounded-lg border border-destructive/30 bg-destructive/5 px-3.5 py-2.5 text-sm text-destructive"
            >
              {formError}
            </p>
          )}

          <TextField
            label="Verification code"
            name="code"
            value={code}
            onChange={(v) => setCode(v)}
            error={codeError}
            placeholder="123456"
          />

          <PasswordInput
            label="New password"
            name="password"
            autoComplete="new-password"
            value={password}
            onChange={(v) => setPassword(v)}
            error={passwordError ?? clerkErrors?.fields?.password?.message}
            showStrength
          />

          <div id="clerk-captcha" />

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {submitting && <Loader2 size={16} className="animate-spin" />}
            {submitting ? "Resetting…" : "Reset password"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="mb-8 space-y-1.5">
        <h1 className="font-display text-2xl font-bold text-ink">
          Forgot your password?
        </h1>
        <p className="text-sm text-ink/60">
          Enter your email and we&apos;ll send you a reset code.
        </p>
      </div>

      <form onSubmit={handleRequestCode} noValidate className="space-y-5">
        {formError && (
          <p
            role="alert"
            className="rounded-lg border border-destructive/30 bg-destructive/5 px-3.5 py-2.5 text-sm text-destructive"
          >
            {formError}
          </p>
        )}

        <TextField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(v) => setEmail(v)}
          error={emailError ?? clerkErrors?.fields?.identifier?.message}
          placeholder="you@studio.com"
        />

        <div id="clerk-captcha" />

        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {submitting && <Loader2 size={16} className="animate-spin" />}
          {submitting ? "Sending…" : "Send reset code"}
        </button>

        <p className="text-center text-sm text-ink/60">
          Remembered it?{" "}
          <Link
            href="/login"
            className="font-medium text-accent hover:underline"
          >
            Back to sign in
          </Link>
        </p>
      </form>
    </div>
  );
}

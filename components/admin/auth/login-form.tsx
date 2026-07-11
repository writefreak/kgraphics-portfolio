// components/auth/login-form.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSignIn } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { TextField } from "./text-field";
import { PasswordInput } from "./password-input";
import { isValidEmail } from "@/lib/password-strength";
import { Card, CardHeader } from "@/components/ui/card";

interface FormState {
  email: string;
  password: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

export function LoginForm() {
  const router = useRouter();
  const { signIn, errors: clerkErrors, fetchStatus } = useSignIn();

  const [values, setValues] = useState<FormState>({ email: "", password: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);

  const submitting = fetchStatus === "fetching";

  function validateField(
    field: keyof FormState,
    val: string,
  ): string | undefined {
    if (field === "email") {
      if (!val) return "Enter your email address.";
      if (!isValidEmail(val)) return "Enter a valid email address.";
    }
    if (field === "password" && !val) return "Enter your password.";
    return undefined;
  }

  function handleBlur(field: keyof FormState) {
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, values[field]),
    }));
  }

  function handleChange(field: keyof FormState, val: string) {
    setValues((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, val) }));
    }
  }

  async function finalizeSignIn() {
    await signIn.finalize({
      navigate: async ({ session, decorateUrl }) => {
        if (session?.currentTask) {
          // Session has a pending task (e.g. org selection) — send them there
          return;
        }
        const url = decorateUrl("/dashboard");
        if (url.startsWith("http")) {
          window.location.href = url;
        } else {
          router.push(url);
        }
      },
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    const nextErrors: Errors = {
      email: validateField("email", values.email),
      password: validateField("password", values.password),
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    const { error } = await signIn.password({
      identifier: values.email,
      password: values.password,
    });

    if (error) {
      setFormError(error.longMessage ?? "Incorrect email or password.");
      return;
    }

    if (signIn.status === "complete") {
      await finalizeSignIn();
    } else if (signIn.status === "needs_second_factor") {
      setFormError("This account requires a second verification step.");
    } else if (signIn.status === "needs_client_trust") {
      setFormError(
        "We don't recognize this device. Check your email to confirm it's you.",
      );
    } else {
      setFormError("Additional verification required.");
    }
  }

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="space-y-1.5 md:pb-8 pb-5">
        <h1 className="font-display text-2xl font-bold text-ink">
          Welcome back
        </h1>
        <p className="text-xs md:text-sm text-ink/60">
          Sign in to manage your K-Graphics dashboard.
        </p>
      </div>
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
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
          value={values.email}
          onChange={(v) => handleChange("email", v)}
          onBlur={() => handleBlur("email")}
          error={errors.email ?? clerkErrors?.fields?.identifier?.message}
          placeholder="you@studio.com"
        />

        <div className="space-y-1.5">
          <PasswordInput
            label="Password"
            name="password"
            autoComplete="current-password"
            value={values.password}
            onChange={(v) => handleChange("password", v)}
            onBlur={() => handleBlur("password")}
            error={errors.password ?? clerkErrors?.fields?.password?.message}
          />
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-accent hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <div id="clerk-captcha" />

        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {submitting && <Loader2 size={16} className="animate-spin" />}
          {submitting ? "Signing in…" : "Sign in"}
        </button>

        <p className="text-center text-sm text-ink/60">
          New to K-Graphics?{" "}
          <Link
            href="/signup"
            className="font-medium text-accent hover:underline"
          >
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}

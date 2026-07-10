// components/auth/signup-form.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSignUp } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { TextField } from "./text-field";
import { PasswordInput } from "./password-input";
import { isValidEmail, getPasswordStrength } from "@/lib/password-strength";

interface FormState {
  name: string;
  email: string;
  password: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

export function SignupForm() {
  const router = useRouter();
  const { signUp, errors: clerkErrors, fetchStatus } = useSignUp();

  const [values, setValues] = useState<FormState>({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);

  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const submitting = fetchStatus === "fetching";

  function validateField(
    field: keyof FormState,
    val: string,
  ): string | undefined {
    if (field === "name" && !val.trim()) return "Enter your name.";
    if (field === "email") {
      if (!val) return "Enter your email address.";
      if (!isValidEmail(val)) return "Enter a valid email address.";
    }
    if (field === "password") {
      if (!val) return "Create a password.";
      if (getPasswordStrength(val).score < 2)
        return "Use at least 8 characters, with a number and a capital letter.";
    }
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    const nextErrors: Errors = {
      name: validateField("name", values.name),
      email: validateField("email", values.email),
      password: validateField("password", values.password),
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    const { error } = await signUp.password({
      emailAddress: values.email,
      password: values.password,
      unsafeMetadata: { full_name: values.name },
    });

    if (error) {
      setFormError(error.longMessage ?? "Something went wrong. Try again.");
      return;
    }

    await signUp.verifications.sendEmailCode();
    setPendingVerification(true);
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    const { error } = await signUp.verifications.verifyEmailCode({ code });

    if (error) {
      setFormError(error.longMessage ?? "Invalid or expired code.");
      return;
    }

    if (signUp.status === "complete") {
      await signUp.finalize({
        navigate: async ({ decorateUrl }) => {
          const url = decorateUrl("/dashboard");
          if (url.startsWith("http")) {
            window.location.href = url;
          } else {
            router.push(url);
          }
        },
      });
    } else {
      setFormError("Verification incomplete. Check the code and try again.");
    }
  }

  if (pendingVerification) {
    return (
      <div className="mx-auto w-full max-w-sm">
        <div className="mb-8 space-y-1.5">
          <h1 className="font-display text-2xl font-bold text-ink">
            Check your email
          </h1>
          <p className="text-sm text-ink/60">
            Enter the code we sent to {values.email}.
          </p>
        </div>

        <form onSubmit={handleVerify} noValidate className="space-y-5">
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
            placeholder="123456"
          />
          <div id="clerk-captcha" />
          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {submitting && <Loader2 size={16} className="animate-spin" />}
            {submitting ? "Verifying…" : "Verify email"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="mb-8 space-y-1.5">
        <h1 className="font-display text-2xl font-bold text-ink">
          Create your account
        </h1>
        <p className="text-sm text-ink/60">
          Set up access to the K-Graphics dashboard.
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
          label="Name"
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={(v) => handleChange("name", v)}
          onBlur={() => handleBlur("name")}
          error={errors.name}
          placeholder="Esther Adaeze"
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(v) => handleChange("email", v)}
          onBlur={() => handleBlur("email")}
          error={errors.email ?? clerkErrors?.fields?.emailAddress?.message}
          placeholder="you@studio.com"
        />

        <PasswordInput
          label="Password"
          name="password"
          autoComplete="new-password"
          value={values.password}
          onChange={(v) => handleChange("password", v)}
          onBlur={() => handleBlur("password")}
          error={errors.password ?? clerkErrors?.fields?.password?.message}
          showStrength
        />

        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {submitting && <Loader2 size={16} className="animate-spin" />}
          {submitting ? "Creating account…" : "Create account"}
        </button>

        <p className="text-center text-sm text-ink/60">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-accent hover:underline"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}

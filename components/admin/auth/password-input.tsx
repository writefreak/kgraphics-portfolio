// components/auth/password-input.tsx
"use client";

import { useId, useState } from "react";
import { Eye, EyeOff, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { getPasswordStrength } from "@/lib/password-strength";

interface PasswordInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  autoComplete: "current-password" | "new-password";
  showStrength?: boolean;
}

export function PasswordInput({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  autoComplete,
  showStrength = false,
}: PasswordInputProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const [visible, setVisible] = useState(false);
  const [focused, setFocused] = useState(false);

  const strength = showStrength ? getPasswordStrength(value) : null;
  const showChecklist =
    showStrength && (focused || value.length > 0) && strength!.score < 3;

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            onBlur?.();
          }}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "w-full rounded-lg border bg-paper px-3.5 py-2.5 pr-11 text-sm text-ink outline-none transition-colors",
            "placeholder:text-ink/35",
            "focus:border-accent focus:ring-2 focus:ring-accent/20",
            error ? "border-destructive" : "border-line",
          )}
          placeholder="••••••••"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 transition-colors hover:text-ink/70"
        >
          {visible ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      </div>

      {error && (
        <p id={errorId} className="text-xs text-destructive">
          {error}
        </p>
      )}

      {showStrength && value.length > 0 && (
        <div className="space-y-2 pt-1">
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors duration-200",
                  i < strength!.score ? "bg-accent" : "bg-line",
                )}
              />
            ))}
          </div>

          {showChecklist && (
            <ul className="grid grid-cols-2 gap-x-3 gap-y-1 pt-0.5">
              <ChecklistItem
                met={strength!.checks.length}
                text="8+ characters"
              />
              <ChecklistItem
                met={strength!.checks.upper}
                text="One uppercase letter"
              />
              <ChecklistItem met={strength!.checks.number} text="One number" />
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function ChecklistItem({ met, text }: { met: boolean; text: string }) {
  return (
    <li
      className={cn(
        "flex items-center gap-1.5 text-xs transition-colors",
        met ? "text-accent" : "text-ink/40",
      )}
    >
      <span
        className={cn(
          "flex h-3.5 w-3.5 items-center justify-center rounded-full border transition-colors",
          met ? "border-accent bg-accent/10" : "border-line",
        )}
      >
        {met && <Check size={9} strokeWidth={3} />}
      </span>
      {text}
    </li>
  );
}

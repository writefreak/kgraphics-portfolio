// components/auth/text-field.tsx
"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

interface TextFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  autoComplete?: string;
  placeholder?: string;
}

export function TextField({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  autoComplete,
  placeholder,
}: TextFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const isEmail = type === "email";

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        autoComplete={autoComplete}
        autoCapitalize={isEmail ? "none" : undefined}
        autoCorrect={isEmail ? "off" : undefined}
        spellCheck={isEmail ? false : undefined}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-lg border bg-paper px-3.5 py-2.5 text-sm text-ink outline-none transition-colors",
          "placeholder:text-ink/35",
          "focus:border-accent focus:ring-2 focus:ring-accent/20",
          error ? "border-destructive" : "border-line",
        )}
      />
      {error && (
        <p id={errorId} className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

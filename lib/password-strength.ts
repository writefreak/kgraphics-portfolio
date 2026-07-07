// lib/password-strength.ts
export interface PasswordChecks {
  length: boolean;
  upper: boolean;
  number: boolean;
}

export interface StrengthResult {
  score: 0 | 1 | 2 | 3;
  label: string;
  checks: PasswordChecks;
}

export function getPasswordStrength(password: string): StrengthResult {
  const checks: PasswordChecks = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
  };

  const score = Object.values(checks).filter(Boolean).length as 0 | 1 | 2 | 3;
  const labels = ["Too weak", "Weak", "Good", "Strong"];

  return { score, label: labels[score], checks };
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

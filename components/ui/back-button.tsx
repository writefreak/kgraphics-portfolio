// components/shared/BackButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  label?: string;
  className?: string;
}

export default function BackButton({
  label = "Back",
  className = "",
}: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className={`group inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent ${className}`}
    >
      <ArrowLeft
        size={16}
        className="transition-transform group-hover:-translate-x-0.5"
      />
      {label}
    </button>
  );
}

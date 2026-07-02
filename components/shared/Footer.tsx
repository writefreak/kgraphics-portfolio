import Link from "next/link";
import { Globe } from "lucide-react";
import { Container } from "../Container";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Reviews", href: "#reviews" },
  { label: "Portfolio", href: "#portfolio" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <Container className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <Link href="/" className="font-display text-lg font-bold text-ink">
          K-Graphics
        </Link>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-ink/60 transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#"
          aria-label="Visit website"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink/60 transition-colors hover:border-ink hover:text-ink"
        >
          <Globe size={16} />
        </a>
      </Container>

      <Container className="mt-8 border-t border-line pt-6">
        <p className="text-center text-xs text-ink/40 sm:text-left">
          © {new Date().getFullYear()} K-Graphics. All Rights Reserved.
        </p>
      </Container>
    </footer>
  );
}

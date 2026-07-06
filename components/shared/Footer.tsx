import Link from "next/link";
import { Phone, Mail } from "lucide-react";

const FOOTER_COLUMNS = [
  {
    title: "Studio",
    links: [
      { label: "About", href: "#" },
      { label: "Portfolio", href: "#" },
      { label: "Reviews", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Services", href: "#" },
      { label: "Contact Us", href: "#" },
      { label: "FAQs", href: "#" },
    ],
  },
  {
    title: "Policies",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
];

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M14 13.5h2.5l1-4H14V7.5c0-1.03 0-2 2-2h1.5V2.14C17.17 2.1 15.95 2 14.66 2 11.97 2 10 3.66 10 6.7V9.5H7v4h3V22h4v-8.5z" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-3.96 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.68-2.91V8.48z" />
    </svg>
  );
}

const SOCIALS = [
  {
    label: "Instagram",
    icon: InstagramIcon,
    href: "#",
  },
  {
    label: "Facebook",
    icon: FacebookIcon,
    href: "#",
  },
  {
    label: "LinkedIn",
    icon: LinkedinIcon,
    href: "#",
  },
];

export function Footer() {
  return (
    <footer className="border-t border-mist bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          {/* Brand / contact column */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2.5">
              <a href="#top" className="h-9 md:h-12">
                <img
                  src="/kemilogo.png"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </a>
            </div>

            <div className="flex flex-col gap-2.5">
              <a
                href="tel:+2340000000000"
                className="flex items-center gap-2.5 text-sm text-ink/60 transition-colors duration-200 hover:text-ink"
              >
                <Phone
                  className="h-3.5 w-3.5 shrink-0 text-ink/60"
                  strokeWidth={2}
                />
                +234 8129460632
              </a>

              <a
                href="mailto:estheramuleya3@gmail.com"
                className="flex items-center gap-2.5 text-sm text-ink/60 transition-colors duration-200 hover:text-ink"
              >
                <Mail
                  className="h-3.5 w-3.5 shrink-0 text-ink/60"
                  strokeWidth={2}
                />
                estheramuleya3@gmail.com
              </a>
            </div>

            <div className="flex items-center gap-2.5">
              {SOCIALS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-mist text-ink/60 transition-colors duration-200 hover:bg-mist/40 hover:text-ink"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title} className="flex flex-col gap-4">
              <h3 className="font-display text-sm font-bold tracking-tight text-ink">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink/60 transition-colors duration-200 hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-mist">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row lg:px-8">
          <p className="font-sans text-xs text-ink/40">
            © {new Date().getFullYear()} K-Graphics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function CaseStudiesCTA() {
  return (
    <section className="py-20 md:py-28 xl:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-14 sm:px-12 sm:py-20 md:px-16 md:py-24 xl:py-28">
          {/* Decorative glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--blue)]/30 blur-3xl md:h-96 md:w-96"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl md:h-96 md:w-96"
          />

          <div className="relative flex flex-col items-start gap-6 md:max-w-2xl xl:max-w-3xl">
            <h2 className="font-display text-2xl font-bold tracking-tight text-white wrap-break-word sm:text-3xl md:text-4xl xl:text-[2.75rem] xl:leading-[1.15]">
              See how the thinking behind each design actually holds up
            </h2>

            <p className="font-body text-sm leading-relaxed text-white/65 sm:text-base md:text-lg">
              A closer look at real client projects — the problems, the
              decisions, and the process behind the final product.
            </p>

            <Link
              href="/case-study"
              className="mt-2 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 font-body text-sm font-semibold text-[var(--navy)] transition-colors duration-200 hover:bg-[var(--offwhite)]"
            >
              Explore Case Studies
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CaseStudiesCTA;

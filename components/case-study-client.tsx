"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Check, Search, ArrowUpRight } from "lucide-react";
import {
  CaseStudyCard,
  type CaseStudyItem,
} from "@/components/case-study-card";
import {
  CaseStudyHeroBanner,
  type CaseStudy,
} from "@/components/case-study-banner";

interface CaseStudiesPageClientProps {
  caseStudies: CaseStudyItem[];
  bannerStudies: CaseStudy[];
}

const highlights = [
  "Real case studies from real client work",
  "See the process behind the final product",
  "Search and filter to find what's relevant to you",
];

export function CaseStudiesPageClient({
  caseStudies,
  bannerStudies,
}: CaseStudiesPageClientProps) {
  const [query, setQuery] = useState("");

  const filteredStudies = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return caseStudies;
    return caseStudies.filter((study) => {
      const title = study.title?.toLowerCase() ?? "";
      const excerpt = study.excerpt?.toLowerCase() ?? "";
      return title.includes(q) || excerpt.includes(q);
    });
  }, [caseStudies, query]);

  const heroImage =
    bannerStudies[0]?.coverImageUrl ?? caseStudies[0]?.coverImageUrl ?? null;

  return (
    <>
      {/* Intro: text on the left, image on the right */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-10">
        <div className="max-w-xl">
          <h1 className="font-display text-3xl font-bold tracking-tight text-ink break-words md:text-4xl xl:text-5xl">
            Explore Our Project Highlights
          </h1>
          <p className="mt-3 font-body text-xs leading-relaxed text-neutral-600 sm:text-sm xl:text-base">
            A closer look at the creative thinking, decisions, and details
            behind selected projects
          </p>

          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search case studies..."
              className="w-full rounded-2xl border border-neutral-200 bg-white py-3 pl-11 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-neutral-400 focus:border-[var(--blue)]"
            />
          </div>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-100 lg:aspect-square xl:aspect-[4/3]">
          <CaseStudyHeroBanner caseStudies={bannerStudies} />
        </div>
      </div>

      {/* Search bar */}

      {/* Grid — same CaseStudyCard, now filtered by search */}
      <div id="project-highlights" className="mt-16">
        <h2 className="mb-6 text-xl font-bold text-neutral-900">
          All Project Highlights
        </h2>
        {filteredStudies.length === 0 ? (
          <p className="text-sm text-neutral-500">
            No case studies match &ldquo;{query}&rdquo;.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {filteredStudies.map((study) => (
              <CaseStudyCard key={study.id} study={study} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default CaseStudiesPageClient;

"use client";

import React, { useMemo, useState } from "react";
import { Search } from "lucide-react";
import {
  CaseStudyCard,
  type CaseStudyItem,
} from "@/components/case-study-card";

interface CaseStudiesSearchProps {
  caseStudies: CaseStudyItem[];
}

export function CaseStudiesSearch({ caseStudies }: CaseStudiesSearchProps) {
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

  return (
    <>
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

      <div className="pt-10 md:pt-16">
        {filteredStudies.length === 0 ? (
          <p className="text-sm text-neutral-500">
            No case studies match &ldquo;{query}&rdquo;.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-2">
            {filteredStudies.map((study) => (
              <CaseStudyCard key={study.id} study={study} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default CaseStudiesSearch;

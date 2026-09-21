"use client";

import React from "react";
import { HeroParallax } from "./ui/hero-parallax";

export interface CaseStudyData {
  id: string;
  title: string;
  slug: string;
  coverImageUrl?: string | null;
  excerpt?: string | null;
}

interface HeroParallaxSectionProps {
  caseStudies: CaseStudyData[];
}

export function HeroParallaxSection({ caseStudies }: HeroParallaxSectionProps) {
  if (!caseStudies || caseStudies.length === 0) return null;

  // Map case study fields to Aceternity product format
  const mappedProducts = caseStudies.map((study) => ({
    title: study.title,
    link: `/case-study/${study.slug}`,
    thumbnail:
      study.coverImageUrl ||
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
  }));

  // HeroParallax needs ~15 items to look full across 3 scrolling rows.
  // Repeat the uploaded studies array if the count is small.
  let products = [...mappedProducts];
  while (products.length < 15) {
    products = [...products, ...mappedProducts];
  }

  return <HeroParallax products={products.slice(0, 15)} />;
}

export default HeroParallaxSection;

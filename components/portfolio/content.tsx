"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Container } from "@/components/Container";
import BackButton from "../ui/back-button";
import type { Design } from "@/lib/types";

interface ContentProps {
  designs: Design[];
}

const INITIAL_VISIBLE_COUNT = 6;

const Content = ({ designs = [] }: ContentProps) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(designs.map((d) => d.category)))],
    [designs],
  );

  const filteredItems = useMemo(
    () =>
      activeCategory === "All"
        ? designs
        : designs.filter((item) => item.category === activeCategory),
    [designs, activeCategory],
  );

  const visibleItems = useMemo(
    () =>
      showAll ? filteredItems : filteredItems.slice(0, INITIAL_VISIBLE_COUNT),
    [filteredItems, showAll],
  );

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setShowAll(false);
  };

  return (
    <main className="md:pt-40 pt-32 pb-32">
      <Container>
        <BackButton className="mb-6" />
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              A closer look at our recent work
            </h2>
            <p className="mt-4 text-sm text-ink/65">
              Browse our design work by category, from brand identity to social
              content.
            </p>
          </div>
        </div>

        <div className="mt-10 flex gap-2 overflow-x-auto md:flex-wrap md:gap-3 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((category) => {
            const isActive = category === activeCategory;
            return (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryChange(category)}
                className={`flex-shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-xs md:text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-ink text-paper"
                    : "bg-mist text-ink/70 hover:bg-line"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 sm:gap-6">
            {visibleItems.map((item) => (
              <Link
                key={item.id}
                href={`/portfolio/${item.id}`}
                className="group relative aspect-4/5 w-full overflow-hidden rounded-2xl"
              >
                <img
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 [@media(hover:hover)]:group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-ink/0 transition-colors duration-300 [@media(hover:hover)]:group-hover:bg-ink/20" />
                <div className="absolute inset-0 flex flex-col justify-end">
                  <div className="bg-black/60 px-4 py-4 md:p-4 flex flex-col gap-1 md:gap-3 text-white backdrop-blur-sm">
                    <h2 className="font-display line-clamp-1 font-bold text-white leading-snug">
                      {item.title}
                    </h2>
                    <p className="text-xs md:text-sm text-white/80 line-clamp-2">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <p className="py-10 text-sm text-ink/50">
              No work in this category yet.
            </p>
          )}

          {filteredItems.length > INITIAL_VISIBLE_COUNT && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAll((prev) => !prev)}
                className="rounded-full bg-ink px-6 py-3 text-xs md:text-sm font-medium text-paper transition-colors hover:bg-ink/80"
              >
                {showAll ? "See less" : "See more"}
              </button>
            </div>
          )}
        </div>
      </Container>
    </main>
  );
};

export default Content;

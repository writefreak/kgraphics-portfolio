"use client";
import React from "react";

import { useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/shared/Header";
import { Container } from "@/components/Container";
import Contact from "@/components/Contact";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import BackButton from "../ui/back-button";
import type { Design } from "@/lib/types";

interface ContentProps {
  designs: Design[];
}

const Content = ({ designs = [] }: ContentProps) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

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

  const scrollByAmount = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.children[0] as HTMLElement | undefined;
    const gap = 20; // matches gap-5 (1.25rem) at sm+
    const step = (card?.offsetWidth || 280) + gap;
    el.scrollBy({ left: dir * step * 2, behavior: "smooth" });
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

        {/* Category filters */}
        <div className="mt-10 flex gap-2 overflow-x-auto md:flex-wrap md:gap-3 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((category) => {
            const isActive = category === activeCategory;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
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

        {/* Horizontal scroll track */}
        <Dialog
          open={selectedImage !== null}
          onOpenChange={(open) => {
            if (!open) setSelectedImage(null);
          }}
        >
          <DialogTitle className="sr-only">Project preview</DialogTitle>

          <div className="relative mt-10">
            <div
              ref={trackRef}
              className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 sm:gap-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {filteredItems.map((item) => (
                <DialogTrigger asChild key={item.id}>
                  <div
                    onClick={() => setSelectedImage(item.imageUrl)}
                    className="group relative md:aspect-4/5 aspect-4/6 w-[220px] flex-shrink-0 snap-start overflow-hidden rounded-2xl sm:w-[280px] md:w-[320px]"
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
                  </div>
                </DialogTrigger>
              ))}

              {filteredItems.length === 0 && (
                <p className="py-10 text-sm text-ink/50">
                  No work in this category yet.
                </p>
              )}
            </div>

            {/* Pagination buttons */}
            {filteredItems.length > 0 && (
              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  onClick={() => scrollByAmount(-1)}
                  aria-label="Scroll left"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-paper transition-colors hover:border hover:border-ink hover:bg-mist hover:text-ink md:h-10 md:w-10"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => scrollByAmount(1)}
                  aria-label="Scroll right"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-paper transition-colors hover:border hover:border-ink hover:bg-mist hover:text-ink md:h-10 md:w-10"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>

          {selectedImage && (
            <DialogContent className="flex flex-col items-center border-none bg-transparent shadow-none">
              <div className="h-[70vh] w-[90vw] max-w-[500px] sm:h-[510px] sm:w-[440px]">
                <img
                  src={selectedImage}
                  alt=""
                  className="h-full w-full object-cover rounded-md"
                />
              </div>
            </DialogContent>
          )}
        </Dialog>
      </Container>
    </main>
  );
};

export default Content;

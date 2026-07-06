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

type PortfolioItem = {
  id: number;
  src: string;
  alt: string;
  category: string;
};

const GALLERY_ITEMS: PortfolioItem[] = [
  {
    id: 1,
    src: "/1.jpg",
    alt: "Bolu Couture Flyer Design",
    category: "Print & Digital",
  },
  {
    id: 2,
    src: "/2.jpg",
    alt: "Jiggy's Glam Social Media Set",
    category: "Social",
  },
  { id: 3, src: "/3.jpg", alt: "Why Wait Promo Post", category: "Social" },
  {
    id: 4,
    src: "/4.jpg",
    alt: "Happy Valentine's Day Post",
    category: "Social",
  },
  {
    id: 5,
    src: "/5.jpg",
    alt: "Morara Hair Therapy Business Flyer",
    category: "Print & Digital",
  },
  {
    id: 6,
    src: "/6.jpg",
    alt: "Global Innovation Hub Brand Identity",
    category: "Branding",
  },
  {
    id: 7,
    src: "/7.jpg",
    alt: "TalkWithChi Ladies Hangout Flyer",
    category: "Print & Digital",
  },
  {
    id: 8,
    src: "/8.jpg",
    alt: "Olaoye2026 Save The Date Flyer",
    category: "Print & Digital",
  },
  {
    id: 9,
    src: "/9.jpg",
    alt: "Morara Hair Therapy Product Packaging",
    category: "Branding",
  },
  {
    id: 10,
    src: "/10.jpg",
    alt: "Roged Exchange Flyer",
    category: "Print & Digital",
  },
  {
    id: 11,
    src: "/11.jpg",
    alt: "David Anthony Birthday Flyer",
    category: "Print & Digital",
  },
  {
    id: 12,
    src: "/12.jpg",
    alt: "StyledByKennyl Business Flyer",
    category: "Print & Digital",
  },
  {
    id: 13,
    src: "/13.jpg",
    alt: "Beauty J Empire Flyer",
    category: "Print & Digital",
  },
  {
    id: 14,
    src: "/14.jpg",
    alt: "Smadecable Brand Identity",
    category: "Branding",
  },
  {
    id: 15,
    src: "/15.jpg",
    alt: "Gem Fashion Brand Identity",
    category: "Branding",
  },
];

const CATEGORIES = [
  "All",
  ...Array.from(new Set(GALLERY_ITEMS.map((item) => item.category))),
];

const Content = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const filteredItems = useMemo(
    () =>
      activeCategory === "All"
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter((item) => item.category === activeCategory),
    [activeCategory],
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
          {CATEGORIES.map((category) => {
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
                    onClick={() => setSelectedImage(item.src)}
                    className="group relative md:aspect-4/5 aspect-4/6 w-[220px] flex-shrink-0 snap-start overflow-hidden rounded-2xl sm:w-[280px] md:w-[320px]"
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 [@media(hover:hover)]:group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-ink/0 transition-colors duration-300 [@media(hover:hover)]:group-hover:bg-ink/20" />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <p className="text-xs font-medium text-paper">
                        {item.alt}
                      </p>
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

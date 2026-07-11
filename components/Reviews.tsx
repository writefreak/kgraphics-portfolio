"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Star,
  X,
  MessageSquarePlus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ReviewFormDialog from "./ui/review-dialog";
import type { Review } from "@/lib/types";

// Fallback data used only when the table is empty, so the section never
// renders blank. Not real client reviews — just here for visual continuity.
const FALLBACK_REVIEWS = [
  {
    name: "Tobi A.",
    quote:
      "K-Graphics didn't just design a logo, she translated everything our brand stands for into something people remember.",
  },
  {
    name: "Pastor Daniel E.",
    quote:
      "Every poster felt intentional. There was a reverence in the work that matched the heart behind our event.",
  },
  {
    name: "Chiamaka O.",
    quote:
      "Responsive, easy to work with, and the kind of designer who actually listens before she starts creating.",
  },
  {
    name: "Emeka N.",
    quote:
      "Our brochures went from generic to genuinely impressive. Clients started commenting on the design before we even finished the pitch.",
  },
  {
    name: "Blessing U.",
    quote:
      "She took a boring compliance document and made it something people actually wanted to read. That's rare talent.",
  },
  {
    name: "Dr. Ifeoma K.",
    quote:
      "From our signage to our appointment cards, everything now feels like one cohesive brand. Patients notice the difference.",
  },
  {
    name: "Samuel T.",
    quote:
      "K-Graphics understood our energy immediately. The gym's visual identity now matches how it actually feels to walk in.",
  },
  {
    name: "Ngozi F.",
    quote:
      "Every invite and seating chart she designed felt custom-made for the couple, never a template. Our clients were thrilled.",
  },
  {
    name: "Victor I.",
    quote:
      "Our menu redesign alone increased how long customers lingered over it. Good design really does change behavior.",
  },
  {
    name: "Adaeze M.",
    quote:
      "She has an eye for detail most designers miss entirely. Every packaging mockup felt ready for a real shelf.",
  },
  {
    name: "Kingsley P.",
    quote:
      "Professional, prompt, and precise. Our fleet branding finally looks like the serious company we actually are.",
  },
  {
    name: "Faith E.",
    quote:
      "Parents comment on our branding all the time now. K-Graphics made us look as warm and trustworthy as we try to be.",
  },
];

interface ReviewsProps {
  reviews?: Review[];
}

export default function Reviews({ reviews = [] }: ReviewsProps) {
  const displayReviews =
    reviews.length > 0
      ? reviews.map((r) => ({
          name: r.name,
          quote: r.comment,
          rating: r.rating,
        }))
      : FALLBACK_REVIEWS.map((r) => ({ ...r, rating: 5 }));

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const active = activeIndex !== null ? displayReviews[activeIndex] : null;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-review-card]");
    const step = (card?.offsetWidth ?? 320) + 24;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  const renderStars = (rating: number, size: "sm" | "lg") => {
    const filled = Math.round(rating);
    const cls = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
    return Array.from({ length: 5 }).map((_, idx) => (
      <Star
        key={idx}
        className={`${cls} fill-current ${
          idx < filled ? "text-yellow-400" : "text-paper/20"
        }`}
        strokeWidth={0}
      />
    ));
  };

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="relative overflow-hidden pt-20 pb-20 text-paper md:py-20"
    >
      {/* Background image */}
      <div className="absolute inset-0 -z-20 bg-ink">
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 bg-[url('/office.jpg')] bg-cover bg-center bg-fixed"
        />
        <div className="absolute inset-0 bg-ink/75" />
      </div>

      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-paper sm:text-4xl">
              What Our Valued Clients Are Saying About Us
            </h2>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="pt-7 md:pt-14 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory [-webkit-overflow-scrolling:touch] scrollbar-none [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex gap-3 px-6 lg:px-8 py-4">
            {displayReviews.map((review, i) => (
              <motion.button
                type="button"
                data-review-card
                key={`${review.name}-${i}`}
                layoutId={`review-card-${i}`}
                onClick={() => setActiveIndex(i)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group flex w-74 md:w-80 shrink-0 snap-start flex-col appearance-none rounded-2xl border border-paper/15 bg-paper/10 p-7 text-left backdrop-blur-md transition-shadow duration-300 ease-out hover:shadow-lg hover:shadow-black/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
              >
                <p className="line-clamp-3 text-xs leading-relaxed text-paper/85 md:text-sm">
                  {review.quote}
                </p>

                <div className="mt-5 border-t border-paper/15 pt-5 md:mt-6 md:pt-6">
                  <p className="font-display text-sm text-paper md:text-base">
                    {review.name}
                  </p>
                </div>

                <div className="mt-3 flex gap-0.5">
                  {renderStars(review.rating, "sm")}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
        <div className="flex justify-between md:pt-6  items-center gap-3">
          <button
            type="button"
            onClick={() => setFormOpen(true)}
            className="inline-flex shrink-0 items-center gap-2 rounded-2xl border border-paper/15 bg-paper/10 px-4 py-2.5 text-sm font-medium text-paper backdrop-blur-md transition-colors duration-200 hover:border-paper/30 hover:bg-paper/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
          >
            <MessageSquarePlus className="h-3.5 w-3.5" />
            Leave a Review
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous reviews"
              className="flex h-9 w-9 items-center justify-center rounded-2xl border border-paper/15 bg-paper/10 text-paper/60 backdrop-blur-md transition-colors duration-200 hover:border-paper/30 hover:bg-paper/15 hover:text-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Next reviews"
              className="flex h-9 w-9 items-center justify-center rounded-2xl border border-paper/15 bg-paper/10 text-paper/60 backdrop-blur-md transition-colors duration-200 hover:border-paper/30 hover:bg-paper/15 hover:text-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Full review dialog */}
      <AnimatePresence>
        {active && activeIndex !== null && (
          <>
            <motion.div
              key="review-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={() => setActiveIndex(null)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
              <motion.div
                layoutId={`review-card-${activeIndex}`}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 36,
                  mass: 0.7,
                }}
                className="relative w-full max-w-lg rounded-2xl border border-paper/15 bg-ink/90 p-8 shadow-lg shadow-black/20 backdrop-blur-xl"
              >
                <button
                  type="button"
                  onClick={() => setActiveIndex(null)}
                  className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-2xl text-paper/60 transition-colors duration-200 hover:bg-paper/10 hover:text-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  <div className="flex gap-0.5">
                    {renderStars(active.rating, "lg")}
                  </div>

                  <p className="mt-5 text-lg leading-relaxed text-paper">
                    {active.quote}
                  </p>

                  <div className="mt-7 border-t border-paper/15 pt-5">
                    <p className="text-sm font-semibold text-paper">
                      {active.name}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Leave a review dialog */}
      <ReviewFormDialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={() => {
          setFormOpen(false);
        }}
      />
    </section>
  );
}

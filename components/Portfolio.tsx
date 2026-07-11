"use client";

import {
  motion,
  useMotionValue,
  useAnimationFrame,
  animate,
} from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { Container, SectionLabel } from "./Container";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import BackButton from "./ui/back-button";
import type { Design } from "@/lib/types";

const SPEED = 30; // px per second — auto-scroll pace
const RESUME_DELAY = 3000; // ms before auto-scroll resumes after a manual nudge
const NUDGE_DURATION = 0.5; // seconds for the button-triggered slide

interface PortfolioProps {
  designs: Design[];
}

export default function Portfolio({ designs = [] }: PortfolioProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  // Only used in static mode (< 5 designs) — this is the element that
  // actually scrolls natively, so buttons and touch swipe act on the same target.
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nudgeAnimation = useRef<ReturnType<typeof animate> | null>(null);

  // Fewer than 5 designs isn't enough to make an infinite marquee feel
  // seamless — render the set once, no duplication, no auto-scroll.
  // Navigation still has to work though: buttons stay visible and drive a
  // native scroll, and touch users can swipe directly.
  const shouldScroll = designs.length >= 5;
  const track = shouldScroll ? [...designs, ...designs] : designs;

  useAnimationFrame((_, delta) => {
    if (!shouldScroll || isPaused) return;
    const el = trackRef.current;
    if (!el) return;

    const halfWidth = el.scrollWidth / 2;
    let next = x.get() - (delta / 1000) * SPEED;
    if (Math.abs(next) >= halfWidth) next += halfWidth;
    x.set(next);
  });

  const pauseThenResume = () => {
    setIsPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setIsPaused(false), RESUME_DELAY);
  };

  const nudge = (dir: 1 | -1) => {
    const card = trackRef.current?.children[0] as HTMLElement | undefined;
    const gap = 20; // matches gap-5 (1.25rem) at sm+; adjust if you change the gap class
    const step = (card?.offsetWidth || 280) + gap;

    if (!shouldScroll) {
      // Static mode: no transform, no wraparound — just scroll the real
      // container. This is also exactly what a swipe does, so buttons and
      // touch stay in sync automatically.
      scrollWrapperRef.current?.scrollBy({
        left: dir * step,
        behavior: "smooth",
      });
      return;
    }

    const el = trackRef.current;
    if (!el) return;
    const halfWidth = el.scrollWidth / 2;

    // Cancel any in-flight nudge so rapid clicks don't fight each other
    nudgeAnimation.current?.stop();

    let target = x.get() - dir * step;

    nudgeAnimation.current = animate(x, target, {
      duration: NUDGE_DURATION,
      ease: "easeInOut",
      onComplete: () => {
        // Normalize into range AFTER the slide finishes, so the wrap never shows mid-animation
        let normalized = x.get();
        if (normalized > 0) normalized -= halfWidth;
        if (Math.abs(normalized) >= halfWidth) normalized += halfWidth;
        x.set(normalized);
      },
    });

    pauseThenResume();
  };

  return (
    <section id="portfolio" className="pb-32 pt-16 md:pt-28 md:pb-40">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger()}
          className="flex flex-wrap items-end justify-between gap-6"
        >
          <div className="">
            <motion.h2
              variants={fadeUp}
              className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
            >
              An overview of our <br /> most recent projects.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-4 text-xs md:text-sm text-ink/65"
            >
              A selection of our most recent projects each reflecting our{" "}
              <br className="hidden md:block" />
              commitment to delivering top-notch solutions
            </motion.p>
          </div>
          <motion.div variants={fadeUp}>
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-accent"
            >
              See Full Portfolio
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </motion.div>
        </motion.div>

        <Dialog
          open={selectedImage !== null}
          onOpenChange={(open) => {
            if (!open) setSelectedImage(null);
          }}
        >
          <DialogTitle className="sr-only">Project preview</DialogTitle>

          <motion.div
            ref={scrollWrapperRef}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6 }}
            className={
              shouldScroll
                ? "relative mt-12 w-full overflow-hidden"
                : "relative mt-12 w-full overflow-x-auto [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            }
          >
            <motion.div
              ref={trackRef}
              className={
                shouldScroll
                  ? "flex gap-4 sm:gap-5"
                  : "flex gap-4 sm:gap-5 snap-x snap-mandatory"
              }
              style={{
                x,
                willChange: "transform",
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
              }}
            >
              {track.map((design, i) => {
                const cardClassName = shouldScroll
                  ? "group relative aspect-4/6 md:aspect-4/5 w-[220px] flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl sm:w-[280px] md:w-[320px]"
                  : "group relative aspect-4/6 md:aspect-4/5 w-[220px] flex-shrink-0 snap-start cursor-pointer overflow-hidden rounded-2xl sm:w-[280px] md:w-[320px]";

                return (
                  <DialogTrigger asChild key={`${design.id}-${i}`}>
                    <div
                      onClick={() => setSelectedImage(design.imageUrl)}
                      className={cardClassName}
                    >
                      <img
                        src={design.imageUrl}
                        alt={design.imageAlt}
                        width={320}
                        height={400}
                        loading="eager"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 [@media(hover:hover)]:group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-ink/0 transition-colors duration-300 [@media(hover:hover)]:group-hover:bg-ink/20" />

                      {design.behanceUrl && (
                        <a
                          href={design.behanceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          aria-label="View on Behance"
                          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-ink/70 text-white opacity-0 transition-opacity duration-200 [@media(hover:hover)]:group-hover:opacity-100"
                        >
                          <ArrowUpRight size={14} />
                        </a>
                      )}
                    </div>
                  </DialogTrigger>
                );
              })}
            </motion.div>
          </motion.div>

          <div className="mt-6 flex items-center gap-3 justify-end">
            <button
              onClick={() => nudge(-1)}
              aria-label="Scroll left"
              className="flex md:h-10 md:w-10 h-9 w-9 items-center justify-center rounded-full bg-ink text-white hover:border hover:border-ink hover:text-ink transition-colors hover:bg-mist"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => nudge(1)}
              aria-label="Scroll right"
              className="flex md:h-10 md:w-10 h-9 w-9 items-center justify-center rounded-full bg-ink text-white hover:border hover:border-ink hover:text-ink transition-colors hover:bg-mist"
            >
              <ChevronRight size={18} />
            </button>
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
    </section>
  );
}

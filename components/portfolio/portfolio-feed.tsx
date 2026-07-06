"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";

type GalleryItem = {
  id: number;
  src: string;
  alt: string;
  hasVideo?: boolean;
};

interface GalleryCarouselProps {
  items: GalleryItem[];
  /** ms between auto-advance, omit/0 to disable */
  autoPlayInterval?: number;
}

const VISIBLE_RANGE = 2;

export default function DesktopGallery({
  items = GALLERY_ITEMS,
}: Partial<GalleryCarouselProps>) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const count = items.length;

  const goTo = useCallback(
    (nextIndex: number, dir: number) => {
      setDirection(dir);
      setActiveIndex(((nextIndex % count) + count) % count);
    },
    [count],
  );

  const goNext = useCallback(
    () => goTo(activeIndex + 1, 1),
    [activeIndex, goTo],
  );
  const goPrev = useCallback(
    () => goTo(activeIndex - 1, -1),
    [activeIndex, goTo],
  );

  const handleDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) goNext();
    else if (info.offset.x > swipeThreshold) goPrev();
  };

  const getOffset = (index: number) => {
    let offset = index - activeIndex;
    if (offset > count / 2) offset -= count;
    if (offset < -count / 2) offset += count;
    return offset;
  };

  return (
    <div className="w-full">
      <div
        className="relative mx-auto w-full max-w-5xl h-70 sm:h-85 md:h-100"
        style={{ perspective: 1200 }}
      >
        <AnimatePresence initial={false} custom={direction}>
          {items.map((item, index) => {
            const offset = getOffset(index);
            if (Math.abs(offset) > VISIBLE_RANGE) return null;

            const isActive = offset === 0;
            const absOffset = Math.abs(offset);

            const xStep = 230;
            const x = offset * xStep;
            const scale = isActive ? 1 : Math.max(0.72, 1 - absOffset * 0.16);
            const opacity = isActive ? 1 : Math.max(0.35, 1 - absOffset * 0.32);
            const zIndex = 10 - absOffset;
            const rotateY = offset * -8;

            return (
              <motion.div
                key={item.id}
                className="absolute left-1/2 top-1/2 cursor-pointer select-none"
                style={{
                  zIndex,
                  width: "min(78vw, 360px)",
                  willChange: "transform, opacity",
                }}
                initial={false}
                animate={{
                  x: `calc(-50% + ${x}px)`,
                  y: "-50%",
                  scale,
                  opacity,
                  rotateY,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 30,
                  mass: 0.9,
                }}
                drag={isActive ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={handleDragEnd}
                onClick={() => {
                  if (!isActive) goTo(index, offset > 0 ? 1 : -1);
                }}
              >
                <div
                  className="relative aspect-4/5 w-full overflow-hidden rounded-3xl shadow-2xl ring-1 ring-ink/5"
                  style={{
                    boxShadow: isActive
                      ? "0 30px 60px -15px rgba(0,0,0,0.35), 0 10px 20px -10px rgba(0,0,0,0.25)"
                      : "0 20px 40px -15px rgba(0,0,0,0.25)",
                  }}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    draggable={false}
                    className="h-full w-full object-cover"
                  />
                  {item.hasVideo && (
                    <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-paper/90 shadow-md backdrop-blur-sm">
                      <Play className="h-4 w-4 fill-ink text-ink" />
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="pt-10 sm:pt-14 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous slide"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-ink transition-colors focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next slide"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-ink transition-colors focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

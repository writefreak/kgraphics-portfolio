"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "./Container";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import Card, { CardItem } from "./ui/card";

const SERVICES: CardItem[] = [
  {
    id: "brand-identity",
    name: "Brand Identity Design",
    category: "Branding",
    desc: "We craft logos, color systems, and visual languages built to carry your brand for years, not seasons.",
    image: "/6.jpg",
  },
  {
    id: "flyer-poster",
    name: "Flyer & Poster Design",
    category: "Print & Digital",
    desc: "We design print and digital pieces that stop the scroll and earn a second look.",
    image: "/5.jpg",
  },
  {
    id: "social-media",
    name: "Social Media Design",
    category: "Social",
    desc: "We build cohesive templates and one-off pieces that keep your feed unmistakably yours.",
    image: "/4.jpg",
  },
  {
    id: "business-branding",
    name: "Business & Product Branding",
    category: "Branding",
    desc: "We shape packaging, decks, and collateral that make your offer feel as good as it is.",
    image: "/9.jpg",
  },
  {
    id: "digital-art",
    name: "Custom Digital Art",
    category: "Illustration",
    desc: "We render personal and passion projects with the same care as client work.",
    image: "/2.jpg",
  },
];
export default function Services() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = () => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 1);
  };

  useEffect(() => {
    updateEdges();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const step = el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section id="services" className="py-24 md:py-32">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger()}
          className="max-w-xl"
        >
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-display text-3xl font-bold tracking-tight  md:w-full text-ink md:text-4xl"
          >
            Explore Our Wide Range <br className="hidden md:block" /> of
            Creative solutions
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 md:text-sm text-xs text-neutral-600"
          >
            Our wide range of creative solutions we’ve crafted to elevate brands
            like yours.
          </motion.p>
        </motion.div>
      </Container>

      <div
        ref={trackRef}
        className="pt-14 flex gap-4 md:gap-5 overflow-x-auto mx-6 md:mx-14 pb-2 snap-x snap-mandatory scroll-smooth scrollbar-none  [&::-webkit-scrollbar]:hidden"
      >
        {SERVICES.map((service) => (
          <Card key={service.id} item={service} />
        ))}
      </div>

      <Container>
        <div className="mt-6 flex items-center gap-3 justify-end">
          <button
            onClick={() => scrollBy(-1)}
            disabled={atStart}
            aria-label="Scroll left"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white hover:border hover:border-ink hover:text-ink transition-colors hover:bg-mist disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scrollBy(1)}
            disabled={atEnd}
            aria-label="Scroll right"
            // className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-mist disabled:opacity-30 disabled:pointer-events-none"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white hover:border hover:border-ink hover:text-ink transition-colors hover:bg-mist disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </Container>
    </section>
  );
}

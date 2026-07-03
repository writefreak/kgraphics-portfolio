"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "./Container";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { useRef, useState } from "react";

const STATS = [
  { value: "", label: "" },
  { value: "", label: "" },
  { value: "", label: "" },
];

export default function Hero() {
  const cardRef = useRef(null);
  const [flipped, setFlipped] = useState(false);
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-white pt-32 pb-16 md:pt-36 md:pb-24"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      <Container className="relative  flex flex-col items-center gap-12 lg:flex-row md:gap-26 md:justify-center">
        <div className="hidden md:block">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            className="relative shrink-0"
          >
            <div className="md:aspect-3/4 w-full overflow-hidden rounded-2xl shadow-xl shadow-ink/10 md:max-w-[320px]">
              <img
                src="/kemi.jpeg"
                alt="K-Graphics"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger()}
          className="max-w-xl"
        >
          <motion.h1
            variants={fadeUp}
            className="font-display md:text-[57px] text-[34px] font- leading-[1.1] tracking-tight text-ink"
          >
            Transforming ideas <br /> into{" "}
            <span className="relative font-bold inline-block">
              timeless visual
              <svg
                aria-hidden
                viewBox="0 0 300 16"
                className="absolute -bottom-1 left-0 w-full text-accent"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 11C68 4 232 2 298 9"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>{" "}
            expressions.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-sm text-xs leading-relaxed text-ink/65 md:text-sm"
          >
            K-Graphics translates your vision into soul-rich, timeless visuals
            that truly reflect your values and identity.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="pt-8 md:pt-10 flex flex-wrap gap-3"
          >
            <button className="group inline-flex items-center gap-2 rounded-2xl bg-ink px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-accent">
              Let&apos;s Connect
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>

            <button className="inline-flex items-center gap-2 rounded-2xl  px-6 py-3 text-sm font-semibold text-ink border border-ink">
              See Our Work
            </button>
          </motion.div>
        </motion.div>

        <div
          ref={cardRef}
          className="aspect-3/4 w-full md:hidden"
          style={{ perspective: "1200px" }}
          onMouseEnter={() => setFlipped(true)}
          onMouseLeave={() => setFlipped(false)}
          onClick={() => setFlipped((v) => !v)}
        >
          <motion.div
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative w-full h-full"
          >
            {/* Front — photo */}
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden"
              style={{ backfaceVisibility: "hidden" }}
            >
              <img
                src="/kemi.jpeg"
                alt=""
                className="h-full w-full object-cover rounded-2xl"
              />
            </div>

            {/* Back */}
            <div
              className="absolute inset-0 rounded-2xl bg-[#030142] flex flex-col items-center justify-center gap-4 px-8"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <h2 className="text-white font-display text-2xl md:text-3xl font-black text-center leading-tight">
                Hello, I'm Oluwakemisola
              </h2>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

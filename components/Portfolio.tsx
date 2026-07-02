"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Container, SectionLabel } from "./Container";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

const WORKS = [
  { title: "Aurelle Skincare", category: "Brand Identity", className: "from-ink to-[#1b1668]" },
  { title: "Lumen Church Conference", category: "Poster Design", className: "from-accent to-[#7eb1ff]" },
  { title: "Naija Eats", category: "Social Media", className: "from-[#0a0660] to-ink" },
  { title: "Verve Fitness", category: "Product Branding", className: "from-[#7eb1ff] to-accent" },
  { title: "Still Waters", category: "Custom Art", className: "from-ink to-accent" },
  { title: "Harborlight Co.", category: "Brand Identity", className: "from-[#1b1668] to-[#0a0660]" },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 md:py-32">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger()}
          className="flex flex-wrap items-end justify-between gap-6"
        >
          <div className="max-w-xl">
            <motion.div variants={fadeUp}>
              <SectionLabel>Our Recent Works</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
            >
              An overview of our most recent projects.
            </motion.h2>
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

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger(0.06)}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {WORKS.map((work) => (
            <motion.div
              key={work.title}
              variants={fadeUp}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${work.className} transition-transform duration-500 group-hover:scale-105`}
              />
              <div className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/20" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-paper/70">
                  {work.category}
                </p>
                <p className="mt-1 font-display text-lg font-semibold text-paper">
                  {work.title}
                </p>
              </div>
              <div className="absolute right-5 top-5 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-paper/15 text-paper opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <ArrowUpRight size={16} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Container, SectionLabel } from "./Container";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

export default function BrandStory() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger()}
          className="grid items-center gap-12 rounded-3xl bg-mist p-10 md:grid-cols-2 md:p-16"
        >
          <div>
            <motion.div variants={fadeUp}>
              <SectionLabel>Our Brand Story</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
            >
              Get to know the passion, purpose, and vision behind every
              piece we create.
            </motion.h2>
            <motion.div variants={fadeUp} className="mt-8">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-accent"
              >
                <Download size={16} />
                Download Story
              </a>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            className="relative h-64 overflow-hidden rounded-2xl bg-gradient-to-br from-ink to-accent md:h-80"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-6xl font-bold text-paper/15">
                K
              </span>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

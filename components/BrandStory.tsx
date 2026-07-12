"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Container, SectionLabel } from "./Container";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { getBrandStory } from "@/app/(admin)/brand-story/actions";
import type { BrandStory as BrandStoryType } from "@/lib/types";

export default function BrandStory() {
  const [brandStory, setBrandStory] = useState<BrandStoryType | null>(null);

  useEffect(() => {
    getBrandStory()
      .then(setBrandStory)
      .catch(() => setBrandStory(null));
  }, []);

  return (
    <section className="py-28 md:py-40">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger()}
          className="grid items-center gap-6 md:gap-12 rounded-3xl bg-mist p-6 md:grid-cols-2 md:p-14"
        >
          <div className="order-2 md:order-1">
            <motion.h2
              variants={fadeUp}
              className="mt-4 font-display text-[18.5px] tracking-tight text-ink/60 sm:text-4xl"
            >
              Get to know the passion, purpose, and vision behind every piece we
              create.
            </motion.h2>
            <motion.div variants={fadeUp} className="md:pt-8 pt-5 md:pb-0 pb-4">
              <a
                href={
                  brandStory
                    ? `${brandStory.fileUrl}?download=${encodeURIComponent(brandStory.fileName)}`
                    : "#"
                }
                className="inline-flex items-center gap-2 rounded-2xl bg-ink px-6 py-3.5 text-xs md:text-sm font-semibold text-paper transition-colors hover:bg-accent"
              >
                <Download size={16} />
                Download Our Brand Story
              </a>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            className="relative order-1 aspect-[16/9] w-full overflow-hidden rounded-xl md:rounded-2xl bg-gradient-to-br from-ink to-accent md:order-2 md:aspect-auto md:h-80"
          >
            <img
              src="/brand.jpeg"
              alt="Brand Story"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

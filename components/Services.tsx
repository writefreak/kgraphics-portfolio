"use client";

import { motion } from "framer-motion";
import {
  Palette,
  FileImage,
  Smartphone,
  Briefcase,
  Wand2,
} from "lucide-react";
import { Container, SectionLabel } from "./Container";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

const SERVICES = [
  {
    icon: Palette,
    title: "Brand Identity Design",
    desc: "Logos, color systems, and visual languages built to carry your brand for years, not seasons.",
  },
  {
    icon: FileImage,
    title: "Flyer & Poster Design",
    desc: "Print and digital pieces that stop the scroll and earn a second look.",
  },
  {
    icon: Smartphone,
    title: "Social Media Design",
    desc: "Cohesive templates and one-off pieces that keep your feed unmistakably yours.",
  },
  {
    icon: Briefcase,
    title: "Business & Product Branding",
    desc: "Packaging, decks, and collateral that make your offer feel as good as it is.",
  },
  {
    icon: Wand2,
    title: "Custom Digital Art",
    desc: "Personal and passion projects rendered with the same care as client work.",
  },
];

export default function Services() {
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
          <motion.div variants={fadeUp}>
            <SectionLabel>Our Services</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
          >
            Creative solutions, crafted to elevate brands like yours.
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger(0.06)}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((service) => (
            <motion.div
              key={service.title}
              variants={fadeUp}
              className="group rounded-2xl border border-line bg-paper p-7 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-accent transition-colors group-hover:bg-accent group-hover:text-paper">
                <service.icon size={20} />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

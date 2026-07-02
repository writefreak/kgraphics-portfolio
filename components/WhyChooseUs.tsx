"use client";

import { motion } from "framer-motion";
import { Feather, Fingerprint, TrendingUp, MessagesSquare, Heart } from "lucide-react";
import { Container, SectionLabel } from "./Container";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

const VALUES = [
  {
    icon: Feather,
    title: "Faith",
    desc: "Rooted in Christian values, our creativity reflects light, hope, and reverence, especially in spiritually-driven projects.",
  },
  {
    icon: Fingerprint,
    title: "Authenticity",
    desc: "No templates, no shortcuts. Each design is custom-crafted to reflect your unique message and audience.",
  },
  {
    icon: TrendingUp,
    title: "Relevance",
    desc: "We blend youthful insight with design trends to create modern, platform-aware graphics that truly resonate.",
  },
  {
    icon: MessagesSquare,
    title: "Communication",
    desc: "From brief to delivery, we collaborate closely, ensuring every client feels heard, respected, and satisfied.",
  },
  {
    icon: Heart,
    title: "Emotion",
    desc: "Our work connects beyond visuals. Each piece tells a story, evokes feeling, and empowers clients with pride and clarity.",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="about" className="bg-mist py-24 md:py-32">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger()}
          className="max-w-xl"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>Why Choose Us</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
          >
            Designs that speak with clarity and purpose.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-ink/65">
            We give life to your ideas through excellent designs that blend
            soul and aesthetics in a way that reflects the uniqueness of our
            clients.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger(0.06)}
          className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5"
        >
          {VALUES.map((value) => (
            <motion.div
              key={value.title}
              variants={fadeUp}
              className="flex flex-col gap-4 bg-paper p-7"
            >
              <value.icon size={22} className="text-accent" />
              <h3 className="font-display text-base font-semibold text-ink">
                {value.title}
              </h3>
              <p className="text-sm leading-relaxed text-ink/60">
                {value.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

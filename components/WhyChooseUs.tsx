"use client";

import { motion } from "framer-motion";
import {
  Feather,
  Fingerprint,
  TrendingUp,
  MessagesSquare,
  Heart,
} from "lucide-react";
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
    desc: "No templates or shortcuts. Each design is custom-crafted to reflect your unique message and audience.",
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
    <section id="about" className="pb-20 pt-0">
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
            className="mt-4 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl"
          >
            Our designs speak with <br className="hidden md:block" /> clarity
            and purpose
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-xs md:text-sm text-ink/65"
          >
            We give life to your ideas through excellent designs that blend soul{" "}
            <br className="hidden md:block" />
            and aesthetics in a way that reflects the uniqueness of our clients
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger(0.06)}
          className="mt-14 grid gap-2 overflow-hidden  rounded-2xl sm:grid-cols-2 lg:grid-cols-5"
        >
          {VALUES.map((value) => (
            <motion.div
              key={value.title}
              variants={fadeUp}
              className="flex flex-col gap-4 bg-[#030142] p-7"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20">
                <value.icon size={18} className="text-white" />
              </div>
              <h3 className="font-display text-base font-semibold text-white">
                {value.title}
              </h3>
              <p className="md:text-sm text-xs text-white/70">{value.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

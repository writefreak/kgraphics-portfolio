"use client";

import { motion } from "framer-motion";
import { Mail, Phone, ArrowUpRight } from "lucide-react";
import { Container } from "./Container";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger()}
          className="relative overflow-hidden rounded-3xl bg-ink px-8 py-16 text-center md:px-16 md:py-24"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/30 blur-[100px]"
          />

          <motion.h2
            variants={fadeUp}
            className="relative font-display text-3xl font-bold tracking-tight text-paper sm:text-4xl md:text-5xl"
          >
            Let&apos;s create something stunning.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="relative mx-auto mt-4 max-w-md text-paper/65"
          >
            Tell us about your brand, your event, or your idea, and we&apos;ll
            bring it to life.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="relative mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href="mailto:estheramuleya3@gmail.com"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-paper"
            >
              <Mail size={16} />
              estheramuleya3@gmail.com
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <a
              href="tel:+2349030260393"
              className="inline-flex items-center gap-2 rounded-full border border-paper/20 px-7 py-3.5 text-sm font-semibold text-paper transition-colors hover:border-paper/50"
            >
              <Phone size={16} />
              (+234) 903 026 0393
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

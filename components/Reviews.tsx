"use client";

import { motion } from "framer-motion";
import { Quote, Star, MessageSquarePlus } from "lucide-react";
import { Container, SectionLabel } from "./Container";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

const REVIEWS = [
  {
    name: "Tobi A.",
    role: "Founder, Aurelle Skincare",
    quote:
      "K-Graphics didn't just design a logo, she translated everything our brand stands for into something people remember.",
  },
  {
    name: "Pastor Daniel E.",
    role: "Lumen Church Conference",
    quote:
      "Every poster felt intentional. There was a reverence in the work that matched the heart behind our event.",
  },
  {
    name: "Chiamaka O.",
    role: "Naija Eats",
    quote:
      "Responsive, easy to work with, and the kind of designer who actually listens before she starts creating.",
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="bg-ink py-24 text-paper md:py-32">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger()}
          className="max-w-xl"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent"
          >
            <span className="h-px w-6 bg-accent" />
            Client Reviews
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl"
          >
            What our valued clients say about us.
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger(0.08)}
          className="mt-14 grid gap-5 lg:grid-cols-3"
        >
          {REVIEWS.map((review) => (
            <motion.div
              key={review.name}
              variants={fadeUp}
              className="flex flex-col gap-5 rounded-2xl border border-paper/10 bg-paper/[0.04] p-7"
            >
              <Quote size={22} className="text-accent" />
              <p className="flex-1 text-sm leading-relaxed text-paper/80">
                &ldquo;{review.quote}&rdquo;
              </p>
              <div className="flex items-center justify-between border-t border-paper/10 pt-5">
                <div>
                  <p className="text-sm font-semibold text-paper">
                    {review.name}
                  </p>
                  <p className="text-xs text-paper/50">{review.role}</p>
                </div>
                <div className="flex gap-0.5 text-accent">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mt-10 flex flex-col items-start justify-between gap-5 rounded-2xl border border-paper/10 bg-paper/[0.04] p-7 sm:flex-row sm:items-center"
        >
          <div>
            <p className="font-display text-lg font-semibold text-paper">
              Share your unique experience.
            </p>
            <p className="mt-1 text-sm text-paper/60">
              Tell us what you love about our services and how we can shine
              even brighter.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-paper"
          >
            <MessageSquarePlus size={16} />
            Leave a Review
          </a>
        </motion.div>
      </Container>
    </section>
  );
}

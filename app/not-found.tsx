"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/Container";
import { fadeUp, stagger } from "@/lib/motion";

export default function NotFound() {
  return (
    <section className="flex min-h-[90vh] items-center py-24">
      <Container>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger()}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div variants={fadeUp} className="relative select-none">
            <h1 className="relative font-display text-3xl font-bold leading-none text-ink mix-blend-multiply sm:text-7xl md:text-8xl">
              404
            </h1>
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="md:pt-6 pt-3
             font-display text-lg tracking-tight text-neutral-600 sm:text-2xl"
          >
            Sorry, this page doesn&apos;t exist
          </motion.p>
          {/* <motion.p
            variants={fadeUp}
            className="mt-4 text-sm text-ink/65 md:text-base"
          >
            The page you&apos;re looking for doesn't exist.But the rest of the
            work does. Let&apos;s get you back on track.
          </motion.p> */}

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-2xl bg-ink px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-accent"
            >
              Back to homepage
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

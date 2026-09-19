"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp } from "@/lib/motion";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const WHATSAPP_NUMBER = "8129460632";
const WHATSAPP_MESSAGE =
  "Hi K-Graphics, I'd like to start a project with you. Can we talk?";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`;

const BRAND_STORY_PATH = "/brand-story.pdf";

export default function TestHero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-40%", "40%"]);

  async function handleBrandStoryDownload() {
    try {
      const res = await fetch(BRAND_STORY_PATH);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "K-Graphics-Brand-Story.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Brand story download failed:", err);
    }
  }

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative overflow-hidden md:flex h-150 md:h-screen md:items-center"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* gradient overlay, left to right */}
        <div className="absolute inset-0 z-10 bg-linear-to-r from-black/85 via-black/65 to-black/35" />
        <motion.img
          src="/kghero.png"
          alt="Kgraphics Hero Image"
          loading="eager"
          decoding="sync"
          fetchPriority="high"
          style={{ y: imageY }}
          className="h-full w-full object-cover absolute  left-0"
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-36  md:px-14 md:pt-28 md:pb-20"
      >
        <div className="max-w-4xl md:max-w-2xl">
          <div className="flex flex-col  gap-3">
            {/* <motion.h1
              variants={item}
              className="font-jet text-left text-[38px] font-extrabold leading-[1.05] tracking-tight text-white md:text-6xl md:font-semibold md:leading-[1.08]"
            >
              Transforming ideas <br className="hidden md:block" /> into
              timeless visual expressions.
            </motion.h1> */}

            <motion.h1
              variants={fadeUp}
              className="font-display md:text-6xl text-[34px] font- leading-[1.1] tracking-tight text-white"
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
              variants={item}
              className="text-xs text-left leading-relaxed text-neutral-300 md:mt-0 md:max-w-sm md:w-full w-64 md:text-sm font-sans"
            >
              At K-Graphics, we transform ideas into thoughtful brand identities
              and intuitive digital experiences that help businesses connect
              with the right audience.
            </motion.p>
          </div>

          <motion.div
            variants={item}
            className=" flex flex-col md:flex-row md:items-center gap-2 md:gap-4 pt-8 md:pt-10 "
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-2 items-center md:w-52 w-[210px] md:items-center md:justify-center bg-ink text-white font-medium px-8 py-4 rounded-2xl hover:bg-blue transition-colors duration-200 text-sm"
            >
              Start a project
              <ArrowRight size={14} />
            </a>
            <button className="flex md:w-44 w-48 md:items-center md:justify-center border bg-white/10 backdrop-blur-md border-white/40 text-white font-medium px-8 py-4 rounded-2xl hover:border-blue hover:text-blue transition-colors duration-200 text-sm">
              See Portfolio
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

"use client";

import { motion, useInView, animate } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Container } from "./Container";
import WhyChooseUs from "./WhyChooseUs";

const BODY_1 =
  "At K-Graphics, we believe great design begins long before the final visual is created. It begins with understanding the brand, the people it is trying to reach, the message it needs to communicate and the experience it wants to create. Our approach is rooted in strategy, ensuring that every design decision has a clear purpose rather than being driven by aesthetics alone. We value authenticity, creating visual solutions that feel true to each brand instead of forcing every business into the same design language.";

const BODY_2 =
  "We consider relevance by paying attention to the audience, context, platform and changing ways people interact with brands. We believe communication should be clear, intentional and easy to understand, because even the most beautiful design loses its value when the message is unclear. Above all, we think about experience, considering how people encounter, understand, interact with and remember the work we create. These principles shape everything we do, from brand identity and communication design to social media content, packaging and digital product experiences.";

const MOBILE_PAGES = [BODY_1, BODY_2];

const STATS = [
  { target: 50, suffix: "+", label: "Projects Delivered" },
  { target: 5, suffix: "+", label: "Countries" },
  { target: 5, suffix: "+", label: "Years of Experience" },
  { target: 100, suffix: "%", label: "Client Satisfaction" },
];

function CountStat({
  target,
  suffix,
  label,
  valueClassName,
  labelClassName,
}: {
  target: number;
  suffix: string;
  label: string;
  valueClassName: string;
  labelClassName: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) {
      setDisplay(0);
      return;
    }
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, target]);

  return (
    <div className="bg-white shadow-xs border border-neutral-50 rounded-2xl p-4">
      <p ref={ref} className={valueClassName}>
        {display}
        {suffix}
      </p>
      <p className={labelClassName}>{label}</p>
    </div>
  );
}

const AboutMe = () => {
  const cardRef = useRef(null);
  const [flipped, setFlipped] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const set = () =>
      document.documentElement.style.setProperty(
        "--svh",
        `${window.innerHeight * 0.01}px`,
      );
    set();
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, []);

  const ImageCard = (
    <div
      ref={cardRef}
      className="aspect-3/4 w-full"
      style={{ perspective: "1200px" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((v) => !v)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full h-full"
      >
        {/* Front — photo (default) */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src="/kemi.jpeg"
            alt=""
            className="h-full w-full object-cover rounded-2xl"
          />
        </div>

        {/* Back — name card (on hover/click) */}
        <div
          className="absolute inset-0 rounded-2xl bg-ink flex flex-col items-center justify-center gap-4 px-8"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <h2 className="text-white font-display text-2xl md:text-3xl font-black text-center leading-tight">
            Hello, I'm Oluwakemisola Esther
          </h2>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div id="about">
      <section className="min-h-screen md:pt-28 pt-22 pb-17  bg-white flex items-center">
        <Container>
          {/* Title (mobile only, shown above the image) */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:hidden text-3xl font-display font-bold text-ink leading-none mb-10"
          >
            The Creative Thinking Behind Every Design
          </motion.h1>

          {/* MOBILE LAYOUT */}
          <div className="md:hidden flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <motion.p
                key={page}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-xs font-sans leading-relaxed text-neutral-600"
              >
                {MOBILE_PAGES[page]}
              </motion.p>
            </div>
            {ImageCard}

            <div className="grid grid-cols-2 gap-6">
              {STATS.map((stat) => (
                <CountStat
                  key={stat.label}
                  target={stat.target}
                  suffix={stat.suffix}
                  label={stat.label}
                  valueClassName="font-display text-2xl font-bold text-ink"
                  labelClassName="text-xs text-neutral-600"
                />
              ))}
            </div>

            <Link
              href="/portfolio"
              className="inline-flex w-fit items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-white bg-ink"
            >
              See Our Work
            </Link>
          </div>

          {/* DESKTOP LAYOUT */}
          <div className="hidden md:grid grid-cols-3 gap-12 items-center">
            {/* LHS: title + body 1 */}
            <div className="flex flex-col gap-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-display font-bold text-ink leading-none"
              >
                The Creative Thinking Behind Every Design
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-sm font-sans leading-relaxed text-neutral-600"
              >
                {BODY_1}
              </motion.p>
            </div>

            {/* Middle: image */}
            {ImageCard}

            {/* RHS: stats + button */}
            <div className="flex flex-col gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="grid grid-cols-2 gap-8"
              >
                {STATS.map((stat) => (
                  <CountStat
                    key={stat.label}
                    target={stat.target}
                    suffix={stat.suffix}
                    label={stat.label}
                    valueClassName="font-display text-3xl font-bold text-ink"
                    labelClassName="text-xs md:text-sm text-neutral-600"
                  />
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex md:pt-10"
              >
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-white bg-ink"
                >
                  See Our Work
                </Link>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>
      {/* <WhyChooseUs /> */}
    </div>
  );
};

export default AboutMe;

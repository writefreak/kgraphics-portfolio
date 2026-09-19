"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";
import {
  Feather,
  Fingerprint,
  TrendingUp,
  MessagesSquare,
  Heart,
} from "lucide-react";
import { Container } from "./Container";

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

// Duplicated so the track can loop seamlessly
const LOOP_VALUES = [...VALUES, ...VALUES];

function ValueCard({ value }: { value: (typeof VALUES)[number] }) {
  return (
    <div className="flex w-[280px] shrink-0 flex-col gap-4 rounded-2xl bg-[#030142] p-7">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20">
        <value.icon size={18} className="text-white" />
      </div>
      <h3 className="font-display text-base font-semibold text-white">
        {value.title}
      </h3>
      <p className="text-xs text-white/70 md:text-sm">{value.desc}</p>
    </div>
  );
}

export default function WhyChooseUs() {
  const trackRef = useRef<HTMLDivElement>(null);
  const baseX = useMotionValue(0);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 40,
    stiffness: 300,
  });
  const velocityFactor = useTransform(
    smoothVelocity,
    [-2000, 0, 2000],
    [-6, 0, 6],
    {
      clamp: false,
    },
  );

  useAnimationFrame((_, delta) => {
    // constant slow drift to the left, boosted/reversed by scroll velocity
    const baseSpeed = 0.4; // px per ms, always moving
    let moveBy = baseSpeed * (delta / 16.6);
    moveBy += moveBy * velocityFactor.get();

    let next = baseX.get() - moveBy;

    // loop the track: reset once we've scrolled past one full set of cards
    const trackWidth = trackRef.current ? trackRef.current.scrollWidth / 2 : 0;
    if (trackWidth > 0) {
      if (next <= -trackWidth) next += trackWidth;
      if (next > 0) next -= trackWidth;
    }

    baseX.set(next);
  });

  const x = useTransform(baseX, (v) => `${v}px`);

  return (
    <section id="about">
      <Container className="relative overflow-hidden ">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl max-w-sm font-display font-bold text-ink leading-none mb-10"
        >
          Our designs speak with clarity and purpose
        </motion.h1>
        <div className="overflow-hidden rounded-2xl">
          <motion.div ref={trackRef} style={{ x }} className="flex w-max gap-2">
            {LOOP_VALUES.map((value, i) => (
              <ValueCard key={`${value.title}-${i}`} value={value} />
            ))}
          </motion.div>
        </div>
      </Container>
      {/* </Container> */}
    </section>
  );
}

import type { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const stagger = (delayChildren = 0.08): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: delayChildren,
    },
  },
});

export const viewportOnce = { once: true, margin: "-80px" };

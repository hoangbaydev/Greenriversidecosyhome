/** Subtle motion tokens - max 0.6s, performance-first */

export const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0 },
};

export const fadeRight = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0 },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96, y: 10 },
  visible: { opacity: 1, scale: 1 },
};

export const pageEnter = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.085, delayChildren: 0.08 },
  },
};

export const staggerFast = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.045, delayChildren: 0.03 },
  },
};

export const defaultTransition = {
  duration: 0.58,
  ease: [0.22, 1, 0.36, 1] as const,
};

export const fastTransition = {
  duration: 0.34,
  ease: [0.22, 1, 0.36, 1] as const,
};

export const pageTransition = {
  duration: 0.46,
  ease: [0.22, 1, 0.36, 1] as const,
};

export const viewportOnce = {
  once: true,
  margin: "-48px",
  amount: 0.12 as const,
};

export type MotionVariantName = "fadeUp" | "fadeIn" | "fadeLeft" | "fadeRight" | "scaleIn";

type MotionVariant = {
  hidden: Record<string, number>;
  visible: Record<string, number>;
};

export const motionVariants: Record<MotionVariantName, MotionVariant> = {
  fadeUp,
  fadeIn,
  fadeLeft,
  fadeRight,
  scaleIn,
};

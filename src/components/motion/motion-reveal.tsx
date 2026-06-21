"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  defaultTransition,
  motionVariants,
  viewportOnce,
  type MotionVariantName,
} from "@/lib/motion";

type MotionRevealProps = {
  variant?: MotionVariantName;
  delay?: number;
  as?: "div" | "section" | "article" | "header" | "ul" | "li";
  className?: string;
  children: ReactNode;
};

export function MotionReveal({
  variant = "fadeUp",
  delay = 0,
  as = "div",
  className,
  children,
}: MotionRevealProps) {
  const reduce = useReducedMotion();
  const Component = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={motionVariants[variant]}
      transition={{ ...defaultTransition, delay }}
      className={className}
    >
      {children}
    </Component>
  );
}

export function MotionMount({
  variant = "fadeUp",
  delay = 0,
  className,
  children,
}: {
  variant?: MotionVariantName;
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={motionVariants[variant]}
      transition={{ ...defaultTransition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

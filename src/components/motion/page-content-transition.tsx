"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { pageEnter, pageTransition } from "@/lib/motion";

export function PageContentTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  if (reduce || pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <motion.div
      key={pathname}
      initial="hidden"
      animate="visible"
      variants={pageEnter}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
}

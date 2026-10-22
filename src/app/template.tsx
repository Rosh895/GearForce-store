"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/** Gentle route transition. Opacity + a few pixels of travel only, so it stays cheap on mobile. */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}

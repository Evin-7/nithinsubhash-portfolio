"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.18,
  });

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX: progress, transformOrigin: "0% 50%" }}
      aria-hidden="true"
    />
  );
}

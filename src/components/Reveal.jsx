"use client";

import { motion, useReducedMotion } from "framer-motion";

const directions = {
  up: { x: 0, y: 24 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  id,
}) {
  const reduceMotion = useReducedMotion();
  const offset = directions[direction] ?? directions.up;

  return (
    <motion.div
      id={id}
      className={className}
      initial={reduceMotion ? false : { opacity: 0, ...offset }}
      whileInView={reduceMotion ? undefined : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </motion.div>
  );
}

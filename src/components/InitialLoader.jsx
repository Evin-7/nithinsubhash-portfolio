"use client";

import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import logoMark from "../assets/icons/nithin-logo.svg";

const WORDS = ["Design", "Create", "Inspire"];
const DURATION = 2700;
const WORD_INTERVAL = 900;
const EXIT_DELAY = 400;

export default function InitialLoader({ onComplete }) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [exiting, setExiting] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    document.body.classList.add("is-initial-loading");

    let frameId;
    let exitTimer;
    const start = performance.now();

    const finish = () => {
      setCount(100);
      setExiting(true);
      exitTimer = window.setTimeout(() => {
        document.body.classList.remove("is-initial-loading");
        onCompleteRef.current();
      }, EXIT_DELAY);
    };

    const tick = (now) => {
      const progress = Math.min((now - start) / DURATION, 1);
      setCount(Math.round(progress * 100));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
        return;
      }

      finish();
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
      if (exitTimer) window.clearTimeout(exitTimer);
      document.body.classList.remove("is-initial-loading");
    };
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setWordIndex((index) => (index + 1) % WORDS.length);
    }, WORD_INTERVAL);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 1 }}
        animate={{ opacity: exiting ? 0 : 1 }}
        transition={{ duration: EXIT_DELAY / 1000, ease: "easeInOut" }}
        className="initial-loader"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="initial-loader-brand"
        >
          <Image src={logoMark} alt="" className="initial-loader-logo" priority />
        </motion.div>

        <div className="initial-loader-word-wrap">
          <AnimatePresence mode="wait">
            <motion.span
              key={wordIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="initial-loader-word"
            >
              {WORDS[wordIndex]}
            </motion.span>
          </AnimatePresence>
        </div>

        <span className="initial-loader-count">{String(count).padStart(3, "0")}</span>

        <div className="initial-loader-progress-track">
          <div
            className="initial-loader-progress"
            style={{ width: `${count}%` }}
          />
        </div>
      </motion.div>
    </MotionConfig>
  );
}

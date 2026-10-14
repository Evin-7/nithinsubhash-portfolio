"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }) {
  useEffect(() => {
    if (
      window.matchMedia(
        "(prefers-reduced-motion: reduce), (pointer: coarse)"
      ).matches
    ) {
      return undefined;
    }

    const lenis = new Lenis({
      anchors: true,
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });
    gsap.registerPlugin(ScrollTrigger);
    lenis.on("scroll", ScrollTrigger.update);

    let frameId;
    const frame = (time) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(frame);
    };

    frameId = window.requestAnimationFrame(frame);

    return () => {
      window.cancelAnimationFrame(frameId);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
    };
  }, []);

  return children;
}

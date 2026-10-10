"use client";

import { useEffect, useRef } from "react";

export default function CursorFollower() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    );

    if (!cursor || !finePointer.matches) return undefined;

    const target = { x: -100, y: -100 };
    const current = { x: -100, y: -100 };
    let animationFrame = null;
    let isVisible = false;

    document.body.classList.add("cursor-ring-enabled");

    const render = () => {
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;
      cursor.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`;

      if (Math.abs(target.x - current.x) > 0.1 || Math.abs(target.y - current.y) > 0.1) {
        animationFrame = window.requestAnimationFrame(render);
      } else {
        animationFrame = null;
      }
    };

    const requestRender = () => {
      if (animationFrame === null) animationFrame = window.requestAnimationFrame(render);
    };

    const handlePointerMove = (event) => {
      target.x = event.clientX;
      target.y = event.clientY;
      if (!isVisible) {
        isVisible = true;
        cursor.classList.add("is-visible");
      }

      const element = event.target instanceof Element ? event.target : null;
      cursor.classList.toggle(
        "is-hovering",
        Boolean(element?.closest("a, button, input, textarea, select, [role='button'], .interactive"))
      );
      requestRender();
    };

    const handlePointerDown = () => cursor.classList.add("is-pressed");
    const handlePointerUp = () => cursor.classList.remove("is-pressed");
    const handlePointerLeave = (event) => {
      if (!event.relatedTarget) {
        isVisible = false;
        cursor.classList.remove("is-visible", "is-hovering");
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      document.documentElement.removeEventListener("mouseleave", handlePointerLeave);
      document.body.classList.remove("cursor-ring-enabled");
    };
  }, []);

  return (
    <span ref={cursorRef} className="cursor-ring" aria-hidden="true">
      <span className="cursor-ring-orbit" />
      <span className="cursor-ring-dot" />
    </span>
  );
}

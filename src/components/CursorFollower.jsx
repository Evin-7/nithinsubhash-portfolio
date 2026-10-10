"use client";

import { useEffect, useRef } from "react";

export default function CursorFollower() {
  const coreRef = useRef(null);
  const followRef = useRef(null);

  useEffect(() => {
    const core = coreRef.current;
    const follow = followRef.current;
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    );

    if (!core || !follow || !finePointer.matches) return undefined;

    const target = { x: -40, y: -40 };
    const corePosition = { x: -40, y: -40 };
    const followPosition = { x: -40, y: -40 };
    let animationFrame = null;
    let isVisible = false;

    document.body.classList.add("custom-cursor-enabled");

    const render = () => {
      animationFrame = null;
      corePosition.x += (target.x - corePosition.x) * 0.34;
      corePosition.y += (target.y - corePosition.y) * 0.34;
      followPosition.x += (target.x - followPosition.x) * 0.14;
      followPosition.y += (target.y - followPosition.y) * 0.14;

      core.style.transform = `translate3d(${corePosition.x}px, ${corePosition.y}px, 0)`;
      follow.style.transform = `translate3d(${followPosition.x}px, ${followPosition.y}px, 0)`;

      const coreDistance = Math.hypot(target.x - corePosition.x, target.y - corePosition.y);
      const followDistance = Math.hypot(target.x - followPosition.x, target.y - followPosition.y);
      if (coreDistance > 0.15 || followDistance > 0.15) {
        animationFrame = window.requestAnimationFrame(render);
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
        core.classList.add("is-visible");
        follow.classList.add("is-visible");
      }

      const element = event.target instanceof Element ? event.target : null;
      const isHovering = Boolean(
        element?.closest("a, button, input, textarea, select, [role='button'], .interactive")
      );
      core.classList.toggle("is-hovering", isHovering);
      follow.classList.toggle("is-hovering", isHovering);
      requestRender();
    };

    const handlePointerLeave = (event) => {
      if (event.relatedTarget) return;
      isVisible = false;
      core.classList.remove("is-visible", "is-hovering", "is-pressed");
      follow.classList.remove("is-visible", "is-hovering");
    };

    const handlePointerDown = () => core.classList.add("is-pressed");
    const handlePointerUp = () => core.classList.remove("is-pressed");

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
      document.body.classList.remove("custom-cursor-enabled");
    };
  }, []);

  return (
    <>
      <span ref={coreRef} className="custom-cursor-core" aria-hidden="true" />
      <span ref={followRef} className="custom-cursor-follow" aria-hidden="true" />
    </>
  );
}

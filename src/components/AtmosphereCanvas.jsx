"use client";

import { useEffect, useRef } from "react";

const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);
const lerp = (from, to, amount) => from + (to - from) * amount;

const createParticle = (width, height, motionScale) => {
  const depth = 0.35 + Math.random() * 0.9;

  return {
    x: Math.random() * width,
    y: Math.random() * height,
    depth,
    size: 0.45 + depth * 1.25,
    alpha: 0.055 + depth * 0.13,
    phase: Math.random() * Math.PI * 2,
    speed: (0.035 + Math.random() * 0.105) * motionScale,
    driftX: (1.5 + Math.random() * 5.5) * motionScale,
    driftY: (1.5 + Math.random() * 5.5) * motionScale,
  };
};

export default function AtmosphereCanvas({ enableTrail = true }) {
  const backgroundRef = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    const backgroundCanvas = backgroundRef.current;
    const trailCanvas = trailRef.current;
    const backgroundContext = backgroundCanvas?.getContext("2d");
    const trailContext = trailCanvas?.getContext("2d");

    if (!backgroundCanvas || !trailCanvas || !backgroundContext || !trailContext) return undefined;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const hasFinePointer = finePointerQuery.matches;
    const reducedMotion = reducedMotionQuery.matches;
    const trailEnabled = enableTrail && hasFinePointer && !reducedMotion;
    const lowMotion = !hasFinePointer || /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

    const viewport = { width: 0, height: 0, pixelRatio: 1 };
    const pointerTarget = { x: -200, y: -200 };
    const pointerCurrent = { x: -200, y: -200 };
    const lastPointer = { x: -200, y: -200 };
    const trailPoints = Array.from({ length: 36 }, () => ({ x: -200, y: -200, life: 0 }));
    const particles = [];

    let trailHead = 0;
    let trailPointCount = 0;
    let pointerVelocity = 0;
    let smoothVelocity = 0;
    let isPointerActive = false;
    let isHoveringInteractive = false;
    let animationFrame = null;
    let lastFrameTime = 0;
    let isHidden = document.hidden;

    const resize = () => {
      const oldWidth = viewport.width;
      const oldHeight = viewport.height;
      viewport.width = window.innerWidth;
      viewport.height = window.innerHeight;
      viewport.pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      backgroundCanvas.width = Math.round(viewport.width * viewport.pixelRatio);
      backgroundCanvas.height = Math.round(viewport.height * viewport.pixelRatio);
      trailCanvas.width = backgroundCanvas.width;
      trailCanvas.height = backgroundCanvas.height;
      backgroundContext.setTransform(viewport.pixelRatio, 0, 0, viewport.pixelRatio, 0, 0);
      trailContext.setTransform(viewport.pixelRatio, 0, 0, viewport.pixelRatio, 0, 0);

      if (oldWidth && oldHeight) {
        const scaleX = viewport.width / oldWidth;
        const scaleY = viewport.height / oldHeight;
        particles.forEach((particle) => {
          particle.x *= scaleX;
          particle.y *= scaleY;
        });
      }

      const area = viewport.width * viewport.height;
      const particleMin = lowMotion ? 34 : 72;
      const particleMax = lowMotion ? 64 : 190;
      const targetCount = Math.round(clamp(area / 12500, particleMin, particleMax));
      const motionScale = lowMotion ? 0.22 : 1;

      while (particles.length < targetCount) {
        particles.push(createParticle(viewport.width, viewport.height, motionScale));
      }
      if (particles.length > targetCount) particles.length = targetCount;
    };

    const drawBackground = (time) => {
      const { width, height } = viewport;
      backgroundContext.clearRect(0, 0, width, height);

      const ambient = backgroundContext.createRadialGradient(
        width * 0.52,
        height * 0.38,
        0,
        width * 0.52,
        height * 0.38,
        Math.max(width, height) * 0.72
      );
      ambient.addColorStop(0, "rgba(205, 249, 125, 0.012)");
      ambient.addColorStop(0.5, "rgba(101, 231, 212, 0.003)");
      ambient.addColorStop(1, "rgba(5, 7, 5, 0)");
      backgroundContext.fillStyle = ambient;
      backgroundContext.fillRect(0, 0, width, height);

      if (hasFinePointer && isPointerActive) {
        const lightRadius = 170 + smoothVelocity * 100;
        const pointerLight = backgroundContext.createRadialGradient(
          pointerCurrent.x,
          pointerCurrent.y,
          0,
          pointerCurrent.x,
          pointerCurrent.y,
          lightRadius
        );
        pointerLight.addColorStop(0, `rgba(205, 249, 125, ${0.025 + (isHoveringInteractive ? 0.01 : 0)})`);
        pointerLight.addColorStop(0.32, "rgba(142, 234, 88, 0.008)");
        pointerLight.addColorStop(1, "rgba(5, 7, 5, 0)");
        backgroundContext.fillStyle = pointerLight;
        backgroundContext.fillRect(0, 0, width, height);
      }

      backgroundContext.globalCompositeOperation = "lighter";
      particles.forEach((particle, index) => {
        const swayX = Math.sin(time * particle.speed + particle.phase) * particle.driftX;
        const swayY = Math.cos(time * particle.speed * 0.82 + particle.phase) * particle.driftY;
        let x = particle.x + swayX;
        let y = particle.y + swayY;

        if (hasFinePointer && isPointerActive) {
          const deltaX = pointerCurrent.x - x;
          const deltaY = pointerCurrent.y - y;
          const distance = Math.hypot(deltaX, deltaY);
          const influence = Math.pow(clamp(1 - distance / 180), 2);
          x -= deltaX * influence * 0.018;
          y -= deltaY * influence * 0.018;
        }

        const radius = particle.size * (0.85 + particle.depth * 0.16);
        backgroundContext.beginPath();
        backgroundContext.fillStyle = `rgba(205, 249, 125, ${particle.alpha})`;
        backgroundContext.arc(x, y, radius, 0, Math.PI * 2);
        backgroundContext.fill();

        if (particle.depth > 1 && index % 3 === 0) {
          const glow = backgroundContext.createRadialGradient(x, y, 0, x, y, radius * 4.5);
          glow.addColorStop(0, `rgba(205, 249, 125, ${particle.alpha * 0.45})`);
          glow.addColorStop(1, "rgba(205, 249, 125, 0)");
          backgroundContext.fillStyle = glow;
          backgroundContext.beginPath();
          backgroundContext.arc(x, y, radius * 4.5, 0, Math.PI * 2);
          backgroundContext.fill();
        }
      });
      backgroundContext.globalCompositeOperation = "source-over";
    };

    const addTrailPoint = (x, y, life) => {
      trailHead = (trailHead + 1) % trailPoints.length;
      trailPoints[trailHead].x = x;
      trailPoints[trailHead].y = y;
      trailPoints[trailHead].life = life;
      trailPointCount = Math.min(trailPointCount + 1, trailPoints.length);
    };

    const drawTrailSegment = (from, to, age, layer) => {
      const life = ((from.life + to.life) * 0.5) * (0.16 + age * 0.84);
      if (life < 0.012) return;

      const midpointX = lerp(from.x, to.x, 0.5);
      const midpointY = lerp(from.y, to.y, 0.5);
      const speedStretch = 1 + smoothVelocity * 0.7;
      const width = layer.width * (0.72 + age * 0.46) * speedStretch;
      trailContext.beginPath();
      trailContext.moveTo(from.x, from.y);
      trailContext.quadraticCurveTo(from.x, from.y, midpointX, midpointY);
      trailContext.quadraticCurveTo(to.x, to.y, to.x, to.y);
      trailContext.lineWidth = width;
      trailContext.strokeStyle = layer.color(life);
      trailContext.stroke();
    };

    const drawTrail = () => {
      const { width, height } = viewport;
      trailContext.clearRect(0, 0, width, height);
      if (!trailEnabled || trailPointCount === 0) return;

      trailPoints.forEach((point) => {
        point.life *= isPointerActive ? 0.91 : 0.84;
      });

      if (isPointerActive) {
        const distanceToTarget = Math.hypot(
          pointerTarget.x - pointerCurrent.x,
          pointerTarget.y - pointerCurrent.y
        );
        if (distanceToTarget > 0.35) {
          addTrailPoint(pointerCurrent.x, pointerCurrent.y, clamp(0.38 + smoothVelocity * 1.4, 0.38, 1));
        }
      }

      const visiblePoints = Math.min(trailPointCount, Math.round(11 + smoothVelocity * 23));
      const layers = [
        { width: 15, color: (alpha) => `rgba(101, 231, 212, ${alpha * 0.035})` },
        { width: 10, color: (alpha) => `rgba(142, 234, 88, ${alpha * 0.07})` },
        { width: 5.5, color: (alpha) => `rgba(205, 249, 125, ${alpha * 0.19})` },
      ];

      trailContext.save();
      trailContext.globalCompositeOperation = "lighter";
      trailContext.lineCap = "round";
      trailContext.lineJoin = "round";

      layers.forEach((layer) => {
        for (let segment = 0; segment < visiblePoints - 1; segment += 1) {
          const fromIndex = (trailHead - (visiblePoints - 1 - segment) + trailPoints.length) % trailPoints.length;
          const toIndex = (fromIndex + 1) % trailPoints.length;
          drawTrailSegment(trailPoints[fromIndex], trailPoints[toIndex], segment / (visiblePoints - 1), layer);
        }
      });

      const centerRadius = 2.25 + (isHoveringInteractive ? 0.7 : 0) + smoothVelocity * 1.4;
      const centerGlow = trailContext.createRadialGradient(
        pointerCurrent.x,
        pointerCurrent.y,
        0,
        pointerCurrent.x,
        pointerCurrent.y,
        centerRadius * 8
      );
      centerGlow.addColorStop(0, "rgba(238, 255, 202, 0.95)");
      centerGlow.addColorStop(0.12, "rgba(205, 249, 125, 0.8)");
      centerGlow.addColorStop(0.45, `rgba(142, 234, 88, ${0.18 + smoothVelocity * 0.12})`);
      centerGlow.addColorStop(1, "rgba(101, 231, 212, 0)");
      trailContext.fillStyle = centerGlow;
      trailContext.beginPath();
      trailContext.arc(pointerCurrent.x, pointerCurrent.y, centerRadius * 8, 0, Math.PI * 2);
      trailContext.fill();

      trailContext.fillStyle = "rgba(231, 255, 181, 0.92)";
      trailContext.beginPath();
      trailContext.arc(pointerCurrent.x, pointerCurrent.y, centerRadius, 0, Math.PI * 2);
      trailContext.fill();
      trailContext.restore();
    };

    const render = (timestamp) => {
      animationFrame = null;
      if (isHidden) return;

      const elapsed = Math.min(timestamp - lastFrameTime || 16, 64);
      lastFrameTime = timestamp;
      const frameScale = elapsed / 16.67;

      if (trailEnabled) {
        pointerCurrent.x = lerp(pointerCurrent.x, pointerTarget.x, 0.18);
        pointerCurrent.y = lerp(pointerCurrent.y, pointerTarget.y, 0.18);
        smoothVelocity = lerp(smoothVelocity, pointerVelocity, 0.12);
        pointerVelocity *= Math.pow(0.82, frameScale);
      }

      drawBackground(timestamp * 0.001);
      drawTrail();
      animationFrame = window.requestAnimationFrame(render);
    };

    const requestRender = () => {
      if (animationFrame === null && !isHidden && !reducedMotion) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    const handlePointerMove = (event) => {
      if (!trailEnabled) return;

      const nextX = event.clientX;
      const nextY = event.clientY;
      const wasInactive = !isPointerActive;
      if (wasInactive) {
        pointerCurrent.x = nextX;
        pointerCurrent.y = nextY;
        trailPointCount = 0;
        trailPoints.forEach((point) => {
          point.x = nextX;
          point.y = nextY;
          point.life = 0;
        });
      }
      const distance = wasInactive ? 0 : Math.hypot(nextX - lastPointer.x, nextY - lastPointer.y);
      pointerVelocity = clamp(distance / 38, 0, 1.5);
      lastPointer.x = nextX;
      lastPointer.y = nextY;
      pointerTarget.x = nextX;
      pointerTarget.y = nextY;
      isPointerActive = true;

      const element = event.target instanceof Element ? event.target : null;
      isHoveringInteractive = Boolean(
        element?.closest("a, button, input, textarea, select, [role='button'], .interactive")
      );
      requestRender();
    };

    const handlePointerLeave = () => {
      isPointerActive = false;
      isHoveringInteractive = false;
      pointerVelocity = 0;
      requestRender();
    };

    const handleVisibilityChange = () => {
      isHidden = document.hidden;
      if (!isHidden) {
        lastFrameTime = performance.now();
        requestRender();
      }
    };

    resize();
    drawBackground(0);
    drawTrail();
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    if (trailEnabled) {
      document.body.classList.add("atmosphere-cursor-enabled");
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      document.documentElement.addEventListener("mouseleave", handlePointerLeave);
    }

    if (!reducedMotion) requestRender();

    return () => {
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (trailEnabled) {
        document.body.classList.remove("atmosphere-cursor-enabled");
        window.removeEventListener("pointermove", handlePointerMove);
        document.documentElement.removeEventListener("mouseleave", handlePointerLeave);
      }
    };
  }, []);

  return (
    <>
      <canvas ref={backgroundRef} className="atmosphere-background" aria-hidden="true" />
      <canvas ref={trailRef} className="atmosphere-trail" aria-hidden="true" />
    </>
  );
}

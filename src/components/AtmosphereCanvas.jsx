"use client";

import { useEffect, useRef } from "react";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const createParticle = (width, height, motionScale, glowChance) => {
  const depth = 0.35 + Math.random() * 0.65;

  return {
    x: Math.random() * width,
    y: Math.random() * height,
    size: 0.5 + depth * 0.95,
    alpha: 0.12 + depth * 0.2,
    vx: (-0.16 + Math.random() * 0.32) * motionScale,
    vy: (-0.12 + Math.random() * 0.24) * motionScale,
    driftX: (1.2 + Math.random() * 4.8) * motionScale,
    driftY: (1.2 + Math.random() * 4.8) * motionScale,
    phase: Math.random() * Math.PI * 2,
    phaseSpeed: 0.04 + Math.random() * 0.1,
    glow: Math.random() < glowChance,
  };
};

export default function AtmosphereCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 768px), (pointer: coarse)").matches;
    const isLowPower = (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 4;
    const motionScale = isMobile ? 0.5 : isLowPower ? 0.7 : 1.25;
    const glowChance = isMobile || isLowPower ? 0.06 : 0.1;
    const viewport = { width: 0, height: 0, pixelRatio: 1 };
    const particles = [];
    let animationFrame = null;
    let lastTime = 0;
    let isHidden = document.hidden;

    const resize = () => {
      const oldWidth = viewport.width;
      const oldHeight = viewport.height;
      viewport.width = window.innerWidth;
      viewport.height = window.innerHeight;
      viewport.pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(viewport.width * viewport.pixelRatio);
      canvas.height = Math.round(viewport.height * viewport.pixelRatio);
      context.setTransform(viewport.pixelRatio, 0, 0, viewport.pixelRatio, 0, 0);

      if (oldWidth && oldHeight) {
        const scaleX = viewport.width / oldWidth;
        const scaleY = viewport.height / oldHeight;
        particles.forEach((particle) => {
          particle.x *= scaleX;
          particle.y *= scaleY;
        });
      }

      const area = viewport.width * viewport.height;
      const minimum = isMobile ? 28 : 70;
      const maximum = isLowPower ? 105 : isMobile ? 72 : 220;
      const targetCount = Math.round(clamp(area / 14500, minimum, maximum));

      while (particles.length < targetCount) {
        particles.push(createParticle(viewport.width, viewport.height, motionScale, glowChance));
      }
      if (particles.length > targetCount) particles.length = targetCount;
    };

    const wrapParticle = (particle) => {
      const margin = 8;
      if (particle.x < -margin) particle.x = viewport.width + margin;
      if (particle.x > viewport.width + margin) particle.x = -margin;
      if (particle.y < -margin) particle.y = viewport.height + margin;
      if (particle.y > viewport.height + margin) particle.y = -margin;
    };

    const draw = (timestamp) => {
      const elapsed = Math.min((timestamp - lastTime || 16) / 16.67, 3);
      lastTime = timestamp;
      const time = timestamp * 0.001;
      const { width, height } = viewport;

      context.clearRect(0, 0, width, height);
      context.fillStyle = "#0D0F12";
      context.fillRect(0, 0, width, height);
      context.globalCompositeOperation = "lighter";

      particles.forEach((particle) => {
        if (!reducedMotion) {
          particle.x += particle.vx * elapsed;
          particle.y += particle.vy * elapsed;
          wrapParticle(particle);
        }

        const x = particle.x + Math.sin(time * particle.phaseSpeed + particle.phase) * particle.driftX;
        const y = particle.y + Math.cos(time * particle.phaseSpeed * 0.8 + particle.phase) * particle.driftY;
        const shimmer = 0.86 + Math.sin(time * particle.phaseSpeed * 1.7 + particle.phase) * 0.14;

        if (particle.glow) {
          const glowRadius = particle.size * 4.5;
          const glow = context.createRadialGradient(x, y, 0, x, y, glowRadius);
          glow.addColorStop(0, `rgba(216, 232, 255, ${particle.alpha * shimmer * 0.5})`);
          glow.addColorStop(0.35, `rgba(141, 187, 255, ${particle.alpha * shimmer * 0.12})`);
          glow.addColorStop(1, "rgba(141, 187, 255, 0)");
          context.fillStyle = glow;
          context.beginPath();
          context.arc(x, y, glowRadius, 0, Math.PI * 2);
          context.fill();
        }

        context.fillStyle = particle.glow
          ? `rgba(216, 232, 255, ${particle.alpha * shimmer})`
          : `rgba(166, 194, 228, ${particle.alpha * shimmer * 0.72})`;
        context.beginPath();
        context.arc(x, y, particle.size, 0, Math.PI * 2);
        context.fill();
      });

      context.globalCompositeOperation = "source-over";
    };

    const render = (timestamp) => {
      animationFrame = null;
      if (isHidden) return;

      draw(timestamp);
      if (!reducedMotion) animationFrame = window.requestAnimationFrame(render);
    };

    const requestRender = () => {
      if (animationFrame === null && !isHidden && !reducedMotion) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    const handleVisibilityChange = () => {
      isHidden = document.hidden;
      if (!isHidden) {
        lastTime = performance.now();
        draw(lastTime);
        requestRender();
      }
    };

    resize();
    draw(0);
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    requestRender();

    return () => {
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="atmosphere-background" aria-hidden="true" />;
}

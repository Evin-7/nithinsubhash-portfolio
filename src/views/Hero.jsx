"use client";

import { useEffect, useRef, useState } from "react";

const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);
const smoothstep = (value) => value * value * (3 - 2 * value);

export default function Hero() {
  const hero = useRef(null);
  const [sceneEnabled, setSceneEnabled] = useState(false);
  const sceneMetrics = useRef({ top: 0, range: 1 });
  const scrollFrame = useRef(null);
  const pointerFrame = useRef(null);
  const pointerTarget = useRef({ x: 0, y: 0 });

  const supportsScrollScene = () =>
    window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)").matches;

  const updateSceneMetrics = () => {
    if (!hero.current) return;
    sceneMetrics.current.top = hero.current.getBoundingClientRect().top + window.scrollY;
    sceneMetrics.current.range = Math.max(hero.current.offsetHeight - window.innerHeight, 1);
  };

  const resetScrollScene = () => {
    if (!hero.current) return;
    hero.current.style.setProperty("--scene-scale", "1");
    hero.current.style.setProperty("--scene-y", "0px");
    hero.current.style.setProperty("--scene-rotate", "0deg");
    hero.current.style.setProperty("--scene-progress", "0");
  };

  const updateScrollScene = () => {
    scrollFrame.current = null;
    if (!hero.current || !sceneEnabled) return;

    const progress = clamp((window.scrollY - sceneMetrics.current.top) / sceneMetrics.current.range);
    const revealProgress = smoothstep(clamp(progress / 0.18));
    const zoomInProgress = smoothstep(clamp((progress - 0.18) / 0.24));
    const zoomOutProgress = smoothstep(clamp((progress - 0.42) / 0.24));
    const zoomProgress = progress < 0.42 ? zoomInProgress : 1 - zoomOutProgress;

    hero.current.style.setProperty("--scene-scale", (1.16 - revealProgress * 0.16 + zoomProgress * 0.12).toFixed(4));
    hero.current.style.setProperty("--scene-y", `${(18 - revealProgress * 18 - zoomProgress * 7).toFixed(2)}px`);
    hero.current.style.setProperty("--scene-rotate", `${(-1.2 + revealProgress * 1.2 + zoomProgress * 1.3).toFixed(2)}deg`);
    hero.current.style.setProperty("--scene-progress", progress.toFixed(4));
  };

  const requestScrollSceneUpdate = () => {
    if (sceneEnabled && scrollFrame.current === null) {
      scrollFrame.current = window.requestAnimationFrame(updateScrollScene);
    }
  };

  const syncScrollScene = () => {
    const enabled = supportsScrollScene();
    setSceneEnabled(enabled);
    if (enabled) {
      window.requestAnimationFrame(() => {
        updateSceneMetrics();
        requestScrollSceneUpdate();
      });
    } else {
      resetScrollScene();
    }
  };

  useEffect(() => {
    syncScrollScene();
    window.addEventListener("scroll", requestScrollSceneUpdate, { passive: true });
    window.addEventListener("resize", syncScrollScene, { passive: true });
    return () => {
      window.removeEventListener("scroll", requestScrollSceneUpdate);
      window.removeEventListener("resize", syncScrollScene);
      if (scrollFrame.current !== null) window.cancelAnimationFrame(scrollFrame.current);
      if (pointerFrame.current !== null) window.cancelAnimationFrame(pointerFrame.current);
    };
  }, [sceneEnabled]);

  const renderPointer = () => {
    pointerFrame.current = null;
    if (!hero.current) return;
    const { x, y } = pointerTarget.current;
    hero.current.style.setProperty("--pointer-x", `${(x + 0.5) * 100}%`);
    hero.current.style.setProperty("--pointer-y", `${(y + 0.5) * 100}%`);
    hero.current.style.setProperty("--visual-x", `${x * 12}px`);
    hero.current.style.setProperty("--visual-y", `${y * 10}px`);
    hero.current.style.setProperty("--visual-rotate-x", `${y * -4}deg`);
    hero.current.style.setProperty("--visual-rotate-y", `${x * 5}deg`);
  };

  const handlePointerMove = (event) => {
    if (!hero.current || !window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const rect = hero.current.getBoundingClientRect();
    pointerTarget.current.x = (event.clientX - rect.left) / rect.width - 0.5;
    pointerTarget.current.y = (event.clientY - rect.top) / rect.height - 0.5;
    if (pointerFrame.current === null) pointerFrame.current = window.requestAnimationFrame(renderPointer);
  };

  const resetPointer = () => {
    pointerTarget.current = { x: 0, y: 0 };
    if (pointerFrame.current === null) pointerFrame.current = window.requestAnimationFrame(renderPointer);
  };

  return (
    <section ref={hero} className={`hero${sceneEnabled ? " scroll-scene" : ""}`} onPointerMove={handlePointerMove} onPointerLeave={resetPointer}>
      <div className="hero-grid" aria-hidden="true"></div>
      <div className="hero-grain" aria-hidden="true"></div>
      <div className="hero-halo halo-left" aria-hidden="true"></div>
      <div className="hero-halo halo-right" aria-hidden="true"></div>

      <div className="hero-stage">
        <div className="scatter-field" aria-hidden="true">
          {"abcdefghi".split("").map((letter) => <span key={letter} className={`scatter-particle particle-${letter}`}></span>)}
        </div>

        <div className="hero-shell site-container">
          <div className="hero-copy">
            <p className="hero-eyebrow"><span></span>UI/UX designer / digital experiences</p>
            <h1><span className="hero-title-line">Design with purpose.</span><em className="hero-title-line">Create with clarity.</em></h1>
            <p className="hero-intro">I create thoughtful, user-focused digital experiences that balance visual clarity, intuitive interaction, and implementation-ready design.</p>

            <div className="hero-signal-row" aria-label="Professional focus">
              <span className="hero-availability"><i></i>Available for design work</span>
              <span className="hero-signal-code">4+ years / UI/UX / product design</span>
            </div>
            <div className="hero-actions">
              <a className="hero-button hero-button-primary interactive" href="#works">View selected work <span aria-hidden="true">↗</span></a>
              <a className="hero-button hero-button-secondary interactive" href="#contact">Contact Me</a>
            </div>
            <div className="hero-meta" aria-label="Professional focus">
              <div><strong>01</strong><span>Product design</span></div>
              <div><strong>02</strong><span>Design systems</span></div>
              <div><strong>03</strong><span>Responsive UI</span></div>
            </div>
          </div>

          <div className="hero-visual-scroll">
            <div className="hero-visual" aria-hidden="true">
              <div className="visual-aura"></div><div className="visual-beam visual-beam-one"></div><div className="visual-beam visual-beam-two"></div>
              <div className="visual-system">
                <svg className="fracture-map" viewBox="0 0 600 620" fill="none" preserveAspectRatio="none">
                  <path d="M31 48L230 205L184 389L468 574" /><path d="M230 205L526 62" /><path d="M230 205L449 302L578 456" /><path d="M184 389L18 495" /><path d="M184 389L349 498L543 608" /><path d="M449 302L493 175" /><path d="M349 498L394 616" /><circle cx="230" cy="205" r="5" /><circle cx="184" cy="389" r="4" />
                </svg>
                <div className="glass-plane glass-plane-back"></div><div className="glass-plane glass-plane-left"></div><div className="glass-plane glass-plane-right"></div>
                <div className="shard-ui shard-ui-main"><div className="panel-topline"></div><div className="panel-main"><p style={{ paddingLeft: 103 }}>Clear.</p><h2 style={{ paddingLeft: 103 }}>Ship it.</h2><div className="panel-rule"></div><div className="panel-stats" style={{ paddingBottom: 10 }}><div><span>Design</span><strong>Clear</strong></div><div><span>Code</span><strong>Solid</strong></div></div></div></div>
                <div className="shard-ui shard-ui-top"><strong style={{ paddingLeft: 15, fontSize: 15, paddingTop: 10 }}>Make it clear.</strong><span className="shard-detail">Built to last.</span></div>
                <div className="shard-ui shard-ui-side"><span className="shard-label">Signal</span><div className="signal-bars"><i></i><i></i><i></i><i></i></div><strong>Clarity</strong></div>
                <div className="shard-ui shard-ui-bottom"><span>From idea</span></div>
                <div className="glass-shard shard-top"></div><div className="glass-shard shard-bottom"></div><div className="visual-crosshair crosshair-bottom"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-scroll-controls">
          <a className="scroll-prompt interactive" href="#about"><span className="scroll-line"></span><span>Scroll to explore</span></a>
          <div className="hero-scroll-index" aria-hidden="true"><span>01</span><i></i><span>04</span></div>
        </div>
      </div>
    </section>
  );
}

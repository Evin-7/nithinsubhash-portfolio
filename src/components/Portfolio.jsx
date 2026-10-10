"use client";

import { useState } from "react";
import Footer from "./Footer";
import InitialLoader from "./InitialLoader";
import Navbar from "./Navbar";
import Reveal from "./Reveal";
import ScrollProgress from "./ScrollProgress";
import About from "../views/About";
import Contact from "../views/Contact";
import AtmosphereCanvas from "./AtmosphereCanvas";
import CursorFollower from "./CursorFollower";
import Hero from "../views/Hero";
import Highlights from "../views/Highlights";
import Skills from "../views/Skills";
import Works from "../views/Works";

export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="app">
      <AtmosphereCanvas enableTrail={false} />
      <CursorFollower />
      {isLoading ? <InitialLoader onComplete={() => setIsLoading(false)} /> : null}
      <div className="page-shell">
        <Navbar />
        <ScrollProgress />
        <main className="content-shell">
          <section id="home">
            <Hero isLoading={isLoading} />
          </section>
          <Reveal id="works" direction="left" delay={0.04}>
            <Works />
          </Reveal>
          <Reveal id="about" direction="right" delay={0.06}>
            <About />
          </Reveal>
          <Reveal id="skills" direction="up" delay={0.08}>
            <Skills />
          </Reveal>
          <Reveal direction="left" delay={0.1}>
            <Highlights />
          </Reveal>
          <Reveal id="contact" direction="right" delay={0.12}>
            <Contact />
          </Reveal>
        </main>
        <Footer />
      </div>
    </div>
  );
}

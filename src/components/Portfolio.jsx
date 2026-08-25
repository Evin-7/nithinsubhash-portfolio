"use client";

import Footer from "./Footer";
import Navbar from "./Navbar";
import Reveal from "./Reveal";
import ScrollProgress from "./ScrollProgress";
import About from "../views/About";
import Contact from "../views/Contact";
import Hero from "../views/Hero";
import Highlights from "../views/Highlights";
import ProfileShowcase from "../views/ProfileShowcase";
import Skills from "../views/Skills";
import Works from "../views/Works";

export default function Portfolio() {
  return (
    <div className="app">
      <div className="page-shell">
        <Navbar />
        <ScrollProgress />
        <main className="content-shell">
          <section id="home">
            <Hero />
          </section>
          <Reveal direction="up">
            <ProfileShowcase />
          </Reveal>
          <Reveal direction="left" delay={0.04}>
            <Highlights />
          </Reveal>
          <Reveal id="about" direction="right" delay={0.06}>
            <About />
          </Reveal>
          <Reveal id="skills" direction="up" delay={0.08}>
            <Skills />
          </Reveal>
          <Reveal id="works" direction="left" delay={0.1}>
            <Works />
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

"use client";

import { motion, useReducedMotion } from "motion/react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ScrollProgress from "./ScrollProgress";
import About from "../views/About";
import Contact from "../views/Contact";
import Hero from "../views/Hero";
import Highlights from "../views/Highlights";
import ProfileShowcase from "../views/ProfileShowcase";
import Skills from "../views/Skills";
import Works from "../views/Works";

function ScrollSection({ children, id }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      id={id}
      initial={reduceMotion ? false : { opacity: 0, y: 34 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.72, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </motion.div>
  );
}

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
          <ScrollSection>
            <ProfileShowcase />
          </ScrollSection>
          <ScrollSection>
            <Highlights />
          </ScrollSection>
          <ScrollSection id="about">
            <About />
          </ScrollSection>
          <ScrollSection id="skills">
            <Skills />
          </ScrollSection>
          <ScrollSection id="works">
            <Works />
          </ScrollSection>
          <ScrollSection id="contact">
            <Contact />
          </ScrollSection>
        </main>
        <Footer />
      </div>
    </div>
  );
}

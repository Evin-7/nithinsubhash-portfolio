<template>
  <div class="app">
    <div class="page-shell">
      <Navbar />
      <main class="content-shell">
        <section id="home"><Hero /></section>
        <ProfileShowcase />
        <Highlights />
        <section id="about"><About /></section>
        <section id="skills"><Skills /></section>
        <section id="works"><Works /></section>
        <section id="contact"><Contact /></section>
      </main>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import Hero from "./views/Hero.vue";
import ProfileShowcase from "./views/ProfileShowcase.vue";
import Highlights from "./views/Highlights.vue";
import About from "./views/About.vue";
import Skills from "./views/Skills.vue";
import Works from "./views/Works.vue";
import Contact from "./views/Contact.vue";
</script>

<style>
:root {
  --bg-primary: #0d0d0d;
  --bg-surface: #1a1a1a;
  --bg-surface-alt: #151515;
  --gold: #cdf97d;
  --gold-muted: rgba(205, 249, 125, 0.6);
  --gold-border: rgba(205, 249, 125, 0.2);
  --gold-glow: rgba(205, 249, 125, 0.15);
  --text-primary: #f2f2f2;
  --text-secondary: #9a9a9a;
  --code-bg: #101010;
  --gold-deep: #7da83d;
  --gold-light: #e7ffb8;
}

.site-container {
  box-sizing: border-box;
  width: 100%;
  max-width: 90rem;
  margin-inline: auto;
  padding-inline: clamp(1.25rem, 6vw, 1.5rem);
}

@media (min-width: 640px) {
  .site-container {
    padding-inline: 2rem;
  }
}

@media (min-width: 768px) {
  .site-container {
    padding-inline: 3rem;
  }
}

@media (min-width: 1024px) {
  .site-container {
    padding-inline: 5rem;
  }
}

@media (min-width: 1440px) and (max-width: 1535.98px) {
  .site-container {
    max-width: none;
  }
}

@media (min-width: 1536px) {
  .site-container {
    max-width: none;
    padding-inline: clamp(6rem, 7vw, 13.75rem);
  }
}

/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: "Plus Jakarta Sans", "SamsungOne", "Samsung One",
    "SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont,
    "Helvetica Neue", Arial, sans-serif;
  background: var(--bg-primary);
  color: var(--text-primary);
  overflow-x: hidden;
}

.app {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #0d0d0d 0%, #171717 50%, #0d0d0d 100%);
}

.page-shell {
  position: relative;
  z-index: 1;
}

.content-shell {
  position: relative;
  z-index: 0;
  isolation: isolate;
}

.content-shell::before {
  display: none;
}

.content-shell::after {
  display: none;
}

.content-shell > * {
  position: relative;
  z-index: 1;
}

.content-shell > *:not(#home) {
  content-visibility: auto;
  contain-intrinsic-size: auto 700px;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  .content-shell > * {
    transform: none;
  }
}

/* Smooth scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: var(--bg-primary);
}

::-webkit-scrollbar-thumb {
  background: var(--gold);
  border-radius: 3px;
  border: 1px solid var(--bg-primary);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--gold-light);
}
</style>

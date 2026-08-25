<template>
  <section class="about">
    <div class="about-shell site-container">
      <div class="about-copy">
        <p class="about-eyebrow">About</p>
        <h2 class="about-title">
          Thoughtful experiences. Clearer products.
        </h2>
        <p class="about-text">
          I merge creativity with logic to create digital experiences that look
          great, work naturally, and stay practical to build.
        </p>
        <a
          class="about-cv-link"
          href="https://drive.google.com/file/d/1ZWWQpRwakI6nM4hYUjXOWgTxBTjjbpTA/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read Nithin's CV <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div class="experience">
        <div class="experience-item">
          <div>
            <h3>UI/UX Designer</h3>
            <p>4+ years of experience</p>
          </div>
          <span>Present</span>
        </div>
        <div class="experience-item">
          <div>
            <h3>B.Tech Computer Science</h3>
            <p>Kerala Technological University</p>
          </div>
          <span>Education</span>
        </div>
        <div class="experience-item">
          <div>
            <h3>20+ Happy Clients</h3>
            <p>Web, mobile, and product experiences</p>
          </div>
          <span>Selected work</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  padding: 5.5rem 0;
  background: var(--bg-primary);
  position: relative;
  overflow: hidden;
}

.about::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    circle at 100% 0%,
    rgba(205, 249, 125, 0.02) 0%,
    transparent 60%
  );
  pointer-events: none;
}

.about-shell {
  position: relative;
  z-index: 1;
}

.about-copy {
  max-width: 720px;
  animation: slideInUp 0.8s ease-out 0.1s both;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.about-eyebrow {
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--gold);
  opacity: 0.8;
}

.about-title {
  margin-top: 1rem;
  font-size: clamp(2.2rem, 5vw, 4rem);
  line-height: 1.02;
  letter-spacing: -0.04em;
  background: linear-gradient(
    135deg,
    var(--text-primary) 0%,
    var(--gold-light) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.about-text {
  max-width: 620px;
  margin-top: 1.2rem;
  font-size: 1.05rem;
  line-height: 1.75;
  color: var(--text-secondary);
  transition: color 0.3s ease;
}

.about-cv-link {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  margin-top: 1.5rem;
  padding: 0.75rem 1.05rem;
  border: 1px solid var(--gold-border);
  border-radius: 999px;
  color: var(--gold-light);
  background: var(--bg-surface);
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 700;
  transition: transform 220ms ease, border-color 220ms ease,
    background-color 220ms ease;
}

.about-cv-link:hover,
.about-cv-link:focus-visible {
  transform: translateY(-2px);
  border-color: var(--gold);
  background: rgba(205, 249, 125, 0.1);
}

.about-cv-link:focus-visible {
  outline: 2px solid var(--gold-light);
  outline-offset: 3px;
}

.experience-item {
  padding: 1.4rem;
  border-radius: 24px;
  background: linear-gradient(
    135deg,
    var(--bg-surface) 0%,
    rgba(26, 26, 26, 0.6) 100%
  );
  border: 1.5px solid var(--gold-border);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  animation: slideInUp 0.8s ease-out forwards;
  opacity: 0;
}

.experience-item:nth-child(1) {
  animation-delay: 0.2s;
}
.experience-item:nth-child(2) {
  animation-delay: 0.3s;
}
.experience-item:nth-child(3) {
  animation-delay: 0.4s;
}

.experience-item h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
}

.experience {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.experience-item {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: flex-start;
}

.experience-item p,
.experience-item span {
  margin-top: 0.35rem;
  color: var(--text-secondary);
}

@media (hover: hover) and (pointer: fine) {
  .experience-item:hover {
    transform: translateY(-8px);
    border-color: var(--gold);
    background: linear-gradient(
      135deg,
      rgba(26, 26, 26, 0.8) 0%,
      rgba(26, 26, 26, 0.4) 100%
    );
  }
}

@media (max-width: 768px) {
  .experience {
    grid-template-columns: 1fr;
  }
}
</style>

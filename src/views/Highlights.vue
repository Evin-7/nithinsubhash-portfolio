<template>
  <section class="highlights">
    <div class="highlights-shell site-container">
      <div class="highlights-intro">
        <div class="highlights-copy">
          <p class="highlights-eyebrow">What I Do</p>
          <h2 class="highlights-title">
            UI/UX design with a sharper product eye.
          </h2>
          <p class="highlights-text">
            I create clear, usable, and production-ready experiences, balancing
            visual craft with practical interaction design across web products,
            mobile apps, and business platforms.
          </p>
        </div>

        <div class="highlights-feature">
          <span class="feature-label">Design approach</span>
          <h3>Thoughtful flows. Clear interfaces. Strong execution.</h3>
          <p>
            The goal is simple: design work that looks intentional, feels easy
            to use, and is practical for teams to build and maintain.
          </p>
          <div class="feature-points">
            <span>UI/UX design</span>
            <span>Product design</span>
            <span>Design systems</span>
            <span>Responsive UI</span>
            <span>Prototyping</span>
            <span>Implementation-ready design</span>
          </div>
        </div>
      </div>

      <div class="highlights-grid">
        <article class="highlight-card highlight-card-primary">
          <div class="highlight-icon">01</div>
          <h3>UI/UX Design</h3>
          <p>
            User journeys, wireframes, prototypes, and polished interfaces that
            make complex products easier to understand and use.
          </p>
        </article>

        <article class="highlight-card">
          <div class="highlight-icon">02</div>
          <h3>Product Design</h3>
          <p>
            Mobile and web product experiences shaped around real user needs,
            clear interaction patterns, and business goals.
          </p>
        </article>

        <article class="highlight-card">
          <div class="highlight-icon">03</div>
          <h3>Design Systems</h3>
          <p>
            Consistent components, responsive layouts, and practical handoff
            details that help teams build with confidence.
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.highlights {
  padding: 4.15rem 0 2.45rem;
  background: var(--bg-primary);
  position: relative;
  overflow: hidden;
}

.highlights::before {
  content: "";
  position: absolute;
  bottom: -20%;
  right: -15%;
  width: 600px;
  height: 600px;
  background: radial-gradient(
    circle,
    rgba(212, 175, 55, 0.05) 0%,
    transparent 70%
  );
  pointer-events: none;
}

.highlights-shell {
  position: relative;
  z-index: 1;
}

.highlights-intro {
  display: grid;
  grid-template-columns: minmax(0, 1.02fr) minmax(230px, 285px);
  gap: 0.9rem;
  align-items: stretch;
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

.highlights-copy,
.highlights-feature,
.highlight-card {
  border-radius: 28px;
  border: 1.5px solid var(--gold-border);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.highlights-copy {
  display: flex;
  flex-direction: column;
  min-height: 18rem;
  padding: 1.3rem;
  background: linear-gradient(
    135deg,
    var(--bg-surface) 0%,
    rgba(26, 26, 26, 0.5) 100%
  );
}

.highlights-eyebrow {
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--gold);
  opacity: 0.8;
}

.highlights-title {
  margin-top: 0.7rem;
  max-width: 11ch;
  font-size: clamp(1.65rem, 3.7vw, 2.85rem);
  line-height: 0.95;
  letter-spacing: -0.05em;
  background: linear-gradient(
    135deg,
    var(--text-primary) 0%,
    var(--gold-light) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.highlights-text {
  max-width: 56ch;
  margin-top: 0.8rem;
  font-size: 0.9rem;
  line-height: 1.65;
  color: var(--text-secondary);
}

.highlights-feature {
  display: flex;
  flex-direction: column;
  min-height: 18rem;
  padding: 1.15rem;
  background: linear-gradient(
    135deg,
    var(--bg-surface-alt) 0%,
    rgba(21, 21, 21, 0.6) 100%
  );
  color: var(--text-primary);
}

.feature-label {
  display: inline-flex;
  padding: 0.38rem 0.65rem;
  border-radius: 999px;
  background: rgba(212, 175, 55, 0.12);
  color: var(--gold);
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: all 0.3s ease;
}

.highlights-feature h3 {
  margin-top: 0.75rem;
  font-size: 1.12rem;
  line-height: 1.08;
  letter-spacing: -0.04em;
  color: var(--text-primary);
}

.highlights-feature p {
  margin-top: 0.7rem;
  font-size: 0.82rem;
  line-height: 1.55;
  color: var(--text-secondary);
}

.feature-points {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: auto;
  padding-top: 0.9rem;
}

.feature-points span {
  padding: 0.3rem 0.55rem;
  border-radius: 999px;
  background: rgba(212, 175, 55, 0.1);
  font-size: 0.68rem;
  color: var(--text-primary);
  transition: all 0.3s ease;
}

.highlights-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.highlight-card {
  padding: 1.35rem;
  background: linear-gradient(
    135deg,
    var(--bg-surface) 0%,
    rgba(26, 26, 26, 0.5) 100%
  );
  animation: cardReveal 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

.highlight-card:nth-child(1) {
  animation-delay: 0.2s;
}
.highlight-card:nth-child(2) {
  animation-delay: 0.3s;
}
.highlight-card:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes cardReveal {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.highlight-card-primary {
  background: linear-gradient(
    135deg,
    var(--bg-surface) 0%,
    rgba(26, 26, 26, 0.5) 100%
  );
}

.highlight-icon {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%);
  color: var(--bg-primary);
  font-size: 0.8rem;
  font-weight: 700;
  transition: all 0.3s ease;
}

.highlight-card h3 {
  margin-top: 1rem;
  font-size: 1.18rem;
  line-height: 1.12;
  color: var(--text-primary);
  font-weight: 600;
}

.highlight-card p {
  margin-top: 0.75rem;
  font-size: 0.95rem;
  line-height: 1.68;
  color: var(--text-secondary);
}

@media (hover: hover) and (pointer: fine) {
  .highlights-copy:hover,
  .highlights-feature:hover {
    transform: translateY(-8px);
    border-color: var(--gold);
    background: linear-gradient(
      135deg,
      rgba(26, 26, 26, 0.9) 0%,
      rgba(26, 26, 26, 0.4) 100%
    );
  }

  .highlight-card:hover {
    transform: translateY(-12px) scale(1.02);
    border-color: var(--gold);
    background: linear-gradient(
      135deg,
      rgba(26, 26, 26, 0.9) 0%,
      rgba(26, 26, 26, 0.4) 100%
    );
  }

  .highlight-card:hover .highlight-icon {
    transform: scale(1.15) rotate(10deg);
  }

  .feature-points span:hover {
    background: rgba(212, 175, 55, 0.3);
    transform: scale(1.1);
  }
}

@media (max-width: 980px) {
  .highlights-intro {
    grid-template-columns: 1fr;
  }

  .highlights-copy,
  .highlights-feature {
    min-height: 0;
  }
}

@media (max-width: 900px) {
  .highlights-grid {
    grid-template-columns: 1fr;
  }
}
</style>

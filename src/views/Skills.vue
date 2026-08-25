<template>
  <section class="skills">
    <div class="skills-shell site-container">
      <div class="skills-heading">
        <div>
          <p class="skills-eyebrow">Toolkit</p>
          <h2 class="skills-title">Core stack.</h2>
        </div>
        <p class="skills-text">Tools for clear interfaces and dependable systems.</p>
      </div>

      <div class="skills-frame">
        <div class="skills-marquee" aria-label="Technology stack" role="list">
          <div class="skills-track">
            <div
              v-for="copy in 3"
              :key="copy"
              class="skills-group"
              :aria-hidden="copy > 1"
            >
              <div
                v-for="skill in skills"
                :key="`${copy}-${skill.name}`"
                class="skill-pill"
                role="listitem"
              >
                <span class="skill-mark" :class="`skill-mark-${skill.slug}`">
                  {{ skill.mark }}
                </span>
                <span>{{ skill.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const skills = [
  { name: "Figma", slug: "figma", mark: "Fg" },
  { name: "Adobe XD", slug: "adobe-xd", mark: "Xd" },
  { name: "HTML", slug: "html", mark: "</>" },
  { name: "CSS", slug: "css", mark: "#" },
  { name: "Framer", slug: "framer", mark: "Fr" },
  { name: "ChatGPT", slug: "chatgpt", mark: "AI" },
  { name: "Lottie Files", slug: "lottie", mark: "Lo" },
  { name: "Adobe Illustrator", slug: "illustrator", mark: "Ai" },
  { name: "React", slug: "react", mark: "⚛" },
];

</script>

<style scoped>
.skills {
  position: relative;
  overflow: hidden;
  padding: 4.5rem 0;
  background: var(--bg-primary);
}

.skills-shell {
  position: relative;
  z-index: 1;
  animation: skills-rise 700ms cubic-bezier(0.2, 0.75, 0.2, 1) 100ms both;
}

.skills-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 2rem;
}

.skills-eyebrow {
  color: var(--gold);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.skills-title {
  margin-top: 0.65rem;
  color: var(--text-primary);
  font-size: clamp(1.9rem, 3.4vw, 3rem);
  font-weight: 600;
  letter-spacing: -0.06em;
  line-height: 0.98;
}

.skills-text {
  max-width: 34ch;
  color: var(--text-secondary);
  font-size: 0.84rem;
  line-height: 1.55;
  text-align: right;
}

.skills-frame {
  position: relative;
  overflow: hidden;
  margin-top: 1.7rem;
  padding: 1px;
  border: 1px solid rgba(205, 249, 125, 0.28);
  border-radius: 22px;
  background: rgba(22, 22, 21, 0.8);
  box-shadow: 0 1rem 2.5rem rgba(0, 0, 0, 0.16);
}

.skills-marquee {
  overflow: hidden;
  padding: 0.85rem;
  border-radius: 21px;
  background: rgba(17, 17, 17, 0.92);
}

.skills-track {
  display: flex;
  width: max-content;
  will-change: transform;
  animation: skills-marquee 46s linear infinite;
}

.skills-group {
  display: flex;
  flex-shrink: 0;
  gap: 1.35rem;
  padding-right: 1.35rem;
}

.skills-marquee:hover .skills-track {
  animation-play-state: paused;
}

.skill-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  min-height: 3.05rem;
  padding: 0.5rem 0.95rem 0.5rem 0.55rem;
  border: 1px solid var(--gold-border);
  border-radius: 999px;
  color: #e8e3d5;
  background: linear-gradient(135deg, rgba(38, 38, 36, 0.96), rgba(22, 22, 21, 0.88));
  box-shadow: inset 0 1px rgba(255, 255, 255, 0.08);
  font-size: 0.78rem;
  font-weight: 600;
  white-space: nowrap;
}

.skill-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 10px;
  color: var(--icon-color, var(--gold-light));
  border: 1px solid rgba(255, 255, 255, 0.13);
  background: rgba(10, 10, 10, 0.72);
  box-shadow: inset 0 1px rgba(255, 255, 255, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.2);
}

.skill-icon {
  width: 1.1rem;
  height: 1.1rem;
  color: var(--icon-color, currentColor);
  fill: currentColor;
  filter: drop-shadow(0 0 3px color-mix(in srgb, currentColor 42%, transparent));
}

.skill-icon-image {
  object-fit: contain;
}

.skill-mark-next {
  border-color: rgba(255, 255, 255, 0.4);
  background: #f2f2f0;
}

@keyframes skills-rise {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
}

@keyframes skills-marquee {
  to {
    transform: translateX(-33.333333%);
  }
}

@media (max-width: 700px) {
  .skills-heading {
    display: block;
  }

  .skills-text {
    margin-top: 0.7rem;
    text-align: left;
  }
}

@media (prefers-reduced-motion: reduce) {
  .skills-shell,
  .skills-track {
    animation: none;
  }

  .skills-marquee {
    overflow-x: auto;
  }
}
</style>

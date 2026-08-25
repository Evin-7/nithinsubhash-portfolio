<template>
  <section
    ref="worksSection"
    class="works"
    :class="{ 'motion-ready': motionEnabled }"
  >
    <div class="works-shell site-container">
      <div class="works-heading">
        <div>
          <p class="works-eyebrow">Projects</p>
          <h2 class="works-title">Selected work.</h2>
        </div>
      </div>

      <div
        v-for="group in workGroups"
        :key="group.key"
        class="works-group"
      >
        <div class="works-group-heading">
          <div>
            <p class="works-group-eyebrow">{{ group.eyebrow }}</p>
            <h3>{{ group.title }}</h3>
          </div>
          <p>{{ group.description }}</p>
        </div>

        <div class="works-grid">
          <article
            v-for="(work, index) in group.items"
            :key="work.name"
            class="work-card interactive"
            :style="{ '--reveal-delay': `${index * 55}ms` }"
            @pointerenter="handleEnter"
            @pointermove="handleMove"
            @pointerleave="resetMove"
          >
            <div class="work-card-inner">
              <div class="work-copy">
                <p class="work-kicker">
                  <span>{{ formatIndex(index) }}</span>{{ work.kicker }}
                </p>
                <h3 class="work-title">{{ work.name }}</h3>
              </div>

              <div class="work-media">
                <div class="laptop-frame">
                  <div class="laptop-screen-shell">
                    <div class="laptop-topbar">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div class="laptop-camera"></div>
                    <img
                      :src="work.image"
                      :alt="work.name"
                      class="work-image"
                      width="1536"
                      height="1024"
                      decoding="async"
                      loading="lazy"
                    />
                  </div>
                  <div class="laptop-base">
                    <div class="laptop-trackpad"></div>
                  </div>
                </div>
              </div>

              <div class="work-footer">
                <div class="work-meta">
                  <span>{{ work.focus }}</span>
                  <span>{{ work.year }}</span>
                </div>
                <div class="work-links">
                  <a
                    v-for="link in work.links"
                    :key="link.href"
                    :href="link.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="work-cta"
                  >
                    <span>{{ link.label }}</span>
                    <strong>↗</strong>
                  </a>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";

const cardRects = new WeakMap();
const worksSection = ref(null);
const motionEnabled = ref(true);
let motionQuery;
let cardObserver;

const formatIndex = (index) => String(index + 1).padStart(2, "0");

const revealAllCards = () => {
  worksSection.value
    ?.querySelectorAll(".work-card")
    .forEach((card) => card.classList.add("is-revealed"));
};

const setupRevealObserver = () => {
  const cards = worksSection.value?.querySelectorAll(".work-card");

  if (!cards?.length || !motionEnabled.value || !("IntersectionObserver" in window)) {
    revealAllCards();
    return;
  }

  cardObserver?.disconnect();
  cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-revealed");
        cardObserver?.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8%", threshold: 0.12 }
  );

  cards.forEach((card) => cardObserver.observe(card));
};

const syncMotionPreference = () => {
  if (!motionQuery) {
    return;
  }

  const wasEnabled = motionEnabled.value;
  motionEnabled.value = !motionQuery.matches;

  if (!motionEnabled.value) {
    cardObserver?.disconnect();
    revealAllCards();
  } else if (!wasEnabled) {
    setupRevealObserver();
  }
};

const handleEnter = (event) => {
  if (!motionEnabled.value) {
    return;
  }

  const card = event.currentTarget;
  cardRects.set(card, card.getBoundingClientRect());
  card.style.setProperty("--card-lift", "-9px");
};

const handleMove = (event) => {
  if (!motionEnabled.value) {
    return;
  }

  const card = event.currentTarget;
  const rect = cardRects.get(card) || card.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;

  card.style.setProperty("--image-x", `${x * 10}px`);
  card.style.setProperty("--image-y", `${y * 10}px`);
  card.style.setProperty("--card-rotate-x", `${y * -4.5}deg`);
  card.style.setProperty("--card-rotate-y", `${x * 5.5}deg`);
  card.style.setProperty("--spotlight-x", `${(x + 0.5) * 100}%`);
  card.style.setProperty("--spotlight-y", `${(y + 0.5) * 100}%`);
};

const resetMove = (event) => {
  const card = event.currentTarget;

  cardRects.delete(card);
  card.style.setProperty("--image-x", "0px");
  card.style.setProperty("--image-y", "0px");
  card.style.setProperty("--card-lift", "0px");
  card.style.setProperty("--card-rotate-x", "0deg");
  card.style.setProperty("--card-rotate-y", "0deg");
  card.style.setProperty("--spotlight-x", "50%");
  card.style.setProperty("--spotlight-y", "50%");
};

onMounted(() => {
  motionQuery = window.matchMedia(
    "(max-width: 768px), (pointer: coarse), (prefers-reduced-motion: reduce)"
  );
  syncMotionPreference();
  setupRevealObserver();
  motionQuery.addEventListener("change", syncMotionPreference);
});

onUnmounted(() => {
  cardObserver?.disconnect();
  motionQuery?.removeEventListener("change", syncMotionPreference);
});

const works = [
  {
    name: "AGSYBA",
    links: [{ label: "Dribbble", href: "https://dribbble.com/shots/27632440-AGSYBA-Fashion-E-Commerce-Web-Mobile" }],
    image: new URL("../assets/images/nithin/agsyba.png", import.meta.url).href,
    description:
      "Fashion e-commerce web and mobile experience shaped around curated collections and easy browsing.",
    kicker: "E-commerce Website",
    year: "Featured",
    focus: "Fashion Web & Mobile",
  },
  {
    name: "AbeZauto",
    links: [{ label: "Dribbble", href: "https://dribbble.com/shots/27628665-AbeZauto-Auto-Parts-E-Commerce-Platform" }],
    image: new URL("../assets/images/nithin/abezauto.png", import.meta.url).href,
    description:
      "Auto-parts e-commerce platform focused on product discovery, vehicle context, and conversion.",
    kicker: "E-commerce Platform",
    year: "Featured",
    focus: "Auto Parts Platform",
  },
  {
    name: "Call2Day",
    links: [{ label: "Dribbble", href: "https://dribbble.com/shots/27631584-Call2Day-Home-Maintenance-Service-Website" }],
    image: new URL("../assets/images/nithin/call2day.png", import.meta.url).href,
    description:
      "Home-maintenance service website designed to make service discovery and booking feel effortless.",
    kicker: "Home Maintenance Website",
    year: "Featured",
    focus: "Service Experience",
  },
  {
    name: "Elate Chat",
    type: "mobile",
    links: [{ label: "Dribbble", href: "https://dribbble.com/shots/27632796-Elate-Chat-A-Focused-Community-Communication-Experience" }],
    image: new URL("../assets/images/nithin/elate-chat.png", import.meta.url).href,
    description:
      "Focused community communication experience designed around clarity and meaningful conversations.",
    kicker: "Mobile App",
    year: "Featured",
    focus: "Community Communication",
  },
  {
    name: "Modern HRMS Website Design",
    links: [{ label: "Visit site", href: "https://hrms.ae/" }],
    image: new URL("../assets/images/nithin/hrms.png", import.meta.url).href,
    description:
      "Modern HRMS website concept with a clear product story and approachable business interface.",
    kicker: "Web Design",
    year: "Featured",
    focus: "HRMS Website",
  },
  {
    name: "Cowork Kerala",
    links: [{ label: "Dribbble", href: "https://dribbble.com/shots/26626031-Cowork-Kerala-Your-workspace-your-way" }],
    image: new URL("../assets/images/nithin/cowork-kerala.png", import.meta.url).href,
    description:
      "Workspace experience designed around flexible working, discovery, and a clear visual hierarchy.",
    kicker: "Web Design",
    year: "Featured",
    focus: "Workspace Experience",
  },
  {
    name: "Modern E-Invoicing Platform",
    links: [{ label: "Visit site", href: "https://e-invoicingsoftware.ae" }],
    image: new URL("../assets/images/nithin/e-invoicing.png", import.meta.url).href,
    description:
      "E-invoicing platform design focused on simplifying business workflows and information-heavy screens.",
    kicker: "Web Design",
    year: "Featured",
    focus: "Business Platform",
  },
  {
    name: "Swedish Design Agency Website",
    links: [{ label: "Dribbble", href: "https://dribbble.com/shots/26693866-Clean-UI-UX-Animated-Hero-for-a-Modern-Swedish-Design-Agency" }],
    image: new URL("../assets/images/nithin/swedish-agency.png", import.meta.url).href,
    description:
      "Animated agency website direction with a strong visual system and an expressive hero experience.",
    kicker: "Website Design",
    year: "Featured",
    focus: "Agency Experience",
  },
  {
    name: "AROD",
    type: "mobile",
    links: [{ label: "Dribbble", href: "https://dribbble.com/shots/25958438-RESTAURANT-FOOD-ORDEING-APP-UI-UX-DESIGN" }],
    image: new URL("../assets/images/nithin/arod.png", import.meta.url).href,
    description:
      "AR-enabled food-ordering app concept focused on a simpler, more engaging restaurant journey.",
    kicker: "UI/UX Design",
    year: "Featured",
    focus: "Food Ordering App",
  },
  {
    name: "Likee",
    type: "mobile",
    links: [{ label: "Dribbble", href: "https://dribbble.com/shots/26608602-Likee-Dating-App-for-NRI-Connections" }],
    image: new URL("../assets/images/nithin/likee.png", import.meta.url).href,
    description:
      "Dating app experience for NRI connections, shaped around trust, discovery, and meaningful matching.",
    kicker: "UI/UX Design",
    year: "Featured",
    focus: "Dating App Experience",
  },
];

const workGroups = [
  {
    key: "websites",
    eyebrow: "Websites & platforms",
    title: "Digital spaces built with intent.",
    description:
      "Web products, business platforms, and experiences shaped around people.",
    items: works.filter((work) => work.type !== "mobile"),
  },
  {
    key: "mobile",
    eyebrow: "Mobile products",
    title: "Useful everywhere.",
    description:
      "Clear, expressive app experiences.",
    items: works.filter((work) => work.type === "mobile"),
  },
];
</script>

<style scoped>
.works {
  padding: 5rem 0;
  background: var(--bg-primary);
  position: relative;
  overflow: hidden;
}

.works::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    circle at 50% 0%,
    rgba(212, 175, 55, 0.03) 0%,
    transparent 70%
  );
  pointer-events: none;
}

.works::after {
  content: "";
  position: absolute;
  inset: 12% 0 auto;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(212, 175, 55, 0.18) 35%,
    rgba(212, 175, 55, 0.07) 65%,
    transparent
  );
  pointer-events: none;
}

.works-shell {
  position: relative;
  z-index: 1;
}

.works-heading {
  display: block;
  margin-bottom: 2.2rem;
  animation: slideInUp 0.8s ease-out 0.2s both;
}

.works-group + .works-group {
  margin-top: clamp(3.4rem, 7vw, 6rem);
}

.works-group-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 1.25rem;
  padding-bottom: 0.9rem;
  border-bottom: 1px solid rgba(212, 175, 55, 0.16);
}

.works-group-heading h3 {
  margin-top: 0.4rem;
  color: var(--text-primary);
  font-size: clamp(1.35rem, 2.2vw, 2rem);
  font-weight: 600;
  letter-spacing: -0.055em;
}

.works-group-heading > p {
  max-width: 30ch;
  color: var(--text-secondary);
  font-size: 0.76rem;
  line-height: 1.55;
  text-align: right;
}

.works-group-eyebrow {
  color: var(--gold);
  font-size: 0.63rem;
  font-weight: 700;
  letter-spacing: 0.13em;
  text-transform: uppercase;
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

.works-eyebrow {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--gold);
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.works-title {
  margin-top: 0.8rem;
  font-size: clamp(1.8rem, 3vw, 3rem);
  line-height: 0.96;
  letter-spacing: -0.05em;
  color: var(--text-primary);
  background: linear-gradient(
    135deg,
    var(--text-primary) 0%,
    var(--gold-light) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.works-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
}

.work-card {
  --image-x: 0px;
  --image-y: 0px;
  --card-lift: 0px;
  --card-rotate-x: 0deg;
  --card-rotate-y: 0deg;
  --spotlight-x: 50%;
  --spotlight-y: 50%;
  position: relative;
  text-decoration: none;
  color: inherit;
  min-height: 244px;
  border-radius: 24px;
  overflow: hidden;
  background: linear-gradient(
    135deg,
    var(--bg-surface) 0%,
    rgba(26, 26, 26, 0.8) 100%
  );
  border: 1.5px solid var(--gold-border);
  transform: perspective(1200px) translateY(var(--card-lift))
    rotateX(var(--card-rotate-x)) rotateY(var(--card-rotate-y));
  transform-style: preserve-3d;
  transition: transform 180ms ease-out, border-color 220ms ease,
    background-color 220ms ease, box-shadow 220ms ease;
  cursor: pointer;
  contain: layout paint style;
  content-visibility: auto;
  contain-intrinsic-size: auto 244px;
}

.work-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at var(--spotlight-x) var(--spotlight-y),
    rgba(243, 221, 147, 0.19),
    transparent 34%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 1;
  pointer-events: none;
}

.work-card::after {
  content: "";
  position: absolute;
  z-index: 3;
  inset: -20% auto -20% -60%;
  width: 38%;
  background: linear-gradient(
    105deg,
    transparent,
    rgba(255, 245, 209, 0.16),
    transparent
  );
  transform: translateX(-155%) skewX(-16deg);
  transition: transform 700ms cubic-bezier(0.2, 0.75, 0.2, 1);
  pointer-events: none;
}

.work-card-inner {
  position: relative;
  z-index: 2;
  height: 100%;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  gap: 1rem;
  padding: 1rem;
}

.work-copy {
  transform: translateZ(18px);
  transition: transform 300ms cubic-bezier(0.2, 0.75, 0.2, 1);
}

.work-kicker {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  margin-bottom: 0.48rem;
  color: var(--text-secondary);
  font-size: 0.61rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.work-kicker span {
  color: var(--gold-light);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.58rem;
  transition: color 220ms ease, transform 300ms ease;
}

.work-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
}

.work-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.45rem;
  margin-left: auto;
}

.work-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
  min-width: 0;
  color: var(--text-secondary);
  font-size: 0.64rem;
}

.work-meta span:first-child {
  overflow: hidden;
  max-width: 13ch;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.work-meta span + span {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.work-meta span + span::before {
  width: 2px;
  height: 2px;
  border-radius: 50%;
  content: "";
  background: var(--gold-muted);
}

.work-title {
  font-size: clamp(0.88rem, 1.15vw, 1.15rem);
  line-height: 1.15;
  letter-spacing: -0.04em;
  color: var(--text-primary);
  font-weight: 600;
}

.work-media {
  min-height: 0;
  display: flex;
  align-items: center;
  transform: translateZ(18px);
  transition: transform 320ms cubic-bezier(0.2, 0.75, 0.2, 1);
}

.laptop-frame {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 360ms cubic-bezier(0.2, 0.75, 0.2, 1);
}

.laptop-screen-shell {
  position: relative;
  width: 92%;
  aspect-ratio: 1.56 / 1;
  padding: 0.42rem 0.42rem 0.32rem;
  border-radius: 16px 16px 10px 10px;
  background: linear-gradient(135deg, var(--bg-surface-alt) 0%, #0f0f0f 100%);
  overflow: hidden;
  box-shadow: inset 0 0 30px rgba(212, 175, 55, 0.1);
}

.laptop-screen-shell::after {
  display: none;
}

.laptop-topbar {
  display: flex;
  gap: 0.38rem;
  padding: 0 0 0.4rem 0.08rem;
}

.laptop-topbar span {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.24);
  transition: all 0.3s ease;
}

.laptop-topbar span:nth-child(1) {
  background: var(--gold-deep);
}

.laptop-topbar span:nth-child(2) {
  background: var(--gold);
}

.laptop-topbar span:nth-child(3) {
  background: var(--gold-light);
}

.laptop-camera {
  position: absolute;
  top: 0.18rem;
  left: 50%;
  width: 18%;
  max-width: 2rem;
  height: 0.18rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.09);
  transform: translateX(-50%);
}

.work-image {
  width: 100%;
  height: calc(100% - 13px);
  object-fit: cover;
  object-position: center;
  display: block;
  padding: 0.25rem;
  border-radius: 12px;
  background: var(--bg-surface-alt);
  transform: translate3d(var(--image-x), var(--image-y), 0) scale(1.02);
  transform-origin: center;
  transition: transform 0.14s ease-out;
}

.laptop-base {
  position: relative;
  width: 100%;
  height: 0.72rem;
  margin-top: -0.02rem;
  border-radius: 0 0 1rem 1rem;
  background: linear-gradient(
    to right,
    #7a6f5f,
    var(--text-secondary),
    #7a6f5f
  );
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

.laptop-base::before {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -0.08rem;
  width: 34%;
  height: 0.12rem;
  border-radius: 999px;
  background: rgba(17, 17, 20, 0.12);
  transform: translateX(-50%);
}

.laptop-trackpad {
  position: absolute;
  top: 0.12rem;
  left: 50%;
  width: 18%;
  height: 0.16rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.58);
  transform: translateX(-50%);
}

.work-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin-left: 0;
  padding: 0.55rem 0.75rem;
  border-radius: 14px;
  background: rgba(212, 175, 55, 0.1);
  border: 1px solid var(--gold-border);
  color: var(--gold);
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 600;
  transform: translateZ(24px);
}

.work-cta:focus-visible {
  outline: 2px solid var(--gold-light);
  outline-offset: 3px;
}

.work-cta span,
.work-cta strong {
  margin: 0;
  font-size: 0.68rem;
  font-weight: 700;
}

.motion-ready .work-card {
  opacity: 0;
  translate: 0 2rem;
}

.motion-ready .work-card.is-revealed {
  animation: work-card-reveal 760ms cubic-bezier(0.2, 0.78, 0.25, 1)
    var(--reveal-delay) both;
}

@keyframes work-card-reveal {
  from {
    opacity: 0;
    translate: 0 2rem;
    filter: blur(5px);
  }
  to {
    opacity: 1;
    translate: 0 0;
    filter: blur(0);
  }
}

@media (hover: hover) and (pointer: fine) {
  .work-card:hover {
    border-color: var(--gold);
    background: linear-gradient(
      135deg,
      rgba(26, 26, 26, 0.9) 0%,
      rgba(26, 26, 26, 0.6) 100%
    );
    box-shadow: 0 1.5rem 3.5rem rgba(0, 0, 0, 0.32);
  }

  .work-card:hover::before {
    opacity: 1;
  }

  .work-card:hover::after {
    transform: translateX(440%) skewX(-16deg);
  }

  .work-card:hover .work-copy {
    transform: translate3d(0, -2px, 24px);
  }

  .work-card:hover .work-kicker span {
    color: #f0d783;
    transform: translateX(3px);
  }

  .work-card:hover .work-media {
    transform: translate3d(0, -2px, 24px) scale(1.025);
  }

  .work-card:hover .laptop-frame {
    transform: translateY(-2px) rotateX(1deg);
  }

  .work-card:hover .work-cta {
    background: var(--gold);
    color: var(--bg-primary);
    transform: translateX(4px);
  }

  .work-card:hover .laptop-topbar span {
    transform: scale(1.3);
  }

  .work-card:hover .work-image {
    will-change: transform;
  }
}

@media (max-width: 1100px) {
  .works-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.2rem;
  }
}

@media (max-width: 780px) {
  .works {
    padding-block: 4.4rem;
  }

  .works-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .works-group-heading {
    display: block;
  }

  .works-group-heading > p {
    margin-top: 0.65rem;
    text-align: left;
  }

  .work-card-inner {
    padding: 1rem;
  }

  .laptop-screen-shell {
    width: 100%;
  }
}

@media (max-width: 520px) {
  .works-title {
    font-size: 2.25rem;
  }

  .work-title {
    font-size: 1.1rem;
  }

  .work-description {
    font-size: 0.88rem;
  }

  .laptop-screen-shell {
    aspect-ratio: 1.52 / 1;
  }
}

@media (hover: none), (pointer: coarse), (max-width: 768px) {
  .motion-ready .work-card {
    opacity: 1;
    translate: none;
    animation: none;
  }

  .work-card {
    transform: none;
  }

  .work-image {
    transform: none;
    transition: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .works-heading,
  .motion-ready .work-card.is-revealed {
    animation: none;
  }

  .motion-ready .work-card {
    opacity: 1;
    translate: none;
    filter: none;
  }

  .work-card,
  .work-card::before,
  .work-card::after,
  .work-copy,
  .work-media,
  .laptop-frame,
  .work-kicker span,
  .work-cta {
    transition: none;
  }
}
</style>

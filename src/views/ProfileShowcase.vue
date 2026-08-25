<template>
  <section class="profile-showcase" aria-labelledby="profile-showcase-title">
    <div class="site-container">
      <div class="profile-showcase-heading">
        <span class="profile-showcase-kicker">A closer look</span>
        <h2 id="profile-showcase-title">The person behind the pixels.</h2>
      </div>

      <div class="profile-showcase-stage">
        <div class="profile-showcase-word profile-showcase-word-top" aria-hidden="true">
          NITHIN
        </div>
        <div class="profile-showcase-word profile-showcase-word-bottom" aria-hidden="true">
          SUBHASH
        </div>

        <div class="profile-showcase-shape profile-showcase-shape-one" aria-hidden="true"></div>
        <div class="profile-showcase-shape profile-showcase-shape-two" aria-hidden="true"></div>

        <figure class="profile-showcase-portrait">
          <img
            :src="nithinProfileLarge"
            alt="Nithin Subhash standing outdoors"
            loading="lazy"
          />
          <figcaption>
            <strong>Nithin Subhash</strong>
            <span>UI/UX designer</span>
          </figcaption>
        </figure>

        <span class="profile-showcase-dot" aria-hidden="true"></span>
      </div>
    </div>
  </section>
</template>

<script setup>
import nithinProfileLarge from "../assets/images/nithin/nithin-profile-large.jpg";
</script>

<style scoped>
.profile-showcase {
  padding: clamp(4rem, 8vw, 8rem) 0 clamp(5rem, 10vw, 10rem);
  overflow: hidden;
}

.profile-showcase-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: clamp(1.5rem, 4vw, 3rem);
}

.profile-showcase-kicker {
  color: var(--gold);
  font-family: "IBM Plex Mono", "SFMono-Regular", Consolas, monospace;
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.profile-showcase-heading h2 {
  max-width: 19rem;
  color: var(--text-secondary);
  font-size: clamp(1rem, 1.7vw, 1.45rem);
  font-weight: 500;
  line-height: 1.35;
  text-align: right;
}

.profile-showcase-stage {
  position: relative;
  min-height: clamp(32rem, 66vw, 52rem);
  isolation: isolate;
  overflow: hidden;
  border: 1px solid var(--gold-border);
  border-radius: clamp(1.5rem, 3vw, 3rem);
  background:
    radial-gradient(circle at 50% 42%, rgba(205, 249, 125, 0.1), transparent 29%),
    linear-gradient(145deg, #171717 0%, #101010 100%);
}

.profile-showcase-stage::before {
  position: absolute;
  inset: 0;
  z-index: -1;
  background-image: linear-gradient(rgba(205, 249, 125, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(205, 249, 125, 0.06) 1px, transparent 1px);
  background-size: 4rem 4rem;
  content: "";
  mask-image: linear-gradient(to bottom, black, transparent 82%);
}

.profile-showcase-word {
  position: absolute;
  z-index: -1;
  color: rgba(242, 242, 242, 0.1);
  font-size: clamp(5.25rem, 17.5vw, 17rem);
  font-weight: 800;
  letter-spacing: -0.08em;
  line-height: 0.78;
  pointer-events: none;
  white-space: nowrap;
}

.profile-showcase-word-top {
  top: 12%;
  left: 50%;
  transform: translateX(-50%);
}

.profile-showcase-word-bottom {
  bottom: 9%;
  left: 50%;
  transform: translateX(-50%);
}

.profile-showcase-portrait {
  position: absolute;
  bottom: 0;
  left: 50%;
  z-index: 2;
  width: min(50%, 27rem);
  height: 86%;
  margin: 0;
  transform: translateX(-50%);
  overflow: hidden;
  border: 0.6rem solid rgba(242, 242, 242, 0.92);
  border-bottom: 0;
  border-radius: 2.6rem 2.6rem 0 0;
  background: #222;
  box-shadow: 0 2rem 5rem rgba(0, 0, 0, 0.42), 0 0 0 1px var(--gold-border);
}

.profile-showcase-portrait::after {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 54%, rgba(9, 9, 9, 0.76));
  content: "";
  pointer-events: none;
}

.profile-showcase-portrait img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 26%;
  transition: transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
}

.profile-showcase-stage:hover .profile-showcase-portrait img {
  transform: scale(1.04);
}

.profile-showcase-portrait figcaption {
  position: absolute;
  right: 1.25rem;
  bottom: 1.25rem;
  left: 1.25rem;
  z-index: 1;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  color: var(--text-primary);
}

.profile-showcase-portrait figcaption strong {
  font-size: clamp(1rem, 1.8vw, 1.35rem);
  letter-spacing: -0.03em;
}

.profile-showcase-portrait figcaption span {
  color: var(--gold);
  font-family: "IBM Plex Mono", "SFMono-Regular", Consolas, monospace;
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.profile-showcase-shape {
  position: absolute;
  z-index: 1;
  width: clamp(3rem, 8vw, 8rem);
  aspect-ratio: 1;
  background: linear-gradient(135deg, var(--gold-light), var(--gold-deep));
  filter: drop-shadow(0 1rem 1rem rgba(0, 0, 0, 0.28));
  opacity: 0.9;
  transform: rotate(28deg);
}

.profile-showcase-shape-one {
  top: 21%;
  left: 17%;
  border-radius: 35% 65% 42% 58%;
}

.profile-showcase-shape-two {
  right: 17%;
  bottom: 20%;
  border-radius: 63% 37% 55% 45%;
  transform: rotate(-19deg);
}

.profile-showcase-dot {
  position: absolute;
  right: 14%;
  bottom: 12%;
  z-index: 3;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  background: var(--gold);
  box-shadow: 0 0 1.5rem var(--gold);
}

@media (max-width: 700px) {
  .profile-showcase-heading {
    align-items: start;
    flex-direction: column;
    gap: 0.75rem;
  }

  .profile-showcase-heading h2 {
    text-align: left;
  }

  .profile-showcase-stage {
    min-height: 36rem;
  }

  .profile-showcase-word {
    font-size: 25vw;
  }

  .profile-showcase-word-top {
    top: 18%;
  }

  .profile-showcase-word-bottom {
    bottom: 17%;
  }

  .profile-showcase-portrait {
    width: min(72%, 22rem);
    height: 82%;
    border-width: 0.4rem;
    border-bottom: 0;
    border-radius: 1.75rem 1.75rem 0 0;
  }

  .profile-showcase-portrait figcaption {
    right: 0.85rem;
    bottom: 0.85rem;
    left: 0.85rem;
    flex-direction: column;
    gap: 0.25rem;
  }

  .profile-showcase-shape-one {
    top: 17%;
    left: 5%;
  }

  .profile-showcase-shape-two {
    right: 6%;
    bottom: 18%;
  }
}
</style>

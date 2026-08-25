<template>
  <nav class="navbar" @keydown.esc="closeMenu">
    <div class="nav-shell site-container">
      <a href="#home" class="logo">
        <img :src="logoMark" alt="Nithin Subhash logo" class="logo-mark" />
      </a>
      <ul class="nav-links">
        <li><a href="#about" class="interactive" @click="closeMenu">About</a></li>
        <li><a href="#skills" class="interactive" @click="closeMenu">Skills</a></li>
        <li><a href="#works" class="interactive" @click="closeMenu">Work</a></li>
        <li><a href="#contact" class="interactive" @click="closeMenu">Contact</a></li>
      </ul>

      <button
        class="menu-toggle interactive"
        type="button"
        aria-label="Toggle navigation menu"
        aria-controls="mobile-navigation"
        :aria-expanded="isMenuOpen"
        @click="toggleMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <div
      id="mobile-navigation"
      class="mobile-navigation"
      :class="{ 'is-open': isMenuOpen }"
      :aria-hidden="!isMenuOpen"
      :inert="!isMenuOpen"
    >
      <a href="#about" @click="closeMenu">About</a>
      <a href="#skills" @click="closeMenu">Skills</a>
      <a href="#works" @click="closeMenu">Work</a>
      <a href="#contact" @click="closeMenu">Contact</a>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import logoMark from "../assets/icons/nithin-logo.svg";

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: linear-gradient(
    90deg,
    rgba(7, 8, 7, 0.82),
    rgba(17, 17, 15, 0.66)
  );
  border-bottom: 1px solid rgba(232, 218, 178, 0.12);
  box-shadow: 0 0.8rem 2.6rem rgba(0, 0, 0, 0.16);
}

.navbar::after {
  content: "";
  position: absolute;
  right: 9%;
  bottom: -1px;
  left: 9%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(229, 203, 125, 0.5),
    transparent
  );
  opacity: 0.75;
}

.nav-shell {
  padding-block: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  padding: 0.24rem;
  border: 1px solid rgba(232, 218, 178, 0.2);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.035);
  transition: border-color 180ms ease, background-color 180ms ease,
    transform 180ms ease;
}

.logo:hover,
.logo:focus-visible {
  border-color: rgba(229, 203, 125, 0.65);
  background: rgba(229, 203, 125, 0.08);
  transform: translateY(-1px);
}

.logo:focus-visible {
  outline: 2px solid var(--gold-light);
  outline-offset: 3px;
}

.logo-mark {
  width: 38px;
  height: 38px;
  display: block;
  filter: sepia(1) saturate(1.2) hue-rotate(2deg) drop-shadow(0 8px 14px var(--gold-glow));
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  list-style: none;
}

.nav-links a {
  position: relative;
  color: #d8d4c9;
  text-decoration: none;
  font-size: 0.77rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.nav-links a::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: -0.4rem;
  left: 0;
  height: 1px;
  background: var(--gold);
  transform: scaleX(0);
  transition: transform 0.24s ease;
}

.nav-links a:hover,
.nav-links a:focus-visible { color: var(--gold-light); }
.nav-links a:hover::after,
.nav-links a:focus-visible::after { transform: scaleX(1); }

.menu-toggle {
  display: none;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0.72rem;
  flex-direction: column;
  justify-content: center;
  gap: 0.3rem;
  border: 1px solid rgba(232, 218, 178, 0.2);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.035);
  cursor: pointer;
  transition: border-color 180ms ease, background-color 180ms ease;
}

.menu-toggle:hover,
.menu-toggle:focus-visible {
  border-color: rgba(229, 203, 125, 0.65);
  background: rgba(229, 203, 125, 0.08);
}

.menu-toggle:focus-visible {
  outline: 2px solid var(--gold-light);
  outline-offset: 3px;
}

.menu-toggle span {
  display: block;
  width: 100%;
  height: 1px;
  border-radius: 999px;
  background: #e6dfd0;
  transition: transform 180ms ease, opacity 180ms ease;
}

.mobile-navigation {
  display: none;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .menu-toggle {
    display: flex;
  }

  .mobile-navigation {
    display: grid;
    max-height: 0;
    padding-inline: 1.25rem;
    overflow: hidden;
    border-top: 1px solid transparent;
    opacity: 0;
    transition: max-height 240ms ease, padding-block 240ms ease,
      border-color 240ms ease, opacity 180ms ease;
  }

  .mobile-navigation.is-open {
    max-height: 18rem;
    padding-block: 0.55rem 0.85rem;
    border-top-color: rgba(232, 218, 178, 0.1);
    opacity: 1;
  }

  .mobile-navigation a {
    padding: 0.72rem 0;
    color: #d8d4c9;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-decoration: none;
  }

  .mobile-navigation a:hover,
  .mobile-navigation a:focus-visible {
    color: var(--gold-light);
  }

  .mobile-navigation a:focus-visible {
    outline: 2px solid var(--gold-light);
    outline-offset: 3px;
  }
}
</style>

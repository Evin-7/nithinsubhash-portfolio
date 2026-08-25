<template>
  <footer class="footer">
    <div class="footer-shell site-container">
      <div class="footer-brand">
        <img :src="logoMark" alt="Nithin Subhash logo" class="footer-mark" />
      </div>
      <div class="footer-links">
        <a href="mailto:nithinsubhash01@gmail.com" class="footer-link">
          <span class="footer-link-icon" aria-hidden="true">✉</span>
          <span>Email</span>
        </a>
        <a href="https://www.linkedin.com/in/nithin-subash/" target="_blank" rel="noopener noreferrer" class="footer-link">
          <span class="footer-link-icon" aria-hidden="true">in</span>
          <span>LinkedIn</span>
        </a>
        <a href="https://dribbble.com/_n1th1n" target="_blank" rel="noopener noreferrer" class="footer-link">
          <span class="footer-link-icon" aria-hidden="true">Db</span>
          <span>Dribbble</span>
        </a>
        <a href="https://www.instagram.com/n1t.h1n?igsh=ZHAwMWgxaHVwd3Fi" target="_blank" rel="noopener noreferrer" class="footer-link">
          <span class="footer-link-icon" aria-hidden="true">Ig</span>
          <span>Instagram</span>
        </a>
      </div>
      <p class="footer-meta">&copy; {{ currentYear }}</p>
    </div>
  </footer>
</template>

<script setup>
import logoMark from "../assets/icons/nithin-logo.svg";

const currentYear = new Date().getFullYear();
</script>

<style scoped>
.footer {
  padding: 3rem 0 4rem;
  background: var(--bg-surface-alt);
  border-top: 1px solid var(--gold-border);
}

.footer-shell {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
}

.footer-brand {
  display: inline-flex;
  align-items: center;
}

.footer-mark {
  width: 34px;
  height: 34px;
  display: block;
  filter: sepia(1) saturate(1.2) hue-rotate(2deg) drop-shadow(0 8px 14px var(--gold-glow));
}

.footer-meta {
  font-size: 0.92rem;
  color: var(--text-secondary);
}

.footer-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.footer-link {
  display: inline-flex;
  align-items: center;
  gap: 0.48rem;
  padding: 0.48rem 0.72rem;
  border-radius: 999px;
  background: var(--bg-surface);
  border: 1px solid var(--gold-border);
  color: var(--text-primary);
  text-decoration: none;
  font-size: 0.92rem;
}

.footer-link-icon {
  width: 1.55rem;
  height: 1.55rem;
  border-radius: 999px;
  background: var(--gold);
  color: var(--bg-primary);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.68rem;
  font-weight: 700;
  line-height: 1;
}

.footer-brand-icon {
  width: 0.95rem;
  height: 0.95rem;
  fill: currentColor;
}

.footer-link:hover { color: var(--gold); box-shadow: 0 0 22px var(--gold-glow); }

@media (max-width: 640px) {
  .footer-shell {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>

<template>
  <div
    ref="progressBar"
    class="scroll-progress"
    role="progressbar"
    aria-label="Page scroll progress"
    aria-valuemin="0"
    aria-valuemax="100"
    aria-valuenow="0"
  ></div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { scroll } from "motion-v";

const progressBar = ref(null);
let stopScroll;

onMounted(() => {
  stopScroll = scroll((progress) => {
    const percentage = Math.round(progress * 100);

    progressBar.value?.style.setProperty("--scroll-progress", `${progress}`);
    progressBar.value?.setAttribute("aria-valuenow", `${percentage}`);
  });
});

onBeforeUnmount(() => {
  stopScroll?.();
});
</script>

<style scoped>
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1100;
  width: 100%;
  height: 2px;
  pointer-events: none;
  background: linear-gradient(
    90deg,
    var(--gold-light),
    var(--gold) 48%,
    var(--gold-deep)
  );
  box-shadow: 0 0 0.9rem var(--gold-glow);
  transform: scaleX(var(--scroll-progress, 0));
  transform-origin: left center;
}

@media (prefers-reduced-motion: reduce) {
  .scroll-progress {
    display: none;
  }
}
</style>

<template>
    <section class="relative h-screen overflow-hidden">
      <div
        ref="rellaxRef"
        class="absolute inset-0 bg-cover bg-center"
        :style="{ backgroundColor: 'var(--bg-primary)' }"
        :data-rellax-speed="speed"
      ></div>
  
      <div class="relative z-10 h-full flex items-center justify-center">
        <slot />
      </div>
    </section>
  </template>
  
  <script setup>
  import { onMounted, onUnmounted, ref } from 'vue'
  import Rellax from 'rellax'
  
  const props = defineProps({
    background: String,
    speed: {
      type: Number,
      default: -2,
    },
  })
  
  const rellaxRef = ref(null)
  let rellaxInstance = null
  
  onMounted(() => {
    const shouldDisableParallax = window.matchMedia(
      '(max-width: 768px), (pointer: coarse), (prefers-reduced-motion: reduce)'
    ).matches

    if (rellaxRef.value && !shouldDisableParallax) {
      rellaxInstance = new Rellax(rellaxRef.value, {
        center: true,
        speed: props.speed,
      })
    }
  })

  onUnmounted(() => {
    rellaxInstance?.destroy()
  })
  </script>
  

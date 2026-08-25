import { createApp } from 'vue'
import { MotionPlugin } from 'motion-v'
import App from './App.vue'
import './assets/main.css'

createApp(App)
  .use(MotionPlugin, {
    presets: {
      'scroll-reveal': {
        initial: { opacity: 0, y: 34 },
        whileInView: { opacity: 1, y: 0 },
        inViewOptions: { amount: 0.14, once: true },
        transition: {
          duration: 0.72,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    },
  })
  .mount('#app')

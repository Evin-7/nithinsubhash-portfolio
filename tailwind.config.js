// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Define your custom font family here
        // The key 'dmsans' will become 'font-dmsans' utility class
        dmsans: ['DM Sans', 'sans-serif'], 
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        'bg-primary': '#0d0d0d',
        'bg-surface': '#1a1a1a',
        'bg-surface-alt': '#151515',
        gold: '#d4af37',
        'text-primary': '#f2f2f2',
        'text-secondary': '#9a9a9a',
      },
    },
  },
  plugins: [],
}

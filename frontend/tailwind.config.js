/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom Bloomberg-style colors
        'trade-bg': '#0a0e17',
        'trade-card': '#161b22',
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
      colors: {
        primary: "#10b981",
        secondary: "#3b82f6",
        accent: "#f59e0b",
      }
    },
  },
  plugins: [],
}

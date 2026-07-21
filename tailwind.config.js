/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
        chivo: ['Chivo', 'sans-serif'],
      },
      colors: {
        // Classic Azteca Palette
        classic: {
          primary: "#004e34",
          "primary-container": "#006847",
          "on-primary": "#ffffff",
          secondary: "#bb001e",
          "secondary-container": "#e12531",
          surface: "#f7faf5",
          "surface-container": "#ebefea",
          "surface-container-high": "#e5e9e4",
          "surface-container-highest": "#e0e4de",
          "on-surface": "#181d1a",
          "on-surface-variant": "#3f4943",
          outline: "#6f7a72",
        },
        // Obsidian Pitch Palette
        obsidian: {
          surface: "#131313",
          "surface-container-lowest": "#0e0e0e",
          "surface-container-low": "#1c1b1b",
          "surface-container": "#201f1f",
          "surface-container-high": "#2a2a2a",
          "surface-container-highest": "#353534",
          primary: "#a2d1b7",
          "primary-container": "#013220",
          "on-primary": "#083825",
          gold: "#e9c349",
          "gold-container": "#af8d11",
          "on-surface": "#e5e2e1",
          "on-surface-variant": "#c1c8c2",
          outline: "#8b938c",
        },
        // Azteca Energy Palette
        energy: {
          primary: "#ce1126",
          "primary-dark": "#a30019",
          "on-primary": "#ffffff",
          surface: "#fcf9f8",
          "surface-container": "#f0edec",
          "surface-container-high": "#ebe7e7",
          "surface-container-highest": "#e5e2e1",
          "on-surface": "#1c1b1b",
          "on-surface-variant": "#5c3f3d",
          outline: "#916f6c",
        }
      }
    },
  },
  plugins: [],
}

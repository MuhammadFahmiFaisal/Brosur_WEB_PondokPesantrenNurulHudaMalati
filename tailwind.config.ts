
import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["Lexend", "sans-serif"],
      },
      colors: {
        primary: "#f2b90d",
        "primary-dark": "#d4a000",
        navy: "#0A2342",
        "navy-dark": "#051121",
        gold: "#D4AF37",
        "action-blue": "#1142d4",
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
      }
    },
  },
  plugins: [],
} satisfies Config

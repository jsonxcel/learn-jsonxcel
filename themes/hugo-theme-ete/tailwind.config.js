/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./layouts/**/*.html",
    "./exampleSite/content/**/*.{md,html}",
    "./exampleSite/layouts/**/*.html",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef7ff",
          100: "#d9ecff",
          500: "#0b6bcb",
          600: "#0958a8",
          700: "#074684",
          800: "#0a3a66",
          900: "#0b1f33",
        },
        ink: {
          DEFAULT: "#0f172a",
          muted: "#475569",
        },
        surface: {
          DEFAULT: "#f8fafc",
          card: "#ffffff",
        },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', "Segoe UI", "sans-serif"],
        display: ['"IBM Plex Sans"', "Segoe UI", "sans-serif"],
        mono: ['"IBM Plex Mono"', "Consolas", "monospace"],
      },
      boxShadow: {
        soft: "0 12px 40px -16px rgba(15, 23, 42, 0.25)",
      },
    },
  },
  plugins: [],
};

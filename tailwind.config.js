/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: "#fdf2f8",
          lavender: "#f5f3ff",
          mint: "#f0fdf4",
          coral: "#fff7ed",
          blue: "#eff6ff",
        },
      },
    },
  },
  plugins: [],
}

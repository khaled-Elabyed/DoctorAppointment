/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",          // ✅ مهم جداً
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
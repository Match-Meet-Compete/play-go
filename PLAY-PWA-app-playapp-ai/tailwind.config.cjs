/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0B0F14",
        card: "#101826",
        coral: "#FF5A3D",
        neon: "#4CFF7A",
        muted: "#93A4B8"
      }
    }
  },
  plugins: []
};

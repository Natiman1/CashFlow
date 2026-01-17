import animate from "tailwindcss-animate"

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    // Optional if other components come from packages/ui
    "../../packages/ui/src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [animate],
};

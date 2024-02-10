/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // "dark-blue": "#1b1f36",
        "dark-blue": "#101426",
        "medium-blue": "#39416e",
        "light-pink": "#dcb6e3",
        "medium-pink": "#bf97c7",
        "dark-pink": "#a8859d",
        "bv-white": "#fefefe",
        "bv-grey": "#d1d1d1",
        "bv-medium-green": "#3c8038",
        // "bv-blue": "#326fd1",
        // "bv-purple": "#e6d227",
        // "bv-yellow": "#7030ba",
      },
      fontFamily: {
        onest: ["Onest", "sans-serif"],
        bitter: ["Bitter", "serif"],
      },
    },
  },
  plugins: [],
};

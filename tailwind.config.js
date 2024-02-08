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
        "dark-pink": "#a8859d",
        "bv-white": "#fefefe",
        "bv-grey": "#d1d1d1",
      },
      fontFamily: {
        onest: ["Onest", "sans-serif"],
        bitter: ["Bitter", "serif"],
      },
    },
  },
  plugins: [],
};

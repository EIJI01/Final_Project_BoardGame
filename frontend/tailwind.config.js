/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {},
    screens: {
      iphoneXR: "414px",
      iphoneMini: "375px",
      samsung: "360px",
      tablets: "600px",
      ipad: "768px",
      ipadPro: "1024px",
      labtop: "1280px",
      macbookPro: "1440px",
      bestLarg: "1680px",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "main-text": "#212121",
        "main-bure-text": "#263238",
        "main-dark-text": "#FFFF",
        "secondary-dark-text": "#e0e0e0",
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        "4xl": "2.5rem",
        "5xl": "3.25rem",
        "6xl": "4rem",
      },
      backgroundColor: {
        "main-dark-bg": "#212121",
        "secondary-dark-bg": "#424242",
      },
      borderWidth: {
        1: "1px",
      },
      borderColor: {
        "main-dark": "#212121", //rgba(0,0,0,0.1);
      },
      width: {
        400: "400px",
        760: "760px",
        780: "780px",
        800: "800px",
        1000: "1000px",
        1200: "1200px",
        1400: "1400px",
      },
      height: {
        80: "80px",
        232: "232px",
        460: "445px",
        320: "320px",
      },
      minHeight: {
        590: "590px",
      },
      maxHeight: {
        300: "312px",
        460: "445px",
      },
    },
  },
  plugins: [],
});

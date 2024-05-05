/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      fontFamily: {
        young: ["Young Serif", "sans-serif"],
        outfit: "Outfit",
      },
      colors: {
        nutmeg: "hsl(14, 45%, 36%)",
        eggshell: "hsl(30, 54%, 90%)",
        raspberry: "hsl(332, 51%, 32%)",
        rose: "hsl(330, 100%, 98%)",
        charcoal: "hsl(24, 5%, 18%)",
        wenge: "hsl(30, 10%, 34%)",
        light: "hsl(30, 18%, 87%)",
        preparation: "#fff7fb",
      },
    },
  },
  plugins: [],
};

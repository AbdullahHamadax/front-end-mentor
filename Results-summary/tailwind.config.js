const { royalblue, slateblue } = require("color-name");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        Hanken: "Hanken Grotesk",
      },
      colors: {
        slateblue: "hsl(252, 100%, 67%)",
        royalblue: "hsl(241, 81%, 54%)",
        paleblue: "hsl(221, 100%, 96%)",
        lavender: "hsl(241, 100%, 89%)",
        grayblue: "hsl(224, 30%, 27%)",
        violetblue: "hsla(256, 72%, 46%, 1)",
        persianblue: "hsla(241, 72%, 46%, 0)",
        lightred: "hsl(0, 100%, 67%)",
        orangeyellow: "hsl(39, 100%, 56%)",
        greenteal: "hsl(166, 100%, 37%)",
        cobaltblue: "hsl(234, 85%, 45%)",
        reaction: "#fff6f5",
        memory: "#fffbf2",
        verbal: "#f2fbfa",
        visual: "#F3F3FD",
      },
      screens: {
        edge: { min: "452px" },
      },
    },
  },
};

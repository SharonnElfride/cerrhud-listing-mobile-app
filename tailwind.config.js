import colors from "./colors";
const { hairlineWidth } = require("nativewind/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: colors,
      backgroundColor: colors.background.DEFAULT,
      fontFamily: {
        title: [
          "Roboto Serif",
          "RobotoSerif_700Bold",
          "Georgia",
          "Times New Roman",
          "serif",
        ],
        body: [
          "Poppins",
          "Poppins_400Regular",
          "Helvetica",
          "Arial",
          "Lucida",
          "sans-serif",
        ],
      },
      animation: {
        bounce: "bounce 1s infinite",
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
    },
  },
  plugins: [],
};

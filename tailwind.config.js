import colors from "./colors";
const { hairlineWidth } = require("nativewind/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    // aria: {
    //   busy: 'busy="true"',
    //   checked: 'checked="true"',
    //   disabled: 'disabled="true"',
    //   expanded: 'expanded="true"',
    //   hidden: 'hidden="true"',
    //   pressed: 'pressed="true"',
    //   readonly: 'readonly="true"',
    //   required: 'required="true"',
    //   selected: 'selected="true"',
    // },
    extend: {
      colors: colors,
      backgroundColor: colors.background.DEFAULT,
      fontFamily: {
        title: ["Roboto Serif", "Georgia", "Times New Roman", "serif"],
        body: ["Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"],
      },
      animation: {
        bounce: "bounce 1s infinite",
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
    },
  },
  // corePlugins: {
  //   aspectRatio: false,
  // },
  plugins: [
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/aspect-ratio'),
  ],
};

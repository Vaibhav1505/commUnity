const {heroui} = require('@heroui/theme');
/** @type {import('tailwindcss').Config} */

const {nextui} = require("@nextui-org/react");


module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@heroui/theme/dist/components/(drawer|input-otp|modal|form).js"
  ],
  theme: {
    extend: {
      colors:{
        'primary':'#E65100',
        'gray':'#212121',
        'white':'#FFFFFF',
        'lightGray':'#9E9E9E',
        'darkGray':'#292929',
        'gray700':'#455A64',
        'gray800':'#808080'
      }
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes:{
      light:{
        colors:{
          
        }
      }
    }
  }),heroui()],
}
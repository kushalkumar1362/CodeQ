/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        primary: "#009087",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('tailwindcss-animated'),
  ],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx", "./index.html"],
  theme: {
    extend: {
      colors: {
        background: "#09090a", //criar cor personalizada
      },
      gridTemplateRows: {
        7: "repeat(7, minmax(0,1fr))",
      },
    },
  },
  plugins: [],
};

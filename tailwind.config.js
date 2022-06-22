/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/client/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#D1DAE7",
        secondary: "#7088AB",
        light: "#F0F0F5",
        dark: "#081933",
        "fairy-rose": "#ff4081",
      },
    },
  },
  plugins: [],
};

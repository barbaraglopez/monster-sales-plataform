/** @type {import('tailwindcss').Config} */
export default {
  darkMode:"class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      zIndex: {
        100: "100",
      },
    },
  },
  plugins: [],
};




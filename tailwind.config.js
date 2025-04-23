/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        golden: "#ffc864",
        dustyGray: "#C8C8C8",
        borderColor: "#333",
        raisinBlack: "#222222",
        offWhite: "#ffffff40",
      },
    },
  },
  plugins: [],
};

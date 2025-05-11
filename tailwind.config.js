/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        golden: "#ffc864",
        lightGolden: "#ffc86480",
        dustyGray: "#C8C8C8",
        borderColor: "#333",
        raisinBlack: "#222222",
        offWhite: "#ffffff40",
      },
      boxShadow: {
        goldenShadow: "0px 0px 12px 10px rgba(255,200,100,0.3)",
      },
    },
  },
  plugins: [],
};

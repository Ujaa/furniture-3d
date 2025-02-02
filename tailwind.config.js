/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        dotBounce: {
          "0%, 80%, 100%": { transform: "scale(0)" },
          "40%": { transform: "scale(1)" },
        },
      },
      animation: {
        "dot-bounce": "dotBounce 1.4s infinite ease-in-out",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
    function ({ addUtilities }) {
      const newUtilities = {
        ".animation-delay-0": { "animation-delay": "0s" },
        ".animation-delay-16": { "animation-delay": "0.16s" },
        ".animation-delay-32": { "animation-delay": "0.32s" },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};

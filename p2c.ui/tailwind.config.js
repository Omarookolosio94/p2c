/** @type {import('tailwindcss').Config} */
import { addIconSelectors } from "@iconify/tailwind";

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: () => ({
        "brand-blue": "#8cabd8",
        "brand-blue-light": "#dfe9ff",
        "brand-blue-dark": "#6e7fa3",
        "brand-gray": "#F5F5F5",
      }),
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
  baseUrl: ".",
  paths: {
    "@/*": ["./src/*"],
  },
};

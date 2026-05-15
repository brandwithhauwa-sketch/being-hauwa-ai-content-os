import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#27211f",
        rosewood: "#8f4f59",
        blush: "#f7e5e8",
        shell: "#fbf7f2",
        sage: "#8b9a7d",
        cocoa: "#6f5a4a",
        clay: "#c47f68",
        mist: "#e9ece7",
        peacock: "#2f6f73",
        honey: "#d6a94a",
        paper: "#fffdf9",
        pearl: "#fdf1f4",
        plum: "#4a2634",
        night: "#171114",
        velvet: "#24191f",
      },
      boxShadow: {
        soft: "0 20px 70px rgba(70, 46, 44, 0.10)",
        lift: "0 18px 45px rgba(39, 33, 31, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;

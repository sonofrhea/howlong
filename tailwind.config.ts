import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        display: ['Bebas Neue', 'sans-serif'],
        body: ['Outfit', 'sans-serif'],
      },
      keyframes: {
        terminal: {
          "0%": { width: "0%" },
          "50%": { width: "80%" },
          "100%": { width: "0%" },
        },
      },
      animation: {
        "terminal-bar": "terminal 1.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
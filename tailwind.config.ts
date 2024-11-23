import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "375px",
      // => @media (min-width: 640px) { ... }

      md: "840px",
      // => @media (min-width: 768px) { ... }

      lg: "1110px",
      // => @media (min-width: 1024px) { ... }

      xl: "4850px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "5536px",
      // => @media (min-width: 1536px) { ... }
    },

    extend: {
      colors: {
        primary: "#139D8F",
        secondary: "#c3f8f2",
        tertiarygreen: "#1AD9C5",
        primaryblack: "#535353",
        buttongray: "#7B7B7B",
        pillbackground: "#f1f1f3",
        graytext: "#98A2B3",
      },
    },
  },
  plugins: [],
};
export default config;

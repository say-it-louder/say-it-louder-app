import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFF",
        background: {
          500: "#1B1B35",
          600: "#0D0D2C",
          700: "#13131A",
        },
        logo: {
          500: "#3168D8",
          700: "#7900FF",
        },
      },
    },
  },
  plugins: [],
};
export default config;

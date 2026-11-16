import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          900: "#0D2A1D",
          DEFAULT: "#123D2A", // Primary Deep Forest Green
          800: "#123D2A",
          700: "#1B5138", // Secondary Dark Green
          600: "#246646",
          500: "#2D7B55",
          100: "#E6EFEA",
          50: "#F2F7F4",
        },
        gold: {
          DEFAULT: "#C6A15B", // Accent Warm Gold
          light: "#DFC38A",
          dark: "#A3803C",
          50: "#FDFBF7",
          100: "#F7F1E5",
        },
        ivory: {
          DEFAULT: "#F8F7F2", // Background Warm Ivory
          50: "#FCFCFA",
          100: "#F8F7F2",
          200: "#EFECE3",
        },
        charcoal: {
          DEFAULT: "#202820", // Text Charcoal
          muted: "#70776F", // Muted Text
          light: "#4A524A",
          border: "#E2E0D8",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

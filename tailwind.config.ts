import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "dark-bg": "#080404", // Background color
        "dark-panel": "#0a0a0a", // Panel color
        "dark-hover": "#262626", // Button color when hovered
        "primary-accent": "#ffad33", // Primary accent color (orange-yellow)
        "secondary-accent": "#FF5733", // Secondary accent color (orange-red)
        "tertiary-accent": "#fb8618", // tertiary accent color (orange)
        "text-primary": "rgb(220, 220, 220)", // Primary text color
        "text-secondary": "#808080", // Secondary text color
        "text-tertiary": "#404040", // Tertiary text color
        "text-dark": "#0d0d0d", // Dark text color
        "highlight-green": "#ade25d", // Green highlight color
        "highlight-red": "#f95200", // Red highlight color
        "dark-border": "rgba(128, 128, 128, 0.3)", // Border color
      },
      fontFamily: {
        jaro: ["'Jaro'", "sans-serif"],
        jockey: ["'Jockey One'", "sans-serif"],
        blip: ["'Libre Barcode 39'"],
      },
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
export default config;

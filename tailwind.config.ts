import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0B",
        surface: "#141416",
        "surface-2": "#1D1D20",
        gold: "#C8A44D",
        "gold-bright": "#E8CE7E",
        "gold-deep": "#8A6D2B",
        text: "#F2F0EB",
        muted: "#96928A",
        subtle: "#3A3A3E",
        positive: "#5FA777",
        negative: "#C4574F",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: [
          "var(--font-body)",
          "PingFang TC",
          "Microsoft JhengHei",
          "Noto Sans TC",
          "system-ui",
          "sans-serif",
        ],
      },
      letterSpacing: {
        widest: "0.22em",
      },
      maxWidth: {
        page: "72rem",
      },
    },
  },
  plugins: [],
};

export default config;

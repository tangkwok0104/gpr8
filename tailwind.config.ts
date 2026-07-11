import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Day theme, single mode. Warm paper rather than pure white — white is what a
        // default Tailwind starter looks like, and this is a bullion house.
        paper: "#FBF9F5",
        card: "#FFFFFF",
        well: "#F3EFE7",
        ink: "#1A1714",
        muted: "#6E675E",
        line: "#E3DCD0",
        // Gold has to survive on a light background. #C8A44D fails contrast on paper,
        // so text-weight gold is darkened and the brighter tone is kept for fills.
        gold: "#8A6A2E",
        "gold-fill": "#A8813C",
        "gold-hover": "#6E5423",
        "gold-tint": "#EFE6D2",
        positive: "#2F7D4F",
        negative: "#B03B33",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: [
          "var(--font-body)",
          "PingFang TC",
          "PingFang SC",
          "Microsoft JhengHei",
          "Microsoft YaHei",
          "Noto Sans TC",
          "Noto Sans SC",
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

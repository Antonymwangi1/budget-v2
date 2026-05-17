import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Sidebar
        sidebar: "var(--color-sidebar)",
        "sidebar-surface": "var(--color-sidebar-surface)",
        "sidebar-border": "var(--color-sidebar-border)",
        "sidebar-text": "var(--color-sidebar-text)",
        "sidebar-muted": "var(--color-sidebar-muted)",

        // Content area
        canvas: "var(--color-canvas)",
        surface: "var(--color-surface)",
        border: "var(--color-border)",
        "content-text": "var(--color-content-text)",
        "content-muted": "var(--color-content-muted)",

        // Gruvbox accent palette
        accent: "var(--color-accent)",
        "accent-light": "var(--color-accent-light)",

        // Semantic
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        danger: "var(--color-danger)",
        info: "var(--color-info)",
      },
      borderRadius: {
        DEFAULT: "8px",
        lg: "12px",
        xl: "16px",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;

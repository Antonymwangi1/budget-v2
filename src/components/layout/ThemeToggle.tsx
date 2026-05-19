"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    if (stored) {
      setTheme(stored);
      document.documentElement.setAttribute("data-theme", stored);
    }
  }, []);

  const toggle = (t: "light" | "dark") => {
    setTheme(t);
    localStorage.setItem("theme", t);
    document.documentElement.setAttribute("data-theme", t);
  };

  return (
    <div className="hidden sm:flex items-center bg-border rounded-full p-0.5 gap-0.5">
      <button
        onClick={() => toggle("light")}
        className={`px-2.5 py-1 rounded-full text-xs transition-colors ${
          theme === "light"
            ? "bg-surface text-content-text font-medium"
            : "text-content-muted hover:text-content-text"
        }`}
      >
        Light
      </button>
      <button
        onClick={() => toggle("dark")}
        className={`px-2.5 py-1 rounded-full text-xs transition-colors ${
          theme === "dark"
            ? "bg-surface text-content-text font-medium"
            : "text-content-muted hover:text-content-text"
        }`}
      >
        Dark
      </button>
    </div>
  );
}

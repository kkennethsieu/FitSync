// components/ThemeToggle.tsx
"use client";

import { useTheme } from "../_context/ThemeContext";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>{isDark ? "🌙 Dark" : "☀️ Light"}</button>
  );
}

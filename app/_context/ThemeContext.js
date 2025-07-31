// components/ThemeProvider.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {},
});

export default function ThemeProvider({ children, initialTheme = "light" }) {
  const [isDark, setIsDark] = useState(initialTheme === "dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const toggleTheme = async () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle("dark", newDark);

    // Save theme to DB
    await fetch("/api/save-theme", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ theme: newDark ? "dark" : "light" }),
    });
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

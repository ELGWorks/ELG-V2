import { useCallback, useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

function readTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readTheme);

  const toggleTheme = useCallback(() => {
    const next: Theme = readTheme() === "dark" ? "light" : "dark";

    document.documentElement.classList.toggle("dark", next === "dark");

    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage can be blocked (private mode)
    }

    setTheme(next);
  }, []);

  return { theme, isDark: theme === "dark", toggleTheme };
}
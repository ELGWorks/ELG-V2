import { Moon, Sun } from "lucide-react";

// Shows a sun in light mode and a moon in dark mode. The two icons are stacked
// and cross-fade with a small rotation, matching the slow color fade.
function ThemeIcon({ isDark }: { isDark: boolean }) {
  const base =
    "absolute inset-0 transition-[opacity,transform] duration-700 ease-in-out";

  return (
    <span className="relative block size-5">
      <Sun
        size={20}
        className={`${base} ${
          isDark
            ? "-rotate-90 scale-50 opacity-0"
            : "rotate-0 scale-100 opacity-100"
        }`}
      />
      <Moon
        size={20}
        className={`${base} ${
          isDark
            ? "rotate-0 scale-100 opacity-100"
            : "rotate-90 scale-50 opacity-0"
        }`}
      />
    </span>
  );
}

export default ThemeIcon;

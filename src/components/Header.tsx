import { useState, useEffect } from "react";
import { PanelLeft, X } from "lucide-react";
import { useLenis } from "lenis/react";
import { useTheme } from "../hooks/useTheme";
import ThemeIcon from "./ThemeIcon";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const roundButton =
  "grid size-12 shrink-0 cursor-pointer place-items-center rounded-full border border-line-strong bg-surface";

function Header() {
  // Desktop / tablet: the pill that expands into a nav bar
  const [isOpen, setIsOpen] = useState(false);
  // Mobile: full-screen menu
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const lenis = useLenis();
  const { isDark, toggleTheme } = useTheme();

  const themeLabel = isDark ? "Switch to light mode" : "Switch to dark mode";

  useEffect(() => {
    // A section becomes active when it crosses the middle of the viewport.
    // (threshold: 0.5 never fires for sections taller than 2x the screen,
    // which happens to the Projects section on mobile.)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );

    SECTIONS.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Lock page scrolling while the full-screen menu is open.
  useEffect(() => {
    if (!lenis) return;
    if (menuOpen) lenis.stop();
    else lenis.start();
    return () => lenis.start();
  }, [menuOpen, lenis]);

  // Close the menu with Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  // Close the full-screen menu if the screen grows past the mobile breakpoint.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Close the menu, then scroll to the section (honoring its scroll-margin,
  // which the Projects section uses to center its first card).
  const goToSection = (id: string) => {
    setMenuOpen(false);
    lenis?.start();

    const el = document.getElementById(id);
    if (!el) return;

    const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
    const y = el.getBoundingClientRect().top + window.scrollY - margin;

    if (lenis) lenis.scrollTo(y, { duration: 1.2 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <>
      <header className="fixed top-4 left-0 right-0 z-50 mx-auto max-w-5xl px-4 sm:top-8 sm:px-15 xl:px-0">
        {/* Desktop / tablet pill */}
        <div
          className={`mt-2 hidden h-12 items-center justify-between overflow-hidden rounded-full border border-line-strong bg-surface text-[18px] transition-[width] duration-800 ease-in-out animate-[jumpIn_0.7s_ease-out_both] sm:flex ${
            isOpen ? "w-full" : "w-12"
          }`}
        >
          <button
            aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
            className="grid size-12 shrink-0 cursor-pointer place-items-center"
          >
            <PanelLeft size={20} />
          </button>

          {/* Stays mounted; fades out instantly-ish on close, fades in after the pill has grown on open */}
          <nav
            aria-hidden={!isOpen}
            className={`flex flex-1 items-center justify-center gap-5 whitespace-nowrap text-[18px] text-muted transition-opacity duration-500 ease-in-out ${
              isOpen
                ? "opacity-100 delay-700"
                : "pointer-events-none opacity-0"
            }`}
          >
            {SECTIONS.map(({ id, label }) => (
              <a
                key={id}
                href={`/#${id}`}
                tabIndex={isOpen ? 0 : -1}
                className={`rounded-full border px-3 py-1 transition-all duration-1000 ease-in-out ${
                  activeSection === id
                    ? "border-nav bg-tint text-fg"
                    : "border-transparent text-muted hover:border-nav hover:bg-tint hover:text-fg"
                }`}
              >
                {label}
              </a>
            ))}
          </nav>

          <button
            aria-label={themeLabel}
            tabIndex={isOpen ? 0 : -1}
            onClick={toggleTheme}
            className={`grid size-12 shrink-0 cursor-pointer place-items-center transition-opacity duration-500 ease-in-out ${
              isOpen
                ? "opacity-100 delay-700"
                : "pointer-events-none opacity-0"
            }`}
          >
            <ThemeIcon isDark={isDark} />
          </button>
        </div>

        {/* Mobile: theme + menu buttons, top right */}
        <div className="mt-2 flex items-center justify-end gap-2 animate-[jumpIn_0.7s_ease-out_both] sm:hidden">
          <button
            aria-label={themeLabel}
            onClick={toggleTheme}
            className={roundButton}
          >
            <ThemeIcon isDark={isDark} />
          </button>
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className={roundButton}
          >
            {menuOpen ? <X size={20} /> : <PanelLeft size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile: full-screen menu (sits under the header buttons) */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-4 bg-page transition-[opacity,visibility] duration-500 ease-in-out sm:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {SECTIONS.map(({ id, label }, i) => (
          <a
            key={id}
            href={`/#${id}`}
            tabIndex={menuOpen ? 0 : -1}
            onClick={(e) => {
              e.preventDefault();
              goToSection(id);
            }}
            style={{ transitionDelay: menuOpen ? `${150 + i * 80}ms` : "0ms" }}
            className={`rounded-full border px-8 py-2 text-[34px] transition-[opacity,transform] duration-500 ease-out ${
              menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            } ${
              activeSection === id
                ? "border-nav bg-surface text-fg"
                : "border-transparent text-muted"
            }`}
          >
            {label}
          </a>
        ))}
      </div>
    </>
  );
}

export default Header;

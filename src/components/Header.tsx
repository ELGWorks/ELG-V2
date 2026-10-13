import { useState, useEffect } from "react";
import { PanelLeft, Sun } from "lucide-react";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

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

  return (
    <header className="fixed top-4 left-0 right-0 z-50 mx-auto max-w-5xl px-4 sm:top-8 sm:px-15 xl:px-0">
      <div
        className={`mt-2 flex h-12 items-center justify-between overflow-hidden rounded-full border border-[#DDE3EF] bg-white text-[18px] transition-[width] duration-800 ease-in-out animate-[jumpIn_0.7s_ease-out_both] ${
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
          className={`flex flex-1 items-center justify-center gap-1 whitespace-nowrap text-[15px] text-[#8D8D8D] transition-opacity duration-500 ease-in-out sm:gap-5 sm:text-[18px] ${
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
              className={`rounded-full border px-2.5 py-1 transition-all duration-1000 ease-in-out sm:px-3 ${
                activeSection === id
                  ? "border-[#C8C8C8] bg-[#E6EFFF] text-black"
                  : "border-transparent text-[#8D8D8D] hover:border-[#C8C8C8] hover:bg-[#E6EFFF] hover:text-black"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        <button
          aria-label="Toggle theme"
          tabIndex={isOpen ? 0 : -1}
          className={`grid size-12 shrink-0 cursor-pointer place-items-center transition-opacity duration-500 ease-in-out ${
            isOpen
              ? "opacity-100 delay-700"
              : "pointer-events-none opacity-0"
          }`}
        >
          <Sun size={20} />
        </button>
      </div>
    </header>
  );
}

export default Header;

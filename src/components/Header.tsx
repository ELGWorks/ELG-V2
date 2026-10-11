import { useState, useEffect } from "react";
import { PanelLeft, Sun } from "lucide-react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = ["home", "projects", "contact"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5,
      },
    );

    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-8 left-0 right-0 z-50 mx-auto max-w-5xl px-15 xl:px-0">
      <div
        className={`flex items-center overflow-hidden rounded-full border border-[#DDE3EF] bg-white py-1 h-15 text-[20px] transition-[width] duration-800 ease-in-out ${
          isOpen ? "w-full justify-between px-6" : "w-12 justify-start px-3"
        }`}
      >
        <button
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
          aria-expanded={isOpen}
          onClick={() => {
            if (isOpen) {
              setShowContent(false);
              setIsOpen(false);
            } else {
              setIsOpen(true);
              setTimeout(() => setShowContent(true), 1000);
            }
          }}
          className={"flex shrink-0 cursor-pointer items-center"}
        >
          <PanelLeft size={22} />
        </button>

        {isOpen && (
          <div
            className={`flex flex-1 items-center justify-center transition-opacity duration-500 ease-in-out ${
              showContent ? "opacity-100" : "opacity-0"
            }`}
          >
            <nav className="flex items-center gap-5 text-[#8D8D8D]">
              <a
                href="#home"
                className={`rounded-full border px-3 py-1 transition-all duration-1000 ease-in-out ${
                  activeSection === "home"
                    ? "border-[#C8C8C8] bg-[#E6EFFF] text-black"
                    : "border-transparent text-[#8D8D8D] hover:border-[#C8C8C8] hover:bg-[#E6EFFF] hover:text-black"
                }`}
              >
                Home
              </a>

              <a
                href="#projects"
                className={`rounded-full border px-3 py-1 transition-all duration-1000 ease-in-out ${
                  activeSection === "projects"
                    ? "border-[#C8C8C8] bg-[#E6EFFF] text-black"
                    : "border-transparent text-[#8D8D8D] hover:border-[#C8C8C8] hover:bg-[#E6EFFF] hover:text-black"
                }`}
              >
                Projects
              </a>

              <a
                href="#contact"
                className={`rounded-full border px-3 py-1 transition-all duration-1000 ease-in-out ${
                  activeSection === "contact"
                    ? "border-[#C8C8C8] bg-[#E6EFFF] text-black"
                    : "border-transparent text-[#8D8D8D] hover:border-[#C8C8C8] hover:bg-[#E6EFFF] hover:text-black"
                }`}
              >
                Contact
              </a>
            </nav>
          </div>
        )}

        <button
          aria-label="Toggle theme"
          className={`flex shrink-0 items-center transition-opacity duration-500 ease-in-out cursor-pointer ${
            isOpen && showContent
              ? "visible opacity-100"
              : "invisible opacity-0"
          }`}
        >
          <Sun size={22} />
        </button>

      </div>
    </header>
  );
}

export default Header;

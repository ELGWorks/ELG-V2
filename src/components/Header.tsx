import { PanelLeft, Sun } from "lucide-react";

function Header() {
  return (
    <>
      <header className="flex justify-between items-center mt-8 rounded-full border border-[#DDE3EF] pt-3 pb-3 pr-6 pl-6 bg-white text-[20px]">
        <button
          aria-label="Open sidebar"
          className="cursor-pointer flex justify-between items-center"
        >
          <PanelLeft size={22} />
        </button>

        <nav className="flex items-center gap-5 text-[#8D8D8D]">
          <a
            href="#home"
            className="flex items-center rounded-full border border-transparent hover:bg-[#E6EFFF] hover:text-[black] hover:border-[#C8C8C8] active:border-black px-3 py-1 transition-colors duration-600 ease-in-out"
          >
            Home
          </a>

          <a
            href="#projects"
            className="flex items-center rounded-full border border-transparent hover:bg-[#E6EFFF] hover:text-[black] hover:border-[#C8C8C8] active:border-black px-3 py-1 transition-colors duration-600 ease-in-out"
          >
            Projects
          </a>

          <a
            href="#contact"
            className="flex items-center rounded-full border border-transparent hover:bg-[#E6EFFF] hover:text-[black] hover:border-[#C8C8C8] active:border-black px-3 py-1 transition-colors duration-600 ease-in-out"
          >
            Contact
          </a>
        </nav>

        <button
          aria-label="Toggle theme"
          className="cursor-pointer flex justify-between items-center"
        >
          <Sun size={22} />
        </button>
      </header>
    </>
  );
}

export default Header;

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { Send } from "lucide-react";
import introImage from "../assets/images/intro-image.webp";

function HomeSection() {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < 600);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      id="home"
      className="flex min-h-screen items-center justify-center"
    >
      <div
        ref={contentRef}
        className={`flex items-center justify-center gap-20 transition-[opacity,transform] duration-700 ease-in-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <div className="animate-[jumpIn_0.7s_ease-out_both]">
          <img
            src={introImage}
            alt="Emman's profile"
            className="h-115 w-90 rounded-[50px] object-cover"
          />
        </div>

        <div className="flex flex-col gap-15 animate-[jumpIn_0.7s_ease-out_0.15s_both]">
          <p className="text-[65px] leading-none">
            hi, <span className="text-[#257BBE]">emman</span> here.
          </p>

          <div>
            <p className="text-[18px]">
              Website frontend developer + AI from Pampanga, Philippines.
            </p>
            <Link
              to="/viewfullbio"
              className="w-fit cursor-pointer text-[14px] text-[#8D8D8D] transition-colors duration-600 ease-in-out hover:text-[#257BBE] hover:underline"
            >
              View Full Bio
            </Link>
          </div>

          <button
            aria-label="Send an email"
            className="flex w-fit cursor-pointer items-center gap-3 rounded-[50px] border border-[#257BBE] px-4 pt-3 pb-2 text-[18px] font-bold text-[#257BBE] transition-colors duration-600 ease-in-out hover:bg-[#257BBE] hover:text-white"
          >
            <Send size={30} />
            Say hi!
          </button>
        </div>
      </div>
    </section>
  );
}

export default HomeSection;

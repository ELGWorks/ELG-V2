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
      className="flex min-h-screen items-center justify-center px-6 py-28 md:py-0"
    >
      <div
        ref={contentRef}
        className={`flex flex-col items-center justify-center gap-10 transition-[opacity,transform] duration-700 ease-in-out md:flex-row md:gap-20 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <div className="animate-[jumpIn_0.7s_ease-out_both]">
          <img
            src={introImage}
            alt="Emman's profile"
            className="h-96 w-72 rounded-[40px] object-cover md:h-115 md:w-90 md:rounded-[50px]"
          />
        </div>

        <div className="flex flex-col items-center gap-8 text-center animate-[jumpIn_0.7s_ease-out_0.15s_both] md:items-start md:gap-15 md:text-left">
          <p className="text-[44px] leading-none sm:text-[55px] md:text-[65px]">
            hi, <span className="text-accent">emman</span> here.
            {/* Blinking "typing" cursor */}
            <span
              aria-hidden="true"
              className="ml-1.5 inline-block h-[0.8em] w-[0.07em] animate-[blink_1s_step-end_infinite] rounded-full bg-accent align-[-0.08em] motion-reduce:animate-none"
            />
          </p>

          <div>
            <p className="text-[16px] md:text-[18px]">
              Website frontend developer + AI from Pampanga, Philippines.
            </p>
            <Link
              to="/viewfullbio"
              className="w-fit cursor-pointer text-[14px] text-muted transition-colors duration-600 ease-in-out hover:text-accent hover:underline"
            >
              View Full Bio
            </Link>
          </div>

          <button
            aria-label="Send an email"
            className="flex w-fit cursor-pointer items-center gap-1.5 rounded-[50px] border border-accent px-4 pt-2.5 pb-2 text-[16px] font-bold text-accent transition-colors duration-600 ease-in-out hover:bg-accent hover:text-on-accent"
          >
            <Send size={20} />
            Say hi!
          </button>
        </div>
      </div>
    </section>
  );
}

export default HomeSection;

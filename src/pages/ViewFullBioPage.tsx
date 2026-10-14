// import { Link } from "react-router";
import { useNavigate } from "react-router";
import { Eye, Undo2 } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import ThemeIcon from "../components/ThemeIcon";
import aboutImage from "../assets/images/about-image.webp";
import resume from "../assets/Gonzales_Emmanuel_Resumé.pdf";

function ViewFullBioPage() {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  return (
    <>
      {/* Same position and look as the buttons on the home page:
          back button on the left, theme button on the right */}
      <div className="fixed top-4 left-0 right-0 z-50 mx-auto max-w-5xl px-4 sm:top-8 sm:px-15 xl:px-0">
        {/* sm:-mx-[53px] = same outward shift as the home navbar (48px button + ~5px gap) */}
        <div className="mt-2 flex items-center justify-between animate-[jumpIn_0.7s_ease-out_both] sm:-mx-[53px]">
          <button
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="grid size-12 cursor-pointer place-items-center rounded-full border border-line-strong bg-surface"
          >
            <Undo2 size={20} />
          </button>

          <button
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="grid size-12 cursor-pointer place-items-center rounded-full border border-line-strong bg-surface lg:hidden"
          >
            <ThemeIcon isDark={isDark} />
          </button>
        </div>
      </div>

      {/* Same measurements as the Home section: same breakpoint, image size,
          gaps, text sizes, and centered text on phones. */}
      <section
        id="home"
        className="flex min-h-screen items-center justify-center px-6 py-28 md:py-0"
      >
        <div className="flex flex-col items-center justify-center gap-10 md:w-full md:flex-row md:gap-20">
          {/* Image comes first on phones (like Home), on the right from md up.
              shrink-0 keeps it at full size instead of being squeezed by the text. */}
          <div className="shrink-0 animate-[jumpIn_0.7s_ease-out_both] md:order-last">
            <img
              src={aboutImage}
              alt="Emman's profile"
              className="h-96 w-72 rounded-[40px] object-cover md:h-115 md:w-90 md:rounded-[50px]"
            />
          </div>

          <div className="flex min-w-0 flex-col items-center gap-8 text-center text-[16px] animate-[jumpIn_0.7s_ease-out_0.15s_both] md:flex-1 md:items-start md:gap-15 md:text-left md:text-[18px]">
            <p>
              I graduated last August, 2025 under Computer Science. Currently, I
              am focusing on web development with the goal of building
              responsive and efficient applications.
            </p>

            <p>Here are some technologies I have been working with:</p>

            <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-left md:gap-x-12">
              {[
                "React.js",
                "JavaScript ES6+",
                "Tailwind CSS",
                "MySQL",
                "PHP",
              ].map((tech) => (
                <div key={tech} className="flex items-center gap-3">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
                  <span>{tech}</span>
                </div>
              ))}
            </div>

            <button
              aria-label="View resume"
              className="flex w-fit cursor-pointer items-center gap-1.5 rounded-[50px] border border-accent px-4 pt-2.5 pb-2.5 text-[16px] font-bold text-accent transition-colors duration-600 ease-in-out hover:bg-accent hover:text-on-accent"
            >
              <Eye size={20} />
              <a
                href={resume}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2 text-[16px]"
              >
                Resume
              </a>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default ViewFullBioPage;

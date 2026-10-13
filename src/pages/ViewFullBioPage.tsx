// import { Link } from "react-router";
import { useNavigate } from "react-router";
import { Eye, Undo2 } from "lucide-react";
import aboutImage from "../assets/images/about-image.webp";
import resume from "../assets/Gonzales_Emmanuel_Resumé.pdf";

function ViewFullBioPage() {
  const navigate = useNavigate();

  return (
    <>
      {/* Same position and look as the closed navbar pill on the home page */}
      <div className="fixed top-4 left-0 right-0 z-50 mx-auto max-w-5xl px-4 sm:top-8 sm:px-15 xl:px-0">
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="mt-2 grid size-12 cursor-pointer place-items-center rounded-full border border-[#DDE3EF] bg-white animate-[jumpIn_0.7s_ease-out_both]"
        >
          <Undo2 size={20} />
        </button>
      </div>
      <section
        id="home"
        className="flex min-h-[calc(90vh-5rem)] flex-col items-center justify-center gap-10 px-6 pt-28 pb-10 lg:flex-row lg:gap-20 lg:py-0"
      >
        <div className="flex flex-col gap-8 text-[16px] animate-[jumpIn_0.7s_ease-out_both] sm:gap-10 sm:text-[18px]">
          <p>
            I graduated last August, 2025 under Computer Science. Currently, I
            am focusing on web development with the goal of building responsive
            and efficient applications.
          </p>

          <p className="animate-[jumpIn_0.7s_ease-out_both]">
            Here are some technologies I have been working with:
          </p>

          <div className="grid grid-cols-2 gap-x-6 gap-y-4 animate-[jumpIn_0.7s_ease-out_both] sm:gap-x-12">
            {[
              "React.js",
              "JavaScript ES6+",
              "Tailwind CSS",
              "MySQL",
              "PHP",
            ].map((tech) => (
              <div key={tech} className="flex items-center gap-3">
                <span className="h-2 w-2 shrink-0 rounded-full bg-[#257BBE]" />
                <span>{tech}</span>
              </div>
            ))}
          </div>
          <button
            aria-label="Send an email"
            className="flex w-fit cursor-pointer items-center gap-1.5 rounded-[50px] border border-[#257BBE] px-4 pt-2.5 pb-2.5 text-[16px] font-bold text-[#257BBE] transition-colors duration-600 ease-in-out hover:bg-[#257BBE] hover:text-white"
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
        <div className="w-full max-w-[720px] lg:w-auto">
          <img
            src={aboutImage}
            alt="Emman's profile"
            className="h-64 w-full rounded-[32px] object-cover animate-[jumpIn_0.7s_ease-out_both] sm:h-80 sm:rounded-[50px] lg:h-115 lg:w-120 xl:w-180"
          />
        </div>
      </section>
    </>
  );
}

export default ViewFullBioPage;

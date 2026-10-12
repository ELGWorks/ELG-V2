// import { Link } from "react-router";
import { useNavigate } from "react-router";
import { Eye, Undo2 } from "lucide-react";
import aboutImage from "../assets/images/about-image.webp";
import resume from "../assets/Gonzales_Emmanuel_Resumé.pdf";

function ViewFullBioPage() {
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => navigate(-1)}
        aria-label="Go back"
        className="mt-10 z-50 mx-auto max-w-5xl w-12 p-3 py-3 cursor-pointer rounded-full border border-[#DDE3EF] w-fit bg-white animate-[jumpIn_0.7s_ease-out_both]"
      >
        <Undo2 size={20} />
      </button>
      <section
        id="home"
        className="flex min-h-[calc(90vh-5rem)] items-center justify-center gap-20"
      >
        <div className="flex flex-col gap-10 text-[18px] animate-[jumpIn_0.7s_ease-out_both]">
          <p>
            I graduated last August, 2025 under Computer Science. Currently, I
            am focusing on web development with the goal of building responsive
            and efficient applications.
          </p>

          <p className="animate-[jumpIn_0.7s_ease-out_both] text-[18px]">
            Here are some technologies I have been working with:
          </p>

          <div className="grid grid-cols-2 gap-x-12 gap-y-4 animate-[jumpIn_0.7s_ease-out_both] text-[18px]">
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
        <div>
          <img
            src={aboutImage}
            alt="Emman's profile"
            className="h-115 w-180 rounded-[50px] object-cover animate-[jumpIn_0.7s_ease-out_both]"
          />
        </div>
      </section>
    </>
  );
}

export default ViewFullBioPage;

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
        className="mt-10 z-50 mx-auto max-w-5xl p-5 py-5 cursor-pointer rounded-full border border-[#DDE3EF] w-fit bg-white animate-[jumpIn_0.7s_ease-out_both]"
      >
        <Undo2 size={24} />
      </button>
      <section
        id="home"
        className="flex min-h-[calc(100vh-5rem)] items-center justify-center gap-20"
      >
        <div className="flex flex-col gap-5 text-[20px] animate-[jumpIn_0.7s_ease-out_both]">
          <p>
            I graduated last August, 2025 under Computer Science. Currently, I
            am focusing on web development with the goal of building responsive
            and efficient applications.
          </p>

          <p className="animate-[jumpIn_0.7s_ease-out_both]">Here are some technologies I have been working with:</p>

          <div className="grid grid-cols-2 gap-x-12 gap-y-4 animate-[jumpIn_0.7s_ease-out_both]">
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
            className="flex items-center gap-3 w-fit border border:black; cursor-pointer px-8 py-5 rounded-[50px] border border-[#257BBE] hover:bg-[#257BBE] hover:text-white transition-colors duration-600 ease-in-out text-[20px] font-bold text-[#257BBE] mt-10 animate-[jumpIn_0.7s_ease-out_both]"
          >
            <a
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-2"
            >
              <Eye size={30} />
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

// import { Link } from "react-router";
import { Eye } from "lucide-react";
import aboutImage from "../assets/images/about-image.webp";
import resume from "../assets/Gonzales_Emmanuel_Resumé.pdf";
import Header from "../components/Header";

function ViewFullBioPage() {
  return (
    <>
      <Header />

      <section
        id="home"
        className="flex min-h-[calc(100vh-5rem)] items-center justify-center gap-20"
      >
        <div className="flex flex-col gap-5 text-[20px]">
          <p>
            I graduated last August, 2025 under Computer Science. Currently, I
            am focusing on web development with the goal of building responsive
            and efficient applications.
          </p>

          <p>Here are some technologies I have been working with:</p>

          <div className="grid grid-cols-2 gap-x-12 gap-y-4">
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
            className="flex items-center gap-3 w-fit border border:black; cursor-pointer px-8 py-5 rounded-[50px] border border-[#257BBE] hover:bg-[#257BBE] hover:text-white transition-colors duration-600 ease-in-out text-[20px] font-bold text-[#257BBE] mt-10"
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
            className="h-115 w-180 rounded-[50px] object-cover"
          />
        </div>
      </section>
    </>
  );
}

export default ViewFullBioPage;

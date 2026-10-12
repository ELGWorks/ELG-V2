import { ArrowUpRight } from "lucide-react";

function ProjectsSection() {
  return (
    <section
      id="projects"
      className="flex min-h-screen items-center justify-center"
    >
      <div className="flex h-[500px] w-[1000px] flex-col rounded-[50px] border border-[#E9EDF5] p-8 bg-[#FFFFFF]">
        {/* Top row */}
        <div className="flex items-center justify-between border-b border-[#E9EDF5] pb-5">
          <h3 className="text-[30px] font-bold">Img2Pixel</h3>

          <div className="flex gap-5">
            <button className="flex w-fit cursor-pointer items-center gap-1.5 rounded-[50px] border border-[#257BBE] px-4 pt-2.5 pb-2 text-[20px] text-[#257BBE] transition-colors duration-600 ease-in-out hover:bg-[#257BBE] hover:text-white">
              <a href="#">Source</a>

              <ArrowUpRight size={20} />
            </button>
            <button className="flex w-fit cursor-pointer items-center gap-1.5 rounded-[50px] border border-[#257BBE] px-4 pt-2.5 pb-2 text-[20px] text-[#257BBE] transition-colors duration-600 ease-in-out hover:bg-[#257BBE] hover:text-white">
              <a href="#">Visit Site</a>

              <ArrowUpRight size={20} />
            </button>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-1 mt-5">
          <div className="flex flex-col flex-1 gap-5">
            <p>
              A simple web application that turns images into pixelated style
              output
            </p>
            <p>My Role: Developer</p>
            <p>AI Role: Developer</p>
            <p>What I did in this project:</p>

            <div className="grid grid-cols gap-x-12 gap-y-4 animate-[jumpIn_0.7s_ease-out_both]">
              {["React.js", "JavaScript ES6+", "Tailwind CSS"].map((tech) => (
                <div key={tech} className="flex items-center gap-3">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#257BBE]" />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center flex-1">
            <div className="flex flex-1 justify-center">
              <img src="#" />
            </div>
            <div className="flex flex-1">
              <p>Tech Stack</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;

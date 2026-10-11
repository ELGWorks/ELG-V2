function ProjectsSection() {
  return (
    <section
      id="projects"
      className="flex min-h-screen items-center justify-center"
    >
      <div className="flex h-[500px] w-[1000px] flex-col rounded-[50px] border border-black p-10">
        {/* Top row */}
        <div className="flex justify-between pb-5 border-b border-gray">
          <p>Img2Pixel</p>

          <div className="flex gap-5">
            <button className="border border-black cursor-pointer">Source</button>
            <button className="border border-black cursor-pointer">Visit Site</button>
          </div>
        </div>

        {/* Remaining space */}
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
              {[
                "React.js",
                "JavaScript ES6+",
                "Tailwind CSS",
              ].map((tech) => (
                <div key={tech} className="flex items-center gap-3">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#257BBE]" />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center flex-1">
            <div className="flex flex-1">
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

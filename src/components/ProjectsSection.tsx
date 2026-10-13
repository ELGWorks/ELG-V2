import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

type Project = {
  title: string;
  description: string;
  role: string;
  aiRole: string;
  highlights: string[];
  image: string;
  techStack: string[];
  sourceUrl: string;
  siteUrl: string;
};

// Placeholder data; later this will come from the "data" folder.
const baseProject: Project = {
  title: "Img2Pixel",
  description:
    "A simple web application that turns images into pixelated style output.",
  role: "Fullstack Developer",
  aiRole: "Fullstack Developer",
  highlights: [
    "Develop frontend pages",
    "Designed picture conversion logic",
    "Lorep ipsum",
  ],
  image: "#",
  techStack: ["HTML5", "CSS3", "tailwindCSS"],
  sourceUrl: "#",
  siteUrl: "#",
};

const projects: Project[] = [
  { ...baseProject, title: "Img2Pixel" },
  { ...baseProject, title: "Project Two" },
  { ...baseProject, title: "Project Three" },
  { ...baseProject, title: "Project Four" },
  { ...baseProject, title: "Project Five" },
];

const VISIBLE_COUNT = 2; // fully shown cards
const PEEK_HEIGHT = "max-h-[200px] sm:max-h-[240px]"; // how much of the 3rd card shows when collapsed
const EXPANDED_HEIGHT = "max-h-[1200px] md:max-h-[800px]"; // must exceed the card's height

const buttonBase =
  "flex w-fit cursor-pointer items-center gap-1.5 rounded-full border border-[#257BBE] text-[#257BBE] transition-colors duration-300 ease-in-out hover:bg-[#257BBE] hover:text-white";
const linkButton = `${buttonBase} px-3 py-1.5 text-[14px] sm:px-4 sm:text-[16px]`;
const bigButton = `${buttonBase} bg-white px-5 py-2 text-[16px] sm:px-6 sm:py-2.5 sm:text-[18px]`;

// Same effect as the Home section: fade/slide wrapper + jumpIn on the content.
// Instead of window.scrollY, each card tracks its own visibility.
function Reveal({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`flex w-full justify-center transition-[opacity,transform] duration-700 ease-in-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div
        className={`flex w-full justify-center ${
          isVisible ? "animate-[jumpIn_0.7s_ease-out_both]" : ""
        }`}
        style={{ animationDelay: `${delay}s` }}
      >
        {children}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex w-full max-w-[1000px] flex-col rounded-[32px] border border-[#E9EDF5] bg-white p-5 sm:rounded-[50px] sm:p-8">
      {/* Top row */}
      <header className="flex flex-col items-start gap-4 border-b border-[#E9EDF5] pb-5 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-[24px] font-bold sm:text-[30px]">
          {project.title}
        </h3>

        <div className="flex gap-3">
          <a href={project.sourceUrl} className={linkButton}>
            Source
            <ArrowUpRight size={18} />
          </a>
          <a href={project.siteUrl} className={linkButton}>
            Visit Site
            <ArrowUpRight size={18} />
          </a>
        </div>
      </header>

      {/* Bottom row */}
      <div className="mt-5 flex flex-col gap-6 md:flex-row md:gap-8">
        {/* Left: details */}
        <div className="flex flex-1 flex-col gap-3">
          <p className="text-[16px] sm:text-[18px]">{project.description}</p>
          <p className="text-[15px]">My Role: {project.role}</p>
          <p className="text-[15px]">AI Role: {project.aiRole}</p>

          <div className="mt-1">
            <p className="text-[15px] font-bold text-[#D9824F]">
              What I did in this project:
            </p>
            <ul className="ml-1 list-inside list-disc text-[15px]">
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: preview + tech stack */}
        <div className="flex flex-1 flex-col gap-3">
          <div className="flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-[20px] border border-[#E9EDF5] sm:rounded-[30px]">
            <img
              src={project.image}
              alt={`${project.title} preview`}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-[13px] text-gray-500">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-[#E9EDF5] bg-[#F4F5F9] px-3 py-1 text-[11px] text-gray-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function ProjectsSection() {
  const [expanded, setExpanded] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const firstCardRef = useRef<HTMLDivElement | null>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  // When navigating to #projects, land with the first card centered in the
  // viewport. If the card is taller than the screen (mobile), align its top
  // just below the fixed header instead.
  useEffect(() => {
    const update = () => {
      const section = sectionRef.current;
      const card = firstCardRef.current;
      if (!section || !card) return;

      const paddingTop = parseFloat(getComputedStyle(section).paddingTop);
      const HEADER_SPACE = 96;
      const topGap = Math.max((window.innerHeight - card.offsetHeight) / 2, HEADER_SPACE);
      setScrollOffset(topGap - paddingTop);
    };

    update();

    const observer = new ResizeObserver(update);
    if (firstCardRef.current) observer.observe(firstCardRef.current);
    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const firstCards = projects.slice(0, VISIBLE_COUNT);
  const peekCard = projects[VISIBLE_COUNT]; // 3rd card, shown halved when collapsed
  const restCards = projects.slice(VISIBLE_COUNT + 1);

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{ scrollMarginTop: `${scrollOffset}px` }}
      className="flex min-h-screen flex-col items-center gap-8 bg-[#E3EDFF] px-4 py-28 sm:gap-12 sm:py-32"
    >
      {firstCards.map((project, i) => (
        <div
          key={`${project.title}-${i}`}
          ref={i === 0 ? firstCardRef : undefined}
          className="w-full"
        >
          <Reveal delay={i * 0.15}>
            <ProjectCard project={project} />
          </Reveal>
        </div>
      ))}

      {peekCard && (
        <div
          className={`relative flex w-full max-w-[1000px] justify-center overflow-hidden transition-[max-height] duration-700 ease-in-out ${
            expanded ? EXPANDED_HEIGHT : PEEK_HEIGHT
          }`}
        >
          <Reveal>
            <ProjectCard project={peekCard} />
          </Reveal>

          {/* Fade + "See all projects" button (collapsed only) */}
          <div
            className={`absolute inset-x-0 bottom-0 flex h-36 items-end justify-center bg-gradient-to-t from-[#E3EDFF] via-[#E3EDFF]/80 to-transparent pb-4 transition-opacity duration-300 sm:h-44 sm:pb-6 ${
              expanded ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className={bigButton}
            >
              See all projects
              <ArrowUpRight size={20} />
            </button>
          </div>
        </div>
      )}

      {expanded &&
        restCards.map((project, i) => (
          <Reveal key={`${project.title}-rest-${i}`}>
            <ProjectCard project={project} />
          </Reveal>
        ))}

      {expanded && (
        <button
          type="button"
          onClick={() => {
            setExpanded(false);
            document
              .getElementById("projects")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className={bigButton}
        >
          Show less
        </button>
      )}
    </section>
  );
}

export default ProjectsSection;

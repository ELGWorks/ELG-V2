import { useEffect, useRef, useState } from "react";
import { Mail, MapPin } from "lucide-react";

// Live clock for Pampanga. The time zone is fixed to Asia/Manila, so it shows
// Philippine time no matter where the visitor is.
const timeFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Manila",
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
});

function usePhilippineTime() {
  const [time, setTime] = useState(() => timeFormatter.format(new Date()));

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    // Tick right on each second boundary so the clock never drifts.
    const tick = () => {
      setTime(timeFormatter.format(new Date()));
      const msToNextSecond = 1000 - (Date.now() % 1000);
      timeout = setTimeout(tick, msToNextSecond);
    };

    tick();
    return () => clearTimeout(timeout);
  }, []);

  return time;
}

function ContactSection() {
  const localTime = usePhilippineTime();
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const content = contentRef.current;

    if (!content) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -150px 0px",
      },
    );

    observer.observe(content);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center min-h-screen px-6"
    >
      <div className="flex min-h-[calc(100vh-5rem)] max-w-full flex-col justify-center">
        <div
          ref={contentRef}
          className={`flex flex-col gap-8 transition-[opacity,transform] duration-700 ease-in-out sm:gap-10 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div className="flex items-center gap-3 text-[16px] text-fg sm:text-[25px]">
            <a
              href="mailto:emmanuellouisegonzales@gmail.com"
              className="flex items-center gap-3 transition-colors duration-300 ease-in-out hover:text-accent"
            >
              <Mail className="size-7 shrink-0 sm:size-10" />
              <span className="break-all">emmanuellouisegonzales@gmail.com</span>
            </a>
          </div>

          <div>
            <a
              href="https://github.com/ELGWorks"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="flex items-center gap-3 text-[16px] text-fg transition-colors duration-300 ease-in-out hover:text-accent sm:text-[20px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="size-7 shrink-0 sm:size-10"
              >
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.31-1.7-1.31-1.7-1.07-.73.08-.72.08-.72 1.18.08 1.8 1.21 1.8 1.21 1.05 1.8 2.75 1.28 3.42.98.11-.76.41-1.28.75-1.57-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.48.11-3.08 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 5.82 0c2.22-1.5 3.2-1.18 3.2-1.18.63 1.6.23 2.78.11 3.08.75.81 1.2 1.84 1.2 3.1 0 4.43-2.68 5.4-5.24 5.69.42.36.8 1.06.8 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
              </svg>
              ELGWorks
            </a>
          </div>

          <div className="flex items-center gap-3 text-[16px] text-fg sm:text-[20px]">
            <MapPin className="size-7 shrink-0 sm:size-10" />
            <p>
              Pampanga, Philippines{" "}
              <span className="tabular-nums text-muted">
                ({localTime})
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;

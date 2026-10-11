import { Mail, MapPin } from "lucide-react";

function ContactSection() {
  return (
    <section
      id="contact"
      className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center"
    >
      <div className="flex min-h-[calc(100vh-5rem)] flex-col justify-center gap-10">
        <div className="flex items-center gap-3 text-[25px] text-black">
          <a
            href="mailto:emmanuellouisegonzales@gmail.com"
            className="transition-colors duration-300 ease-in-out hover:text-[#257BBE] flex items-center gap-3"
          >
            <Mail size={40} />
            emmanuellouisegonzales@gmail.com
          </a>
        </div>

        <div>
          <a
            href="https://github.com/ELGWorks"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="flex items-center gap-3 text-[20px] text-black transition-colors duration-300 ease-in-out hover:text-[#257BBE]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.31-1.7-1.31-1.7-1.07-.73.08-.72.08-.72 1.18.08 1.8 1.21 1.8 1.21 1.05 1.8 2.75 1.28 3.42.98.11-.76.41-1.28.75-1.57-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.48.11-3.08 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 5.82 0c2.22-1.5 3.2-1.18 3.2-1.18.63 1.6.23 2.78.11 3.08.75.81 1.2 1.84 1.2 3.1 0 4.43-2.68 5.4-5.24 5.69.42.36.8 1.06.8 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
            </svg>
            ELGWorks
          </a>
        </div>

        <div className="flex items-center gap-3 text-[20px] text-black gap-3">
          <MapPin size={40} />
          <p>Pampanga, Philippines</p>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;

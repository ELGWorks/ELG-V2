import { Link } from "react-router";
import { Send } from "lucide-react";
import introImage from "../images/intro-image.webp";

function ContactSection() {
  return (
    <section
      id="home"
      className="flex min-h-[calc(100vh-5rem)] items-center justify-center gap-20"
    >
      <div>
        <img
          src={introImage}
          alt="Emman's profile"
          className="h-115 w-90 rounded-[50px] object-cover"
        />
      </div>

      <div className="flex flex-col gap-15">
        <p className="text-[80px] leading-none">
          hi, <span className="text-[#257BBE]">emman</span> here.
        </p>

        <div>
          <p className="text-[21px]">
            Website frontend developer + AI from Pampanga, Philippines.
          </p>
          <Link
            to="/viewfullbio"
            className="w-fit cursor-pointer text-[#8D8D8D] hover:underline hover:text-[#257BBE] transition-colors duration-600 ease-in-out text-[19px]"
          >
            View Full Bio
          </Link>
        </div>

        <button
          aria-label="Send an email"
          className="flex items-center gap-3 w-fit border border:black; cursor-pointer px-8 py-5 rounded-[50px] border border-[#257BBE] hover:bg-[#257BBE] hover:text-white transition-colors duration-600 ease-in-out text-[20px] font-bold text-[#257BBE]"
        >
          <Send size={30} />
          Say hi!
        </button>
      </div>
    </section>
  );
}

export default ContactSection;

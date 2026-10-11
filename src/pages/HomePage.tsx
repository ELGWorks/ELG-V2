import ContactSection from "../components/ContactSection";
import Header from "../components/Header";
import HomeSection from "../components/HomeSection";
import ProjectsSection from "../components/ProjectsSection";
import { ReactLenis } from "lenis/react";
import Footer from "../components/Footer";
import "lenis/dist/lenis.css";

function HomePage() {
  return (
    <>
      <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
        <Header />

        <section id="home" className="min-h-screen">
          {<HomeSection />}
        </section>

        <section id="projects" className="min-h-screen">
          {<ProjectsSection />}
        </section>

        <section id="contact" className="min-h-screen">
          {<ContactSection />}
        </section>

        <Footer />
      </ReactLenis>
    </>
  );
}

export default HomePage;

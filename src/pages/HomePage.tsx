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

          {<HomeSection />}
          {<ProjectsSection />}
          {<ContactSection />}

        <Footer />
      </ReactLenis>
    </>
  );
}

export default HomePage;

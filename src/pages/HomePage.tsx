import ContactSection from "../components/ContactSection";
import Header from "../components/Header";
import HomeSection from "../components/HomeSection";
import ProjectsSection from "../components/ProjectsSection";

function HomePage() {
  return (
    <>
      <Header />
      <div>
        <section id="home" className="min-h-screen">{<HomeSection />}</section>

        <section id="projects" className="min-h-screen">{<ProjectsSection />}</section>

        <section id="contact" className="min-h-screen">{<ContactSection />}</section>
      </div>
    </>
  );
}

export default HomePage;

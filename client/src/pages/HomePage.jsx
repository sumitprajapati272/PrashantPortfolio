import usePortfolio from "../hooks/usePortfolio.js";
import Starfield from "../components/Starfield.jsx";
import CursorGlow from "../components/CursorGlow.jsx";
import SiteHeader from "../components/SiteHeader.jsx";
import AIAssistant from "../components/AIAssistant.jsx";
import Footer from "../components/Footer.jsx";
import HeroSection from "../sections/HeroSection.jsx";
import AboutSection from "../sections/AboutSection.jsx";
import EducationSection from "../sections/EducationSection.jsx";
import SkillsSection from "../sections/SkillsSection.jsx";
import ProjectsSection from "../sections/ProjectsSection.jsx";
import JourneySection from "../sections/JourneySection.jsx";
import ResumeSection from "../sections/ResumeSection.jsx";
import CertificatesSection from "../sections/CertificatesSection.jsx";
import FutureSection from "../sections/FutureSection.jsx";
import ContactSection from "../sections/ContactSection.jsx";

function Backdrop() {
  return (
    <>
      <Starfield />
      <CursorGlow />
      <div className="ambient ambient-blue" aria-hidden="true" />
      <div className="ambient ambient-violet" aria-hidden="true" />
    </>
  );
}

export default function HomePage() {
  const { data, error, loading } = usePortfolio();

  if (loading || error) {
    return (
      <>
        <Backdrop />
        <main id="main" className="page-status" role={error ? "alert" : "status"}>
          {error ? (
            <>
              <p>We couldn’t load the portfolio right now. Please check that the server is running.</p>
              <button className="button button-primary" type="button" onClick={() => window.location.reload()}>
                Try again
              </button>
            </>
          ) : (
            <p>Loading portfolio…</p>
          )}
        </main>
      </>
    );
  }

  const { profile, values, previousEducation, skillGroups, projects, journey, certificates, futureGoals } = data;

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Backdrop />
      <SiteHeader name={profile.name} />
      <main id="main">
        <HeroSection />
        <AboutSection profile={profile} values={values} />
        <EducationSection profile={profile} previousEducation={previousEducation} />
        <SkillsSection />
        <ProjectsSection projects={projects} />
        <JourneySection journey={journey} />
        <ResumeSection />
        <CertificatesSection certificates={certificates} />
        <FutureSection futureGoals={futureGoals} />
        <ContactSection />
      </main>
      <AIAssistant profile={profile} projects={projects} skillGroups={skillGroups} journey={journey} />
      <Footer name={profile.name} />
    </>
  );
}

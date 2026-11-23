import { BriefcaseBusiness, Check, Code2, Download, ExternalLink, Eye, FileText, GraduationCap, Star } from "lucide-react";
import SectionHeading from "../components/SectionHeading.jsx";

export default function ResumeSection() {
  const highlights = [
    "LLM Evaluation & Quality Assessment",
    "Generative AI Task Handling",
    "Instruction & Safety Evaluation",
    "Full-Stack Project Development",
    "Clean, Professional Resume",
  ];

  return (
    <section className="section section-band resume-section" id="resume" aria-labelledby="resume-title">
      <div className="content-width resume-content-width">
        <SectionHeading
          id="resume-title"
          eyebrow="RESUME"
          title={<>My <span className="gradient-text">Resume</span></>}
          description="A concise summary of my education, experience, key projects, and technical skills."
        />
        <div className="resume-grid">
          <article className="resume-card resume-overview-card" aria-labelledby="resume-overview-title">
            <div className="resume-card-heading">
              <span className="resume-card-icon resume-card-icon-document" aria-hidden="true"><FileText /></span>
              <h3 id="resume-overview-title">Resume Overview</h3>
            </div>
            <p className="resume-overview-description">
              A snapshot of my background, including education, 6 months of professional experience at Ethara.ai, key projects, and core technical skills.
            </p>
            <div className="resume-divider" aria-hidden="true" />
            <div className="resume-facts">
              <div className="resume-fact">
                <span className="resume-fact-icon resume-fact-icon-experience" aria-hidden="true"><BriefcaseBusiness /></span>
                <span className="resume-fact-copy">
                  <strong>6 Months Experience</strong>
                  <span>Ethara.ai – Software Engineer</span>
                </span>
              </div>
              <div className="resume-fact">
                <span className="resume-fact-icon resume-fact-icon-education" aria-hidden="true"><GraduationCap /></span>
                <span className="resume-fact-copy">
                  <strong>B.Tech (CSE)</strong>
                  <span>ABES Engineering College (2022–2026)</span>
                </span>
              </div>
              <div className="resume-fact">
                <span className="resume-fact-icon resume-fact-icon-skills" aria-hidden="true"><Code2 /></span>
                <span className="resume-fact-copy">
                  <strong>Core Skills</strong>
                  <span>Python, AI/LLM, SQL, JavaScript, Git, Docker</span>
                </span>
              </div>
            </div>
          </article>
          <article className="resume-card resume-highlights-card" aria-labelledby="resume-highlights-title">
            <div className="resume-card-heading">
              <span className="resume-card-icon resume-card-icon-star" aria-hidden="true"><Star fill="currentColor" /></span>
              <h3 id="resume-highlights-title">Key Highlights</h3>
            </div>
            <ul className="resume-highlights">
              {highlights.map((highlight) => (
                <li key={highlight}>
                  <span className="resume-check" aria-hidden="true"><Check /></span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
            <div className="resume-actions" role="group" aria-label="Resume document actions">
              <a className="button button-primary" href="/Prashant_Prajapati_Resume.pdf" download>
                <Download aria-hidden="true" />
                <span>Download Resume (PDF)</span>
              </a>
              <a className="button button-secondary" href="/Prashant_Prajapati_Resume.pdf" target="_blank" rel="noreferrer">
                <Eye aria-hidden="true" />
                <span>Open in New Tab</span>
                <ExternalLink aria-hidden="true" />
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

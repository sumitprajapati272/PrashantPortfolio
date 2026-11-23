import { CalendarDays, GraduationCap, Layers } from "lucide-react";
import SectionHeading from "../components/SectionHeading.jsx";

export default function EducationSection({ profile, previousEducation }) {
  return (
    <section className="section section-band" id="education" aria-labelledby="education-title">
      <div className="content-width">
        <SectionHeading
          id="education-title"
          eyebrow="EDUCATION"
          title={<>My academic <span className="gradient-text">foundation.</span></>}
          description="The foundation behind my work in software engineering."
        />
        <article className="education-card">
          <div className="education-icon"><GraduationCap aria-hidden="true" /></div>
          <div className="education-main">
            <span className="status-pill">B.TECH · COMPUTER SCIENCE</span>
            <h3>{profile.degree}</h3>
            <p className="education-school">{profile.college} <span>·</span> Ghaziabad, Uttar Pradesh</p>
            <div className="education-facts">
              <span><CalendarDays aria-hidden="true" /><strong>Duration</strong> {profile.educationPeriod}</span>
              <span><GraduationCap aria-hidden="true" /><strong>Expected graduation</strong> {profile.expectedGraduation}</span>
              <span><Layers aria-hidden="true" /><strong>CGPA</strong> {profile.cgpa}</span>
            </div>
          </div>
          <span className="education-period">2022 <i>—</i> 2026</span>
        </article>
        <div className="prior-education-grid" aria-label="Previous education">
          {previousEducation.map((item) => (
            <article className="prior-education-card" key={item.program}>
              <span className="prior-education-icon"><GraduationCap aria-hidden="true" /></span>
              <div>
                <p className="eyebrow">{item.period}</p>
                <h3>{item.program}</h3>
                <p>{item.school} · {item.location}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

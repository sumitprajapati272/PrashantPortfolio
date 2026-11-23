import SectionHeading from "../components/SectionHeading.jsx";

export default function AboutSection({ profile, values }) {
  return (
    <section className="section content-width" id="about" aria-labelledby="about-title">
      <SectionHeading
        id="about-title"
        eyebrow="A LITTLE ABOUT ME"
        title={<>Learning by building, <span className="gradient-text">honestly.</span></>}
        description="A little about what I do, what I value, and how I approach the work."
      />
      <div className="about-layout">
        <div className="about-copy">
          {profile.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <div className="value-grid">
            {values.map((value) => (
              <article className="value-card" key={value.number}>
                <span className="value-number">{value.number}</span>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </article>
            ))}
          </div>
        </div>
        <aside className="profile-card" aria-label="Profile snapshot">
          <div className="profile-card-label"><span className="availability-dot" /> PROFILE SNAPSHOT</div>
          <div className="profile-avatar" aria-hidden="true">{profile.initials}</div>
          <h3>{profile.name}</h3>
          <p className="profile-role">{profile.role}</p>
          <div className="profile-divider" />
          <dl className="profile-details">
            <div><dt>Based in</dt><dd>{profile.location}</dd></div>
            <div><dt>Education</dt><dd>B.Tech · CSE</dd></div>
            <div><dt>Experience</dt><dd>{profile.experienceDuration} · {profile.experienceCompany}</dd></div>
            <div><dt>Focus</dt><dd>LLM evaluation &amp; full-stack systems</dd></div>
          </dl>
        </aside>
      </div>
      <div className="metrics-row" aria-label="Portfolio highlights">
        <div><strong>1,000<span>+</span></strong><p>Model outputs evaluated</p></div>
        <div><strong>15–20<span>%</span></strong><p>Reported safety and factual-consistency improvement</p></div>
        <div><strong>{profile.cgpa.split("/")[0]}</strong><p>CGPA out of 10 · ABES Engineering College</p></div>
      </div>
    </section>
  );
}

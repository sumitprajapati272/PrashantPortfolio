import SectionHeading from "../components/SectionHeading.jsx";

export default function JourneySection({ journey }) {
  return (
    <section className="section content-width" id="journey" aria-labelledby="journey-title">
      <SectionHeading
        id="journey-title"
        eyebrow="PROFESSIONAL JOURNEY"
        title={<>A path shaped by <span className="gradient-text">curiosity.</span></>}
        description="From academic foundations to building software with a team."
      />
      <div className="timeline">
        {journey.map((item) => (
          <article className="timeline-item" key={`${item.type}-${item.title}`}>
            <span className="timeline-marker" aria-hidden="true" />
            <p className="timeline-date">{item.date}</p>
            <div className="timeline-card">
              <span className="timeline-type">{item.type}</span>
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
              <span className="timeline-detail">{item.detail}</span>
              {"highlights" in item && (
                <ul className="timeline-highlights">
                  {item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

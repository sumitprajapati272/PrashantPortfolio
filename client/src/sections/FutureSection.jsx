import { Sparkles } from "lucide-react";
import SectionHeading from "../components/SectionHeading.jsx";

export default function FutureSection({ futureGoals }) {
  return (
    <section className="section section-band" id="future" aria-labelledby="future-title">
      <div className="content-width">
        <SectionHeading
          id="future-title"
          eyebrow="FUTURE GOALS"
          title={<>What I&apos;m exploring <span className="gradient-text">next.</span></>}
          description="A few directions I’m excited to keep learning about. These are goals, not completed accomplishments."
        />
        <div className="future-grid">
          {futureGoals.map((goal) => (
            <article className="future-card" key={goal.number}>
              <span className="future-number">{goal.number}</span>
              <span className="future-icon"><Sparkles aria-hidden="true" /></span>
              <h3>{goal.title}</h3>
              <p>{goal.description}</p>
              <span className="future-line" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

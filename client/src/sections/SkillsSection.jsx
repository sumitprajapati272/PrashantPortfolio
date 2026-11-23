import { Code2, Cpu, Database, Drama, Dumbbell, Layers, Monitor, Puzzle, Server, Sun, Terminal } from "lucide-react";
import SectionHeading from "../components/SectionHeading.jsx";

const technicalGroups = [
  { title: "Programming Languages", subtitle: "Core languages I use for problem solving and development.", icon: Code2, skills: ["C", "C++", "JavaScript", "SQL"] },
  { title: "Core Computer Science", subtitle: "Fundamental CS concepts and problem-solving skills.", icon: Layers, skills: ["DSA", "OOP", "Operating Systems", "DBMS", "Computer Networks"] },
  { title: "Backend Development", subtitle: "Building robust, scalable, and secure backend services.", icon: Server, skills: ["Node.js", "Express.js", "REST APIs", "MongoDB", "Scalable API Design", "Socket.IO", "JWT"] },
  { title: "Web Technologies (Frontend)", subtitle: "Creating responsive and user-friendly web interfaces.", icon: Monitor, skills: ["HTML", "CSS", "JavaScript", "React.js"] },
  { title: "Database", subtitle: "Database management and data storage.", icon: Database, skills: ["MongoDB"] },
  { title: "AI Evaluation (Ethara AI)", subtitle: "LLM evaluation, instruction following and safety alignment.", icon: Cpu, skills: ["LLM Evaluation", "Instruction & Safety"] },
  { title: "Developer Tools & Environment", subtitle: "Development, version control, and deployment tools.", icon: Terminal, skills: ["Git", "GitHub", "Linux", "Docker", "VS Code"], wide: true },
];

const beyondCards = [
  { title: "Problem-Solving Mind", icon: Puzzle, tone: "green", body: "Solves logical puzzles and 6 types of Rubik's Cubes — pattern thinking that carries straight into programming and DSA." },
  { title: "Fitness & Sports", icon: Dumbbell, tone: "amber", body: "Calisthenics, badminton and running — the discipline behind a consistent study routine." },
  {
    title: "Theatre & Drama",
    icon: Drama,
    tone: "violet",
    body: (
      <>
        Actively participated in college theatre and stage performances, including acting and dance. Completed <strong>1 month of dedicated theatre training</strong>, developing stage confidence, communication skills, teamwork and performance skills.
      </>
    ),
  },
  {
    title: "Personal Strengths",
    icon: Sun,
    tone: "amber",
    body: "Time Management · Leadership · Active Listening · Adaptability · Calm Under Pressure · Learns from Mistakes · Motivates Others.",
  },
];

export default function SkillsSection() {
  return (
    <>
      <section className="section content-width ts-section" id="skills" aria-labelledby="skills-title">
        <SectionHeading
          id="skills-title"
          eyebrow="TECHNICAL SKILLS"
          title={<>My Technical <span className="gradient-text">Skills</span></>}
          description="A comprehensive set of technologies and concepts I use to build scalable, efficient, and real-world applications."
        />
        <div className="ts-grid">
          {technicalGroups.map(({ title, subtitle, icon: Icon, skills, wide }) => (
            <article className={`ts-card${wide ? " ts-card-wide" : ""}`} key={title}>
              <div className="ts-card-head">
                <span className="ts-icon"><Icon aria-hidden="true" /></span>
                <div>
                  <h3>{title}</h3>
                  <p>{subtitle}</p>
                </div>
              </div>
              <ul className="ts-pills">
                {skills.map((skill) => <li key={skill}>{skill}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section content-width bc-section" id="beyond-the-code" aria-labelledby="beyond-title">
        <SectionHeading
          id="beyond-title"
          eyebrow="BEYOND THE CODE"
          title={<>Beyond the <span className="gradient-text">Code.</span></>}
          description="Skills and strengths from beyond coding that shape my personality, creativity, and overall growth."
        />
        <div className="bc-grid">
          {beyondCards.map(({ title, icon: Icon, tone, body }) => (
            <article className="bc-card" key={title}>
              <span className={`bc-icon bc-icon-${tone}`}><Icon aria-hidden="true" /></span>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

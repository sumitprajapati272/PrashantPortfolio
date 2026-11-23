import { useMemo, useState } from "react";
import SectionHeading from "../components/SectionHeading.jsx";
import ProjectArtwork from "../components/ProjectArtwork.jsx";

export default function ProjectsSection({ projects }) {
  const [filter, setFilter] = useState("all");
  const visibleProjects = useMemo(
    () => projects.filter((project) => filter === "all" || project.category === filter),
    [projects, filter],
  );
  const filters = [
    { label: "All projects", value: "all" },
    { label: "Full stack", value: "full-stack" },
    { label: "Web", value: "web" },
  ];

  return (
    <section className="section section-band" id="projects" aria-labelledby="projects-title">
      <div className="content-width">
        <SectionHeading
          id="projects-title"
          eyebrow="SELECTED PROJECTS"
          title={<>Things I&apos;ve <span className="gradient-text">built.</span></>}
          description="Real projects from my portfolio. Each one taught me something new."
        />
        <div className="filter-row" role="group" aria-label="Filter projects">
          {filters.map((item) => (
            <button
              key={item.value}
              className={`filter-button${filter === item.value ? " is-active" : ""}`}
              type="button"
              aria-pressed={filter === item.value}
              onClick={() => setFilter(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="project-grid" aria-live="polite">
          {visibleProjects.map((project) => (
            <article className="project-card" key={project.number}>
              <ProjectArtwork art={project.art} number={project.number} label={project.categoryLabel} />
              <div className="project-body">
                <div className="project-title-row"><h3>{project.name}</h3><span className="project-status">{project.status}</span></div>
                <p>{project.description}</p>
                <div className="project-tags" aria-label={`${project.name} technologies`}>
                  {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
                </div>
                <div className="project-link-note"><span className="project-link-dot" /> Project URL not included in the supplied files</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

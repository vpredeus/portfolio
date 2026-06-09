import { projects } from "../../data/projects";
import { ProjectCard } from "../ui/ProjectCard";

export function ProjectsSection() {
  return (
    <section id="projetos" className="section">
      <div className="section-header">
        <span className="section-label">Projetos</span>

        <h2>Projetos em destaque.</h2>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard
            key={project.name}
            name={project.name}
            shortDescription={project.shortDescription}
            details={project.details}
            technologies={project.technologies}
            githubUrl={project.githubUrl}
            pitchPdfUrl={project.pitchPdfUrl}
          />
        ))}
      </div>
    </section>
  );
}
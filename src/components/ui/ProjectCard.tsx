import { useState } from "react";
import { PitchPdfModal } from "./PitchPdfModal";

type ProjectCardProps = {
  name: string;
  shortDescription: string;
  details: string;
  technologies: string[];
  githubUrl: string;
  pitchPdfUrl: string;
};

export function ProjectCard({
  name,
  shortDescription,
  details,
  technologies,
  githubUrl,
  pitchPdfUrl,
}: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPitchOpen, setIsPitchOpen] = useState(false);

  function handleCardClick() {
    setIsOpen((currentState) => !currentState);
  }

  function handleCardKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleCardClick();
    }
  }

  function stopCardClick(event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation();
  }

  function openPitch(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setIsPitchOpen(true);
  }

  function closePitch() {
    setIsPitchOpen(false);
  }

  return (
    <>
      <article
        className={`project-card ${isOpen ? "project-card-open" : ""}`}
        onClick={handleCardClick}
        onKeyDown={handleCardKeyDown}
        tabIndex={0}
        role="button"
        aria-expanded={isOpen}
        aria-label={`Abrir detalhes do projeto ${name}`}
      >
        <div className="project-card-header">
          <h3>{name}</h3>

          <span className="project-card-icon" aria-hidden="true">
            {isOpen ? "−" : "+"}
          </span>
        </div>

        <p>{shortDescription}</p>

        <div className="project-tags" aria-label="Tecnologias utilizadas">
          {technologies.map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>

        {isOpen && (
          <div className="project-card-details">
            <p>{details}</p>

            <div className="project-card-actions">
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="project-github-button"
                onClick={stopCardClick}
              >
                Ver GitHub
              </a>

              <button
                type="button"
                className="project-pitch-button"
                onClick={openPitch}
              >
                Visualizar apresentação
              </button>
            </div>
          </div>
        )}
      </article>

      {isPitchOpen && (
        <PitchPdfModal
          projectName={name}
          pdfUrl={pitchPdfUrl}
          onClose={closePitch}
        />
      )}
    </>
  );
}
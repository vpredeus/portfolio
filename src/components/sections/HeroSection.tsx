import { useState } from "react";
import { profile } from "../../data/profile";
import { ResumeModal } from "../ui/ResumeModal";

export function HeroSection() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <>
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              Olá, eu sou <span>{profile.name}</span>.
            </h1>

            <p>
              {profile.role}, focado em {profile.focus}.
            </p>

            <div className="hero-actions">
              <a href="#projetos" className="primary-button">
                Ver projetos
              </a>

              <button
                type="button"
                className="secondary-button"
                onClick={() => setIsResumeOpen(true)}
              >
                Currículo
              </button>
            </div>
          </div>

          <div className="hero-avatar-wrapper" aria-hidden="true">
            <img
              src={profile.image}
              alt=""
              className="hero-avatar"
            />
          </div>
        </div>
      </section>

      {isResumeOpen && (
        <ResumeModal
          resumeUrl={profile.resume}
          onClose={() => setIsResumeOpen(false)}
        />
      )}
    </>
  );
}
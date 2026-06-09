import { profile } from "../../data/profile";

export function ContactSection() {
  return (
    <section id="contato" className="section contact-section">
      <div className="contact-card">
        <span className="section-label">Contato</span>

        <h2>Vamos conversar?</h2>

        <p>
          Estou construindo minha trajetória em desenvolvimento de software e
          aberto a oportunidades de aprendizado, colaboração, projetos técnicos e
          experiências profissionais.
        </p>

        <div className="contact-actions">
          <a href={`mailto:${profile.email}`} className="primary-button">
            Enviar e-mail
          </a>

          <a href={profile.github} target="_blank" className="secondary-button">
            Ver GitHub
          </a>

          <a href={profile.linkedin} target="_blank" className="secondary-button">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
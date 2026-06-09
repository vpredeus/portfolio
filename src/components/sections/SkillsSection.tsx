import { skills } from "../../data/skills";

export function SkillsSection() {
  return (
    <section id="habilidades" className="section skills-section">
      <div className="section-header">
        <span className="section-label">Habilidades técnicas</span>

        <h2>Tecnologias que estudo e utilizo.</h2>
      </div>

      <div className="skills-grid">
        {skills.map((skill) => (
          <article className="skill-card" key={skill.name}>
            <img src={skill.icon} alt="" className="skill-icon" />

            <span>{skill.name}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
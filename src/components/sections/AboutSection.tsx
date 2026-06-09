export function AboutSection() {
  return (
    <section id="sobre" className="section about-section">
      <div className="section-header">
        <span className="section-label">Sobre mim</span>
        <h2>Construindo uma base sólida em desenvolvimento de software.</h2>
      </div>

      <div className="about-content">
        <p>
          Sou estudante do Ensino Médio Integrado ao Técnico em Informática, com
          foco em desenvolvimento de software, back-end, Java, bancos de dados e
          organização de sistemas reais.
        </p>

        <p>
          Minha trajetória na tecnologia começou pela curiosidade em entender a
          lógica por trás do funcionamento das coisas. Com o tempo, essa
          curiosidade se transformou em interesse por programação, resolução de
          problemas e construção de projetos práticos.
        </p>

        <p>
          Atualmente, busco evoluir como desenvolvedor por meio de estudos
          técnicos, projetos autorais e experiências que unam lógica, estrutura,
          clareza e impacto real.
        </p>
      </div>

      <div className="about-highlights">
        <article>
          <strong>Back-end</strong>
          <span>Java, APIs, banco de dados e lógica de sistemas.</span>
        </article>

        <article>
          <strong>Projetos reais</strong>
          <span>Software aplicado à educação, sustentabilidade e organização.</span>
        </article>

        <article>
          <strong>Aprendizado contínuo</strong>
          <span>Estudo técnico, prática constante e evolução por projeto.</span>
        </article>
      </div>
    </section>
  );
}
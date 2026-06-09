import { profile } from "../../data/profile";

export function Header() {
  return (
    <header className="site-header">
      <div className="navbar">
        <a href="#" className="navbar-logo" aria-label="Voltar ao início">
          <span>JP</span>
          {profile.name}
        </a>

        <nav className="navbar-nav" aria-label="Navegação principal">
          <a href="#sobre">Sobre</a>
          <a href="#projetos">Projetos</a>
          <a href="#habilidades">Habilidades</a>
          <a href="#contato">Contato</a>
        </nav>

        <a href={profile.github} target="_blank" className="navbar-action">
          GitHub
        </a>
      </div>
    </header>
  );
}
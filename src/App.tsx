import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { useContent } from './content/useContent';
import s from './App.module.css';

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!('IntersectionObserver' in window)) {
      node.dataset.visible = 'true';
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.dataset.visible = 'true';
          observer.unobserve(node);
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={s.reveal + ' ' + className}
      style={{ '--delay': delay + 'ms' } as CSSProperties}
    >
      {children}
    </div>
  );
}
function Label({ number, children }: { number: string; children: ReactNode }) {
  return (
    <p className={s.label}>
      <span>{number}</span>
      {children}
    </p>
  );
}
function external(url: string) {
  return url.startsWith('https://')
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};
}

export function App() {
  const { content: c, status, retry } = useContent();
  const names = c?.profile.name.split(' ') ?? [];
  return (
    <>
      <a className={s.skip} href="#principal">
        Pular para o conteúdo
      </a>
      <header className={s.header}>
        <a className={s.brand} href="#inicio" aria-label="Voltar ao início">
          p<span>.</span>
        </a>
        <nav className={s.nav} aria-label="Navegação principal">
          <a href="#sobre">Sobre</a>
          <a href="#projetos">Projetos</a>
          <a href="#estudos">Leituras e estudos</a>
          <a href="#contato">
            Contato <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>
      {status === 'error' && (
        <div className={s.error} role="alert">
          Não foi possível buscar o conteúdo.{' '}
          <button onClick={retry}>Tentar novamente ↗</button>
        </div>
      )}
      {status === 'loading' && (
        <p className={s.loading} role="status">
          Buscando conteúdo…
        </p>
      )}
      <main id="principal" aria-busy={status === 'loading'}>
        <section
          id="inicio"
          className={s.section + ' ' + s.hero}
          aria-labelledby="inicio-titulo"
        >
          <div className={s.container}>
            <Reveal>
              <p className={s.eyebrow}>
                DESENVOLVIMENTO · EXATAS · APRENDIZADO
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h1 id="inicio-titulo" className={s.heroTitle}>
                {c ? (
                  <>
                    {names.slice(0, -1).join(' ')}
                    <br />
                    {names.at(-1)}
                    <span>.</span>
                  </>
                ) : (
                  <span
                    className={s.namePlaceholder}
                    aria-label="Carregando apresentação"
                  />
                )}
              </h1>
            </Reveal>
            <div className={s.heroBottom}>
              <Reveal delay={180} className={s.heroIntro}>
                <p className={s.lead}>{c?.profile.introduction ?? ' '}</p>
                <div className={s.links}>
                  {c?.profile.links.map((l) => (
                    <a key={l.label} href={l.url} {...external(l.url)}>
                      {l.label} <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={240}>
                <a className={s.scroll} href="#sobre">
                  <span>Um pouco sobre mim</span>
                  <span aria-hidden="true">↓</span>
                </a>
              </Reveal>
            </div>
          </div>
          <span className={s.pageNumber} aria-hidden="true">
            01 / 05
          </span>
        </section>
        <section
          id="sobre"
          className={s.section + ' ' + s.about}
          aria-labelledby="sobre-titulo"
        >
          <div className={s.container + ' ' + s.aboutGrid}>
            <Reveal>
              <Label number="01">SOBRE</Label>
              <h2 id="sobre-titulo">
                Entender.
                <br />
                Construir.
                <br />
                <span>Compartilhar.</span>
              </h2>
              <div className={s.body}>
                {c?.about.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <p className={s.formation}>{c?.about.education}</p>
            </Reveal>
            <Reveal delay={120}>
              <div
                className={s.imagePlaceholder}
                role="img"
                aria-label="Espaço reservado para uma futura fotografia com livros"
              >
                <span className={s.corner} aria-hidden="true">
                  +
                </span>
                <span className={s.imageCenter}>
                  <span aria-hidden="true">[ imagem ]</span>
                  <small>Um recorte do meu universo.</small>
                </span>
                <span className={s.imageCaption}>
                  LIVROS, ANOTAÇÕES E IDEIAS
                </span>
              </div>
              <p className={s.imageNote}>
                Espaço para uma fotografia com os meus livros.
              </p>
            </Reveal>
          </div>
        </section>
        <section
          id="projetos"
          className={s.section + ' ' + s.dark}
          aria-labelledby="projetos-titulo"
        >
          <div className={s.container}>
            <Reveal>
              <Label number="02">PROJETOS</Label>
              <div className={s.heading}>
                <h2 id="projetos-titulo">
                  Ideias que
                  <br />
                  ganham forma<span>.</span>
                </h2>
                <p>
                  O que construí em equipe,
                  <br />o que aprendi pelo caminho.
                </p>
              </div>
            </Reveal>
            <div className={s.projectList}>
              {c?.projects
                .filter((p) => p.published)
                .sort((a, b) => a.order - b.order)
                .map((p, i) => (
                  <Reveal key={p.id} delay={i * 60}>
                    <a className={s.project} href={p.url} {...external(p.url)}>
                      <span className={s.projectIndex}>0{i + 1}</span>
                      <div>
                        <p className={s.category}>{p.category}</p>
                        <h3>{p.title}</h3>
                        <p className={s.description}>{p.description}</p>
                        <p className={s.contribution}>{p.contribution}</p>
                      </div>
                      <span className={s.projectArrow} aria-hidden="true">
                        ↗
                      </span>
                    </a>
                  </Reveal>
                ))}
            </div>
          </div>
        </section>
        <section
          id="estudos"
          className={s.section}
          aria-labelledby="estudos-titulo"
        >
          <div className={s.container}>
            <Reveal>
              <Label number="03">LEITURAS E ESTUDOS</Label>
              <div className={s.heading}>
                <h2 id="estudos-titulo">
                  O que desperta
                  <br />
                  minha curiosidade<span>.</span>
                </h2>
                <p>
                  Livros, formação e reflexões.
                  <br />
                  Um espaço que acompanha meus interesses.
                </p>
              </div>
            </Reveal>
            <div className={s.studyGrid}>
              {c?.studies
                .filter((p) => p.published)
                .sort((a, b) => a.order - b.order)
                .map((p, i) => (
                  <Reveal key={p.id} delay={i * 80}>
                    <article className={s.study}>
                      <span className={s.studyType}>{p.type}</span>
                      <h3>{p.title}</h3>
                      <p>{p.description}</p>
                      {p.url ? (
                        <a
                          className={s.textLink}
                          href={p.url}
                          {...external(p.url)}
                        >
                          Explorar ↗
                        </a>
                      ) : (
                        <span className={s.studyNote}>
                          Espaço em construção
                        </span>
                      )}
                    </article>
                  </Reveal>
                ))}
            </div>
          </div>
        </section>
        <section
          id="contato"
          className={s.section + ' ' + s.contact}
          aria-labelledby="contato-titulo"
        >
          <div className={s.container}>
            <Reveal>
              <Label number="04">CONTATO</Label>
              <h2 id="contato-titulo">
                Vamos trocar
                <br />
                <span>uma ideia?</span>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className={s.contactIntro}>{c?.contact.message}</p>
              {c && (
                <a className={s.email} href={'mailto:' + c.profile.email}>
                  {c.profile.email}
                  <span aria-hidden="true">↗</span>
                </a>
              )}
              <div className={s.contactBottom}>
                <div className={s.links}>
                  {c?.profile.links
                    .filter((l) => !l.url.startsWith('mailto:'))
                    .map((l) => (
                      <a key={l.label} href={l.url} {...external(l.url)}>
                        {l.label} ↗
                      </a>
                    ))}
                </div>
                {c && (
                  <a
                    id="curriculo"
                    className={s.resume}
                    href={c.contact.resumeUrl}
                    download
                  >
                    Baixar currículo <span aria-hidden="true">↓</span>
                  </a>
                )}
              </div>
            </Reveal>
          </div>
          <footer className={s.container + ' ' + s.footer}>
            <span>{c?.profile.name}</span>
            <a href="#inicio">Voltar ao início ↑</a>
          </footer>
        </section>
      </main>
    </>
  );
}

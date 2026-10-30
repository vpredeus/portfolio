# Portfólio — versão 2

Primeiro esqueleto da nova identidade, na branch `feature/v2-refactory`.

## Rodar localmente

```sh
npm install
npm run dev
```

Abra a URL exibida pelo Vite. `npm run build` verifica o TypeScript e gera `dist/`.

## Estrutura desta versão

- Abertura, Sobre, Projetos, Leituras e estudos e Contato.
- Navbar flutuante, âncoras com rolagem suave e seções com altura mínima de uma tela (`100svh`). Se o conteúdo precisar de mais espaço, a seção cresce.
- Aparições com IntersectionObserver: cada bloco aparece uma vez e permanece visível ao voltar. Preferência de movimento reduzido é respeitada.
- Espaço reservado para fotografia, sem ilustrações ou animação da maçã nesta etapa.
- Currículo disponível apenas no contato. Links de e-mail, GitHub e LinkedIn também aparecem na abertura.

## Conteúdo e futura planilha

**O Google Sheets ainda não está conectado.** O conteúdo desta prévia vem de `public/content/preview.json`, consultado via Fetch na entrada. Os itens de estudos são espaços editoriais provisórios, não registros de livros ou cursos concluídos.

O formato da resposta está em `src/content/types.ts`. Projetos e estudos têm `order` e `published` para ordenar e ocultar itens.

Para trocar a fonte, copie `.env.example` para `.env.local` e defina `VITE_CONTENT_API_URL` com a URL do endpoint que devolverá esse mesmo formato JSON. Reinicie o Vite após mudar variáveis de ambiente.

Na próxima etapa, uma função Vercel lerá a planilha pela Sheets API. Essa função e as credenciais ainda precisam ser configuradas. Credenciais privadas nunca devem usar o prefixo `VITE_`, que as exporia ao navegador.

Não há polling, cópia de conteúdo no build ou espera artificial. Cada montagem consulta a fonte; React StrictMode pode iniciar e cancelar uma primeira consulta no desenvolvimento. Em produção, a consulta é feita na entrada. A indicação discreta de carregamento só fica visível após 1,2 s; falhas ou consultas acima de 12 s exibem um botão para tentar novamente.

## Organização

```text
src/
  App.tsx                 Composição inicial e aparições
  App.module.css          Estilos isolados da interface
  content/types.ts        Contrato do conteúdo
  content/useContent.ts   Consulta, cancelamento e nova tentativa
  styles/global.css       Tokens e estilos globais
public/content/preview.json  Conteúdo provisório
```

## Ferramentas

React, TypeScript, Vite, CSS Modules, ESLint e Prettier. GSAP/ScrollTrigger ficam para a etapa da maçã e Newton.

```sh
npm run lint
npm run format:check
npm run format
```

Esta etapa é local: nenhum deploy, commit ou push é feito automaticamente.

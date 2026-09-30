# Instituto Patas do Bem

Site institucional fictício de uma ONG de resgate, cuidado e adoção de animais abandonados. Projeto acadêmico de desenvolvimento web front-end, construído com HTML5, CSS3 e JavaScript puro.

## Visão geral

Aplicação SPA com três rotas (Início, Projetos e Cadastro). O conteúdo é injetado dinamicamente via `fetch` e manipulação do DOM, sem recarregar o documento. O projeto segue GitFlow e Conventional Commits.

## Tecnologias

- HTML5 semântico
- CSS3 com Design System em variáveis
- CSS Grid de 12 colunas e Flexbox
- JavaScript puro
- `fetch` e `DOMParser` para roteamento SPA
- `template` e `cloneNode` para renderização
- `localStorage` para persistência
- Day.js via CDN
- GitFlow e Conventional Commits

## Pré-requisitos

- Navegador moderno
- Python 3 instalado
- Git instalado

## Instalação

```bash
git clone https://github.com/garks467/InstitutoPatasDoBem
cd PatasDoBem
python -m http.server 8000
```

Acesse: `http://localhost:8000/html/index.html`

## Estrutura

```text
PatasDoBem/
├── html/
├── css/
├── js/
├── dist/
├── assets/images/
└── README.md
```

## Funcionalidades

- Layout responsivo com cinco breakpoints
- Menu hambúrguer com submenu
- Validação de formulários com mensagens por campo
- Componentes de feedback: badges, alerts, modal e toast
- Persistência local de cadastros
- SPA com roteamento por hash

## Autor

Gabriel Clark Passos — projeto acadêmico de desenvolvimento front-end para web.
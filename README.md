# Try and Survive - React + Node.js

## Equipe

- Tiala Nobre
- Raul

## Ano Letivo

2025

## GitHub

[https://github.com/Tiala2/JNP3]

---

## Sumário

- [Contextualização](#contextualização)
- [Descrição do Problema](#descrição-do-problema)
- [Lista de Atividades](#lista-de-atividades)
- [Proposta de Solução/Implementação](#proposta-de-soluçãoimplementação)
- [Dificuldades e Limitações](#dificuldades-e-limitações)
- [Conclusão](#conclusão)
- [Relatório Técnico](#relatório-técnico)
- [Como Executar](#como-executar)
- [Possíveis Melhorias Futuras](#possíveis-melhorias-futuras)

---

## Contextualização

O projeto **Try and Survive** é um jogo web de sobrevivência, desenvolvido para a disciplina de Desenvolvimento de Aplicações com Frameworks Web. O objetivo é proporcionar uma experiência prática de integração entre front-end (React) e back-end (Node.js/Express), utilizando comunicação via API REST. O jogador deve se mover em um grid, evitar monstros e coletar itens de cura, competindo por pontuações no ranking online.

---

## Descrição do Problema

O sistema deveria atender aos seguintes requisitos obrigatórios:

- Cadastro e autenticação de usuários.
- Interface de jogo baseada em grid, com movimentação do personagem.
- Geração de inimigos e itens no mapa.
- Sistema de pontuação e ranking dos melhores jogadores.
- Persistência do progresso do usuário.
- Integração entre front-end e back-end via API REST.
- Interface responsiva e de fácil utilização.

---

## Lista de Atividades

| Atividade                                      | Responsável     | Status    |
|------------------------------------------------|-----------------|-----------|
| Estruturação do projeto (client/server)        | Tiala,RAUL          | Concluída |
| Implementação do login/cadastro                | Tiala,RAUL          | Concluída |
| Lógica do jogo (grid, movimentação, inimigos)  | Raul,TIALA           | Concluída |
| Sistema de pontuação e ranking                 | Tiala,RAUL           | Concluída |
| Persistência de dados no back-end              | Raul,RAUL           | Concluída |
| Integração front-end/back-end                  | Tiala, Raul     | Concluída |
| Estilização e responsividade                   | Tiala,RAUL          | Concluída |
| Testes e validação                             | Raul,TIALA            | Concluída |

---

## Proposta de Solução/Implementação

A solução foi estruturada em duas camadas principais:

- **Front-end:** Desenvolvido em React com Vite, responsável pela interface do usuário, lógica do jogo e comunicação com o back-end via fetch/axios. Utilizou hooks para controle de estado e CSS Modules para estilização.
- **Back-end:** Desenvolvido em Node.js com Express, fornecendo rotas REST para autenticação, persistência de progresso e ranking. Os dados foram armazenados em arquivos JSON para facilitar a persistência simples.
- **Integração:** O Vite foi configurado para redirecionar as chamadas de API para o servidor Express durante o desenvolvimento, facilitando a integração local.
- **Tecnologias utilizadas:** React, Vite, Node.js, Express, CSS Modules, JavaScript ES6.

### Estrutura de Pastas

```
JNP3/
├── client/   # Front-end React
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── components/
│   │   │   ├── GameGrid.jsx
│   │   └── styles/
│   │       └── survival.module.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/   # Back-end Node.js
│   ├── server.js
│   ├── package.json
│   └── routes/
│       └── gameRoutes.js
└── README.md
```

---

## Dificuldades e Limitações

Durante o desenvolvimento, enfrentamos desafios como:

- Integração entre front-end e back-end, especialmente no tratamento de autenticação e persistência de dados.
- Limitações do armazenamento em arquivo JSON, que não é adequado para ambientes de produção ou múltiplos acessos simultâneos.
- Implementação de autenticação básica, sem uso de tokens JWT ou criptografia avançada.
- O jogo é single player e não possui funcionalidades multiplayer ou gráficos avançados.
- Algumas funcionalidades extras, como sons e animações, não foram implementadas devido ao tempo.

---

## Conclusão

O projeto foi entregue conforme os objetivos iniciais, proporcionando uma aplicação web funcional, com autenticação, ranking e persistência básica. A arquitetura escolhida permitiu o aprendizado prático de integração fullstack e pode ser expandida futuramente para incluir banco de dados, autenticação avançada e melhorias na interface do jogo. O resultado final atende aos requisitos propostos e demonstra o domínio das tecnologias estudadas.

---

## Relatório Técnico

### Objetivo

O projeto **Try and Survive** é um jogo web de sobrevivência, onde o jogador deve se mover em um grid, evitar monstros e coletar itens de cura. O sistema é composto por um front-end em React e um back-end em Node.js/Express, comunicando-se via API REST.

### Arquitetura e Tecnologias

- **Front-end:** React 18, Vite, CSS Modules
- **Back-end:** Node.js, Express, CORS
- **Comunicação:** HTTP/REST (JSON)
- **Gerenciamento de estado:** React useState/useEffect
- **Estilização:** CSS Modules (`survival.module.css`)
- **Persistência:** Dados em memória (servidor)

### Funcionalidades Principais

#### Front-end (React)
- **Login:** Usuário informa nome para iniciar sessão.
- **Menu:** Opções para iniciar jogo, ver ranking e sair.
- **Jogo:** Grid 10x10, movimentação do jogador, monstros e itens de cura, ataque, contagem de vidas, reinício e saída para menu.
- **Ranking:** Exibe top 10 pontuações via API.
- **Estilização responsiva:** Layout adaptável para desktop e mobile.

#### Back-end (Node.js/Express)
- **Rotas REST:**
  - `POST /api/register` — Registra novo jogador
  - `POST /api/login` — Login do jogador
  - `POST /api/save` — Salva progresso do jogador
  - `GET /api/progress/:username` — Busca progresso
  - `POST /api/score` — Registra pontuação
  - `GET /api/ranking` — Retorna ranking dos jogadores
  - `GET /api/status` — Status do servidor
- **Armazenamento:** Dados mantidos em memória (não persistente)
- **CORS:** Habilitado para integração com o front-end

---

## Como Executar

**Desenvolvimento:**
```bash
cd client && npm install
cd ../server && npm install
# Em dois terminais:
cd server && npm run dev
cd client && npm run dev
```
- Front-end: http://localhost:5173
- Back-end: http://localhost:3001/api/status

**Produção:**
```bash
cd client && npm run build
cd ../server && npm start
```
- Jogo disponível em http://localhost:3001

---

## Possíveis Melhorias Futuras

- Persistência dos dados em banco de dados (MongoDB, PostgreSQL, etc)
- Autenticação real (JWT, OAuth)
- Multiplayer online
- Mais tipos de inimigos e power-ups
- Animações e efeitos sonoros

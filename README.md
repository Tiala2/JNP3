# Try and Survive - React + Node.js

## Descrição

Jogo "Try and Survive" implementado em React (front-end via Vite) e Node.js/Express (back-end), separado em pastas `client/` e `server/`.

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

### Como Executar

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

### Pontos de Destaque

- **Jogo 100% React:** Lógica de movimentação, geração de inimigos e itens, e controle de estado feitos no front-end.
- **API Simples:** Permite expansão futura para persistência real (banco de dados).
- **Ranking:** Atualizado em tempo real, mostrando os melhores jogadores.
- **Código modular:** Componentes React separados e rotas organizadas no back-end.

### Possíveis Melhorias Futuras

- Persistência dos dados em banco de dados (MongoDB, PostgreSQL, etc)
- Autenticação real (JWT, OAuth)
- Multiplayer online
- Mais tipos de inimigos e power-ups
- Animações e efeitos sonoros

---

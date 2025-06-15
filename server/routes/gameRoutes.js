const express = require('express');
const router = express.Router();
const fs = require('fs');
const DATA_PATH = require('path').join(__dirname, '../data.json');

function loadData() {
  try {
    return JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
  } catch {
    return { jogadores: {}, rankings: [] };
  }
}
function saveData(data) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

let { jogadores, rankings } = loadData();

// Rota de status do servidor
router.get('/status', (req, res) => {
  res.json({ status: 'online' });
});

// Rota para registrar um novo jogador
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Nome e senha obrigatórios' });
  if (jogadores[username]) return res.status(409).json({ error: 'Usuário já existe' });
  jogadores[username] = { password, progresso: {}, score: 0 };
  saveData({ jogadores, rankings });
  res.json({ message: `Jogador ${username} registrado com sucesso!` });
});

// Rota para login do jogador
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!jogadores[username]) return res.status(404).json({ error: 'Usuário não encontrado' });
  if (jogadores[username].password !== password) return res.status(401).json({ error: 'Senha incorreta' });
  res.json({ message: `Jogador ${username} logado com sucesso!` });
});

// Rota para salvar progresso do jogo
router.post('/save', (req, res) => {
  const { username, progress } = req.body;
  if (!jogadores[username]) return res.status(404).json({ error: 'Usuário não encontrado' });
  jogadores[username].progresso = progress;
  saveData({ jogadores, rankings });
  res.json({ message: `Progresso do jogador ${username} salvo!` });
});

// Rota para buscar progresso do jogo
router.get('/progress/:username', (req, res) => {
  const { username } = req.params;
  if (!jogadores[username]) return res.status(404).json({ error: 'Usuário não encontrado' });
  res.json({ username, progress: jogadores[username].progresso });
});

// Rota para registrar pontuação
router.post('/score', (req, res) => {
  const { username, score, monstersKilled } = req.body;
  if (!jogadores[username]) return res.status(404).json({ error: 'Usuário não encontrado' });
  jogadores[username].score = score;
  jogadores[username].monstersKilled = monstersKilled || 0;
  // Atualiza ranking
  const idx = rankings.findIndex(r => r.username === username);
  if (idx >= 0) {
    rankings[idx].score = score;
    rankings[idx].monstersKilled = monstersKilled || 0;
  } else {
    rankings.push({ username, score, monstersKilled: monstersKilled || 0 });
  }
  // Ordena pelo número de monstros mortos (decrescente)
  rankings.sort((a, b) => (b.monstersKilled || 0) - (a.monstersKilled || 0));
  saveData({ jogadores, rankings });
  res.json({ message: `Pontuação registrada para ${username}!` });
});

// Rota para buscar ranking
router.get('/ranking', (req, res) => {
  res.json({ ranking: rankings.slice(0, 10) });
});

module.exports = router;
const express = require('express');
const router = express.Router();

// Simulação de "banco de dados" em memória
const jogadores = {};
const rankings = [];

// Rota de status do servidor
router.get('/status', (req, res) => {
  res.json({ status: 'online' });
});

// Rota para registrar um novo jogador
router.post('/register', (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: 'Nome obrigatório' });
  if (jogadores[username]) return res.status(409).json({ error: 'Usuário já existe' });
  jogadores[username] = { progresso: {}, score: 0 };
  res.json({ message: `Jogador ${username} registrado com sucesso!` });
});

// Rota para login do jogador
router.post('/login', (req, res) => {
  const { username } = req.body;
  if (!jogadores[username]) return res.status(404).json({ error: 'Usuário não encontrado' });
  res.json({ message: `Jogador ${username} logado com sucesso!` });
});

// Rota para salvar progresso do jogo
router.post('/save', (req, res) => {
  const { username, progress } = req.body;
  if (!jogadores[username]) return res.status(404).json({ error: 'Usuário não encontrado' });
  jogadores[username].progresso = progress;
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
  const { username, score } = req.body;
  if (!jogadores[username]) return res.status(404).json({ error: 'Usuário não encontrado' });
  jogadores[username].score = score;
  // Atualiza ranking
  const idx = rankings.findIndex(r => r.username === username);
  if (idx >= 0) rankings[idx].score = score;
  else rankings.push({ username, score });
  rankings.sort((a, b) => b.score - a.score);
  res.json({ message: `Pontuação ${score} registrada para ${username}!` });
});

// Rota para buscar ranking
router.get('/ranking', (req, res) => {
  res.json({ ranking: rankings.slice(0, 10) });
});

module.exports = router;
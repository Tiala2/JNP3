const express = require('express');
const router = express.Router();

// Exemplo de rota de status
router.get('/status', (req, res) => {
  res.json({ status: 'online' });
});

// Aqui você pode adicionar outras rotas do seu jogo

module.exports = router;
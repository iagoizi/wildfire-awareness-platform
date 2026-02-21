const express = require('express');
const routes = express.Router();

const AuthController = require('../controllers/AuthController');
const FireController = require('../controllers/FireController');
const authMiddleware = require('../middlewares/auth');

// --- Rotas Abertas (Qualquer um acessa agora) ---
routes.post('/register', AuthController.register);
routes.post('/login', AuthController.login);

// Rotas de incêndio movidas para cá para teste simplificado
routes.get('/fires', FireController.index);
routes.post('/fires', FireController.store);

// --- Middleware de Proteção ---
// Somente a rota '/me' continuará protegida
routes.use(authMiddleware);

routes.get('/me', (req, res) => {
  return res.json({ ok: true, userId: req.userId });
});

module.exports = routes;
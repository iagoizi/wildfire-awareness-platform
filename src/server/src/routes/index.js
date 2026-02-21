const express = require('express');
const routes = express.Router();

const AuthController = require('../controllers/AuthController');
const FireController = require('../controllers/FireController');
const ArticleController = require('../controllers/ArticleController');
const authMiddleware = require('../middlewares/auth');

// --- Rotas Abertas (Qualquer um acessa agora) ---
routes.post('/register', AuthController.register);
routes.post('/login', AuthController.login);

// --- Rotas de incêndio ---
routes.get('/fires', FireController.index);
routes.post('/fires', FireController.store);
routes.put('/fires/:id', FireController.update);
routes.delete('/fires/:id', FireController.destroy);

// --- Nuúmeros de Impacto ---
routes.get('/stats', FireController.stats);

// --- Rotas de Artigos ----
routes.get('/articles', ArticleController.index);
routes.post('/articles', ArticleController.store);
routes.put('/articles/:id', ArticleController.update);
routes.delete('/articles/:id', ArticleController.destroy);

// --- Middleware de Proteção ---
routes.use(authMiddleware);

routes.get('/me', (req, res) => {
  return res.json({ ok: true, userId: req.userId });
});

module.exports = routes;
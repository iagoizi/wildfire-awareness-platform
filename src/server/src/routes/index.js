const express = require('express');
const routes = express.Router();

const AuthController = require('../controllers/AuthController');
const FireController = require('../controllers/FireController');

const authMiddleware = require('../middlewares/auth');

// --- Rotas Abertas ---
routes.post('/register', AuthController.register);
routes.post('/login', AuthController.login);

routes.get('/fires', FireController.index);

// --- Rotas Fechadas ---
routes.use(authMiddleware);

routes.post('/fires', FireController.store);

routes.get('/me', (req, res) => {
  return res.json({ ok: true, userId: req.userId });
});

module.exports = routes;
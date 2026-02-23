// src/server/src/controllers/AuthController.js
const { PrismaClient } = require('@prisma/client');
const { sendMail } = require('../services/mailService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

module.exports = {
  // 1. Criar Usuário (Registrar)
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      const userExists = await prisma.user.findUnique({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: "Email já cadastrado" });
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashPassword,
        },
      });
      await sendMail(
        email,
        "Bem-vindo 🔥",
        `<h1>Conta criada com sucesso!</h1>`
      );

      user.password = undefined;

      return res.json(user);
    } catch (error) {
      return res.status(400).json({ error: "Erro ao registrar usuário" });
    }
  },

  // 2. Fazer Login (Gerar Token)
  async login(req, res) {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d", 
    });

    user.password = undefined;
    
    return res.json({ user, token });
  },

  // 3. Login do Admin (via ENV)
  async adminLogin(req, res) {
    try {
      const { username, password } = req.body;

      const adminUsername = process.env.ADMIN_USERNAME;
      const adminPassword = process.env.ADMIN_PASSWORD;

      if (!adminUsername || !adminPassword) {
        return res.status(500).json({ error: "Credenciais de admin não configuradas no servidor" });
      }

      if (username !== adminUsername || password !== adminPassword) {
        return res.status(401).json({ error: "Credenciais inválidas" });
      }

      // Gerar token JWT
      const token = jwt.sign(
        { username: adminUsername, role: 'admin' },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      return res.json({
        message: "Login realizado com sucesso",
        token,
        user: { username: adminUsername, role: 'admin' }
      });
    } catch (error) {
      console.error("Erro no login admin:", error);
      return res.status(500).json({ error: "Erro ao processar login" });
    }
  }
};
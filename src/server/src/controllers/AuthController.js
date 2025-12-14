// src/server/src/controllers/AuthController.js
const { PrismaClient } = require('@prisma/client');
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
  }
};
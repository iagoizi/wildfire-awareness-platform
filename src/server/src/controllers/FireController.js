const { sendMail } = require('../services/mailService');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  async index(req, res) {
    const fires = await prisma.fireSpot.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return res.json(fires);
  },

  async store(req, res) {
    const { estado, cidade, endereco, pontoReferencia, informacoesAdicionais } = req.body;

    if (!estado || !cidade || !endereco) {
      return res.status(400).json({ error: "Preencha os campos obrigatórios." });
    }

    const fire = await prisma.fireSpot.create({
      data: {
        estado,
        cidade,
        endereco,
        referencia: pontoReferencia,
        info: informacoesAdicionais,
      }
    });
    await sendMail(
      "wildfireawarenessuf@email.com", 
      "Nova denúncia registrada 🔥",
      `
      <h2>Nova denúncia</h2>
      <p><strong>Estado:</strong> ${estado}</p>
      <p><strong>Cidade:</strong> ${cidade}</p>
      <p><strong>Endereço:</strong> ${endereco}</p>
      `
    );

    return res.json(fire);
  }
};
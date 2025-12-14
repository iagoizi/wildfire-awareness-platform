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

    return res.json(fire);
  }
};
const { sendMail } = require('../services/mailService');
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

module.exports = {
  async index(req, res) {
    // Retorna lista vazia por enquanto para não dar erro sem banco
    return res.json([]);
  },

  async store(req, res) {
    const { estado, cidade, endereco, pontoReferencia, informacoesAdicionais } = req.body;

    if (!estado || !cidade || !endereco) {
      return res.status(400).json({ error: "Preencha os campos obrigatórios." });
    }

    try {
      /* // Comentado para ignorar erro de banco de dados no teste
      const fire = await prisma.fireSpot.create({
        data: {
          estado,
          cidade,
          endereco,
          referencia: pontoReferencia,
          info: informacoesAdicionais,
        }
      });
      */

      // Envia o e-mail via Mailtrap
      await sendMail(
        "wildfireawarenessuf@email.com", 
        "Nova denúncia registrada 🔥",
        `
        <h2>Nova denúncia de queimada</h2>
        <p><strong>Estado:</strong> ${estado}</p>
        <p><strong>Cidade:</strong> ${cidade}</p>
        <p><strong>Endereço:</strong> ${endereco}</p>
        <p><strong>Info Adicional:</strong> ${informacoesAdicionais || 'Nenhuma'}</p>
        `
      );

      return res.json({ message: "Denúncia processada e e-mail enviado!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
};
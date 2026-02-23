const { PrismaClient } = require('@prisma/client');
const { sendMail } = require('./mailService');
const prisma = new PrismaClient();

class FireService {
  async getAllFires() {
    return await prisma.fireSpot.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async createFire(data) {
    const { estado, cidade, endereco, pontoReferencia, email, informacoesAdicionais, photos, status } = data;

    // Validação da regra de negócio
    if (!estado || !cidade || !endereco) {
      throw new Error("Preencha os campos obrigatórios: estado, cidade e endereço.");
    }

    // Guarda na base de dados
    const fire = await prisma.fireSpot.create({
      data: {
        estado,
        cidade,
        endereco,
        referencia: pontoReferencia,
        email,
        info: informacoesAdicionais,
        photos: photos && photos.length > 0 ? JSON.stringify(photos) : null,
        status: status || 'Recebida',
      }
    });

    // Envia o e-mail com CC do usuário
    const cc = email ? [email] : [];
    
    // Gera o HTML das fotos
    let photosHTML = '';
    if (photos && photos.length > 0) {
      photosHTML = `
      <h3>Fotos de Evidência (${photos.length})</h3>
      <div style="display: flex; flex-wrap: wrap; gap: 10px; margin: 15px 0;">
        ${photos.map((photo, index) => `
          <div style="border: 1px solid #ccc; border-radius: 8px; overflow: hidden;">
            <img src="${photo}" alt="Evidência ${index + 1}" style="width: 200px; height: 200px; object-fit: cover; display: block;" />
          </div>
        `).join('')}
      </div>
      `;
    } else {
      photosHTML = '<p style="color: #999;"><em>Nenhuma foto anexada</em></p>';
    }
    
    await sendMail(
      "wildfireawarenessuf@email.com",
      `Nova denúncia registada #${fire.id} 🔥`,
      `
      <h2>Nova denúncia de queimada registada no sistema</h2>
      <p><strong>ID da Denúncia:</strong> ${fire.id}</p>
      <p><strong>Estado:</strong> ${estado}</p>
      <p><strong>Cidade:</strong> ${cidade}</p>
      <p><strong>Endereço:</strong> ${endereco}</p>
      <p><strong>Ponto de Referência:</strong> ${pontoReferencia || 'Não informado'}</p>
      <p><strong>E-mail de Contato:</strong> ${email || 'Não informado'}</p>
      <p><strong>Informações Adicionais:</strong> ${informacoesAdicionais || 'Nenhuma'}</p>
      <hr style="border: none; border-top: 2px solid #ddd; margin: 20px 0;">
      ${photosHTML}
      <hr style="border: none; border-top: 2px solid #ddd; margin: 20px 0;">
      <p><strong>Data/Hora:</strong> ${fire.createdAt.toLocaleString('pt-PT')}</p>
      `,
      cc
    );

    return fire;
  }

  async updateFire(id, data) {
    const { estado, cidade, endereco, pontoReferencia, informacoesAdicionais, status } = data;
    return await prisma.fireSpot.update({
      where: { id: Number(id) },
      data: {
        estado,
        cidade,
        endereco,
        referencia: pontoReferencia,
        info: informacoesAdicionais,
        status,
      }
    });
  }

  async deleteFire(id) {
    return await prisma.fireSpot.delete({
      where: { id: Number(id) }
    });
  }

  async getStats() {
    const totalDenunciasReal = await prisma.fireSpot.count();
    const recebidas = await prisma.fireSpot.count({ where: { status: 'Recebida' } });
    const emAnalise = await prisma.fireSpot.count({ where: { status: 'Em Análise' } });
    const encaminhadas = await prisma.fireSpot.count({ where: { status: 'Encaminhada' } });
    const resolvidas = await prisma.fireSpot.count({ where: { status: 'Resolvida' } });

    return {
      nacional: {
        focosINPE: "47.531",
        multasIbama: "242"
      },
      plataforma: {
        registradas: totalDenunciasReal,
        recebidas,
        emAnalise,
        encaminhadas,
        resolvidas
      }
    };
  }
}

module.exports = new FireService();
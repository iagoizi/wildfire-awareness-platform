const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class ArticleService {
  // Lista Artigos
  async getAllArticles() {
    return await prisma.article.findMany({
      orderBy: { publishedAt: "desc" },
    });
  }

  // Cria Artigo
  async createArticle(data) {
    const { title, slug, summary, content, imageUrl } = data;

    if (!title || !slug || !content) {
      throw new Error("Título, slug e conteúdo são obrigatórios.");
    }

    return await prisma.article.create({
      data: { title, slug, summary, content, imageUrl },
    });
  }

  // Atualiza Artigo
  async updateArticle(id, data) {
    const { title, slug, summary, content, imageUrl } = data;

    return await prisma.article.update({
      where: { id: Number(id) },
      data: {
        title,
        slug,
        summary,
        content,
        imageUrl,
      },
    });
  }

  // Deleta Artigo
  async deleteArticle(id) {
    return await prisma.article.delete({
      where: { id: Number(id) },
    });
  }
}

module.exports = new ArticleService();

const ArticleService = require("../services/ArticleService");

module.exports = {
  // GET: Lista os artigos
  async index(req, res) {
    try {
      const articles = await ArticleService.getAllArticles();
      return res.json(articles);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar artigos." });
    }
  },

  // POST: Cria um artigo
  async store(req, res) {
    try {
      const article = await ArticleService.createArticle(req.body);
      return res
        .status(201)
        .json({ message: "Artigo publicado com sucesso!", article });
    } catch (error) {
      console.error(error);
      if (error.message.includes("obrigatórios")) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Erro interno ao salvar artigo." });
    }
  },

  // PUT: Atualiza um artigo existente
  async update(req, res) {
    try {
      const { id } = req.params;
      const article = await ArticleService.updateArticle(id, req.body);

      return res.json({ message: "Artigo atualizado com sucesso!", article });
    } catch (error) {
      console.error(error);
      return res
        .status(400)
        .json({
          error: "Erro ao atualizar. Artigo não encontrado ou slug já em uso.",
        });
    }
  },

  // DELETE: Exclui um artigo
  async destroy(req, res) {
    try {
      const { id } = req.params;
      await ArticleService.deleteArticle(id);
      
      return res.json({ message: "Artigo deletado com sucesso!" });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: "Erro ao deletar. Artigo não encontrado." });
    }
  }
};

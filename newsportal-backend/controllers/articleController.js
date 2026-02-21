
const prisma = require('../config/db');

exports.getArticles = async (req, res) => {
  try {
    const articles = await prisma.article.findMany({
      where: { isPublished: true },
      include: { author: { select: { name: true } }, category: { select: { name: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getArticleById = async (req, res) => {
  try {
    const article = await prisma.article.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { author: { select: { name: true } }, category: { select: { name: true } } }
    });
    if (!article) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createArticle = async (req, res) => {
  try {
    const { title, content, categoryId, isPublished, imageUrl } = req.body;
    const article = await prisma.article.create({
      data: {
        title, content, imageUrl,
        isPublished: isPublished || true,
        authorId: req.user.userId,
        categoryId: parseInt(categoryId)
      }
    });
    res.status(201).json({ message: 'Article created', article });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateArticle = async (req, res) => { /* Update logic */ };
exports.deleteArticle = async (req, res) => { /* Delete logic */ };
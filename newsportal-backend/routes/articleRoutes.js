
const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const authMiddleware = require('../middlewares/authMiddleware');
const { validateArticle, handleValidationErrors } = require('../middlewares/articleValidator');

// Public
router.get('/', articleController.getArticles);
router.get('/:id', articleController.getArticleById);

// Protected
router.post('/', authMiddleware, validateArticle, handleValidationErrors, articleController.createArticle);
router.put('/:id', authMiddleware, validateArticle, handleValidationErrors, articleController.updateArticle);
router.delete('/:id', authMiddleware, articleController.deleteArticle);

module.exports = router;
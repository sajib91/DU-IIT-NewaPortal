
const { check, validationResult } = require('express-validator');

exports.validateArticle = [
  check('title').notEmpty().withMessage('Title is required'),
  check('content').notEmpty().withMessage('Content is required'),
  check('categoryId').isInt().withMessage('Category ID must be a number'),
  check('imageUrl').optional({ checkFalsy: true }).isURL().withMessage('Must be a valid URL')
];

exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
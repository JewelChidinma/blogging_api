const { findAllArticles, findSingleArticle } = require('./controller');

const router = require('express').Router();

router.get('/', findAllArticles);
router.get('/:id/article', findSingleArticle);

module.exports = router;
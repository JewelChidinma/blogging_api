const { createArticle, findSingleArticle, patchSingleArticle, deleteSingleArticle, findMyArticles } = require('../article/controller');
const { updateArticleValidation, createArticleValidation } = require('../article/validation');
const { login, authenticate } = require('../auth/index');
const { validate } = require('../error');
const { findAllUsers, findUser, findMe, deleteMe, patchMe, createUser } = require('./controller');
const {signupValidation, updateUserValidation, loginValidation } = require('./validation');

const router = require('express').Router();

router.post('/signup', validate(signupValidation), createUser);

router.get('/', findAllUsers);

router.get('/user/:id', findUser);

router.post('/login', validate(loginValidation), login);

router.use(authenticate);

router.route('/me')
      .get(findMe)
      .patch(validate(updateUserValidation), patchMe)
      .delete(deleteMe)


router.post('/articles', validate(createArticleValidation), createArticle);

router.get('/articles', findMyArticles);

router.route('/article/:id')
      .get(findSingleArticle)
      .patch(validate(updateArticleValidation), patchSingleArticle)
      .delete(deleteSingleArticle)

module.exports = router;
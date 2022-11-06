const moment = require('moment');
const { BadRequest } = require('../error');

const Article = require("./model");

exports.createArticle = async (req, res) => {
    const author = req.user._id;

    const reading_time = Math.round((req.body.body.split(' ')).length / 200);

    const article = await Article.create({ 
        ...req.body,
        author,
        reading_time
    })
    
    return res.json({ status: true, article })
};

exports.findAllArticles = async (req, res) => {
    const { sort, page, limit, tags, ...rest } = req.query;
    
    rest.state = 'published';

    if (tags) rest.tags = { "$in": tags.split(',') };

    const articlesQuery = Article.find(rest);

    if (sort) {
        const values = sort.split(',').join(' ');
        articlesQuery.sort(values);
    }

    if (page && limit) {
        const current = +page;
        const limitBy = +limit || 20;

        const skip = (current - 1) * limitBy;

        articlesQuery.skip(skip).limit(limitBy);
    }

    const articles = await articlesQuery;

    return res.json({ status: true, articles })
}

exports.findMyArticles = async (req, res) => {
    const { sort, page, limit, ...rest } = req.query;
    
    req.body.author = req.user._id;
    
    const articlesQuery = Article.find(rest);

    if (sort) {
        const values = sort.split(',').join(' ');
        articlesQuery.sort(values);
    }

    if (page && limit) {
        const current = +page;
        const limitBy = +limit || 20;

        const skip = (current - 1) * limitBy;

        articlesQuery.skip(skip).limit(limitBy);
    }

    const articles = await articlesQuery;

    return res.json({ status: true, articles })
}

exports.findSingleArticle = async (req, res) => {
    const { id } = req.params;

    const article = await Article.findByIdAndUpdate(id, { $inc: { read_count: 1 } }, { new: true, runValidators: true }).populate('author');

    if (!article) {
        return res.status(404).json({ status: false, article: null })
    }

    return res.json({ status: true, article })
}

exports.patchSingleArticle = async (req, res) => {
    const { id } = req.params;

    if (req.body.body) {
        req.body.reading_time = Math.round((req.body.body.split(' ')).length / 200);
    }

    const article = await Article.findByIdAndUpdate(id, { ...req.body }, { runValidators: true, new: true })

    if (!article) {
        return res.status(404).json({ status: false, article: null })
    }

    return res.json({ status: true, article })
}

exports.deleteSingleArticle = async (req, res) => {
    const { id } = req.params;

    const article = await Article.findByIdAndDelete(id);

    return res.json({ status: true, article })
}
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({

  title: {
    type: String,
    unique: [true, 'title exists!'],
    required: [true, 'title is required!'] 
  },

  description: {
    type: String,
  },

  author: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: [true, 'author is required!']
  },

  read_count: {
    type: Number,
    default: 0
  },

  reading_time: {
    type: Number
  },

  tags: [String],

  body: {
    type: String,
    required: [true, 'article body is required!']
  },

  state: { 
    type: String,
    default: 'draft',
    enum: {
      values: ['draft', 'published'],
      message: 'state must be either `draft` or `published` not {VALUE}'
    } 
  },
}, {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true
    }
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;

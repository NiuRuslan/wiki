// Подключаем mongoose.
const mongoose = require('mongoose');

const articlesSchema = new mongoose.Schema({
  title: String,
  content: String,
  username: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model('Article', articlesSchema);

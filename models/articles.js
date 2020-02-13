// Подключаем mongoose.
const mongoose = require('mongoose');

const articlesSchema = new mongoose.Schema({
  user1: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  title: String,
  content: String,
  username: String,
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

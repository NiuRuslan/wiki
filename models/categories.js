// Подключаем mongoose.
const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
  title: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  article: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
});


module.exports = mongoose.model('Category', categoriesSchema);

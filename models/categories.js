// Подключаем mongoose.
const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
  article: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
});


module.exports = mongoose.model('Category', categoriesSchema);

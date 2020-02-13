// Подключаем mongoose.
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/finam', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const categoriesSchema = new mongoose.Schema({
  article: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
});


module.exports = mongoose.model('Category', categoriesSchema);

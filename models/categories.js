// Подключаем mongoose.
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/finam', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const categoriesSchema = new mongoose.Schema({
  title: String,
  // entries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Entries' }],
});


module.exports = mongoose.model('Category', categoriesSchema);

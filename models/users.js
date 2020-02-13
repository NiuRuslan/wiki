// Подключаем mongoose.
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/finam', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const usersSchema = new mongoose.Schema({
  article: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
  category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  username: String,
  login: String,
  password: String,
  root: Boolean,
  superUser: Boolean,
});


module.exports = mongoose.model('User', usersSchema);

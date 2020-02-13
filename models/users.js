// Подключаем mongoose.
const mongoose = require('mongoose');

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

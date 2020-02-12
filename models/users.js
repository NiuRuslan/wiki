// Подключаем mongoose.
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/finam', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const usersSchema = new mongoose.Schema({
  username: String,
  login: String,
  password: String,
  // entries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Entries' }],
  root: Boolean,
  superUser: Boolean,
});


module.exports = mongoose.model('User', usersSchema);

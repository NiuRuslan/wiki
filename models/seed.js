const mongoose = require('mongoose');
const User = require('./users');
const Article = require('./entries');
const Category = require('./categories');

mongoose.connect('mongodb://localhost:27017/finam', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Добавление админа

const admin = new User({
  username: 'Admin',
  login: 'adminLog',
  password: '123',
  superUser: true,
  root: false,
});
admin.save();

// Добавление юзера
const user = new User({
  username: 'user',
  login: 'userLog',
  password: '123',
  superUser: false,
  root: false,
});
user.save();

// добавление статьи
const article = new Article({
  // categories: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  title: 'Chto-to',
  content: 'qweqwelkflkdjfsjf',
  // username: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
article.save();

// добавление категории
const category = new Category({
  title: 'qweqweqwe',
  entries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
});
category.save();

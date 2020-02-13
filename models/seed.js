/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./users');
const Article = require('./articles');
const Category = require('./categories');

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-on3in.mongodb.net/test?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// добавление статьи
const article1 = new Article({
  title: 'Chto-to',
  content: 'qweqwelkflkdjfsjf',
});

// добавление категории
const category1 = new Category({
  title: 'qweqweqwe',
  article: [article1._id],
});

// Добавление юзера
const user1 = new User({
  username: 'user',
  login: 'userLog',
  password: '123',
  superUser: false,
  root: false,
  article: [article1._id],
});

// Добавление админа
const admin1 = new User({
  username: 'Admin',
  login: 'adminLog',
  password: '123',
  superUser: true,
  root: false,
  category: [category1._id],
  article: [article1._id],
});

admin1.save();
user1.save();
category1.save();
article1.save();

/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./users');
const Article = require('./articles');
const Category = require('./categories');

// mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-on3in.mongodb.net/test?retryWrites=true&w=majority`, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// добавление категории
async function addCategory(inputCat) {
  const addedCategory = await Category.create({ title: inputCat });
  await mongoose.disconnect();
  return addedCategory;
}
addCategory('Мобильая разработка');
// добавление статьи
async function addArticle(inputArtTitle, inputArtContent) {
  const addedArticle = await Article.create({
    title: inputArtTitle,
    content: inputArtContent,
  });
  await mongoose.disconnect();
  return addedArticle;
}
addArticle('Express', 'Node.js представляет среду выполнения кода на JavaScript, которая построена на основе движка JavaScript Chrome V8, который позволяет транслировать вызовы на языке JavaScript в машинный код. Node.js прежде всего предназначен для создания серверных приложений на языке JavaScript. Хотя также существуют проекты по написанию десктопных приложений (Electron) и даже по созданию кода для микроконтроллеров. Но прежде всего мы говорим о Node.js, как о платформе для создания веб-приложений.');
// Добавление юзера
async function addUser(inputUsername, inputLogin, inputPassword, checkSuperUser) {
  const addedUser = await User.create({
    username: inputUsername,
    login: inputLogin,
    password: inputPassword,
    superUser: checkSuperUser, // Boolean
  });
  await mongoose.disconnect();
  return addedUser;
}
addUser('Михайлов Михаил Михайлович', 'alex', 'alex', false);

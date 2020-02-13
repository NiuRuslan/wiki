const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const mongoose = require('mongoose');
const indexRouter = require('./routes/login');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/post');

const app = express();
const fileStoreOptions = {};

// Подключаем mongoose.

mongoose.connect('mongodb://localhost:27017/wiki', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); // uri maybe change


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// session and check auth
app.use(
  session({
    store: new FileStore(fileStoreOptions),
    key: 'token',
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 900000,
    },
  }),
);

app.use((req, res, next) => {
  // eslint-disable-next-line no-console
  app.locals.isAuth = !!req.session.user;
  if (req.session.user) {
    app.locals.name = req.session.user.email;
  }
  next();
});

// Allows you to use PUT, DELETE with forms.
// eslint-disable-next-line consistent-return,no-unused-vars
app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    // eslint-disable-next-line no-underscore-dangle
    const method = req.body._method;
    // eslint-disable-next-line no-underscore-dangle
    delete req.body._method;
    return method;
  }
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('post', postsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

const createError = require('http-errors');
const express = require('express');
require('dotenv').config();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const hbs = require('hbs');
require('dotenv').config();

const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const postsRouter = require('./routes/post');
const loginRouter = require('./routes/login');

const app = express();
const fileStoreOptions = {};

// Подключаем mongoose.
async function mongoStart() {
  try {
    // console.log(process.env.DB_USER, process.env.DB_PASSWORD);
    mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-on3in.mongodb.net/test?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }); // uri maybe change
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
}

mongoStart();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('partials', path.join(__dirname, 'views/partials'));
app.set('view engine', 'hbs');
hbs.registerPartials(`${__dirname}/views/partials`);

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
  app.locals.isAuth = !!req.session.user;
  if (req.session.user) {
    app.locals.name = req.session.user.login;
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
app.use('/login', loginRouter);
app.use('/add', postsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;

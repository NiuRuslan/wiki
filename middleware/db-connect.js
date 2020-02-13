const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ourDbname', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;

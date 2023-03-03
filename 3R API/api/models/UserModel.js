const mongoose = require('mongoose');

/* Creating a model for the database. */
const UserModel = mongoose.model('Users', {
  name: String,
  image: String,
  username: String,
  email: String,
  password: String,
  role: Number,
  image: String,
});

module.exports = UserModel;

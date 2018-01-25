const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  points: { type: Number, default: 0 },
  avatar: { type: String, default: '' }
})

const User = mongoose.model('User', userSchema);

module.exports = User;

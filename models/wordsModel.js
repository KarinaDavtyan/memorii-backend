const mongoose = require('mongoose');

const wordsSchema = mongoose.Schema({
  firstWord: String,
  secondWord: String,
  username: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const Words = mongoose.model('Words', wordsSchema);

module.exports = Words;

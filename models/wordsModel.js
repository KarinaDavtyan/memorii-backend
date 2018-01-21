const mongoose = require('mongoose');

const wordsSchema = mongoose.Schema({
  first: String,
  second: String,
  username: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const Words = mongoose.model('Words', wordsSchema);

module.exports = Words;

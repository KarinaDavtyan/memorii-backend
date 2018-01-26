const mongoose = require('mongoose');

const wordsSchema = mongoose.Schema({
  firstWord: String,
  secondWord: String,
  selection: { type: mongoose.Schema.Types.ObjectId, ref: 'Selection' },
  date: { type: Date, default: Date.now() }
})

const Words = mongoose.model('Words', wordsSchema);

module.exports = Words;

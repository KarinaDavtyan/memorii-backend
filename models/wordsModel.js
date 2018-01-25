const mongoose = require('mongoose');

const wordsSchema = mongoose.Schema({
  firstWord: String,
  secondWord: String,
  memoriiLevel: { type: Number, default: 0 },
  selection: { type: mongoose.Schema.Types.ObjectId, ref: 'Selection' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now() }
})

const Words = mongoose.model('Words', wordsSchema);

module.exports = Words;

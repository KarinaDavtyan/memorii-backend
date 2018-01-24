const mongoose = require('mongoose');

const wordsSchema = mongoose.Schema({
  firstWord: String,
  secondWord: String,
  learningLevel: { type: Number, default: 0 },
  selection: { type: mongoose.Schema.Types.ObjectId, ref: 'Selection' },
  username: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: Date.now()
})

const Words = mongoose.model('Words', wordsSchema);

module.exports = Words;

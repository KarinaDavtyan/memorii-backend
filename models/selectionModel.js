const mongoose = require('mongoose');

const selectionSchema = mongoose.Schema({
  title: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now() }
})

const Selection = mongoose.model('Selection', selectionSchema);

module.exports = Selection;

const mongoose = require('mongoose');

const selectionSchema = mongoose.Schema({
  title: String,
  selection: { type: mongoose.Schema.Types.ObjectId, ref: 'Selection' },
  username: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: Date.now()
})

const Selection = mongoose.model('Selection', selectionSchema);

module.exports = Selection;

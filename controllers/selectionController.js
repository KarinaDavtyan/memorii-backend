const moment = require('moment');
const Words = require('../models/wordsModel');
const User = require('../models/usersModel');
const Selection = require('../models/selectionModel');

const postSelection = async (req, res) => {
  let { title } = req.params;
  let userId = req.user._id;
  let selection = await Selection.findOne({
    title
  })
  let user = await User.findOne({
    _id: userId
  })
  if (selection) {
    res.status(400).send({error: `${selection.title} with this name has been taken already`});
  } else {
    let selectionNew = new Selection({
      title,
      owner: userId,
      date: moment()
    })
    let selectionSave = await selectionNew.save();
    console.log(`${title} saved to db`);
    res.status(201).send(JSON.stringify(selectionSave.title));
  }
}

const getAllSelections = async (req, res) => {
  let userId = req.user._id;
  let selections = await Selection.find({owner: userId}, ['title', 'date']);
  if (selections.length > 0) {
    res.status(200).send(JSON.stringify(selections));
  } else {
    res.sendStatus(404);
  }

}

const getAllSelectionsBot = async (req, res) => {
  let username = req.body.username;
  let userId = await User.findOne({
    username
  }, '_id');
  let selections = await Selection.find({owner: userId}, 'title');
  let selectionTitles = selections.map(selection => selection.title);
  if (selectionTitles && selectionTitles.length > 0) {
    res.status(200).send(JSON.stringify(selectionTitles));
  } else {
    console.log('error here');
    res.sendStatus(404);
  }
}

const deleteSelection = async (req, res) => {
  let { title } = req.params;
  let selectionToDelete = await Selection.findOneAndRemove({ title });
  res.status(200).send(JSON.stringify(selectionToDelete.title))
}

const getSelection = async (req, res) => {
  let { title } = req.params;
  let selectionId = await Selection.findOne({ title }, '_id');
  let words = await Words.find({ selection: selectionId._id});
  if (words) {
    res.status(200).send(JSON.stringify(words))
  } else {
    res.sendStatus(404);
  }
}

module.exports = {
  postSelection,
  getAllSelections,
  getAllSelectionsBot,
  deleteSelection,
  getSelection
}

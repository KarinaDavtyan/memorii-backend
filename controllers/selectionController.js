const Words = require('../models/wordsModel');
const User = require('../models/usersModel');
const Selection = require('../models/selectionModel');

const postSelection = async (req, res) => {
  let { title } = req.body;
  let userId = req.user._id;
  let selection = await Selection.findOne({
    title
  })
  let user = await User.findOne({
    _id: userId
  })
  if (selection) {
    res.status(400).send({error: `${selection} with this name has been taken already`});
  } else {
    let selectionNew = new Selection({
      title,
      owner: userId
    })
    let selectionSave = await selectionNew.save();
    console.log(`${title} saved to db`);
    res.status(201).send(title);
  }
  res.send(req.user)
}

const getAllSelections = async (req, res) => {
  let userId = req.user._id;
  let selections = await Selection.find({owner: userId}, ['title', 'date']);
  res.status(200).send(selections)
}

const deleteSelection = async (req, res) => {
  let { title } = req.body;
  let selectionToDelete = await Selection.findOneAndRemove({ title });
  res.status(200).send(`${selectionToDelete.title} succesfully deleted`)
}

const getSelection = async (req, res) => {
  let { title } = req.params;
  let selectionId = await Selection.findOne({ title }, '_id');
  let words = await Words.find({ selection: selectionId._id});
  res.status(200).send(words)
}

module.exports = {
  postSelection,
  getAllSelections,
  deleteSelection,
  getSelection
}

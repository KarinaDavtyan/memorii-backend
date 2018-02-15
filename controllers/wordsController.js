const moment = require('moment');
const Words = require('../models/wordsModel');
const User = require('../models/usersModel');
const Selection = require('../models/selectionModel');

const postWords = async (req, res) => {
  let { firstWord, secondWord, selection } = req.body;
  let selectionId = await Selection.findOne({
    title: selection
  }, '_id')
  let words = new Words({
    firstWord,
    secondWord,
    date: moment(),
    selection:  selectionId._id
  })
  console.log(`saving ${firstWord}&${secondWord} to db`);
  let newWords = await words.save();
  res.status(201).send(JSON.stringify(newWords));
}

const deleteWords = async (req, res) => {
  let { firstWord, secondWord } = req.body;
  let wordsToDelete = await Words.findOneAndRemove({firstWord, secondWord});
  res.status(200).send(JSON.stringify(wordsToDelete));
}

const getAllWordsBot = async (req, res) => {
  let { title } = req.body;
  let selection = await Selection.findOne({title});
  let user = await User.findOne({_id: selection.owner})
  let allWords = await Words.find({selection: selection._id});
  if (allWords.length === 0) res.sendStatus(404);
  let first = [], second = [];
  if (allWords.length <= 20 && allWords.length !== 0) {
    let twoWords = allWords.forEach((word) => {
      first.push(word.firstWord);
      second.push(word.secondWord);
    });
    res.send([first, second, user.telegramId]);
  } else if (allWords.length > 20) {
    console.log(allWords, '>');
    let words = await Words.aggregate([
      {
        $match: {
          selection: selection._id
        }
      },
      {
        $sample: 20
      }
    ])
    let twoWords = allWords.forEach((word) => {
      first.push(word.firstWord);
      second.push(word.secondWord);
    });
    res.send([first, second, user.telegramId]);
  }
}

module.exports = {
  postWords,
  deleteWords,
  getAllWordsBot
}

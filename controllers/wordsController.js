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
    selection:  selectionId._id
  })
  console.log(`saving ${firstWord}&${secondWord} to db`);
  let newWords = await words.save();
  res.status(201).send(newWords);
}

const deleteWords = async (req, res) => {
  let { firstWord, secondWord } = req.params;
  let wordsToDelete = await Words.findOneAndRemove({firstWord, secondWord});
  res.status(200).send(`${wordsToDelete.firstWord} & ${wordsToDelete.secondWord} succesfully deleted`)
}

const getAllWordsBot = async (req, res) => {
  let { title } = req.params;
  let selectionId = await Selection.findOne({title}, '_id');
  let allWords = await Words.find({selection: selectionId._id});
  if (allWords.length >= 20) {
    let words = await Words.aggregate([
      {
        $match: {
          selection: selectionId._id
        }
      },
      {
        $sample: 20
      }
    ])
    let twoWords = words.map((word) => {
      return {
        [word.firstWord]: word.secondWord
      }
    });
    console.log('here');
    res.send(twoWords);
  } else {
    res.send(allWords)
  }
}

module.exports = {
  postWords,
  deleteWords,
  getAllWordsBot
}

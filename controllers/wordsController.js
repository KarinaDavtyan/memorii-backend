const Words = require('../models/wordsModel');
const User = require('../models/usersModel');

const getAllWords = async (req, res) => {
  let words = await Words.find();
  res.status(201).send(words);
}

const postWords = async (req, res) => {
  let { firstWord, secondWord, username } = req.body;
  let user = await User.findOne({
    username
  })
  let words = new Words({
    firstWord,
    secondWord,
    username:  user._id
  })
  console.log(`saving ${firstWord}&${secondWord} to the system`);
  let newWords = await words.save();
  res.status(201).send(newWords);
}

const getThePair = async (req, res) => {
  res.send('get the pair')
}

const getWordsByUser = async (req, res) => {
  let { username } = req.body;
  let user = await User.findOne({username});
  let words = await Words.aggregate([
    {
      $match: {
        username: user._id
      }
    },
    {
      $sample: {
        size: 5
      }
    }
  ])
  let test = words.map((word) => {
    return {
      [word.firstWord]: word.secondWord
    }
  }
);
  res.send(test);
}

module.exports = {
  getAllWords,
  postWords,
  getThePair,
  getWordsByUser
}

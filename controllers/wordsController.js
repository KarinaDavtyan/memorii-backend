const Words = require('../models/wordsModel');

const getAllWords = async (req, res) => {
  res.send('getAll')
}

const postWords = async (req, res) => {
  res.send('post')
}

const getThePair = async (req, res) => {
  res.send('get the pair')
}

module.exports = {
  getAllWords,
  postWords,
  getThePair
}

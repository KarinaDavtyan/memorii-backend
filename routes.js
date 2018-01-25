const express = require('express');
const router = express.Router();

const usersController = require('./controllers/usersController');
const wordsController = require('./controllers/wordsController');


router.post('/user', usersController.postUser);
router.get('/sign-in', usersController.signIn);
router.delete('/user', usersController.deleteUser);

router.post('/pair', wordsController.postWords);
router.get('/words', wordsController.getThePair);
router.get('/everything', wordsController.getAllWords);
router.get('/words-user', wordsController.getWordsByUserBot);


module.exports = router;

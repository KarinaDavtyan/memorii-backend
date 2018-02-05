const express = require('express');
const router = express.Router();

const usersController = require('./controllers/usersController');
const wordsController = require('./controllers/wordsController');
const selectionController = require('./controllers/selectionController');


router.post('/new-user', usersController.postUser);
router.get('/sign-in', usersController.signIn);
router.delete('/user', usersController.deleteUser);

router.post('/selection/:title', selectionController.postSelection);
router.get('/all-selections', selectionController.getAllSelections);
router.delete('/selection/:title', selectionController.deleteSelection);
router.get('/selection/:title', selectionController.getSelection);

router.post('/words', wordsController.postWords);
router.delete('/words/:firstWord/:secondWord', wordsController.deleteWords);

router.get('/all-words-bot/:title', wordsController.getAllWordsBot);
router.get('/selections-bot', selectionController.getAllSelectionsBot);
router.get('/user-bot', usersController.getUserBot);
router.post('/id-bot', usersController.postId);


module.exports = router;

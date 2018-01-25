const express = require('express');
const router = express.Router();

const usersController = require('./controllers/usersController');
const wordsController = require('./controllers/wordsController');
const selectionController = require('./controllers/selectionController');


router.post('/user', usersController.postUser);
router.get('/sign-in', usersController.signIn);
router.delete('/user', usersController.deleteUser);

router.post('/selection', selectionController.postSelection);
router.get('/get-all-selections', selectionController.getAllSelections);
router.delete('/selection', selectionController.deleteSelection);





// router.post('/words', wordsController.postWords);
// router.get('/words', wordsController.getWords);
// router.delete('/words', wordsController.deleteWords);
// router.get('/all-words', wordsController.getAllWords);
// router.get('/all-words-bot', wordsController.getAllWordsBot);
// router.get('/selection/:title', selectionController.getSelection);


module.exports = router;

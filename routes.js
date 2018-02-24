const express = require('express');
const router = express.Router();

const usersController = require('./controllers/usersController');
const wordsController = require('./controllers/wordsController');
const selectionController = require('./controllers/selectionController');


router.post('/new-user', usersController.postUser);
router.get('/sign-in', usersController.signIn);
router.get('/check/:username', usersController.checkUsername);
router.delete('/user', usersController.deleteUser);

router.get('/all-selections', selectionController.getAllSelections);
router.post('/selection', selectionController.postSelection);
router.delete('/selection', selectionController.deleteSelection);
router.get('/selection/:title', selectionController.getSelection);

router.post('/words', wordsController.postWords);
router.delete('/words', wordsController.deleteWords);

//unprotected routes for bot use exclusivelly
router.get('/all-words-bot', wordsController.getAllWordsBot);
router.get('/selections-bot', selectionController.getAllSelectionsBot);
router.get('/user-bot', usersController.getUserBot);
router.post('/id-bot', usersController.postId);


module.exports = router;

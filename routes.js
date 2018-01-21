const express = require('express');
const router = express.Router();

const usersController = require('./controllers/usersController');
const wordsController = require('./controllers/wordsController');


router.post('/new_user', usersController.createUser);
router.get('/sign-in', usersController.signIn);

router.post('/pair', wordsController.postWords);
router.get('/words', wordsController.getThePair);
router.get('/everything', wordsController.getAllWords);

module.exports = router;

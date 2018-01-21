const express = require('express');
const router = express.Router();

const usersController = require('./controllers/usersController');

router.post('/new_user', usersController.createUser);
// router.get('/sign-in', usersController.signIn);

module.exports = router;

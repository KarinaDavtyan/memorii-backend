const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/usersModel');

const postUser = async (req, res) => {
  let { username,
    password,
    points,
    avatar } = req.body;
  let user = await User.findOne({
    username
  })
  if (user) {
    res.status(400).send({error: `${username} username has been taken already`});
  } else {
    const saltRounds = 10;
    let hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({
      username,
      password: hashedPassword,
      points,
      avatar
    })
    let newUser = await user.save();
    console.log(`${username} saved to db`);
    res.status(201).send(user);
  }
}

const signIn = async (req, res) => {
  let { authorization } = req.headers;
  const base64str = authorization.split(' ')[1];
  const decoded = Buffer.from(base64str, 'base64').toString('ascii');
  const [username, password] = decoded.split(':');
  let user = await User.findOne({username});
  try {
    if (user === null) {
      res.status(404).send(JSON.stringify(`${username} not found`));
    }
    const pendingToMatch = await bcrypt.compare(password, user.password)
    if (pendingToMatch) {
      let userToken = jwt.sign(
        { username: user.username },
        process.env.SECRET,
        { expiresIn: '12h' }
      );
      let  { avatar, points } = user
      res.status(200).send({token: userToken, user:{
        username,
        points,
        avatar
      }
      });
      return;
    } else {
      res.status(400).send(JSON.stringify({message: 'Wrong credentials'}));
      throw new Error();
    }
  } catch (e) {
    res.status(401).send(JSON.stringify({
      message: 'Wrongcredentials',
      error: e
    }));
    return;
  }
}

const deleteUser = async (req, res) => {
  let { username } = req.user;
  let userToDelete = await User.findOneAndRemove({ username });
  res.status(200).send(`${userToDelete} succesfully deleted`);
}

const getUserBot = async (req, res) => {
  let { username } = req.body;
  let user = await User.findOne({username});
  if (user) {
    console.log(user.username, 'found');
    res.status(200).send(JSON.stringify(user.username));
  } else {
    console.log('not found');
    res.sendStatus(404);
  }
}

const postId = async (req, res) => {
  const { telegramId, username } = req.body.data;
  let updatedUser = await User.findOneAndUpdate({ username }, {$set:{telegramId: telegramId}});
  await updatedUser.save();
  res.sendStatus(200);
}

module.exports = {
  postUser,
  signIn,
  deleteUser,
  getUserBot,
  postId
}

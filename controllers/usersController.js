const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/usersModel');

const createUser = async (req, res) => {
  let { username, password } = req.body;
  let user = await User.findOne({
    username
  })
  if (user) {
    res.status(400).send({error: 'Username already exists'});
  } else {
    const saltRounds = 10;
    let hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({
      username,
      password: hashedPassword
    })
    console.log(`saving ${username} to the system`);
    let newUser = await user.save();
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
        { expiresIn: '1h' }
      );
      res.status(201).send(JSON.stringify('sended user word pairs'));
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

module.exports = {
  createUser,
  signIn
}

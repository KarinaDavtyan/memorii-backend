const bcrypt = require('bcrypt');

const User = require('../models/usersModel');

const createUser = async (req, res) => {
  let { username, password } = req.body;
  console.log(username, password);
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

module.exports = {
  createUser
}

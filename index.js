require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const jwtExpress = require('express-jwt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const router = require('./routes.js');
const User = require('./models/usersModel');

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const [strategy, token] = authorization.split(' ');
    if (strategy !== 'Bearer') return await next();
    try {
      const tokenData = jwt.verify(token, process.env.SECRET);
      req.user = await User.findOne({username: tokenData.username})
    } catch (e) {
      console.log(e);
    }
    await next();
  } else {
    await next();
  }
}

require('./db');
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(jwtExpress({ secret: process.env.SECRET}).unless({path: ['/new-user', '/sign-in', '/selections-bot', '/user-bot', '/id-bot', '/all-words-bot']}));

app.use(auth);
app.use(router);


app.listen(3000, () => console.log('plastic-tortilla server listens on port 3000'));

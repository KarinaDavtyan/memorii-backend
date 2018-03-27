require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const jwtExpress = require('express-jwt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const router = require('./routes.js');
const User = require('./models/usersModel');

const port = process.env.PORT || 3000;


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

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', process.env.ORIGIN);
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static('mochawesome-report'));

app.use(jwtExpress({ secret: process.env.SECRET})
  .unless({
    path: [
      '/new-user', '/sign-in', /^\/check\/.*/,
      '/selections-bot', '/user-bot', '/id-bot', '/all-words-bot'
    ]
  })
);
app.use(auth);

app.use(router);

app.listen(port, () => console.log(`memorii server listens on port ${port}`));

module.exports = app;

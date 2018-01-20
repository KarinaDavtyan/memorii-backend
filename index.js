const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, () => console.log('plastic-tortilla server listens on port 3000'));

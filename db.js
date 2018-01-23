const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const db = mongoose.connection;

mongoose.connect('mongodb://localhost/plasticTortillaDB');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('we are connected to plasticTortilla-db'));

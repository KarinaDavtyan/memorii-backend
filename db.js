const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const db = mongoose.connection;

let localDB = 'mongodb://localhost/plasticTortillaDB'
process.env.MONGOLAB_URI
  ? mongoose.connect(process.env.MONGOLAB_URI)
  : mongoose.connect(localDB)

console.log(process.env.MONGOLAB_URI);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('we are connected to plasticTortilla-db'));

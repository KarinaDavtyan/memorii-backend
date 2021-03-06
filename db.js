const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = mongoose.connection;

let mongoDB = process.env.MONGOLAB_MEMORII || `mongodb://localhost/${process.env.MONGO_DB}`
mongoose.connect(mongoDB)

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log(`we are connected to ${mongoDB}`));

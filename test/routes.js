const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const app = require('../index.js');

describe('Routes', () => {

  before((done) => {
    const db = mongoose.connection;
    const mongoDB = 'mongodb://localhost/test-memorii';
    mongoose.connect(mongoDB);
    db.once('open', () => {
      // eslint-disable-next-line no-console
      console.log(`Initialised ${mongoDB}`);
      done();
    });
  })

  after((done) => {
    mongoose.connection.db.dropDatabase((err, res) => {
      if (err) throw err;
      // eslint-disable-next-line no-console
      console.log('🔥🔥🔥Dropped db🔥🔥🔥');
      done();
    });
  });

  describe('unauthorised', () => {

    it('/all-selections throws 401 if unauthorised', (done) => {
      chai.request(app)
        .get('/all-selections')
        .end((err, res) => {
          // eslint-disable-next-line no-console
          console.log(res.status, ' status');
          expect(res).to.have.status(401);
        });
      chai.request(app)
        .get('/all-selections')
        .send({username: 'test', password: 'invalid_password'})
        .end((err, res) => {
          // eslint-disable-next-line no-console
          console.log(res.status, ' status');
          expect(res).to.have.status(401);
        });
      done()
    });
  });

});

// it('Creates user succesfully', function (done) {
//   chai.request(app)
//   .post('new-user')
//   .send({username: 'test', password: 'test'})
//   .end((err, res) => {
//     console.log(err, ' 👈 user created');
//     expect(res).to.have.status(201);
//     done();
//   });
// });

// it('/selection/test throws 401 if unauthorised', function (done) {
//   chai.request(app)
//     .get('/selections/test')
//     .end(function (err, res) {
//       console.log(res.status, ' status');
//       expect(res).to.have.status(401);
//     });
//   done()
// });

// describe('authorised', function () {
//   it('doesn\'t throw 401 after authorisation', function (done) {
//     chai.request(app)
//       .get('/all-selections')
//       .end(function (err, res) {
//         console.log(res.status, ' status');
//         expect(res).to.not.have.status(401);
//       });
//     done()
//   });
// });

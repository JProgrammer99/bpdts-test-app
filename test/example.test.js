const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
const app = require('../index.js');
var expect = chai.expect;

chai.use(chaiHttp);
describe('Testing API for correct result.', () => {
  describe('Checking GET /users/london', () => {
    it('should return list of users in London', () => {
           const expectedResult = JSON.parse(fs.readFileSync(`${__dirname}/data/response.json`));

           chai.request(app).get('/users/london').end((err, res) => {
             expect(res).to.have.status(200);
             expect(JSON.parse(res.text)).to.eql(expectedResult);
           });
     });
  });
});

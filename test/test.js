var request = require('request'),
    expect = require('chai').expect,
    cheerio = require('cheerio');

var baseUrl = 'http://localhost:3000';

describe(baseUrl, function() {
  it('should have a HTTP of 200 - success', function(done) {
    request(baseUrl, function(err, res, body) {
      expect(res.statusCode).to.equal(200);
      // expect(res.statusCode).to.equal(300)
      done();
    });
  });
});

describe(baseUrl + '/profile', function() {
  it('should have a HTTP of 200 - success', function(done) {
    request(baseUrl, function(err, res, body) {
      expect(res.statusCode).to.equal(200);
      // expect(res.statusCode).to.equal(300)
      done();
    });
  });
});

describe(baseUrl + '/api/logs', function() {
  it('should have a HTTP of 200 - success', function(done) {
    request(baseUrl, function(err, res, body) {
      expect(res.statusCode).to.equal(200);
      // expect(res.statusCode).to.equal(300)
      done();
    });
  });
});

describe(baseUrl, function() {
  it('The h1 header should include "Dayly"', function(done) {
    request(baseUrl, function(err, res, body) {
      var $ = cheerio.load(body);
      var title = $('h1').text();
      expect(title).to.equal('All Daylys');
      // expect(title).to.equal('Moogle');
      done();
    });
  });
});

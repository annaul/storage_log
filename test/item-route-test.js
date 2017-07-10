'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Beast = require('../model/item.js');

const PORT = process.env.PORT || 3000;

process.env.MONGODB_URI = 'mongodb://localhost/itemtest';

require('../server.js');

const url = `http://localhost:${PORT}`;

const exampleItem = {
  itemName: 'example item',
  timeStamp: new Date(),
  description: 'example description',
  location: 'example location'
};

describe('Item Routes', function() {
  describe('POST: /api/item', function() {
    describe('with a valid ID and item body', () => {
      afterEach( done => {
        if (this.exampleItem) {
          Item.remove({})
          .then(() => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return an item', done => {
        request.post(`${url}/api/item`)
        .send(exampleItem)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.itemName).to.equal('example item');
          this.exampleItem = res.body;
          done();
        })
      })
    })
  })
})

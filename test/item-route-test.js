'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Item = require('../model/item.js');

const PORT = process.env.PORT || 3000;

process.env.MONGODB_URI = 'mongodb://localhost/itemtest';

require('../server.js');

const url = `http://localhost:${PORT}`;

const exampleItem = {
  itemName: 'test box',
  timeStamp: new Date(),
  description: 'black test box',
  location: 'test shelf'
};

console.log('========',exampleItem);

describe('Item Routes', function() {
  describe('POST: /api/item', function() {
    describe('valid item posting', () => {
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
          expect(res.body.itemName).to.equal('test box');
          this.exampleItem = res.body;
          done();
        })
      })
    })
  })
})

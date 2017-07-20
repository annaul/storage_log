const expect = require('chai').expect;
const request = require('superagent');
const Item = require('../model/item.js');

const PORT = process.env.PORT || 3000;

process.env.APP_CONFIG = 'mongodb:27017/storageApp';

require('../server.js');

const url = `http://localhost:${PORT}`;

const exampleItem = {
  itemName: 'test box',
  timeStamp: new Date(),
  description: 'black test box',
  location: 'test shelf'
};

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
          expect(res.body.description).to.equal('black test box');
          expect(res.body.location).to.equal('test shelf');
          this.exampleItem = res.body;
          done();
        })
      });

      it('should return 404 status, not found', done => {
        request.post(`${url}/api/`)
        .send(exampleItem)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });

      it('should return 400 status, bad request', done => {
        request.post(`${url}/api/item`)
        .send('bad item')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });

  describe('GET: /api/item/:id', function() {
    describe('getting a valid item', () => {
      beforeEach( done => {
        exampleItem.timestamp = new Date();
        new Item(exampleItem).save()
        .then( item => {
          this.exampleItem = item;
          done();
        })
        .catch(done);
      });
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
        request.get(`${url}/api/item/${this.exampleItem._id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.itemName).to.equal('test box');
          expect(res.body.description).to.equal('black test box');
          expect(res.body.location).to.equal('test shelf');
          done();
        });
      });

      it('should return 404 status, not found', done => {
        request.get(`${url}/api/item`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });

  describe('PUT: /api/item/:id', function() {
    describe('', function() {
      beforeEach( done => {
        exampleItem.timestamp = new Date();
        new Item(exampleItem).save()
        .then( item => {
          this.tempItem = item;
          done();
        })
        .catch(done);
      });

      afterEach( done => {
        if (this.tempItem) {
          Item.remove({})
          .then( ()=> done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return an item', done => {
        let updateItem = { location: 'new shelf'};
        request.put(`${url}/api/item/${this.tempItem._id}`)
        .send(updateItem)
        .end((err, res) => {
          if (err) return done(err);
          let timestamp = new Date(res.body.timestamp);
          expect(res.status).to.equal(200);
          expect(res.body.location).to.equal(updateItem.location);
          expect(timestamp.toString()).to.equal(exampleItem.timestamp.toString());
          done();
        });
      });

      it('should return 404 status, not found', done => {
        request.put(`${url}/api/item`)
        .send('bad request')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });

  describe('DELETE /api/item/:id', () => {
    describe('getting a valid item', () => {
      before( done => {
        exampleItem.timestamp = new Date();
        new Item(exampleItem).save()
        .then( item => {
          this.tempItem = item;
          done();
        })
        .catch(done);
      });

      it('should successfully delete a item', done => {
        request.delete(`${url}/api/item/${this.tempItem._id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(204);
          done();
        });
      });
    });
  });
});

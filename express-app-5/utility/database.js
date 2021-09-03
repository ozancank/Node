const mongodb = require('mongodb');
const passwd = require('../passwd');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    `mongodb+srv://ozancan1:${passwd.mongoDbAtlas}@cluster0.afkna.mongodb.net/node-app-orm?retryWrites=true&w=majority`
  )
    .then((client) => {
      console.log('connected');
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No Database';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

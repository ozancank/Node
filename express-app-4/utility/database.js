const mongodb = require('mongodb');
const passwd = require('../passwd');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect(
    `mongodb+srv://ozancan1:${passwd}@cluster0.afkna.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
    .then((client) => {
      console.log('connected');
      callback(client);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

module.exports = mongoConnect;

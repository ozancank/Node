const getDb = require('../utility/database').getDb;
const mongodb = require('mongodb');

const collection = 'users';

class User {
  constructor(name, email, cart, id) {
    this.name = name;
    this.email = email;
    this.cart = cart ? cart : {};
    this.cart.items = cart ? cart.items : [];
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection(collection).insertOne(this);
  }

  addToCart(){

  }

  postCart(product){

  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection(collection)
      .findOne({ _id: new mongodb.ObjectId(userId) })
      .then((user) => {
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findByName(username) {
    const db = getDb();
    return db
      .collection(collection)
      .findOne({ name: username })
      .then((user) => {
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = User;

const getDb = require('../utility/database').getDb;
const mongodb = require('mongodb');

const collection = 'products';

class Product {
  constructor(name, price, description, imageUrl) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
    const db = getDb();
    db.collection(collection)
      .insertOne(this)
      .then(() => {
        console.log('saved');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findAll() {
    const db = getDb();
    return db
      .collection(collection)
      .find({})
      .toArray()
      .then((products) => {
        return products;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(productId) {
    const db = getDb();
    return db
      .collection(collection)
      .find({ _id: new mongodb.ObjectId(productId) })
      .toArray()
      .then((products) => {
        return products;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Product;

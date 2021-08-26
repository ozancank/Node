const getDb = require('../utility/database').getDb;
const mongodb = require('mongodb');

const collection = 'products';

class Product {
  constructor(name, price, description, imageUrl, categories, id, userId) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this.categories =
      categories && !Array.isArray(categories)
        ? Array.of(categories)
        : categories;
    this._id = id ? mongodb.ObjectId(id) : null;
    this.user = userId;
  }

  save() {
    let db = getDb();
    if (this._id) {
      db = db
        .collection(collection)
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      db = db.collection(collection).insertOne(this);
    }

    return db
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
      .project({ name: 1, price: 1, imageUrl: 1 })
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
    // return db
    //   .collection(collection)
    //   .find({ _id: new mongodb.ObjectId(productId) })
    //   .toArray()
    //   .then((products) => {
    //     return products;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    return db
      .collection(collection)
      .findOne({ _id: new mongodb.ObjectId(productId) })
      .then((product) => {
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deleteById(productId) {
    const db = getDb();
    return db
      .collection(collection)
      .deleteOne({ _id: new mongodb.ObjectId(productId) })
      .then(() => {
        console.log('deleted');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findByCategoryId(categoryId) {
    const db = getDb();
    return db
      .collection(collection)
      .find({ categories: categoryId })
      .toArray()
      .then((products) => {
        return products;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = Product;

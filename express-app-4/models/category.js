const getDb = require('../utility/database').getDb;
const mongodb = require('mongodb');

const collection = 'categories';

class Category {
  constructor(name, description,  id, userId) {
    this.name = name;
    this.description = description;
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
        console.log('saved category');
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
      .then((categories) => {
        return categories;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(categoryId) {
    const db = getDb();
    return db
      .collection(collection)
      .findOne({ _id: new mongodb.ObjectId(categoryId) })
      .then((category) => {
        return category;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deleteById(categoryId) {
    const db = getDb();
    return db
      .collection(collection)
      .deleteOne({ _id: new mongodb.ObjectId(categoryId) })
      .then(() => {
        console.log('deleted category');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Category;
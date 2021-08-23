const connection = require('../utility/database');

module.exports = class Product {
  constructor(name, price, imageUrl, categoryid, description) {
    this.name = name;
    this.price = price;
    this.imageUrl = imageUrl;
    this.categoryid = categoryid;
    this.description = description;
  }

  saveProduct() {}

  static getAll() {
    return connection.execute('SELECT * FROM products');
  }

  static getById(id) {}

  static getProductsByCategoryId(categoryid) {}

  static Update(product) {}

  static DeleteById(id) {}
};

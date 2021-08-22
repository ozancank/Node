const products = [
  {
    name: 'Ürün 1',
    price: 500,
    imageUrl: 'https://loremflickr.com/700/700/computer',
    description: 'Açıklama 1',
  },
  {
    name: 'Ürün 2',
    price: 5000,
    imageUrl: 'https://loremflickr.com/700/700/robot',
    description: 'Açıklama 2',
  },
  {
    name: 'Ürün 3',
    price: 500000,
    imageUrl: 'https://loremflickr.com/700/700/house',
    description: 'Açıklama 3',
  },
  {
    name: 'Ürün 4',
    price: 5,
    imageUrl: 'https://loremflickr.com/700/700/book',
    description: 'Açıklama 4',
  },
];

module.exports = class Product {
  constructor(name, price, imageUrl, description) {
    this.name = name;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
  }

  saveProduct() {
    products.push(this);
  }

  static getAll() {
    return products;
  }
};

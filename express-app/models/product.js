const products = [
  {
    id: 12310,
    name: 'Ürün 1',
    price: 500,
    imageUrl: 'https://loremflickr.com/700/700/computer',
    description: 'Açıklama 1',
  },
  {
    id: 12311,
    name: 'Ürün 2',
    price: 5000,
    imageUrl: 'https://loremflickr.com/700/700/robot',
    description: 'Açıklama 2',
  },
  {
    id: 12312,
    name: 'Ürün 3',
    price: 500000,
    imageUrl: 'https://loremflickr.com/700/700/house',
    description: 'Açıklama 3',
  },
  {
    id: 12313,
    name: 'Ürün 4',
    price: 5,
    imageUrl: 'https://loremflickr.com/700/700/book',
    description: 'Açıklama 4',
  },
];

module.exports = class Product {
  constructor(name, price, imageUrl, description) {
    this.id = Math.floor(Math.random() * 99999) + 1;
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

  static getById(id) {
    const product = products.find((i) => i.id == id);
    return product;
  }
};

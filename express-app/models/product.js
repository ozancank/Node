const products = [
  {
    id: '12310',
    name: 'Ürün 1',
    price: 500,
    imageUrl: 'https://loremflickr.com/700/700/computer',
    description: 'Açıklama 1',
    categoryid: '1',
  },
  {
    id: '12311',
    name: 'Ürün 2',
    price: 5000,
    imageUrl: 'https://loremflickr.com/700/700/robot',
    description: 'Açıklama 2',
    categoryid: '1',
  },
  {
    id: '12312',
    name: 'Ürün 3',
    price: 500000,
    imageUrl: 'https://loremflickr.com/700/700/house',
    description: 'Açıklama 3',
    categoryid: '2',
  },
  {
    id: '12313',
    name: 'Ürün 4',
    price: 5,
    imageUrl: 'https://loremflickr.com/700/700/book',
    description: 'Açıklama 4',
    categoryid: '3',
  },
];

module.exports = class Product {
  constructor(name, price, imageUrl, categoryid, description) {
    this.id = (Math.floor(Math.random() * 99999) + 1).toString();
    this.name = name;
    this.price = price;
    this.imageUrl = imageUrl;
    this.categoryid = categoryid;
    this.description = description;
  }

  saveProduct() {
    products.push(this);
  }

  static getAll() {
    return products;
  }

  static getById(id) {
    const product = products.find((i) => i.id === id);
    return product;
  }

  static getProductsByCategoryId(categoryid) {
    return products.filter((i) => i.categoryid === categoryid);
  }

  static Update(product) {
    const index = products.findIndex((i) => i.id === product.id);
    products[index].name = product.name;
    products[index].price = product.price;
    products[index].imageUrl = product.imageUrl;
    products[index].categoryid = product.categoryid;
    products[index].description = product.description;
  }

  static DeleteById(id) {
    const index = products.findIndex((i) => i.id === id);
    products.splice(index, 1);
  }
};

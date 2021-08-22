const express = require('express');
const router = express.Router();

const products = [
  {
    name: 'Ürün 1',
    price: 500,
    image: 'https://loremflickr.com/700/700/computer',
    description: 'Açıklama 1',
  },
  {
    name: 'Ürün 2',
    price: 5000,
    image: 'https://loremflickr.com/700/700/robot',
    description: 'Açıklama 2',
  },
  {
    name: 'Ürün 3',
    price: 500000,
    image: 'https://loremflickr.com/700/700/house',
    description: 'Açıklama 3',
  },
  {
    name: 'Ürün 4',
    price: 5,
    image: 'https://loremflickr.com/700/700/book',
    description: 'Açıklama 4',
  },
];

router.get('/add-product', (req, res, next) => {
  res.render('add-product', {
    title: 'Add Product',
    path: '/admin/add-product',
  });
});

router.post('/add-product', (req, res, next) => {
  products.push({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    description: req.body.description,
  });
  res.redirect('/');
});

exports.routes = router;
exports.products = products;

// router.get('/add-product', (req, res, next) => {
//   res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
// });

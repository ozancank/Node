const express = require('express');
const router = express.Router();

const path = require('path');

// router.get('/add-product', (req, res, next) => {
//   res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
// });

router.get('/add-product', (req, res, next) => {
  res.render('add-product');
});

router.post('/add-product', (req, res, next) => {
  console.log(req.body);

  res.redirect('/');
});

module.exports = router;

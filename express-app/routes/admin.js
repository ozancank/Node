const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop');

router.get('/add-product', shopController.getAddProduct);

router.post('/add-product', shopController.postAddProduct);

module.exports = router;

// router.get('/add-product', (req, res, next) => {
//   res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
// });

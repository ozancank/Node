const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/categories/:categoryId', shopController.getProductsByCategoryId);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/delete-cartitem', shopController.postCartItemDelete);

router.get('/orders', shopController.getOrders);

module.exports = router;

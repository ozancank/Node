const express = require('express');
const router = express.Router();

const isAuthenticated = require('../middleware/authentication');
const local = require('../middleware/locals');

const shopController = require('../controllers/shop');

router.get('/', local, shopController.getIndex);

router.get('/products', local, shopController.getProducts);

router.get('/products/:productId', local, shopController.getProduct);

router.get(
  '/categories/:categoryId',
  local,
  shopController.getProductsByCategoryId
);

router.get('/cart', local, isAuthenticated, shopController.getCart);

router.post('/cart', local, isAuthenticated, shopController.postCart);

router.post(
  '/delete-cartitem',
  local,
  isAuthenticated,
  shopController.postCartItemDelete
);

router.get('/orders', local, isAuthenticated, shopController.getOrders);

router.post('/create-order', local, isAuthenticated, shopController.postOrder);

module.exports = router;

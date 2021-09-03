const express = require('express');
const router = express.Router();

const isAdmin = require('../middleware/isAdmin');
const local = require('../middleware/locals');

const adminController = require('../controllers/admin');

// product
router.get('/products', local, isAdmin, adminController.getProducts);
router.get(
  '/add-product',
  local,
  isAdmin,
  adminController.getAddProduct
);
router.post(
  '/add-product',
  local,
  isAdmin,
  adminController.postAddProduct
);
router.get(
  '/edit-product/:productId',
  local,
  isAdmin,
  adminController.getEditProduct
);
router.post(
  '/edit-product',
  local,
  isAdmin,
  adminController.postEditProduct
);
router.post(
  '/delete-product',
  isAdmin,
  adminController.postDeleteProduct
);

//category
router.get('/categories', local, isAdmin, adminController.getCategories);
router.get(
  '/add-category',
  local,
  isAdmin,
  adminController.getAddCategory
);
router.post(
  '/add-category',
  local,
  isAdmin,
  adminController.postAddCategory
);
router.get(
  '/edit-category/:categoryId',
  local,
  isAdmin,
  adminController.getEditCategory
);
router.post(
  '/edit-category',
  local,
  isAdmin,
  adminController.postEditCategory
);
router.post(
  '/delete-category',
  local,
  isAdmin,
  adminController.postDeleteCategory
);

module.exports = router;

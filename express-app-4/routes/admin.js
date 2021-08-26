const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');

// product
router.get('/products', adminController.getProducts);
router.get('/add-product', adminController.getAddProduct);
router.post('/add-product', adminController.postAddProduct);
router.get('/edit-product/:productId', adminController.getEditProduct);
router.post('/edit-product', adminController.postEditCategory);
router.post('/delete-product', adminController.postDeleteProduct);

//category
router.get('/categories', adminController.getCategories);
router.get('/add-category', adminController.getAddCategory);
router.post('/add-category', adminController.postAddCategory);
router.get('/edit-category/:categoryId', adminController.getEditCategory);
router.post('/edit-category', adminController.postEditCategory);
router.post('/delete-category', adminController.postDeleteCategory);

module.exports = router;

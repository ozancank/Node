const Product = require('../models/product');
const Category = require('../models/category');

exports.getIndex = (req, res, next) => {
  Category.getAll()
    .then((categories) => {
      Product.getAll()
        .then((products) => {
          res.render('shop/index', {
            title: 'Shopping',
            path: '/',
            products: products[0],
            categories: categories[0],
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  Category.getAll()
    .then((categories) => {
      Product.getAll()
        .then((products) => {
          res.render('shop/products', {
            title: 'Products',
            products: products[0],
            categories: categories[0],
            path: '/products',
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProductsByCategoryId = (req, res, next) => {
  const categoryid = req.params.categoryid;
  Category.getAll()
    .then((categories) => {
      Product.getProductsByCategoryId(categoryid)
        .then((products) => {
          res.render('shop/products', {
            title: 'Products',
            path: '/products',
            products: products[0],
            categories: categories[0],
            selectedCategory: categoryid,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const product = Product.getById(req.params.productid)
    .then((product) => {
      res.render('shop/product-detail', {
        title: product[0][0].name,
        product: product[0][0],
        path: '/products',
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    title: 'Cart',
    path: '/cart',
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    title: 'Orders',
    path: '/orders',
  });
};

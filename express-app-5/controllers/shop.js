const Product = require('../models/product');
const Category = require('../models/category');
const product = require('../models/product');

exports.getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      return products;
    })
    .then((products) => {
      Category.find().then((categories) => {
        res.render('shop/index', {
          title: 'Shopping',
          path: '/',
          products: products,
          categories: categories,
        });
      });
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      return products;
    })
    .then((products) => {
      Category.find().then((categories) => {
        res.render('shop/products', {
          title: 'Products',
          path: '/products',
          products: products,
          categories: categories,
        });
      });
    })
    .catch((err) => console.log(err));
};

exports.getProductsByCategoryId = (req, res, next) => {
  const categoryId = req.params.categoryId;
  const model = [];

  Category.find()
    .then((categories) => {
      model.categories = categories;
      return Product.find({
        categories: categoryId,
      });
    })
    .then((products) => {
      res.render('shop/products', {
        title: 'Products',
        path: '/products',
        products: products,
        categories: model.categories,
        selectedCategory: categoryId,
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
  Product.findById(req.params.productId)
    .then((product) => {
      return product;
    })
    .then((product) => {
      Category.find({ _id: product.categories }).then((categories) => {
        res.render('shop/product-detail', {
          title: product.name,
          path: '/products',
          product: product,
          categories: categories,
        });
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then((user) => {
      res.render('shop/cart', {
        title: 'Cart',
        path: '/cart',
        products: user.cart.items,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postCartItemDelete = (req, res, next) => {
  const productId = req.body.productId;

  req.user
    .deleteCartItem(productId)
    .then(() => {
      res.redirect('/cart');
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders()
    .then((orders) => {
      res.render('shop/orders', {
        title: 'Orders',
        path: '/orders',
        orders: orders,
      });
    })
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
  req.user
    .addOrder()
    .then(() => {
      res.redirect('/orders');
    })
    .catch((err) => console.log(err));
};

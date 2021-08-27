const Product = require('../models/product');
const Category = require('../models/category');

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      Category.findAll().then((categories) => {
        return res.render('shop/index', {
          title: 'Shopping',
          path: '/',
          products: products,
          categories: categories,
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      Category.findAll().then((categories) => {
        return res.render('shop/products', {
          title: 'Products',
          path: '/products',
          products: products,
          categories: categories,
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProductsByCategoryId = (req, res, next) => {
  const categoryId = req.params.categoryId;
  const model = [];
  Category.findAll()
    .then((categories) => {
      model.categories = categories;
      return Product.findByCategoryId(categoryId);
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
    .catch((err) => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  Product.findById(req.params.productId)
    .then((product) => {
      return res.render('shop/product-detail', {
        title: product.name,
        path: '/products',
        product: product,
        //category: category,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((products) => {
      res.render('shop/cart', {
        title: 'Cart',
        path: '/cart',
        products: products,
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

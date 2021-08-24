const Product = require('../models/product');
const Category = require('../models/category');

exports.getIndex = (req, res, next) => {
  Product.findAll({
    attributes: ['id', 'name', 'price', 'imageUrl'],
  })
    .then((products) => {
      Category.findAll()
        .then((categories) => {
          res.render('shop/index', {
            title: 'Shopping',
            path: '/',
            products: products,
            categories: categories,
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
  Product.findAll({
    attributes: ['id', 'name', 'price', 'imageUrl'],
  })
    .then((products) => {
      Category.findAll()
        .then((categories) => {
          res.render('shop/products', {
            title: 'Products',
            path: '/products',
            products: products,
            categories: categories,
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
  const categoryId = parseInt(req.params.categoryId);
  const model = [];
  Category.findAll()
    .then((categories) => {
      model.categories = categories;
      const category = categories.find((i) => i.id === categoryId);
      return category.getProducts();
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
  Product.findAll({
    attributes: [
      'id',
      'name',
      'price',
      'imageUrl',
      'description',
      'categoryId',
    ],
    where: { id: req.params.productId },
  })
    .then((product) => {
      Category.findByPk(product[0].categoryId).then((category) => {
        return res.render('shop/product-detail', {
          title: product[0].name,
          path: '/products',
          product: product[0],
          category: category,
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
  /*
  Product.findByPk(req.params.productId)
    .then((product) => {
      res.render('shop/product-detail', {
        title: product.name,
        product: product,
        path: '/products',
      });
    })
    .catch((err) => {
      console.log(err);
    });
    */
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

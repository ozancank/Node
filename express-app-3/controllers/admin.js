const Product = require('../models/product');
const Category = require('../models/category');

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render('admin/products', {
        title: 'Admin Products',
        path: '/admin/products',
        products: products,
        action: req.query.action,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAddProduct = (req, res, next) => {
  Category.findAll().then((categories) => {
    res.render('admin/add-product', {
      title: 'New Product',
      path: '/admin/add-product',
      categories: categories,
    });
  });
};

exports.postAddProduct = (req, res, next) => {
  const name = req.body.name;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const categoryId = req.body.categoryId;
  const description = req.body.description;
  const user = req.user;

  user
    .createProduct({
      name: name,
      price: price,
      imageUrl: imageUrl,
      description: description,
      categoryId: categoryId,
    })
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  Product.findByPk(req.params.productId)
    .then((product) => {
      if (!product) {
        return res.redirect('/');
      }
      Category.findAll()
        .then((categories) => {
          res.render('admin/edit-product', {
            title: 'Edit Product',
            path: '/admin/edit-product',
            product: product,
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

exports.postEditProduct = (req, res, next) => {
  const id = req.body.id;
  const name = req.body.name;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const categoryId = req.body.categoryId;
  const description = req.body.description;

  Product.findByPk(id)
    .then((product) => {
      product.name = name;
      product.price = price;
      product.imageUrl = imageUrl;
      product.description = description;
      product.categoryId = categoryId;
      return product.save();
    })
    .then(() => {
      res.redirect('/admin/products?action=edit');
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const id = req.body.productId;
  Product.findByPk(id)
    .then((product) => {
      return product.destroy();
    })
    .then(() => {
      res.redirect('/admin/products?action=delete');
    })
    .catch((err) => {
      console.log(err);
    });
};

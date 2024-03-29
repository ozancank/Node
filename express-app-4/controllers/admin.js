const Product = require('../models/product');
const Category = require('../models/category');

//Product
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
  Category.findAll()
    .then((categories) => {
      console.log(categories);
      res.render('admin/add-product', {
        title: 'New Product',
        path: '/admin/add-product',
        categories: categories,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postAddProduct = (req, res, next) => {
  const name = req.body.name;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const categories = req.body.categoryIds;
  const description = req.body.description;

  const product = new Product(
    name,
    price,
    description,
    imageUrl,
    categories,
    null,
    req.user._id
  );

  product
    .save()
    .then(() => {
      res.redirect('/admin/products?action=create');
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  Product.findById(req.params.productId)
    .then((product) => {
      Category.findAll().then((categories) => {
        categories = categories.map((category) => {
          if (product.categories)
            product.categories.find((item) => {
              if (item === category._id.toString()) {
                category.selected = true;
              }
            });
          return category;
        });
        return res.render('admin/edit-product', {
          title: 'Edit Product',
          path: '/admin/edit-product',
          product: product,
          categories: categories,
        });
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
  const categories = req.body.categoryIds;
  const description = req.body.description;

  const product = new Product(
    name,
    price,
    description,
    imageUrl,
    categories,
    id,
    req.user._id
  );

  product
    .save()
    .then(() => {
      res.redirect('/admin/products?action=edit');
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const id = req.body.productId;
  Product.deleteById(id)
    .then(() => {
      res.redirect('/admin/products?action=delete');
    })
    .catch((err) => {
      console.log(err);
    });
};

//Category
exports.getCategories = (req, res, next) => {
  Category.findAll()
    .then((categories) => {
      res.render('admin/categories', {
        title: 'Admin Categories',
        path: '/admin/categories',
        categories: categories,
        action: req.query.action,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAddCategory = (req, res, next) => {
  res.render('admin/add-category', {
    title: 'New Category',
    path: '/admin/add-category',
  });
};

exports.postAddCategory = (req, res, next) => {
  const name = req.body.name;
  const description = req.body.description;

  const category = new Category(name, description, null, req.user._id);

  category
    .save()
    .then(() => {
      res.redirect('/admin/categories?action=create');
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditCategory = (req, res, next) => {
  Category.findById(req.params.categoryId)
    .then((category) => {
      res.render('admin/edit-category', {
        title: 'Edit Category',
        path: '/admin/edit-category',
        category: category,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditCategory = (req, res, next) => {
  const id = req.body.id;
  const name = req.body.name;
  const description = req.body.description;

  const category = new Category(name, description, id, req.user._id);

  category
    .save()
    .then(() => {
      res.redirect('/admin/categories?action=edit');
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteCategory = (req, res, next) => {
  const id = req.body.categoryId;
  Category.deleteById(id)
    .then(() => {
      res.redirect('/admin/categories?action=delete');
    })
    .catch((err) => {
      console.log(err);
    });
};

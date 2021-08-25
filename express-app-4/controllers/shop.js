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
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts().then((products) => {
        res.render('shop/cart', {
          title: 'Cart',
          path: '/cart',
          products: products,
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  let quantity = 1;
  let userCart;

  req.user
    .getCart()
    .then((cart) => {
      userCart = cart;
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        quantity += product.cartItem.quantity;
        return product;
      }
      return Product.findByPk(productId);
    })
    .then((product) => {
      return userCart.addProduct(product, {
        through: {
          quantity: quantity,
        },
      });
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
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      const product = products[0];

      return product.cartItem.destroy(product);
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getOrders = (req, res, next) => {
  req.user.getOrders({ include: ['products'] }).then((orders) => {
    res
      .render('shop/orders', {
        title: 'Orders',
        path: '/orders',
        orders: orders,
      })
      .catch((err) => onsole.log(err));
  });
};

exports.postOrder = (req, res, next) => {
  let userCart;

  req.user
    .getCart()
    .then((cart) => {
      userCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      return req.user.createOrder().then((order) => {
        order.addProduct(
          products.map((product) => {
            product.orderItem = {
              quantity: product.cartItem.quantity,
              price: product.price,
            };
            return product;
          })
        );
      });
    })
    .then(() => {
      return userCart.setProducts(null);
    })
    .then(() => {
      res.redirect('/orders');
    })
    .catch((err) => {
      console.log(err);
    });
};

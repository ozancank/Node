const Product = require('../models/product');
const Category = require('../models/category');
const Order = require('../models/order');

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
        .catch((err) => {
            next(err);
        });
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
        .catch((err) => {
            next(err);
        });
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
        .catch((err) => {
            next(err);
        });
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
        .catch((err) => {
            next(err);
        });
};

exports.getCart = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .then((user) => {
            res.render('shop/cart', {
                title: 'Cart',
                path: '/cart',
                products: user.cart.items,
            });
        })
        .catch((err) => {
            next(err);
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
            next(err);
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
            next(err);
        });
};

exports.getOrders = (req, res, next) => {
    Order.find({ 'user.userId': req.user._id })
        .then((orders) => {
            res.render('shop/orders', {
                title: 'Orders',
                path: '/orders',
                orders: orders,
            });
        })
        .catch((err) => {
            next(err);
        });
};

exports.postOrder = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .then((user) => {
            const order = new Order({
                user: {
                    userId: req.user._id,
                    name: req.user.name,
                    email: req.user.email,
                },
                items: user.cart.items.map((p) => {
                    return {
                        product: {
                            _id: p.productId._id,
                            name: p.productId.name,
                            price: p.productId.price,
                            imageUrl: p.productId.imageUrl,
                        },
                        quantity: p.quantity,
                    };
                }),
            });
            return order.save();
        })
        .then(() => {
            return req.user.clearCart();
        })
        .then(() => {
            res.redirect('/orders');
        })
        .catch((err) => {
            next(err);
        });
};

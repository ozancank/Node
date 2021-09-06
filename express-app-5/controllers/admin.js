const Product = require('../models/product');
const Category = require('../models/category');
const { populate } = require('../models/product');

//Product
exports.getProducts = (req, res, next) => {
    Product.find({ userId: req.user._id })
        .populate('userId', 'name -_id')
        .select('name price imageUrl')
        .then((products) => {
            res.render('admin/products', {
                title: 'Admin Products',
                path: '/admin/products',
                products: products,
                action: req.query.action,
            });
        })
        .catch((err) => console.log(err));
};

exports.getAddProduct = (req, res, next) => {
    Category.find()
        .then((categories) => {
            res.render('admin/add-product', {
                title: 'New Product',
                path: '/admin/add-product',
                categories: categories,
            });
        })
        .catch((err) => console.log(err));
};

exports.postAddProduct = (req, res, next) => {
    const name = req.body.name;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const categoryIds = req.body.categoryIds;

    const product = new Product({
        name: name,
        price: price,
        imageUrl: imageUrl,
        description: description,
        userId: req.user,
        categoryIds: categoryIds,
        isActive: true,
    });

    product
        .save()
        .then(() => {
            res.redirect('/admin/products?action=create');
        })
        .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
    Product.findOne({ _id: req.params.productId, userId: req.user._id })
        //.populate('categories')
        .then((product) => {
            if (!product) {
                return res.redirect('/');
            }
            return product;
        })
        .then((product) => {
            Category.find().then((categories) => {
                categories = categories.map((category) => {
                    if (product.categories) {
                        product.categories.find((item) => {
                            if (item.toString() === category._id.toString()) {
                                category.selected = true;
                            }
                        });
                    }
                    return category;
                });
                res.render('admin/edit-product', {
                    title: 'Edit Product',
                    path: '/admin/edit-product',
                    product: product,
                    categories: categories,
                });
            });
        })
        .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const categoryIds = req.body.categoryIds;

    Product.updateOne(
        { _id: id, userId: req.user._id },
        {
            $set: {
                name: name,
                price: price,
                imageUrl: imageUrl,
                description: description,
                categories: categoryIds,
            },
        }
    )
        .then(() => {
            res.redirect('/admin/products?action=edit');
        })
        .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
    const id = req.body.productId;
    Product.deleteOne({ _id: id, userId: req.user._id })
        .then((result) => {
            if (result.deletedCount === 0) {
                return res.redirect('/');
            }
            res.redirect('/admin/products?action=delete');
        })
        .catch((err) => console.log(err));
};

//Category
exports.getCategories = (req, res, next) => {
    Category.find()
        .then((categories) => {
            res.render('admin/categories', {
                title: 'Admin Categories',
                path: '/admin/categories',
                categories: categories,
                action: req.query.action,
            });
        })
        .catch((err) => console.log(err));
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

    const category = new Category({
        name: name,
        description: description,
    });

    category
        .save()
        .then(() => {
            res.redirect('/admin/categories?action=create');
        })
        .catch((err) => console.log(err));
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
        .catch((err) => console.log(err));
};

exports.postEditCategory = (req, res, next) => {
    const id = req.body.id;
    const name = req.body.name;
    const description = req.body.description;

    Category.findByIdAndUpdate(
        { _id: id },
        {
            $set: {
                name: name,
                description: description,
            },
        }
    )
        .then(() => {
            res.redirect('/admin/categories?action=edit');
        })
        .catch((err) => console.log(err));
};

exports.postDeleteCategory = (req, res, next) => {
    const id = req.body.categoryId;
    Category.findByIdAndRemove(id)
        .then(() => {
            res.redirect('/admin/categories?action=delete');
        })
        .catch((err) => console.log(err));
};

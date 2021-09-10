const Product = require('../models/product');
const Category = require('../models/category');
const fs = require('fs');
//const mongoose = require('mongoose');

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
        .catch((err) => {
            next(err);
        });
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
        .catch((err) => {
            next(err);
        });
};

exports.postAddProduct = (req, res, next) => {
    const name = req.body.name;
    const price = req.body.price;
    const image = req.file;
    const description = req.body.description;
    const categoryIds = req.body.categoryIds;

    if (!image) {
        return Category.find()
            .then((categories) => {
                res.render('admin/add-product', {
                    title: 'New Product',
                    path: '/admin/add-product',
                    categories: categories,
                    errorMessage: 'Lütfen bir resim seçiniz',
                });
            })
            .catch((err) => {
                next(err);
            });
    }

    const product = new Product({
        //_id: new mongoose.Types.ObjectId('61288de21cd85a99fb475d7d'),
        name: name,
        price: price,
        imageUrl: image.filename,
        description: description,
        userId: req.user,
        categoryIds: categoryIds,
        tags: ['deneme', 'etiket'],
        isActive: true,
    });

    product
        .save()
        .then(() => {
            res.redirect('/admin/products?action=create');
        })
        .catch((err) => {
            if (err.name == 'ValidationError') {
                let message = '';
                for (field in err.errors) {
                    message += err.errors[field].message + '<br>';
                }

                res.render('admin/add-product', {
                    title: 'New Product',
                    path: '/admin/add-product',
                    errorMessage: message,
                });
            } else {
                // res.status(500).render('admin/add-product', {
                //     title: 'New Product',
                //     path: '/admin/add-product',
                //     errorMessage: 'Beklenmedik bir hata oluştu.',
                // });

                //res.redirect('/500');

                next(err);
            }
        });
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
        .catch((err) => {
            next(err);
        });
};

exports.postEditProduct = (req, res, next) => {
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const image = req.file;
    const description = req.body.description;
    const categoryIds = req.body.categoryIds;

    Product.findOne({ _id: id, userId: req.user._id })
        .then((product) => {
            if (!product) {
                return res.redirect('/');
            }
            product.name = name;
            product.price = price;
            product.description = description;
            product.categories = categoryIds;
            product.tags = ['deneme', 'etiket'];

            if (image) {
                fs.unlink('public/img/' + product.imageUrl, (err) => {
                    if (err) console.log(err);
                });
                product.imageUrl = image.filename;
            }

            return product.save();
        })
        .then(() => {
            res.redirect('/admin/products?action=edit');
        })
        .catch((err) => {
            next(err);
        });
};

exports.postDeleteProduct = (req, res, next) => {
    const id = req.body.productId;

    Product.findOne({ _id: id, userId: req.user._id })
        .then((product) => {
            if (!product) {
                return next(new Error('Silinmek istenen ürün bulunamadı.'));
            }
            fs.unlink('public/img/' + product.imageUrl, (err) => {
                if (err) console.log(err);
            });
            return Product.deleteOne({ _id: id, userId: req.user._id });
        })
        .then((result) => {
            if (result.deletedCount === 0) {
                return next(new Error('Silinmek istenen ürün bulunamadı.'));
            }
            res.redirect('/admin/products?action=delete');
        })
        .catch((err) => {
            next(err);
        });
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
        .catch((err) => {
            next(err);
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

    const category = new Category({
        name: name,
        description: description,
    });

    category
        .save()
        .then(() => {
            res.redirect('/admin/categories?action=create');
        })
        .catch((err) => {
            next(err);
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
            next(err);
        });
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
        .catch((err) => {
            next(err);
        });
};

exports.postDeleteCategory = (req, res, next) => {
    const id = req.body.categoryId;
    Category.findByIdAndRemove(id)
        .then(() => {
            res.redirect('/admin/categories?action=delete');
        })
        .catch((err) => {
            next(err);
        });
};

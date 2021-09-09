const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Ürün ismi girmelisiniz'],
        minlength: [5, 'Ürün ismi için minimum 5 karakter girmelisiniz'],
        maxlength: [255, 'Ürün ismi için maksimum 255 karakter girmelisiniz'],
        lowercase: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        max: 10000,
        get: (value) => Math.round(value),
        set: (value) => Math.round(value),
    },
    description: { type: String, minlength: 10 },
    imageUrl: { type: String, required: true },
    date: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
    ],
    tags: {
        type: Array,
        validate: {
            validator: function (value) {
                return value && value.length > 0;
            },
            message: 'Ürün için en az bir etiket giriniz.',
        },
    },
    isActive: Boolean,
});

module.exports = mongoose.model('Product', productSchema);

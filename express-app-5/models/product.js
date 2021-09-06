const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: function () {
            return this.isActive;
        },
        minlength: 5,
        maxlength: 255,
    },
    price: { type: Number, required: true, min: 0, max: 10000 },
    description: { type: String, minlength: 200 },
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
    isActive: Boolean,
});

module.exports = mongoose.model('Product', productSchema);

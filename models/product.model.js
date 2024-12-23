const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
    },
    price: {
        type: Number,
    },
    amount: {
        type: Number,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    category: {
        type: String,
    },
    similarProducts: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]
});

module.exports = mongoose.model('Product', productSchema);
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true },
    contact: { type: Number, required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
    address: { type: String, required: true },
    status: { type: String, required: true, enum: ['Incart', 'pending', 'delivered', 'cancelled'], default: 'Incart' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
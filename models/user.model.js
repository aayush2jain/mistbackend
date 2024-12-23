const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    contact: {
        type: String,
    },
    name: {
        type: String,
    },
    address: {
        type: String,
    },
    profilepic: {
        type: String,
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
});

module.exports = mongoose.model('User', UserSchema);
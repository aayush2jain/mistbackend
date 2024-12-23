const express = require('express');
const { registerUser } = require('../controllers/user.js');
const { createProduct, getAllProduct,getProduct } = require('../controllers/product.js');
const { createOrder } = require('../controllers/order.js');
const router = express.Router();
router.post('/register', registerUser);
router.post('/product',createProduct);
router.post('/order',createOrder);
router.get('/getproduct/:productId',getProduct);
router.get('/home',getAllProduct);

module.exports = router;
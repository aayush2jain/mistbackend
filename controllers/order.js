const Order = require('../models/order.model.js');

const createOrder = async (req, res) => {
    const { username, productId,productPrice,productName,contact,address,userId} = req.body; // Destructure the required fields from the request body

    console.log("order Data:", { username, productPrice,productName,contact,address,userId });

    try {
        // Create a new product instance
        const newOrder = new Order({
            username,
            productPrice,
            productName,
            contact,
            address,
            userId,
            productId
        });

        // Save the product to the database
        const savedOrder = await newOrder.save();

        // Return the saved product as a response
        res.status(201).json(savedOrder);
    } catch (error) {
        // Handle errors and send a proper response
        console.error("Error creating product:", error);
        res.status(500).json({ message: 'Error creating product', error });
    }
};
module.exports ={
    createOrder
}
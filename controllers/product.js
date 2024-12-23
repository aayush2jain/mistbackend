const Product = require('../models/product.model'); // Adjust the path as necessary
const axios = require('axios');
const createProduct = async (req, res) => {
    const { name, price, description, image,amount } = req.body; // Destructure the required fields from the request body

    console.log("Product Data:", { name, price, description, image });

    try {
        // Create a new product instance
        const newProduct = new Product({
            name,
            price,
            description,
            image,
            amount,
        });

        // Save the product to the database
        const savedProduct = await newProduct.save();

        // Return the saved product as a response
        res.status(201).json(savedProduct);
    } catch (error) {
        // Handle errors and send a proper response
        console.error("Error creating product:", error);
        res.status(500).json({ message: 'Error creating product', error });
    }
};
const getProduct = async (req, res) => {
    const { productId } = req.params;
    console.log("Product ID:", productId);
    try{
        const product = await Product.findById(productId);
        if(product){
            console.log("Product found", product);
            return res.status(200).json({product});
        }
        console.log("Product not found");
        return res.status(404).json({message: "Product not found"});
    }
    catch(error){
        return res.status(500).json({message: "Failed to retrieve product", error});
    }
}
const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json({products})
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve videos", error });
    }
};

module.exports = {
    createProduct,
    getAllProduct,
    getProduct
};

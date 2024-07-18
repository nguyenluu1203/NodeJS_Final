const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Get all products
router.get('/', async (req, res) => {
    const products = await Product.find().sort({ ProductStoreCode: 1, ProductName: -1 });
    res.render('index', { products });
});

// Insert a new product
router.post('/add', async (req, res) => {
    const newProduct = new Product({
        ProductCode: req.body.ProductCode,
        ProductName: req.body.ProductName,
        ProductDate: req.body.ProductDate,
        ProductOriginPrice: req.body.ProductOriginPrice,
        Quantity: req.body.Quantity,
        ProductStoreCode: req.body.ProductStoreCode
    });
    await newProduct.save();
    res.redirect('/');
});

// Delete a product
router.post('/delete/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

module.exports = router;

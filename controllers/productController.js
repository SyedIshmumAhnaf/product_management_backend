const Product = require('../models/product');
const Category = require('../models/category');

const createProduct = async(req, res) => {
    try{
        const {name, description, price, discount, image, status, category} = req.body;

        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            return res.status(400).json({success:'false', message:'Invalid Category ID!'});
        }

        productCode = 'generated-product-hash-1' //to be defined later

        const product = new Product({
            name,
            description,
            price,
            discount,
            image,
            status,
            category,
            productCode,
        });
        await product.save();
        res.status(201).json({success:'true', data: product, message:'Product creation done successfully'});
    } catch (error) {
        res.status(500).json({success:'false', message:'Error creating product', error: error.message});
    }
};

const getProducts = async(req, res) => {
    try{
        const {category, name} = req.query;
        const filters = {};
        //using filters to search
        if (category) filters.category = category;
        if (name) filters.name = new RegExp(name, 'i'); //RegExp allows case-insensitive search

        const products = await Product.find(filters).populate('category');
        res.status(200).json({success:'true', data: products})
    } catch (error) {
        res.status(500).json({success:'false', message:'Error fetching products', error: error.message});        
    }
};

module.exports = {createProduct, getProducts};
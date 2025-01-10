const express = require('express');
const {createProduct, getProducts, updateProduct} = require('../controllers/productController');
const router = express.Router();

router.post('/', createProduct); //route for creating a product
router.get('/', getProducts); //route for getting all products
router.patch('/:id', updateProduct); //route for updating a product

module.exports = router;
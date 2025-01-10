const express = require('express');
const {createProduct, getProducts, updateProduct, deleteProduct} = require('../controllers/productController');
const router = express.Router();

router.post('/', createProduct); //route for creating a product
router.get('/', getProducts); //route for getting all products
router.patch('/:id', updateProduct); //route for updating a product
router.delete('/:id', deleteProduct); //route for deleting a product

module.exports = router;
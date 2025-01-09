const express = require('express');
const {createProduct, getProducts} = require('../controllers/productController');
const router = express.Router();

router.post('/', createProduct); //route for creating a product
router.get('/', getProducts); //route for getting all products

module.exports = router;
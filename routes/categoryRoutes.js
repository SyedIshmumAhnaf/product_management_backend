const express = require('express');
const {createCategory, getCategories} = require('../controllers/categoryController');
const router = express.Router();

router.post('/', createCategory); //route for creating a category
router.get('/', getCategories); //route for getting all categories

module.exports = router;
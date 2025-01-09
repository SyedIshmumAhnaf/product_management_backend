//without capitalization, there could be a shadow conflict
const Category = require('../models/category')

const createCategory = async(req, res) => {
    try{
        const {name} = req.body;
        const existingCategory = await Category.findOne({name}); //to find existing entry
        if (existingCategory) {
            return res.status(400).json({success:false, message: 'Category already exists!'});
        }
        const category = new Category({name});
        await category.save();

        //status code = 201 = creation successful
        res.status(201).json({sucess:true, message: 'Created new category successfully!'});
    } catch(error) {
        res.status(500).json({success:false, message:'Error getting category!'});
    }
};

const getCategories = async(req, res) => {
    try {
        const categories = await Category.find();
        //status code = 200 = returning data successfully
        res.status(200).json({success:true, data: categories});
    } catch(error) {
        res.status(500).json({ success: false, message: 'Error fetching categories', error: error.message });
    }
};

module.exports = { createCategory, getCategories };
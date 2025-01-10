const Product = require('../models/product');
const Category = require('../models/category');
const productCodeGenerator = require('../src/productCodeCreator');

const createProduct = async(req, res) => {
    try{
        const {name, description, price, discount, image, status, category} = req.body;

        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            return res.status(400).json({success:'false', message:'Invalid Category ID!'});
        }

        //productCode = 'generated-product-hash-1' //to be defined later
        productCode = productCodeGenerator(name);

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
        //added last for pricing:
        const productWithPricing = products.map(product => {
            const discount = product.discount||0;
            const discountValue = (product.price*discount)/100;
            const newPrice = product.price-discountValue;
            return {
                ...product._doc, //helps to spread the fields of products
                originalPrice: product.price,
                newPrice: newPrice.toFixed(2),
            }
        })
        res.status(200).json({success:'true', data: productWithPricing})
    } catch (error) {
        res.status(500).json({success:'false', message:'Error fetching products', error: error.message});        
    }
};

const updateProduct = async(req,res) => {
    try{
        const {id} = req.params;
        const updates = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(id,updates,
            {new:true,runValidators:true}
        );

        if (!updatedProduct) {
            return res.status(404).json({success:false, message:'Cannot find product'});
        }
        res.status(200).json({success:true, data:updatedProduct, message:'Product updated successfully!'})
    }catch (error) {
        res.status(500).json({success:'false', message:'Error updating products', error:error.message});
    }
}

//not required by assessment
const deleteProduct = async(req, res) => {
    try{
        const {id} = req.params;
        const productToBeDeleted = await Product.findByIdAndDelete(id);

        if (!productToBeDeleted) {
            return res.status(404).json({ success:false, message:'Product not found!' });
        }
        res.status(200).json({success:true, message:'Product deletion successful!'})
    }catch(error){
        res.status(500).json({success:'false', message:'Error deleting product', error:error.message});
    }
}

module.exports = {createProduct, getProducts, updateProduct, deleteProduct};
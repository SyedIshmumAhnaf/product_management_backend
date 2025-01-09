//checking creation of product and category Schema
const Product = require('../models/product');
const Category = require('../models/category');

const sampleTestOne = async() => {
    try{
        const category = new Category({name: 'Electronics'});
        await category.save();

        const product = new Product({
            name: 'Apple iPhone 16',
            description: 'Our best iPhone ever made!',
            price: 799,
            discount: 10,
            image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gsmarena.com%2Fapple_iphone_16-13317.php&psig=AOvVaw2_qp12riCYC_m6VN_n-yOx&ust=1736501523375000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMDE77aq6IoDFQAAAAAdAAAAABAI',
            status: 'In Stock',
            category: category._id,
            productCode: 'to be generated',
        });
        await product.save();

        console.log('Sample data added successfully!');
    } catch (err) {
        console.error('Error adding sample data to models:', err.message);
    };
};

module.exports = sampleTestOne;
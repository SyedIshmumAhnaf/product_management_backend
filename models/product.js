const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    //currently keeping name as not unique to have same product multiple times
    name: {type: String, required: true, unique: false},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    discount: {type: Number, requied: true, default: 0},
    image: {type: String, required: true},
    status: {type: String, required: true, enum: ['Stock Out', 'In Stock'], default: 'In Stock'},
    productCode: {type: String, unique: true},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'}
});

module.exports = mongoose.model('Product', productSchema);
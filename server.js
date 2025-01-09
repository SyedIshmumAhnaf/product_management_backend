const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDb = require('./configuration/database');
const sampleTestOne = require('./sampleTests/sampleTestOne');
const categoryRoutes = require('./routes/categoryRoutes')
const productRoutes = require('./routes/productRoutes');
//const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('API has started running...');
});

const PORT = process.env.PORT

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        //sampleTestOne(); works successfully
        app.use('/categories', categoryRoutes);
        app.use('/products', productRoutes);
    });
}).catch((error) => {
    console.error('Server failed to start:', error.message);
});

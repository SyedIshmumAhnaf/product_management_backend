const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDb = require('./configuration/database');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

connectDb().catch(console.dir);

app.get('/', (req, res) => {
    res.send('API has started running...');
});

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
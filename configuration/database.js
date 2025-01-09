//Obtained from official Mongoose DB connection code
const mongoose = require('mongoose');
require('dotenv').config();

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function connectDb() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(process.env.MONGO_URI, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("MongoDB has been connected successfully!");
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}

//connectDb().catch(console.dir);
module.exports = connectDb;
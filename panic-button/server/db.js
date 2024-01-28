
// const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.DB_CONNECTION_STRING;
const dbName = process.env.DB_NAME;

// const client = new MongoClient(uri);

async function connectToDB() {
  try {
    // await client.connect();
    await mongoose.connect(uri, {dbName});
    console.log('Connected to MongoDB');

    // return client.db(dbName);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

module.exports = { connectToDB };

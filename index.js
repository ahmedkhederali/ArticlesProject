const express = require('express');
const dotenv = require('dotenv').config();

const connectDB = require('./db/connect');

const PORT = process.env.PORT || 5000;

const app = express()

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
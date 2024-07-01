const express = require('express');
const dotenv = require('dotenv').config();
const { AppError, globalErrorHandler } = require('./Errors/errorHandler');

const connectDB = require('./db/connect');

const PORT = process.env.PORT || 5001;

const app = express()

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.get('/test', (req, res) => {
  if(PORT === "5001"){
    throw new AppError('This route is not yet implemented', 401);

  }else{
      res.send('Hello, World!');

  }
});

// Route that triggers an error
app.get('/error', (req, res, next) => {
  next(new AppError('This is a custom error!', 400));
});

// Global Error Handling Middleware
app.use(globalErrorHandler);

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


// Catching Unhandled Rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // You can choose to terminate the process or handle the rejection here
  process.exit(1);
});

// Catching Uncaught Exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // You can choose to terminate the process or handle the exception here
  process.exit(1);
});
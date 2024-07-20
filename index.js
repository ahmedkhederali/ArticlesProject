require('dotenv').config();

const express = require('express');

const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const doctorRoutes = require('./routes/DoctorRoute/doctorRoutes');
const specialtyRoutes = require('./routes/specialtyRoutes/specialtyRoutes');
const degreeRoutes = require('./routes/DegreeRoutes/DegreeRoutes');
const subspecialtyRoutes = require('./routes/SubspecialtyRoutes/subspecialtyRoutes');
const userRoutes = require('./routes/UserRoutes/UserRoutes');

// test
// declare Variable
const app = express()
const PORT = process.env.PORT || 5000;

const { AppError, globalErrorHandler } = require('./Errors/errorHandler');

const connectDB = require('./db/connect');


// decalre Product Control


//middleware 
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(morgan('dev'));
app.use(cookieParser());
app.use(cors()); // CORS (Cross-Origin Resource Sharing) middleware allows you to enable cross-origin requests in your application.
app.use(helmet()); // set various HTTP headers for security purposes. 



app.get('/', (req, res) => {
  res.send('Hello, World!');
});
// Routes // API'S
app.use('/api/v1/', doctorRoutes);
app.use('/api/v1/', specialtyRoutes);
app.use('/api/v1/', degreeRoutes);
app.use('/api/v1/', subspecialtyRoutes);
app.use('/api/v1/', userRoutes);


// global error 
app.all("*",(req,res,next)=>{
  res.status("404").json({
    status:"fail",
    message:`Can't Found ${req.originalUrl}`
  })
})

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
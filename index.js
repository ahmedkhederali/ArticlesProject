require('dotenv').config();

const express = require('express');

const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const cloudinary=require('cloudinary')
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const doctorRoutes = require('./routes/DoctorRoute/doctorRoutes');
const specialtyRoutes = require('./routes/specialtyRoutes/specialtyRoutes');
const degreeRoutes = require('./routes/DegreeRoutes/DegreeRoutes');
const subspecialtyRoutes = require('./routes/SubspecialtyRoutes/subspecialtyRoutes');
const userRoutes = require('./routes/UserRoutes/UserRoutes');
const uploadRoutes = require('./routes/UplaodImages/upload');
const pharmacyRoutes = require('./routes/PharamcyRoute/PharmacyRoute');
const medicalLabRoutes = require('./routes/MedicalLabRoute/MedicalRoute');
const commentsRoutes = require('./routes/CommentsRoutes/CommentsRoute');

// test
// declare Variable
const app = express()
const PORT = process.env.PORT || 5000;

const { AppError, globalErrorHandler } = require('./Errors/errorHandler');

const connectDB = require('./db/connect');

// Enable files upload
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

// Cloudinary configuration (if not already done)
cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.CLOUD_API_KEY,
  api_secret:process.env.CLOUD_API_SECRT
})

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
app.use("/api/v1/", uploadRoutes);
app.use('/api/v1/', pharmacyRoutes);
app.use('/api/v1/', medicalLabRoutes);
app.use('/api/v1/', commentsRoutes);

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
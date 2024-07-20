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

const connectDB = require('./db/connect');
// test
// declare Variable
const app = express()
const PORT = process.env.PORT || 5000;

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
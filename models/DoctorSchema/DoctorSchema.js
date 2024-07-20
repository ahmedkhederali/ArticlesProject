const mongoose = require('mongoose');

function arrayLimit(val) {
    return val.length <= 3;
  }
const doctorSchema = new mongoose.Schema({
  doc_name: { type: String, required: true },
  age: { type: Number, required: true },
  small_desc: { type: String, required: true },
  specialties: { type: mongoose.Schema.Types.ObjectId, ref: 'Specialty', required: true },
  rating: { type: Number, min: 0, max: 5 },
  location: { type: String, required: true },
  detection_price: { type: Number, required: true },
  phone: { type: String, required: true },
  degree: { type: mongoose.Schema.Types.ObjectId, ref: 'Degree', required: true },
  time_for_works: [{
    day: { type: String, enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], required: true },
    start_time: { type: String, required: true },
    end_time: { type: String, required: true }
  }],
  doctor_img: {
    public_id: {
      type: String,
      
      default:"unknow user"
    },
    url: {
      type: String,
      required:true
    },
  },
  subspecialties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subspecialty' }],
  sex: { type: String, enum: ['Male', 'Female'], required: true },
  full_description: { type: String, required: true },
  clinic_image: {
    type: [{
      public_id: { type: String, default: "unknown user" },
      url: { type: String, required:true }
    }],
    validate: [arrayLimit, '{PATH} exceeds the limit of 3']
  }
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;

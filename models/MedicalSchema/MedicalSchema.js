// Medical Lab Schema
const mongoose = require('mongoose');

const medicalLabSchema = new mongoose.Schema({
    // Medical Lab specific fields...
    name: { type: String, required: true },
    location: { type: String, required: true },
    phone: { type: String, required: true },
    time_for_works: [{
        day: { type: String, enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], required: true },
        start_time: { type: String, required: true },
        end_time: { type: String, required: true }
    }],
    ratings: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        rating: { type: Number, min: 0, max: 5, required: true }
      }
    ],
    medical_desc:{ type: String, required: true },
    medicaltest:[
      {
        name: { type: String, required: true },
        desc: { type: String, required: true }
      }
    ],
    medicallab_type: {
      type: String,
      enum: ['medical', 'central'],
      required: true
    }
  });
  
  module.exports = mongoose.model('MedicalLab', medicalLabSchema);
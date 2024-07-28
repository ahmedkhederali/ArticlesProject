// Medical Lab Schema
const mongoose = require('mongoose');

const medicalLabSchema = new mongoose.Schema({
    // Medical Lab specific fields...
    name: { type: String, required: true },
    location: { type: String, required: true },
    phone: { type: String, required: true },
    rating: { type: Number, min: 0, max: 5 },

    time_for_works: [{
        day: { type: String, enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], required: true },
        start_time: { type: String, required: true },
        end_time: { type: String, required: true }
      }],
    lab_img: {
        public_id: {
          type: String,
          default:"unknow pharmacy"
        },
        url: {
          type: String,
          required:true
        },
      },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  });
  
  module.exports = mongoose.model('MedicalLab', medicalLabSchema);
// Pharmacy Schema
const mongoose = require("mongoose");

const pharmacySchema = new mongoose.Schema({
    // Pharmacy specific fields...
    name: { type: String, required: true },
    location: { type: String, required: true },
    phone: { type: String, required: true },
    ratings: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        rating: { type: Number, min: 0, max: 5, required: true }
      }
    ],
    fullTime:{type:Boolean,default:false}
  });
  
  module.exports = mongoose.model('Pharmacy', pharmacySchema);
const mongoose = require('mongoose');

const subspecialtySchema = new mongoose.Schema({
    subspecialty_name: { type: String, required: true },
    specialty: { type: mongoose.Schema.Types.ObjectId, ref: 'Specialty', required: true }
  });
  
  const Subspecialty = mongoose.model('Subspecialty', subspecialtySchema);
  module.exports = Subspecialty;
  
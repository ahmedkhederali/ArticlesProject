const mongoose = require('mongoose');

const degreeSchema = new mongoose.Schema({
    degree_name: { type: String, required: true }
  });
  
  const Degree = mongoose.model('Degree', degreeSchema);
  module.exports = Degree;
  
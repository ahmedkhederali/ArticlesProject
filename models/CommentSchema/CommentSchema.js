const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  refId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'onModel',
  },
  onModel: {
    type: String,
    required: true,
    enum: ['Doctor', 'Pharmacy','Nursing', 'MedicalLab'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Comment', commentSchema);

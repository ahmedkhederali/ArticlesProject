const mongoose = require('mongoose');

const NursingPersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  sex: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  work_place: {
    type: String,
    required: true,
  },
  descrption: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  functionality: [
    {
      name: {
        type: String,
        required: true,
      }
    }
  ],
  ratings: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      rating: { type: Number, min: 0, max: 5, required: true }
    }
  ],
  image: {
    public_id: {
      type: String,
      default:"unknow user"
    },
    url: {
      type: String,
      required:true
    },
  },
});

const NursingPerson = mongoose.model('NursingPerson', NursingPersonSchema);

module.exports = NursingPerson;

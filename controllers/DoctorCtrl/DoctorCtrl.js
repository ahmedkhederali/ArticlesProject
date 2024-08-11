const Doctor = require('../../models/DoctorSchema/DoctorSchema');
const Specialty = require('../../models/SpecilitySchema/SpecitlitySchema');

const { getSpecialtyById } = require('../SpecialtyCtrl/SpecialtyCtrl');

exports.createDoctor = async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).send(doctor);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all doctors with their comments
exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate('specialties degree  time_for_works')
  
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get a specific doctor by ID with comments
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .populate('specialties degree  time_for_works')

    if (!doctor) return res.status(404).json({ msg: 'Doctor not found' });
    
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!doctor) return res.status(404).send();
    res.status(200).send(doctor);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) return res.status(404).send();
    res.status(200).send(doctor);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getDoctorsBySpecialty = async (req, res) => {
  try {
    const { specialtyId } = req.params;
    let specialistName;
    if(specialtyId){
      specialistName=await Specialty.findById(specialtyId)
      if (!specialistName) return res.status(200).send({ msg: "لم يتم العثور على أطباء لهذا التخصص." });
    }
    const doctors = await Doctor.find({ specialties: specialtyId }).populate('specialties degree  time_for_works');
    if (!doctors.length) return res.status(200).send({ msg: "لايوجد دكاتره في هذا التخصص",specialistName:specialistName.specialty_name });
    res.status(200).send({doctors,specialistName:specialistName.specialty_name});
  } catch (error) {
    res.status(500).send({ msg: "لم يتم العثور على أطباء لهذا التخصص." });
  }
};

exports.rateDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const {  rating } = req.body;
    // Find the doctor by ID
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Check if the user has already rated this doctor
    const existingRating = doctor.ratings.find(r => r.user.toString() === req.user.id);

    if (existingRating) {
      // If the user has already rated, update the rating
      existingRating.rating = rating;
    } else {
      // If the user has not rated yet, add a new rating
      doctor.ratings.push({ user: req.user.id, rating });
    }

    await doctor.save();

    return res.status(200).json({ message: 'Rating submitted successfully', doctor });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};
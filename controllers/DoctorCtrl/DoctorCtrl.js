const Doctor = require('../../models/DoctorSchema/DoctorSchema');

exports.createDoctor = async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).send(doctor);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate('specialties degree subspecialties time_for_works');
    res.status(200).send(doctors);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate('specialties degree subspecialties time_for_works');
    if (!doctor) return res.status(404).send();
    res.status(200).send(doctor);
  } catch (error) {
    res.status(500).send(error);
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

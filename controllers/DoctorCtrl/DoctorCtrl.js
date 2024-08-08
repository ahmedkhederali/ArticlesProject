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

exports.getDoctorsBySpecialty = async (req, res) => {
  try {
    const { specialtyId } = req.params;
    let specialistName;
    if(specialtyId){
      specialistName=await Specialty.findById(specialtyId)
      if (!specialistName) return res.status(404).send({ msg: "لم يتم العثور على أطباء لهذا التخصص." });
    }
    const doctors = await Doctor.find({ specialties: specialtyId }).populate('specialties degree subspecialties time_for_works');
    if (!doctors.length) return res.status(404).send({ msg: "لايوجد دكاتره في هذا التخصص" });
    res.status(200).send({doctors,specialistName:specialistName.specialty_name});
  } catch (error) {
    res.status(500).send({ msg: "لم يتم العثور على أطباء لهذا التخصص." });
  }
};
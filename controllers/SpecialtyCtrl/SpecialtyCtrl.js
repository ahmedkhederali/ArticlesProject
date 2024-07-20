const Specialty = require('../../models/SpecilitySchema/SpecitlitySchema');

exports.createSpecialty = async (req, res) => {
  try {
    const specialty = new Specialty(req.body);
    await specialty.save();
    res.status(201).send(specialty);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getSpecialties = async (req, res) => {
  try {
    const specialties = await Specialty.find();
    res.status(200).send(specialties);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getSpecialtyById = async (req, res) => {
  try {
    const specialty = await Specialty.findById(req.params.id);
    if (!specialty) return res.status(404).send();
    res.status(200).send(specialty);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateSpecialty = async (req, res) => {
  try {
    const specialty = await Specialty.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!specialty) return res.status(404).send();
    res.status(200).send(specialty);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteSpecialty = async (req, res) => {
  try {
    const specialty = await Specialty.findByIdAndDelete(req.params.id);
    if (!specialty) return res.status(404).send();
    res.status(200).send(specialty);
  } catch (error) {
    res.status(500).send(error);
  }
};

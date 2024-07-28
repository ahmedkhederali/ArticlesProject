const MedicalLab = require('../../models/MedicalSchema/MedicalSchema');

exports.createMedicalLab = async (req, res) => {
  try {
    const medicalLab = new MedicalLab(req.body);
    await medicalLab.save();
    res.status(201).send(medicalLab);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getMedicalLabs = async (req, res) => {
  try {
    const medicalLabs = await MedicalLab.find().populate('comments');
    res.status(200).send(medicalLabs);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getMedicalLabById = async (req, res) => {
  try {
    const medicalLab = await MedicalLab.findById(req.params.id).populate('comments');
    if (!medicalLab) return res.status(404).send();
    res.status(200).send(medicalLab);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateMedicalLab = async (req, res) => {
  try {
    const medicalLab = await MedicalLab.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!medicalLab) return res.status(404).send();
    res.status(200).send(medicalLab);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteMedicalLab = async (req, res) => {
  try {
    const medicalLab = await MedicalLab.findByIdAndDelete(req.params.id);
    if (!medicalLab) return res.status(404).send();
    res.status(200).send(medicalLab);
  } catch (error) {
    res.status(500).send(error);
  }
};

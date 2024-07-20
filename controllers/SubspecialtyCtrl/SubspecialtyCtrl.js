const Subspecialty = require('../../models/SubSpecility/SubSpeciality');

exports.createSubspecialty = async (req, res) => {
  try {
    const subspecialty = new Subspecialty(req.body);
    await subspecialty.save();
    res.status(201).send(subspecialty);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getSubspecialties = async (req, res) => {
  try {
    const subspecialties = await Subspecialty.find().populate('specialty');
    res.status(200).send(subspecialties);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getSubspecialtyById = async (req, res) => {
  try {
    const subspecialty = await Subspecialty.findById(req.params.id).populate('specialty');
    if (!subspecialty) return res.status(404).send();
    res.status(200).send(subspecialty);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateSubspecialty = async (req, res) => {
  try {
    const subspecialty = await Subspecialty.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!subspecialty) return res.status(404).send();
    res.status(200).send(subspecialty);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteSubspecialty = async (req, res) => {
  try {
    const subspecialty = await Subspecialty.findByIdAndDelete(req.params.id);
    if (!subspecialty) return res.status(404).send();
    res.status(200).send(subspecialty);
  } catch (error) {
    res.status(500).send(error);
  }
};

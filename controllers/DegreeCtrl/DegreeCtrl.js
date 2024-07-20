const Degree = require('../../models/Degree/Degree');

exports.createDegree = async (req, res) => {
  try {
    const degree = new Degree(req.body);
    await degree.save();
    res.status(201).send(degree);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getDegrees = async (req, res) => {
  try {
    const degrees = await Degree.find();
    res.status(200).send(degrees);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getDegreeById = async (req, res) => {
  try {
    const degree = await Degree.findById(req.params.id);
    if (!degree) return res.status(404).send();
    res.status(200).send(degree);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateDegree = async (req, res) => {
  try {
    const degree = await Degree.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!degree) return res.status(404).send();
    res.status(200).send(degree);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteDegree = async (req, res) => {
  try {
    const degree = await Degree.findByIdAndDelete(req.params.id);
    if (!degree) return res.status(404).send();
    res.status(200).send(degree);
  } catch (error) {
    res.status(500).send(error);
  }
};

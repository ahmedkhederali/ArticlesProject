const Pharmacy = require('../../models/PharmacySchema/PharmacySchema');

exports.createPharmacy = async (req, res) => {
  try {
    const pharmacy = new Pharmacy(req.body);
    await pharmacy.save();
    res.status(201).send(pharmacy);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getPharmacies = async (req, res) => {
  try {
    const pharmacies = await Pharmacy.find().populate('comments');
    res.status(200).send(pharmacies);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getPharmacyById = async (req, res) => {
  try {
    const pharmacy = await Pharmacy.findById(req.params.id).populate('comments');
    if (!pharmacy) return res.status(404).send();
    res.status(200).send(pharmacy);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updatePharmacy = async (req, res) => {
  try {
    const pharmacy = await Pharmacy.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!pharmacy) return res.status(404).send();
    res.status(200).send(pharmacy);
  } catch (error) {
    res.status400.send(error);
  }
};

exports.deletePharmacy = async (req, res) => {
  try {
    const pharmacy = await Pharmacy.findByIdAndDelete(req.params.id);
    if (!pharmacy) return res.status(404).send();
    res.status(200).send(pharmacy);
  } catch (error) {
    res.status(500).send(error);
  }
};

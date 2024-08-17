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
    const { page = 1, limit = 10 } = req.query; 
    const skip = (page - 1) * limit; // Calculate the number of documents to skip
    const totalPharamcy = await Pharmacy.countDocuments(); // Get the total number of documents that match the filter

    const pharmacies = await Pharmacy.find()
    .skip(skip) // Skip documents for pagination
    .limit(Number(limit)); // Limit the number of documents returned

  res.status(200).send({
    pharmacies,
    totalPages: Math.ceil(totalPharamcy / limit), // Calculate total number of pages
    currentPage: Number(page),
    totalItems: totalPharamcy, // Total number of items matching the filter
  });

  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getPharmacyById = async (req, res) => {
  try {
    const pharmacy = await Pharmacy.findById(req.params.id);
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
    res.status(200).send({msg:"تم حذف الصيدلية بنجاح"});
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.ratePharmacy = async (req, res) => {
  try {
    const { pharmacyId } = req.params;
    const {  rating } = req.body;
    // Find the doctor by ID
    const pharamacy = await Pharmacy.findById(pharmacyId);

    if (!pharamacy) {
      return res.status(404).json({ message: 'Pharamacy not found' });
    }

    // Check if the user has already rated this pharamacy
    const existingRating = pharamacy.ratings.find(r => r.user.toString() === req.user.id);

    if (existingRating) {
      // If the user has already rated, update the rating
      existingRating.rating = rating;
    } else {
      // If the user has not rated yet, add a new rating
      pharamacy.ratings.push({ user: req.user.id, rating });
    }

    await pharamacy.save();

    return res.status(200).json({ message: 'Rating submitted successfully', pharamacy });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};
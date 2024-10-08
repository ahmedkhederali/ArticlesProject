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
    const { type, page = 1, limit = 10 } = req.query; // Get type, page, and limit from query parameters

    const filter = {};
    if (type) {
      filter.medicallab_type = type; // Add filter condition based on medicallab_type
    }

    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    const totalMedicalLabs = await MedicalLab.countDocuments(filter); // Get the total number of documents that match the filter
    const medicalLabs = await MedicalLab.find(filter)
      .skip(skip) // Skip documents for pagination
      .limit(Number(limit)); // Limit the number of documents returned

    res.status(200).send({
      medicalLabs,
      totalPages: Math.ceil(totalMedicalLabs / limit), // Calculate total number of pages
      currentPage: Number(page),
      totalItems: totalMedicalLabs, // Total number of items matching the filter
    });
  } catch (error) {
    res.status(500).send({
      message: 'An error occurred while fetching medical labs',
      error,
    });
  }
};
exports.getMedicalLabById = async (req, res) => {
  try {
    const medicalLab = await MedicalLab.findById(req.params.id);
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
    res.status(200).send({msg:"تم حذف المعمل بنجاح"});
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.rateMedicalLab = async (req, res) => {
  try {
    const { medicalId } = req.params;
    const {  rating } = req.body;
    // Find the doctor by ID
    const medicalLab = await MedicalLab.findById(medicalId);

    if (!medicalLab) {
      return res.status(404).json({ message: 'medicalLab not found' });
    }

    // Check if the user has already rated this medicalLab
    const existingRating = medicalLab.ratings.find(r => r.user.toString() === req.user.id);

    if (existingRating) {
      // If the user has already rated, update the rating
      existingRating.rating = rating;
    } else {
      // If the user has not rated yet, add a new rating
      medicalLab.ratings.push({ user: req.user.id, rating });
    }

    await medicalLab.save();

    return res.status(200).json({ message: 'Rating submitted successfully', medicalLab });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};
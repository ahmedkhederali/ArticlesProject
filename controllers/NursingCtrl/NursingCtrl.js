const Nursing = require('../../models/Nursing/Nursing');

// Create a new nursing person
exports.createNursing = async (req, res) => {
  try {
    const nursing = new Nursing(req.body);
    await nursing.save();
    res.status(201).json({ status: 'success', nursing });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

// Get all nursing personnel
exports.getNurses = async (req, res) => {
  try {
    const nurses = await Nursing.find();
    res.status(200).json({ status: 'success', nurses });
  } catch (error) {
    res.status(500).json({ status: 'fail', message: error.message });
  }
};

// Get a specific nurse by ID
exports.getNurseById = async (req, res) => {
  try {
    const nurse = await Nursing.findById(req.params.id);
    if (!nurse) return res.status(404).json({ status: 'fail', message: 'Nurse not found' });
    
    res.status(200).json({ status: 'success', nurse });
  } catch (error) {
    res.status(500).json({ status: 'fail', message: error.message });
  }
};

// Update a nurse by ID
exports.updateNurse = async (req, res) => {
  try {
    const nurse = await Nursing.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!nurse) return res.status(404).json({ status: 'fail', message: 'Nurse not found' });
    
    res.status(200).json({ status: 'success', nurse });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

// Delete a nurse by ID
exports.deleteNurse = async (req, res) => {
  try {
    const nurse = await Nursing.findByIdAndDelete(req.params.id);
    if (!nurse) return res.status(404).json({ status: 'fail', message: 'Nurse not found' });
    
    res.status(200).json({ status: 'success', message: 'Nurse deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: 'fail', message: error.message });
  }
};

exports.rateNursing = async (req, res) => {
    try {
      const { nursingId } = req.params;
      const {  rating } = req.body;
      // Find the doctor by ID
      const nursing = await Nursing.findById(nursingId);
  
      if (!nursing) {
        return res.status(404).json({ message: 'هذا الممرض غير موجود' });
      }
  
      // Check if the user has already rated this nursing
      const existingRating = nursing.ratings.find(r => r.user.toString() === req.user.id);
  
      if (existingRating) {
        // If the user has already rated, update the rating
        existingRating.rating = rating;
      } else {
        // If the user has not rated yet, add a new rating
        nursing.ratings.push({ user: req.user.id, rating });
      }
  
      await nursing.save();
  
      return res.status(200).json({ message: 'Rating submitted successfully', nursing });
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
  };
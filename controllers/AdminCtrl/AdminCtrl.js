const Doctor = require('../../models/DoctorSchema/DoctorSchema');
const Nursing = require('../../models/Nursing/Nursing');
const MedicalLab = require('../../models/MedicalSchema/MedicalSchema');
const Pharmacy = require('../../models/PharmacySchema/PharmacySchema');

exports.getDashboardData=async (req, res) => {
    try {
        // Get counts of each collection
        const doctorCount = await Doctor.countDocuments();
        const nursingCount = await Nursing.countDocuments();
        const medicallabCount = await MedicalLab.countDocuments();
        const pharmacyCount = await Pharmacy.countDocuments();

        // Create the response data
        const data = [
            { id: 0, value: medicallabCount, label: 'معامل' },
            { id: 1, value: pharmacyCount, label: 'صيدلية' },
            { id: 2, value: doctorCount, label: 'دكتور' },
            { id: 3, value: nursingCount, label: 'ممرض' },
        ];

        // Send the response
        res.status(200).send({
            data
          });
    } catch (error) {
        console.error('Error fetching counts:', error);
        res.status(500).json({ error: 'An error occurred while fetching counts' });
    }
}
exports.getAllDoctorForSpecifiy=async (req, res) => {
    try {
        const result = await Doctor.aggregate([
            {
                $group: {
                    _id: '$specialties', // Group by specialty
                    دكتور: { $sum: 1 }, // Count the number of doctors
                },
            },
            {
                $lookup: {
                    from: 'specialties',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'specialty',
                },
            },
            {
                $unwind: '$specialty',
            },
            {
                $project: {
                    _id: 0,
                    specialty_name: '$specialty.specialty_name',
                    دكتور: 1,
                },
            },
        ]);

        res.json({ success: true, data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}
exports.getAllNursingByGender=async (req, res) => {
    try {
      // Aggregate data to count males and females
      const genderCounts = await Nursing.aggregate([
        {
          $group: {
            _id: "$sex",
            count: { $sum: 1 }
          }
        }
      ]);
  
      // Format the response
      const result = {
        male: 0,
        female: 0,
      };
  
      genderCounts.forEach(genderCount => {
        if (genderCount._id === 'male') {
          result.male = genderCount.count;
        } else if (genderCount._id === 'female') {
          result.female = genderCount.count;
        }
      });
  
      res.status(200).json({ success: true,data:result});
    } catch (error) {
      console.error('Error fetching nursing person counts:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
}
exports.getMedicalLabCounts = async (req, res) => {
    try {
      // Count the number of medical labs by type
      const counts = await MedicalLab.aggregate([
        {
          $group: {
            _id: "$medicallab_type",
            count: { $sum: 1 }
          }
        }
      ]);
  
      // Respond with the counts
      res.status(200).json({
        success: true,
        data: counts.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {})
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Server error',
      });
    }
  };
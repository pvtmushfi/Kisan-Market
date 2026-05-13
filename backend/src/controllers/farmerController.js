<<<<<<< HEAD
import User from '../models/User.js';

// Get farmers within radius (in km)
export const getNearbyFarmers = async (req, res) => {
  try {
    const { lng, lat, radius = 10 } = req.query;
    if (!lng || !lat) {
      return res.status(400).json({ error: 'Longitude and latitude required' });
    }
    const farmers = await User.find({
      role: 'farmer',
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: radius * 1000
        }
      }
    }).select('name email location farmDetails');
    res.json(farmers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Save farmer's location
export const saveLocation = async (req, res) => {
  try {
    const { lng, lat } = req.body;
    const userId = req.user.id;
    const user = await User.findByIdAndUpdate(
      userId,
      { location: { type: 'Point', coordinates: [lng, lat] } },
      { new: true }
    );
    res.json({ message: 'Location saved', location: user.location });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
=======
>>>>>>> origin/main

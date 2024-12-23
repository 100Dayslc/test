// controllers/pointsController.js
const User = require('../models/User');
const config = require('../config/config');

exports.addPoints = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const points = config.adPoints; // Points for watching ad

    user.points += points;
    await user.save();

    res.json({
      success: true,
      points: user.points,
      message: `Added ${points} points`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to add points',
    });
  }
};

exports.getPoints = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({
      success: true,
      points: user.points,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get points',
    });
  }
};

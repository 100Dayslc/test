
// controllers/rewardController.js
const Reward = require('../models/Reward');
const Redemption = require('../models/Redemption');
const User = require('../models/User');
const Announcement = require('../models/Announcement');

exports.getAllRewards = async (req, res) => {
  try {
    const rewards = await Reward.find({ active: true });
    res.json({
      success: true,
      rewards,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch rewards',
    });
  }
};

exports.redeemReward = async (req, res) => {
  try {
    const { rewardId } = req.body;
    const user = await User.findById(req.user.id);
    const reward = await Reward.findById(rewardId);

    if (!reward) {
      return res.status(404).json({
        success: false,
        message: 'Reward not found',
      });
    }

    if (user.points < reward.points) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient points',
      });
    }

    // Create redemption
    const redemption = new Redemption({
      userId: user._id,
      rewardId: reward._id,
      pointsCost: reward.points,
    });

    // Deduct points
    user.points -= reward.points;

    await Promise.all([redemption.save(), user.save()]);

    res.json({
      success: true,
      message: 'Reward redeemed successfully',
      points: user.points,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to redeem reward',
    });
  }
};

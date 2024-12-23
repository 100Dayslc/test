// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, username, password, referralCode } = req.body;

    // Check if user exists
    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    // Create user
    user = new User({
      firstName,
      lastName,
      email,
      username,
      password,
    });

    // Handle referral
    if (referralCode) {
      const referrer = await User.findOne({ referralCode });
      if (referrer) {
        user.referredBy = referrer._id;
        user.points = config.referralPoints;
        referrer.points += config.referralPoints;
        await referrer.save();
      }
    }

    await user.save();

    // Create token
    const token = jwt.sign({ id: user._id }, config.jwtSecret, {
      expiresIn: config.jwtExpire,
    });

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        points: user.points,
        referralCode: user.referralCode,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check user exists
    const user = await User.findOne({ username }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Create token
    const token = jwt.sign({ id: user._id }, config.jwtSecret, {
      expiresIn: config.jwtExpire,
    });

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        points: user.points,
        referralCode: user.referralCode,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};
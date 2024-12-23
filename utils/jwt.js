// utils/jwt.js
const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.generateToken = (userId) => {
  return jwt.sign({ id: userId }, config.jwtSecret, {
    expiresIn: config.jwtExpire,
  });
};

exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch (error) {
    return null;
  }
};

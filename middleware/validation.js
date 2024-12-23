
// middleware/validation.js
const { check, validationResult } = require('express-validator');

exports.validateRegister = [
  check('firstName', 'First name is required').notEmpty(),
  check('lastName', 'Last name is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('username', 'Username is required').notEmpty(),
  check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    next();
  },
];

exports.validateLogin = [
  check('username', 'Username is required').notEmpty(),
  check('password', 'Password is required').exists(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    next();
  },
];
